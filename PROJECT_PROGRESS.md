# ANTARA — Project Progress

> Living development tracker. Updated continuously as the project evolves.

**Last audited:** 2026-08-24 · **Branch:** `fix/core-narration-stabilization` · **Tests:** 319 assertions, exit 0

> **RELEASE CANDIDATE — QA PASSED 2026-08-24.** Verified from a fresh clone at `4ccb390`:
> clean `npm install`, documented startup, 232 assertions, the complete 24-step user journey,
> live Heritage AI round trip, narration fallback, 56 responsive view/theme combinations,
> WCAG AA in both themes, and a clean security audit. **No release blockers.** See §13b.

Every status below was established by inspecting the repository and exercising the running
application. Where something was *not* executed, it is marked 🟠 NEEDS VERIFICATION rather
than assumed.

---

## Overall Status

| Area | Status | Notes |
|---|---|---|
| Core Application | ✅ COMPLETE | Four front ends + one Express backend, all serving 200, zero console/network errors |
| Heritage Map | 🟡 IN PROGRESS | 40 destinations, search, filters, gallery + lightbox. **137 Commons images added — 37/40 sites now rich, 0 hero-only.** **Line-art removed globally; Visual India state galleries added.** Region filter and mobile tap targets still open |
| Library | ✅ COMPLETE | 142 verses, 10 manuscripts, layered text, bookmarks, search |
| Narration | 🟡 IN PROGRESS | **Release rule: English + Hindi browser TTS only**, verified with real clicks in Chromium 151. All other languages state *"Recording unavailable"*. No production recordings; fixture audio removed |
| Festivals | ✅ COMPLETE | 14 festivals, all fields populated, calendar + detail + map deep-links |
| Travel | 🟡 IN PROGRESS | Visitor info complete for all 40 sites. **Booking audited 2026-08-23: 24 verified official portals, 16 honest visitor-info states, 19 broken/wrong links removed.** External handoff only — no payment code |
| Heritage AI | ✅ COMPLETE | Verified end-to-end against live OpenAI, rate limiting confirmed |
| Contact | ✅ COMPLETE | Verified end-to-end. **Admin inbox access restored and a critical PII leak closed 2026-08-24 (section 8b).** Flat-file storage remains a production limitation |
| Security | ✅ COMPLETE | Secrets and PII purged from history; all controls tested live |
| Testing | 🟡 IN PROGRESS | **319 automated assertions** (narration 155, media 42, visit 22, Visual India 57, server security 43) |
| Product Polish | 🟡 IN PROGRESS | **UI refinement pass 2026-08-23: one palette and one type system across all 5 pages; WCAG AA met on every page in both themes; 0 overflow at 4 widths.** Mobile tap targets still open |

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
- [x] **40/40 destinations carry images**; **33 have `nearby` links**
- [x] Heritage status, counted strictly (see the data-integrity fix below): **17 UNESCO
      World Heritage**, 5 UNESCO Tentative List, 4 other heritage labels, 14 with none.
      *26 was the old figure and was wrong — it counted any non-empty `unesco.status`.*
- [x] **40/40 carry `sources`** — provenance is recorded, not invented

### In Progress
- [ ] Mobile map usability — page does **not** overflow at 390px (0px), but **53 interactive
      elements measure under 24px** at that width. Functional, not comfortable.

### Global line-art cleanup — ✅ COMPLETE & VERIFIED (2026-08-23)

The heritage pages carried an `artSVG` "art plate" generator producing decorative
line-art etchings on a 400×300 canvas. It has been removed entirely, along with the
user-facing **"Switch to Line Art"** hero toggle. Photographs, the state map geometry,
UI control icons and genuine source imagery are untouched.

Two distinct defects were found and both are fixed:

| Defect | Before | After |
| :--- | ---: | ---: |
| Decorative line-art plates rendered | **13** (on 13 sites) | **0** |
| Inline icons inflated past icon size | **105** | **0** |
| `.mini-map` state geometry (legitimate, left alone) | 40 | 40 |

- [x] **`artSVG` deleted** (182 lines) together with all five call sites
- [x] **The "Switch to Line Art" toggle removed** — markup, handler and stylesheet rules
- [x] **The icon-size bug fixed at the root.** Inline icons are authored with a
      `viewBox="0 0 24 24"` and no intrinsic size, so inside a flex parent they stretched
      to fill it — which is how a 24px warning glyph came to be drawn **~700px wide on
      every one of the 40 site pages**, and a scroll cue at 132px on all 40. One base rule
      in `app.css` now sizes them; components override by class. The rule keys off the
      24×24 viewBox, so the map's own geometry is unaffected.
- [x] **Look Closer now requires its detail photograph.** Its hotspot coordinates were
      authored against one specific picture; without that picture the coordinates would
      land on arbitrary parts of some other image. **13 sites** therefore omit the section
      rather than illustrate it with a stand-in — no orphaned heading, no dead container,
      and section numbering is computed so no gap appears.
- [x] **Placeholders no longer draw pictures** — a missing photograph shows a quiet tinted
      panel carrying the site's own name plus *"Visual archive coming soon"*
- [x] Verified across all 40 sites at 1440px and 390px: **0 line-art plates, 0 oversized
      icons, 0 console errors, 0 exceptions, 0 HTTP 4xx**

### Visual India — state-level visual discovery — ✅ COMPLETE & VERIFIED (2026-08-23)

A higher-level way in: `INDIA → STATE → HERITAGE SITES → VISUAL GALLERY → SITE EXPERIENCE`,
at **`visual-india.html`**. Nothing about the map or the site detail experience was rewritten.

**20 states · 40 sites grouped · 197 photographs reused · 0 new images.**

| | Count |
|---|---|
| States represented (all derived) | **20** |
| Heritage sites grouped | **40** |
| Photographs reused from existing records | **197** |
| States with a representative image | **20 / 20** |
| States with a real description in the dataset | **20 / 20** |

