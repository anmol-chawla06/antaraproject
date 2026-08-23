# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status tracker — read and update this

`PROJECT_PROGRESS.md` is the single source of truth for what is actually built, verified,
blocked, or unstarted. **Read it before assuming a feature's state, and update it in the same
task whenever you implement, fix, verify, remove, block, or re-architect something** — update the
item's status, add a row to Recent Changes, and never mark unrelated items complete. Never record
something as tested that was not actually executed.

## What this repository is

Antara is a static, framework-free cultural heritage platform for India. It is actually **four independent front ends** sharing one repo, plus **two separate Node backends**, plus a **Python/Node data pipeline**. There is no bundler, no build step, and no shared component system — each HTML page loads its own plain `<script>` files directly.

| App | Entry point | Own JS/data | Backend |
| :--- | :--- | :--- | :--- |
| Festival Temporal Grid | `index.html` | inline `<script>`, fetches `festivals_database.json` | none (pure static) |
| Destinations Map/Explorer | `map.html` | `map-data.js` + `data.js` + `app.js` | none (pure static) |
| Heritage Library (scriptures) | `library.html` | `texts_data.js` + `narration.js` + `library.js` | none (pure static) |
| Marketing landing page | `landing-page/index.html` | `landing-page/js/main.js` + `chatService.js` | `landing-page/server.js` (Express) |

Because these apps are independent, **do not assume a change to one JS file affects another page** — check which HTML file actually `<script src=...>`s it before editing (e.g. `app.js`/`data.js`/`map-data.js` belong to `map.html`, NOT `index.html`, which is fully self-contained with inline scripts).

## Common commands

Serve the static root (index.html, map.html, library.html) — any of these work, pick whichever is available:
```bash
python -m http.server 8080
# or
npx serve -l 8080 .
# or double-click setup.bat (Windows) / bash setup.sh (Mac/Linux) — auto-detects Python/Node
```
Then open `http://localhost:8080/index.html`, `/map.html`, or `/library.html`.

The repo root has **no npm dependencies** — the static apps are plain browser JS and the validation scripts use only Node built-ins. Only `landing-page/` needs `npm install`.

Run the landing page backend (separate npm project, separate deps):
```bash
cd landing-page
npm install
node server.js      # requires OPENAI_API_KEY in landing-page/.env (copy from .env.example), defaults to port 8080
```
⚠️ `landing-page/server.js` and the static-file server for the root apps both default to port 8080 — run them on different ports if working on both at once.

Rebuild the Heritage Library dataset after editing `data_builders/*.py`:
```bash
python build_all.py
```
This regenerates both `texts_database.json` and `texts_data.js` (a `window.ANTARA_HERITAGE_DB = {...}` wrapper around the same JSON, needed so `library.html` can load it via `<script>` instead of `fetch`, avoiding `file://` CORS issues). Always regenerate — never hand-edit `texts_data.js` directly, it is a generated artifact mirroring `texts_database.json`.

Rebuild the narration manifest after adding or removing audio under `audio/manuscripts/`:
```bash
npm run build:narration     # node build_narration_manifest.js
```

Validate after generating/editing library data (no formal test framework — these are the "tests"):
```bash
npm test                    # runs all three below, in order
node validate_db.js         # loads texts_data.js in a Node vm sandbox, checks every verse has required fields, runs sample searches
node validate_app.js        # loads each page's real script bundle in a mocked-DOM vm sandbox to catch syntax/runtime errors
node validate_narration.js  # narration track resolution, manifest integrity, and the no-Web-Speech guarantee
```

Regenerate the India state SVG path data used by `map.html` (fetches a GeoJSON source and re-projects/simplifies it):
```bash
python gen.py
```
This must stay in sync with the projection constants duplicated in `map-data.js` (`PROJECT_BOUNDS`) and mirrored in `app.js`'s `project()` function — if you change the projection bounds in one, update all three.

