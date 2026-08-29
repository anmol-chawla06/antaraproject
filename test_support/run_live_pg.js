#!/usr/bin/env node
/**
 * Runs validate_contact.js against a REAL PostgreSQL database.
 *
 *   node test_support/run_live_pg.js
 *
 * The connection string is read from, in order:
 *
 *   1. process.env.TEST_DATABASE_URL
 *   2. a file named by process.env.TEST_DATABASE_URL_FILE
 *   3. .env.test in the repository root  (gitignored by the `.env.*` rule)
 *
 * It is passed to the child through the environment and is NEVER printed,
 * logged or written anywhere. The only thing this script reports about it is
 * its shape — scheme, masked host, whether a password is present — which is
 * enough to diagnose a malformed string without disclosing it.
 *
 * Nothing here is part of the application; it exists so a live run is one
 * command and so no one has to paste a credential onto a command line, where
 * it would survive in shell history.
 */
'use strict';

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');

function fromFile(file) {
  if (!file || !fs.existsSync(file)) return '';
  const text = fs.readFileSync(file, 'utf8');
  const match = text.match(/^\s*(?:TEST_DATABASE_URL|DATABASE_URL)\s*=\s*(.+)\s*$/m);
  if (!match) return text.trim().startsWith('postgres') ? text.trim() : '';
  return match[1].trim().replace(/^["']|["']$/g, '');
}

const url =
  (process.env.TEST_DATABASE_URL || '').trim() ||
  fromFile(process.env.TEST_DATABASE_URL_FILE) ||
  fromFile(path.join(REPO, '.env.test'));

if (!url) {
  console.error('No connection string found.\n');
  console.error('Provide one of:');
  console.error('  - TEST_DATABASE_URL in the environment');
  console.error('  - TEST_DATABASE_URL_FILE pointing at a file that contains it');
  console.error('  - a .env.test file in the repository root containing');
  console.error('      TEST_DATABASE_URL=postgres://...');
  console.error('\n.env.test is covered by the .env.* rule in .gitignore.');
  process.exit(2);
}

// Describe the string without disclosing it, so a typo is diagnosable.
try {
  const u = new URL(url);
  const host = u.hostname;
  const masked = host.includes('.') ? '<host>.' + host.split('.').slice(-3).join('.') : '<host>';
  console.log('Connection string accepted:');
  console.log('  scheme   : ' + u.protocol.replace(':', ''));
  console.log('  host     : ' + masked);
  console.log('  database : ' + (u.pathname.slice(1) ? 'present' : 'MISSING'));
  console.log('  user     : ' + (u.username ? 'present' : 'MISSING'));
  console.log('  password : ' + (u.password ? 'present' : 'MISSING'));
  console.log('  sslmode  : ' + (u.searchParams.get('sslmode') || 'not specified (TLS still enforced by the store)'));
  console.log('');
} catch (err) {
  console.error('That value is not a valid URL. Not printing it. Check for a stray quote or newline.');
  process.exit(2);
}

const child = spawn(process.execPath, [path.join(REPO, 'validate_contact.js')], {
  cwd: REPO,
  env: Object.assign({}, process.env, { TEST_DATABASE_URL: url }),
  stdio: 'inherit'
});
child.on('exit', code => process.exit(code === null ? 1 : code));
