/**
 * A stand-in for the `pg` driver, for tests only. Never shipped, never required
 * by the application — validate_contact.js injects it into require.cache before
 * loading the server.
 *
 * It is not a Postgres emulator. It understands exactly the four statements
 * services/postgresStore.js issues, and it enforces the two constraints that
 * matter to the store's behaviour: the primary key and the status CHECK. What
 * it does provide is the thing an in-memory mock cannot — rows kept in a FILE,
 * so a test can kill the process, start a new one, and prove that a message
 * survived. That is the whole point of moving contact storage off the
 * filesystem, so it is the thing worth testing.
 *
 * Limitation, stated plainly: the SQL text itself is matched by shape, not
 * parsed. Running the same suite against a real database (see
 * validate_contact.js and TEST_DATABASE_URL) is what proves the SQL is valid.
 */
'use strict';

const fs = require('fs');

const VALID_STATUSES = ['new', 'read', 'replied', 'archived'];
const COLUMNS = ['id', 'name', 'email', 'subject', 'message', 'status', 'created_at'];

function dbFile() {
  const file = process.env.__TEST_PG_FILE;
  if (!file) throw new Error('pg_stub: __TEST_PG_FILE is not set');
  return file;
}

function readRows() {
  try {
    return JSON.parse(fs.readFileSync(dbFile(), 'utf8'));
  } catch (err) {
    return [];
  }
}

function writeRows(rows) {
  fs.writeFileSync(dbFile(), JSON.stringify(rows, null, 2));
}

function pgError(message, code) {
  const err = new Error(message);
  err.code = code;
  return err;
}

/** created_at leaves a real driver as a Date; emit one so toMessage() is exercised. */
function hydrate(row) {
  return { ...row, created_at: new Date(row.created_at) };
}

function execute(text, values) {
  const sql = String(text).replace(/\s+/g, ' ').trim().toUpperCase();
  const args = values || [];

  if (sql.startsWith('CREATE TABLE') || sql.includes('CREATE INDEX')) {
    if (!fs.existsSync(dbFile())) writeRows([]);
    return { rows: [], rowCount: 0 };
  }

  if (sql.startsWith('SELECT * FROM CONTACT_MESSAGES')) {
    const rows = readRows()
      .slice()
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map(hydrate);
    return { rows, rowCount: rows.length };
  }

  if (sql.startsWith('INSERT INTO CONTACT_MESSAGES')) {
    const row = {};
    COLUMNS.forEach((column, i) => { row[column] = args[i]; });

    const rows = readRows();
    if (rows.some(existing => existing.id === row.id)) {
      throw pgError('duplicate key value violates unique constraint "contact_messages_pkey"', '23505');
    }
    if (!VALID_STATUSES.includes(row.status)) {
      throw pgError('new row violates check constraint "contact_messages_status_check"', '23514');
    }
    ['id', 'name', 'email', 'message'].forEach(column => {
      if (row[column] === undefined || row[column] === null) {
        throw pgError('null value in column "' + column + '" violates not-null constraint', '23502');
      }
    });

    rows.push(row);
    writeRows(rows);
    return { rows: [hydrate(row)], rowCount: 1 };
  }

  if (sql.startsWith('UPDATE CONTACT_MESSAGES SET STATUS')) {
    const [status, id] = args;
    if (!VALID_STATUSES.includes(status)) {
      throw pgError('new row violates check constraint "contact_messages_status_check"', '23514');
    }
    const rows = readRows();
    const i = rows.findIndex(row => row.id === id);
    if (i === -1) return { rows: [], rowCount: 0 };
    rows[i].status = status;
    writeRows(rows);
    return { rows: [hydrate(rows[i])], rowCount: 1 };
  }

  throw pgError('pg_stub: unrecognised statement: ' + sql.slice(0, 80), '42601');
}

class Pool {
  constructor(config) {
    this.config = config || {};
    /* The store must pass a connection string and must ask for TLS on a remote
       host. Record it so a test can assert on it. */
    Pool.lastConfig = this.config;
    this.ended = false;
  }

  on() { return this; }

  async query(text, values) {
    if (this.ended) throw pgError('Cannot use a pool after calling end on the pool', '08003');
    return execute(text, values);
  }

  async end() { this.ended = true; }
}

class Client extends Pool {}

module.exports = { Pool, Client, VALID_STATUSES };
