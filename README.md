# Antara Library ✦ अन्तरा ग्रन्थागार
> A Classical Archive of Vedic, Epical, Philosophical, and Scientific Sanskrit Literature

---

## ◈ Overview
Antara Library (अन्तरा ग्रन्थागार) is a scholarly digital library and interactive reader designed for preserving and studying classical Indian heritage texts. It provides a multi-layered, interlinear interface for reading foundational scriptures including the Bhagavad Gita, Rigveda Samhita, and Principal Upanishads. 

The project addresses the limitations of standard text archives by integrating Devanagari script, IAST transliteration, word-by-word grammatical breakdown (Anvaya), and multilingual translations (English and Hindi) alongside a browser-native meditative audio recitation player.

---

## ◈ Key Features

- **Multi-Layered Interlinear Reader**: Dynamic display controls allow readers to toggle individual layers (Devanagari, IAST Transliteration, Word-by-Word Anvaya, English Translation, Hindi Translation, and Philosophical Commentaries).
- **Stateless Live Search (Ctrl+K)**: Instant, real-time query scanning across Sanskrit text, transliteration, English/Hindi translations, citations, and titles, featuring matched-term highlighting.
- **Upgraded Speech Synthesis Audiobook Engine**: Meditative, pleasant cadence (custom pitch at 0.94 and rate at 0.82) matching native regional voices (`hi-IN` and `en-IN`) for natural scriptural recitation.
- **Asynchronous Voice Synchronization**: Automatic warm-up of browser speech synthesis voices with dynamic event binding to handle asynchronous API loading.
- **Active Navigation & Scrolling**: Seamless transition from search results or sidebar catalog tree nodes to scroll/highlight specific verses in the Main Reading Pane.
- **Vedic Tanpura Drone Visualizer**: Integrated low-frequency ambient Tanpura audio generator matching dynamic visualizer canvas waves.
- **Theme & Scale Persistence**: Persistent Midnight Dark and Heritage Cream Light themes with adjustable font scales stored locally in the browser.
- **Personalized Bookmarks**: Easy save/remove system for verses with dedicated sidebar panels.

---

## ◈ Directory Structure

```
anatarae/
├── data_builders/             # Python data modules
│   ├── classics.py            # Datasets for Ramayana, Yoga Sutras, etc.
│   ├── gita.py                # Bhagavad Gita granular dataset
│   ├── rigveda.py             # Rigveda Samhita granular dataset
│   └── upanishads.py          # Isha, Katha, Mundaka Upanishads
├── build_all.py               # Database compilation master script
├── validate_db.js             # Node verification script
├── texts_database.json        # Compiled JSON corpus database
├── texts_data.js              # Global Javascript data structure
├── app.js                     # Main application engine
├── style.css                  # Design system stylesheet
└── index.html                 # Main interface entrypoint
```

---

## ◈ Getting Started & Local Installation

### Prerequisites
Antara Library is built as a self-contained, serverless frontend application. It has zero external package dependencies for runtime execution.

### Local Installation
1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/username/antara-library.git
   cd antara-library
   ```

2. **Run Locally**:
   - Because the database is pre-compiled into a JavaScript file (`texts_data.js`) and bound directly to the global `window` object, the application **bypasses browser CORS restrictions** when opened via the `file://` protocol.
   - Simply double-click `index.html` to open it in any modern web browser.
   - Alternatively, serve it via any static web server:
     ```bash
     npx serve .
     # Or using Python
     python -m http.server 8000
     ```

---

## ◈ Database Compilation

If you wish to modify, add, or expand the scripture database:
1. Update the appropriate modules in the `data_builders/` directory.
2. Run the Python compiler script:
   ```bash
   python build_all.py
   ```
3. Run the verification script to ensure formatting is correct:
   ```bash
   node validate_db.js
   ```

---

## ◈ License
This project is dedicated to the preservation of public domain classical Indian heritage texts. All included translations and commentaries are open for non-commercial educational use.