There is no linter, formatter, or automated test suite configured anywhere in this repo (`npm test` in both `package.json` files is an unimplemented stub).

## Architecture notes

### Data-layer philosophy
Every app is built around **zero external API calls for core content** — all content lives in static JSON committed to the repo (`festivals_database.json`, `texts_database.json`/`texts_data.js`, `data.js`/`map-data.js`). Pages `fetch()` or directly `<script>`-include these files. When adding content, prefer extending these static files over introducing a live API dependency, since "zero-latency / offline-capable" is a stated design goal (see `TECHSTACK.md`, `WORKFLOW.md`).

### Festival portal (`index.html`)
- `index.html` renders a 12-month calendar grid from `festivals_database.json`, and a detail panel with a **◈ Plan your visit** button that deep-links into the map at `map.html#/india/<state-slug>`.
- The slug is derived by `stateSlug()` in `index.html` and must stay consistent with the `slug` values in `STATES_META` (`data.js`) — a festival whose `state` has no matching entry will land on a state the map cannot render.
- **The Telegram bot was retired.** `bot.js`, `node-telegram-bot-api`, `@google/generative-ai`, `TELEGRAM_TOKEN` and `GEMINI_API_KEY` were removed entirely; nothing in Antara depended on them. `WORKFLOW.md` and `TECHSTACK.md` still describe the bot and are stale on that point.
- Adding a festival = adding an entry to `festivals_database.json` with the schema documented in `TECHSTACK.md` §3 (`id`, `name`, `state`, `month`, `all_months`, `timing`, `location`, `coordinates`, `history`, `culture_and_rituals`, `how_to_join`, `local_language`, `uniqueness`, `image_placeholder`); both the frontend and the bot read this same file, no separate sync step needed. (`TECHSTACK.md` also lists a `cuisine` field, but no entry in the live data has ever carried one.)

### Heritage Library (`library.html` + `library.js` + `data_builders/`)
- Source of truth for scripture content is Python: `data_builders/gita.py`, `upanishads.py`, `rigveda.py`, `classics.py` each expose a `get_*()` function returning book objects (categories: `vedas_upanishads`, `epics_itihasa`, `philosophy_darshana`, `classical_shastras`).
- `build_all.py` imports all of these, assembles/validates the full DB (asserts every verse has `id`, `verse_number`, `citation`, `sanskrit`, `transliteration`, `word_meanings`, `english`, `hindi`, `commentary`), then writes both `texts_database.json` and `texts_data.js`.
- `download_and_integrate.js` is a Node-side resync utility that regenerates `texts_data.js` from an already-written `texts_database.json` (use `build_all.py` when adding/editing content in `data_builders/`; use this only if `texts_database.json` was edited directly and `texts_data.js` needs to catch up).
- **Narration is prepared audio files only — there is no Web Speech API anywhere, and adding one back is a regression.** `validate_narration.js` greps `narration.js`, `library.js` and `library.html` for `speechSynthesis`/`SpeechSynthesisUtterance`/`getVoices` and fails the build on a hit; `validate_app.js` deliberately omits a `speechSynthesis` mock so any reintroduced call throws in the sandbox. The chain is `Manuscript → Language → Audio asset → HTML5 <audio>`.
- Which recordings exist is declared in `audio/manifest.json` (+ its browser twin `audio/narration_manifest.js`), **generated** by `build_narration_manifest.js` from a scan of `audio/manuscripts/` — never hand-edit either. `npm run build:narration`. See `audio/README.md` for the folder convention.
- `narration.js` holds pure resolution logic (manifest indexing, **verse → chapter → book** precedence, inline `verse.narration` overrides, language availability) and is unit-tested; `library.js` owns the player and all side effects. Adding a language = one entry in `LANGUAGE_CATALOGUE` in `build_narration_manifest.js` plus files on disk. The `<select id="voiceSelect">` in `library.html` is populated at runtime from the manifest — do not hardcode `<option>`s back into it.
- Invariants: **a language with no recording is disabled in the picker and plays nothing** — it never falls through to another language; **duration and progress come from the media element, never the manifest** (`durationSeconds` there is advisory tooling metadata); nothing is generated at page load.
- The legacy flat `verse.audio` field (empty for all 142 verses) is no longer read. Per requirement, narration lives in the manifest and **not** in `texts_database.json`, keeping manuscript text and verified translations separate from audio.
- `audio/manuscripts/bhagavad-gita/*.wav` are **placeholder test fixtures**, rendered offline so the pipeline could be tested end to end — they announce that when played. No real narration has been recorded. `narration-selftest.html` is a browser harness that exercises a real `HTMLAudioElement` (duration, play, pause, seek, volume, byte-range, missing-file).
- `library.js` drives an `AppState` object (active book/chapter/verse, theme, language mode, per-layer visibility toggles for Devanagari/IAST/Anvaya/English/Hindi/commentary, bookmarks) persisted to `localStorage`, plus a dual-mode audio recitation engine (`html5` playback vs. Web Audio `synth` fallback) with configurable loop counts (1/3/9/21/108/∞ — mirrors japa/mala repetition conventions).

