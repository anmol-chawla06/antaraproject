# Narration assets

How to add production narration (ElevenLabs or a studio recording) to Antara.

**The short version:** put an MP3 at `audio/manuscripts/<manuscript>/<lang>.mp3`,
run `npm run build:narration`, reload the Library. Nothing else.

---

## 1. Where audio files go

```
audio/
  manifest.json              generated — do not hand-edit
  narration_manifest.js      generated — browser twin of the above
  manuscripts/
    bhagavad-gita/
      sa.mp3                       ← whole manuscript, Sanskrit
      hi.mp3                       ← whole manuscript, Hindi
      en.mp3                       ← whole manuscript, English
      chapters/
        bg_ch_02.sa.mp3            ← one chapter
      verses/
        bg_2_47.sa.mp3             ← one verse
      transcripts/
        bg_2_47.sa.txt             ← optional, plain UTF-8
    rigveda/
      sa.mp3
      ...
```

Three scopes exist so narration can be recorded at whatever granularity is
practical. **You only need the book-level file to start.**

---

## 2. Naming convention

### Manuscript folder

The book `id` from `texts_database.json`, with underscores turned into hyphens.
This is the *only* transformation — there is no separate slug field to maintain.

| Book id | Folder |
| :--- | :--- |
| `bhagavad_gita` | `bhagavad-gita` |
| `rigveda` | `rigveda` |
| `katha_upanishad` | `katha-upanishad` |
| `mundaka_upanishad` | `mundaka-upanishad` |
| `isha_upanishad` | `isha-upanishad` |
| `valmiki_ramayana` | `valmiki-ramayana` |
| `yoga_sutras` | `yoga-sutras` |
| `ashtavakra_gita` | `ashtavakra-gita` |
| `natya_shastra` | `natya-shastra` |
| `arthashastra` | `arthashastra` |

### Language file

**ISO 639-1 codes, not full language names** — `sa.mp3`, not `sanskrit.mp3`.

The code is already the identity of a language everywhere else in the system:
it is the manifest key, the `<option>` value in the Library's picker, the
`antara_narration_lang` localStorage value, and the root of the BCP-47 tag used
to match browser voices. Using full names here would create a second vocabulary
to keep in sync, which is exactly the kind of drift the deterministic resolver
exists to prevent.

### Chapter and verse files

`<chapter-id>.<lang>.mp3` and `<verse-id>.<lang>.mp3`, using ids exactly as they
appear in `texts_database.json` (e.g. `bg_ch_02`, `bg_2_47`). The builder
**rejects ids that do not exist** rather than writing a manifest entry that can
never resolve.

---

## 3. Supported language codes

| Code | Language | Text in the database? | Browser voice fallback |
| :--- | :--- | :--- | :--- |
| `sa` | Sanskrit | ✅ `sanskrit` | ❌ **none — recording required** |
| `hi` | Hindi | ✅ `hindi` | ✅ where a Hindi voice is installed |
| `en` | English | ✅ `english` | ✅ where an English voice is installed |
| `ta` | Tamil | ❌ | needs a voice *and* a translation |
| `te` | Telugu | ❌ | needs a voice *and* a translation |
| `gu` | Gujarati | ❌ | needs a voice *and* a translation |
| `mr` | Marathi | ❌ | needs a voice *and* a translation |
| `bn` | Bengali | ❌ | needs a voice *and* a translation |
| `kn` | Kannada | ❌ | needs a voice *and* a translation |
| `ml` | Malayalam | ❌ | needs a voice *and* a translation |

**Sanskrit is the priority for recording.** No mainstream browser ships a
Sanskrit voice, and Antara deliberately refuses to read Devanagari with a Hindi
voice and label it Sanskrit. Until a recording exists, Sanskrit narration is
simply unavailable — a recording is the only thing that fixes it.

Languages with no text in the database cannot fall back to speech either: there
is nothing to read. A recording works for them regardless, since a recording
does not need the text.

### Adding a language not listed

One entry in `LANGUAGE_CATALOGUE` in `build_narration_manifest.js`:

```js
{ code: 'or', label: 'Odia', nativeLabel: 'ଓଡ଼ିଆ', textField: null,
  speech: { lang: 'or-IN', match: ['or-in', 'or'] } }
```

`textField` names the verse field holding that language's text, or `null` if the
database has none yet.

---

## 4. Supported formats

`.mp3` is the default and the right choice for ElevenLabs output. The builder
also accepts `.m4a`, `.aac`, `.ogg`, `.oga`, `.opus`, `.wav`, `.flac`, `.webm`.
Format is carried through as `mimeType` in the manifest, so switching formats is
a data change, not a code change.

