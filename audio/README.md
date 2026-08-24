# Narration audio

Antara narrates from **prepared audio files where they exist**, and falls back to
a **browser voice** where they do not.

```
Manuscript  →  Language  →  recorded audio asset  →  HTML5 <audio>
                         →  else browser voice    →  Web Speech
                         →  else honest refusal
```

A recording always wins: it sounds identical on every machine. Everything in this
folder exists to replace browser voices, one language at a time.

> **Adding production narration?** Read
> **[`docs/NARRATION_ASSETS.md`](../docs/NARRATION_ASSETS.md)** — it is the full
> pipeline guide. Run `npm run narration:expected` to see every path still
> waiting for a file.

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
missing entry: the language falls through to a browser voice. It never falls
through to another language's recording.

---

## Rules the player keeps

- **Nothing is generated at page load.** The manifest is a static file.
- **Duration, position and the progress bar come from the media element**, never
  from the manifest. `durationSeconds` in the manifest is metadata for tooling;
  if it disagrees with the decoded file, the decoded file wins.
- **Web Speech never fakes a duration.** The transport shows `—` and an animated
  speaking state; the bar advances only on real word-boundary positions.
- **A language is offered when it has either a recording or a usable voice**, and
  the picker labels which — *recorded* or *browser voice*.
- **Never speak without a resolved voice.** Chromium accepts an unbound utterance
  and emits silence without error, so an unresolved voice is reported instead.
- **Sanskrit matches only genuine `sa` voices.** A Hindi voice reading Devanagari
  is not Sanskrit narration.
- **A declared file that will not load reports an error.** It does not fall back
  to another language and does not silently stall.

---

## Current state

The two files under `manuscripts/bhagavad-gita/` are **placeholder test
fixtures**, not narration. They were rendered offline so the audio pipeline
could be tested end to end, and they say so out loud when played. Replace them
with real recordings — no code or manifest edits needed beyond a rebuild.

**No real narration has been recorded for Antara yet.** Everything a reader
currently hears outside those two fixtures is a browser voice, which varies by
machine and by which voices the reader has installed. That is the gap this
folder exists to close.

---

## Keeping the repository small

Audio is heavy. Once real recordings arrive, consider Git LFS or a CDN and
point `audioUrl` at the absolute URL — the manifest accepts absolute URLs, and
nothing in the player assumes the files are local.
