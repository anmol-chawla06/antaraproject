# Antara

**स्मृतिषु संस्कृतिः, स्थलेषु इतिहासः।**
*In memories, culture; in places, history.*

A digital gateway to India's living heritage — festivals, destinations, and classical texts, connected into one experience.

---

## What Antara actually is

Four independent front ends in one repository, two Node backends, and a Python data pipeline. There is **no bundler and no build step** for the front ends: each HTML page loads plain `<script>` files directly.

| Experience | Entry point | Scripts it loads | Backend |
| :--- | :--- | :--- | :--- |
| Festival calendar | `index.html` | inline; fetches `festivals_database.json` | `bot.js` (Telegram) |
| Destinations map | `map.html` | `map-data.js` → `data.js` → `app.js` | none |
| Heritage Library | `library.html` | `texts_data.js` → `narration.js` → `library.js` | none |
| Landing page | `landing-page/index.html` | `js/chatService.js`, `js/main.js` | `landing-page/server.js` |

Because the apps are independent, **a change to one script does not affect another page.** Check which HTML file actually loads a script before editing it.

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

npm install                  # Telegram bot dependencies
cd landing-page && npm install && cd ..
```

---

## 3. Environment variables

Two separate `.env` files. Copy each example and fill it in — **never commit a `.env`.**

```bash
cp .env.example .env                          # Telegram bot
cp landing-page/.env.example landing-page/.env  # web server
```

**Root `.env`** — only needed to run the Telegram bot:

| Variable | Purpose |
| :--- | :--- |
| `TELEGRAM_TOKEN` | Bot token from @BotFather |
| `GEMINI_API_KEY` | Google AI Studio key for the bot's assistant |

**`landing-page/.env`** — needed for the web server:

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

### The Telegram bot

```bash
npm run bot
```

Requires `TELEGRAM_TOKEN` and `GEMINI_API_KEY`.

> **Port conflict:** `server.js` and the static server both default to 8080. Give one a different port if you run both.

---

## 5. Architecture

### Data-first, offline-capable

Every app's core content is static JSON committed to the repository — `festivals_database.json`, `texts_database.json` / `texts_data.js`, `data.js` / `map-data.js`. Pages `fetch()` or `<script>`-include these; the bot reads them with `fs.readFileSync` at startup. **Prefer extending these files over adding a live API dependency.**

### Backends

- **`bot.js`** — Telegram bot. Intercepts `/start <festival_id>`, looks the ID up in `festivals_database.json`, and runs a conversational assistant on Google Gemini with multi-model failover and a deterministic offline fallback.
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

**Current state: narration is browser text-to-speech, not recorded audio.** No audio files ship with this repository — `verse.audio` is empty for all 142 verses.

The player therefore uses the Web Speech API, and **only when the device actually has a matching voice installed.** If it does not:

- the language is disabled in the voice picker and labelled *unavailable*
- the player shows *"Narration unavailable — no <language> voice is installed on this device"*
- **nothing is spoken and no progress bar animates**

This matters because the browser API fails silently: with no voice bound, Chromium accepts the utterance, emits no sound, and never fires an error. Earlier builds animated a player over that silence.

### Adding real recorded audio

`narration.js` already resolves recorded audio in preference to synthesis. Add a per-language block to a verse and the player will use it with no code change:

```jsonc
{
  "id": "bg_2_47",
  "sanskrit": "…",
  "narration": {
    "hi": { "available": true, "audioUrl": "/audio/bg_2_47_hi.mp3" },
    "en": { "available": true, "audioUrl": "/audio/bg_2_47_en.mp3" }
  }
}
```

`available: false` is respected — a language marked unavailable falls back to synthesis rather than requesting a missing file. The legacy flat `"audio": "…"` field still works.

**Adding a language** (Tamil, Telugu, …) means one entry in `NARRATION_LANGS` in `narration.js` plus an `<option>` in `library.html`. No new branches in the player.

Because `texts_data.js` is generated, real audio paths belong in `data_builders/*.py`, then `python build_all.py`.

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

`id` must match the `fest-NN` form the Telegram deep link uses.

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
| `validate_narration.js` | Voice resolution, language selection, audio-source precedence |

---

## 13. Troubleshooting

**Narration is silent / says unavailable.**
Working as intended when no matching voice is installed. Install a Hindi or English TTS voice at the OS level (Windows: *Settings → Time & Language → Speech*), then reload. The picker re-checks when voices load.

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
