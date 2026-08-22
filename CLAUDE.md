# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

Antara is a static, framework-free cultural heritage platform for India. It is actually **four independent front ends** sharing one repo, plus **two separate Node backends**, plus a **Python/Node data pipeline**. There is no bundler, no build step, and no shared component system — each HTML page loads its own plain `<script>` files directly.

| App | Entry point | Own JS/data | Backend |
| :--- | :--- | :--- | :--- |
| Festival Temporal Grid | `index.html` | inline `<script>`, fetches `festivals_database.json` | `bot.js` (Telegram bot) |
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

Run the festival Telegram bot (root package.json):
```bash
npm install
node bot.js        # requires TELEGRAM_TOKEN and GEMINI_API_KEY env vars
```

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

Validate after generating/editing library data (no formal test framework — these are the "tests"):
```bash
node validate_db.js     # loads texts_data.js in a Node vm sandbox, checks every verse has required fields, runs sample searches
node validate_app.js    # loads texts_data.js + app.js in a mocked-DOM vm sandbox to catch syntax/runtime errors
```

Regenerate the India state SVG path data used by `map.html` (fetches a GeoJSON source and re-projects/simplifies it):
```bash
python gen.py
```
This must stay in sync with the projection constants duplicated in `map-data.js` (`PROJECT_BOUNDS`) and mirrored in `app.js`'s `project()` function — if you change the projection bounds in one, update all three.

There is no linter, formatter, or automated test suite configured anywhere in this repo (`npm test` in both `package.json` files is an unimplemented stub).

## Architecture notes

### Data-layer philosophy
Every app is built around **zero external API calls for core content** — all content lives in static JSON committed to the repo (`festivals_database.json`, `texts_database.json`/`texts_data.js`, `data.js`/`map-data.js`). Pages `fetch()` or directly `<script>`-include these files; the Telegram bot loads them with `fs.readFileSync` at startup. When adding content, prefer extending these static files over introducing a live API dependency, since "zero-latency / offline-capable" is a stated design goal (see `TECHSTACK.md`, `WORKFLOW.md`).

### Festival portal (`index.html` + `bot.js`)
- `index.html` renders a 12-month calendar grid from `festivals_database.json`, and a detail panel with a **◈ Plan a trip** button that deep-links to `https://t.me/AntaraV1bot?start=<festival_id>`.
- `bot.js` is a Telegram bot (`node-telegram-bot-api`) that intercepts `/start <festival_id>`, does an exact lookup against `festivals_database.json`, and also runs a conversational RAG assistant via Google Gemini (`@google/generative-ai`) with multi-turn per-chat session memory (`userSessions` Map) and multi-model failover (`gemini-3.7-flash` → `gemini-3.5-flash` → `gemini-3.1-flash-lite`), falling back to a deterministic offline response if the AI call fails/times out. See `WORKFLOW.md` for the full sequence diagram.
- Adding a festival = adding an entry to `festivals_database.json` with the schema documented in `TECHSTACK.md` §3 (`id`, `name`, `state`, `month`, `all_months`, `timing`, `location`, `coordinates`, `history`, `culture_and_rituals`, `how_to_join`, `local_language`, `uniqueness`, `image_placeholder`); both the frontend and the bot read this same file, no separate sync step needed. (`TECHSTACK.md` also lists a `cuisine` field, but no entry in the live data has ever carried one.)

