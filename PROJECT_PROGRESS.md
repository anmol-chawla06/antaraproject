# ANTARA — Project Progress

> Living development tracker. Updated continuously as the project evolves.

**Last audited:** 2026-08-23 · **Branch:** `fix/core-narration-stabilization` · **Tests:** 132 assertions, exit 0

Every status below was established by inspecting the repository and exercising the running
application. Where something was *not* executed, it is marked 🟠 NEEDS VERIFICATION rather
than assumed.

---

## Overall Status

| Area | Status | Notes |
|---|---|---|
| Core Application | ✅ COMPLETE | Four front ends + one Express backend, all serving 200, zero console/network errors |
| Heritage Map | 🟡 IN PROGRESS | 40 destinations, search, filters, gallery + lightbox. **137 Commons images added — 37/40 sites now rich, 0 hero-only.** Region filter and mobile tap targets still open |
| Library | ✅ COMPLETE | 142 verses, 10 manuscripts, layered text, bookmarks, search |
| Narration | 🟡 IN PROGRESS | Hybrid engine verified in Chrome: recorded audio first, browser voice fallback. **No production recordings exist** — audible narration is browser TTS, which varies by machine |
| Festivals | ✅ COMPLETE | 14 festivals, all fields populated, calendar + detail + map deep-links |
| Travel | 🟡 IN PROGRESS | Visitor info complete for all 40 sites; booking is an external handoff, not a flow |
| Heritage AI | ✅ COMPLETE | Verified end-to-end against live OpenAI, rate limiting confirmed |
| Contact | ✅ COMPLETE | Verified end-to-end; flat-file storage is a known production limitation |
| Security | ✅ COMPLETE | Secrets and PII purged from history; all controls tested live |
| Testing | 🟡 IN PROGRESS | 132 automated assertions; no API or backend test suite |
| Product Polish | 🟡 IN PROGRESS | One confirmed mobile overflow bug; accessibility partially addressed |

---

## 1. Core Application

Four independent front ends sharing one repository, plus one Node backend. No bundler, no
build step for the front ends — each page loads plain `<script>` files.

### Completed
- [x] Festival calendar (`index.html`, 852 lines, self-contained inline scripts)
- [x] Destinations map (`map.html` + `map-data.js` + `data.js` + `app.js`, 1026 lines)
- [x] Heritage Library (`library.html` + `texts_data.js` + `narration.js` + `library.js`, 3018 lines)
- [x] Marketing landing page (`landing-page/index.html` + `js/main.js` + `js/chatService.js`)
- [x] Express backend (`landing-page/server.js`, 323 lines) serves the landing page **and** the
      three sibling apps, so all cross-app links resolve from one origin
- [x] Repository root has **zero npm dependencies** — static apps are plain browser JS, and the
      validation scripts use only Node built-ins
- [x] All four pages verified returning HTTP 200 with **0 console errors, 0 exceptions, 0 failed
      requests, 0 HTTP 4xx** at 390px, 768px and 1280px (headless Chrome, 2026-08-23)
- [x] Python data pipeline: `build_all.py`, `gen.py`, `data_builders/*.py`
- [x] Narration manifest pipeline: `build_narration_manifest.js`

### In Progress
- [ ] Landing page horizontal overflow at mobile width — see Known Issues #1

### Not Started
- [ ] Build/minification step (all assets served unminified; `data.js` alone is 5,337 lines)
- [ ] Deployment configuration of any kind

### Blocked / Needs Verification
- 🟠 Never run anywhere but `localhost`. No staging or production environment exists.

---

## 2. Heritage Map

### Completed
- [x] SVG map rendering — `INDIA_STATE_PATHS` holds **37 state/UT paths**, viewBox `[0,0,800,900]`
- [x] Destination markers — **40/40 destinations have `lat`/`lon`**, projected by `project()` in
      `app.js` using the same formula as `gen.py`
- [x] Site data — 40 destinations, **20 states** in `STATES_META`, **8 categories**
- [x] Search overlay (`openSearch`, `renderSearchResults`) with live filtering
- [x] Category filter bar (`applyFilter`)
- [x] State filtering + drill-down via hash router `#/india/<state-slug>/<dest-slug>` (`applyRoute`)
- [x] Back-to-India navigation, breadcrumb, state panel
- [x] Site detail panel — bottom sheet (`openSheet`) and full detail page (`renderDestination`)
- [x] Favourites persisted to `localStorage` (`antara.favorites`) with a live count badge
- [x] Light/dark theme toggle persisted to `localStorage` (`antara_theme`)
- [x] Loader, toast, drawer, scrim, custom cursor
- [x] **40/40 destinations carry images**; **26 flagged UNESCO**; **33 have `nearby` links**
- [x] **40/40 carry `sources`** — provenance is recorded, not invented

### In Progress
- [ ] Mobile map usability — page does **not** overflow at 390px (0px), but **53 interactive
      elements measure under 24px** at that width. Functional, not comfortable.

### Site media architecture — ✅ COMPLETE (2026-08-23)

Verified in Chrome across 6 site records at 1440px and 390px — **0 console errors, 0 exceptions, 0 HTTP 4xx, 0 failed image requests**. Full suite: **121 assertions, exit 0**.

- [x] **`site-media.js`** — one resolver producing `{ hero, gallery[], extras, culture, travel }`
      from **two schemas at once**: the preferred `images: { hero, gallery[], culture, travel }`
      and every legacy field (`image`, `explore[].image`, `dontMiss[].image`, `lookCloser.image`)
- [x] **Adding `images` to a site needs no frontend change** — proven on a real record: the
      previously-unused `Taj_Mahal_Dome.JPG` was added via `images.gallery` and appears in the
      gallery and lightbox with its caption
- [x] Accepts a bare string or `{ src, alt, caption, credit }`; de-duplicates across schemas
- [x] **Alt text is built from the site's own identity** (`"Amber Fort — Jaipur, Rajasthan"`),
      never a filename. Verified 0 missing and 0 filename-shaped alts across all rendered images