### Destinations map (`map.html` + `data.js` + `map-data.js` + `app.js`)
- `map-data.js` holds `PROJECT_BOUNDS`/`INDIA_VIEWBOX` (the lon/lat → SVG projection, generated by `gen.py`) and `INDIA_STATE_PATHS` (SVG path `d` data per state, precomputed — do not hand-edit, regenerate via `gen.py`).
- `data.js` holds `CATEGORIES`, `STATES_META` (per-state slug/tags), and `DESTINATIONS` (the actual heritage sites, e.g. `photos sites/` imagery references).
- `app.js` projects each destination's lon/lat into SVG space using the *same formula* as `gen.py`'s `project()` — keep these two implementations numerically identical if bounds ever change. It also manages a `localStorage`-backed favorites list (`antara.favorites`).

### Landing page (`landing-page/`)
- Fully separate Node project (own `package.json`, own `node_modules`) using Express + the `openai` SDK. It is the only Node project in the repo.
- `server.js` serves the landing page statically, guards `/admin` with real signed-cookie sessions (`middleware/adminAuth.js` — admin is **disabled outright** unless `ADMIN_PASSWORD` is set; there is no default credential), applies per-IP rate limiting (`middleware/rateLimit.js`), and exposes a contact form API (`POST /api/contact`, `GET/PATCH /api/contact/messages/:id`) backed by flat-file JSON storage (`landing-page/data/contact_messages.json`).
- All API responses use one envelope: `{ success: true, data }` or `{ success: false, error: { code, message } }`. Errors never carry stack traces or upstream provider messages. Changing a response shape means updating its consumer in the same commit.
- `landing-page/js/chatService.js` calls `POST /api/chat`, which **is** implemented server-side (`server.js`). The API key stays on the server; the browser never holds it.
- Requires `landing-page/.env` — copy from `landing-page/.env.example`. `OPENAI_API_KEY`, `OPENAI_MODEL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `PORT`, `ALLOWED_ORIGINS`.
- `landing-page/data/contact_messages.json` must never become HTTP-reachable: a 404 handler for `/data` is registered *before* the static middlewares. Do not reorder those routes. Contact fields are attacker-controlled — the admin UI renders them as text nodes, never via `innerHTML`.

### Visual design language (shared across all four apps)
Dark charcoal background (`#070509`), metallic gold gradient accent (`linear-gradient(135deg, #fcf6ba, #bf953f)`), frosted-glass containers (`backdrop-filter: blur(16px)`), serif/display type pairing (`Cinzel` for headings, `Cormorant Garamond` for body, `Montserrat` for UI/metadata), and standardized Unicode glyphs (`✦ ◈ △ ❖`) in place of emoji for a consistent cross-platform look. Match this palette/typography when touching any of the four front ends — see `TECHSTACK.md` §4 for exact tokens.
