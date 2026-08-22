/**
 * ANTARA NARRATION RESOLUTION
 *
 * Pure decision logic for the Heritage Library's narration engine: which
 * language to narrate, whether this device can actually speak it, and whether
 * recorded audio exists in preference to synthesis.
 *
 * Deliberately free of DOM and speechSynthesis access so it can be unit-tested
 * in Node. The player in library.js owns all side effects.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.AntaraNarration = api;
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // `voiceLang` is the BCP-47 tag requested from the speech engine. `match`
  // lists acceptable lang prefixes in priority order. Adding a language
  // (ta-IN, te-IN, ...) means adding an entry here, not a new code branch.
  const LANGS = {
    sa_hi: {
      key: 'hi',
      label: 'Sanskrit / Hindi',
      voiceLang: 'hi-IN',
      match: ['hi-in', 'hi', 'mr-in', 'sa'],
      text: v => v.sanskrit
    },
    en: {
      key: 'en',
      label: 'English',
      voiceLang: 'en-IN',
      match: ['en-in', 'en-us', 'en'],
      text: v => v.english
    }
  };

  function langFor(engine, langPreference) {
    if (engine === 'auto') {
      return langPreference === 'en' ? LANGS.en : LANGS.sa_hi;
    }
    return LANGS[engine] || LANGS.sa_hi;
  }

  const tagOf = v => String(v.lang || '').toLowerCase().replace('_', '-');

  /**
   * Pick the best installed voice for a language, or null if this device has
   * none. Null is the condition behind the silent-playback bug: Chromium will
   * accept an utterance with no bound voice, emit no audio, and never fire
   * onerror -- so callers must treat null as "narration unavailable", never as
   * "proceed with the default voice".
   */
  function resolveVoice(langDef, voices) {
    if (!langDef || !Array.isArray(voices) || voices.length === 0) return null;

    for (const prefix of langDef.match) {
      const exact = voices.filter(v => tagOf(v) === prefix);
      if (exact.length) {
        return exact.find(v => /google/i.test(v.name || '')) ||
               exact.find(v => /microsoft/i.test(v.name || '')) ||
               exact[0];
      }
    }
    for (const prefix of langDef.match) {
      const loose = voices.find(v => tagOf(v).startsWith(prefix));
      if (loose) return loose;
    }
    return null;
  }

  /**
   * Recorded narration wins over synthesis. Supports both the current flat
   * `verse.audio` string and a per-language `verse.narration` map, so real
   * audio can be added one language at a time without touching the player.
   */
  function resolveAudioUrl(verse, langKey) {
    if (!verse) return null;
    const track = verse.narration && verse.narration[langKey];
    if (track && track.available && track.audioUrl) return track.audioUrl;
    if (typeof verse.audio === 'string' && verse.audio.trim() !== '') return verse.audio;
    return null;
  }

  return { LANGS, langFor, resolveVoice, resolveAudioUrl };
});