- [x] Captions come only from data that already carried one — no fabricated provenance or credits
- [x] **Sections render only where data exists** — numbering is computed, so a sparse site shows
      `01–08` with no gap. Sirpur renders 8 sections, most render 9, Ajanta 10
- [x] Editorial placement: History and Why Visit take a supporting image *beside* the prose
      (sticky on desktop, image-first when stacked); Explore and Don't Miss keep their own
      imagery; Plan Your Visit takes a 21:9 banner where a spare image exists
- [x] **A supporting image is never the hero and never repeats** on the same page
- [x] **Lightbox** — click or keyboard to open, ←/→ to step (wraps), Escape to close, captions,
      `n / total` counter, focus moves to the close button and returns to the thumbnail
- [x] **Lazy loading below the fold** — 15–17 of each rich site's images are deferred; only the
      hero is `fetchpriority="high"`
- [x] Aspect ratio reserved before load (`--media-ratio`), `object-fit: cover`, shimmer loading
      state, and a motif fallback on `error` so a broken file never leaves an empty box
- [x] **Honest fallback** — sites without a photograph for a slot show their own heritage motif
      plus *"Visual archive coming soon"*. Never a stock photo, never another site's picture
- [x] Real photo thumbnails in search results and the favourites drawer
- [x] **No photograph is shared between two sites** (asserted by `validate_media.js`)

### Image coverage — ✅ COMPLETE for the current dataset (2026-08-23)

**40 sites. 40/40 have a working hero. 0 broken paths. 197 distinct image references.**

| Level | Count | Sites |
| :--- | :--- | :--- |
| **Rich** (3+ supporting images) | **37** | all but the three below |
| Partial (1–2 supporting) | **3** | Sree Padmanabhaswamy Temple, Golconda Fort, Bhoramdeo Temple |
| **Hero only** | **0** | — |
| No image at all | 0 | — |

**137 images sourced from Wikimedia Commons**, added across 37 sites. Coverage inverted from
3 rich / 37 hero-only to **37 rich / 0 hero-only**.

The three partial sites are a **source-material limit, not an oversight**: their verified Commons
categories hold only 1–3 files that pass the licence and description filters (Padmanabhaswamy has
3 files in total; photography inside the temple is restricted).

**Sourcing discipline**
- Every image came from a **hand-verified Commons category**. Free-text search was rejected after
  it resolved *Qutb Minar* to `Category:Hashtsal Minar` — a different Delhi monument
- **Licence filter:** public domain and permissive CC only. Non-commercial, no-derivatives and
  anything carrying a Restrictions field were refused
- **Opaque filenames rejected** (`DSC_0787`, `IMG_1234`) — captioning them would mean inventing a
  caption, so they were skipped rather than guessed at
- **1600px renditions downloaded, never originals**; re-encoded to WebP at 1400px
- **Roles derived from each file's own Commons description**, not assigned arbitrarily

| Licence | Count |
| :--- | ---: |
| CC BY-SA 4.0 | 84 |
| CC0 | 13 |
| CC BY-SA 3.0 | 13 |
| CC BY 3.0 | 7 |
| Public domain | 6 |
| CC BY 2.0 | 5 |
| CC BY-SA 2.0 | 5 |
| CC BY 4.0 | 2 |
| CC BY 2.5 / CC BY 3.0 pl | 2 |

**137/137 record a named creator, a licence and a source URL.** Attribution is **rendered on the
page** (figure captions and the lightbox), not merely stored — CC BY and CC BY-SA require it.
Full provenance lives in **`data/media-sources.json`**.

**Asset weight:** 107 MB fetched → **29.8 MB stored** (WebP, avg 222 KB). Total media now ~61 MB
including the pre-existing 31 MB of JPEGs.

#### Open gap 1 — 14 heroes with unverifiable provenance

These sites still use opaque `photos sites/extra/imgi_*_licensed-image.jpg` heroes. They render
correctly and each now sits alongside properly sourced supporting imagery, but **the hero's own
creator and licence cannot be established from the filename**, so it cannot be attributed.
Replace each with a provenanced file from the site's verified Commons category.

| Site | State | Current hero file | Sourced supporting images |
| :--- | :--- | :--- | ---: |
| Qutub Minar | Delhi | `imgi_7_licensed-image.jpg` | 4 |
| Humayun's Tomb | Delhi | `imgi_8_licensed-image.jpg` | 4 |
| Red Fort | Delhi | `imgi_9_licensed-image.jpg` | 4 |
| Konark Sun Temple | Odisha | `imgi_10_licensed-image.jpg` | 4 |
| Fatehpur Sikri | Uttar Pradesh | `imgi_6_licensed-image.jpg` | 4 |
| Brihadeeswara Temple | Tamil Nadu | `imgi_11_licensed-image.jpg` | 4 |
| Agra Fort | Uttar Pradesh | `imgi_5_licensed-image.jpg` | 4 |
| Rani ki Vav | Gujarat | `imgi_12_licensed-image.jpg` | 4 |
| Khajuraho Group of Monuments | Madhya Pradesh | `imgi_13_licensed-image.jpg` | 4 |
| Great Stupa at Sanchi | Madhya Pradesh | `imgi_14_licensed-image.jpg` | 4 |
| Darjeeling Himalayan Railway | West Bengal | `imgi_15_licensed-image.jpg` | 4 |
| Basilica of Bom Jesus | Goa | `imgi_16_licensed-image.jpg` | 3 |
| Mahabodhi Temple Complex | Bihar | `imgi_17_licensed-image.jpg` | 4 |
| Nalanda Mahavihara Ruins | Bihar | `imgi_18_licensed-image.jpg` | 4 |

The verified Commons categories for all 14 are already recorded in `data/media-sources.json`,
so replacing a hero is a re-run of the same sourcing step, not new research.

#### Open gap 2 — 3 sites with only 1 supporting image

A **source-material limit, not an oversight.** Each site's verified Commons category holds too
few files that pass the licence and description filters. More imagery needs a source outside
Commons (state tourism board or ASI, where reuse is permitted).

