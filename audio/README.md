# Narration audio

Antara's narration is **prepared audio files only.** There is no text-to-speech
anywhere in the player, so a passage sounds identical on every machine — or the
Library says plainly that no recording exists yet. It never depends on which
voices a reader happens to have installed.

```
Manuscript  →  Language  →  Audio asset  →  HTML5 <audio>
```

---

## Layout

```
audio/
  manifest.json              generated — do not hand-edit
  narration_manifest.js      generated — browser twin of the above
  manuscripts/
    <book-slug>/
      <lang>.<ext>                       whole-manuscript reading
      chapters/<chapter-id>.<lang>.<ext> one chapter
      verses/<verse-id>.<lang>.<ext>     one verse
      transcripts/<scope-id>.<lang>.txt  optional, plain UTF-8
```

`<book-slug>` is the book `id` from `texts_database.json` with underscores
turned into hyphens — `bhagavad_gita` → `bhagavad-gita`.

`<lang>` is a code from the catalogue in `build_narration_manifest.js`:
`sa`, `hi`, `en`, `ta`, `te`, `gu`, `mr`, `bn`, `kn`, `ml`.

Any format a browser can decode works — `.mp3`, `.m4a`, `.ogg`, `.opus`,
`.wav`, `.flac`, `.webm`. **`.mp3` is the right default for real recordings.**

---

## Adding narration

1. Drop the files in, following the layout above.
2. `npm run build:narration`
3. `npm test`

The builder validates as it goes and **skips with a warning** rather than
writing a broken manifest, if a file names an unknown language, an id that
does not exist in `texts_database.json`, or a folder that matches no book.

The Library picks the new language up on reload. No player code changes — the
picker, availability labels and resolution all read the manifest.

### Adding a language not in the catalogue

One entry in `LANGUAGE_CATALOGUE` in `build_narration_manifest.js`:

```js
{ code: 'or', label: 'Odia', nativeLabel: 'ଓଡ଼ିଆ', textField: null }
```

`textField` names the verse field holding the matching text, or `null` when the
database has no translation in that language yet. A language may ship audio
before it ships text.

---

## How a track is chosen

Most specific wins:

**verse → chapter → book**

So one carefully recorded verse can sit inside a whole-manuscript reading, and
the verse recording is what plays for that verse.

A verse may also carry its own narration inline in the database, which beats
the manifest entirely:

```jsonc
"narration": {
  "en": { "available": true, "audioUrl": "audio/…/bg_2_47.en.mp3", "transcript": "…" },
  "hi": { "available": false }
}
```

`available: false` means *not recorded yet*. It is treated exactly like a
missing entry: the language is disabled in the picker and nothing plays. It
never falls through to another language, and never to synthesis.

---

## Rules the player keeps

- **Nothing is generated at page load.** The manifest is a static file.
- **Duration, position and the progress bar come from the media element**, never
  from the manifest. `durationSeconds` in the manifest is metadata for tooling;
  if it disagrees with the decoded file, the decoded file wins.
- **A language with no audio is disabled in the picker**, labelled *no
  recording*, and cannot be selected.
- **A declared file that will not load reports an error.** It does not fall back
  to another language and does not silently stall.

---

## Current state

The two files under `manuscripts/bhagavad-gita/` are **placeholder test
fixtures**, not narration. They were rendered offline so the audio pipeline
could be tested end to end, and they say so out loud when played. Replace them
with real recordings — no code or manifest edits needed beyond a rebuild.

No real narration has been recorded for Antara yet.

---

## Keeping the repository small

Audio is heavy. Once real recordings arrive, consider Git LFS or a CDN and
point `audioUrl` at the absolute URL — the manifest accepts absolute URLs, and
nothing in the player assumes the files are local.
