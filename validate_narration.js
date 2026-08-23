#!/usr/bin/env node
/**
 * ANTARA NARRATION TESTS
 *
 * Covers the recorded-audio narration engine: manifest indexing, scope
 * resolution (verse > chapter > book), inline per-verse overrides, language
 * availability, and the guarantee that a missing recording resolves to null
 * rather than to some other language or to speech synthesis.
 *
 * Also asserts the shipped code contains no Web Speech API usage at all --
 * that is the property this phase exists to protect, so it is tested rather
 * than trusted.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const N = require('./narration.js');

let passed = 0;
const failures = [];

function group(name) { console.log('\n' + name); }
function ok(label, cond) {
  if (cond) { passed++; console.log('  [PASS] ' + label); }
  else { failures.push(label); console.log('  [FAIL] ' + label); }
}
function eq(label, actual, expected) {
  const same = JSON.stringify(actual) === JSON.stringify(expected);
  if (!same) console.log('         expected ' + JSON.stringify(expected) + ', got ' + JSON.stringify(actual));
  ok(label, same);
}

// --- Fixtures ---------------------------------------------------------------

const manifest = {
  version: 1,
  languages: [
    { code: 'sa', label: 'Sanskrit', nativeLabel: 'संस्कृतम्', textField: 'sanskrit' },
    { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', textField: 'hindi' },
    { code: 'en', label: 'English', nativeLabel: 'English', textField: 'english' },
    { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', textField: null }
  ],
  resolutionOrder: ['verse', 'chapter', 'book'],
  tracks: {
    'book:gita':     { sa: { available: true, audioUrl: 'audio/gita/sa.mp3', mimeType: 'audio/mpeg', durationSeconds: 900 },
                       en: { available: true, audioUrl: 'audio/gita/en.mp3', mimeType: 'audio/mpeg' } },
    'chapter:g_ch2': { sa: { available: true, audioUrl: 'audio/gita/chapters/g_ch2.sa.mp3' } },
    'verse:g_2_47':  { sa: { available: true, audioUrl: 'audio/gita/verses/g_2_47.sa.mp3', transcript: 'कर्मण्येवाधिकारस्ते' } },
    'book:rigveda':  { hi: { available: false, audioUrl: 'audio/rigveda/hi.mp3' } }
  }
};

const index = N.createIndex(manifest);
const gitaVerse = { bookId: 'gita', chapterId: 'g_ch2', verseId: 'g_2_47' };
const gitaOther = { bookId: 'gita', chapterId: 'g_ch2', verseId: 'g_2_11' };
const gitaCh3   = { bookId: 'gita', chapterId: 'g_ch3', verseId: 'g_3_1' };
const rigveda   = { bookId: 'rigveda', chapterId: 'rv_ch1', verseId: 'rv_1_1' };

// --- Scope resolution -------------------------------------------------------

group('Scope resolution (verse > chapter > book)');

ok('a verse recording wins over chapter and book',
  N.resolveTrack(index, gitaVerse, 'sa').audioUrl === 'audio/gita/verses/g_2_47.sa.mp3');

ok('a resolved track reports the scope it came from',
  N.resolveTrack(index, gitaVerse, 'sa').scope === 'verse');

ok('a verse with no recording falls back to its chapter',
  N.resolveTrack(index, gitaOther, 'sa').audioUrl === 'audio/gita/chapters/g_ch2.sa.mp3');

ok('a chapter with no recording falls back to the manuscript',
  N.resolveTrack(index, gitaCh3, 'sa').audioUrl === 'audio/gita/sa.mp3');

ok('the fallback track reports book scope',
  N.resolveTrack(index, gitaCh3, 'sa').scope === 'book');

// --- The core guarantee -----------------------------------------------------

group('Missing audio never degrades');

ok('a language with no recording anywhere resolves to null',
  N.resolveTrack(index, gitaVerse, 'ta') === null);

ok('a missing language does NOT borrow another language\'s audio',
  N.resolveTrack(index, gitaVerse, 'hi') === null);

ok('available:false is treated as absent, not as a playable file',
  N.resolveTrack(index, rigveda, 'hi') === null);

ok('an unknown manuscript resolves to null',
  N.resolveTrack(index, { bookId: 'nope', chapterId: 'x', verseId: 'y' }, 'sa') === null);

ok('a blank audioUrl is rejected',
  N.resolveTrack(N.createIndex({
    languages: [{ code: 'en', label: 'English' }],
    tracks: { 'book:b': { en: { available: true, audioUrl: '   ' } } }
  }), { bookId: 'b' }, 'en') === null);

ok('a missing manifest yields an empty index rather than throwing',
  N.createIndex(undefined).languages.length === 0 &&
  N.resolveTrack(N.createIndex(undefined), gitaVerse, 'sa') === null);

// --- Inline per-verse narration (the documented data model) -----------------

group('Inline verse.narration overrides');

const verseWithInline = {
  id: 'g_2_47',
  narration: {
    en: { available: true, audioUrl: 'audio/custom/g_2_47.en.mp3', transcript: 'You have a right to action alone.' },
    hi: { available: false, audioUrl: 'audio/custom/g_2_47.hi.mp3' }
  }
};

ok('inline narration is used ahead of the manifest',
  N.resolveTrack(index, gitaVerse, 'en', verseWithInline).audioUrl === 'audio/custom/g_2_47.en.mp3');

ok('an inline transcript is carried through',
  N.resolveTrack(index, gitaVerse, 'en', verseWithInline).transcript === 'You have a right to action alone.');

ok('inline available:false falls through to the manifest, not to speech',
  N.resolveTrack(index, gitaVerse, 'hi', verseWithInline) === null);

ok('a verse without a narration block is harmless',
  N.resolveTrack(index, gitaVerse, 'sa', { id: 'g_2_47' }).scope === 'verse');

// --- Language availability for the UI ---------------------------------------

group('Language availability');

const langs = N.languagesFor(index, gitaVerse);

eq('every catalogued language is described',
  langs.map(l => l.code), ['sa', 'hi', 'en', 'ta']);

eq('availability flags match what actually exists',
  langs.map(l => l.available), [true, false, true, false]);

eq('only languages with audio are offered as selectable',
  N.availableLanguages(index, gitaVerse).map(l => l.code), ['sa', 'en']);

eq('a manuscript with no recordings offers nothing',
  N.availableLanguages(index, rigveda).map(l => l.code), []);

ok('native labels survive for the picker',
  langs.find(l => l.code === 'sa').nativeLabel === 'संस्कृतम्');

// --- Language choice --------------------------------------------------------

group('Language choice');

ok('a preferred language that exists is kept',
  N.chooseLanguage(index, gitaVerse, 'en') === 'en');

ok('a preferred language with no audio falls back to catalogue order',
  N.chooseLanguage(index, gitaVerse, 'ta') === 'sa');

ok('no preference falls back to catalogue order',
  N.chooseLanguage(index, gitaVerse, null) === 'sa');

ok('nothing available yields null, not a guess',
  N.chooseLanguage(index, rigveda, 'hi') === null);

ok('hasTrack agrees with resolveTrack',
  N.hasTrack(index, gitaVerse, 'sa') === true &&
  N.hasTrack(index, gitaVerse, 'ta') === false);

// --- Manifest durations are advisory only -----------------------------------

group('Duration handling');

ok('a valid manifest duration is exposed',
  N.resolveTrack(index, gitaCh3, 'sa').durationSeconds === 900);

ok('a missing duration is null, never a guess',
  N.resolveTrack(index, { bookId: 'gita' }, 'en').durationSeconds === null);

ok('a nonsense duration is discarded',
  N.resolveTrack(N.createIndex({
    languages: [{ code: 'en', label: 'English' }],
    tracks: { 'book:b': { en: { available: true, audioUrl: 'a.mp3', durationSeconds: -5 } } }
  }), { bookId: 'b' }, 'en').durationSeconds === null);

// --- No Web Speech anywhere in shipped code ---------------------------------

group('No Web Speech API in shipped narration code');

const SPEECH_PATTERN = /speechSynthesis|SpeechSynthesisUtterance|onvoiceschanged|voiceschanged|getVoices\s*\(/;
for (const file of ['narration.js', 'library.js', 'library.html']) {
  const src = fs.readFileSync(path.join(__dirname, file), 'utf8');
  const hits = src.split('\n')
    .map((line, i) => ({ line: line.trim(), n: i + 1 }))
    .filter(l => SPEECH_PATTERN.test(l.line));
  hits.slice(0, 5).forEach(h => console.log('         ' + file + ':' + h.n + '  ' + h.line));
  ok(file + ' contains no Web Speech API reference', hits.length === 0);
}

// --- The real, generated manifest -------------------------------------------

group('Live narration manifest');

const manifestPath = path.join(__dirname, 'audio', 'manifest.json');
if (!fs.existsSync(manifestPath)) {
  ok('audio/manifest.json exists (run: npm run build:narration)', false);
} else {
  const live = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const liveIndex = N.createIndex(live);
  const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'texts_database.json'), 'utf8'));

  ok('the manifest declares a language catalogue', liveIndex.languages.length > 0);

  // Every declared file must actually exist, or the player offers a language
  // and then fails on a 404.
  const declared = [];
  for (const [key, byLang] of Object.entries(live.tracks)) {
    for (const [lang, track] of Object.entries(byLang)) {
      if (track.available) declared.push({ key, lang, url: track.audioUrl });
    }
  }
  const missing = declared.filter(d => !fs.existsSync(path.join(__dirname, d.url)));
  missing.forEach(m => console.log('         missing file: ' + m.url));
  ok('every track declared available exists on disk', missing.length === 0);

  // Scope ids must be real, or resolution silently never fires.
  const bookIds = new Set(db.books.map(b => b.id));
  const chapterIds = new Set();
  const verseIds = new Set();
  db.books.forEach(b => b.chapters.forEach(c => {
    chapterIds.add(c.id);
    c.verses.forEach(v => verseIds.add(v.id));
  }));
  const badScope = Object.keys(live.tracks).filter(k => {
    const at = k.indexOf(':');
    const scope = k.slice(0, at);
    const id = k.slice(at + 1);
    if (scope === 'book') return !bookIds.has(id);
    if (scope === 'chapter') return !chapterIds.has(id);
    if (scope === 'verse') return !verseIds.has(id);
    return true;
  });
  badScope.forEach(k => console.log('         unknown scope: ' + k));
  ok('every manifest scope id exists in texts_database.json', badScope.length === 0);

  const langsWithAudio = [...new Set(declared.map(d => d.lang))].sort();
  const totalVerses = db.books.reduce((n, b) => n + b.chapters.reduce((m, c) => m + c.verses.length, 0), 0);
  const covered = db.books
    .filter(b => N.availableLanguages(liveIndex, { bookId: b.id }).length > 0)
    .map(b => b.title);

  console.log('         ' + declared.length + ' track(s); languages with audio: ' +
    (langsWithAudio.join(', ') || '(none)'));
  console.log('         ' + totalVerses + ' verses; manuscripts with narration: ' +
    (covered.join(', ') || '(none)'));

  ok('at least one real recording is present for end-to-end testing', declared.length > 0);
}

// --- Summary ----------------------------------------------------------------

console.log('');
if (failures.length) {
  console.log(failures.length + ' failed, ' + passed + ' passed');
  failures.forEach(f => console.log('  - ' + f));
  process.exit(1);
}
console.log(passed + ' passed');
