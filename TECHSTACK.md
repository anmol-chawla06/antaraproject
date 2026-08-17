# Tech Stack Documentation ✦ तकनीकी विनिर्देश

This document provides a detailed breakdown of the technological architecture, data schema, and browser-native APIs that power the Antara Heritage Library.

---

## ◈ Frontend Architecture

The application is engineered as a lightweight, high-performance static web application, prioritizing instant load times, offline capability, and zero backend maintenance.

### 1. Structure (HTML5)
- Semantic HTML5 structure utilizing `<header>`, `<main>`, `<aside>`, `<section>`, and `<article>` tags for clear readability and layout segmentation.
- Distinct component IDs for all search inputs, visualizer canvas, selection elements, and audio bars to allow robust programmatic control.

### 2. Styling & Design System (Vanilla CSS3)
- Fully customized design system based on modern CSS Custom Properties (CSS variables) for design tokens (margins, padding, colors, font families).
- Dual-theme system persisting user preferences across reloads:
  - **Midnight Dark Theme**: Charcoal obsidian background (`#070509`) accented with metallic gold (`#D4AF37`).
  - **Heritage Cream Light Theme**: Creamy parchment background (`#FDFBF7`) accented with deep sepia and antique gold.
- Precision typography loading:
  - `Cinzel` & `Marcellus` for header branding and epigraphs.
  - `Noto Serif Devanagari` & `Tiro Devanagari Sanskrit` for Devanagari script layout.
  - `Crimson Pro` & `EB Garamond` for body translations.

### 3. Logic & State Management (Vanilla ES6+)
- Built entirely on Vanilla JavaScript without bulky external frameworks (e.g. React or Vue), keeping the script bundle under 60KB.
- Modular, state-driven model leveraging an `AppState` object:
  ```javascript
  const AppState = {
    database: null,
    activeBookId: 'bhagavad_gita',
    activeChapterId: 'bg_ch_02',
    activeVerseId: '',
    sanskritScale: 1.0,
    theme: 'dark',
    langPreference: 'dual',
    visibleLayers: {
      devanagari: true,
      iast: true,
      anvaya: true,
      english: true,
      hindi: true,
      commentary: true
    },
    bookmarks: [],
    audio: {
      isPlaying: false,
      isPaused: false,
      mode: 'synth',
      playbackRate: 1.0,
      volume: 0.9,
      loopMode: 1,
      currentLoopCount: 0,
      queue: [],
      voiceEngine: 'sa_hi'
    }
  };
  ```

---

## ◈ Data Architecture & Schema

All scriptural text is structured into a hierarchical layout matching the tree hierarchy of the sidebar: `Category` -> `Book` -> `Chapter` -> `Verse`.

### 1. Compiled Scriptural JSON Schema
The `texts_database.json` and matching `window.ANTARA_HERITAGE_DB` JavaScript structure uses the following schema definitions:

#### Category Schema:
```json
{
  "id": "vedas_upanishads",
  "name": "Vedas & Upanishads",
  "sanskrit_name": "वेद एवं उपनिषद"
}
```

#### Book Schema:
```json
{
  "id": "bhagavad_gita",
  "category_id": "epics_itihasa",
  "category": "Epics & Itihasa",
  "title": "Bhagavad Gita",
  "sanskrit_title": "भगवद्गीता",
  "transliteration": "Bhagavadgītā",
  "author": "Maharshi Vyasa",
  "tradition": "Smriti / Mahabharata Bhishma Parva",
  "era": "c. 500-200 BCE",
  "description": "The song of the Divine...",
  "epigraph": "ॐ पार्थाय प्रतिबोधितां...",
  "epigraph_translation": "OM. O Bhagavad Gita...",
  "chapters": []
}
```

#### Chapter Schema:
```json
{
  "id": "bg_ch_02",
  "chapter_number": 2,
  "title": "Sankhya Yoga: The Yoga of Knowledge",
  "sanskrit_title": "साङ्ख्ययोगः",
  "transliteration": "Sāṅkhyayogaḥ",
  "summary": "Arjuna surrenders to Sri Krishna...",
  "verses": []
}
```

#### Verse Schema:
```json
{
  "id": "bg_2_47",
  "verse_number": "2.47",
  "citation": "Bhagavad Gita 2.47",
  "meter": "Anuṣṭubh",
  "sanskrit": "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
  "transliteration": "karmaṇy-evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi ||",
  "word_meanings": [
    {
      "sanskrit": "कर्मणि",
      "iast": "karmaṇi",
      "meaning": "in action / duty"
    },
    {
      "sanskrit": "एव",
      "iast": "eva",
      "meaning": "only / indeed"
    }
  ],
  "english": "You have a right to perform your prescribed duty...",
  "hindi": "तुम्हारा अधिकार केवल कर्म करने पर है...",
  "commentary": "This verse represents the quintessential core of Karma Yoga...",
  "audio": "audio/bg_2_47.mp3"
}
```

---

## ◈ Browser APIs Utilized

### 1. Web Speech API (SpeechSynthesis)
Used for the browser-native audiobook recitation engine.
- Interfaces: `SpeechSynthesis`, `SpeechSynthesisUtterance`, `SpeechSynthesisVoice`.
- Events: `voiceschanged` event used to refresh the local voice lists cache dynamically.

### 2. Web Audio API
Powering the visualizer and Tanpura synthesizer.
- Interfaces: `AudioContext`, `OscillatorNode`, `GainNode`, `AnalyserNode`, `BiquadFilterNode`.
- Utilized to create a warm, drone background by combining multiple sine and sawtooth oscillators tuned to the C2/G2/C3 fundamental frequencies of a traditional Tanpura.

### 3. localStorage API
Ensures that the interface parameters are saved on the user's browser, preventing them from resetting on reload.
- Persisted variables:
  - `antara_theme`: Theme state ('dark' or 'light').
  - `antara_scale`: Sanskrit typography scale value.
  - `antara_lang`: Language layout ('dual', 'en', or 'hi').
  - `antara_bookmarks`: List of bookmarked verses.
  - `antara_layers`: Display visibility toggles for the interlinear layout.