| Site | State | Supporting images | Total | Why |
| :--- | :--- | ---: | ---: | :--- |
| Sree Padmanabhaswamy Temple | Kerala | 1 | 2 | Commons category holds 3 files in total; photography inside the temple is restricted |
| Golconda Fort | Telangana | 1 | 2 | Large category, but only 1 file passed the licence + description filters |
| Bhoramdeo Temple | Chhattisgarh | 1 | 2 | Only 1 usable file after filtering |

### Data-integrity fixes found during the pass
- [x] **8 sites rendered `href="undefined"`** for the booking link (`plan.bookingUrl` absent).
      Now the link and the "Book on the official portal" CTA appear only where a real URL exists;
      the note falls back to "confirm with the site authority". Verified 0 bad links across all
      6 tested sites, with the CTA correctly absent on India Gate and Sirpur
- [x] **24 sites rendered an empty "Look Closer" section** (`lookCloser` present but no
      hotspots). The section now requires hotspots to render
- [x] All interpolated data is HTML-escaped at render time

### Not Started
- [ ] Region-level (North/South/East/West) filtering — only per-state and per-category exist
- [ ] Map zoom/pan gestures beyond the state drill-down
- [ ] Replace the 14 opaque `imgi_*` **heroes** with provenanced files (their supporting imagery
      is now properly sourced; only the hero lacks verifiable provenance)
- [ ] Re-encode the pre-existing `photos sites/` JPEGs — still **31 MB** with single files up to
      1.4 MB. The 137 new images are already WebP at ~222 KB
- [ ] More imagery for Padmanabhaswamy, Golconda Fort and Bhoramdeo Temple — blocked on Commons
      source material, not on effort

### Blocked / Needs Verification
- 🟠 Not tested on a physical touch device — only emulated viewports.
- 🟠 Projection constants are duplicated across `gen.py`, `map-data.js` and `app.js`; they agree
      today but nothing enforces it.
- 🟠 Heritage AI is **not** wired into the map site experience — it exists only on the landing
      page. Explicitly out of scope for the media pass.

---

## 3. Library

### Completed
- [x] Manuscript browsing — **10 books, 4 categories, 142 verses** across a sidebar tree and a
      quick-select
- [x] Manuscript data generated from Python source of truth (`data_builders/*.py` → `build_all.py`
      → `texts_database.json` + `texts_data.js`)
- [x] Chapter/verse reader with prev/next chapter navigation
- [x] Original Devanagari text, IAST transliteration, word-by-word `word_meanings`
- [x] English + Hindi translations and commentary — **142/142 verses complete on every field**
      (asserted by `validate_db.js`)
- [x] Per-layer visibility toggles (Devanagari / IAST / Anvaya / English / Hindi / commentary)
- [x] Display-language selection (`dual` / `en` / `hi`) persisted to `localStorage`
- [x] Global search with category filters (Ctrl/Cmd+K)
- [x] Bookmarks persisted to `localStorage`
- [x] Adjustable Sanskrit font scale, light/dark theme
- [x] Narration integration — manifest-driven, see §4
- [x] Dhyana Sanctuary ambient sound engine (9 Web Audio layers) with meditation timer

### In Progress
- [ ] Source information — `citation` and `meter` are present per verse, but there is no
      per-manuscript edition/translator/licence provenance block (the map has `sources`; the
      library does not)

### Not Started
- [ ] Manuscript detail/landing pages — books are entered through the reader only
- [ ] Manuscript imagery or facsimiles

### Blocked / Needs Verification
- 🟠 Responsive layout: 0px overflow at all three widths, but the reader was not evaluated for
      *usability* on a small screen.

---

## 4. Narration

> **A language counts as COMPLETE only when a real production recording exists and has been
> tested.** A placeholder fixture is not a recording. A browser voice is not a recording — it
> varies by machine, by OS, and by which voices the reader has installed.

### Architecture — ✅ COMPLETE

Two engines behind one transport, verified in Chrome 151 on 2026-08-23:

```
Manuscript → Language → recorded audio → HTML5 <audio>
                      → else browser voice → Web Speech
                      → else honest refusal
```

- [x] Recorded audio always wins, so any language can be upgraded from a browser voice to a
      real recording by dropping in a file and rebuilding — no player changes
- [x] `audio/manifest.json` + browser twin, generated by `build_narration_manifest.js`
- [x] Resolution precedence **verse → chapter → book**, verified in the browser
- [x] Inline `verse.narration` overrides, with `available: false` falling through to speech
- [x] Language catalogue is data — **10 languages**, each with `speech.match` prefixes
- [x] `narration.js` stays pure: it receives the voice list and never touches
      `speechSynthesis`, so it remains unit-testable in Node
- [x] `planNarration()` is the single decision the player acts on
- [x] Asynchronous voice loading handled via `voiceschanged`; the picker re-offers languages
      whenever the voice list changes
- [x] One utterance at a time — monotonic token per utterance, `cancel()` before every start,
      callbacks from superseded utterances return early
- [x] Chromium's ~15s utterance cut-off worked around with a guarded 10s `resume()` keep-alive
- [x] Autoplay restrictions handled — a start-guard reports the block instead of leaving a play
      button active over silence
- [x] Nothing generated at page load; the manifest is a static file

### The two guarantees that keep it honest

- [x] **Never speak without a resolved voice.** Chromium accepts an unbound utterance, fires
      `onstart`→`onend`, emits nothing and never fires `onerror`. An unresolved voice is
      reported, never attempted
- [x] **Sanskrit matches only genuine `sa` voices.** A Hindi voice reading Devanagari is not
      Sanskrit narration. The prefix matcher guards the hyphen so `sa` cannot match `sat`

### Per-language status

Verified on this machine (Chrome 151, Windows 11) — **22 voices detected, 18 language tags**:

