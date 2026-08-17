# Antara: Cultural Heritage & Temporal Exploration Platform

Antara is a professional-grade cultural heritage travel portal designed to showcase regional festivals, cultural traditions, and travel itineraries across India. Built with a high-performance split-screen temporal grid interface and zero external API dependencies, Antara enables seamless discovery and instant trip planning.

---

## Key Features

- **Temporal Grid Interface**: A clean 12-month calendar grid allowing travelers to explore cultural events organized chronologically with visual event markers (`✦`).
- **Dynamic Content & Imagery**: A synchronized detail panel rendering high-resolution regional imagery, historical overviews, cultural highlights, and culinary heritage.
- **Zero-Latency Static Data Architecture**: Powered by a robust local data layer (`festivals_database.json`), ensuring lightning-fast client-side updates and zero downtime during live demonstrations.
- **Integrated Telegram Travel Assistant**: One-click deep-link integration routing users directly into the Antara Telegram Bot (`@AntaraV1bot`) with specific festival context to generate customized travel itineraries and booking pathways.
- **High-Contrast Dark Aesthetics**: Polished dark charcoal backdrop (`#070509`) combined with metallic gold accents, frosted glass containers (`backdrop-filter: blur`), and clean serif typography.

---

## Project Structure

```
├── index.html                  # Core split-screen frontend interface
├── bot.js                      # Node.js Telegram bot backend
├── festivals_database.json     # Static database of cultural festivals and metadata
├── images/
│   ├── temple.png              # Background ambient architectural graphic
│   └── festivals/              # High-resolution regional festival imagery
├── package.json                # Project dependencies and metadata
├── README.md                   # Project overview & local setup guide
├── TECHSTACK.md                # Detailed technical stack specifications
└── WORKFLOW.md                 # System architecture and end-to-end data flow
```

---

## Local Setup & Running the Platform

### Prerequisites
- **Node.js**: v18+ (tested on Node.js v24+)
- **Web Browser**: Modern browser supporting ES6+ and CSS Grid/Flexbox
- **Python** (Optional, for local HTTP serving): Python 3.8+

---

### Step 1: Install Backend Dependencies

Navigate to the project root and install required packages:

```bash
npm install
```

*(Key dependency: `node-telegram-bot-api`)*

---

### Step 2: Launch the Telegram Travel Assistant

Start the local Node.js Telegram bot process:

```bash
node bot.js
```

The bot will initialize in polling mode and synchronously load `festivals_database.json`.

---

### Step 3: Launch the Frontend Interface

Serve the static web portal using any standard HTTP server:

#### Option A: Python HTTP Server (Recommended)
```bash
python -m http.server 8080
```

#### Option B: Node `http-server` / `npx serve`
```bash
npx serve -l 8080 .
```

---

### Step 4: Access the Application

Open your browser and navigate to:
```
http://localhost:8080/index.html
```

- Select any active month on the **Temporal Grid** (e.g., `JUN`, `AUG`, `OCT`).
- Review the festival details, cultural highlights, and regional imagery on the right panel.
- Click **◈ Plan a trip** to open the Telegram Bot with the preloaded destination parameters.

---

## License & Attribution
Designed and engineered for cultural tourism, heritage documentation, and rapid offline demonstrations.
