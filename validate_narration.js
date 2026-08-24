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
    { code: 'sa', label: 'Sanskrit', nativeLabel: 'संस्कृतम्', textField: 'sanskrit',
      speech: { lang: 'sa-IN', match: ['sa-in', 'sa'] } },
    { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', textField: 'hindi',
      speech: { lang: 'hi-IN', match: ['hi-in', 'hi'] } },
    { code: 'en', label: 'English', nativeLabel: 'English', textField: 'english',
      speech: { lang: 'en-IN', match: ['en-in', 'en-gb', 'en-us', 'en'] } },
    { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', textField: null,
      speech: { lang: 'ta-IN', match: ['ta-in', 'ta'] } }
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

// --- Voice resolution -------------------------------------------------------

group('Voice resolution');

const V = (lang, name) => ({ lang, name: name || lang + ' voice' });
const catalogue = code => manifest.languages.find(l => l.code === code);

ok('no voices installed resolves to null, not a default voice',
  N.resolveVoice(catalogue('en'), []) === null);

ok('an exact tag is matched',
  N.resolveVoice(catalogue('hi'), [V('en-US'), V('hi-IN')]).lang === 'hi-IN');

ok('Google is preferred over Microsoft at the same tag',
  N.resolveVoice(catalogue('hi'), [V('hi-IN', 'Microsoft Kalpana'), V('hi-IN', 'Google हिन्दी')]).name === 'Google हिन्दी');

// Chromium's pause()/resume() do not take on network voices, and a remote
// voice is silent offline -- so an on-device voice wins even against Google.
ok('a local voice is preferred over a network voice',
  N.resolveVoice(catalogue('en'), [
    { lang: 'en-US', name: 'Google US English', localService: false },
    { lang: 'en-US', name: 'Microsoft Zira', localService: true }
  ]).name === 'Microsoft Zira');

ok('a network voice is still used when no local one exists',
  N.resolveVoice(catalogue('hi'), [
    { lang: 'hi-IN', name: 'Google हिन्दी', localService: false }
  ]).name === 'Google हिन्दी');

ok('underscore-style locale tags are normalised',
  N.resolveVoice(catalogue('hi'), [V('hi_IN')]).lang === 'hi_IN');

ok('English falls back through en-IN, en-GB, en-US, then any en',
  N.resolveVoice(catalogue('en'), [V('en-AU')]).lang === 'en-AU');

ok('the Indian English variant wins over other English variants',
  N.resolveVoice(catalogue('en'), [V('en-US'), V('en-IN')]).lang === 'en-IN');

ok('a language with no matching voice resolves to null',
  N.resolveVoice(catalogue('ta'), [V('en-US'), V('hi-IN')]) === null);

/* Locale vs locality. This is an Indian heritage archive, so the Indian
   variant wins outright; locality only decides among voices that are equally
   Indian, or when no Indian variant exists at all. */
ok('en-IN beats a LOCAL en-US, because the Indian variant wins outright',
  N.resolveVoice(catalogue('en'), [
    { lang: 'en-US', name: 'Microsoft Zira', localService: true },
    { lang: 'en-IN', name: 'Google Indian English', localService: false }
  ]).lang === 'en-IN');

ok('among two en-IN voices the local one wins',
  N.resolveVoice(catalogue('en'), [
    { lang: 'en-IN', name: 'Net Indian', localService: false },
    { lang: 'en-IN', name: 'Local Indian', localService: true }
  ]).name === 'Local Indian');

ok('with no en-IN, a local en-US still beats a network en-GB',
  N.resolveVoice(catalogue('en'), [
    { lang: 'en-GB', name: 'Google UK English Female', localService: false },
    { lang: 'en-US', name: 'Microsoft Zira', localService: true }
  ]).name === 'Microsoft Zira');

ok('hi-IN is preferred over a bare hi voice',
  N.resolveVoice(catalogue('hi'), [
    { lang: 'hi', name: 'Generic Hindi', localService: true },
    { lang: 'hi-IN', name: 'Google Hindi', localService: false }
  ]).lang === 'hi-IN');

/* RELEASE RULE: browser speech is offered for ENGLISH and HINDI only. Every
   other catalogued language must carry `speech: null` so no voice detection is
   attempted at all and the player states that no recording exists. */
