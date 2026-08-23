#!/usr/bin/env node
/**
 * ANTARA NARRATION MANIFEST BUILDER
 *
 * Scans audio/manuscripts/ and emits a manifest describing exactly which
 * narration tracks exist. The Library reads that manifest and offers a language
 * only when a real file backs it -- there is no synthesis fallback anywhere.
 *
 *   audio/manuscripts/<book-slug>/<lang>.<ext>                     book-wide
 *   audio/manuscripts/<book-slug>/chapters/<chapter-id>.<lang>.<ext>
 *   audio/manuscripts/<book-slug>/verses/<verse-id>.<lang>.<ext>
 *   audio/manuscripts/<book-slug>/transcripts/<scope-id>.<lang>.txt  (optional)
 *
 * Adding a language is dropping in files and re-running this script. Adding a
 * *new* language to the catalogue below is one entry -- no player code changes.
 *
 * Run: npm run build:narration
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const AUDIO_DIR = path.join(ROOT, 'audio');
const MANUSCRIPTS_DIR = path.join(AUDIO_DIR, 'manuscripts');
const DB_PATH = path.join(ROOT, 'texts_database.json');

// The language catalogue.
//
// `textField` names the verse field carrying the text this narration
// corresponds to, or null when the database has no such text yet -- a language
// can ship audio before it ships translations, and browser speech can only read
// a language whose text actually exists.
//
// `speech` drives the Web Speech fallback used when no recorded file exists:
// `lang` is the BCP-47 tag requested from the engine, `match` lists acceptable
// voice-tag prefixes in priority order.
//
// Sanskrit deliberately matches ONLY genuine `sa` voices. A Hindi voice reading
// Devanagari is not Sanskrit narration, and presenting it as such would be a
// lie about provenance -- when no Sanskrit voice exists the player says so.
const LANGUAGE_CATALOGUE = [
  { code: 'sa', label: 'Sanskrit',  nativeLabel: 'संस्कृतम्',  textField: 'sanskrit',
    speech: { lang: 'sa-IN', match: ['sa-in', 'sa'] } },
  { code: 'hi', label: 'Hindi',     nativeLabel: 'हिन्दी',     textField: 'hindi',
    speech: { lang: 'hi-IN', match: ['hi-in', 'hi'] } },
  { code: 'en', label: 'English',   nativeLabel: 'English',    textField: 'english',
    speech: { lang: 'en-IN', match: ['en-in', 'en-gb', 'en-us', 'en'] } },
  { code: 'ta', label: 'Tamil',     nativeLabel: 'தமிழ்',      textField: null,
    speech: { lang: 'ta-IN', match: ['ta-in', 'ta'] } },
  { code: 'te', label: 'Telugu',    nativeLabel: 'తెలుగు',      textField: null,
    speech: { lang: 'te-IN', match: ['te-in', 'te'] } },
  { code: 'gu', label: 'Gujarati',  nativeLabel: 'ગુજરાતી',    textField: null,
    speech: { lang: 'gu-IN', match: ['gu-in', 'gu'] } },
  { code: 'mr', label: 'Marathi',   nativeLabel: 'मराठी',      textField: null,
    speech: { lang: 'mr-IN', match: ['mr-in', 'mr'] } },
  { code: 'bn', label: 'Bengali',   nativeLabel: 'বাংলা',      textField: null,
    speech: { lang: 'bn-IN', match: ['bn-in', 'bn'] } },
  { code: 'kn', label: 'Kannada',   nativeLabel: 'ಕನ್ನಡ',      textField: null,
    speech: { lang: 'kn-IN', match: ['kn-in', 'kn'] } },
  { code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം',     textField: null,
    speech: { lang: 'ml-IN', match: ['ml-in', 'ml'] } },
  { code: 'pa', label: 'Punjabi',   nativeLabel: 'ਪੰਜਾਬੀ',      textField: null,
    speech: { lang: 'pa-IN', match: ['pa-in', 'pa'] } },
  { code: 'or', label: 'Odia',      nativeLabel: 'ଓଡ଼ିଆ',       textField: null,
    speech: { lang: 'or-IN', match: ['or-in', 'or'] } }
];

const MIME_BY_EXT = {
  '.mp3':  'audio/mpeg',
  '.m4a':  'audio/mp4',
  '.aac':  'audio/aac',
  '.oga':  'audio/ogg',
  '.ogg':  'audio/ogg',
  '.opus': 'audio/ogg',
  '.wav':  'audio/wav',
  '.flac': 'audio/flac',
  '.webm': 'audio/webm'
};

const LANG_CODES = new Set(LANGUAGE_CATALOGUE.map(l => l.code));

// One slug rule for the whole project. narration.js owns it so the builder,
// the player, the tests and the docs cannot drift apart.
const { manuscriptSlug: bookSlug, expectedAudioPath } = require('./narration.js');

/**
 * Exact duration for PCM/WAV by reading the RIFF header. Compressed formats
 * return null on purpose: guessing a duration is how progress bars start
 * lying. The player always trusts HTMLMediaElement.duration instead, so this
 * value is metadata for tooling, never the basis of playback UI.
 */