- [x] **Nothing is hardcoded.** States, counts, slugs, images and links are all computed
      from `window.DESTINATIONS`. Asserted by rebuilding the model with a synthetic extra
      site: it lands in its state, increments the count, contributes its images and gains
      an "Explore Site" link **with no frontend change**. A brand-new state creates its own
      entry and gets a usable slug even if absent from `STATES_META`.
- [x] **Slugs come from `STATES_META`** — the same table the map router uses, so Visual
      India and the map can never address a state differently.
- [x] **Representative image rule (deterministic, documented in `visual-india.js`):**
      only sites that resolve a hero are eligible; UNESCO-inscribed sites rank first; then
      the most-documented site; ties break on dataset order. Rebuilds give an identical
      result every time.
- [x] **No second image schema.** Every picture is resolved through `site-media.js`; the
      gallery holds the resolver's own objects. Adding to `site.images.gallery` flows
      straight through. Creator, licence, source and attribution are preserved.
- [x] **One shared lightbox.** The viewer moved out of `app.js` into **`lightbox.js`**, now
      driven by both the heritage pages and Visual India — one implementation of keyboard
      handling, focus return, preloading and attribution. `mediaCredit` delegates to it, so
      a figure caption and the viewer can never disagree about who took a photograph.
- [x] **Map integration with no map rewrite** — "Explore on Map →" uses the router's
      existing `#/india/<state>` route, which already calls `focusState`.
- [x] **Return path** — every heritage-site page gained *"Explore more from &lt;State&gt; →"*,
      completing the State Gallery ↔ Individual Site loop.
- [x] **Performance** — the index loads only 20 representative images, all lazy; a state's
      site imagery loads only when that state is opened. At 1024px only 12 of 20 index
      images had loaded and at 390px only 9, which is lazy loading behaving correctly.

#### Data-integrity fix found during this phase

`unesco.status` is **not a boolean and is not always about UNESCO**. It holds four kinds of
value: an actual `World Heritage Site` inscription (17 sites), a `Tentative List` entry
(5), a plain heritage label such as `Sacred pilgrimage site` (4), or nothing (14). Both the
map and the new gallery were treating **any** truthy value as "UNESCO", which awarded a
World Heritage listing to 9 sites that do not have one — Danteshwari Temple was badged
"UNESCO World Heritage", and its Heritage-status row read `UNESCO · undefined`.

- [x] One shared rule (`AntaraVisualIndia.isUnescoListed` / `heritageStatus`) now decides,
      used by both `app.js` and Visual India
- [x] Only a genuine inscription is called UNESCO World Heritage; a Tentative List entry
      says so; any other label is shown **in the dataset's own words**, without the gold
      styling that reads as a distinction
- [x] All 6 call sites in `app.js` corrected; Chhattisgarh's UNESCO count went from a
      fabricated 4 to a true 0

#### Remaining media gaps (reported, not blocking)
- 🟠 **3 sites show fewer than 3 pictures** in their state strip because only 2 exist:
      Golconda Fort, Sree Padmanabhaswamy Temple, Bhoramdeo Temple. The strip renders
      2 rather than padding with an unrelated image.
- 🟠 **The 14 legacy hero images still carry no creator/licence metadata**, so the viewer
      shows no attribution line for them — correctly, since none is recorded. Every image
      sourced in the media pass does show one. (Same gap already tracked under Image
      coverage.)
- 🟠 Visual India shows the **hero of the best-documented site** for each state; three
      states are represented by a legacy hero whose provenance is unverified.

#### Routes and files
- Added: `visual-india.html`, `visual-india.js` (model, UMD/Node-testable),
      `visual-india-page.js` (DOM controller), `visual-india.css`, `lightbox.js`,
      `validate_visual_india.js`
- Modified: `app.js` (line-art removal, shared lightbox, heritage-status rule, state
      back-link), `app.css` (icon sizing, placeholder, back-link, dead rules removed),
      `map.html` (loads `lightbox.js` and `visual-india.js`; cache `v=8`), `package.json`
- Routes added: `visual-india.html#/` and `visual-india.html#/state/<slug>`.
      **No map route was added or changed.**

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

### Per-language status — RELEASE RULE (2026-08-24)

**Narration:**
- ✅ **English browser TTS**
- ✅ **Hindi browser TTS**
- ⚪ **Other languages: recording unavailable**
- ⚪ **Production recordings: future enhancement**
- ⚪ **Sanskrit: unavailable without a suitable browser voice or recording**

Audibility of English and Hindi in Chromium was **confirmed by the project owner
on 2026-08-24**; the automated checks below evidence which voice and transcript
reached the engine.

Browser speech is offered for **English and Hindi only**. Every other catalogued
language carries `speech: null`, so the voice list is never consulted for it, no
near-match can creep in, and the picker states plainly that no recording exists.
No language other than English and Hindi is claimed to work.

| Language | Narration | Evidence on the test browser |
|---|---|---|
| English | ✅ **Browser TTS** | Real click on Play → `Microsoft David - English (United States)` `[en-US]`, **local**; utterance.lang `en-US`; the **English** transcript (160 chars, Latin script); `start` fired; status *"Speaking — English"* |
| Hindi | ✅ **Browser TTS** | Real click on Play → `Google हिन्दी` `[hi-IN]`, network; utterance.lang `hi-IN`; the **Hindi** transcript (169 chars, Devanagari); `start` fired; status *"Speaking — हिन्दी"* |
| Sanskrit, Tamil, Telugu, Gujarati, Marathi, Bengali, Kannada, Malayalam, Punjabi, Odia | ⚪ **Recording unavailable** | Disabled in the picker, labelled *"— Recording unavailable"*. Pressing play never calls `speak()` and never borrows another language's voice |