| Language | Status | Evidence |
|---|---|---|
| English | 🟡 IN PROGRESS | **Speaks** via `Microsoft David` (local, en-US). Two **placeholder fixtures** exist for Bhagavad Gita and announce themselves as fixtures. No production recording |
| Hindi | 🟡 IN PROGRESS | **Speaks** via `Google हिन्दी` (network, hi-IN). No recording. Network-dependent and cannot pause mid-sentence |
| Sanskrit | 🔴 BLOCKED | **No Sanskrit voice exists in any mainstream browser.** Correctly refuses rather than substituting Hindi. Only a real recording can unblock this |
| Tamil | ⚪ NOT STARTED | No voice on this machine, no recording, and no Tamil text in the database |
| Telugu | ⚪ NOT STARTED | As Tamil |
| Gujarati / Marathi / Bengali / Kannada / Malayalam | ⚪ NOT STARTED | Catalogued; no voice, no recording, no text |

**No production narration has been recorded for Antara.** What a reader hears today is a
browser voice, so it is not identical across machines — that is the accepted trade for the
current release.

### Player — ✅ COMPLETE (verified in real Chrome, not asserted)

**24/24 checks passed** driving `library.html` in Chrome 151 over the DevTools protocol, with
`speechSynthesis.speak`/`cancel` instrumented to catch duplicates. **0 console errors,
0 exceptions, 0 HTTP 4xx.**

| Requirement | Observed |
|---|---|
| English actually speaks | `Microsoft David - English (United States)`, en-US, 147 chars |
| Hindi actually speaks | `Google हिन्दी`, hi-IN |
| Play (recorded) | `English narration — recorded for this manuscript` |
| Play (speech) | `Speaking — English browser voice (Microsoft David…)` |
| Pause | `paused=true speaking=true` — a genuine engine pause |
| Resume | `speaking=true paused=false`, **without re-queueing** (still 1 utterance) |
| Stop | `speaking=false`, indicator cleared |
| Restart | Scrubber click restarts, since Web Speech exposes no seek position |
| Language switch cancels previous | `cancel()` calls 5 → 7 |
| No duplicate speech | Exactly 1 utterance per start; 2 total across a language switch |
| No fake duration | Total time renders `—`, not a number |
| Speaking state | `progress-bar-container is-speaking` |
| Sanskrit refusal | *"…this browser has no Sanskrit voice — browser speech cannot read Sanskrit, and a Hindi voice would not be Sanskrit narration."* with `speaking=false` |
| No false "unavailable" | Rigveda (zero recordings) shows *"Narration available — browser voice for Hindi, English"* |
| Recorded-audio transport | Play, pause, seek, volume, decoded duration all verified previously (29/29) |

### Production-asset pipeline — ✅ COMPLETE (2026-08-23)

Ready to receive ElevenLabs recordings. No audio was generated and no placeholder MP3 added.

- [x] **One deterministic rule**, owned by `narration.js` and imported by the builder so they
      cannot drift: `manuscript + language → audio/manuscripts/<slug>/<lang>.mp3`
- [x] `manuscriptSlug()`, `expectedAudioPath()`, `expectedChapterAudioPath()`,
      `expectedVerseAudioPath()`, `expectedAudioPaths()` — all pure and unit-tested
- [x] A test asserts the **generated manifest agrees with the resolver**, so a correctly-placed
      file can never be scanned into a key the player does not look up
- [x] **`npm run narration:expected`** prints every manuscript × language slot, its exact path,
      and whether it is filled — the worksheet for a recording session. Currently **1 present,
      29 missing** across sa/hi/en
- [x] **`docs/NARRATION_ASSETS.md`** — paths, naming, language codes, adding a recording,
      automatic discovery, local testing, and the recommended recording order
- [x] Slots use **ISO 639-1 codes** (`sa.mp3`), matching the manifest keys, picker values,
      storage value and BCP-47 voice-matching roots — not a second vocabulary to keep in sync
- [x] **End-to-end drop-in proven**: a test writes a real file at the expected path, rebuilds
      the manifest, confirms the player selects it over the browser voice, then removes it and
      restores the manifest

### Next step for ElevenLabs assets

1. `npm run narration:expected` — get the list of 30 paths (sa/hi/en × 10 manuscripts)
2. Generate MP3s from the `sanskrit` / `hindi` / `english` fields in `texts_database.json`
3. Drop each at its printed path, e.g. `audio/manuscripts/rigveda/sa.mp3`
4. `npm run build:narration` → `npm test`
5. **Record Sanskrit first** — it is the only language that cannot fall back at all

### Not Started
- [ ] Commission or record production narration in any language
- [ ] Transcripts (supported by the manifest, none written)
- [ ] MP3 encoding of the two fixtures — they are WAV; `mimeType` is data-driven so MP3 is a
      drop-in for real assets
- [ ] Git LFS or CDN strategy before real audio lands

### Blocked / Needs Verification
- 🔴 **Sanskrit cannot be narrated by any browser.** Recording is the only path.
- 🟠 **Browser TTS is not identical across machines** — voice, accent and quality depend on the
      reader's OS and installed voices. This is the known cost of the current approach.
- 🟠 **Network voices (e.g. `Google हिन्दी`) need a connection** and **cannot pause mid-sentence**
      in Chromium. The player prefers local voices where they exist, and where a pause fails to
      take it verifies and converts it into a stop rather than leaving a dead button.
- 🟠 Only Chrome 151 on Windows 11 tested. Firefox, Safari and Android expose different voice
      sets and were not exercised.
---

## 5. Festivals

### Completed
- [x] Festival data — **14 festivals**, and **14/14 populated on every field**: `history`,
      `culture_and_rituals`, `how_to_join`, `local_language`, `uniqueness`, `coordinates`,
      `timing`, `all_months`, `image_placeholder`
- [x] 14 festival images shipped under `images/festivals/`
- [x] Twelve-month calendar grid rendered from `festivals_database.json`
- [x] Festival browsing — calendar + carousel + heritage panel
- [x] Festival detail panel with full cultural information
- [x] Dates and multi-month handling (`month` + `all_months`)
- [x] Region/state attribution on every festival
- [x] Navigation — **"◈ Plan your visit" deep-links to `map.html#/india/<state-slug>`**, and
      **all 14 resolve to a state the map can render** (verified)