function wavDurationSeconds(file) {
  let fd;
  try {
    fd = fs.openSync(file, 'r');
    const head = Buffer.alloc(4096);
    const read = fs.readSync(fd, head, 0, 4096, 0);
    if (read < 44) return null;
    if (head.toString('ascii', 0, 4) !== 'RIFF' || head.toString('ascii', 8, 12) !== 'WAVE') return null;

    let offset = 12;
    let byteRate = 0;
    while (offset + 8 <= read) {
      const chunkId = head.toString('ascii', offset, offset + 4);
      const chunkSize = head.readUInt32LE(offset + 4);
      if (chunkId === 'fmt ') {
        byteRate = head.readUInt32LE(offset + 16);
      } else if (chunkId === 'data') {
        if (!byteRate) return null;
        return Math.round((chunkSize / byteRate) * 1000) / 1000;
      }
      offset += 8 + chunkSize + (chunkSize % 2);
    }
    return null;
  } catch {
    return null;
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
  }
}

function readTranscript(bookDir, scopeId, lang) {
  const file = path.join(bookDir, 'transcripts', `${scopeId}.${lang}.txt`);
  try {
    const text = fs.readFileSync(file, 'utf8').trim();
    return text || null;
  } catch {
    return null;
  }
}

function posixUrl(absFile) {
  return path.relative(ROOT, absFile).split(path.sep).join('/');
}

function describeTrack(absFile, scope, scopeId, lang, bookDir) {
  const ext = path.extname(absFile).toLowerCase();
  const stat = fs.statSync(absFile);
  return {
    available: true,
    scope,
    lang,
    audioUrl: posixUrl(absFile),
    mimeType: MIME_BY_EXT[ext] || 'application/octet-stream',
    bytes: stat.size,
    durationSeconds: ext === '.wav' ? wavDurationSeconds(absFile) : null,
    transcript: readTranscript(bookDir, scopeId, lang)
  };
}

function listAudio(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isFile() && MIME_BY_EXT[path.extname(e.name).toLowerCase()])
    .map(e => e.name);
}