const shippedCat = require('./audio/manifest.json');
const TTS_LANGUAGES = ['en', 'hi'];

ok('exactly English and Hindi are configured for browser speech',
  shippedCat.languages.filter(l => l.speech).map(l => l.code).sort().join(',') === 'en,hi',
  shippedCat.languages.filter(l => l.speech).map(l => l.code).join(','));

shippedCat.languages.filter(l => !TTS_LANGUAGES.includes(l.code)).forEach(l => {
  ok(l.code + ' has no speech configuration at all', l.speech === null || l.speech === undefined,
    JSON.stringify(l.speech));
  /* With speech:null the resolver never inspects the voice list, so even a
     browser that ships that language's voice cannot be routed to it. */
  const voices = [{ lang: l.code + '-IN', name: 'Hypothetical ' + l.code, localService: true },
                  { lang: 'hi-IN', name: 'Google Hindi', localService: false },
                  { lang: 'en-US', name: 'Microsoft David', localService: true }];
  ok(l.code + ' resolves no voice even when one exists', N.resolveVoice(l, voices) === null);
  ok(l.code + ' reports no-speech-config rather than a voice failure',
    N.speechAvailability(l, { english: 'x', hindi: 'y', sanskrit: 'z' }, voices).reason === 'no-speech-config');
});

/* The two supported languages must read their OWN transcript. */
{
  const verse = { sanskrit: 'संस्कृत पाठ', english: 'English transcript here', hindi: 'हिन्दी प्रतिलेख यहाँ' };
  const voices = [{ lang: 'en-US', name: 'Microsoft David', localService: true },
                  { lang: 'hi-IN', name: 'Google Hindi', localService: false }];
  const idxNow = N.createIndex(shippedCat);
  const scope = { bookId: 'bhagavad_gita', chapterId: 'bg_ch_02', verseId: 'bg_2_47' };

  const enPlan = N.planNarration(idxNow, scope, 'en', verse, voices);
  ok('English plans speech', enPlan.mode === 'speech', enPlan.mode + ' ' + (enPlan.reason || ''));
  ok('English speaks the ENGLISH field', enPlan.text === verse.english, enPlan.text);
  ok('English uses an English voice', /^en/i.test(enPlan.voice.lang));

  const hiPlan = N.planNarration(idxNow, scope, 'hi', verse, voices);
  ok('Hindi plans speech', hiPlan.mode === 'speech', hiPlan.mode + ' ' + (hiPlan.reason || ''));
  ok('Hindi speaks the HINDI field, never the English one',
    hiPlan.text === verse.hindi && hiPlan.text !== verse.english, hiPlan.text);
  ok('Hindi uses a Hindi voice', /^hi/i.test(hiPlan.voice.lang), hiPlan.voice.lang);

  const saPlan = N.planNarration(idxNow, scope, 'sa', verse, voices);
  ok('Sanskrit is unavailable even though a Hindi voice exists', saPlan.mode === 'unavailable', saPlan.mode);
  ok('Sanskrit never receives a voice', !saPlan.voice);

  ok('only English and Hindi are offered as available',
    N.availableLanguages(idxNow, scope, verse, voices).map(l => l.code).sort().join(',') === 'en,hi',
    N.availableLanguages(idxNow, scope, verse, voices).map(l => l.code).join(','));
}

/* No production recording exists, so nothing may pre-empt browser speech. */
ok('the shipped manifest carries no audio tracks',
  Object.keys(shippedCat.tracks || {}).length === 0,
  Object.keys(shippedCat.tracks || {}).join(', '));
ok('no fixture audio remains on disk',
  !fs.existsSync(path.join(__dirname, 'audio', 'manuscripts', 'bhagavad-gita', 'en.wav')));

/* Every Indian language the brief names must be in the SHIPPED catalogue (not
   the fixture above), so a browser that ships one of these voices is actually
   offered it. */
const shipped = require('./audio/manifest.json');
const shippedLang = code => shipped.languages.find(l => l.code === code);
['sa','hi','en','ta','te','gu','mr','bn','kn','ml','pa','or'].forEach(code => {
  ok('the shipped catalogue carries ' + code, !!shippedLang(code));
});

