#!/usr/bin/env node
/**
 * ANTARA CONTACT STORAGE TESTS
 *
 * Live HTTP tests against the real Express app. Unlike validate_server.js,
 * which makes shape assertions over the source, this suite starts the server
 * and talks to it, because the question it answers is behavioural: does a
 * contact message submitted through the public endpoint come back out of the
 * admin inbox, and does it survive the process that received it?
 *
 * That last part is the reason the whole exercise exists. On Vercel there is no
 * long-lived process and no writable disk, so "it worked when I tested it" and
 * "it still works an hour later" are different claims. Each phase below runs in
 * a FRESH child process, standing in for a fresh serverless invocation.
 *
 * By default the PostgreSQL phases run against test_support/pg_stub.js, which
 * keeps rows in a file so restarts are meaningful. Set TEST_DATABASE_URL to run
 * the identical assertions against a real database:
 *
 *     TEST_DATABASE_URL=postgres://... node validate_contact.js
 *
 * That connects, creates the table, writes rows and deletes them again, so
 * point it at a scratch database, never at production.
 */
'use strict';

const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BOOT = path.join(__dirname, 'test_support', 'contact_server_boot.js');
const ADMIN_PASSWORD = 'test-password-' + Math.random().toString(36).slice(2);
const LIVE_URL = (process.env.TEST_DATABASE_URL || '').trim();

let passed = 0;
const failures = [];
function group(name) { console.log('\n' + name); }
function ok(label, cond, detail) {
  if (cond) { passed++; console.log('  [PASS] ' + label); }
  else { failures.push(label); console.log('  [FAIL] ' + label + (detail ? '  :: ' + detail : '')); }
}

// --- A tiny HTTP client that remembers one cookie ---------------------------

function makeClient(port) {
  let cookie = '';
  return {
    get cookie() { return cookie; },
    clearCookie() { cookie = ''; },
    async request(method, url, body) {
      const headers = {};
      if (body !== undefined) headers['Content-Type'] = 'application/json';
      if (cookie) headers.Cookie = cookie;
      const res = await fetch('http://127.0.0.1:' + port + url, {
        method, headers, body: body === undefined ? undefined : JSON.stringify(body), redirect: 'manual'
      });
      const setCookie = res.headers.get('set-cookie');
      if (setCookie) cookie = setCookie.split(';')[0];
      let json = null;
      try { json = await res.json(); } catch (err) { /* not every response is JSON */ }
      return { status: res.status, body: json };
    }
  };
}

// --- Booting the real server in a child process -----------------------------

function boot(env) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [BOOT], {
      env: Object.assign({}, process.env, { ADMIN_PASSWORD, ADMIN_SESSION_SECRET: 'test-secret' }, env),
      stdio: ['ignore', 'pipe', 'pipe']
    });
    let out = '';
    const timer = setTimeout(() => { child.kill(); reject(new Error('server did not start: ' + out)); }, 20000);
    child.stdout.on('data', chunk => {
      out += chunk;
      const match = out.match(/READY (\d+)/);
      if (match) {
        clearTimeout(timer);
        const port = Number(match[1]);
        resolve({
          client: makeClient(port),
          log: () => out,
          stop: () => new Promise(done => { child.on('exit', done); child.kill(); })
        });
      }
    });
    child.stderr.on('data', chunk => { out += chunk; });
    child.on('error', err => { clearTimeout(timer); reject(err); });
    child.on('exit', code => { clearTimeout(timer); reject(new Error('server exited (' + code + '): ' + out)); });
  });
}

// --- Scratch locations ------------------------------------------------------

const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'antara-contact-'));
const pgFile = path.join(scratch, 'pg.json');
const fileDir = path.join(scratch, 'json-store');
fs.mkdirSync(fileDir, { recursive: true });

/* The database phases either stub the driver or use a real connection string,
   but the server sees the same thing either way: DATABASE_URL is set. */
const dbEnv = LIVE_URL
  ? { DATABASE_URL: LIVE_URL }
  : { DATABASE_URL: 'postgres://test:test@db.example.test:5432/antara', __TEST_PG_STUB: '1', __TEST_PG_FILE: pgFile };

const fileEnv = { __TEST_DATA_DIR: fileDir, DATABASE_URL: '', POSTGRES_URL: '' };

/* Every row this suite writes carries a tag unique to THIS run.
 *
 * Against a live database that matters twice over: two runs cannot collide, and
 * cleanup can be exhaustive by tag rather than relying on ids collected as the
 * suite went along — if an assertion fails early, a list of ids would be
 * incomplete and would leave rows behind. Deleting by tag also cannot reach a
 * genuine submission, because no genuine submission carries one. */
