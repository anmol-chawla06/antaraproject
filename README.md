# Antara

**स्मृतिषु संस्कृतिः, स्थलेषु इतिहासः।**
*In memories, culture; in places, history.*

A digital gateway to India's living heritage — festivals, destinations, and classical texts, connected into one experience.

---

## What Antara actually is

Four independent front ends in one repository, two Node backends, and a Python data pipeline. There is **no bundler and no build step** for the front ends: each HTML page loads plain `<script>` files directly.

| Experience | Entry point | Scripts it loads | Backend |
| :--- | :--- | :--- | :--- |
| Festival calendar | `index.html` | inline; fetches `festivals_database.json` | none |
| Destinations map | `map.html` | `map-data.js` → `data.js` → `app.js` | none |
| Heritage Library | `library.html` | `texts_data.js` → `narration.js` → `library.js` | none |
| Landing page | `landing-page/index.html` | `js/chatService.js`, `js/main.js` | `landing-page/server.js` |

Because the apps are independent, **a change to one script does not affect another page.** Check which HTML file actually loads a script before editing it.

> **Current development status lives in [`PROJECT_PROGRESS.md`](PROJECT_PROGRESS.md)** — what is
> built, what is verified, what is blocked, and the open issue list. It is the single source of
> truth for project state and is updated with every change.

---

## 1. Requirements

- **Node.js 18+** (tested on 22)
- **Python 3.8+** — only for the static file server and the data pipeline
- A modern browser

---

## 2. Installation

```bash
git clone <repository-url>
cd "Antara India"

cd landing-page && npm install && cd ..
```

The repository root has **no npm dependencies** — the three static apps run on plain browser JavaScript, and the validation scripts use only Node built-ins. Only the web server needs installing.

---

## 3. Environment variables

One `.env` file, for the web server. Copy the example and fill it in — **never commit a `.env`.**

```bash
cp landing-page/.env.example landing-page/.env
```

**`landing-page/.env`**:

| Variable | Purpose |
| :--- | :--- |
| `OPENAI_API_KEY` | Heritage AI. Unset ⇒ the AI panel reports it is unconfigured. |
| `OPENAI_MODEL` | Defaults to `gpt-4o`. |
| `ADMIN_PASSWORD` | **Unset ⇒ the admin area is disabled entirely.** There is no default password. |
| `ADMIN_SESSION_SECRET` | Signs admin cookies. Blank ⇒ random per start, so restarts sign you out. |
| `PORT` | Defaults to `8080`. |
| `ALLOWED_ORIGINS` | Comma-separated cross-origin allow-list. Blank is correct for local use. |

---

## 4. Running it

### Everything through one server (recommended)

`landing-page/server.js` serves the landing page **and** the three sibling apps, so all cross-app links work:

```bash
cd landing-page
npm start
```

| URL | Page |
| :--- | :--- |
| http://localhost:8080/ | Landing page |
| http://localhost:8080/index.html | Festival calendar |
| http://localhost:8080/map.html | Destinations map |
| http://localhost:8080/library.html | Heritage Library |
| http://localhost:8080/admin/messages/ | Contact inbox (sign-in required) |

### Static apps only (no backend)

The three root apps need no server-side code:

```bash
npm run serve      # python -m http.server 8080
```

Heritage AI and the contact form will not work in this mode — they need `server.js`.

> **Port conflict:** `server.js` and the static server both default to 8080. Give one a different port if you run both.

---

## 5. Architecture

### Data-first, offline-capable

Every app's core content is static JSON committed to the repository — `festivals_database.json`, `texts_database.json` / `texts_data.js`, `data.js` / `map-data.js`. Pages `fetch()` or `<script>`-include these; the bot reads them with `fs.readFileSync` at startup. **Prefer extending these files over adding a live API dependency.**

### Backends

- **`landing-page/server.js`** — Express. Serves static files, proxies Heritage AI to OpenAI, stores contact messages, and guards the admin area.
  - `middleware/adminAuth.js` — signed-cookie admin sessions
  - `middleware/rateLimit.js` — per-IP fixed-window limiting

---

## 6. API routes

All JSON responses use one of two shapes:

```jsonc
{ "success": true,  "data": { } }
{ "success": false, "error": { "code": "…", "message": "…" } }
```

