# Technical Stack Specification: Antara Platform

Antara is built with an intentionally lightweight, dependable architecture prioritizing zero-latency performance, robust offline capability, and high visual fidelity.

---

## 1. Frontend Layer

| Technology | Implementation & Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure, accessible DOM hierarchy, split-screen container layouts, and dynamic container mounting points. |
| **CSS3** | - **Design Tokens**: Custom CSS variables for deep charcoal palette (`#070509`), metallic gold gradients, and typography scales.<br>- **Layout**: Flexible CSS Grid for the 12-month calendar and Flexbox for responsive split-screen containers.<br>- **Glassmorphism**: `backdrop-filter: blur(16px)` layered with semi-transparent alpha channels.<br>- **Animations**: Hardware-accelerated CSS keyframe transitions and opacity crossfades. |
| **Vanilla JavaScript (ES6+)** | - Native asynchronous `fetch()` API for client-side dataset loading.<br>- Zero external frontend frameworks (no React, Vue, or Angular overhead).<br>- Dynamic DOM hydration and event delegation for temporal node selection and multi-event pickers.<br>- Carousel auto-rotation state machine using standard timers and CSS class swapping. |
| **Typography** | Google Fonts: `Cinzel` (display headings), `Cormorant Garamond` (body & narrative), and `Montserrat` (metadata and interactive buttons). |

---

## 2. Backend Layer

| Technology | Implementation & Purpose |
| :--- | :--- |
| **Runtime Environment** | **Node.js** (v18+ compatible, ES6+ / CommonJS module support). |
| **Bot Framework** | `node-telegram-bot-api` running in persistent long-polling mode (`{ polling: true }`). |
| **Process Model** | Self-contained, lightweight daemon handling deep-linked user requests without external web server overhead. |
| **Routing & Logic** | - Command interception for `/start <festival_id>`.<br>- Regex parsing to match dynamic incoming query parameters against local database keys.<br>- Inline keyboard generation for itinerary previews and simulated booking confirmations. |

---

## 3. Data Layer

| Component | Implementation & Purpose |
| :--- | :--- |
| **Storage Engine** | **Static JSON Document** (`festivals_database.json`). |
| **Schema Definition** | Structured objects containing: `id`, `name`, `state`, `month`, `all_months`, `timing`, `location`, `coordinates`, `history`, `culture_and_rituals`, `how_to_join`, `local_language`, `uniqueness`, `image_placeholder`, and `cuisine`. |
| **Reliability Strategy** | Synchronous parsing on backend initialization (`fs.readFileSync`) and standard HTTP JSON retrieval on frontend initialization. Guarantees 0ms external API roundtrips and complete immunity to third-party network outages. |

---

## 4. Asset Management & UI Design Tokens

- **Palette**:
  - Background Base: `#070509`
  - Elevated Container Base: `rgba(18, 13, 26, 0.7)`
  - Primary Accent: Gold Gradient (`linear-gradient(135deg, #fcf6ba, #bf953f)`)
  - Accent Muted: `#dfb743` / `#a39eb8`
- **Iconography**: Standardized Unicode geometric glyphs (`✦`, `◈`, `△`, `❖`) replacing informal emojis to ensure consistent, elegant platform styling across all operating systems.
