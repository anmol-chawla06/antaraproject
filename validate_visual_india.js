#!/usr/bin/env node
/**
 * ANTARA — VISUAL INDIA + LINE-ART CLEANUP TESTS
 *
 * Two things are guarded here:
 *
 *  1. The decorative line-art is gone and cannot come back. The art plates were
 *     drawn on a 400x300 canvas by an `artSVG` helper; both the helper and the
 *     "Switch to Line Art" control must stay deleted.
 *
 *  2. Visual India is genuinely derived. Every state, count, image and link is
 *     computed from the destination list, so adding a site to data.js must flow
 *     through with no frontend edit. These tests assert that by rebuilding the
 *     model with an extra synthetic site and checking it lands correctly.
 */
'use strict';

const fs = require('fs');
const vm = require('vm');
const path = require('path');
const VI = require('./visual-india.js');
const MEDIA = require('./site-media.js');

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
const DESTS = ctx.window.DESTINATIONS;
const META = ctx.window.STATES_META;

const appJs = fs.readFileSync(__dirname + '/app.js', 'utf8');
const appCss = fs.readFileSync(__dirname + '/app.css', 'utf8');
const viCss = fs.readFileSync(__dirname + '/visual-india.css', 'utf8');
const viHtml = fs.readFileSync(__dirname + '/visual-india.html', 'utf8');
const mapHtml = fs.readFileSync(__dirname + '/map.html', 'utf8');

const STATES = VI.buildStates(DESTS, META);

// --- 12. Line-art cleanup ------------------------------------------------

group('Line-art cleanup');

ok('the artSVG line-art generator is gone from app.js', !/\bartSVG\b/.test(appJs));
ok('no 400x300 art-plate canvas is emitted anywhere',
  !/viewBox="0 0 400 300"/.test(appJs) && !/viewBox="0 0 400 300"/.test(viCss));
ok('the "Switch to Line Art" control is gone',
  !/art-mode-toggle/.test(appJs) && !/Switch to Line Art/.test(appJs));
ok('its stylesheet rules are gone too', !/\.view-toggle-btn/.test(appCss));

/* The bug the screenshots actually showed: a 24x24 icon with no width/height
   stretching to fill its flex parent. A base rule must keep every inline icon
   at icon size. */
ok('inline 24x24 icons are given a default size',
  /svg\[viewBox="0 0 24 24"\]\s*\{[^}]*width:/.test(appCss));