| Method | Route | Auth | Notes |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/contact` | public | 5 requests / 10 min per IP |
| `GET` | `/api/contact/messages` | admin | Newest first |
| `PATCH` | `/api/contact/messages/:id` | admin | `new` \| `read` \| `replied` \| `archived` |
| `POST` | `/api/chat` | public | 12 requests / min per IP |
| `POST` | `/api/admin/login` | public | 10 attempts / 15 min per IP |
| `POST` | `/api/admin/logout` | public | Clears the session cookie |

Request bodies are capped at 32 kB. Errors never include stack traces or upstream provider messages.

---

## 7. Narration

**Narration is prepared audio files only. There is no text-to-speech anywhere.**

```
Manuscript  →  Language  →  Audio asset  →  HTML5 <audio>
```

A passage therefore sounds the same on every machine, or the Library says
plainly that no recording exists. Nothing depends on the reader's installed
voices.

Which recordings exist is declared in **`audio/manifest.json`**, generated by
scanning `audio/manuscripts/`:

```bash
npm run build:narration
```

Tracks resolve **verse → chapter → book**, so one carefully recorded verse can
sit inside a whole-manuscript reading. A verse may also carry inline narration
in the database, which takes precedence over the manifest:

```jsonc
"narration": {
  "en": { "available": true, "audioUrl": "audio/…/bg_2_47.en.mp3", "transcript": "…" },
  "hi": { "available": false }
}
```

`available: false` means *not recorded yet* — identical to absent. The language
is disabled in the picker and nothing plays. It never falls through to another
language.

When a recording exists, play/pause/seek/volume all work and **duration and the
progress bar are read from the media element**, never from the manifest. When
one does not, the Library shows *"Narration unavailable"* and stays silent.

See **[`audio/README.md`](audio/README.md)** for the folder convention and how
to add a language.

> **The two files under `audio/manuscripts/bhagavad-gita/` are placeholder test
> fixtures, not narration.** They were rendered offline so the pipeline could be
> tested end to end, and they say so when played. No real narration has been
> recorded for Antara yet.

### Verifying it in a browser

With the server running, open **`/narration-selftest.html`** and press *Run
tests*. It exercises a real `HTMLAudioElement` against the manifest — duration,
playback, pause, seek, volume, byte-range seeking, and the missing-file path —
and reports what it observed.

---

## 8. Heritage AI (OpenAI)

The API key lives **only** on the server. The browser calls `/api/chat`; `server.js` adds the system prompt and any page context, then calls OpenAI.

- Set `OPENAI_API_KEY` in `landing-page/.env`
- Optionally set `OPENAI_MODEL` (default `gpt-4o`)
- With no key the endpoint returns `AI_UNCONFIGURED` and the panel says so plainly

Page context (which section the reader is viewing) is sent as `{ type, id }` and clipped server-side before it reaches the prompt.

---

## 9. Booking and payments

**Not implemented.** There is no Razorpay integration, no payment routes, and no booking logic in this repository. "Plan your visit" links to the festival calendar. Nothing in the UI claims a booking capability that does not exist.

---

## 10. Contact system

Submissions are validated server-side (name, email format, message, per-field length caps) and appended to `landing-page/data/contact_messages.json`.

That file is **never** served over HTTP — a 404 handler for `/data` is registered ahead of the static middleware. Do not reorder those routes.

The inbox at `/admin/messages/` requires a signed session. Message fields are rendered as text nodes, never interpolated into HTML, because they are attacker-controlled.

---

## 11. Data structures

### Festival (`festivals_database.json`)

`id` · `name` · `state` · `month` · `all_months` · `timing` · `location` · `coordinates` · `history` · `culture_and_rituals` · `how_to_join` · `local_language` · `uniqueness` · `image_placeholder`

`state` must match a key in `STATES_META` (`data.js`), because the festival panel's "Plan your visit" button deep-links to `map.html#/india/<state-slug>`.

### Library

Python is the source of truth. `data_builders/gita.py`, `upanishads.py`, `rigveda.py`, `classics.py` each expose a `get_*()` function; `build_all.py` assembles, validates, and writes **both** `texts_database.json` and `texts_data.js`.

```bash
npm run build:library      # python build_all.py
```

**Never hand-edit `texts_data.js`** — it is generated.

### Map

`map-data.js` holds the projection bounds and per-state SVG paths, generated by `gen.py`:

```bash
npm run build:map          # python gen.py
```

The projection formula is duplicated in `gen.py`, `map-data.js` (`PROJECT_BOUNDS`) and `app.js` (`project()`). **If you change bounds, change all three** or markers drift from the coastline.

---

## 12. Tests

```bash
npm test
```

Runs three checks:

| Script | Verifies |
| :--- | :--- |
| `validate_db.js` | Every verse has all required fields; sample searches return hits |
| `validate_app.js` | Each page's scripts load in real order under a mocked DOM |
| `validate_narration.js` | Track resolution, language availability, manifest integrity, and that no Web Speech API call survives anywhere |

---

## 13. Troubleshooting

**Narration says unavailable.**
No recording exists for that manuscript in that language — the expected state for almost everything today. Add audio under `audio/manuscripts/`, run `npm run build:narration`, reload. Installing OS voices does nothing; Antara does not use them.

**A language is greyed out with "— no recording".**
Working as intended. The picker only enables languages that have a real file.

**Heritage AI says it is not configured.**
`OPENAI_API_KEY` is missing from `landing-page/.env`. Restart the server after adding it.

**`/admin/messages/` redirects to a sign-in page that rejects every password.**
`ADMIN_PASSWORD` is unset, so the admin area is disabled. Set it and restart.

**Signed out of admin after every restart.**
Expected unless `ADMIN_SESSION_SECRET` is set.

**Port 8080 already in use.**
Set `PORT` in `landing-page/.env`, or run the static server on another port.

**Map markers sit in the wrong place.**
The projection constants in `gen.py`, `map-data.js` and `app.js` have drifted apart. Re-sync all three.

**Library shows mojibake instead of Devanagari.**
Serve over HTTP rather than opening the file directly; `file://` can mis-detect encoding.

**Cross-app links 404.**
Run `landing-page/server.js`, which serves the repository root too. A bare static server in `landing-page/` cannot see the sibling apps.