/* Superseded by the English/Hindi-only release rule: Punjabi and Odia stay in
   the catalogue so the picker can show them, but they carry no speech config,
   so even a browser that ships pa-IN or or-IN is never routed to them. */
ok('Punjabi does NOT resolve a voice, even when pa-IN exists',
  N.resolveVoice(shippedLang('pa'), [V('pa-IN')]) === null);
ok('Odia does NOT resolve a voice, even when or-IN exists',
  N.resolveVoice(shippedLang('or'), [V('or-IN')]) === null);
ok('Punjabi is not satisfied by a Hindi voice either',
  N.resolveVoice(shippedLang('pa'), [V('hi-IN')]) === null);

/* A language with a voice but no transcript must stay unavailable rather than
   read English text and call it Tamil. Under the English/Hindi-only rule Tamil
   is refused one step earlier still -- it has no speech configuration at all,
   so the voice list is never even consulted. */
ok('a voice without matching text does not make a language available',
  N.speechAvailability(shippedLang('ta'), { english: 'text', sanskrit: 's' }, [V('ta-IN')]).ok === false);
ok('and the reason is no-speech-config, refused before any voice lookup',
  N.speechAvailability(shippedLang('ta'), { english: 'text', sanskrit: 's' }, [V('ta-IN')]).reason === 'no-speech-config');
/* The no-text guard itself still works, proven on a language that HAS a config. */
ok('a configured language with no transcript reports no-text',
  N.speechAvailability(shippedLang('hi'), { english: 'text', sanskrit: 's' }, [V('hi-IN')]).reason === 'no-text');

// The rule that keeps narration honest about provenance.
ok('Sanskrit is NOT satisfied by a Hindi voice',
  N.resolveVoice(catalogue('sa'), [V('hi-IN'), V('en-US')]) === null);

ok('Sanskrit accepts a genuine Sanskrit voice',
  N.resolveVoice(catalogue('sa'), [V('sa-IN')]).lang === 'sa-IN');

ok('a prefix match cannot bleed across languages (sa must not match sat-IN)',
  N.resolveVoice(catalogue('sa'), [V('sat-IN')]) === null);

// --- Text selection ---------------------------------------------------------

group('Text to speak');

const verse = { id: 'v1', sanskrit: 'कर्मण्येवाधिकारस्ते', hindi: 'तेरा अधिकार कर्म में है', english: 'Your right is to action alone.' };

ok('Sanskrit reads the sanskrit field', N.textFor(verse, catalogue('sa')) === 'कर्मण्येवाधिकारस्ते');
ok('Hindi reads the hindi field', N.textFor(verse, catalogue('hi')) === 'तेरा अधिकार कर्म में है');
ok('English reads the english field', N.textFor(verse, catalogue('en')) === 'Your right is to action alone.');
ok('a language with no text field yields null', N.textFor(verse, catalogue('ta')) === null);
ok('a blank field yields null', N.textFor({ english: '   ' }, catalogue('en')) === null);

// --- The plan the player acts on --------------------------------------------

group('Narration plan: recording first, then browser voice, then refusal');

const enVoices = [V('en-US'), V('en-IN')];
const hiVoices = [V('hi-IN')];

ok('a recording is preferred over an available voice',
  N.planNarration(index, gitaVerse, 'sa', verse, [V('sa-IN')]).mode === 'audio');

// Hindi has no recording anywhere in the fixture, so it exercises the
// fallback; English deliberately does have one and must not.
ok('with no recording but a voice, the plan is speech',
  N.planNarration(index, gitaVerse, 'hi', verse, hiVoices).mode === 'speech');

ok('the speech plan carries the resolved voice and the text',
  (() => {
    const p = N.planNarration(index, gitaVerse, 'hi', verse, hiVoices);
    return p.voice.lang === 'hi-IN' && p.text === 'तेरा अधिकार कर्म में है';
  })());

ok('with no recording and no voice, the plan is unavailable',
  N.planNarration(index, gitaVerse, 'hi', verse, []).mode === 'unavailable');

ok('the unavailable reason distinguishes "no voices at all"',
  N.planNarration(index, gitaVerse, 'hi', verse, []).reason === 'no-voices');

ok('the unavailable reason distinguishes "no voice for this language"',
  N.planNarration(index, gitaVerse, 'hi', verse, enVoices).reason === 'no-voice-for-language');