- [x] Light/dark theme toggle
- [x] Empty state for months with no festivals
- [x] 0px horizontal overflow at 390 / 768 / 1280px; **0 tap targets under 24px**

### Not Started
- [ ] Festival search or filtering beyond the month grid
- [ ] Per-festival permalink route (the map has a hash router; the calendar does not)

---

## 6. Travel / Plan Your Visit

### Completed
- [x] Visitor information — **40/40 destinations carry a complete `plan` block**
- [x] Opening hours (`hours`) and closure days (`closedDay`)
- [x] Location — city, state, country, lat/lon on all 40
- [x] Best time to visit (`bestTime`)
- [x] Time required (`duration`)
- [x] Entry fees, tiered: `entryIndian`, `entryForeign`, `entrySaarc`, `childFree`
- [x] Per-site notes (`note`) for irregular conditions
- [x] Plan Your Visit UI — rendered as a card grid in `renderDestination` (`app.js:722–731`)
- [x] **Honest freshness disclosure** — every panel states "Last checked `LAST_VERIFIED`" and
      links to the official portal
- [x] Festival → map travel route (see §5)

### In Progress
- [ ] Booking — handled as an **external handoff**. Every site carries a `bookingUrl` (e.g.
      `https://asi.payumoney.com/`) opened in a new tab. There is no in-app flow.

### Not Started
- [ ] In-app booking flow
- [ ] Payment integration — **no Razorpay code, no payment routes, no order/refund logic
      anywhere in the repository**
- [ ] Confirmation flow, tickets, or itineraries
- [ ] Multi-site trip planning

### Blocked / Needs Verification
- 🟠 `LAST_VERIFIED` is a single global constant, so fee/hours accuracy is asserted per-build,
      not per-site. Fees and hours have not been re-checked against official sources during
      this work.
- 🔴 **Booking is deliberately out of scope for the current release** (agreed 2026-08-22).
      Treat it as unbuilt, not broken.

---

## 7. Heritage AI

### Completed — verified end-to-end against live OpenAI, 2026-08-23
- [x] Backend API — `POST /api/chat` in `landing-page/server.js`
- [x] OpenAI integration via the official SDK, model from `OPENAI_MODEL` (default `gpt-4o`)
- [x] **API key never reaches the browser** — `chatService.js` calls the server, which holds it
- [x] **Real round-trip verified**: asked for a festival in Assam, received a correct, specific
      answer about Ambubachi Mela at Kamakhya Temple
- [x] Context handling — `{ type, id }` accepted and **clipped server-side** before prompting;
      verified with a `festival`/`ambubachi_mela` context
- [x] Rate limiting — **12/min per IP confirmed live**: 11× `200` then `429`
- [x] Error handling — unconfigured key returns `AI_UNCONFIGURED`; upstream failure returns
      `502 AI_UNAVAILABLE` with **no provider message or stack trace leaked**
- [x] Frontend chat UI — panel, history, input, send button, suggestion chips, close control
- [x] Loading and error states present in `main.js`
- [x] Focus trap and ARIA wiring on the panel

### In Progress
- [ ] Conversation UX — each request is **stateless**; no multi-turn history is sent, so the
      model cannot follow up on its own previous answer

### Not Started
- [ ] Streaming responses
- [ ] Conversation persistence across reloads
- [ ] Automated tests for `/api/chat`

### Blocked / Needs Verification
- 🟠 Mobile chat experience not evaluated — the panel exists but was not exercised at 390px.
- 🟠 Behaviour under a genuinely failing upstream (timeout, 500) was not induced, only the
      unconfigured path was reasoned about.

---

## 8. Contact

### Completed — verified end-to-end, 2026-08-23
- [x] Contact form with modal, loading / success / error / retry states
- [x] Server-side validation — verified: empty name → `NAME_REQUIRED`, bad JSON →
      `MALFORMED_JSON`, oversized body → `413 PAYLOAD_TOO_LARGE`
- [x] Per-field length caps (name 120, email 200, subject 200, message 5000)
- [x] Storage — verified a real submission persisted with `id, name, email, subject, message,
      status, created_at`; test data removed and the 7 genuine messages restored intact
- [x] **Privacy** — `landing-page/data/contact_messages.json` is gitignored, untracked, and
      **purged from all git history**; `contact_messages.example.json` ships as an empty template
- [x] Never HTTP-reachable — `/data/contact_messages.json` returns **404**, guarded by a handler
      registered ahead of the static middleware
- [x] Rate limiting — **5 per 10 min per IP confirmed live**: 4× `200` then `429`
- [x] Admin access — `GET /api/contact/messages`, `PATCH /api/contact/messages/:id`
- [x] **XSS fixed** — the admin inbox renders attacker-controlled fields as text nodes, never
      via `innerHTML`

### In Progress
- [ ] Production storage strategy — flat-file JSON with no locking. Concurrent writes can
      interleave, and it does not survive an ephemeral filesystem. Acceptable for now, not for
      production traffic.

### Not Started
- [ ] Email notification on new submission
- [ ] CAPTCHA or bot heuristics beyond IP rate limiting

---

## 9. Security

### Completed — every control exercised against the running server
- [x] **Secrets removed from Git** — a committed Telegram bot token was purged from all
      reachable history on 2026-08-23 (`git filter-repo`, 5 blobs). Token already revoked
- [x] **PII removed from Git** — `contact_messages.json` purged from history (7 commits)
- [x] Verified after rewrite: **0 commits and 0 blobs** contain the token; the PII path exists in
      **no reachable tree**
- [x] `antaramap` and `antararalibrary` roots kept **byte-identical SHAs** through the rewrite
- [x] `.env` ignored — `.env`, `.env.*`, with `!.env.example` preserved
- [x] **No secrets in tracked files** — pattern scan for OpenAI / Google / Telegram / Razorpay
      key shapes returns nothing