function build() {
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

  const bookIds = new Map();   // slug -> book id
  const chapterIds = new Set();
  const verseIds = new Set();
  for (const book of db.books) {
    bookIds.set(bookSlug(book.id), book.id);
    for (const chapter of book.chapters) {
      chapterIds.add(chapter.id);
      for (const verse of chapter.verses) verseIds.add(verse.id);
    }
  }

  const tracks = {};
  const warnings = [];
  let fileCount = 0;

  const put = (key, lang, track) => {
    if (!tracks[key]) tracks[key] = {};
    tracks[key][lang] = track;
    fileCount++;
  };

  const slugDirs = fs.existsSync(MANUSCRIPTS_DIR)
    ? fs.readdirSync(MANUSCRIPTS_DIR, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name)
    : [];

  for (const slug of slugDirs) {
    const bookDir = path.join(MANUSCRIPTS_DIR, slug);
    const bookId = bookIds.get(slug);
    if (!bookId) {
      warnings.push(`audio/manuscripts/${slug}/ does not match any book id in texts_database.json - skipped`);
      continue;
    }

    // Book-wide: <lang>.<ext>
    for (const name of listAudio(bookDir)) {
      const lang = path.basename(name, path.extname(name));
      if (!LANG_CODES.has(lang)) {
        warnings.push(`${slug}/${name}: "${lang}" is not in the language catalogue - skipped`);
        continue;
      }
      put(`book:${bookId}`, lang, describeTrack(path.join(bookDir, name), 'book', bookId, lang, bookDir));
    }

    // Scoped: chapters/<id>.<lang>.<ext> and verses/<id>.<lang>.<ext>
    for (const [sub, scope, validIds] of [['chapters', 'chapter', chapterIds], ['verses', 'verse', verseIds]]) {
      const subDir = path.join(bookDir, sub);
      for (const name of listAudio(subDir)) {
        const base = path.basename(name, path.extname(name));
        const split = base.lastIndexOf('.');
        if (split < 1) {
          warnings.push(`${slug}/${sub}/${name}: expected "<id>.<lang>.<ext>" - skipped`);
          continue;
        }
        const scopeId = base.slice(0, split);
        const lang = base.slice(split + 1);
        if (!LANG_CODES.has(lang)) {
          warnings.push(`${slug}/${sub}/${name}: "${lang}" is not in the language catalogue - skipped`);
          continue;
        }
        if (!validIds.has(scopeId)) {
          warnings.push(`${slug}/${sub}/${name}: "${scopeId}" is not a known ${scope} id - skipped`);
          continue;
        }
        put(`${scope}:${scopeId}`, lang, describeTrack(path.join(subDir, name), scope, scopeId, lang, bookDir));
      }
    }
  }

  const manifest = {
    version: 1,
    generatedAt: new Date().toISOString(),
    generatedBy: 'build_narration_manifest.js',
    note: 'Generated file - do not hand-edit. Add audio under audio/manuscripts/ and re-run npm run build:narration.',
    languages: LANGUAGE_CATALOGUE,
    resolutionOrder: ['verse', 'chapter', 'book'],
    tracks
  };

  fs.mkdirSync(AUDIO_DIR, { recursive: true });
  fs.writeFileSync(path.join(AUDIO_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');

  // Browser-loadable twin, matching the texts_data.js convention so library.html
  // can <script>-include it instead of fetching (keeps file:// usable).
  fs.writeFileSync(
    path.join(AUDIO_DIR, 'narration_manifest.js'),
    '/* Generated by build_narration_manifest.js - do not edit. */\n' +
    'window.ANTARA_NARRATION_MANIFEST = ' + JSON.stringify(manifest, null, 2) + ';\n',
    'utf8'
  );

  const langsWithAudio = new Set();
  for (const byLang of Object.values(tracks)) for (const l of Object.keys(byLang)) langsWithAudio.add(l);

  console.log(`[narration] ${fileCount} track(s) across ${Object.keys(tracks).length} scope(s)`);
  console.log(`[narration] languages with real audio: ${langsWithAudio.size ? [...langsWithAudio].sort().join(', ') : '(none)'}`);
  console.log(`[narration] catalogue: ${LANGUAGE_CATALOGUE.map(l => l.code).join(', ')}`);
  for (const w of warnings) console.warn(`[narration] WARN ${w}`);
  console.log('[narration] wrote audio/manifest.json and audio/narration_manifest.js');

  return manifest;
}

/**
 * Coverage report: for every manuscript and language, the one path a recording
 * must occupy, and whether it is there yet. This is the worksheet for
 * commissioning narration -- run it, generate the missing files, drop them in.
 *
 *   node build_narration_manifest.js --expected
 *   node build_narration_manifest.js --expected sa,hi,en
 */
function reportExpected(only) {
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  const codes = only && only.length
    ? LANGUAGE_CATALOGUE.filter(l => only.includes(l.code))
    : LANGUAGE_CATALOGUE;

  let present = 0;
  let missing = 0;
  const rows = [];

  for (const book of db.books) {
    for (const lang of codes) {
      const rel = expectedAudioPath(book.id, lang.code);
      // Any browser-playable container satisfies the slot; .mp3 is the default.
      const found = Object.keys(MIME_BY_EXT)
        .map(ext => rel.replace(/\.mp3$/, ext))
        .find(candidate => fs.existsSync(path.join(ROOT, candidate)));
      if (found) present++; else missing++;
      rows.push({
        book: book.title,
        lang: lang.code,
        path: rel,
        status: found ? 'present' : 'MISSING',
        actual: found && found !== rel ? found : null
      });
    }
  }

  const width = Math.max(...rows.map(r => r.path.length));
  console.log('Expected narration assets  (' + present + ' present, ' + missing + ' missing)\n');
  let lastBook = null;
  for (const r of rows) {
    if (r.book !== lastBook) { console.log('  ' + r.book); lastBook = r.book; }
    console.log('    ' + (r.status === 'present' ? '[x]' : '[ ]') + ' ' +
      r.path.padEnd(width) + '  ' + r.status + (r.actual ? '  (as ' + path.extname(r.actual) + ')' : ''));
  }
  console.log('\n  Drop a file at any path above and run: npm run build:narration');
  console.log('  Languages without a recording fall back to a browser voice, except');
  console.log('  Sanskrit, for which no browser ships a voice -- see docs/NARRATION_ASSETS.md');
  return { present, missing, rows };
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  const expectedIdx = argv.indexOf('--expected');
  if (expectedIdx !== -1) {
    const filter = (argv[expectedIdx + 1] || '').split(',').map(s => s.trim()).filter(Boolean);
    reportExpected(filter);
  } else {
    build();
  }
}

module.exports = { build, reportExpected, LANGUAGE_CATALOGUE, wavDurationSeconds };