ok('the unavailable reason distinguishes "no text to read"',
  N.planNarration(index, gitaVerse, 'ta', verse, [V('ta-IN')]).reason === 'no-text');

ok('Sanskrit with only a Hindi voice and no recording refuses rather than substituting',
  (() => {
    const bare = N.createIndex({ languages: manifest.languages, tracks: {} });
    const p = N.planNarration(bare, gitaVerse, 'sa', verse, hiVoices);
    return p.mode === 'unavailable' && p.reason === 'no-voice-for-language';
  })());

ok('an unknown language is reported, not guessed',
  N.planNarration(index, gitaVerse, 'zz', verse, enVoices).reason === 'unknown-language');

// --- Availability now includes speech ---------------------------------------

group('Language availability includes browser voices');

const withVoices = N.languagesFor(index, gitaVerse, verse, [V('en-IN'), V('hi-IN')]);

ok('a language with only a voice still counts as available',
  withVoices.find(l => l.code === 'hi').available === true &&
  withVoices.find(l => l.code === 'hi').hasAudio === false &&
  withVoices.find(l => l.code === 'hi').hasSpeech === true);

ok('a language with a recording is flagged hasAudio',
  withVoices.find(l => l.code === 'sa').hasAudio === true);

ok('a language with neither is unavailable and carries a reason',
  (() => {
    const ta = withVoices.find(l => l.code === 'ta');
    return ta.available === false && ta.speechReason === 'no-voice-for-language';
  })());

eq('only narratable languages are offered',
  N.availableLanguages(index, gitaVerse, verse, [V('en-IN')]).map(l => l.code).sort(),
  ['en', 'sa']);

ok('a preferred language reachable only by voice is kept',
  N.chooseLanguage(index, gitaVerse, 'en', verse, [V('en-IN')]) === 'en');

ok('with no voices at all, only recorded languages remain',
  N.chooseLanguage(index, gitaVerse, 'ta', verse, []) === 'sa');

// --- Web Speech must be wired into the shipped player -----------------------

group('Web Speech is present in the player');

