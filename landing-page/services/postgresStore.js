/**
 * Contact storage backed by PostgreSQL.
 *
 * This is the production half of the pair described in contactStore.js. It
 * exists for exactly one reason: a serverless filesystem cannot keep a contact
 * message, and a contact form that cannot keep messages is a dead contact form.
 *
 * Scope is deliberately narrow. ONLY contact submissions live here. Heritage
 * data, manuscripts, festivals, map data and media stay exactly where they are
 * — flat files read from disk — because they are read-only content that ships
 * with the deployment and gains nothing from a database.
 *
 * Three rules shape the code below:
 *
 *   1. NOTHING happens at module load. No connection, no CREATE TABLE, no
 *      environment read that can throw. A serverless function that touches the
 *      network while being imported fails before it can serve a single request,
 *      and that would take the whole site down over one misconfigured variable.
 *      The schema is created lazily, once, on first use.
 *
 *   2. The driver is plain `pg` and the queries are plain SQL. No ORM: one
 *      table with seven columns does not need a migration framework, and an
 *      ORM would be a larger dependency than the feature it serves.
 *
 *   3. A database error NEVER reaches the browser. Postgres errors carry table
 *      names, column names, constraint names and sometimes the offending
 *      values; all of that is logged server-side and the caller receives an
 *      opaque reason code instead.
 */
'use strict';

/* One connection, not a pool of many.
 *
 * A serverless instance handles one request at a time, so extra connections buy
 * nothing and cost plenty: every warm instance would hold several open sockets,
 * and a provider's connection limit is reached far sooner than its query limit.
 * The idle timeout lets a connection go once the instance falls quiet. */
const POOL_SETTINGS = { max: 1, idleTimeoutMillis: 10_000, connectionTimeoutMillis: 10_000 };

const VALID_STATUSES = ['new', 'read', 'replied', 'archived'];

/* Errors worth one retry: a warm instance can hold a connection that the
 * database has already dropped (autosuspend, failover, an idle timeout at the
 * far end), and the failure only surfaces on the next query. */
const TRANSIENT = new Set([
  'ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT', 'EPIPE', 'ENOTFOUND',
  '57P01',  // admin_shutdown
  '57P03',  // cannot_connect_now — the server is still starting
  '08006',  // connection_failure
  '08003',  // connection_does_not_exist
  '08000'   // connection_exception
]);

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS contact_messages (
    id          TEXT PRIMARY KEY,
    name        TEXT        NOT NULL,
    email       TEXT        NOT NULL,
    subject     TEXT        NOT NULL DEFAULT 'No Subject',
    message     TEXT        NOT NULL,
    status      TEXT        NOT NULL DEFAULT 'new'
                            CHECK (status IN ('new', 'read', 'replied', 'archived')),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
  );
  CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx
    ON contact_messages (created_at DESC);
`;

/**
 * TLS is required for every hosted provider and impossible for a local socket.
 * Certificates are verified: a managed Postgres presents a normal publicly
 * trusted certificate, so a verification failure means something is genuinely
 * wrong and should be loud rather than quietly accepted.
 */
function sslFor(connectionString) {
  let hostname;
  try {
    hostname = new URL(connectionString).hostname;
  } catch (err) {
    return { rejectUnauthorized: true };   // unparseable: keep the strict default
  }
  const local = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1' || hostname === '';
  return local ? false : { rejectUnauthorized: true };
}

/** Postgres error text names tables, columns and sometimes values. Log it; never return it. */
function logDbError(operation, err) {
  console.error('contact store (postgres): ' + operation + ' failed —',
    err && err.code ? '[' + err.code + '] ' : '', err && err.message ? err.message : err);
}

function isTransient(err) {
  return Boolean(err && TRANSIENT.has(err.code));
}

/** created_at arrives as a Date; the file store emits an ISO string. Emit one shape. */
function toMessage(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    status: row.status,
    created_at: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at)
  };
}

function createPostgresStore(connectionString) {
  let pool = null;
  let readyPromise = null;

  /* `pg` is required here rather than at the top of the file so that a missing
     or broken dependency degrades to "storage unavailable" instead of throwing
     during import and felling every other page in the process. */
  function getPool() {
    if (pool) return pool;
    const { Pool } = require('pg');
    pool = new Pool({ connectionString, ssl: sslFor(connectionString), ...POOL_SETTINGS });
    /* An idle client that errors emits on the pool. Without a listener Node
       treats it as an unhandled 'error' event and kills the process. */
    pool.on('error', err => logDbError('idle client', err));
    return pool;
  }

  /**
   * Connect and create the table if it is not there yet. Memoised, so the cost
   * is paid once per instance — but a FAILED attempt is not memoised, because a
   * database that was briefly unreachable must not be treated as permanently
   * dead for the lifetime of the instance.
   */
  function ensureReady() {
    if (!readyPromise) {
      readyPromise = getPool().query(SCHEMA).then(() => true).catch(err => {
        readyPromise = null;
        logDbError('schema setup', err);
        return false;
      });
    }
    return readyPromise;
  }

  async function run(operation, text, values) {
    await ensureReady();
    try {
      return await getPool().query(text, values);
    } catch (err) {
      if (!isTransient(err)) throw err;
      logDbError(operation + ' (retrying)', err);
      return getPool().query(text, values);
    }
  }

  return {
    kind: 'postgres',
    // Host only — a connection string carries the password, and this value is
    // surfaced in the admin inbox and the startup log.
    location: (() => { try { return new URL(connectionString).host; } catch (e) { return 'postgres'; } })(),

    async isWritable() {
      return ensureReady();
    },

    async list() {
      try {
        const result = await run('list', 'SELECT * FROM contact_messages ORDER BY created_at DESC');
        return result.rows.map(toMessage);
      } catch (err) {
        logDbError('list', err);
        // The route turns this into a generic 500; the detail stays in the log.
        throw new Error('CONTACT_STORAGE_READ_FAILED');
      }
    },

    async add(message) {
      try {
        const result = await run('add',
          `INSERT INTO contact_messages (id, name, email, subject, message, status, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING *`,
          [message.id, message.name, message.email, message.subject, message.message,
           normaliseStatus(message.status), message.created_at]);
        return { ok: true, message: toMessage(result.rows[0]) };
      } catch (err) {
        logDbError('add', err);
        return { ok: false, reason: 'STORAGE_ERROR' };
      }
    },

    async setStatus(id, status) {
      if (!VALID_STATUSES.includes(status)) return { ok: false, reason: 'INVALID_STATUS' };
      try {
        const result = await run('setStatus',
          'UPDATE contact_messages SET status = $1 WHERE id = $2 RETURNING *',
          [status, id]);
        if (result.rowCount === 0) return { ok: false, reason: 'NOT_FOUND' };
        return { ok: true, message: toMessage(result.rows[0]) };
      } catch (err) {
        logDbError('setStatus', err);
        return { ok: false, reason: 'STORAGE_ERROR' };
      }
    },

    /** Tests and long-lived scripts close the pool; serverless never needs to. */
    async close() {
      if (pool) { const p = pool; pool = null; readyPromise = null; await p.end(); }
    }
  };
}

/** A caller may hand us anything; the column has a CHECK constraint to respect. */
function normaliseStatus(status) {
  return VALID_STATUSES.includes(status) ? status : 'new';
}

module.exports = { createPostgresStore, VALID_STATUSES, SCHEMA, sslFor };
