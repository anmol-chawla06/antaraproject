/**
 * Contact submission storage.
 *
 * ONE interface, TWO implementations, chosen by configuration:
 *
 *   LOCAL   — no database URL set  → JSON file store (landing-page/data/)
 *   VERCEL  — DATABASE_URL set     → PostgreSQL store (services/postgresStore.js)
 *
 * The selector is the presence of a connection string, not NODE_ENV or a
 * Vercel-specific variable. That keeps it honest in both directions: a
 * developer can point a local run at the real database simply by setting the
 * variable, and a production deployment that is missing it does not silently
 * fall through to a filesystem that cannot keep anything — the file store
 * probes for writability, finds none, and the route declines the message.
 *
 * Both implementations expose exactly the same four methods, and all four are
 * ASYNC. A database cannot answer synchronously, and having one store return
 * values while the other returns promises would push the difference out into
 * the routes, which is precisely what this module exists to prevent. The file
 * store's operations are synchronous underneath; they are simply presented
 * through the same promise-returning contract.
 *
 *   isWritable()        -> Promise<boolean>
 *   list()              -> Promise<Message[]>          (newest first)
 *   add(message)        -> Promise<{ok, message} | {ok:false, reason}>
 *   setStatus(id, s)    -> Promise<{ok, message} | {ok:false, reason}>
 *
 * Reasons a caller may see: READ_ONLY, NOT_FOUND, INVALID_STATUS, STORAGE_ERROR.
 *
 * Scope: contact messages only. Heritage data, manuscripts, festivals, map data
 * and media are read-only content shipped with the deployment and stay on disk.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const { createPostgresStore } = require('./postgresStore');

/**
 * Vercel's Postgres integrations inject POSTGRES_URL; most other providers and
 * most documentation say DATABASE_URL. Accept either so that connecting a
 * database from the Vercel dashboard needs no further configuration, and prefer
 * DATABASE_URL when a deployment sets both.
 */
function resolveDatabaseUrl(explicit) {
  const candidates = [explicit, process.env.DATABASE_URL, process.env.POSTGRES_URL];
  for (const value of candidates) {
    const trimmed = (value || '').trim();
    if (trimmed) return trimmed;
  }
  return '';
}

/** Probe rather than infer: the only reliable test of writability is a write. */
function probeWritable(dir, file) {
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(file)) fs.writeFileSync(file, '[]');
    // Touch the real target, not a sibling, so permissions are tested exactly.
    fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * The local-development store: a flat JSON file.
 *
 * Correct for a single long-lived process on a real disk, and WRONG for a
 * serverless host, where the filesystem is read-only apart from /tmp and /tmp
 * is per-instance and evicted without warning. Writing submissions there would
 * accept a visitor's name, e-mail and message and then lose them silently —
 * worse than refusing, since the visitor believes they have been heard. So the
 * store probes for a genuinely writable location once, and where there is none
 * it reports `writable: false` and the route answers honestly.
 */
function createFileStore(dataDir) {
  const file = path.join(dataDir, 'contact_messages.json');
  const writable = probeWritable(dataDir, file);

  const readAll = () => {
    try {
      const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      // A missing or corrupt file must not take the admin inbox down.
      if (err.code !== 'ENOENT') console.error('contact store (file): unreadable —', err.message);
      return [];
    }
  };

  const writeAll = messages => {
    fs.writeFileSync(file, JSON.stringify(messages, null, 2));
  };

  return {
    kind: 'file',
    location: file,

    async isWritable() {
      return writable;
    },

    async list() {
      // Newest first, matching the SQL store's ORDER BY.
      return readAll().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },

    async add(message) {
      if (!writable) return { ok: false, reason: 'READ_ONLY' };
      try {
        const messages = readAll();
        messages.push(message);
        writeAll(messages);
        return { ok: true, message };
      } catch (err) {
        console.error('contact store (file): add failed —', err.message);
        return { ok: false, reason: 'STORAGE_ERROR' };
      }
    },

    async setStatus(id, status) {
      if (!writable) return { ok: false, reason: 'READ_ONLY' };
      try {
        const messages = readAll();
        const i = messages.findIndex(m => m.id === id);
        if (i === -1) return { ok: false, reason: 'NOT_FOUND' };
        messages[i].status = status;
        writeAll(messages);
        return { ok: true, message: messages[i] };
      } catch (err) {
        console.error('contact store (file): setStatus failed —', err.message);
        return { ok: false, reason: 'STORAGE_ERROR' };
      }
    },

    async close() { /* nothing to release */ }
  };
}

/**
 * Choose a store.
 *
 * Nothing here connects, queries or writes: construction only records where the
 * store would go. That matters on a serverless host, where work done during
 * module import happens before the function can serve anything and a failure
 * takes down every page, not just the contact form.
 */
function createContactStore(options) {
  const opts = options || {};
  const databaseUrl = resolveDatabaseUrl(opts.databaseUrl);
  if (databaseUrl) return createPostgresStore(databaseUrl);
  return createFileStore(opts.dataDir || path.join(__dirname, '..', 'data'));
}

module.exports = { createContactStore, createFileStore, createPostgresStore, probeWritable, resolveDatabaseUrl };
