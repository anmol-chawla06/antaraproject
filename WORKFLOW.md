# Architecture & Workflow Documentation ✦ कार्यप्रवाह

This document maps out the internal operational workflows, data flows, and runtime lifecycles that govern the user interactions and media rendering in the Antara Library.

---

## ◈ 1. Sidebar Selection & Main Reading Pane Re-Rendering

The core user journey involves navigating the scriptures via the sidebar tree. When a user selects a chapter or direct verse, the following workflow is executed:

```mermaid
graph TD
    A[User Clicks Sidebar Chapter / Verse Pill] --> B{Direct Verse Selected?}
    B -- Yes --> C[Call loadVerseDirectly]
    B -- No --> D[Call loadChapter]
    C --> E[Check if Chapter is Loaded]
    E -- No --> D
    E -- Yes --> F[Highlight Active Verse Card]
    D --> G[Set Active Book and Chapter State]
    D --> H[Update Sidebar Active Classes]
    D --> I[Uncollapse Active Book Node in DOM]
    D --> J[Re-render Main Reading Header & Scholarly Badges]
    D --> K[Call renderVerses with Chapter Verses]
    K --> L[Clear Main Reading Pane DOM Container]
    K --> M[Iterate & Construct Verse Card Articles]
    M --> N[Apply User scaling and Layer Toggle Visibilities]
    M --> O[Append Cards to DOM]
    M --> P[Reset Scrubber and Bottom Audio Queue]
    F --> Q[Smooth Scroll Card into Viewport Center]
```

### Key Functions
- `loadChapter(bookId, chapterId)`: The primary router that resets active IDs, updates sidebar styling, and calls the DOM compiler.
- `renderVerses(verses)`: Iteratively compiles structural nodes using template literals, attaches event handlers (`copy`, `bookmark`, `play`), and injects them into the viewport.
- `highlightActiveVerseCard(verseId)`: Finds the card using `getElementById('card_' + verseId)` and applies the `.active-playing` CSS glow effect.

---

## ◈ 2. Live Search Indexing Workflow

The search system dynamically filters the database as the user types without requiring database calls:

```mermaid
graph TD
    A[User presses Ctrl+K or clicks Search Bar] --> B[Open Search Modal & Focus Input]
    B --> C[User types query string]
    C --> D[Trigger input event listener]
    D --> E[Query active category filter from DOM tags]
    E --> F[Call performSearch query, activeCategory]
    F --> G{Query String is Empty?}
    G -- Yes --> H[Display Default Keyword Suggestion Prompt]
    G -- No --> I[Normalize Query to Lowercase & Trim]
    I --> J[Loop over window.ANTARA_HERITAGE_DB Books]
    J --> K[Filter books by active category]
    K --> L[Loop over Chapters and Verses]
    L --> M[Scan sanskrit, transliteration, english, hindi, citation, book, and chapter names]
    M --> N[Check index match via includes]
    N --> O[Push matches into results array]
    O --> P{Results Array empty?}
    P -- Yes --> Q[Display 'No Match Found' container]
    P -- No --> R[Loop results and call highlightTerm helper]
    R --> S[Wrap matching text in mark tag with search-highlight class]
    S --> T[Append Result Cards with Click Event Listeners]
    T --> U[On Click: Close modal, call loadVerseDirectly, scroll to card]
```

### Search Highlight Helper
Matches are highlighted on-the-fly using a safe regex builder:
```javascript
function highlightTerm(text, query) {
  if (!text || !query) return text;
  const escaped = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.replace(regex, '<mark class="search-highlight">$1</mark>');
}
```

---

## ◈ 3. Text-to-Speech (TTS) Audiobook Playback Lifecycle

Speech Synthesis requires careful device voice synchronization, cadence control, and visual synchronization:

```mermaid
graph TD
    A[Play command triggered for Verse] --> B{Verse has local audio file?}
    B -- Yes --> C[Play HTML5 Audio Track]
    B -- No --> D[Initiate playSpeechSynthesis]
    D --> E[Cancel ongoing browser synthesis speech]
    D --> F[Identify Voice Engine Option: sa_hi, en, auto]
    F --> G[Determine Text: sanskrit vs english and Target Code: hi-IN vs en-IN]
    G --> H[Create SpeechSynthesisUtterance object]
    H --> I[Assign Meditative Speed: 0.82 * rate & Natural Pitch: 0.94]
    I --> J[Call window.speechSynthesis.getVoices]
    J --> K[Execute filtering to select high-quality Google / Microsoft local voice]
    K --> L[Assign voice object & Lang code to Utterance]
    L --> M[Attach start, end, error listeners]
    M --> N[Call window.speechSynthesis.speak]
    N --> O[On Start: Scroll card into view, add active-playing class, trigger scrubber timeline simulation]
    N --> P[On End: Call handleAudioTrackEnded, check loop repetition, or advance queue index]
```

### Meditative Cadence & Quality Assurance
- **cadence**: Playback is purposely kept slow (`rate: 0.82`) to allow users to digest complex syllables, and the pitch is shifted down (`pitch: 0.94`) to replicate a resonant vocal delivery.
- **voiceschanged Listener**: Ensures that browsers that load voices dynamically or asynchronously have their cache warmed up on boot, preventing audio from playing in default, low-quality voices.

---

## ◈ 4. Dhyana Sanctuary Audio Synthesis & Timer Workflow

The meditation sanctuary utilizes synthesized sound nodes designed via the Web Audio API that run completely offline without assets:

```mermaid
graph TD
    A[User triggers play soundscape] --> B{Determine Sound ID}
    B -- Tanpura --> C[Create 4 detuned Sawtooth/Triangle Oscillators + LFO + lowpass filter]
    B -- Cosmic OM --> D[Create Sawtooth at 136.1Hz & Triangle at 68.05Hz + Lowpass Filter + 8s breathing Gain LFO]
    B -- Temple Bells --> E[Trigger periodic Bell FM synthesizers: 5 sine waves with exponential decay every 15s]
    B -- River Flute --> F[Generate Noise Buffer + slow Bandpass Filter LFO & Wind Flute Sine wave + 5Hz Vibrato + phrasing LFO]
    B -- Singing Bowls --> X[Combine 4 rubbed sine waves modulated by separate slow LFOs at 220Hz]
    B -- Monsoon Rain --> Y[Generate noise + 900Hz lowpass filter + scheduled low-frequency sub-bass thunder rumbles]
    B -- Subtle Japa Hum --> Z[Create vocal formant bandpass filter sweeps on 108Hz base + 4s repetition envelope]
    B -- Morning Raga --> W[Dynamic Bilawal scale generator choosing random notes every 3s + portamento glide]
    B -- Ashram Night --> V[Gate noise pulses at 3.8Hz for crickets + low wind breeze lowpass hum]
    C --> G[Connect nodes to Destination]
    D --> G
    E --> G
    F --> G
    X --> G
    Y --> G
    Z --> G
    W --> G
    V --> G
    G --> H[Animate Visualizer Waveform Canvas]
    H --> I[User moves volume slider]
    I --> J[Run linearRampToValueAtTime on Node gain over 100ms]
    H --> K[User activates Meditation Timer]
    K --> L[Start 1s setInterval countdown timer]
    L --> M[Update UI countdown display MM:SS]
    M --> N{Time expires or Stopped?}
    N -- Yes --> O[Exponential ramp gain to 0.0001 over 1.5s to fade out]
    O --> P[Trigger 528Hz Solfeggio healing chime notification]
    P --> Q[Clear active states and reset UI]
```