- [x] API key handling — server-side only; the browser never holds a credential
- [x] Authentication — real signed httpOnly cookie sessions (`middleware/adminAuth.js`), HMAC-
      signed, `timingSafeEqual` with sha256 pre-hashing; **admin is disabled outright unless
      `ADMIN_PASSWORD` is set — there is no default credential**
- [x] XSS protection — admin inbox builds DOM nodes with `textContent`
- [x] CORS — allow-list; a disallowed origin receives **no `Access-Control-Allow-Origin` header**
      (verified with `Origin: https://evil.example`)
- [x] Rate limiting — three independent limiters, all confirmed live (login 10/15min, contact
      5/10min, chat 12/min)
- [x] Input validation — type, presence, email shape, per-field caps
- [x] Body limits — `express.json({ limit: '32kb' })`, **verified 40KB → 413**
- [x] Error leakage — one envelope `{success,error:{code,message}}`; **no stack traces and no
      upstream provider messages**; `details: error.message` removed
- [x] `robots.txt` disallows `/admin/`, `/admin-login.html`, `/api/`

### Blocked / Needs Verification
- 🟠 **GitHub still serves pre-rewrite commits by direct SHA** until it garbage-collects. Full
      removal needs GitHub Support or repository recreation.
- 🟠 **Collaborators must re-clone.** Any clone predating 2026-08-23 reintroduces the purged
      blobs if merged or pushed. Collaborator `axmitk` pushes directly to `main`.
- [ ] No HTTPS/HSTS, CSP, or security-header middleware (`helmet`) — deployment-dependent
- [ ] No dependency vulnerability scanning (`npm audit` not wired into anything)

---

## 10. UI / Product Quality

### Completed
- [x] Typography — deliberate pairing: Cinzel (display), Cormorant Garamond (body), Montserrat
      (UI/metadata), consistently applied across all four front ends
- [x] Visual hierarchy — shared dark charcoal `#070509` ground, metallic gold gradient accent
      `linear-gradient(135deg,#fcf6ba,#bf953f)`, frosted-glass containers
- [x] Imagery — 40 destination photos, 14 festival images, 5 landing-page backgrounds
- [x] Standardised Unicode glyphs (`✦ ◈ △ ❖`) instead of emoji for cross-platform consistency
- [x] Navigation — cross-app links resolve because one server serves all four apps
- [x] **Dark mode** — the native design language across every app
- [x] **Light mode** — implemented on map (`applyTheme`), festivals and library, persisted to
      `localStorage`
- [x] **`prefers-reduced-motion` honoured in all three stylesheets**
- [x] Empty states — festival calendar `#empty-state`; library "no results"; narration
      "unavailable"; AI "unconfigured"
- [x] Loading states — map `#loader`, contact `#contactLoadingState`, AI panel
- [x] Error states — contact error + retry, AI error, narration unavailable
- [x] `landing-page/css/styles.css` is a genuine design-token system, not generated filler
- [x] Vibe-coded patterns removed: the 753-line Telegram bot, a fabricated progress bar, a
      no-op auth middleware, and a test suite that could never pass

### In Progress
- [ ] **Responsive design** — three of four pages are clean (0px overflow at 390/768/1280).
      The **landing page overflows 91px at 390px** — see Known Issues #1
- [ ] **Accessibility** — partial. ARIA present (library 20 attributes, map 7, landing 6,
      festivals 2), 9 `role=` attributes, focus traps on modals, `aria-live` on narration status.
      Gaps below.

### Not Started
- [ ] Skip-to-content links — **none on any page**
- [ ] `:focus-visible` styling in `style.css` and `landing-page/css/styles.css` (present only in
      `app.css`)
- [ ] Alt text coverage — only 4 `alt=` attributes across all four pages
- [ ] Tap-target sizing — **53 elements under 24px on the map at 390px**
- [ ] Formal contrast audit against WCAG AA
- [ ] Screen-reader pass with an actual assistive technology

---

## 11. Testing

**Latest verified run: 2026-08-23 — `npm test` → 132 assertions, 0 failures, exit 0.**

### Completed
- [x] `validate_db.js` — every one of 142 verses has all required multi-language fields; sample
      searches return expected hit counts
- [x] `validate_app.js` — loads **each page's real script bundle in its real order** under a
      mocked DOM (`map.html`: map-data → data → app; `library.html`: texts_data →
      narration_manifest → narration → library). Both execute cleanly
- [x] `validate_media.js` — **42 assertions**: image normalisation, both media schemas, sites with
      no or hero-only imagery, section-image picking (never the hero, never repeated), and a live
      dataset audit asserting every referenced file exists, no photo is shared between sites, and
      no alt text is a filename
- [x] Browser media verification — 6 site records at 1440px and 390px: lazy loading, lightbox
      (open, ←/→, wrap, Escape, focus return), themes, stacking, and **0 console errors,
      0 exceptions, 0 HTTP 4xx, 0 failed requests**
- [x] `validate_narration.js` — **86 assertions**: scope resolution, voice resolution and
      ranking, Sanskrit strictness, text selection, the audio/speech/refusal plan, language
      availability, duration handling, manifest integrity, deterministic asset paths, the
      production-asset lifecycle, and that Web Speech is actually wired into the shipped player
- [x] End-to-end asset discovery — a test writes a real file at the expected path, rebuilds the
      manifest, asserts the player selects it over the browser voice, then removes it and
      restores the manifest (self-cleaning, verified leaving nothing behind)
- [x] Browser end-to-end, recorded audio — **29/29 checks** in headless Chrome (playback, pause,
      seek, volume, duration, fallback, missing-language, empty manuscript)
- [x] Browser end-to-end, Web Speech — **24/24 checks** in **headed Chrome 151** with
      `speechSynthesis.speak`/`cancel` instrumented to catch duplicates (English speaks, Hindi
      speaks, pause/resume/stop/restart, language-switch cancellation, Sanskrit refusal)