**Voices actually present** (Chromium 151, Windows 11; safe metadata only):
`Google हिन्दी` `[hi-IN]` localService=false · `Microsoft David/Mark/Zira`
`[en-US]` localService=true · `Google US English` `[en-US]` · `Google UK English
Female/Male` `[en-GB]`. **No `en-IN`.** No voice at all for sa, ta, te, bn, gu, mr,
kn, ml, pa, or.

**Data rule enforced:** English speaks the manuscript's `english` field, Hindi speaks
its `hindi` field. All 142 verses carry both. No runtime translation, no invented text,
and the two languages were verified to speak **different** transcripts.

**Fixture audio removed.** The two placeholder Gita WAVs (`en.wav`,
`bg_2_47.en.wav`, 1.7 MB) were deleted so no test file can pre-empt browser
speech. The manifest now declares **0 tracks**. If a genuine production recording
is added later it takes priority automatically — the resolver is unchanged.

### Bug found and fixed during this work — stale speech state

`speechSynthesis` is a browser-wide singleton whose queue **outlives the page**. An
utterance left speaking or paused by a previous visit was still there on load, so
pressing play resumed *that* stale utterance — the previous passage, possibly in the
previous language — instead of speaking the current selection. The player now cancels
the engine once at start-up, so every session begins from silence.

### Manual verification in Chromium — 35/35

Every Play press was a **real `Input.dispatchMouseEvent`** (`isTrusted === true`) on a
foregrounded window, which is what Chrome's user-activation gate actually requires; a
synthetic `.click()` alone is refused as `not-allowed`. Each language was tested from a
freshly loaded, idle page so the click under test genuinely started the speech.

Sequence: selector contents → English speaks → pause → Hindi speaks → pause →
English again → switch language mid-narration (cancels, then speaks the new language,
never two utterances at once) → Sanskrit and Tamil both refuse. **0 console errors.**

*Audibility is evidenced by `speak()` being called once with the correct voice and
transcript, the utterance firing `start`, and the engine reporting `speaking` — the
output was not literally listened to.*

### Voice-selection fix — 2026-08-23

The resolver preferred **locality over locale**, a rule added earlier so `pause()` would work
(Chromium cannot pause network voices). That rule was too broad: with `en-IN` present it
still chose a local `en-US`, so an Indian heritage archive would read English in an American
voice even when the browser had an Indian one.

Now, in order:
1. **The Indian variant wins outright** (`en-IN` over `en-US`, even a local one).
2. **Otherwise locality wins over tag order** — a local `en-US` still beats a network `en-GB`,
   preserving working pause/resume where no Indian variant exists.
3. Locality breaks ties inside each group; `Google` still beats `Microsoft` at equal rank.

Sanskrit still resolves to `null` against a Hindi voice, and `sa` still cannot match `sat`
(Santali). Locked in by 8 new assertions.

### Narration priority — confirmed working, not a regression

The fallback chain was reported as removed by the UI refinement pass. It was not: `library.js`,
`narration.js`, `build_narration_manifest.js` and `audio/` were **untouched** by that pass
(`git diff` clean), which changed only fonts, stylesheet links and 9 `aria-label`s in
`library.html`. Verified live:

```
recorded asset exists?  ── yes ──▶  play the recording   (Gita English → en.wav, 0 TTS calls)
        │
        no
        ▼
usable voice + text?    ── yes ──▶  Web Speech            (Hindi → Google हिन्दी, hi-IN)
        │
        no
        ▼
honest unavailable state                                  (Sanskrit → "no voice installed")
```

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
- [x] **Honest freshness disclosure** — every panel states "Last checked `LAST_VERIFIED`"
- [x] Festival → map travel route (see §5)

### Official booking audit — ✅ COMPLETE & VERIFIED (2026-08-23)

Antara does not sell tickets and never will: it is a discovery and planning platform that
hands visitors off to the authority that actually sells entry. **No Razorpay, no payment
processing, no ticket inventory, no booking database, no refunds, no payment credentials.**

All 40 sites were audited. Every booking URL was resolved in a real browser and checked
against three tests: does it resolve, does it belong to the right authority, and is it about
*this* site. The audit is enforced by `validate_visit.js` (22 assertions, in `npm test`);
live reachability is a separate opt-in run, `npm run test:links`.

**Result: 24 sites with a verified official booking link, 16 showing visitor information.**

| | Count |
|---|---|
| Verified official booking portal | **24** |
| No portal — honest visitor-information panel | **16** |
| Flagged for manual re-verification | **6** |
| Booking links that were broken, generic or wrong before this pass | **19** |

#### Sites with a verified official booking link (24)
- **ASI online ticketing (18)** — `https://asi.paygov.org.in/asi-webapp/#/ticketbooking`,
  the portal ASI publishes on `asi.nic.in`. Each of these 18 was confirmed present in ASI's
  own live ticketed-monument API (`/asi/api/v7/monuments`), not assumed:
  Taj Mahal, Qutub Minar, Humayun's Tomb, Red Fort, Ajanta Caves, Konark Sun Temple,
  Fatehpur Sikri, Agra Fort, Rani ki Vav, Modhera Sun Temple, Khajuraho, Sanchi,
  Gwalior Fort, Charminar, Nalanda, Mattancherry Palace, Rang Ghar, Sirpur.
- **Rajasthan OBMS (2)** — per-monument pages on `obms-tourist.rajasthan.gov.in`
  (Amber Fort, Hawa Mahal). Confirmed site-specific with a control test: a bogus slug
  returns a generic page, the real ones return the monument.
