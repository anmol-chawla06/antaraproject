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
  ok(rel + ' contains no database credentials',
    !/DATABASE_URL|POSTGRES_URL|postgres(ql)?:\/\//.test(text));
});

// --- Serverless / Vercel deployment contract -----------------------------

group('Deployment (Vercel) contract');

ok('the server exports the Express app', /module\.exports\s*=\s*app/.test(src));
ok('listen() runs only when the file is executed directly',
  /if \(require\.main === module\)[\s\S]{0,200}app\.listen\(/.test(src));
ok('a Vercel entrypoint exists', fs.existsSync(path.join(__dirname, 'api', 'index.js')));
ok('the entrypoint re-exports the same app rather than redefining routes',
  /module\.exports\s*=\s*require\(['"]\.\.\/landing-page\/server(\.js)?['"]\)/.test(
    fs.readFileSync(path.join(__dirname, 'api', 'index.js'), 'utf8')));

const vercelCfgPath = path.join(__dirname, 'vercel.json');
ok('vercel.json exists', fs.existsSync(vercelCfgPath));
const vercelCfg = JSON.parse(fs.readFileSync(vercelCfgPath, 'utf8'));
/* Every request must reach Express. The security allow-list, the admin session
   check and the /data and /landing-page guards all live there, so a CDN that
   served files straight off the filesystem would bypass all of them. */
ok('every route is sent to the function, so nothing bypasses the Express guards',
  Array.isArray(vercelCfg.routes) && vercelCfg.routes.some(r => r.src === '/(.*)' && r.dest === '/api/index'),
  JSON.stringify(vercelCfg.routes));
ok('no rewrite lets the filesystem answer first', !vercelCfg.rewrites);

/* THE ROOT-ROUTING BUG.
 *
 * Vercel checks the output directory for a matching static file BEFORE it
 * evaluates `routes`, and serves any hit straight from the CDN. With
 * outputDirectory "." the repository root was the output directory, so a
 * request for "/" was answered by the root index.html — the FESTIVAL portal —
 * and the landing page never got a look in. Express was never reached, which
 * also meant every guard above it was bypassed for any path that happened to
 * exist as a file.
 *
 * The fix is to publish an EMPTY output directory, so the filesystem check
 * always misses and routing falls through to the function. */
const outDir = vercelCfg.outputDirectory;
ok('the output directory is not the repository root',
  outDir && outDir !== '.' && outDir !== './' && outDir !== '',
  String(outDir));

const outDirPath = path.join(__dirname, outDir || '.');
ok('the output directory exists, so the build cannot fail to find it',
  fs.existsSync(outDirPath), outDirPath);

/* Anything in here is served by the CDN without passing through Express. */
const servable = fs.existsSync(outDirPath)
  ? fs.readdirSync(outDirPath).filter(f => !f.startsWith('.'))
  : [];
ok('the output directory publishes no file that could pre-empt Express',
  servable.length === 0, servable.join(', '));
ok('and it contains no index.html, which is what hijacked "/"',
  !fs.existsSync(path.join(outDirPath, 'index.html')));

/* Everything the browser loads must be inside the function bundle, because the
   CDN now serves nothing at all. The festival portal fetches
   festivals_database.json and the library fetches texts_database.json, both at
   the repository root — they were previously answered by the CDN. */
const include = (vercelCfg.functions && vercelCfg.functions['api/index.js'] || {}).includeFiles || '';
['landing-page/**', '*.html', '*.js', '*.css', '*.json', 'images/**', 'audio/**', 'data/**']
  .forEach(pattern => {
    ok('the function bundle includes ' + pattern, include.includes(pattern), include);
  });

// --- Which application answers which URL ---------------------------------

group('Front-end routing is explicit, not left to mount order');

/* Two applications ship a file called index.html. Which one answers "/" is a
   product decision and must be stated, not inherited from whichever
   express.static mount was registered first. */
ok('"/" is an explicit route, not a static-mount side effect',
  /app\.get\(\s*['"]\/['"]\s*,/.test(src));
ok('"/" serves the LANDING page', /LANDING_INDEX\s*=\s*path\.join\(__dirname, 'index\.html'\)/.test(src) &&
  /app\.get\(\s*['"]\/['"][\s\S]{0,120}?LANDING_INDEX/.test(src));
ok('the festival portal is defined from the repository root',
  /FESTIVALS_INDEX\s*=\s*path\.join\(ROOT_DIR, 'index\.html'\)/.test(src));
ok('/festivals.html serves the festival portal',
  /'\/festivals\.html'[\s\S]{0,120}FESTIVALS_INDEX/.test(src));
ok('/index.html still serves the festival portal, so existing links keep working',
  /'\/index\.html'[\s\S]{0,120}FESTIVALS_INDEX/.test(src) ||
  /'\/festivals\.html',\s*'\/index\.html'/.test(src));
ok('the landing page is never also served at "/" by accident',
  (src.match(/app\.get\(\s*\[?\s*['"]\/['"]/g) || []).length === 1);

/* --- Navigation targets are routes, not source folders -------------------
 *
 * Every module used to send its "home" control to "landing-page/index.html".
 * That is a path into the repository layout, not a URL of the product: it
 * exposes which folder holds which application, it lands on the second,
 * guard-adjacent copy of the landing page rather than the canonical one, and
 * it breaks the moment the folder is renamed. The public site addresses
 * itself only by route. */
const FRONT_ENDS = ['index.html', 'map.html', 'library.html', 'visual-india.html',
                    path.join('landing-page', 'index.html')];
FRONT_ENDS.forEach(rel => {
  const html = fs.readFileSync(path.join(__dirname, rel), 'utf8');
  const leaks = [...html.matchAll(/href="([^"]*landing-page\/[^"]*)"/g)].map(m => m[1]);
  ok(rel.replace(/\\/g, '/') + ' links to no source folder', leaks.length === 0, leaks.join(', '));
});

/* Each module carries a control back to Antara, and it points at "/" — the
   canonical home — rather than at any application's own index.html. */
[['index.html', /class="brand-title"/], ['map.html', /id="home-link"/],
 ['library.html', /id="homeLink"/], ['visual-india.html', /class="vi-brand"/]].forEach(([rel, marker]) => {
  const html = fs.readFileSync(path.join(__dirname, rel), 'utf8');
  const anchors = [...html.matchAll(/<a[^>]*href="\/"[^>]*>[\s\S]{0,200}?<\/a>/g)].map(m => m[0]);
  ok(rel + ' has a home control pointing at "/"',
    anchors.some(a => marker.test(a)), anchors.length + ' root anchor(s)');
});

/* The landing page is the navigation hub: each call to action addresses the
   module by its production route. "#/" on Visual India is its own hash router
   and must survive. */
const hub = fs.readFileSync(path.join(__dirname, 'landing-page', 'index.html'), 'utf8');
[['Explore the Map', '/map.html'],
 ['Visual India', '/visual-india.html#/'],
 ['Explore the Archive', '/library.html'],
 ['Plan Your Visit', '/festivals.html'],
 ['Festival calendar', '/festivals.html#festival-section']].forEach(([label, href]) => {
  ok('landing page: ' + label.padEnd(20) + ' -> ' + href, hub.includes('href="' + href + '"'));
});
/* Navigation only. The stylesheet link may keep its "../" — it resolves to the
   same file whether the page is served at "/" or at "/landing-page/index.html",
   and both of those URLs are supported. */
const hubAnchors = (hub.match(/<a[^>]+href="\.\.\/[^"]*"/g) || []);
ok('no landing-page call to action still climbs out with "../"',
  hubAnchors.length === 0, hubAnchors.join(', '));
/* The festival portal owns this anchor; the landing page links straight to it. */
ok('the festival portal still has the #festival-section anchor',
  /id="festival-section"/.test(fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')));

/* Express is now the only gatekeeper, so the private-path list is load-bearing. */
group('Repository internals stay private');

['/node_modules', '/package.json', '/package-lock.json', '/data_builders', '/test_support']
  .forEach(entry => {
    ok('the private-path list blocks ' + entry, src.includes("'" + entry + "'"), entry);
  });
ok('developer file types are blocked by extension',
  /PRIVATE_EXTENSIONS\s*=\s*\/\\\.\(md\|py\|sh\|bat/.test(src) || /PRIVATE_EXTENSIONS/.test(src));
ok('the validators are not served', /validate_\[\^\/\]\*\\\.js/.test(src) || /validate_/.test(src));

/* The OpenAI constructor throws without a key. Building it at module load made
   one missing variable take down the entire site, not just Heritage AI. */
ok('the OpenAI client is constructed lazily, not at module load',
  /function getOpenAI\(\)/.test(src) && !/^const openai = new OpenAI\(/m.test(src));
ok('a missing OpenAI key yields 503 rather than a crash',
  /getOpenAI\(\)[\s\S]{0,200}AI_UNCONFIGURED/.test(src));

/* Storage sits behind an interface with two implementations: a JSON file for
   local development and PostgreSQL for a host whose filesystem cannot keep
   anything. Behaviour is tested live in validate_contact.js; these are the
   structural guarantees that keep the serverless contract intact. */
const SERVICES = path.join(__dirname, 'landing-page', 'services');
ok('contact storage is isolated behind a store module',
  fs.existsSync(path.join(SERVICES, 'contactStore.js')));
ok('a persistent PostgreSQL implementation exists',
  fs.existsSync(path.join(SERVICES, 'postgresStore.js')));

const storeSrc = fs.readFileSync(path.join(SERVICES, 'contactStore.js'), 'utf8');
const pgSrc = fs.readFileSync(path.join(SERVICES, 'postgresStore.js'), 'utf8');

ok('the server no longer writes the store directly at module load',
  !/fs\.writeFileSync\(CONTACT_FILE/.test(src) && !/fs\.mkdirSync\(DATA_DIR/.test(src));
ok('a store that cannot keep a message refuses submissions instead of losing them',
  /CONTACT_STORAGE_UNAVAILABLE/.test(src));

/* The store is chosen by configuration, so one deployment cannot silently get
   the other's behaviour. */
ok('a connection string selects the persistent store',
  /if \(databaseUrl\) return createPostgresStore\(databaseUrl\)/.test(storeSrc));
ok('and its absence falls back to the JSON file store',
  /return createFileStore\(/.test(storeSrc));
ok('both DATABASE_URL and Vercel\'s POSTGRES_URL are accepted',
  /process\.env\.DATABASE_URL/.test(storeSrc) && /process\.env\.POSTGRES_URL/.test(storeSrc));

/* The single rule that keeps a serverless function alive: importing this module
   must not connect, query or write. A CREATE TABLE at module load would fail
   the whole function before it could serve a page. */
ok('the schema is created lazily, not at module load',
  /function ensureReady\(\)/.test(pgSrc) &&
  !/^\s*(pool|client)\s*=\s*new Pool\(/m.test(pgSrc.replace(/function getPool[\s\S]*?\n  }/, '')));
ok('the driver itself is required lazily, so a broken dependency cannot fell the site',
  /require\('pg'\)/.test(pgSrc) && !/^const \{ Pool \} = require\('pg'\)/m.test(pgSrc));
ok('a failed connection is not memoised as permanent',
  /readyPromise = null/.test(pgSrc));
ok('the pool has an error listener, so a dropped idle client cannot kill the process',
  /pool\.on\('error'/.test(pgSrc));

/* Credentials and database internals must not travel outward. */
ok('database TLS certificates are verified',
  /rejectUnauthorized: true/.test(pgSrc) && !/rejectUnauthorized: false/.test(pgSrc));
ok('raw database errors are logged, never returned to the caller',
  /logDbError/.test(pgSrc) && /reason: 'STORAGE_ERROR'/.test(pgSrc));
ok('the store reports a host, never the connection string that carries the password',
  /new URL\(connectionString\)\.host/.test(pgSrc));
ok('every value reaches SQL as a bound parameter, never string concatenation',
  /\$1/.test(pgSrc) && !/(SELECT|INSERT|UPDATE|DELETE)[^\n]*\$\{/.test(pgSrc));
ok('status is constrained in the schema, not only in the route',
  /CHECK \(status IN \('new', 'read', 'replied', 'archived'\)\)/.test(pgSrc));

ok('the driver is a declared dependency',
  Boolean(JSON.parse(fs.readFileSync(path.join(__dirname, 'landing-page', 'package.json'), 'utf8')).dependencies.pg));

/* Contact messages are the ONLY thing that moved to a database. */
['heritage', 'manuscript', 'festival', 'sites', 'media'].forEach(domain => {
  ok('no ' + domain + ' table was introduced', !new RegExp('CREATE TABLE[^;]*' + domain, 'i').test(pgSrc));
});

/* Deployment internals are not part of the public site. */
ok('vercel.json and the entrypoint are not publicly served',
  /'\/vercel\.json', '\/api\/index\.js'/.test(src) || /vercel\.json[\s\S]{0,120}status\(404\)/.test(src));

const ignorePath = path.join(__dirname, '.vercelignore');
ok('.vercelignore exists', fs.existsSync(ignorePath));
const ignore = fs.existsSync(ignorePath) ? fs.readFileSync(ignorePath, 'utf8') : '';
['.env', 'contact_messages.json'].forEach(entry =>
  ok('.vercelignore keeps ' + entry + ' out of the deployment', ignore.includes(entry)));

// --- Environment template -------------------------------------------------

group('Environment template');

const envExample = fs.readFileSync(path.join(__dirname, 'landing-page', '.env.example'), 'utf8');
const declared = (envExample.match(/^[A-Z_][A-Z0-9_]*=/gm) || []).map(l => l.replace('=', ''));
// Everything the server can read, including the storage services.
const allCode = src + auth + storeSrc + pgSrc;

ok('the template declares every variable the server reads',
  ['OPENAI_API_KEY','OPENAI_MODEL','ADMIN_PASSWORD','ADMIN_SESSION_SECRET',
   'DATABASE_URL','CONTACT_EMAIL','PORT','ALLOWED_ORIGINS']
    .every(v => declared.includes(v)), declared.join(', '));
ok('the template declares no obsolete Telegram or Gemini variables',
  !declared.some(v => /^(GEMINI|TELEGRAM)_/.test(v)), declared.filter(v => /^(GEMINI|TELEGRAM)_/.test(v)).join(', '));
ok('every declared variable is actually read by the code',
  declared.every(v => new RegExp('process\\.env\\.' + v).test(allCode)),
  declared.filter(v => !new RegExp('process\\.env\\.' + v).test(allCode)).join(', '));
ok('the template carries no real values',
  declared.every(v => {
    const m = envExample.match(new RegExp('^' + v + '=(.*)$', 'm'));
    const val = m ? m[1].trim() : '';
    return val === '' || val === 'gpt-4o' || val === '8080';
  }));
/* A connection string carries a username and password. The template must never
   hold one, and neither must anything the browser receives. */
ok('the template holds no real connection string',
  !/postgres(ql)?:\/\/[^\s]*:[^\s]*@/.test(envExample));

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