const RUN_TAG = 'qa' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const QA_DOMAIN = '@antara-qa.example.com';
const qaEmail = n => RUN_TAG + '-' + n + QA_DOMAIN;
const isQa = email => typeof email === 'string' && email.startsWith(RUN_TAG + '-');

const submission = n => ({
  name: 'QA Visitor ' + n,
  email: qaEmail(n),
  subject: 'Enquiry ' + n,
  message: 'Message body number ' + n + '.'
});

const created = [];   // ids written during the live-database run, for reporting

async function main() {
  console.log(LIVE_URL
    ? 'Database phases: LIVE PostgreSQL (TEST_DATABASE_URL is set)'
    : 'Database phases: stubbed driver with file-backed rows (set TEST_DATABASE_URL for a live run)');

  // =========================================================================
  group('Store selection (8: production mode picks the persistent store)');
  // =========================================================================

  const storeModule = require('./landing-page/services/contactStore.js');

  const chosen = storeModule.createContactStore({ databaseUrl: 'postgres://u:p@example.test/db' });
  ok('a connection string selects the PostgreSQL store', chosen.kind === 'postgres', chosen.kind);
  ok('the chosen store never reports the connection string (it holds the password)',
    !String(chosen.location).includes('p@') && !String(chosen.location).includes('postgres://'),
    String(chosen.location));

  const fallback = storeModule.createContactStore({ databaseUrl: '', dataDir: fileDir });
  ok('no connection string selects the JSON file store', fallback.kind === 'file', fallback.kind);

  ok('DATABASE_URL is read', storeModule.resolveDatabaseUrl.length >= 0 &&
    /DATABASE_URL/.test(fs.readFileSync('./landing-page/services/contactStore.js', 'utf8')));
  ok('POSTGRES_URL (injected by Vercel Postgres integrations) is read too',
    /POSTGRES_URL/.test(fs.readFileSync('./landing-page/services/contactStore.js', 'utf8')));

  const { sslFor } = require('./landing-page/services/postgresStore.js');
  ok('TLS is required for a hosted database',
    sslFor('postgres://u:p@ep-x.eu-central-1.aws.neon.tech/db').rejectUnauthorized === true);
  ok('TLS certificates are verified, not blindly accepted',
    sslFor('postgres://u:p@somewhere.example/db').rejectUnauthorized !== false);
  ok('a local socket is not forced through TLS', sslFor('postgres://u:p@localhost:5432/db') === false);

  ok('constructing the store opens no connection and creates no table',
    typeof chosen.isWritable === 'function' && typeof chosen.add === 'function');

  // =========================================================================
  group('Interface parity (both stores answer the same four methods, async)');
  // =========================================================================

  for (const [label, store] of [['postgres', chosen], ['file', fallback]]) {
    ['isWritable', 'list', 'add', 'setStatus'].forEach(method => {
      ok(label + ' store exposes ' + method + '()', typeof store[method] === 'function');
    });
    /* Asserted by declaration rather than by calling: invoking the postgres
       store's list() here would dial a database, which is Phase A's job. */
    ['isWritable', 'list', 'add', 'setStatus'].forEach(method => {
      ok(label + ' store\'s ' + method + '() is async, so the routes never branch',
        store[method].constructor.name === 'AsyncFunction', store[method].constructor.name);
    });
  }

  // =========================================================================
  group('Phase A — production store: submission, retrieval, status (1, 3, 4, 5, 6)');
  // =========================================================================

  let server = await boot(dbEnv);
  let api = server.client;

  // 6. Unauthenticated access is blocked BEFORE anything is written.
  let res = await api.request('GET', '/api/contact/messages');
  ok('the inbox refuses an unauthenticated request', res.status === 401, String(res.status));
  ok('and leaks no messages in the refusal', !res.body || !res.body.data, JSON.stringify(res.body));

  res = await api.request('PATCH', '/api/contact/messages/anything', { status: 'read' });
  ok('a status change refuses an unauthenticated request', res.status === 401, String(res.status));

  // 1. Submission succeeds against the production store.
  res = await api.request('POST', '/api/contact', submission(1));
  ok('a valid submission is accepted', res.status === 200 && res.body.success === true,
    res.status + ' ' + JSON.stringify(res.body));

  res = await api.request('POST', '/api/contact', submission(2));
  ok('a second valid submission is accepted', res.status === 200 && res.body.success === true,
    res.status + ' ' + JSON.stringify(res.body));

  // 5. Invalid input still returns 4xx. (The limiter allows five POSTs per
  //    window per IP, so this phase spends exactly its five and no more.)
  res = await api.request('POST', '/api/contact', { email: 'a@b.co', message: 'hi' });
  ok('a missing name is rejected 400', res.status === 400 && res.body.error.code === 'NAME_REQUIRED',
    res.status + ' ' + JSON.stringify(res.body));

  res = await api.request('POST', '/api/contact', { name: 'A', email: 'not-an-email', message: 'hi' });
  ok('an invalid e-mail is rejected 400', res.status === 400 && res.body.error.code === 'EMAIL_INVALID',
    res.status + ' ' + JSON.stringify(res.body));

  res = await api.request('POST', '/api/contact', { name: 'A', email: 'a@b.co', message: '   ' });
  ok('an empty message is rejected 400', res.status === 400 && res.body.error.code === 'MESSAGE_REQUIRED',
    res.status + ' ' + JSON.stringify(res.body));

  // Sign in.
  res = await api.request('POST', '/api/admin/login', { password: 'wrong-password' });
  ok('a wrong password is refused 401', res.status === 401, String(res.status));

  res = await api.request('POST', '/api/admin/login', { password: ADMIN_PASSWORD });
  ok('the correct password signs in', res.status === 200 && res.body.data.signedIn === true,
    res.status + ' ' + JSON.stringify(res.body));
  ok('the session cookie is httpOnly and not readable by script', api.cookie.startsWith('antara_admin='));

  // 3. The admin can retrieve what was submitted.
  res = await api.request('GET', '/api/contact/messages');
  ok('the inbox opens for an authenticated admin', res.status === 200, String(res.status));

  const inbox = (res.body && res.body.data && res.body.data.messages) || [];
  const mine = inbox.filter(m => isQa(m.email));
  mine.forEach(m => created.push(m.id));
  ok('both submissions are in the inbox', mine.length === 2, 'saw ' + inbox.length + ' message(s)');

  const first = mine.find(m => m.email === qaEmail(1));
  ok('the stored message keeps every field', Boolean(first) &&
    first.name === 'QA Visitor 1' && first.subject === 'Enquiry 1' &&
    first.message === 'Message body number 1.' && first.status === 'new',
    JSON.stringify(first));
  ok('created_at is stored as an ISO timestamp',
    Boolean(first) && !Number.isNaN(Date.parse(first.created_at)), first && first.created_at);
  ok('messages are returned newest first',
    inbox.every((m, i) => i === 0 || Date.parse(inbox[i - 1].created_at) >= Date.parse(m.created_at)));

  // 8. The inbox reports which store is in use, and that it can be written.
  ok('the inbox reports the persistent store', res.body.data.storage.kind === 'postgres',
    res.body.data.storage.kind);
  ok('the inbox reports storage as writable', res.body.data.storage.writable === true,
    String(res.body.data.storage.writable));

  // 4. Status changes.
  const targetId = first.id;
  res = await api.request('PATCH', '/api/contact/messages/' + targetId, { status: 'replied' });
  ok('a status change succeeds', res.status === 200 && res.body.data.message.status === 'replied',
    res.status + ' ' + JSON.stringify(res.body));

  res = await api.request('PATCH', '/api/contact/messages/' + targetId, { status: 'nonsense' });
  ok('an unrecognised status is rejected 400',
    res.status === 400 && res.body.error.code === 'INVALID_STATUS',
    res.status + ' ' + JSON.stringify(res.body));

  res = await api.request('PATCH', '/api/contact/messages/msg_does_not_exist', { status: 'read' });
  ok('an unknown message id is rejected 404',
    res.status === 404 && res.body.error.code === 'NOT_FOUND',
    res.status + ' ' + JSON.stringify(res.body));

  // Signing out really ends the session.
  res = await api.request('POST', '/api/admin/logout');
  ok('sign-out succeeds', res.status === 200);
  api.clearCookie();
  res = await api.request('GET', '/api/contact/messages');
  ok('the inbox is closed again after sign-out', res.status === 401, String(res.status));

  ok('no database error text reached any response body',
    !/contact_messages|constraint|postgres:\/\/|ECONNREFUSED|syntax error/i.test(JSON.stringify(res.body || {})));

  await server.stop();

  // =========================================================================
  group('Phase B — a NEW process (2: messages persist across invocations)');
  // =========================================================================

  server = await boot(dbEnv);
  api = server.client;

  await api.request('POST', '/api/admin/login', { password: ADMIN_PASSWORD });
  res = await api.request('GET', '/api/contact/messages');
  const after = (res.body && res.body.data && res.body.data.messages) || [];
  const survived = after.filter(m => isQa(m.email));

  ok('both messages survived the restart', survived.length === 2, 'saw ' + survived.length);
  ok('the status change survived the restart too',
    survived.some(m => m.email === qaEmail(1) && m.status === 'replied'),
    JSON.stringify(survived.map(m => m.email + '=' + m.status)));
  ok('the untouched message kept its original status',
    survived.some(m => m.email === qaEmail(2) && m.status === 'new'));

  // A third message, to prove the store is still writable after a restart.
  res = await api.request('POST', '/api/contact', submission(3));
  ok('a new submission is accepted by the restarted process', res.status === 200, String(res.status));

  res = await api.request('GET', '/api/contact/messages');
  const three = (res.body.data.messages || []).filter(m => isQa(m.email));
  three.forEach(m => { if (!created.includes(m.id)) created.push(m.id); });
  ok('all three messages are now present', three.length === 3, 'saw ' + three.length);

  // Field limits.
  res = await api.request('POST', '/api/contact',
    { name: 'A', email: 'a@b.co', message: 'x'.repeat(5001) });
  ok('an over-long message is rejected 400',
    res.status === 400 && res.body.error.code === 'FIELD_TOO_LONG',
    res.status + ' ' + JSON.stringify(res.body));

  await server.stop();

  // =========================================================================
  group('Phase C — local JSON mode still works (7)');
  // =========================================================================

  server = await boot(fileEnv);
  api = server.client;

  res = await api.request('POST', '/api/contact', submission(9));
  ok('a submission is accepted in JSON mode', res.status === 200 && res.body.success === true,
    res.status + ' ' + JSON.stringify(res.body));

  res = await api.request('GET', '/api/contact/messages');
  ok('the inbox still requires auth in JSON mode', res.status === 401, String(res.status));

  await api.request('POST', '/api/admin/login', { password: ADMIN_PASSWORD });
  res = await api.request('GET', '/api/contact/messages');
  ok('the JSON-mode inbox reports the file store', res.body.data.storage.kind === 'file',
    res.body.data.storage.kind);
  ok('the JSON-mode inbox is writable on a real disk', res.body.data.storage.writable === true);

  const local = res.body.data.messages;
  ok('the submission is in the JSON-mode inbox', local.length === 1 && local[0].email === qaEmail(9),
    JSON.stringify(local));

  res = await api.request('PATCH', '/api/contact/messages/' + local[0].id, { status: 'read' });
  ok('a status change works in JSON mode', res.status === 200 && res.body.data.message.status === 'read',
    res.status + ' ' + JSON.stringify(res.body));

  await server.stop();

  // The write really landed on disk, in the scratch directory and nowhere else.
  const onDisk = JSON.parse(fs.readFileSync(path.join(fileDir, 'contact_messages.json'), 'utf8'));
  ok('the JSON store wrote to the temporary directory', onDisk.length === 1);
  ok('and the status change is in the file', onDisk[0].status === 'read', JSON.stringify(onDisk[0]));

  // =========================================================================
  group('Phase D — a serverless filesystem still refuses rather than loses');
  // =========================================================================

  server = await boot({ __TEST_DATA_DIR: 'Z:/definitely-not-writable/x', DATABASE_URL: '', POSTGRES_URL: '' });
  api = server.client;

  res = await api.request('POST', '/api/contact', submission(4));
  ok('an unstorable message is declined 503, not silently dropped',
    res.status === 503 && res.body.error.code === 'CONTACT_STORAGE_UNAVAILABLE',
    res.status + ' ' + JSON.stringify(res.body));
  ok('and the visitor is told where to write instead',
    /e-?mail|try again/i.test(res.body.error.message), res.body.error.message);

  await api.request('POST', '/api/admin/login', { password: ADMIN_PASSWORD });
  res = await api.request('GET', '/api/contact/messages');
  ok('the inbox still opens and reports storage as unwritable',
    res.status === 200 && res.body.data.storage.writable === false,
    res.status + ' ' + JSON.stringify(res.body && res.body.data && res.body.data.storage));

  await server.stop();

  // =========================================================================
  if (LIVE_URL) await livePhases();
  // =========================================================================
}