Exact duration is read from the file header for `.wav` only. For every other
format the manifest records `durationSeconds: null` **on purpose** — the player
always reads duration off the media element, so a manifest number can never
disagree with what is actually playing.

---

## 5. How to add a recording

### Step 1 — see what is missing

```bash
npm run narration:expected            # all 10 languages
node build_narration_manifest.js --expected sa,hi,en
```

This prints every manuscript × language slot, the exact path each expects, and
whether it is filled. It is the worksheet for a recording session.

### Step 2 — generate the audio

Produce one MP3 per manuscript per language. The text to narrate lives in
`texts_database.json` — the `sanskrit`, `hindi` and `english` fields of each
verse, in chapter then verse order.

### Step 3 — drop the files in

```
audio/manuscripts/bhagavad-gita/sa.mp3
audio/manuscripts/rigveda/sa.mp3
```

Create the manuscript folder if it does not exist. **Do not edit
`audio/manifest.json`** — it is generated.

### Step 4 — rebuild the manifest

```bash
npm run build:narration
```

The builder scans, validates and reports. It **skips with a warning** rather
than writing a broken manifest if a file names an unknown language, an id that
does not exist, or a folder matching no book.

### Step 5 — verify

```bash
npm test
```

---

## 6. How the Library discovers it

Nothing scans at runtime and nothing is generated on page load. The chain is:

```
build_narration_manifest.js   scans audio/manuscripts/
        ↓
audio/manifest.json  +  audio/narration_manifest.js      (static, committed)
        ↓
library.html loads narration_manifest.js before narration.js
        ↓
narration.js  planNarration(index, scope, lang, verse, voices)
        ↓
        ├─ recording found  → HTML5 <audio>          "— recorded"
        ├─ else usable voice → Web Speech            "— browser voice"
        └─ else              → honest refusal        "— no voice installed"
```

**Resolution order is verse → chapter → book.** A verse recording beats a
chapter recording, which beats a whole-manuscript reading. So you can ship a
book-level reading now and refine individual verses later without removing
anything.

**A recording always beats a browser voice.** Adding `sa.mp3` for a manuscript
silently upgrades that language from unavailable to recorded — the picker
relabels itself from *"— no voice installed"* to *"— recorded"* on reload. No
player code changes.

### Per-verse override

A verse may also declare narration inline in the database, which takes
precedence over the manifest:

```jsonc
"narration": {
  "en": { "available": true, "audioUrl": "audio/…/bg_2_47.en.mp3", "transcript": "…" },
  "hi": { "available": false }
}
```

`available: false` means *not recorded yet* and is treated exactly like absent —
it falls through to a browser voice, never to another language's recording.

---

## 7. How to test it locally

```bash
cd landing-page && npm start          # serves the Library and the audio
```

Then:

1. Open <http://localhost:8080/library.html>
2. Pick the manuscript you added audio for
3. The language picker should show **"— recorded"** next to that language
4. Press play — the status line should read *"… narration — recorded for this
   manuscript"*

**Automated:** `npm test` includes a check that every track declared available
actually exists on disk, and an integration test that creates a file, rebuilds
the manifest, confirms it is discovered and selected over the browser voice,
then removes it again.

**In-browser harness:** <http://localhost:8080/narration-selftest.html> exercises
a real `HTMLAudioElement` — duration, play, pause, seek, volume, byte-range
seeking, and the missing-file path.

> Serve over HTTP, not `file://`. Seeking needs HTTP byte-range support, which
> `landing-page/server.js` provides (verified returning `206 Partial Content`).

---

## 8. Current state

**No production narration has been recorded for Antara.**

The two files under `audio/manuscripts/bhagavad-gita/` are **placeholder test
fixtures**, rendered offline so the pipeline could be tested end to end. They
announce themselves as fixtures when played. Replace them.

Everything else a reader currently hears is a browser voice, which varies by
machine and by which voices the reader has installed.

### Recommended order

1. **Sanskrit, all 10 manuscripts** — the only language that cannot fall back at
   all, and the one closest to the source texts
2. **Hindi** — currently depends on a *network* voice in Chrome, which needs a
   connection and cannot pause mid-sentence
3. **English** — currently the best-served by browser voices, so lowest urgency

---

## 9. Keeping the repository small

Audio is heavy. Before a full set of recordings lands, decide between:

- **Git LFS** — keeps paths relative, no code changes
- **A CDN** — set `audioUrl` to an absolute URL; the manifest accepts them and
  nothing in the player assumes files are local

The two placeholder fixtures already account for 1.7 MB.