### Heritage Library (`library.html` + `library.js` + `data_builders/`)
- Source of truth for scripture content is Python: `data_builders/gita.py`, `upanishads.py`, `rigveda.py`, `classics.py` each expose a `get_*()` function returning book objects (categories: `vedas_upanishads`, `epics_itihasa`, `philosophy_darshana`, `classical_shastras`).
- `build_all.py` imports all of these, assembles/validates the full DB (asserts every verse has `id`, `verse_number`, `citation`, `sanskrit`, `transliteration`, `word_meanings`, `english`, `hindi`, `commentary`), then writes both `texts_database.json` and `texts_data.js`.
- `download_and_integrate.js` is a Node-side resync utility that regenerates `texts_data.js` from an already-written `texts_database.json` (use `build_all.py` when adding/editing content in `data_builders/`; use this only if `texts_database.json` was edited directly and `texts_data.js` needs to catch up).
- **Narration is browser text-to-speech, not recorded audio.** `verse.audio` is empty for all 142 verses and no audio files ship in this repo. `narration.js` holds the pure decision logic (language registry, voice resolution, recorded-vs-synthesis precedence) and is unit-tested by `validate_narration.js`; `library.js` owns the player and all side effects. The critical invariant: **if no matching voice is installed, refuse to speak and show an "unavailable" state** — Chromium accepts an utterance with no bound voice, emits no sound, and never fires `onerror`, so a player that trusts `onstart` will animate over silence. Adding a language = one entry in `NARRATION_LANGS` plus an `<option>` in `library.html`.
- `library.js` drives an `AppState` object (active book/chapter/verse, theme, language mode, per-layer visibility toggles for Devanagari/IAST/Anvaya/English/Hindi/commentary, bookmarks) persisted to `localStorage`, plus a dual-mode audio recitation engine (`html5` playback vs. Web Audio `synth` fallback) with configurable loop counts (1/3/9/21/108/∞ — mirrors japa/mala repetition conventions).

### Destinations map (`map.html` + `data.js` + `map-data.js` + `app.js`)
- `map-data.js` holds `PROJECT_BOUNDS`/`INDIA_VIEWBOX` (the lon/lat → SVG projection, generated by `gen.py`) and `INDIA_STATE_PATHS` (SVG path `d` data per state, precomputed — do not hand-edit, regenerate via `gen.py`).
- `data.js` holds `CATEGORIES`, `STATES_META` (per-state slug/tags), and `DESTINATIONS` (the actual heritage sites, e.g. `photos sites/` imagery references).
- `app.js` projects each destination's lon/lat into SVG space using the *same formula* as `gen.py`'s `project()` — keep these two implementations numerically identical if bounds ever change. It also manages a `localStorage`-backed favorites list (`antara.favorites`).

### Landing page (`landing-page/`)
- Fully separate Node project (own `package.json`, own `node_modules`) using Express + the `openai` SDK, distinct from the root's Telegram bot stack.
- `server.js` serves the landing page statically, guards `/admin` with real signed-cookie sessions (`middleware/adminAuth.js` — admin is **disabled outright** unless `ADMIN_PASSWORD` is set; there is no default credential), applies per-IP rate limiting (`middleware/rateLimit.js`), and exposes a contact form API (`POST /api/contact`, `GET/PATCH /api/contact/messages/:id`) backed by flat-file JSON storage (`landing-page/data/contact_messages.json`).
- All API responses use one envelope: `{ success: true, data }` or `{ success: false, error: { code, message } }`. Errors never carry stack traces or upstream provider messages. Changing a response shape means updating its consumer in the same commit.
- `landing-page/js/chatService.js` calls `POST /api/chat`, which **is** implemented server-side (`server.js`). The API key stays on the server; the browser never holds it.
- Requires `landing-page/.env` — copy from `landing-page/.env.example`. `OPENAI_API_KEY`, `OPENAI_MODEL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `PORT`, `ALLOWED_ORIGINS`.
- `landing-page/data/contact_messages.json` must never become HTTP-reachable: a 404 handler for `/data` is registered *before* the static middlewares. Do not reorder those routes. Contact fields are attacker-controlled — the admin UI renders them as text nodes, never via `innerHTML`.

### Visual design language (shared across all four apps)
Dark charcoal background (`#070509`), metallic gold gradient accent (`linear-gradient(135deg, #fcf6ba, #bf953f)`), frosted-glass containers (`backdrop-filter: blur(16px)`), serif/display type pairing (`Cinzel` for headings, `Cormorant Garamond` for body, `Montserrat` for UI/metadata), and standardized Unicode glyphs (`✦ ◈ △ ❖`) in place of emoji for a consistent cross-platform look. Match this palette/typography when touching any of the four front ends — see `TECHSTACK.md` §4 for exact tokens.
