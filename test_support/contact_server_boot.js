/**
 * Boots the REAL Express app on an ephemeral port for validate_contact.js.
 *
 * No routes, guards or middleware are redefined here — the point of the test is
 * that the shipped server is exercised. Two things are substituted, both of
 * them test-harness concerns rather than application behaviour:
 *
 *   1. `pg`, replaced by test_support/pg_stub.js when __TEST_PG_STUB is set, so
 *      the suite runs without a live database. Set TEST_DATABASE_URL instead
 *      and this substitution is skipped, running the same assertions against
 *      real Postgres.
 *
 *   2. The file store's directory, redirected to a temporary folder when
 *      __TEST_DATA_DIR is set. Without this the JSON-mode tests would write
 *      into landing-page/data/contact_messages.json, which holds real
 *      submissions from real people.
 *
 * Prints "READY <port>" on stdout once listening.
 */
'use strict';

const path = require('path');

const SERVER = path.join(__dirname, '..', 'landing-page', 'server.js');
const STORE = path.join(__dirname, '..', 'landing-page', 'services', 'contactStore.js');

// --- 1. Substitute the driver, before anything can require the real one ------
if (process.env.__TEST_PG_STUB === '1') {
  // Resolve `pg` exactly as postgresStore.js would, then park the stub at that key.
  const pgPath = require.resolve('pg', {
    paths: [path.join(__dirname, '..', 'landing-page', 'services')]
  });
  require.cache[pgPath] = {
    id: pgPath, filename: pgPath, loaded: true, exports: require('./pg_stub.js')
  };
}

// --- 2. Redirect the file store away from real submissions -------------------
if (process.env.__TEST_DATA_DIR) {
  const real = require(STORE);
  require.cache[require.resolve(STORE)].exports = Object.assign({}, real, {
    createContactStore: options =>
      real.createContactStore(Object.assign({}, options, { dataDir: process.env.__TEST_DATA_DIR }))
  });
}

const app = require(SERVER);

const server = app.listen(0, '127.0.0.1', () => {
  process.stdout.write('READY ' + server.address().port + '\n');
});

process.on('SIGTERM', () => server.close(() => process.exit(0)));
process.on('message', msg => { if (msg === 'shutdown') server.close(() => process.exit(0)); });
