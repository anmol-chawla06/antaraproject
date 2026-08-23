/**
 * ANTARA NARRATION RESOLUTION
 *
 * Pure decision logic for the Heritage Library's narration engine: which
 * languages actually have recorded audio for a given manuscript, and which
 * file to hand the HTML5 player.
 *
 *     Manuscript -> Language -> Audio asset -> HTML5 <audio>
 *
 * There is deliberately NO speech-synthesis path here and none in the player.
 * Narration is recorded audio or it is unavailable; the browser's installed
 * voices are never consulted, so every machine hears the same thing or is told
 * plainly that nothing exists yet.
 *
 * Free of DOM access so it can be unit-tested in Node. library.js owns all
 * side effects.
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

  // Most specific scope wins: a verse recording beats a chapter recording,
  // which beats a whole-manuscript reading.
  const RESOLUTION_ORDER = ['verse', 'chapter', 'book'];

  function isPlayableTrack(track) {
    return !!(track &&
      track.available === true &&
      typeof track.audioUrl === 'string' &&
      track.audioUrl.trim() !== '');
  }

  function normalizeTrack(track, lang, scope) {
    if (!isPlayableTrack(track)) return null;
    const duration = Number(track.durationSeconds);
    return {
      available: true,
      lang: lang,
      scope: scope || track.scope || 'book',
      audioUrl: track.audioUrl.trim(),
      mimeType: track.mimeType || null,
      // Advisory only. The player reads the real duration off the media
      // element; a manifest number must never drive the progress bar.
      durationSeconds: Number.isFinite(duration) && duration > 0 ? duration : null,
      transcript: typeof track.transcript === 'string' && track.transcript.trim() !== ''
        ? track.transcript
        : null
    };
  }

  /**
   * Build a lookup from a generated manifest. Tolerates a missing or malformed
   * manifest by producing an empty index -- callers then correctly report that
   * no narration exists, rather than throwing during page setup.
   */
  function createIndex(manifest) {
    const safe = manifest && typeof manifest === 'object' ? manifest : {};
    const languages = Array.isArray(safe.languages) ? safe.languages : [];
    const tracks = safe.tracks && typeof safe.tracks === 'object' ? safe.tracks : {};

    const byCode = new Map();
    languages.forEach(function (l) {
      if (l && typeof l.code === 'string') byCode.set(l.code, l);
    });

    return {
      version: safe.version || 0,
      languages: languages,
      languageByCode: byCode,
      tracks: tracks,
      resolutionOrder: Array.isArray(safe.resolutionOrder) && safe.resolutionOrder.length
        ? safe.resolutionOrder
        : RESOLUTION_ORDER
    };
  }

  /**
   * Narration declared directly on a verse, e.g.
   *   narration: { en: { available: true, audioUrl: "...", transcript: "..." } }
   * Takes precedence over the manifest so a single verse can be corrected
   * without a rebuild. `available: false` means "not yet recorded" and is
   * honoured as absent -- it never degrades to another language or to speech.
   */
  function inlineTrack(verse, lang) {
    if (!verse || !verse.narration) return null;
    return normalizeTrack(verse.narration[lang], lang, 'verse');
  }

  function scopeKeys(scope) {
    const s = scope || {};
    return {
      verse: s.verseId ? 'verse:' + s.verseId : null,
      chapter: s.chapterId ? 'chapter:' + s.chapterId : null,
      book: s.bookId ? 'book:' + s.bookId : null
    };
  }

  /**
   * The single resolution entry point: inline verse narration first, then the
   * manifest from most specific scope to least. Returns null when nothing is
   * recorded -- which callers must surface as "Narration unavailable", never
   * as a reason to fall back to synthesis.
   */
  function resolveTrack(index, scope, lang, verse) {
    if (!index || !lang) return null;

    const inline = inlineTrack(verse, lang);
    if (inline) return inline;

    const keys = scopeKeys(scope);
    for (const level of index.resolutionOrder) {
      const key = keys[level];
      if (!key) continue;
      const entry = index.tracks[key];
      if (!entry) continue;
      const track = normalizeTrack(entry[lang], lang, level);
      if (track) return track;
    }
    return null;
  }

  function hasTrack(index, scope, lang, verse) {
    return resolveTrack(index, scope, lang, verse) !== null;
  }

  /**
   * Every catalogued language with an `available` flag for this scope. The UI
   * uses this to render options; only entries with available === true may be
   * selectable, so a language is never advertised before its audio exists.
   */
  function languagesFor(index, scope, verse) {
    if (!index) return [];
    return index.languages.map(function (l) {
      const track = resolveTrack(index, scope, l.code, verse);
      return {
        code: l.code,
        label: l.label || l.code,
        nativeLabel: l.nativeLabel || null,
        textField: l.textField || null,
        available: track !== null,
        scope: track ? track.scope : null
      };
    });
  }

  function availableLanguages(index, scope, verse) {
    return languagesFor(index, scope, verse).filter(function (l) { return l.available; });
  }

  /**
   * Best language to narrate in: the caller's preference when it has audio,
   * otherwise the first catalogued language that does, otherwise null.
   * Order follows the catalogue, so priority is a data decision.
   */
  function chooseLanguage(index, scope, preferred, verse) {
    const available = availableLanguages(index, scope, verse);
    if (available.length === 0) return null;
    if (preferred && available.some(function (l) { return l.code === preferred; })) return preferred;
    return available[0].code;
  }

  return {
    RESOLUTION_ORDER: RESOLUTION_ORDER,
    createIndex: createIndex,
    inlineTrack: inlineTrack,
    resolveTrack: resolveTrack,
    hasTrack: hasTrack,
    languagesFor: languagesFor,
    availableLanguages: availableLanguages,
    chooseLanguage: chooseLanguage
  };
});
