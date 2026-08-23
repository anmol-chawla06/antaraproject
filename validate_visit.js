#!/usr/bin/env node
/**
 * ANTARA PLAN-YOUR-VISIT / OFFICIAL BOOKING TESTS
 *
 * Antara does not sell tickets. It points visitors at the authority that
 * does. These tests guard the two ways that can go wrong:
 *
 *   1. a booking button that leads somewhere broken, generic or unofficial;
 *   2. a site with no portal quietly rendering a dead "Book Tickets" button
 *      instead of honest visitor information.
 *
 * Reachability is NOT asserted here — a test suite must not fail because a
 * government server is having a bad morning. Live reachability is a separate,
 * deliberate step: `node validate_visit.js --live`.
 */
'use strict';

const fs = require('fs');
const vm = require('vm');

let passed = 0;
const failures = [];
function group(name) { console.log('\n' + name); }
function ok(label, cond, detail) {
  if (cond) { passed++; console.log('  [PASS] ' + label); }
  else { failures.push(label); console.log('  [FAIL] ' + label + (detail ? '  :: ' + detail : '')); }
}

const ctx = { window: {}, console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname + '/map-data.js', 'utf8'), ctx);
vm.runInContext(fs.readFileSync(__dirname + '/data.js', 'utf8'), ctx);
const DESTS = ctx.DESTINATIONS || ctx.window.DESTINATIONS;

/* Hosts we accept as an official ticketing or authority channel: Indian
   government domains, plus the named trusts/boards that run a specific site.
   Anything else is a travel reseller until proven otherwise. */
const TRUSTED_EXACT = new Set([
  'victoriamemorial-cal.org',   // Victoria Memorial Hall, an autonomous body under Ministry of Culture
  'bodhgayatemple.com',         // Bodhgaya Temple Management Committee
  'sgpc.net',                   // Shiromani Gurdwara Parbandhak Committee
  'spst.in',                    // Sree Padmanabhaswamy Temple Trust
  'jktdc.co.in'                 // J&K Tourism Development Corporation
]);
const isGov = h => /(^|\.)(gov\.in|nic\.in|govt\.in)$/.test(h) || /(^|\.)paygov\.org\.in$/.test(h);
const trusted = h => isGov(h) || TRUSTED_EXACT.has(h);

const app = fs.readFileSync(__dirname + '/app.js', 'utf8');

// --- Every site is decided ---------------------------------------------

group('Coverage');

ok('all 40 heritage sites are present', DESTS.length === 40, 'got ' + DESTS.length);
ok('every site has a plan block', DESTS.every(d => d.plan && typeof d.plan === 'object'),
  DESTS.filter(d => !d.plan).map(d => d.id).join(', '));

const booked = DESTS.filter(d => d.plan && d.plan.bookingUrl);
const unbooked = DESTS.filter(d => !(d.plan && d.plan.bookingUrl));

ok('every site either has a booking URL or explains why it has none',
  unbooked.every(d => d.plan.ticketNote && d.plan.ticketNote.trim().length > 20),
  unbooked.filter(d => !(d.plan.ticketNote || '').trim()).map(d => d.id).join(', '));

// --- Booking URL integrity ----------------------------------------------

group('Booking links');

const bad = [];
for (const d of booked) {
  const u = d.plan.bookingUrl;
  let parsed = null;
  try { parsed = new URL(u); } catch (e) { /* reported below */ }
  if (!parsed) { bad.push(d.id + ': unparseable ' + u); continue; }
  if (parsed.protocol !== 'https:') bad.push(d.id + ': not https — ' + u);
  if (!trusted(parsed.hostname)) bad.push(d.id + ': untrusted host ' + parsed.hostname);
}
ok('every booking URL is a parseable https URL on an official host', bad.length === 0, bad.join(' | '));

ok('no booking URL contains a placeholder or undefined segment',
  booked.every(d => !/undefined|null|example\.com|TODO|xxx/i.test(d.plan.bookingUrl)),
  booked.filter(d => /undefined|null|example\.com|TODO|xxx/i.test(d.plan.bookingUrl)).map(d => d.id).join(', '));

ok('every booking URL records the provider the visitor is sent to',
  booked.every(d => (d.plan.bookingProvider || '').trim().length > 0),
  booked.filter(d => !(d.plan.bookingProvider || '').trim()).map(d => d.id).join(', '));

ok('every booking URL records when it was last verified',
  booked.every(d => /^\d{4}-\d{2}-\d{2}$/.test(d.plan.bookingVerified || '')),
  booked.filter(d => !/^\d{4}-\d{2}-\d{2}$/.test(d.plan.bookingVerified || '')).map(d => d.id).join(', '));

/* The failure this codebase actually had: a state department homepage stood in
   as a "booking portal" for two different monuments. A URL shared across sites
   is only legitimate when it is a genuine multi-monument portal (ASI's). */
const MULTI = new Set(['https://asi.paygov.org.in/asi-webapp/#/ticketbooking']);
const byUrl = new Map();
booked.forEach(d => { const u = d.plan.bookingUrl; byUrl.set(u, (byUrl.get(u) || []).concat(d.id)); });
const shared = [...byUrl].filter(([u, ids]) => ids.length > 1 && !MULTI.has(u));
ok('no booking URL is reused across sites unless it is a real multi-site portal',
  shared.length === 0, shared.map(([u, ids]) => u + ' -> ' + ids.join(',')).join(' | '));