- [x] Responsive sweep — 4 pages × 3 widths in headless Chrome
- [x] **Browser console: 0 errors, 0 exceptions across every run**
- [x] **Network: 0 failed requests, 0 HTTP 4xx across every run**
- [x] Heritage AI tested end-to-end against live OpenAI, including context and rate limiting
- [x] Contact tested end-to-end including storage, validation, body limit and rate limiting
- [x] `narration-selftest.html` — in-browser harness for manual audio confirmation
- [x] Fresh-clone boot verified after the PII untracking

### In Progress
- [ ] Test coverage is narration-heavy. `validate_db` and `validate_app` contribute 4 of 39
      assertions between them.

### Not Started
- [ ] Unit tests for `app.js`, `library.js` UI logic (only load-without-throwing is checked)
- [ ] API/integration test suite — `landing-page/package.json` `test` script is **a stub that
      echoes and exits 0**. All backend verification to date has been manual `curl`
- [ ] Automated Heritage AI tests (live calls cost money; needs a mocked provider)
- [ ] Automated contact tests (would need an isolated data file)
- [ ] Physical mobile-device testing
- [ ] Cross-browser testing — **only Chromium has been used**; no Firefox or Safari
- [ ] CI — no `.github/`, no pipeline; tests run only when invoked by hand

---

## 12. Documentation

### Completed
- [x] `README.md` — rewritten: architecture table, install, env vars, run modes, API routes,
      narration, troubleshooting