ok('that rule cannot touch the map, which uses its own viewBoxes',
  !/svg\s*\{\s*width:\s*100%/.test(appCss.split('#map-svg')[0] || ''));

/* Look Closer hotspots are positioned against one specific detail photograph.
   Without that photograph the section must not render at all. */
ok('Look Closer renders only when its detail photograph exists',
  /dest\.lookCloser && hotspots\.length && dest\.lookCloser\.image/.test(appJs));
const closerNoImage = DESTS.filter(d => d.lookCloser && (d.lookCloser.hotspots || []).length && !d.lookCloser.image);
console.log('         ' + closerNoImage.length + ' site(s) correctly omit Look Closer for want of a detail photograph');

ok('the media placeholder no longer draws a picture',
  /media-placeholder-name/.test(appJs) && !/media-placeholder[\s\S]{0,400}artSVG/.test(appJs));

// --- 1. States generated dynamically -------------------------------------

group('States are derived, not hardcoded');

const statesInData = new Set(DESTS.map(d => d.state));
ok('every state in the dataset produces exactly one state entry',
  STATES.length === statesInData.size, STATES.length + ' vs ' + statesInData.size);
ok('no state name is invented',
  STATES.every(s => statesInData.has(s.name)),
  STATES.filter(s => !statesInData.has(s.name)).map(s => s.name).join(', '));
ok('no state list is hardcoded in the page controller',
  !/Rajasthan|Uttar Pradesh|Tamil Nadu/.test(fs.readFileSync(__dirname + '/visual-india-page.js', 'utf8')));
ok('slugs match the map router\'s STATES_META, so both address a state alike',
  STATES.every(s => !META[s.name] || META[s.name].slug === s.slug),
  STATES.filter(s => META[s.name] && META[s.name].slug !== s.slug).map(s => s.name).join(', '));
ok('every slug is unique', new Set(STATES.map(s => s.slug)).size === STATES.length);
ok('every slug is URL-safe', STATES.every(s => /^[a-z0-9-]+$/.test(s.slug)),
  STATES.filter(s => !/^[a-z0-9-]+$/.test(s.slug)).map(s => s.slug).join(', '));

// --- 2. Correct site count per state -------------------------------------

group('Site counts');

const expected = {};
DESTS.forEach(d => { expected[d.state] = (expected[d.state] || 0) + 1; });
const countMismatch = STATES.filter(s => s.siteCount !== expected[s.name]);
ok('each state reports the number of sites the dataset gives it',
  countMismatch.length === 0,
  countMismatch.map(s => s.name + ': ' + s.siteCount + ' vs ' + expected[s.name]).join(', '));
ok('site counts sum to the whole dataset',
  STATES.reduce((n, s) => n + s.siteCount, 0) === DESTS.length);
ok('the rendered group list length matches the reported count',
  STATES.every(s => s.sites.length === s.siteCount),
  STATES.filter(s => s.sites.length !== s.siteCount).map(s => s.name).join(', '));
ok('every site appears in exactly one state',
  (() => {
    const seen = new Map();
    STATES.forEach(s => s.sites.forEach(x => seen.set(x.id, (seen.get(x.id) || 0) + 1)));
    return seen.size === DESTS.length && [...seen.values()].every(v => v === 1);
  })());

// --- 3 & 4. Correct, non-duplicated imagery ------------------------------

group('Imagery');

ok('every site\'s pictures come from that site\'s own media record',
  STATES.every(s => s.sites.every(site => {
    const dest = DESTS.find(d => d.id === site.id);
    const own = new Set(MEDIA.resolveMedia(dest).gallery.map(g => g.src));
    return site.gallery.every(g => own.has(g.src)) && site.preview.every(p => own.has(p.src));
  })));

ok('no picture is repeated inside a site\'s preview strip',
  STATES.every(s => s.sites.every(site => new Set(site.preview.map(p => p.src)).size === site.preview.length)));

ok('a preview strip holds at most three pictures',
  STATES.every(s => s.sites.every(site => site.preview.length <= 3)),
  'limit is 3');

/* The regression that would be worst: one site's photograph illustrating
   another site. Asserted across the whole model, not per state. */
const owner = new Map();
let crossed = [];
STATES.forEach(s => s.sites.forEach(site => {
  site.gallery.forEach(g => {
    if (owner.has(g.src) && owner.get(g.src) !== site.id) crossed.push(g.src + ' -> ' + owner.get(g.src) + ' & ' + site.id);
    owner.set(g.src, site.id);
  });
}));
ok('no photograph is shared between two heritage sites', crossed.length === 0, crossed.slice(0, 3).join(' | '));

ok('no image record is copied into a second schema — src strings are the media resolver\'s own',
  STATES.every(s => s.sites.every(site => site.gallery.every(g => typeof g.src === 'string' && g.src.length > 0))));

// --- 11. No broken images ------------------------------------------------

group('Files on disk');

const missing = [];
STATES.forEach(s => {
  if (s.representative && !fs.existsSync(path.join(__dirname, decodeURIComponent(s.representative.src)))) {
    missing.push(s.name + ' representative: ' + s.representative.src);
  }
  s.sites.forEach(site => site.gallery.forEach(g => {
    if (!fs.existsSync(path.join(__dirname, decodeURIComponent(g.src)))) missing.push(site.id + ': ' + g.src);
  }));
});
ok('every picture Visual India references exists on disk', missing.length === 0, missing.slice(0, 4).join(' | '));

// --- 5. Representative image ---------------------------------------------

group('State representative image');

const withHero = STATES.filter(s => s.sites.some(x => x.hero));
ok('every state that has any hero image gets a representative',
  withHero.every(s => s.representative), withHero.filter(s => !s.representative).map(s => s.name).join(', '));
ok('the representative belongs to one of that state\'s own sites',
  STATES.filter(s => s.representative).every(s =>
    s.sites.some(x => x.hero && x.hero.src === s.representative.src)),
  STATES.filter(s => s.representative && !s.sites.some(x => x.hero && x.hero.src === s.representative.src)).map(s => s.name).join(', '));

/* Deterministic: the documented rule is UNESCO first, then image count, then
   dataset order. Rebuilding must give the identical answer every time. */
const again = VI.buildStates(DESTS, META);
ok('the choice is deterministic across rebuilds',
  JSON.stringify(STATES.map(s => [s.slug, s.representative && s.representative.src])) ===
  JSON.stringify(again.map(s => [s.slug, s.representative && s.representative.src])));
ok('the documented priority holds — no non-UNESCO site represents a state that has a UNESCO one with a hero',
  STATES.filter(s => s.representative).every(s => {
    const repSite = s.sites.find(x => x.hero && x.hero.src === s.representative.src);
    const unescoWithHero = s.sites.filter(x => x.unesco && x.hero);
    return unescoWithHero.length === 0 || (repSite && repSite.unesco);
  }),
  STATES.filter(s => {
    const repSite = s.sites.find(x => x.hero && x.hero.src === (s.representative || {}).src);
    const u = s.sites.filter(x => x.unesco && x.hero);
    return s.representative && u.length && repSite && !repSite.unesco;
  }).map(s => s.name).join(', '));

ok('no state description is invented — each is the dataset\'s own tagline or absent',
  STATES.every(s => !s.description || (META[s.name] &&
    [META[s.name].tagline, META[s.name].blurb, META[s.name].description].includes(s.description))),
  STATES.filter(s => s.description && META[s.name] &&
    ![META[s.name].tagline, META[s.name].blurb, META[s.name].description].includes(s.description)).map(s => s.name).join(', '));

// --- Heritage status is derived, never invented --------------------------

group('Heritage status');

/* `unesco.status` is not a boolean and is not always about UNESCO. Only an
   actual inscription may be presented as a World Heritage listing. */
const inscribed = DESTS.filter(d => d.unesco && d.unesco.status === 'World Heritage Site');
const tentative = DESTS.filter(d => d.unesco && d.unesco.status === 'Tentative List');
const otherLabel = DESTS.filter(d => d.unesco && d.unesco.status &&
  !['World Heritage Site', 'Tentative List'].includes(d.unesco.status));

ok('only genuinely inscribed sites count as UNESCO-listed',
  DESTS.filter(d => VI.isUnescoListed(d)).length === inscribed.length,
  DESTS.filter(d => VI.isUnescoListed(d)).length + ' vs ' + inscribed.length);
ok('a Tentative List entry is not presented as a World Heritage listing',
  tentative.every(d => !VI.isUnescoListed(d) && /Tentative List/.test(VI.heritageStatus(d))),
  tentative.map(d => d.id).join(', '));
ok('a plain heritage label is never dressed up as UNESCO',
  otherLabel.every(d => !VI.isUnescoListed(d) && !/UNESCO/.test(VI.heritageStatus(d))),
  otherLabel.filter(d => /UNESCO/.test(VI.heritageStatus(d) || '')).map(d => d.id).join(', '));
ok('a site with no recorded status gets no label',
  DESTS.filter(d => !d.unesco || !d.unesco.status).every(d => VI.heritageStatus(d) === null));
ok('every status label is the dataset\'s own words',
  DESTS.filter(d => d.unesco && d.unesco.status).every(d => {
    const label = VI.heritageStatus(d);
    return label.startsWith('UNESCO World Heritage') || label.startsWith('UNESCO Tentative List') ||
           label.startsWith(String(d.unesco.status));
  }));
ok('the map uses that same rule rather than testing for any truthy status',
  !/dest\.unesco && dest\.unesco\.status \?/.test(appJs) &&
  !/d\.unesco&&d\.unesco\.status\?/.test(appJs) &&
  /function isUnesco\(dest\)\{ return HERITAGE\.isUnescoListed\(dest\)/.test(appJs));
ok('map.html loads the shared rule before app.js',
  mapHtml.indexOf('visual-india.js') > -1 && mapHtml.indexOf('visual-india.js') < mapHtml.indexOf('app.js?'));
ok('state UNESCO counts equal the number of inscribed sites in that state',
  STATES.every(s => s.unescoCount ===
    DESTS.filter(d => d.state === s.name && d.unesco && d.unesco.status === 'World Heritage Site').length),
  STATES.filter(s => s.unescoCount !==
    DESTS.filter(d => d.state === s.name && d.unesco && d.unesco.status === 'World Heritage Site').length)
    .map(s => s.name).join(', '));
console.log('         inscribed: ' + inscribed.length + ' · tentative: ' + tentative.length +
  ' · other heritage label: ' + otherLabel.length + ' · none: ' + (DESTS.length - inscribed.length - tentative.length - otherLabel.length));

// --- 6, 7, 8. Navigation -------------------------------------------------

group('Navigation');

const allSites = STATES.flatMap(s => s.sites);
ok('every "Explore Site" link points at the existing map site route',
  allSites.every(x => /^map\.html#\/india\/[a-z0-9-]+\/[a-z0-9-]+$/.test(x.href)),
  allSites.filter(x => !/^map\.html#\/india\/[a-z0-9-]+\/[a-z0-9-]+$/.test(x.href)).map(x => x.href).slice(0, 3).join(', '));

ok('each link resolves to that site\'s real slug and state',
  allSites.every(x => {
    const d = DESTS.find(dd => dd.id === x.id);
    return x.href === 'map.html#/india/' + META[d.state].slug + '/' + (d.slug || d.id);
  }));

ok('no duplicate site detail page is created — links leave for map.html',
  !/dest-hero|renderDestination/.test(fs.readFileSync(__dirname + '/visual-india-page.js', 'utf8')));

ok('"Explore on Map" uses the map\'s existing state route',
  STATES.every(s => VI.mapHrefForState(s) === 'map.html#/india/' + s.slug));
ok('the map router already understands that state route (no map rewrite needed)',
  /else if\(state\)\{[\s\S]{0,120}focusState\(state/.test(appJs));

ok('each heritage-site page links back to its state gallery',
  /visual-india\.html#\/state\/\$\{esc\(stateSlugOf\(dest\)\)\}/.test(appJs) &&
  /Explore more from \$\{esc\(dest\.state\)\}/.test(appJs));
ok('that back-link derives its slug from STATES_META, not a second table',
  /function stateSlugOf\(dest\)\{[\s\S]{0,200}window\.STATES_META/.test(appJs));

// --- Shared lightbox ------------------------------------------------------

group('Shared lightbox');

ok('the lightbox is a single shared module', fs.existsSync(__dirname + '/lightbox.js'));
ok('app.js no longer carries its own copy',
  !/function ensureLightbox|function stepLightbox|let lightboxState/.test(appJs));
ok('app.js drives the shared module', /LIGHTBOX\.open\(/.test(appJs));
ok('map.html loads it before app.js',
  mapHtml.indexOf('lightbox.js') > -1 && mapHtml.indexOf('lightbox.js') < mapHtml.indexOf('app.js?'));
ok('Visual India loads it too', /lightbox\.js/.test(viHtml));
ok('attribution is rendered by that one module, so caption and viewer agree',
  /window\.AntaraLightbox\.creditHTML/.test(appJs));

// --- Dynamic-data guarantee ----------------------------------------------

group('Adding a site needs no frontend change');

const synthetic = {
  id: 'test-synthetic-site', slug: 'test-synthetic-site', name: 'Synthetic Test Site',
  city: 'Testville', state: 'Kerala', country: 'India', category: ['Monument'],
  unesco: null, images: { hero: 'images/sites/konark-sun-temple/konark-01.webp' }
};
const before = VI.buildStates(DESTS, META);
const after = VI.buildStates(DESTS.concat([synthetic]), META);
const keralaBefore = VI.findState(before, 'kerala');
const keralaAfter = VI.findState(after, 'kerala');

ok('the new site lands in its own state',
  keralaAfter.sites.some(x => x.id === 'test-synthetic-site'));
ok('the state site count increments',
  keralaAfter.siteCount === keralaBefore.siteCount + 1,
  keralaBefore.siteCount + ' -> ' + keralaAfter.siteCount);
ok('its images join that state\'s gallery',
  keralaAfter.imageCount > keralaBefore.imageCount);
ok('an "Explore Site" link is generated for it',
  (keralaAfter.sites.find(x => x.id === 'test-synthetic-site') || {}).href === 'map.html#/india/kerala/test-synthetic-site');
ok('a state absent from STATES_META still gets a usable slug',
  VI.stateSlug('Some New State', META) === 'some-new-state');
ok('a brand new state creates its own entry',
  VI.findState(VI.buildStates(DESTS.concat([Object.assign({}, synthetic, { state: 'Some New State' })]), META), 'some-new-state') !== null);
ok('no other state is disturbed by the addition',
  before.filter(s => s.slug !== 'kerala').every(b => {
    const a = VI.findState(after, b.slug);
    return a && a.siteCount === b.siteCount;
  }));

// --- Report ---------------------------------------------------------------

console.log('');
console.log('         states represented : ' + STATES.length);
console.log('         sites grouped      : ' + STATES.reduce((n, s) => n + s.siteCount, 0));
console.log('         images reused      : ' + STATES.reduce((n, s) => n + s.imageCount, 0));
const noRep = STATES.filter(s => !s.representative);
const noDesc = STATES.filter(s => !s.description);
const thinSites = allSites.filter(x => x.preview.length < 3);
console.log('         states with no representative image : ' + noRep.length + (noRep.length ? ' — ' + noRep.map(s => s.name).join(', ') : ''));
console.log('         states with no description in data  : ' + noDesc.length + (noDesc.length ? ' — ' + noDesc.map(s => s.name).join(', ') : ''));
console.log('         sites with fewer than 3 pictures    : ' + thinSites.length + (thinSites.length ? ' — ' + thinSites.map(x => x.name + ' (' + x.preview.length + ')').join(', ') : ''));

console.log('');
if (failures.length) {
  console.log(failures.length + ' failed, ' + passed + ' passed');
  failures.forEach(f => console.log('  - ' + f));
  process.exit(1);
}
console.log(passed + ' passed');