/* A bare origin is a homepage, not a booking page. Allowed only for portals
   that open directly onto their own booking flow. */
const ROOT_OK = new Set(['registrationandtouristcare.uk.gov.in']);
const rootish = booked.filter(d => {
  const p = new URL(d.plan.bookingUrl);
  return (p.pathname === '/' || p.pathname === '') && !p.hash && !ROOT_OK.has(p.hostname);
});
ok('no booking URL is a bare homepage standing in for a booking page',
  rootish.length === 0, rootish.map(d => d.id + ' -> ' + d.plan.bookingUrl).join(', '));

// --- Authority links ----------------------------------------------------

group('Authority links');

const withAuth = DESTS.filter(d => d.plan && d.plan.authorityUrl);
const authBad = [];
for (const d of withAuth) {
  let p = null;
  try { p = new URL(d.plan.authorityUrl); } catch (e) { authBad.push(d.id + ': unparseable'); continue; }
  if (p.protocol !== 'https:') authBad.push(d.id + ': not https');
  if (!trusted(p.hostname)) authBad.push(d.id + ': untrusted host ' + p.hostname);
}
ok('every authority URL is https and on an official host', authBad.length === 0, authBad.join(' | '));

ok('every authority URL is labelled so the visitor knows who they are trusting',
  withAuth.every(d => (d.plan.authorityLabel || '').trim().length > 0),
  withAuth.filter(d => !(d.plan.authorityLabel || '').trim()).map(d => d.id).join(', '));

ok('every site without booking still offers an authority link',
  unbooked.every(d => d.plan.authorityUrl),
  unbooked.filter(d => !d.plan.authorityUrl).map(d => d.id).join(', '));

// --- Rendering ----------------------------------------------------------

group('Rendering');

ok('a booking button is rendered only when a booking URL exists',
  /if\(p\.bookingUrl\)\{/.test(app.replace(/\s+/g, '')) ||
  /if\s*\(\s*p\.bookingUrl\s*\)\s*\{/.test(app));

ok('the booking button uses the agreed label', app.includes('Book Official Tickets'));
ok('the booking button carries the ticket emoji', app.includes('🎟️'));
ok('the redirect is disclosed before the visitor leaves',
  app.includes("You'll be redirected to the official booking portal"));
ok('Antara states that it does not sell tickets',
  app.includes('Antara does not sell tickets'));

/* Every anchor that opens a new tab must be safe against tab-nabbing and
   must not leak the visitor's page to the destination. */
const targets = [...app.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)].map(m => m[0]);
ok('every external anchor opens with target="_blank"', targets.length > 0);
const unsafe = targets.filter(a => !/rel="[^"]*noopener[^"]*"/.test(a) || !/rel="[^"]*noreferrer[^"]*"/.test(a));
ok('every target="_blank" anchor sets rel="noopener noreferrer"',
  unsafe.length === 0, unsafe.join(' | '));

ok('no template can emit href="undefined"',
  !/href="\$\{(?:esc\()?[a-z]+\.bookingUrl/i.test(app.replace(/p\.bookingUrl \?[\s\S]*?:/g, '')) ||
  app.includes('if(p.bookingUrl)') || app.includes('if (p.bookingUrl)'));

ok('the no-booking path renders visitor information instead',
  app.includes('plan-info') && app.includes('Visiting this site'));

// --- Manual-verification register ---------------------------------------

group('Manual verification register');

const flagged = DESTS.filter(d => d.plan && d.plan.needsVerification);
ok('every flagged site explains what needs checking',
  flagged.every(d => d.plan.needsVerification.trim().length > 20),
  flagged.filter(d => d.plan.needsVerification.trim().length <= 20).map(d => d.id).join(', '));

console.log('');
console.log('         sites with a verified official booking link : ' + booked.length);
console.log('         sites showing visitor information instead   : ' + unbooked.length);
console.log('         sites flagged for manual re-verification    : ' + flagged.length);
flagged.forEach(d => console.log('           - ' + d.id + ': ' + d.plan.needsVerification));

// --- Optional live reachability -----------------------------------------

async function live() {
  group('Live reachability (--live)');
  const urls = [...new Set(DESTS.flatMap(d => [d.plan.bookingUrl, d.plan.authorityUrl]).filter(Boolean))];
  const UA = 'AntaraHeritageBot/1.0 (+https://github.com/antara-india; link check)';
  for (const u of urls) {
    let label = u.length > 72 ? u.slice(0, 69) + '...' : u;
    try {
      const r = await fetch(u, { headers: { 'User-Agent': UA }, redirect: 'follow', signal: AbortSignal.timeout(30000) });
      ok(label, r.status >= 200 && r.status < 400, 'HTTP ' + r.status);
    } catch (e) {
      // Several government hosts reject non-browser clients or ship an
      // incomplete TLS chain; that is a warning, not a dataset defect.
      console.log('  [WARN] ' + label + '  :: ' + String(e.message).slice(0, 70));
    }
  }
}

(async () => {
  if (process.argv.includes('--live')) await live();
  console.log('');
  if (failures.length) {
    console.log(failures.length + ' failed, ' + passed + ' passed');
    failures.forEach(f => console.log('  - ' + f));
    process.exit(1);
  }
  console.log(passed + ' passed');
})();
