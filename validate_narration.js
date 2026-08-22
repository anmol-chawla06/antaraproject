/**
 * Narration resolution tests.
 *
 * Covers the silent-playback bug: a device with no matching voice must resolve
 * to null so the player reports "unavailable" instead of animating over silence.
 */
const assert = require('assert');
const fs = require('fs');
const N = require('./narration.js');

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  [PASS] ${name}`);
  } catch (err) {
    console.error(`  [FAIL] ${name}\n         ${err.message}`);
    process.exitCode = 1;
  }
}

const voice = (lang, name) => ({ lang, name });

console.log('\nVoice resolution');

test('no voices installed resolves to null, not a default voice', () => {
  assert.strictEqual(N.resolveVoice(N.LANGS.sa_hi, []), null);
  assert.strictEqual(N.resolveVoice(N.LANGS.en, []), null);
});

test('English-only device cannot narrate Sanskrit/Hindi', () => {
  const voices = [voice('en-US', 'Microsoft David'), voice('en-GB', 'Google UK English')];
  assert.strictEqual(N.resolveVoice(N.LANGS.sa_hi, voices), null);
});

test('Hindi voice is found when installed', () => {
  const voices = [voice('en-US', 'Microsoft David'), voice('hi-IN', 'Microsoft Swara')];
  assert.strictEqual(N.resolveVoice(N.LANGS.sa_hi, voices).name, 'Microsoft Swara');
});

test('Google voice is preferred over Microsoft at the same language tag', () => {
  const voices = [voice('hi-IN', 'Microsoft Swara'), voice('hi-IN', 'Google हिन्दी')];
  assert.strictEqual(N.resolveVoice(N.LANGS.sa_hi, voices).name, 'Google हिन्दी');
});

test('Marathi stands in for Hindi only after exact tags fail', () => {
  const withHindi = [voice('mr-IN', 'Marathi'), voice('hi-IN', 'Hindi')];
  assert.strictEqual(N.resolveVoice(N.LANGS.sa_hi, withHindi).lang, 'hi-IN');
  const withoutHindi = [voice('mr-IN', 'Marathi')];
  assert.strictEqual(N.resolveVoice(N.LANGS.sa_hi, withoutHindi).lang, 'mr-IN');
});

test('English falls back en-IN then en-US then any en', () => {
  assert.strictEqual(N.resolveVoice(N.LANGS.en, [voice('en-AU', 'Aussie')]).lang, 'en-AU');
  const many = [voice('en-AU', 'Aussie'), voice('en-US', 'David'), voice('en-IN', 'Heera')];
  assert.strictEqual(N.resolveVoice(N.LANGS.en, many).lang, 'en-IN');
});

test('underscore-style locale tags are normalised', () => {
  assert.strictEqual(N.resolveVoice(N.LANGS.sa_hi, [voice('hi_IN', 'Hindi')]).lang, 'hi_IN');
});

console.log('\nLanguage selection');

test('auto follows the reader display-language preference', () => {
  assert.strictEqual(N.langFor('auto', 'en').key, 'en');
  assert.strictEqual(N.langFor('auto', 'dual').key, 'hi');
});

test('an unknown engine falls back to Sanskrit/Hindi rather than throwing', () => {
  assert.strictEqual(N.langFor('klingon', 'dual').key, 'hi');
});

console.log('\nAudio source resolution');

test('an empty audio string yields no recorded track', () => {
  assert.strictEqual(N.resolveAudioUrl({ audio: '' }, 'hi'), null);
  assert.strictEqual(N.resolveAudioUrl({ audio: '   ' }, 'hi'), null);
});

test('a per-language narration entry is used when available', () => {
  const verse = { audio: '', narration: { hi: { available: true, audioUrl: '/audio/bg_2_47_hi.mp3' } } };
  assert.strictEqual(N.resolveAudioUrl(verse, 'hi'), '/audio/bg_2_47_hi.mp3');
});

test('a narration entry marked unavailable is ignored', () => {
  const verse = { audio: '', narration: { hi: { available: false, audioUrl: '/audio/x.mp3' } } };
  assert.strictEqual(N.resolveAudioUrl(verse, 'hi'), null);
});

test('a language with no narration entry does not borrow another language', () => {
  const verse = { audio: '', narration: { hi: { available: true, audioUrl: '/audio/hi.mp3' } } };
  assert.strictEqual(N.resolveAudioUrl(verse, 'en'), null);
});

test('the legacy flat audio field still works', () => {
  assert.strictEqual(N.resolveAudioUrl({ audio: '/audio/legacy.mp3' }, 'hi'), '/audio/legacy.mp3');
});

console.log('\nLive dataset');

test('every verse in texts_database.json has a resolvable audio decision', () => {
  const db = JSON.parse(fs.readFileSync('texts_database.json', 'utf8'));
  let verses = 0;
  let recorded = 0;

  const walk = node => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== 'object') return;
    if (node.verse_number !== undefined && node.sanskrit !== undefined) {
      verses++;
      if (N.resolveAudioUrl(node, 'hi') || N.resolveAudioUrl(node, 'en')) recorded++;
      return;
    }
    Object.values(node).forEach(walk);
  };
  walk(db);

  assert.ok(verses > 0, 'no verses found in texts_database.json');
  console.log(`         ${verses} verses, ${recorded} with recorded audio, ${verses - recorded} synthesis-only`);
});

console.log(`\n${passed} passed${process.exitCode ? ', with failures' : ''}\n`);