- [x] Setup instructions — verified accurate against a real run
- [x] Environment variables — all six documented (`OPENAI_API_KEY`, `OPENAI_MODEL`,
      `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `PORT`, `ALLOWED_ORIGINS`) with the
      admin-disabled default called out
- [x] `CLAUDE.md` — architecture, per-app boundaries, narration invariants, regression guards
- [x] API documentation — all six routes with auth and rate limits in README §6
- [x] `audio/README.md` — folder convention, adding a language, resolution order, player
      guarantees, and an explicit statement that current audio is placeholder
- [x] `PROJECT_PROGRESS.md` — this file

### In Progress
- [ ] `QUICKSTART.md` — not re-verified against the current codebase

### Blocked / Needs Verification
- 🔴 **`WORKFLOW.md` is stale** — 8 Telegram references and 2 to `bot.js`, all describing a
      component deleted on 2026-08-23
- 🔴 **`TECHSTACK.md` is stale** — 1 Telegram reference; also documents a `cuisine` festival
      field that no live record has ever carried
- [ ] Contributor instructions — none exist (no `CONTRIBUTING.md`)
- [ ] Deployment documentation — none exists

---

## 13. Product Roadmap

### Current Release

Only what is actually intended to ship now:

| Feature | Status |
|---|---|
| Festival calendar with 14 festivals | ✅ COMPLETE |
| Interactive heritage map with 40 destinations | ✅ COMPLETE |
| Heritage Library with 142 verses across 10 manuscripts | ✅ COMPLETE |
| Plan Your Visit information for all 40 sites | ✅ COMPLETE |
| Heritage AI assistant | ✅ COMPLETE |
| Contact form with admin inbox | ✅ COMPLETE |
| Security hardening | ✅ COMPLETE |
| **Recorded narration** | 🟡 architecture done, **no real audio** |
| **Mobile polish** | 🟡 one confirmed overflow bug |
| **Accessibility pass** | 🟡 partial |
| Deployment | ⚪ NOT STARTED |

### Future / V2

Explicitly **not** counted toward current completion:

- More heritage sites beyond the current 40
- More manuscripts beyond the current 10
- Narration in Tamil, Telugu, Gujarati, Marathi, Bengali, Kannada, Malayalam
- Richer narration — per-verse recordings across all manuscripts, transcripts, karaoke-style
  text highlighting synced to audio
- In-app booking and payment integration (Razorpay or equivalent)
- Advanced recommendations ("sites like this one")
- User accounts, saved itineraries, cross-device sync
- Personalised travel plans and multi-site routing
- Production database replacing flat-file contact storage
- GIS improvements — real zoom/pan, clustering, region-level filtering
- Streaming and multi-turn Heritage AI conversations
- Offline/PWA support
- Manuscript facsimile imagery

---

## 14. Known Issues

| Issue | Severity | Status | Notes |
|---|---|---|---|
| Landing page overflows horizontally at 390px | **High** | 🔴 OPEN | `.nav-container` measures **481px inside a 390px viewport**, forcing 91px of document scroll. Reproduced in headless Chrome 151. Other three pages: 0px |
| No production narration audio exists | **High** | 🟡 OPEN | Only two placeholder fixtures. Everything else audible is a browser voice, so narration is **not identical across machines** — accepted for this release |
| 3 sites still have only 1–2 supporting images | Low | 🟡 OPEN | Padmanabhaswamy, Golconda Fort, Bhoramdeo — their Commons categories hold too few usable files. A source-material limit |
| 14 site heroes use opaque `imgi_*` filenames | Medium | 🟠 OPEN | They display and now sit alongside properly sourced supporting imagery, but the hero's own provenance is unverifiable |
| Pre-existing `photos sites/` is 31 MB, files up to 1.4 MB | Medium | 🟠 OPEN | The 137 new images are WebP at ~222 KB; the older JPEGs still need re-encoding |
| Sanskrit cannot be narrated at all | **High** | 🔴 OPEN | No mainstream browser ships a Sanskrit voice. The player refuses rather than substituting Hindi. Only a recording unblocks it |
| Network voices cannot pause mid-sentence | Medium | 🟠 OPEN | Chromium limitation. Local voices are preferred where available; a failed pause is detected and converted to a stop rather than a dead button. Hindi has only a network voice on this machine |
| Web Speech tested in Chrome only | Medium | 🟠 OPEN | Firefox, Safari and Android expose different voice sets and were not exercised |
| `WORKFLOW.md` / `TECHSTACK.md` describe the retired Telegram bot | Medium | 🔴 OPEN | 9 stale references total. Flagged in CLAUDE.md but content not rewritten |
| Pre-rewrite commits still fetchable from GitHub by SHA | Medium | 🟠 OPEN | Inherent to GitHub until GC. Needs Support or repo recreation |
| Collaborators must re-clone after history rewrite | Medium | 🟠 OPEN | `axmitk` pushes directly to `main`. Merging an old clone reintroduces purged blobs |
| 53 tap targets under 24px on the map at 390px | Medium | 🔴 OPEN | Functional but uncomfortable on touch |
| No skip links; sparse `alt` text (4 total) | Medium | 🔴 OPEN | Keyboard and screen-reader users affected |
| Contact storage is an unlocked flat file | Medium | 🟡 OPEN | Concurrent writes can interleave; will not survive an ephemeral filesystem |
| `landing-page` test script is a stub | Medium | 🔴 OPEN | `echo "No tests..." && exit 0` — backend has no automated coverage |
| Heritage AI is stateless per request | Low | 🟡 OPEN | No multi-turn context; model cannot follow up on its own answer |
| Narration fixtures are WAV, not MP3 | Low | 🟡 OPEN | 1.7 MB in-tree. No encoder on the dev machine; `mimeType` already data-driven |
| Projection constants duplicated in three files | Low | 🟠 OPEN | `gen.py`, `map-data.js`, `app.js` agree today; nothing enforces it |
| Stray files: empty `f.id`, untracked `Screenshot_to_fix/` | Low | 🔴 OPEN | `f.id` is 0 bytes and referenced nowhere |
| No sitemap; OG tags only on the landing page | Low | 🔴 OPEN | `robots.txt` notes a Sitemap line is needed once a domain exists |
| Narration work uncommitted | Low | 🟡 OPEN | 8 modified + 3 untracked paths on `fix/core-narration-stabilization` |

---

## 15. Recent Changes

| Date | Change | Status |
|---|---|---|
| 2026-08-23 | Sourced **137 licensed images from Wikimedia Commons** across 37 sites — coverage inverted from 3 rich/37 hero-only to **37 rich/0 hero-only**. Provenance in `data/media-sources.json`, attribution rendered on page | ✅ Done |
| 2026-08-23 | Heritage site media pass: `site-media.js` resolver, gallery + lightbox, lazy loading, honest placeholders, real thumbnails; fixed 8 `undefined` booking links and 24 empty Look Closer sections | ✅ Done |
| 2026-08-23 | Audited image coverage across all 40 sites — 3 rich, 37 hero-only, 0 broken | 🟡 Content gap logged |
| 2026-08-23 | Built the production-asset pipeline: deterministic path resolver, `npm run narration:expected` coverage report, `docs/NARRATION_ASSETS.md`, and an end-to-end drop-in test | ✅ Done |
| 2026-08-23 | Restored Web Speech as the fallback when no recording exists; recorded audio still wins. Verified 24/24 in headed Chrome | ✅ Done |
| 2026-08-23 | Voice ranking now prefers local over network voices — fixed `pause()` silently failing on `Google UK English Female` | ✅ Fixed |
| 2026-08-23 | Fixed stale duration bleeding from a stopped recording into a speech session's transport | ✅ Fixed |
| 2026-08-23 | Created `PROJECT_PROGRESS.md` after a full repository audit | ✅ Done |
| 2026-08-23 | Responsive sweep, 4 pages × 3 widths — found landing-page overflow at 390px | 🔴 Issue logged |
| 2026-08-23 | Verified Heritage AI and Contact end-to-end, including all three rate limiters | ✅ Verified |
| 2026-08-23 | Rebuilt narration on recorded audio; removed the Web Speech API entirely | ✅ Done |
| 2026-08-23 | Added `build_narration_manifest.js`, `audio/manifest.json`, `audio/README.md`, `narration-selftest.html` | ✅ Done |
| 2026-08-23 | Verified the narration player in a real browser — 29/29 checks | ✅ Verified |
| 2026-08-23 | Purged the Telegram token and contact PII from all git history; force-pushed three branches | ✅ Done |
| 2026-08-23 | Retired the Telegram integration (`5311f4b` → `c36b41d`); root now has zero npm deps | ✅ Done |
| 2026-08-22 | Stopped tracking `contact_messages.json` (`c8de9a0`) | ✅ Done |
| 2026-08-22 | Stabilised core: real admin auth, XSS fix, API hardening, working test suite (`fbaa72a`) | ✅ Done |

---

## 16. Release Readiness

- [x] **No secrets in repository** — pattern scan clean; token purged from history and revoked
- [x] **No PII in repository** — `contact_messages.json` untracked and purged from history
- [x] **Security audit complete** — every control exercised against the running server
- [x] **Tests passing** — 132 assertions, exit 0, 2026-08-23
- [x] **Map works** — verified serving, routing, and data integrity
- [x] **Library works** — 142/142 verses complete, page loads and executes cleanly
- [x] **Festivals work** — 14/14 populated, all deep-links resolve
- [x] **Heritage AI works end-to-end** — real OpenAI round-trip with context and rate limiting
- [x] **Contact works** — submission, storage, validation and rate limiting all verified
- [x] **Fresh clone tested** — verified after the PII untracking
- [ ] **Narration works cross-device** — it now *speaks* on any machine with a matching voice,
      but the voice differs per machine and Sanskrit cannot speak at all. Only production
      recordings make it genuinely identical everywhere
- [ ] **Travel works** — information complete; booking is an external handoff by design
- [ ] **Booking works** — 🔴 out of scope for this release; not built
- [ ] **Mobile tested** — emulated only; one confirmed overflow bug open; no physical device
- [ ] **Accessibility checked** — partial; no skip links, sparse alt text, no screen-reader pass
- [ ] **Performance checked** — never measured. No minification, no bundling, no Lighthouse run
- [ ] **All core features verified** — blocked by narration audio and the mobile bug
- [x] **README complete**
- [ ] **Release candidate approved** — not yet

---

## Maintenance rule

This file is a living document. Whenever a feature is implemented, fixed, verified, removed,
blocked, or re-architected, update it **in the same task**:

1. Update the item's status.
2. Add a concise note if the change needs explaining.
3. Add a row to **Recent Changes**.
4. Never mark unrelated items complete.
5. Never record something as tested that was not actually executed.