- **Mysore Palace Board (1)** — `mysorepalace.karnataka.gov.in/book-tickets.php`
- **Victoria Memorial Hall (1)** — `victoriamemorial-cal.org/buy-tickets-online/`
- **Tamil Nadu HR&CE (1)** — Meenakshi Temple's own ticketing route (temple id 31962)
- **Uttarakhand Tourism (1)** — Kedarnath, `registrationandtouristcare.uk.gov.in`. This is
  mandatory free Char Dham registration, not a ticket, so the button reads
  "Register for Your Visit" rather than "Book Official Tickets".

#### Sites with no online booking — visitor information instead (16)
Free entry, no ticket exists: India Gate, Gateway of India, Brihadeeswara, Golden Temple,
Jallianwala Bagh, Basilica of Bom Jesus, Mahabodhi, Hadimba, Danteshwari, Bhoramdeo.
Tickets sold at the gate only: Golconda Fort, Shalimar Bagh, Kamakhya, Padmanabhaswamy,
Mahant Ghasidas Museum, Darjeeling Himalayan Railway.

Each renders a "Visiting this site" panel stating what a visitor actually has to do, plus a
labelled link to the responsible authority. **No site renders a booking button that leads
nowhere.**

#### Broken / wrong links this pass removed (19)
- 🔴 `artandculture.rajasthan.gov.in` (Amber Fort, Hawa Mahal) — **dead host, and `http://`**
- 🔴 `mahabodhi.org` (Mahabodhi Temple) — **wrong entity**; it is the Mahabodhi Society and
  redirects to a Chinese-language page, not the Bodh Gaya Temple Management Committee
- 🔴 `goldentempleamritsar.org` — an unofficial guide site, not SGPC
- 🔴 `irctc.co.in` (Darjeeling Railway) — generic homepage; unreachable in both Node and Chrome
- 🟠 `asi.nic.in` used as a *booking* link on Mattancherry Palace and Bom Jesus — that is ASI's
  homepage, not a booking portal
- 🟠 `amritsar.nic.in`, `jktdc.co.in`, `himachaltourism.gov.in`, `spst.in`,
  `kamakhyatemple.org`, `badrinath-kedarnath.gov.in` — real sites, but homepages or the wrong
  service standing in as booking portals; demoted to authority links
- 🟠 `asi.payumoney.com` ×13 — worked, but redirects to a private vendor domain
  (`eticket.webfront.in`). Replaced with ASI's own government-domain portal.
- 🟢 Two sites gained booking links they should always have had: **Meenakshi Temple** and
  **Sirpur** (both confirmed ticketed by their authority).

#### Data model
No new schema. The existing `plan` block was extended rather than replaced:
`bookingUrl`, `bookingProvider`, `bookingKind`, `bookingVerified`, `authorityUrl`,
`authorityLabel`, `ticketNote`, `needsVerification`.

#### Verified in a real browser, not asserted
All 40 sites driven through the live map at 1440px and 390px: booking button present exactly
where the dataset says, correct `href`, `target="_blank"` and `rel="noopener noreferrer"` on
every external link, no `href="undefined"`, no horizontal overflow, **0 console errors,
0 exceptions, 0 4xx/5xx**.

### Needs manual re-verification (6)
These render honest visitor information today; none of them shows a booking button on a guess.
- 🟠 **Golconda Fort** — ASI protects it but it is absent from ASI's live online monument list.
      Confirm whether counter sale is genuinely the only channel.
- 🟠 **Rang Ghar** — matched to ASI's "Ranghar Ruins" (Guwahati circle). Confirm this is the
      Sivasagar pavilion.
- 🟠 **Sirpur** — matched to ASI's "Temple of Laxman and Old sites including sculptures Sirpur"
      (Raipur circle). Confirm it covers the whole complex.
- 🟠 **Padmanabhaswamy** — the trust site is a JavaScript app whose routes all return the same
      shell, so no entry-ticket flow could be confirmed. It offers pooja booking, not entry.
- 🟠 **Kamakhya** — `kamakhyatemple.org` calls itself an "Official Visitor Guide" but could not
      be tied to the Kamakhya Debutter Board. Not used.
- 🟠 **Shalimar Bagh** — no official online garden-entry portal found.

### Not Started
- [ ] In-app booking flow — **deliberately out of scope, permanently**
- [ ] Payment integration — **no Razorpay code, no payment routes, no order/refund logic
      anywhere in the repository**
- [ ] Confirmation flow, tickets, or itineraries
- [ ] Multi-site trip planning

### Blocked / Needs Verification
- 🟠 `LAST_VERIFIED` is a single global constant, so fee/hours accuracy is asserted per-build,
      not per-site. **Fees, hours and durations were not re-checked in this pass** — the audit
      covered booking and authority links only.
- 🟠 Three government hosts (`obms-tourist.rajasthan.gov.in` ×2, `himachaltourism.gov.in`) ship
      an incomplete TLS chain and, in the Rajasthan case, a malformed HTTP header. Chrome
      renders them; strict clients such as Node's `fetch` reject them. `npm run test:links`
      reports these as WARN, not failures.
- 🟠 Broken links found in `sources` (out of scope, not changed):
      `delhitourism.gov.in/.../india_gate.jsp` returns **404**, and
      `tourism.rajasthan.gov.in/amber-fort.html` is a **soft-404** (redirects to a
      "Page Not Found" page served as HTTP 200).

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
      registered ahead of the static middleware.
      ⚠️ *This claim was previously over-stated:* it covered only that one path. The same file
      was still downloadable at `/landing-page/data/contact_messages.json`. **Closed 2026-08-24
      — see §8b.**
- [x] Rate limiting — **5 per 10 min per IP confirmed live**: 4× `200` then `429`
- [x] Admin access — `GET /api/contact/messages`, `PATCH /api/contact/messages/:id`
- [x] **XSS fixed** — the admin inbox renders attacker-controlled fields as text nodes, never
      via `innerHTML`


### 8b. Admin contact inbox — access restored + PII leak closed (2026-08-24)

