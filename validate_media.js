#!/usr/bin/env node
/**
 * ANTARA HERITAGE SITE MEDIA TESTS
 *
 * Covers the media resolver (both the preferred `images` schema and the legacy
 * fields), and audits the live dataset: every referenced image must exist on
 * disk, alt text must be built from real site identity rather than a filename,
 * and no site may borrow another site's photograph.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const M = require('./site-media.js');

let passed = 0;
const failures = [];

function group(name) { console.log('\n' + name); }
function ok(label, cond, detail) {
  if (cond) { passed++; console.log('  [PASS] ' + label); }
  else { failures.push(label); console.log('  [FAIL] ' + label + (detail ? '  :: ' + detail : '')); }
}
function eq(label, actual, expected) {
  const same = JSON.stringify(actual) === JSON.stringify(expected);
  if (!same) console.log('         expected ' + JSON.stringify(expected) + ', got ' + JSON.stringify(actual));
  ok(label, same);
}

// --- Resolver -----------------------------------------------------------

group('Image normalisation');

const site = { id: 's', name: 'Amber Fort', city: 'Jaipur', state: 'Rajasthan' };

ok('a bare string becomes an image with site-derived alt',
  M.toImage('a.jpg', M.altFor(site)).alt === 'Amber Fort — Jaipur, Rajasthan');

ok('an object keeps its authored alt and caption',
  (() => {
    const i = M.toImage({ src: 'a.jpg', alt: 'Mirror hall', caption: 'Sheesh Mahal' }, 'fallback');
    return i.alt === 'Mirror hall' && i.caption === 'Sheesh Mahal';
  })());

ok('blank and missing sources yield null, never a broken <img>',
  M.toImage('', 'x') === null && M.toImage('   ', 'x') === null &&
  M.toImage(null, 'x') === null && M.toImage({ src: '' }, 'x') === null);

ok('a credit is carried only when the data has one',
  M.toImage({ src: 'a.jpg' }, 'x').credit === null &&
  M.toImage({ src: 'a.jpg', credit: 'ASI' }, 'x').credit === 'ASI');

ok('alt text never falls back to a filename',
  !/\.jpe?g|\.png/i.test(M.toImage('photos/xyz_1234.jpg', M.altFor(site)).alt));

// --- Legacy schema ------------------------------------------------------

group('Legacy schema still resolves');

const legacy = {
  id: 'legacy', name: 'Taj Mahal', city: 'Agra', state: 'Uttar Pradesh',
  image: 'hero.jpg',
  explore: [{ name: 'The Dome', image: 'dome.jpg', text: '' }],
  dontMiss: [{ title: 'Calligraphy', image: 'calli.jpg', text: '' }],
  lookCloser: { image: 'closer.jpg', hotspots: [] }
};
const lm = M.resolveMedia(legacy);

eq('every legacy slot is collected, hero first',
  lm.gallery.map(g => g.src), ['hero.jpg', 'dome.jpg', 'calli.jpg', 'closer.jpg']);

ok('the hero is identified', lm.hero.src === 'hero.jpg');
ok('extras exclude the hero', lm.extras.every(e => e.src !== 'hero.jpg') && lm.extras.length === 3);
ok('section captions come from the data', lm.gallery[1].caption === 'The Dome' && lm.gallery[2].caption === 'Calligraphy');
ok('hasGallery is true when there is more than a hero', lm.hasGallery === true);

// --- Preferred schema ---------------------------------------------------

group('Preferred images schema');

const modern = {
  id: 'modern', name: 'New Site', city: 'C', state: 'S',
  images: {
    hero: 'h.jpg',
    gallery: ['g1.jpg', { src: 'g2.jpg', caption: 'Second' }],
    culture: 'cul.jpg',
    travel: 'tra.jpg'
  }
};
const mm = M.resolveMedia(modern);

eq('declared images resolve in order',
  mm.gallery.map(g => g.src), ['h.jpg', 'g1.jpg', 'g2.jpg', 'cul.jpg', 'tra.jpg']);
ok('the culture slot is exposed', mm.culture.src === 'cul.jpg');
ok('the travel slot is exposed', mm.travel.src === 'tra.jpg');
ok('a declared hero wins over the legacy field',
  M.resolveMedia({ name: 'X', image: 'old.jpg', images: { hero: 'new.jpg' } }).hero.src === 'new.jpg');

ok('the two schemas combine without duplicating a shared file',
  (() => {
    const both = M.resolveMedia({
      name: 'X', image: 'shared.jpg',
      images: { gallery: ['shared.jpg', 'extra.jpg'] }
    });
    return both.gallery.length === 2 && both.gallery.map(g => g.src).join() === 'shared.jpg,extra.jpg';
  })());

// --- Empty and hero-only ------------------------------------------------

group('Sites with little or no imagery');

const bare = M.resolveMedia({ id: 'b', name: 'Bare', city: 'C', state: 'S' });
ok('a site with no images resolves without throwing',
  bare.hero === null && bare.gallery.length === 0 && bare.hasGallery === false);
ok('coverage level reports "none"', M.coverageOf({ id: 'b', name: 'Bare' }).level === 'none');

const heroOnly = M.resolveMedia({ id: 'h', name: 'Hero', city: 'C', state: 'S', image: 'h.jpg' });
ok('a hero-only site offers no gallery', heroOnly.hasGallery === false && heroOnly.extras.length === 0);
ok('coverage level reports "hero-only"',
  M.coverageOf({ id: 'h', name: 'Hero', image: 'h.jpg' }).level === 'hero-only');

ok('a null destination is handled', M.resolveMedia(null).count === 0);

// --- Section image picking ---------------------------------------------

group('Section images never repeat or borrow');

ok('a hero-only site yields no supporting image, so prose renders alone',
  M.pickSectionImage(heroOnly, new Set()) === null);

ok('a supporting image is never the hero',
  (() => {
    const used = new Set([lm.hero.src]);
    const pick = M.pickSectionImage(lm, used);
    return pick && pick.src !== lm.hero.src;
  })());

ok('the same image is not handed out twice',
  (() => {
    const used = new Set([lm.hero.src]);
    const a = M.pickSectionImage(lm, used);
    const b = M.pickSectionImage(lm, used);
    return a && b && a.src !== b.src;
  })());

ok('picking runs out cleanly rather than repeating',
  (() => {
    const used = new Set([lm.hero.src]);
    const picks = [1, 2, 3, 4, 5].map(() => M.pickSectionImage(lm, used));
    return picks.slice(0, 3).every(Boolean) && picks[3] === null && picks[4] === null;
  })());

// --- The live dataset ---------------------------------------------------

group('Live heritage dataset');

const w = {};
const ctx = { window: w, console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'map-data.js'), 'utf8'), ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8'), ctx);
const DESTS = ctx.DESTINATIONS || w.DESTINATIONS;

ok('the destination dataset loads', Array.isArray(DESTS) && DESTS.length > 0, String(DESTS && DESTS.length));

// Every referenced file must exist, or the page shows a fallback where a real
// photograph was promised.
const missing = [];
const owners = new Map();
for (const d of DESTS) {
  const media = M.resolveMedia(d);
  for (const img of media.gallery) {
    if (/^https?:\/\//i.test(img.src)) continue;
    if (!fs.existsSync(path.join(__dirname, img.src))) missing.push(d.id + '  ->  ' + img.src);
    if (!owners.has(img.src)) owners.set(img.src, new Set());
    owners.get(img.src).add(d.id);
  }
}
missing.slice(0, 10).forEach(m => console.log('         ' + m));
ok('every referenced image exists on disk', missing.length === 0, missing.length + ' missing');

// A photograph shared between two different sites would be misattribution.
const shared = [...owners.entries()].filter(([, ids]) => ids.size > 1);
shared.forEach(([src, ids]) => console.log('         ' + src + ' used by ' + [...ids].join(', ')));
ok('no photograph is shared between two different sites', shared.length === 0);

// Every site must reach the reader with something to look at.
const noVisual = DESTS.filter(d => {
  const m = M.resolveMedia(d);
  return !m.hero && !d.motif;
});
ok('every site has either a hero image or a motif to fall back on',
  noVisual.length === 0, noVisual.map(d => d.id).join(', '));

const alts = [];
for (const d of DESTS) {
  const m = M.resolveMedia(d);
  m.gallery.forEach(g => { if (!g.alt || !g.alt.trim()) alts.push(d.id + ' -> ' + g.src); });
}
ok('every resolved image carries alt text', alts.length === 0, alts.slice(0, 5).join('; '));

const filenameAlts = [];
for (const d of DESTS) {
  M.resolveMedia(d).gallery.forEach(g => {
    if (/\.(jpe?g|png|webp|gif)$/i.test(g.alt || '')) filenameAlts.push(d.id + ' -> ' + g.alt);
  });
}
ok('no alt text is a filename', filenameAlts.length === 0, filenameAlts.slice(0, 3).join('; '));

// --- Coverage report ----------------------------------------------------

group('Coverage report');

const levels = { none: [], 'hero-only': [], partial: [], rich: [] };
DESTS.forEach(d => levels[M.coverageOf(d).level].push(d.name));

console.log('         rich (3+ extra images): ' + levels.rich.length + (levels.rich.length ? '  — ' + levels.rich.join(', ') : ''));
console.log('         partial (1-2 extra):    ' + levels.partial.length + (levels.partial.length ? '  — ' + levels.partial.join(', ') : ''));
console.log('         hero only:              ' + levels['hero-only'].length);
console.log('         no image at all:        ' + levels.none.length);
const totalImgs = DESTS.reduce((n, d) => n + M.resolveMedia(d).count, 0);
console.log('         total distinct image references: ' + totalImgs);

ok('every site has a hero image', levels.none.length === 0, levels.none.join(', '));

// Reported, not enforced: coverage is a content task, and failing the build
// on it would only encourage filling slots with unrelated pictures.
if (levels['hero-only'].length) {
  console.log('         NOTE: ' + levels['hero-only'].length + ' site(s) still have only a hero image.');
  console.log('               They render prose without supporting imagery, by design — see PROJECT_PROGRESS.md.');
}

// --- Summary ------------------------------------------------------------

console.log('');
if (failures.length) {
  console.log(failures.length + ' failed, ' + passed + ' passed');
  failures.forEach(f => console.log('  - ' + f));
  process.exit(1);
}
console.log(passed + ' passed');