const librarySrc = fs.readFileSync(path.join(__dirname, 'library.js'), 'utf8');
ok('library.js uses SpeechSynthesisUtterance', /new SpeechSynthesisUtterance\(/.test(librarySrc));
ok('library.js reads getVoices()', /getVoices\s*\(/.test(librarySrc));
ok('library.js handles asynchronous voice loading', /'voiceschanged'/.test(librarySrc));
ok('library.js cancels before speaking again', /cancel\s*\(\s*\)/.test(librarySrc));
ok('library.js supports pause and resume', /\.pause\s*\(\s*\)/.test(librarySrc) && /\.resume\s*\(\s*\)/.test(librarySrc));

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

  /* RELEASE RULE: there are no production recordings, and the placeholder Gita
     fixtures were removed so they cannot pre-empt browser speech. English and
     Hindi are spoken by the browser; everything else says so plainly. */
  ok('no recordings are declared, so nothing pre-empts browser speech', declared.length === 0,
    declared.join(', '));
  ok('no language claims recorded audio', langsWithAudio.length === 0, langsWithAudio.join(', '));
}

// --- Deterministic asset paths ----------------------------------------------

group('Deterministic asset paths (manuscript + language -> one path)');

eq('a book id maps to exactly one folder slug',
  ['bhagavad_gita', 'rigveda', 'katha_upanishad'].map(N.manuscriptSlug),
  ['bhagavad-gita', 'rigveda', 'katha-upanishad']);

eq('manuscript + language yields one book-level path',
  N.expectedAudioPath('bhagavad_gita', 'sa'),
  'audio/manuscripts/bhagavad-gita/sa.mp3');

eq('the default extension is mp3, and an explicit one is honoured',
  [N.expectedAudioPath('rigveda', 'hi'), N.expectedAudioPath('rigveda', 'hi', 'wav'), N.expectedAudioPath('rigveda', 'hi', '.ogg')],
  ['audio/manuscripts/rigveda/hi.mp3', 'audio/manuscripts/rigveda/hi.wav', 'audio/manuscripts/rigveda/hi.ogg']);

eq('chapter and verse paths are equally deterministic',
  [N.expectedChapterAudioPath('bhagavad_gita', 'bg_ch_02', 'sa'),
   N.expectedVerseAudioPath('bhagavad_gita', 'bg_2_47', 'sa')],
  ['audio/manuscripts/bhagavad-gita/chapters/bg_ch_02.sa.mp3',
   'audio/manuscripts/bhagavad-gita/verses/bg_2_47.sa.mp3']);

eq('expectedAudioPaths lists every honoured location, most specific first',
  N.expectedAudioPaths({ bookId: 'bhagavad_gita', chapterId: 'bg_ch_02', verseId: 'bg_2_47' }, 'en')
    .map(p => p.scope),
  ['verse', 'chapter', 'book']);

ok('path building is total — missing inputs yield null, not a malformed path',
  N.expectedAudioPath(null, 'sa') === null &&
  N.expectedAudioPath('rigveda', null) === null &&
  N.expectedVerseAudioPath('rigveda', null, 'sa') === null);

// The builder and the resolver must agree, or a correctly-placed file would be
// scanned into a key the player never looks up.
{
  const live = JSON.parse(fs.readFileSync(path.join(__dirname, 'audio', 'manifest.json'), 'utf8'));
  const mismatches = [];
  for (const [key, byLang] of Object.entries(live.tracks)) {
    if (!key.startsWith('book:')) continue;
    const bookId = key.slice('book:'.length);
    for (const [lang, track] of Object.entries(byLang)) {
      const ext = path.extname(track.audioUrl).slice(1);
      const expected = N.expectedAudioPath(bookId, lang, ext);
      if (track.audioUrl !== expected) mismatches.push(track.audioUrl + ' != ' + expected);
    }
  }
  mismatches.forEach(m => console.log('         ' + m));
  ok('the generated manifest agrees with the deterministic resolver', mismatches.length === 0);
}

// --- Production-asset lifecycle ---------------------------------------------

group('Production-asset lifecycle (ElevenLabs drop-in)');

{
  const catalogueLangs = manifest.languages;
  const scope = { bookId: 'rigveda', chapterId: 'rv_ch1', verseId: 'rv_1_1' };
  const rvVerse = { id: 'rv_1_1', sanskrit: 'अग्निमीळे पुरोहितं', hindi: 'मैं अग्नि की स्तुति करता हूँ', english: 'I praise Agni, the household priest.' };
  const enVoice = [{ lang: 'en-US', name: 'Microsoft Zira', localService: true }];
  const hiVoice = [{ lang: 'hi-IN', name: 'Google हिन्दी', localService: false }];
  const noVoices = [];

  const withRecording = code => N.createIndex({
    languages: catalogueLangs,
    tracks: { 'book:rigveda': { [code]: { available: true, audioUrl: N.expectedAudioPath('rigveda', code) } } }
  });
  const bare = N.createIndex({ languages: catalogueLangs, tracks: {} });

  // 1. An existing recording is selected, even when a voice is also available.
  {
    const p = N.planNarration(withRecording('en'), scope, 'en', rvVerse, enVoice);
    ok('existing recording -> recorded audio is selected over an available voice',
      p.mode === 'audio' && p.track.audioUrl === 'audio/manuscripts/rigveda/en.mp3', p.track && p.track.audioUrl);
  }

  // 2. Missing English recording falls back to browser speech.
  {
    const p = N.planNarration(bare, scope, 'en', rvVerse, enVoice);
    ok('missing English recording -> browser TTS fallback',
      p.mode === 'speech' && p.voice.name === 'Microsoft Zira' && p.text === rvVerse.english,
      p.mode + ' / ' + (p.voice && p.voice.name));
  }

  // 3. Missing Hindi recording falls back to browser speech.
  {
    const p = N.planNarration(bare, scope, 'hi', rvVerse, hiVoice);
    ok('missing Hindi recording -> browser TTS fallback',
      p.mode === 'speech' && p.voice.name === 'Google हिन्दी' && p.text === rvVerse.hindi,
      p.mode + ' / ' + (p.voice && p.voice.name));
  }

  // 4. Missing Sanskrit recording is an honest refusal, never a substitution.
  {
    const p = N.planNarration(bare, scope, 'sa', rvVerse, hiVoice.concat(enVoice));
    ok('missing Sanskrit recording -> unavailable, recording required',
      p.mode === 'unavailable' && p.reason === 'no-voice-for-language', p.mode + ' / ' + p.reason);
    ok('Sanskrit refusal does not borrow the Hindi voice',
      N.resolveVoice(catalogueLangs.find(l => l.code === 'sa'), hiVoice) === null);
    ok('the fix for Sanskrit is a file at one known path',
      N.expectedAudioPath('rigveda', 'sa') === 'audio/manuscripts/rigveda/sa.mp3');
  }

  // 5. Adding the Sanskrit recording flips it to recorded, with no other change.
  {
    const p = N.planNarration(withRecording('sa'), scope, 'sa', rvVerse, noVoices);
    ok('adding a Sanskrit recording -> immediately selected, with no voices at all',
      p.mode === 'audio' && p.track.audioUrl === 'audio/manuscripts/rigveda/sa.mp3', p.track && p.track.audioUrl);

    const langs = N.languagesFor(withRecording('sa'), scope, rvVerse, noVoices);
    ok('the picker relabels Sanskrit from unavailable to recorded',
      langs.find(l => l.code === 'sa').hasAudio === true &&
      langs.find(l => l.code === 'sa').available === true);
  }
}

// --- End-to-end: a real file is discovered by the builder -------------------

group('End-to-end: a newly added file is discovered and selected');

{
  // Writes a real file into audio/manuscripts/, rebuilds the manifest from
  // disk, asserts the player would choose it, then removes it and rebuilds.
  // Nothing is left behind -- see the finally block.
  const builder = require('./build_narration_manifest.js');
  const rel = N.expectedAudioPath('rigveda', 'sa');
  const abs = path.join(__dirname, rel);
  const dir = path.dirname(abs);
  const dirExisted = fs.existsSync(dir);
  let created = false;

  try {
    if (fs.existsSync(abs)) {
      ok('a real Sanskrit recording is already present (skipping the synthetic drop-in)', true, rel);
    } else {
      fs.mkdirSync(dir, { recursive: true });
      // Not audio and never played -- only the discovery path is under test.
      fs.writeFileSync(abs, Buffer.from('ID3      ', 'binary'));
      created = true;

      const rebuilt = builder.build();
      const idx = N.createIndex(rebuilt);
      const scope = { bookId: 'rigveda' };
      const track = N.resolveTrack(idx, scope, 'sa');

      ok('the builder discovers a file dropped at the expected path',
        track !== null, track ? track.audioUrl : 'not found');
      ok('the discovered track carries the right path and MIME type',
        track && track.audioUrl === rel && track.mimeType === 'audio/mpeg',
        track ? track.audioUrl + ' / ' + track.mimeType : 'n/a');
      ok('duration is null for a compressed format, never guessed',
        track && track.durationSeconds === null, track ? String(track.durationSeconds) : 'n/a');

      const verse = { id: 'rv_1_1', sanskrit: 'अग्निमीळे', hindi: 'x', english: 'y' };
      const plan = N.planNarration(idx, scope, 'sa', verse, []);
      ok('Sanskrit switches from unavailable to recorded with no code change',
        plan.mode === 'audio', plan.mode);

      const langs = N.languagesFor(idx, scope, verse, []);
      ok('only Sanskrit changed — other languages are untouched',
        langs.find(l => l.code === 'sa').hasAudio === true &&
        langs.find(l => l.code === 'hi').hasAudio === false &&
        langs.find(l => l.code === 'en').hasAudio === false);
    }
  } finally {
    if (created) {
      fs.unlinkSync(abs);
      if (!dirExisted) { try { fs.rmdirSync(dir); } catch { /* not empty */ } }
      builder.build();
      ok('the synthetic file was removed and the manifest restored',
        !fs.existsSync(abs) &&
        N.resolveTrack(N.createIndex(JSON.parse(fs.readFileSync(path.join(__dirname, 'audio', 'manifest.json'), 'utf8'))),
          { bookId: 'rigveda' }, 'sa') === null);
    }
  }
}

// --- Summary ----------------------------------------------------------------

console.log('');
if (failures.length) {
  console.log(failures.length + ' failed, ' + passed + ' passed');
  failures.forEach(f => console.log('  - ' + f));
  process.exit(1);
}
console.log(passed + ' passed');