**Reported:** the admin panel could not be reached. Investigating it uncovered a second,
more serious problem that had nothing to do with the reported symptom.

#### The existing implementation (nothing new was built)
| Piece | Location |
|---|---|
| Admin route | **`/admin/messages/`** — `landing-page/admin/messages/index.html` |
| Sign-in page | **`/admin-login.html`** |
| Auth | Signed **httpOnly** cookie (`antara_admin`), HMAC-SHA256, 8-hour TTL, `timingSafeEqual` |
| Middleware | `landing-page/middleware/adminAuth.js` — `requireAdmin` |
| Endpoints | `POST /api/admin/login`, `POST /api/admin/logout`, `GET /api/contact/messages`, `PATCH /api/contact/messages/:id` |
| Storage | `landing-page/data/contact_messages.json` (gitignored, untracked, purged from history) |

#### Issue 1 — why the panel was unreachable (configuration, not a bug)
`ADMIN_PASSWORD` was **absent from `landing-page/.env`**, which held only the two OpenAI
variables. `isConfigured()` therefore returned false and **every** admin path answered
**`503 ADMIN_DISABLED`** — including `POST /api/admin/login`, so signing in was impossible.
Reproduced directly:

```
GET  /admin/messages/       -> 503 ADMIN_DISABLED
GET  /admin/                -> 503 ADMIN_DISABLED
GET  /api/contact/messages  -> 503 ADMIN_DISABLED
POST /api/admin/login       -> 503 ADMIN_DISABLED
```

