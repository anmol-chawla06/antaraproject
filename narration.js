/**
 * ANTARA NARRATION RESOLUTION
 *
 * Pure decision logic for the Heritage Library's narration engine.
 *
 *     Manuscript -> Language -> recorded audio asset  -> HTML5 <audio>
 *                            -> else browser voice    -> Web Speech
 *                            -> else honest refusal
 *
 * Recorded audio always wins: it is identical on every machine. Where no file
 * exists yet, the browser's own voices are used so the Library still reads
 * aloud, and individual languages can be replaced by real recordings later
 * without touching the player.
 *
 * The one thing this module will not do is speak without a resolved voice.
 * Chromium accepts an utterance with no bound voice, fires onstart then onend,
 * emits no sound and never fires onerror -- so `resolveVoice` returning null
 * must be treated as "this browser cannot say this", never as "use the
 * default". Sanskrit is held to the same rule: a Hindi voice reading
 * Devanagari is not Sanskrit narration.
 *
 * Free of DOM and speechSynthesis access so it can be unit-tested in Node.
 * library.js owns all side effects.
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

  // ---------------------------------------------------------------------------
  // Where a recording is expected to live
  //
  // One deterministic rule, shared by the manifest builder, the tests and the
  // docs: manuscript + language -> exactly one path. Nothing scans, guesses or
  // falls back on filename variants, so "where do I put the file?" always has
  // a single answer.
  // ---------------------------------------------------------------------------

  const AUDIO_ROOT = 'audio/manuscripts';
  const DEFAULT_AUDIO_EXT = 'mp3';

  /** Book id from texts_database.json -> folder name. bhagavad_gita -> bhagavad-gita */
  function manuscriptSlug(bookId) {
    return String(bookId || '').trim().toLowerCase().replace(/_/g, '-');
  }

  function normalizeExt(ext) {
    return String(ext || DEFAULT_AUDIO_EXT).trim().toLowerCase().replace(/^\./, '');
  }

  /** audio/manuscripts/<slug>/<lang>.<ext> — a whole-manuscript reading. */
  function expectedAudioPath(bookId, lang, ext) {
    if (!bookId || !lang) return null;
    return AUDIO_ROOT + '/' + manuscriptSlug(bookId) + '/' + lang + '.' + normalizeExt(ext);
  }

  /** audio/manuscripts/<slug>/chapters/<chapterId>.<lang>.<ext> */
  function expectedChapterAudioPath(bookId, chapterId, lang, ext) {
    if (!bookId || !chapterId || !lang) return null;
    return AUDIO_ROOT + '/' + manuscriptSlug(bookId) + '/chapters/' +
           chapterId + '.' + lang + '.' + normalizeExt(ext);
  }

  /** audio/manuscripts/<slug>/verses/<verseId>.<lang>.<ext> */
  function expectedVerseAudioPath(bookId, verseId, lang, ext) {
    if (!bookId || !verseId || !lang) return null;
    return AUDIO_ROOT + '/' + manuscriptSlug(bookId) + '/verses/' +
           verseId + '.' + lang + '.' + normalizeExt(ext);
  }

  /**
   * Every path that would be honoured for one manuscript + language, most
   * specific first. Useful for tooling and for telling an author exactly where
   * a file may go.
   */
  function expectedAudioPaths(scope, lang, ext) {
    const s = scope || {};
    const out = [];
    if (s.bookId && s.verseId) out.push({ scope: 'verse', path: expectedVerseAudioPath(s.bookId, s.verseId, lang, ext) });
    if (s.bookId && s.chapterId) out.push({ scope: 'chapter', path: expectedChapterAudioPath(s.bookId, s.chapterId, lang, ext) });
    if (s.bookId) out.push({ scope: 'book', path: expectedAudioPath(s.bookId, lang, ext) });
    return out;
  }

  // ---------------------------------------------------------------------------
  // Recorded audio
  // ---------------------------------------------------------------------------

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
   * manifest by producing an empty index -- callers then fall through to speech
   * rather than throwing during page setup.
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
   * honoured as absent -- it falls through to speech, never to another
   * language's recording.
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

  // ---------------------------------------------------------------------------
  // Browser speech
  // ---------------------------------------------------------------------------

  const tagOf = v => String((v && v.lang) || '').toLowerCase().replace(/_/g, '-');

  /**
   * Rank candidate voices for one language.
   *
   * Local (on-device) voices are preferred over network voices. That is a
   * reliability call, not a quality one: Chromium's pause()/resume() do not
   * take effect on remote voices, and a network voice produces nothing at all
   * offline. Where only a network voice exists it is still used -- speaking in
   * a slightly worse voice beats not speaking.
   */
  function preferByName(candidates) {
    return candidates.find(v => /google/i.test(v.name || '')) ||
           candidates.find(v => /microsoft/i.test(v.name || '')) ||
           candidates[0];
  }

  /**
   * Pick the best installed voice for a language, or null if this browser has
   * none. Exact tag matches are tried first in catalogue priority order, then
   * prefix matches.
   *
   * Null is the condition behind the classic silent-playback bug and callers
   * must treat it as "cannot speak this language", never as "use the default
   * voice".
   */
  function resolveVoice(langDef, voices) {
    if (!langDef || !langDef.speech || !Array.isArray(voices) || voices.length === 0) return null;
    const prefixes = Array.isArray(langDef.speech.match) ? langDef.speech.match : [];

    // Rank every acceptable voice: exact tag matches in catalogue order first,
    // then prefix matches. Guard the hyphen so "sa" cannot match "sat"
    // (Santali) or similar.
    const ranked = [];
    const seen = new Set();
    const add = v => { if (!seen.has(v)) { seen.add(v); ranked.push(v); } };

    for (const prefix of prefixes) {
      voices.filter(v => tagOf(v) === prefix).forEach(add);
    }
    for (const prefix of prefixes) {
      voices.filter(v => {
        const tag = tagOf(v);
        return tag === prefix || tag.startsWith(prefix + '-');
      }).forEach(add);
    }
    if (ranked.length === 0) return null;

    /* Two rules, in order.
     *
     * 1. The Indian variant wins outright. This is an Indian heritage archive:
     *    a listener who picks English should hear en-IN when the browser has
     *    it, not en-US. `match[0]` is always the Indian tag.
     *
     * 2. Otherwise locality wins over tag order, because pause()/resume() only
     *    work on local voices and they still speak with no connection. A local
     *    en-US therefore beats a network en-GB — but never beats en-IN.
     *
     * Locality also breaks ties inside each group.
     */
    const indianTag = prefixes.length ? prefixes[0] : null;
    if (indianTag) {
      const indian = ranked.filter(v => {
        const tag = tagOf(v);
        return tag === indianTag || tag.startsWith(indianTag + '-');
      });
      if (indian.length) {
        return indian.find(v => v.localService === true) || preferByName(indian);
      }
    }
    return ranked.find(v => v.localService === true) || preferByName(ranked);
  }

  /** The manuscript or translation text this language should read aloud. */
  function textFor(verse, langDef) {
    if (!verse || !langDef || !langDef.textField) return null;
    const raw = verse[langDef.textField];
    if (typeof raw !== 'string') return null;
    const text = raw.trim();
    return text === '' ? null : text;
  }

  function speechAvailability(langDef, verse, voices) {
    if (!langDef || !langDef.speech) {
      return { ok: false, reason: 'no-speech-config' };
    }
    if (!Array.isArray(voices) || voices.length === 0) {
      return { ok: false, reason: 'no-voices' };
    }
    const voice = resolveVoice(langDef, voices);
    if (!voice) return { ok: false, reason: 'no-voice-for-language' };
    // A voice with nothing to read is not narration.
    if (verse !== undefined && verse !== null && textFor(verse, langDef) === null) {
      return { ok: false, reason: 'no-text' };
    }
    return { ok: true, voice: voice };
  }

  // ---------------------------------------------------------------------------
  // The single decision the player acts on
  // ---------------------------------------------------------------------------

  /**
   * Decide how to narrate. Returns one of:
   *   { mode: 'audio',       track }
   *   { mode: 'speech',      voice, text, langDef }
   *   { mode: 'unavailable', reason, langDef }
   *
   * `reason` is a stable code the player turns into wording:
   *   'unknown-language' | 'no-speech-config' | 'no-voices'
   *   'no-voice-for-language' | 'no-text'
   */
  function planNarration(index, scope, lang, verse, voices) {
    const langDef = index && index.languageByCode.get(lang);
    if (!langDef) return { mode: 'unavailable', reason: 'unknown-language', langDef: null };

    const track = resolveTrack(index, scope, lang, verse);
    if (track) return { mode: 'audio', track: track, langDef: langDef };

    const speech = speechAvailability(langDef, verse, voices);
    if (speech.ok) {
      return {
        mode: 'speech',
        voice: speech.voice,
        text: textFor(verse, langDef),
        langDef: langDef
      };
    }
    return { mode: 'unavailable', reason: speech.reason, langDef: langDef };
  }

  /**
   * Every catalogued language, flagged with what it can actually do right now.
   * `available` is true when EITHER a recording or a usable voice exists, so
   * the picker never disables a language the browser could happily read.
   */
  function languagesFor(index, scope, verse, voices) {
    if (!index) return [];
    return index.languages.map(function (l) {
      const track = resolveTrack(index, scope, l.code, verse);
      const speech = speechAvailability(l, verse, voices);
      return {
        code: l.code,
        label: l.label || l.code,
        nativeLabel: l.nativeLabel || null,
        textField: l.textField || null,
        hasAudio: track !== null,
        hasSpeech: speech.ok,
        speechReason: speech.ok ? null : speech.reason,
        available: track !== null || speech.ok,
        scope: track ? track.scope : null
      };
    });
  }

  function availableLanguages(index, scope, verse, voices) {
    return languagesFor(index, scope, verse, voices).filter(function (l) { return l.available; });
  }

  /**
   * Best language to narrate in: the caller's preference when it can be
   * narrated, otherwise the first catalogue language that can, otherwise null.
   * Order follows the catalogue, so priority is a data decision.
   */
  function chooseLanguage(index, scope, preferred, verse, voices) {
    const available = availableLanguages(index, scope, verse, voices);
    if (available.length === 0) return null;
    if (preferred && available.some(function (l) { return l.code === preferred; })) return preferred;
    return available[0].code;
  }

  return {
    RESOLUTION_ORDER: RESOLUTION_ORDER,
    AUDIO_ROOT: AUDIO_ROOT,
    DEFAULT_AUDIO_EXT: DEFAULT_AUDIO_EXT,
    manuscriptSlug: manuscriptSlug,
    expectedAudioPath: expectedAudioPath,
    expectedChapterAudioPath: expectedChapterAudioPath,
    expectedVerseAudioPath: expectedVerseAudioPath,
    expectedAudioPaths: expectedAudioPaths,
    createIndex: createIndex,
    inlineTrack: inlineTrack,
    resolveTrack: resolveTrack,
    hasTrack: hasTrack,
    resolveVoice: resolveVoice,
    textFor: textFor,
    speechAvailability: speechAvailability,
    planNarration: planNarration,
    languagesFor: languagesFor,
    availableLanguages: availableLanguages,
    chooseLanguage: chooseLanguage
  };
});