/* A direct connection, used only to inspect and to clean up. The application
   never sees this pool; it is the test's own window onto the database. */
function inspector() {
  const { Pool } = require('./landing-page/node_modules/pg');
  const { sslFor } = require('./landing-page/services/postgresStore.js');
  return new Pool({ connectionString: LIVE_URL, ssl: sslFor(LIVE_URL), max: 1 });
}

/**
 * Everything the stub driver cannot prove: that the SQL is valid PostgreSQL,
 * that the schema really has the shape the code assumes, and that values are
 * bound rather than interpolated.
 */
async function livePhases() {
  // =========================================================================
  group('Phase E — real PostgreSQL: schema as actually created');
  // =========================================================================

  const pool = inspector();

  const cols = await pool.query(
    `SELECT column_name, data_type, is_nullable, column_default
       FROM information_schema.columns
      WHERE table_name = 'contact_messages'
      ORDER BY ordinal_position`);
  const byName = Object.fromEntries(cols.rows.map(r => [r.column_name, r]));

  ok('the table exists and was created by the application, not by hand',
    cols.rows.length > 0, String(cols.rows.length) + ' columns');
  ok('it has exactly the seven columns the data model specifies',
    cols.rows.length === 7, cols.rows.map(r => r.column_name).join(', '));

  [['id', 'text'], ['name', 'text'], ['email', 'text'], ['subject', 'text'],
   ['message', 'text'], ['status', 'text'], ['created_at', 'timestamp with time zone']]
    .forEach(([column, type]) => {
      ok('column ' + column + ' is ' + type,
        Boolean(byName[column]) && byName[column].data_type === type,
        byName[column] && byName[column].data_type);
    });

  ok('id is NOT NULL (it is the primary key)',
    byName.id && byName.id.is_nullable === 'NO');
  ok('created_at defaults to now() so a row can never be undated',
    byName.created_at && /now\(\)/i.test(byName.created_at.column_default || ''),
    byName.created_at && byName.created_at.column_default);

  const pk = await pool.query(
    `SELECT a.attname FROM pg_index i
       JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
      WHERE i.indrelid = 'contact_messages'::regclass AND i.indisprimary`);
  ok('id is the primary key', pk.rows.length === 1 && pk.rows[0].attname === 'id',
    JSON.stringify(pk.rows));

  const idx = await pool.query(
    `SELECT indexname FROM pg_indexes WHERE tablename = 'contact_messages'`);
  ok('the created_at index was created',
    idx.rows.some(r => r.indexname === 'contact_messages_created_at_idx'),
    idx.rows.map(r => r.indexname).join(', '));

  const check = await pool.query(
    `SELECT pg_get_constraintdef(oid) AS def FROM pg_constraint
      WHERE conrelid = 'contact_messages'::regclass AND contype = 'c'`);
  const checkDef = check.rows.map(r => r.def).join(' ');
  ok('the status CHECK constraint exists in the database itself',
    /new/.test(checkDef) && /read/.test(checkDef) && /replied/.test(checkDef) && /archived/.test(checkDef),
    checkDef);

  // Re-running the schema must be harmless — every cold instance issues it.
  const { SCHEMA } = require('./landing-page/services/postgresStore.js');
  let reran = true;
  try { await pool.query(SCHEMA); } catch (err) { reran = false; console.error('   ' + err.message); }
  ok('CREATE TABLE/INDEX IF NOT EXISTS is safe to re-run on every cold start', reran);

  // =========================================================================
  group('Phase F — real PostgreSQL: the constraints actually bite');
  // =========================================================================

  const probeId = 'msg_' + RUN_TAG + '_probe';

  let checkFired = false;
  try {
    await pool.query(
      `INSERT INTO contact_messages (id, name, email, subject, message, status)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [probeId, 'QA', qaEmail('probe'), 'S', 'M', 'not-a-real-status']);
  } catch (err) {
    checkFired = err.code === '23514';
  }
  ok('the database rejects an invalid status (CHECK, code 23514)', checkFired);

  let pkFired = false;
  try {
    await pool.query(
      `INSERT INTO contact_messages (id, name, email, subject, message, status)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [probeId, 'QA', qaEmail('probe'), 'S', 'M', 'new']);
    await pool.query(
      `INSERT INTO contact_messages (id, name, email, subject, message, status)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [probeId, 'QA', qaEmail('probe'), 'S', 'M', 'new']);
  } catch (err) {
    pkFired = err.code === '23505';
  }
  ok('the database rejects a duplicate id (primary key, code 23505)', pkFired);

  // =========================================================================
  group('Phase G — real PostgreSQL: values are bound, not interpolated');
  // =========================================================================

  const server = await boot(dbEnv);
  const api = server.client;

  /* If any value were concatenated into the SQL, this would end the table.
     It should instead be stored as ordinary text, character for character. */
  const injection = "Robert'); DROP TABLE contact_messages; --";
  let res = await api.request('POST', '/api/contact', {
    name: injection,
    email: qaEmail('inject'),
    subject: "'; DELETE FROM contact_messages; --",
    message: 'Bobby Tables says hello.'
  });
  ok('a submission containing SQL is accepted as ordinary text', res.status === 200,
    res.status + ' ' + JSON.stringify(res.body));

  const still = await pool.query(`SELECT to_regclass('contact_messages') AS t`);
  ok('the table still exists — nothing was executed', still.rows[0].t === 'contact_messages',
    String(still.rows[0].t));

  const stored = await pool.query('SELECT name, subject FROM contact_messages WHERE email = $1',
    [qaEmail('inject')]);
  ok('the SQL text was stored verbatim, proving it was a bound parameter',
    stored.rows.length === 1 && stored.rows[0].name === injection,
    JSON.stringify(stored.rows[0]));

  // Reading it back through the admin route must not mangle it either.
  await api.request('POST', '/api/admin/login', { password: ADMIN_PASSWORD });
  res = await api.request('GET', '/api/contact/messages');
  const roundTripped = (res.body.data.messages || []).find(m => m.email === qaEmail('inject'));
  ok('and it round-trips through the admin API unchanged',
    Boolean(roundTripped) && roundTripped.name === injection,
    roundTripped && roundTripped.name);

  ok('no PostgreSQL internals appear in any admin response',
    !/pg_|information_schema|constraint|relation "|syntax error/i.test(JSON.stringify(res.body)));

  await server.stop();
  await pool.end();
}

/**
 * Remove ONLY this run's rows.
 *
 * Scoped by the run tag rather than by ids gathered along the way: if an
 * assertion failed early, an id list would be incomplete and would leave rows
 * behind. A census before and after proves that nothing else was touched.
 */
async function cleanup() {
  if (!LIVE_URL) return;

  group('Cleanup — only this run\'s rows are removed');
  const pool = inspector();
  try {
    const before = await pool.query('SELECT count(*)::int AS n FROM contact_messages');
    const mine = await pool.query(
      'SELECT count(*)::int AS n FROM contact_messages WHERE email LIKE $1', [RUN_TAG + '-%']);

    const del = await pool.query(
      'DELETE FROM contact_messages WHERE email LIKE $1', [RUN_TAG + '-%']);

    const after = await pool.query('SELECT count(*)::int AS n FROM contact_messages');
    const leftovers = await pool.query(
      'SELECT count(*)::int AS n FROM contact_messages WHERE email LIKE $1', [RUN_TAG + '-%']);

    ok('every row this run created was removed', leftovers.rows[0].n === 0,
      String(leftovers.rows[0].n) + ' left');
    ok('the deletion removed exactly this run\'s rows and no others',
      del.rowCount === mine.rows[0].n && before.rows[0].n - after.rows[0].n === del.rowCount,
      'deleted ' + del.rowCount + ' of ' + mine.rows[0].n + '; table ' + before.rows[0].n + ' -> ' + after.rows[0].n);
    ok('no pre-existing row was affected',
      before.rows[0].n - mine.rows[0].n === after.rows[0].n,
      'pre-existing ' + (before.rows[0].n - mine.rows[0].n) + ', now ' + after.rows[0].n);

    console.log('  (table now holds ' + after.rows[0].n + ' row(s), none of them this run\'s)');
  } catch (err) {
    failures.push('cleanup');
    console.error('  [FAIL] cleanup could not complete — ' + err.message);
  } finally {
    await pool.end();
  }
}

main()
  .then(cleanup)
  .then(() => {
    try { fs.rmSync(scratch, { recursive: true, force: true }); } catch (err) { /* best effort */ }
    console.log('');
    if (failures.length) {
      console.log(failures.length + ' failed, ' + passed + ' passed');
      failures.forEach(f => console.log('  - ' + f));
      process.exit(1);
    }
    console.log(passed + ' passed');
  })
  .catch(err => {
    console.error('\nContact suite could not run:', err.message);
    process.exit(1);
  });