This is the designed fail-closed behaviour — no default credential — working correctly.
**Fix:** set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` in the gitignored `.env`.
Authentication was **not** bypassed, weakened or removed.

#### Issue 2 — 🔴 CRITICAL: contact PII was publicly downloadable
`landing-page/` is a child of the repository root, and the repo-root static mount served
every file in it a **second time** under the `/landing-page/` prefix — a path the `/admin`
and `/data` guards never saw. Publicly readable without any authentication:

| Path | Was | Now |
|---|---|---|
| `/landing-page/data/contact_messages.json` | **200 — 8 real submissions with name, e-mail, subject, message** | **404** |
| `/landing-page/admin/messages/index.html` | 200 (admin shell) | **404** |
| `/landing-page/admin-login.html` | 200 | **404** |
| `/landing-page/middleware/adminAuth.js` | 200 (auth source) | **404** |
| `/landing-page/server.js` | 200 (server source) | **404** |
| `/landing-page/package.json`, `node_modules/**` | 200 | **404** |

**Fix:** an allow-list guard mounted on `/landing-page` **before** the repo-root static
mount. Only `index.html`, `css/`, `js/` and `assets/` pass; everything else is 404, with
`..` traversal and malformed percent-escapes rejected. The landing page still serves at both
`/` and `/landing-page/index.html`.

#### Issue 3 — the footer admin link pointed at the unguarded copy
`<a href="admin/messages/">` is relative: from `/landing-page/index.html` it resolved to
`/landing-page/admin/messages/`, the **unprotected** copy. Now root-relative
`/admin/messages/`, so it always reaches the session-guarded mount.

#### How to open the inbox locally
1. Put a value in `ADMIN_PASSWORD` in `landing-page/.env` (see `.env.example`).
2. `cd landing-page && npm run dev`
3. Open **`http://localhost:8080/admin/messages/`** — you are redirected to
   `/admin-login.html`, sign in, and land back on the inbox.
   The landing-page footer also carries a discreet **Admin** link.

#### Verified
- **33/33** live flow checks: unauthenticated 401 · browser redirect to sign-in · wrong
  password 401 `INVALID_PASSWORD` · correct password signs in · cookie httpOnly + SameSite=Strict
  · 8 messages listed newest-first with name/email/subject/message/date/status · status change
  persists to disk · invalid status 400 · unknown id 404 · a new form submission appears in the
  inbox · logout clears the session · a forged cookie is refused · all 9 leak paths now 404.
- **Browser at 1440px and 390px:** redirect → sign-in → inbox → open message → detail shows
  name, e-mail, date, status, subject, body, with *Reply via Email* / *Mark as Read* /
  *Mark as Replied* / *Archive*. **0 console errors**; the password never appears in the DOM.
- **`validate_server.js` — 43 new assertions** locking the guard's position and allow-list
  contents, the auth invariants, and that no credential reaches any client file.
- QA probe message removed afterwards; **the 8 genuine messages are intact**.

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

**Latest verified run: 2026-08-24 — `npm test` → 319 assertions, 0 failures, exit 0.**

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
- [x] `validate_visit.js` — **22 assertions**: booking URLs are https on an official host,
      carry a provider and a verification date, are never a bare homepage standing in for a
      booking page and never reused across sites unless the portal genuinely is multi-site;
      every site without a portal explains why; the rendered CTA, its disclosure text and
      `rel="noopener noreferrer"` on every external anchor. Live reachability is deliberately
      excluded so a government server having a bad morning cannot fail the build — run it on
      demand with `npm run test:links`
- [x] `validate_visual_india.js` — **57 assertions**: the line-art generator and its toggle
      stay deleted, inline icons keep a default size, Look Closer requires its detail
      photograph; states/counts/slugs/images/links are all derived (proved by rebuilding the
      model with a synthetic extra site and with a brand-new state); no photograph is shared
      between sites; every referenced file exists on disk; the representative-image rule is
      deterministic across rebuilds; heritage status is never inflated into a UNESCO listing;
      and both navigation directions resolve
- [x] Browser verification, Visual India — index plus **6 state galleries** at **1440 / 1024 /
      390px**, and a **followed-link round-trip across 8 states and 8 heritage sites**
      (state → Explore Site → site page → Explore more from → state → Explore on Map →
      focused map). Lightbox open/←→/Escape at each width. **0 console errors, 0 exceptions,
      0 HTTP 4xx, 0 failed images**
- [x] `validate_narration.js` — **155 assertions**: scope resolution, voice resolution and
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

## 12b. UI / UX Refinement Pass — ✅ COMPLETE & VERIFIED (2026-08-23)

A polish pass over the finished product. No new features, no architecture changes, no
heritage data touched.

### What the audit found

Antara had grown as four independent front ends, and each had invented its own identity.
Measured in the browser across 7 views × 2 themes × 4 widths:

| | Before | After |
|---|---|---|
| Dark grounds in use | **4** (`#0A0A0A`, `#111111`, `#070509`, violet-black) | **1** |
| Golds in use | **4** (`#C9A86A`, `#C49F74`, `#d4af37`, `#dfb743`) | **1** |
| Typefaces in use | **8** | **5**, each with a reason |
| Pages honouring the theme toggle | **4 of 5** | **5 of 5** |
| Text failing WCAG AA | **~46 distinct combinations** | **0** |
| Horizontal overflow | 91px on landing @390px | **0 everywhere** |

### Shared token layer
- [x] **`antara-tokens.css`** — one palette, one type system, one shape and motion scale,
      for both themes. Each page's stylesheet keeps its own variable names and **all** of
      its layout rules; it simply points those names at the shared tokens, so nothing was
      rewritten and everything now agrees.
- [x] Wired into all five pages: landing, map, Visual India, library, festivals

### Typography
- [x] **Display: Playfair Display** across landing, map, Visual India and festivals.
      Lora, Cormorant Garamond and Marcellus removed.
- [x] **Interface: Inter** everywhere, including the library. Montserrat removed.
- [x] **The archive keeps its reading voice** — Cinzel for manuscript titles, Crimson Pro
      for scripture, **Noto Serif Devanagari for Sanskrit**, all verified still rendering.

### Genuine bugs fixed
- [x] **The theme did not follow the user.** The landing page stored its choice under
      `theme` while every other page used `antara_theme`, so choosing light on the map and
      navigating home landed you back in the dark. One key now, with a migration for an
      existing choice, plus a blocking head script so the theme paints before first render
      instead of flashing.
- [x] **Landing page overflowed 91px at 390px** — `.footer-links` and `.map-controls` did
      not wrap. Now 0px at all four widths.
- [x] **The site guide left the map exposed behind it.** Opening a heritage site now marks
      the map `inert` + `aria-hidden`, so a screen reader meets one page heading instead of
      two and Tab cannot wander onto markers hidden under the overlay. Verified: 1 exposed
      `h1` with a site open, cleanly restored on close.
- [x] **14 festival carousel images had no `alt` attribute at all** — they now carry real
      festival names, and the ambient carousel is hidden from assistive tech rather than
      announcing 14 names nobody can control.
- [x] **9 Dhyana volume sliders were unlabelled** — each now names its own track.
- [x] **A mojibake ellipsis** (`statesΓÇª`) in the map's search placeholder, live since the
      original screenshot report.
- [x] **A dead nav item** — the map's "About" only fired a toast; replaced with links to
      Visual India and the Archive.

### Contrast — WCAG AA met on every page, both themes
The muted-ink token measured **4.18:1 in dark and 3.12:1 in light** and was used for small
text across the whole product; the site footer's provenance line used a *border* tint as
text at **2.0:1**. Because the tokens are now shared, three values fixed it everywhere.
Re-measured on rendered pixels: **0 failures across all 7 views in both themes.**

### Buttons and navigation
- [x] One primary action — solid gold, `--antara-radius-md`, same rhythm on every page.
      The landing page had a cream near-square primary while the map had a gold pill.
- [x] Filter chips share one shape across landing and map (they were 0px/27px vs 20px/36px)
- [x] **Visual India was unreachable** from the landing page and the map. Now in both navs,
      desktop and mobile, with an active state on its own page.

### Verified, not asserted
`npm test` → **211 assertions, exit 0**. Browser: 7 views × 2 themes × 4 widths
(390 / 768 / 1024 / 1440), plus all 40 site pages, 6 state galleries and an 8-state
navigation round-trip. **0 console errors, 0 exceptions, 0 HTTP 4xx, 0 broken assets,
0 horizontal overflow, 0 dead CTAs, 0 contrast failures.**

### Not addressed this pass
- 🔴 **Mobile tap targets** — 53 on the map, 50 on a site page, 9 on the landing page still
      measure under 24px at 390px. Fixing these means re-spacing the map controls, which is
      more than a polish change.
- 🔴 **No skip-to-content link** on any page.
- 🟠 The library's 31 pill-shaped controls are chips, toggles and badges — internally
      consistent and appropriate, so left alone.
- 🟠 The landing page footer still exposes an **Admin** link publicly.

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

## 13b. FINAL RELEASE CANDIDATE QA — 2026-08-24

Run against a **completely fresh clone** of `fix/core-narration-stabilization` at
`4ccb390`, in a new directory, with no reuse of the development tree's
`node_modules`, generated assets, cache or environment.

### Fresh clone
- [x] `git clone --branch fix/core-narration-stabilization` → clean, HEAD `4ccb390`
- [x] `cd landing-page && npm install` → **71 packages, 0 vulnerabilities**
- [x] Repository root genuinely has **no npm dependencies**, as documented
- [x] `cp landing-page/.env.example landing-page/.env` → the documented setup path works

### Startup — the documented command
- [x] `cd landing-page && npm start` → **`Antara server running on http://localhost:8080`**
- [x] **No startup exceptions, no missing dependencies, no missing assets**
- [x] **25/25 routes and assets return HTTP 200** — all four front ends, every shared
      script and stylesheet, the narration manifest, the festivals database
- [x] Admin area correctly **disabled** because `ADMIN_PASSWORD` is unset (no default password)
- [x] Without `OPENAI_API_KEY` the server still starts and `/api/chat` answers **503
      `AI_UNCONFIGURED`** with a readable message — no crash, no stack trace

### Test suite
**`npm test` → 232 assertions, exit 0** from the clean clone
(narration 111 · media 42 · visit 22 · Visual India 57).

### Complete user journey — 24/24 steps
Landing → Explore → Map → heritage site → inspect → Visual India → state → site →
Library → manuscript → narration → Festivals → Plan Your Visit → official booking →
Heritage AI → Contact → home. Every transition followed a link the page actually
renders. **0 console errors, 0 exceptions, 0 HTTP 4xx across the whole journey.**

### Environment — only what is actually used
| Variable | Used? | Notes |
|---|---|---|
| `OPENAI_API_KEY` | ✅ | Heritage AI. Unset ⇒ feature disabled, app still runs |
| `OPENAI_MODEL` | ✅ | Defaults to `gpt-4o` |
| `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `PORT`, `ALLOWED_ORIGINS` | ✅ | Optional |
| `GEMINI_API_KEY`, `GEMINI_MODEL` | ❌ **not used** | Belonged to the **retired Telegram bot**; removed with it. Only a historical note in `CLAUDE.md` mentions them |
| `CONTACT_EMAIL` | ❌ **not used** | No reference anywhere in the codebase |

`.env.example` lists exactly the six variables the application reads. **No unused
variable is required.**

### Heritage AI — real round trip verified
- [x] Browser → server → OpenAI → server → browser, **HTTP 200** with a genuine
      on-topic answer (*"The Taj Mahal is a magnificent 17th-century mausoleum in Agra…"*)
- [x] Empty question → **HTTP 400 `MESSAGE_REQUIRED`**, *"Please enter a question."* — no stack trace
- [x] Over-length question → `MESSAGE_TOO_LONG` guard present
- [x] **API key never reaches the browser** — absent from the DOM and from inline scripts
- [x] Panel opens and fits at 1440px (380px panel) and 390px (full width), **0 overflow**

### Narration — unchanged from the approved baseline
- [x] Recording wins where one exists (Gita English → `en.wav`, **0 TTS calls**)
- [x] No recording → **Web Speech** (Hindi → `Google हिन्दी`, hi-IN; Rigveda English →
      `Microsoft David`, local)
- [x] **English and Hindi** are the only usable languages on this browser (22 voices, 14 prefixes)
- [x] **10 catalogued languages honestly unavailable** — Sanskrit, Tamil, Telugu, Gujarati,
      Marathi, Bengali, Kannada, Malayalam, Punjabi, Odia all show *"no voice installed"*
- [x] Sanskrit never borrows a Hindi voice

### Official booking
- [x] **24 verified official links**; all `https`, `target="_blank"`, `rel="noopener noreferrer"`
- [x] **0 undefined/null URLs**; 16 sites show honest visitor information instead
- [x] Live reachability: **25/28 PASS**, 3 WARN (Rajasthan OBMS ×2, Himachal Tourism) — the
      known incomplete-TLS-chain hosts that Chrome renders and Node rejects
- [x] The **6 manually flagged links were not changed**

### Visual India
- [x] **20 states, 40 sites, 197 images**; per-state counts match the dataset exactly
- [x] Representative imagery on 20/20 states; lightbox opens/steps/closes
- [x] "Explore Site", "Explore on Map" and site → state navigation all resolve

### Responsive — 56 view/theme/width combinations
7 views × 2 themes × 390/768/1024/1440: **0 horizontal overflow, 0 console errors,
0 exceptions, 0 HTTP 4xx, 0 images missing `alt`.**

### Accessibility
- [x] **WCAG AA contrast on all 14 page/theme combinations**
- [x] **Visible keyboard focus on 58/60** sampled controls under real Tab presses
- [x] Lightbox: `role="dialog"`, `aria-modal="true"`, focus enters, Escape closes,
      **focus returns to the trigger**
- [x] Map overlay **inert** while a site is open; exactly **1 exposed `<h1>`** on every page
- [x] Audio controls: 9 controls, **0 unlabelled**, `aria-live` status, all keyboard reachable
- 🔴 **No skip-to-content link on any page**
- 🔴 **Mobile tap targets under 24px at 390px**: map 53, site 50, landing 9, vi-state 7,
      Visual India 4, library 1, festivals 0

### Data / security
- [x] **No `.env` tracked** — only `.env.example`; `.gitignore` covers `.env` / `.env.*`
      with an `!.env.example` exception, and the `.env` created during QA was correctly ignored
- [x] **No `contact_messages.json`** — only an empty `[]` example template
- [x] **No live secret patterns** in any tracked file
- [x] **No absolute filesystem paths** leaked into tracked source
- [x] **No Telegram code or references** remain
- [x] No screenshots, temp files, logs or `node_modules` tracked

### Release blockers

| Issue | Severity | Release blocker? | Reason |
|---|---|---|---|
| No skip-to-content link | Medium | **No** | Keyboard users can still reach every control; focus is visible throughout. An accessibility improvement, not a broken journey |
| Mobile tap targets under 24px | Medium | **No** | Verified functional at 390px — the full journey completes on mobile. Uncomfortable, not blocking |
| No production narration recordings | Medium | **No** | Web Speech fallback works for English and Hindi; unsupported languages state so honestly |
| Sanskrit narration unavailable | Medium | **No** | No browser ships a Sanskrit voice. The player refuses rather than substituting Hindi — correct behaviour |
| Network voices cannot pause | Low | **No** | Chromium limitation, detected and converted to an honest stop. Recorded audio pauses normally |
| 3 sites with only 2 photographs | Low | **No** | Known content limitation; source material is genuinely scarce |
| 14 legacy heroes without provenance | Low | **No** | They display correctly; provenance is unverifiable, not wrong |
| 6 booking links needing manual verification | Low | **No** | All 6 show **visitor information**, not a booking button. Nothing misleads a visitor |
| 3 booking hosts unreachable from Node | Low | **No** | Incomplete TLS chains on government servers; Chrome renders them. Verified in-browser |
| Stray empty `f.id` tracked | Low | **No** | 0 bytes, referenced nowhere |
| `WORKFLOW.md` / `TECHSTACK.md` stale on the retired bot | Low | **No** | Documentation only; no code depends on it |
| Contact storage is an unlocked flat file | Medium | **No** | Works for the current release; will not survive an ephemeral filesystem. Deployment concern, flagged |

**No release blockers were found.**

---

## 14. Known Issues

| Issue | Severity | Status | Notes |
|---|---|---|---|
| Landing page overflows horizontally at 390px | **High** | ✅ FIXED 2026-08-23 | Root cause was `.footer-links` / `.map-controls` not wrapping. Now **0px at 390 / 768 / 1024 / 1440**, both themes |
| No production narration audio exists | **High** | 🟡 OPEN | Only two placeholder fixtures. Everything else audible is a browser voice, so narration is **not identical across machines** — accepted for this release |
| 3 sites still have only 1–2 supporting images | Low | 🟡 OPEN | Padmanabhaswamy, Golconda Fort, Bhoramdeo — their Commons categories hold too few usable files. A source-material limit |
| 14 site heroes use opaque `imgi_*` filenames | Medium | 🟠 OPEN | They display and now sit alongside properly sourced supporting imagery, but the hero's own provenance is unverifiable |
| Pre-existing `photos sites/` is 31 MB, files up to 1.4 MB | Medium | 🟠 OPEN | The 137 new images are WebP at ~222 KB; the older JPEGs still need re-encoding |
| Sanskrit cannot be narrated at all | **High** | 🔴 OPEN | No mainstream browser ships a Sanskrit voice. The player refuses rather than substituting Hindi. Only a recording unblocks it |
| Network voices cannot pause mid-sentence | Medium | 🟠 OPEN | **Chromium limitation, not an Antara bug** — `speechSynthesis.pause()` has no effect on a remote voice. A failed pause is detected within 250ms and converted to an honest stop (*“this browser voice cannot pause mid-sentence…”*) rather than a dead button. Local voices are preferred wherever no Indian variant exists. **Hindi has only a network voice (`Google हिन्दी`) on this machine**, so Hindi TTS cannot pause here. Pause/resume on **recorded** audio is unaffected and verified working |
| Web Speech tested in Chrome only | Medium | 🟠 OPEN | Firefox, Safari and Android expose different voice sets and were not exercised |
| `WORKFLOW.md` / `TECHSTACK.md` describe the retired Telegram bot | Medium | 🔴 OPEN | 9 stale references total. Flagged in CLAUDE.md but content not rewritten |
| Pre-rewrite commits still fetchable from GitHub by SHA | Medium | 🟠 OPEN | Inherent to GitHub until GC. Needs Support or repo recreation |
| Collaborators must re-clone after history rewrite | Medium | 🟠 OPEN | `axmitk` pushes directly to `main`. Merging an old clone reintroduces purged blobs |
| 53 tap targets under 24px on the map at 390px | Medium | 🔴 OPEN | Unchanged this pass: 53 on the map, 50 on a site page, 9 on the landing page. Functional but uncomfortable on touch |
| No skip links | Medium | 🔴 OPEN | No page offers skip-to-content. Not addressed this pass |
| Sparse `alt` text | Low | ✅ FIXED 2026-08-23 | The 14 festival carousel images had **no `alt` attribute at all**; they now carry real names and the ambient carousel is `aria-hidden`. 0 images product-wide lack `alt` |
| Contact storage is an unlocked flat file | Medium | 🟡 OPEN | Concurrent writes can interleave; will not survive an ephemeral filesystem |
| `landing-page` test script is a stub | Medium | 🔴 OPEN | `echo "No tests..." && exit 0` — backend has no automated coverage |
| Heritage AI is stateless per request | Low | 🟡 OPEN | No multi-turn context; model cannot follow up on its own answer |
| Narration fixtures are WAV, not MP3 | Low | 🟡 OPEN | 1.7 MB in-tree. No encoder on the dev machine; `mimeType` already data-driven |
| Projection constants duplicated in three files | Low | 🟠 OPEN | `gen.py`, `map-data.js`, `app.js` agree today; nothing enforces it |
| Stray file: empty `f.id` | Low | 🔴 OPEN | 0 bytes and referenced nowhere |
| No sitemap; OG tags only on the landing page | Low | 🔴 OPEN | `robots.txt` notes a Sitemap line is needed once a domain exists |
| UI refinement uncommitted | Low | 🟡 OPEN | Working tree carries the refinement pass on `fix/core-narration-stabilization`; not committed by request |

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
| 2026-08-23 | **Re-verified the narration fallback chain end-to-end in headed Chrome 151** after a reported regression. `narration.js`, `library.js`, `build_narration_manifest.js` and `audio/` were untouched by the UI pass; recorded→TTS→unavailable all working. **Not a regression** | ✅ Verified |
| 2026-08-23 | **Refined voice ranking: the Indian variant now wins outright** (`en-IN` over even a local `en-US`); locality still beats tag order below that, so a local `en-US` beats a network `en-GB` and pause keeps working | ✅ Fixed |
| 2026-08-23 | **Added Punjabi (`pa`) and Odia (`or`) to the language catalogue** — they were absent, so a browser shipping `pa-IN`/`or-IN` could never be offered them. Catalogue is now 12 languages | ✅ Fixed |
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
- [x] **Tests passing** — 319 assertions, exit 0, 2026-08-24
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
