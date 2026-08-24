#!/usr/bin/env node
/**
 * ANTARA SERVER SECURITY TESTS
 *
 * Static guards over landing-page/server.js. These are shape assertions, not
 * live requests, so they run in the normal suite without a server.
 *
 * They exist because of a real leak: landing-page/ is a child of the repository
 * root, and the repo-root static mount served every file in it a second time
 * under the "/landing-page/" prefix. The /admin and /data guards never saw that
 * path, so the raw contact store — real names, e-mail addresses and message
 * bodies — was publicly downloadable, along with the admin shell, the auth
 * middleware and server.js itself.
 */
'use strict';

const fs = require('fs');
const path = require('path');

let passed = 0;
const failures = [];
function group(name) { console.log('\n' + name); }
function ok(label, cond, detail) {
  if (cond) { passed++; console.log('  [PASS] ' + label); }
  else { failures.push(label); console.log('  [FAIL] ' + label + (detail ? '  :: ' + detail : '')); }
}

const SERVER = path.join(__dirname, 'landing-page', 'server.js');
const AUTH = path.join(__dirname, 'landing-page', 'middleware', 'adminAuth.js');
const src = fs.readFileSync(SERVER, 'utf8');
const auth = fs.readFileSync(AUTH, 'utf8');
const strip = s => s.replace(/\s+/g, ' ');

// --- The leak this suite exists to prevent -------------------------------

group('The /landing-page/** static bypass stays closed');

ok('a guard is mounted on /landing-page', /app\.use\(\s*['"]\/landing-page['"]/.test(src));

const guardIdx = src.indexOf("app.use('/landing-page'");
const rootStaticIdx = src.search(/app\.use\(\s*express\.static\(\s*ROOT_DIR/);
ok('the guard is registered BEFORE the repo-root static mount',
  guardIdx > -1 && rootStaticIdx > -1 && guardIdx < rootStaticIdx,
  'guard@' + guardIdx + ' rootStatic@' + rootStaticIdx);

ok('the guard answers 404 rather than redirecting or listing',
  /app\.use\(\s*['"]\/landing-page['"][\s\S]{0,900}?res\.status\(404\)/.test(src));

/* Only the landing page's own public assets may be reached by that prefix.
   If someone adds "data", "admin" or "middleware" to the allow-list, the leak
   returns — so assert the allow-list's contents, not merely its presence. */
const allowFiles = (src.match(/LANDING_PUBLIC_FILES\s*=\s*new Set\(\[([^\]]*)\]/) || [])[1] || '';
const allowDirs = (src.match(/LANDING_PUBLIC_DIRS\s*=\s*\[([^\]]*)\]/) || [])[1] || '';
ok('an explicit allow-list of public files exists', allowFiles.length > 0);
ok('an explicit allow-list of public directories exists', allowDirs.length > 0);

['data', 'admin', 'middleware', 'node_modules', 'server.js', 'package.json', '.env']
  .forEach(secret => {
    ok('the allow-list never admits "' + secret + '"',
      !allowFiles.includes(secret) && !allowDirs.includes(secret),
      'files=[' + allowFiles.trim() + '] dirs=[' + allowDirs.trim() + ']');
  });

ok('path traversal out of /landing-page is rejected', /includes\(\s*['"]\.\.['"]\s*\)/.test(src));
ok('a malformed percent-escape cannot throw past the guard',
  /catch\s*\([\s\S]{0,120}?res\.status\(404\)/.test(src));

// --- The other guards that were already there ----------------------------

group('Existing store and admin guards');

ok('the raw contact store is never served at /data',
  /app\.use\(\s*['"]\/data['"][\s\S]{0,200}?res\.status\(404\)/.test(src));
ok('admin static files sit behind requireAdmin',
  /app\.use\(\s*['"]\/admin['"]\s*,\s*requireAdmin\s*,\s*express\.static/.test(src));
ok('the admin message list requires auth',
  /app\.get\(\s*['"]\/api\/contact\/messages['"]\s*,\s*requireAdmin/.test(src));
ok('the admin status update requires auth',
  /app\.patch\(\s*['"]\/api\/contact\/messages\/:id['"]\s*,\s*requireAdmin/.test(src));
ok('sign-in is rate limited', /app\.post\(\s*['"]\/api\/admin\/login['"]\s*,\s*loginLimiter/.test(src));

// --- Authentication cannot silently weaken -------------------------------

group('Admin authentication');

ok('there is no default password anywhere',
  !/ADMIN_PASSWORD\s*\|\|\s*['"][^'"]+['"]/.test(auth) && !/ADMIN_PASSWORD\s*\|\|\s*['"][^'"]+['"]/.test(src));
ok('an unset password disables the admin area rather than opening it',
  /function isConfigured\(\)\s*\{\s*return Boolean\(process\.env\.ADMIN_PASSWORD\)/.test(strip(auth).replace(/ \{ /g, ' {\n')) ||
  /isConfigured[\s\S]{0,80}Boolean\(process\.env\.ADMIN_PASSWORD\)/.test(auth));
ok('requireAdmin refuses when unconfigured', /if \(!isConfigured\(\)\)[\s\S]{0,200}503/.test(auth));
ok('the password is compared in constant time', /timingSafeEqual/.test(auth));
ok('the comparison is length-independent (hashed first)', /sha256\([\s\S]{0,60}timingSafeEqual|timingSafeEqual\(sha256/.test(strip(auth)));
ok('the session cookie is httpOnly', /httpOnly:\s*true/.test(auth));
ok('the session cookie is sameSite strict', /sameSite:\s*['"]strict['"]/.test(auth));
ok('the session cookie is signed', /createHmac\(\s*['"]sha256['"]/.test(auth));
ok('sessions expire', /SESSION_TTL_MS/.test(auth) && /Date\.now\(\) < expiresAt/.test(auth));
ok('the session secret is not hardcoded',
  /ADMIN_SESSION_SECRET \|\| crypto\.randomBytes/.test(auth));

// --- No credential may reach the browser ---------------------------------

group('No secret reaches the client');

const clientFiles = [
  'landing-page/admin-login.html',
  'landing-page/admin/messages/index.html',
  'landing-page/js/main.js',
  'landing-page/index.html'
].map(p => path.join(__dirname, p)).filter(fs.existsSync);

clientFiles.forEach(f => {
  const text = fs.readFileSync(f, 'utf8');
  const rel = path.relative(__dirname, f).replace(/\\/g, '/');
  ok(rel + ' contains no admin password', !/ADMIN_PASSWORD/.test(text));
  ok(rel + ' contains no session secret', !/ADMIN_SESSION_SECRET/.test(text));
  ok(rel + ' contains no API key', !/OPENAI_API_KEY|sk-[A-Za-z0-9]{16,}/.test(text));
});

// --- The admin link points at the guarded mount --------------------------

group('Admin entry point');

const landing = fs.readFileSync(path.join(__dirname, 'landing-page', 'index.html'), 'utf8');
const adminLink = (landing.match(/<a[^>]+id="btnAdminPanel"[^>]*>/) || [])[0] || '';
ok('the landing page links to the admin panel', adminLink.length > 0);
/* A relative href resolved to /landing-page/admin/messages/ when the page was
   served at /landing-page/index.html — the unguarded copy, not the real mount. */
ok('the admin link is root-relative, so it always hits the guarded mount',
  /href="\/admin\/messages\/"/.test(adminLink), adminLink);

console.log('');
if (failures.length) {
  console.log(failures.length + ' failed, ' + passed + ' passed');
  failures.forEach(f => console.log('  - ' + f));
  process.exit(1);
}
console.log(passed + ' passed');
