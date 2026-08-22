/**
 * ANTARA HERITAGE LIBRARY (अन्तरा ग्रन्थागार)
 * Classical Indian Heritage Interactivity & Dual-Mode Audio Engine
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // APPLICATION STATE
  // -------------------------------------------------------------------------
  const AppState = {
    database: null,
    activeCategory: 'all',
    activeBookId: 'bhagavad_gita',
    activeChapterId: 'bg_ch_02',
    activeVerseId: null,
    theme: localStorage.getItem('antara_theme') || 'dark',
    langPreference: localStorage.getItem('antara_lang') || 'dual', // 'dual', 'en', 'hi'
    sanskritScale: parseFloat(localStorage.getItem('antara_scale') || '1'),
    visibleLayers: JSON.parse(localStorage.getItem('antara_layers') || JSON.stringify({
      devanagari: true,
      iast: true,
      anvaya: true,
      english: true,
      hindi: true,
      commentary: true
    })),
    bookmarks: JSON.parse(localStorage.getItem('antara_bookmarks') || '[]'),
    
    // Audio Player State
    audio: {
      isPlaying: false,
      isPaused: false,
      mode: 'idle', // 'html5' or 'synth'
      queue: [],
      queueIndex: 0,
      loopMode: 1, // 1, 3, 9, 21, 108, Infinity
      currentLoopCount: 0,
      playbackRate: 1.0,
      volume: 0.9,
      voiceEngine: 'sa_hi', // 'sa_hi', 'en', 'auto'
      synthUtterance: null,
      synthProgressTimer: null,
      synthElapsed: 0,
      synthEstimatedDuration: 8,
      tanpuraActive: false
    },
    
    // Dhyana Sanctuary State
    dhyana: {
      activeSounds: {
        tanpura: false,
        om: false,
        bells: false,
        flute: false,
        bowls: false,
        rain: false,
        japa: false,
        raga: false,
        night: false
      },
      volumes: {
        tanpura: 0.7,
        om: 0.6,
        bells: 0.5,
        flute: 0.5,
        bowls: 0.5,
        rain: 0.5,
        japa: 0.5,
        raga: 0.5,
        night: 0.5
      },
      timerDuration: null,
      timeLeft: 0,
      timerInterval: null
    }
  };

  // -------------------------------------------------------------------------
  // DOM ELEMENT REFERENCES
  // -------------------------------------------------------------------------
  const DOM = {
    appRoot: document.querySelector('.app-root'),
    appSidebar: document.getElementById('appSidebar'),
    sidebarToggle: document.getElementById('sidebarToggle'),
    brandHomeBtn: document.getElementById('brandHomeBtn'),
    bookQuickSelect: document.getElementById('bookQuickSelect'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    themeGlyph: document.getElementById('themeGlyph'),
    
    // Tabs & Sidebar
    tabCatalog: document.getElementById('tabCatalog'),
    tabBookmarks: document.getElementById('tabBookmarks'),
    tabDhyana: document.getElementById('tabDhyana'),
    catalogTabPane: document.getElementById('catalogTabPane'),
    bookmarksTabPane: document.getElementById('bookmarksTabPane'),
    dhyanaTabPane: document.getElementById('dhyanaTabPane'),
    sidebarCategoryChips: document.getElementById('sidebarCategoryChips'),
    canonTreeView: document.getElementById('canonTreeView'),
    sidebarFilter: document.getElementById('sidebarFilter'),
    clearFilterBtn: document.getElementById('clearFilterBtn'),
    bookmarksList: document.getElementById('bookmarksList'),
    bookmarkCount: document.getElementById('bookmarkCount'),
    savedVersesBtn: document.getElementById('savedVersesBtn'),
    clearAllBookmarksBtn: document.getElementById('clearAllBookmarksBtn'),
    
    // Tanpura Drone
    tanpuraToggleBtn: document.getElementById('tanpuraToggleBtn'),
    tanpuraBtnLabel: document.getElementById('tanpuraBtnLabel'),

    // Main Reader
    readerMain: document.getElementById('readerMain'),
    heroCategory: document.getElementById('heroCategory'),
    heroBookTitle: document.getElementById('heroBookTitle'),
    heroChapterNum: document.getElementById('heroChapterNum'),
    heroAuthorText: document.getElementById('heroAuthorText'),
    heroTraditionText: document.getElementById('heroTraditionText'),
    heroEraText: document.getElementById('heroEraText'),
    heroSanskritTitle: document.getElementById('heroSanskritTitle'),
    heroTranslitTitle: document.getElementById('heroTranslitTitle'),
    heroSummary: document.getElementById('heroSummary'),
    playAllChapterBtn: document.getElementById('playAllChapterBtn'),
    focusModeBtn: document.getElementById('focusModeBtn'),
    
    // Language Filter Pills
    langDualBtn: document.getElementById('langDualBtn'),
    langEnBtn: document.getElementById('langEnBtn'),
    langHiBtn: document.getElementById('langHiBtn'),

    // Epigraph & Verses
    epigraphCard: document.getElementById('epigraphCard'),
    epigraphSanskrit: document.getElementById('epigraphSanskrit'),
    epigraphTrans: document.getElementById('epigraphTrans'),
    versesContainer: document.getElementById('versesContainer'),
    
    // Chapter Nav Footer
    prevChapterBtn: document.getElementById('prevChapterBtn'),
    prevChapterTitle: document.getElementById('prevChapterTitle'),
    nextChapterBtn: document.getElementById('nextChapterBtn'),
    nextChapterTitle: document.getElementById('nextChapterTitle'),

    // Sticky Bottom Audio Bar
    audioBar: document.getElementById('audioBar'),
    audioCitation: document.getElementById('audioCitation'),
    audioSnippet: document.getElementById('audioSnippet'),
    visualizerCanvas: document.getElementById('visualizerCanvas'),
    audioLoopBtn: document.getElementById('audioLoopBtn'),
    loopBadge: document.getElementById('loopBadge'),
    audioPrevBtn: document.getElementById('audioPrevBtn'),
    audioPlayPauseBtn: document.getElementById('audioPlayPauseBtn'),
    mainPlayGlyph: document.getElementById('mainPlayGlyph'),
    audioNextBtn: document.getElementById('audioNextBtn'),
    audioSpeedBtn: document.getElementById('audioSpeedBtn'),
    speedLabel: document.getElementById('speedLabel'),
    audioCurrentTime: document.getElementById('audioCurrentTime'),
    audioTotalTime: document.getElementById('audioTotalTime'),
    progressBarContainer: document.getElementById('progressBarContainer'),
    progressBarFill: document.getElementById('progressBarFill'),
    voiceSelect: document.getElementById('voiceSelect'),
    volumeMuteBtn: document.getElementById('volumeMuteBtn'),
    volumeSlider: document.getElementById('volumeSlider'),
    volGlyph: document.getElementById('volGlyph'),
    audioCloseBtn: document.getElementById('audioCloseBtn'),
    htmlAudioPlayer: document.getElementById('htmlAudioPlayer'),
    audioStatusNote: document.getElementById('audioStatusNote'),

    // Layer Settings Modal
    viewOptionsBtn: document.getElementById('viewOptionsBtn'),
    layersModal: document.getElementById('layersModal'),
    closeLayersModalBtn: document.getElementById('closeLayersModalBtn'),
    applyLayersBtn: document.getElementById('applyLayersBtn'),
    layerDevanagari: document.getElementById('layerDevanagari'),
    layerIast: document.getElementById('layerIast'),
    layerWordMeanings: document.getElementById('layerWordMeanings'),
    layerEnglish: document.getElementById('layerEnglish'),
    layerHindi: document.getElementById('layerHindi'),
    layerCommentary: document.getElementById('layerCommentary'),
    fontScaleDown: document.getElementById('fontScaleDown'),
    fontScaleUp: document.getElementById('fontScaleUp'),
    fontScaleDisplay: document.getElementById('fontScaleDisplay'),

    // Full-Text Search Modal
    searchTrigger: document.getElementById('searchTrigger'),
    searchModal: document.getElementById('searchModal'),
    closeSearchModalBtn: document.getElementById('closeSearchModalBtn'),
    globalSearchInput: document.getElementById('globalSearchInput'),
    searchResultsList: document.getElementById('searchResultsList'),
    
    // Toast Notification
    toastBox: document.getElementById('toastBox'),
    toastGlyph: document.getElementById('toastGlyph'),
    toastMsg: document.getElementById('toastMsg')
  };

  // -------------------------------------------------------------------------
  // WEB AUDIO API TANPURA DRONE SYNTHESIZER
  // Generates 136.1 Hz (Cosmic Om Frequency) Sa-Pa Harmonics
  // -------------------------------------------------------------------------
  let AudioCtx = null;
  let tanpuraNodes = null;

  function initTanpuraSynth() {
    if (!AudioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        AudioCtx = new AudioContextClass();
      }
    }
  }

  function startTanpuraDrone() {
    initTanpuraSynth();
    if (!AudioCtx) return;
    if (AudioCtx.state === 'suspended') {
      AudioCtx.resume();
    }

    if (tanpuraNodes) stopTanpuraDrone();

    const baseFreq = 136.1; // Vedic Sa frequency (Hz)
    const masterGain = AudioCtx.createGain();
    const currentVol = AppState.dhyana.volumes.tanpura;
    masterGain.gain.setValueAtTime(0.001, AudioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(currentVol * 0.25, AudioCtx.currentTime + 3);

    // Warm Lowpass Filter
    const filter = AudioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(480, AudioCtx.currentTime);

    // Harmonics: Root Sa (136.1Hz), Pa (204.15Hz), High Sa (272.2Hz), and subtle sub (68.05Hz)
    const frequencies = [
      { freq: baseFreq, gain: 0.35, detune: -2 },
      { freq: baseFreq * 1.5, gain: 0.28, detune: 3 },
      { freq: baseFreq * 2, gain: 0.22, detune: 0 },
      { freq: baseFreq * 0.5, gain: 0.18, detune: -4 }
    ];

    const oscillators = [];

    frequencies.forEach(item => {
      const osc = AudioCtx.createOscillator();
      const oscGain = AudioCtx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(item.freq, AudioCtx.currentTime);
      osc.detune.setValueAtTime(item.detune, AudioCtx.currentTime);

      oscGain.gain.setValueAtTime(item.gain, AudioCtx.currentTime);

      // Subtle LFO vibrato for natural breathing resonance
      const lfo = AudioCtx.createOscillator();
      const lfoGain = AudioCtx.createGain();
      lfo.frequency.setValueAtTime(0.25 + Math.random() * 0.2, AudioCtx.currentTime);
      lfoGain.gain.setValueAtTime(2.5, AudioCtx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
      oscillators.push(osc, lfo);
    });

    filter.connect(masterGain);
    masterGain.connect(AudioCtx.destination);

    tanpuraNodes = {
      oscillators,
      masterGain,
      filter
    };

    AppState.audio.tanpuraActive = true;
    DOM.tanpuraToggleBtn.classList.add('active');
    DOM.tanpuraBtnLabel.textContent = 'On';
    
    AppState.dhyana.activeSounds.tanpura = true;
    const btn = document.getElementById('btnPlayTanpura');
    if (btn) {
      btn.textContent = 'Stop';
      btn.classList.add('playing');
    }

    showToast('Vedic Tanpura Drone (136.1 Hz) Activated', '☉');
  }

  function stopTanpuraDrone() {
    if (!tanpuraNodes) return;
    try {
      tanpuraNodes.masterGain.gain.setValueAtTime(tanpuraNodes.masterGain.gain.value, AudioCtx.currentTime);
      tanpuraNodes.masterGain.gain.exponentialRampToValueAtTime(0.0001, AudioCtx.currentTime + 1.2);
      setTimeout(() => {
        if (tanpuraNodes && tanpuraNodes.oscillators) {
          tanpuraNodes.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch (e) {}
          });
        }
        tanpuraNodes = null;
      }, 1300);
    } catch (e) {
      tanpuraNodes = null;
    }

    AppState.audio.tanpuraActive = false;
    DOM.tanpuraToggleBtn.classList.remove('active');
    DOM.tanpuraBtnLabel.textContent = 'Off';
    
    AppState.dhyana.activeSounds.tanpura = false;
    const btn = document.getElementById('btnPlayTanpura');
    if (btn) {
      btn.textContent = 'Play';
      btn.classList.remove('playing');
    }

    showToast('Vedic Tanpura Drone Silenced', '☉');
  }

  function toggleTanpura() {
    if (AppState.audio.tanpuraActive) {
      stopTanpuraDrone();
    } else {
      startTanpuraDrone();
    }
  }

  // -------------------------------------------------------------------------
  // DHYANA MEDITATION SANCTUARY AUDIO SYNTHESIZERS
  // -------------------------------------------------------------------------
  let omNodes = null;
  let bellTimerId = null;
  let fluteNodes = null;
  let bowlsNodes = null;
  let rainNodes = null;
  let rainThunderTimeout = null;
  let japaNodes = null;
  let ragaNodes = null;
  let ragaNoteIntervalId = null;
  let nightNodes = null;

  function initAudioContext() {
    if (!AudioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        AudioCtx = new AudioContextClass();
      }
    }
    if (AudioCtx && AudioCtx.state === 'suspended') {
      AudioCtx.resume();
    }
  }

  function startOmDrone() {
    initAudioContext();
    if (!AudioCtx) return;
    
    if (omNodes) stopOmDrone();

    const masterGain = AudioCtx.createGain();
    const currentVol = AppState.dhyana.volumes.om;
    masterGain.gain.setValueAtTime(0.001, AudioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(currentVol * 0.35, AudioCtx.currentTime + 3);

    // Warm Lowpass Filter to create a deep chanting vocal formant
    const filter = AudioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, AudioCtx.currentTime);

    // Deep oscillators: Root (136.1 Hz) + Sub-octave (68.05 Hz)
    const osc1 = AudioCtx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(136.1, AudioCtx.currentTime);
    osc1.detune.setValueAtTime(-3, AudioCtx.currentTime);

    const osc2 = AudioCtx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(68.05, AudioCtx.currentTime);
    osc2.detune.setValueAtTime(3, AudioCtx.currentTime);

    // LFO representing biological breathing swells (8-second cycle)
    const breathLfo = AudioCtx.createOscillator();
    const breathGain = AudioCtx.createGain();
    breathLfo.type = 'sine';
    breathLfo.frequency.setValueAtTime(0.12, AudioCtx.currentTime);
    
    const oscGain1 = AudioCtx.createGain();
    oscGain1.gain.setValueAtTime(0.6, AudioCtx.currentTime);
    
    breathGain.gain.setValueAtTime(0.3, AudioCtx.currentTime);
    breathLfo.connect(breathGain);
    breathGain.connect(oscGain1.gain);

    osc1.connect(oscGain1);
    osc2.connect(oscGain1);
    oscGain1.connect(filter);
    
    filter.connect(masterGain);
    masterGain.connect(AudioCtx.destination);

    breathLfo.start();
    osc1.start();
    osc2.start();

    omNodes = {
      oscillators: [osc1, osc2, breathLfo],
      masterGain,
      filter
    };

    AppState.dhyana.activeSounds.om = true;
    const btn = document.getElementById('btnPlayOm');
    if (btn) {
      btn.textContent = 'Stop';
      btn.classList.add('playing');
    }
    showToast('Deep Cosmic OM Drone (136.1 Hz) Activated', '✦');
  }

  function stopOmDrone() {
    if (!omNodes) return;
    try {
      omNodes.masterGain.gain.setValueAtTime(omNodes.masterGain.gain.value, AudioCtx.currentTime);
      omNodes.masterGain.gain.exponentialRampToValueAtTime(0.0001, AudioCtx.currentTime + 1.5);
      
      const nodesToStop = omNodes;
      setTimeout(() => {
        if (nodesToStop && nodesToStop.oscillators) {
          nodesToStop.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch (e) {}
          });
        }
      }, 1600);
    } catch (e) {}

    omNodes = null;
    AppState.dhyana.activeSounds.om = false;
    const btn = document.getElementById('btnPlayOm');
    if (btn) {
      btn.textContent = 'Play';
      btn.classList.remove('playing');
    }
    showToast('Cosmic OM Drone Silenced', '✦');
  }

  function triggerBellChime() {
    if (!AudioCtx || !AppState.dhyana.activeSounds.bells) return;

    const baseFreq = 320 + Math.random() * 180;
    const masterGain = AudioCtx.createGain();
    const currentVol = AppState.dhyana.volumes.bells;
    
    masterGain.gain.setValueAtTime(0.001, AudioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(currentVol * 0.4, AudioCtx.currentTime + 0.02);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, AudioCtx.currentTime + 6);

    const partials = [1, 1.43, 1.91, 2.34, 3.12];
    const gains = [0.4, 0.25, 0.2, 0.15, 0.1];
    const oscillators = [];

    partials.forEach((ratio, idx) => {
      const osc = AudioCtx.createOscillator();
      const oscGain = AudioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * ratio, AudioCtx.currentTime);
      oscGain.gain.setValueAtTime(gains[idx], AudioCtx.currentTime);
      
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      oscillators.push(osc);
    });

    masterGain.connect(AudioCtx.destination);

    setTimeout(() => {
      oscillators.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch (e) {}
      });
      masterGain.disconnect();
    }, 7000);
  }

  function startBellsAmbient() {
    initAudioContext();
    if (!AudioCtx) return;

    if (bellTimerId) clearInterval(bellTimerId);
    
    AppState.dhyana.activeSounds.bells = true;
    triggerBellChime();
    bellTimerId = setInterval(triggerBellChime, 15000);

    const btn = document.getElementById('btnPlayBells');
    if (btn) {
      btn.textContent = 'Stop';
      btn.classList.add('playing');
    }
    showToast('Himalayan Temple Bells Activated (15s intervals)', '☉');
  }

  function stopBellsAmbient() {
    if (bellTimerId) {
      clearInterval(bellTimerId);
      bellTimerId = null;
    }
    AppState.dhyana.activeSounds.bells = false;
    const btn = document.getElementById('btnPlayBells');
    if (btn) {
      btn.textContent = 'Play';
      btn.classList.remove('playing');
    }
    showToast('Temple Bells Deactivated', '☉');
  }

  function startFluteAmbient() {
    initAudioContext();
    if (!AudioCtx) return;

    if (fluteNodes) stopFluteAmbient();

    const masterGain = AudioCtx.createGain();
    const currentVol = AppState.dhyana.volumes.flute;
    masterGain.gain.setValueAtTime(0.001, AudioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(currentVol * 0.35, AudioCtx.currentTime + 2);

    // Ganges River pink noise flow buffer
    const bufferSize = AudioCtx.sampleRate * 4;
    const buffer = AudioCtx.createBuffer(1, bufferSize, AudioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noiseSource = AudioCtx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const noiseFilter = AudioCtx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.Q.setValueAtTime(0.8, AudioCtx.currentTime);
    
    const riverLfo = AudioCtx.createOscillator();
    const riverLfoGain = AudioCtx.createGain();
    riverLfo.frequency.setValueAtTime(0.07, AudioCtx.currentTime);
    riverLfoGain.gain.setValueAtTime(90, AudioCtx.currentTime);
    
    noiseFilter.frequency.setValueAtTime(270, AudioCtx.currentTime);
    riverLfo.connect(riverLfoGain);
    riverLfoGain.connect(noiseFilter.frequency);

    const noiseGain = AudioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.22, AudioCtx.currentTime);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    riverLfo.start();
    noiseSource.start();

    // Bansuri Wind Flute synthesis
    const fluteOsc = AudioCtx.createOscillator();
    fluteOsc.type = 'sine';
    fluteOsc.frequency.setValueAtTime(587.33, AudioCtx.currentTime); // D5 note

    const fluteVibrato = AudioCtx.createOscillator();
    const fluteVibratoGain = AudioCtx.createGain();
    fluteVibrato.frequency.setValueAtTime(4.8, AudioCtx.currentTime);
    fluteVibratoGain.gain.setValueAtTime(6, AudioCtx.currentTime);
    
    fluteVibrato.connect(fluteVibratoGain);
    fluteVibratoGain.connect(fluteOsc.frequency);

    const fluteExprLfo = AudioCtx.createOscillator();
    const fluteExprGain = AudioCtx.createGain();
    fluteExprLfo.type = 'sine';
    fluteExprLfo.frequency.setValueAtTime(0.16, AudioCtx.currentTime);
    fluteExprGain.gain.setValueAtTime(0.14, AudioCtx.currentTime);

    const fluteMainGain = AudioCtx.createGain();
    fluteMainGain.gain.setValueAtTime(0.16, AudioCtx.currentTime);

    fluteExprLfo.connect(fluteExprGain);
    fluteExprGain.connect(fluteMainGain.gain);

    fluteOsc.connect(fluteMainGain);
    fluteMainGain.connect(masterGain);

    fluteVibrato.start();
    fluteOsc.start();
    fluteExprLfo.start();

    masterGain.connect(AudioCtx.destination);

    fluteNodes = {
      oscillators: [riverLfo, noiseSource, fluteOsc, fluteVibrato, fluteExprLfo],
      masterGain,
      noiseGain,
      fluteMainGain
    };

    AppState.dhyana.activeSounds.flute = true;
    const btn = document.getElementById('btnPlayFlute');
    if (btn) {
      btn.textContent = 'Stop';
      btn.classList.add('playing');
    }
    showToast('Ganges River & Wind Flute Activated', '⟡');
  }

  function stopFluteAmbient() {
    if (!fluteNodes) return;
    try {
      fluteNodes.masterGain.gain.setValueAtTime(fluteNodes.masterGain.gain.value, AudioCtx.currentTime);
      fluteNodes.masterGain.gain.exponentialRampToValueAtTime(0.0001, AudioCtx.currentTime + 1.5);
      
      const nodesToStop = fluteNodes;
      setTimeout(() => {
        if (nodesToStop && nodesToStop.oscillators) {
          nodesToStop.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch (e) {}
          });
        }
      }, 1600);
    } catch (e) {}

    fluteNodes = null;
    AppState.dhyana.activeSounds.flute = false;
    const btn = document.getElementById('btnPlayFlute');
    if (btn) {
      btn.textContent = 'Play';
      btn.classList.remove('playing');
    }
    showToast('Flute & River Sounds Stopped', '⟡');
  }

  function startBowlsAmbient() {
    initAudioContext();
    if (!AudioCtx) return;

    if (bowlsNodes) stopBowlsAmbient();

    const masterGain = AudioCtx.createGain();
    const currentVol = AppState.dhyana.volumes.bowls;
    masterGain.gain.setValueAtTime(0.001, AudioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(currentVol * 0.4, AudioCtx.currentTime + 3);

    // Warm Lowpass Filter
    const filter = AudioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, AudioCtx.currentTime);

    // Base bowl frequencies (harmonic resonance)
    const baseFreq = 220; // Warm A3 tone
    const partials = [
      { ratio: 1.0, speed: 0.1, maxG: 0.3 },
      { ratio: 1.5, speed: 0.15, maxG: 0.22 },
      { ratio: 2.2, speed: 0.08, maxG: 0.18 },
      { ratio: 3.0, speed: 0.12, maxG: 0.12 }
    ];

    const oscillators = [];

    partials.forEach(p => {
      const osc = AudioCtx.createOscillator();
      const oscGain = AudioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * p.ratio, AudioCtx.currentTime);
      osc.detune.setValueAtTime(Math.random() * 6 - 3, AudioCtx.currentTime);

      oscGain.gain.setValueAtTime(0.01, AudioCtx.currentTime);

      // Rubbing mallet volume modulation LFO (infinite circulation)
      const lfo = AudioCtx.createOscillator();
      const lfoGain = AudioCtx.createGain();
      lfo.frequency.setValueAtTime(p.speed, AudioCtx.currentTime);
      lfoGain.gain.setValueAtTime(p.maxG * 0.5, AudioCtx.currentTime);

      const biasGain = AudioCtx.createGain();
      biasGain.gain.setValueAtTime(p.maxG * 0.5, AudioCtx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(oscGain.gain);
      biasGain.connect(oscGain.gain);

      osc.connect(oscGain);
      oscGain.connect(filter);

      lfo.start();
      osc.start();
      
      oscillators.push(osc, lfo);
    });

    filter.connect(masterGain);
    masterGain.connect(AudioCtx.destination);

    bowlsNodes = {
      oscillators,
      masterGain,
      filter
    };

    AppState.dhyana.activeSounds.bowls = true;
    const btn = document.getElementById('btnPlayBowls');
    if (btn) {
      btn.textContent = 'Stop';
      btn.classList.add('playing');
    }
    showToast('Tibetan Singing Bowls Activated', '◈');
  }

  function stopBowlsAmbient() {
    if (!bowlsNodes) return;
    try {
      bowlsNodes.masterGain.gain.setValueAtTime(bowlsNodes.masterGain.gain.value, AudioCtx.currentTime);
      bowlsNodes.masterGain.gain.exponentialRampToValueAtTime(0.0001, AudioCtx.currentTime + 2.0);
      
      const nodesToStop = bowlsNodes;
      setTimeout(() => {
        if (nodesToStop && nodesToStop.oscillators) {
          nodesToStop.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch (e) {}
          });
        }
      }, 2100);
    } catch (e) {}

    bowlsNodes = null;
    AppState.dhyana.activeSounds.bowls = false;
    const btn = document.getElementById('btnPlayBowls');
    if (btn) {
      btn.textContent = 'Play';
      btn.classList.remove('playing');
    }
    showToast('Singing Bowls Silenced', '◈');
  }

  function triggerThunderRumble() {
    if (!AudioCtx || !AppState.dhyana.activeSounds.rain || !rainNodes) return;

    // Trigger low rumble every 25-45 seconds randomly
    const thunderGain = AudioCtx.createGain();
    const currentVol = AppState.dhyana.volumes.rain;
    thunderGain.gain.setValueAtTime(0.0001, AudioCtx.currentTime);
    thunderGain.gain.linearRampToValueAtTime(currentVol * 0.25, AudioCtx.currentTime + 2.0); // Slow rumble build
    thunderGain.gain.linearRampToValueAtTime(currentVol * 0.05, AudioCtx.currentTime + 3.5);
    thunderGain.gain.exponentialRampToValueAtTime(0.0001, AudioCtx.currentTime + 7.0);

    const thunderFilter = AudioCtx.createBiquadFilter();
    thunderFilter.type = 'lowpass';
    thunderFilter.frequency.setValueAtTime(45, AudioCtx.currentTime); // sub-bass rumble

    // Generate low frequency rumble noise
    const bufferSize = AudioCtx.sampleRate * 7;
    const buffer = AudioCtx.createBuffer(1, bufferSize, AudioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = AudioCtx.createBufferSource();
    noise.buffer = buffer;

    noise.connect(thunderFilter);
    thunderFilter.connect(thunderGain);
    thunderGain.connect(AudioCtx.destination);

    noise.start();

    // Re-schedule next thunder rumble
    const nextTime = 25000 + Math.random() * 20000;
    rainThunderTimeout = setTimeout(triggerThunderRumble, nextTime);
  }

  function startRainAmbient() {
    initAudioContext();
    if (!AudioCtx) return;

    if (rainNodes) stopRainAmbient();

    const masterGain = AudioCtx.createGain();
    const currentVol = AppState.dhyana.volumes.rain;
    masterGain.gain.setValueAtTime(0.001, AudioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(currentVol * 0.45, AudioCtx.currentTime + 2.5);

    // Rain high-frequency noise
    const bufferSize = AudioCtx.sampleRate * 4;
    const buffer = AudioCtx.createBuffer(1, bufferSize, AudioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noiseSource = AudioCtx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const noiseFilter = AudioCtx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(850, AudioCtx.currentTime);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(masterGain);
    masterGain.connect(AudioCtx.destination);

    noiseSource.start();

    rainNodes = {
      oscillators: [noiseSource],
      masterGain,
      filter: noiseFilter
    };

    AppState.dhyana.activeSounds.rain = true;
    const btn = document.getElementById('btnPlayRain');
    if (btn) {
      btn.textContent = 'Stop';
      btn.classList.add('playing');
    }

    // Start thunder schedule
    if (rainThunderTimeout) clearTimeout(rainThunderTimeout);
    rainThunderTimeout = setTimeout(triggerThunderRumble, 12000); // First rumble after 12s

    showToast('Monsoon Rain Soundscape Activated', '✦');
  }

  function stopRainAmbient() {
    if (rainThunderTimeout) {
      clearTimeout(rainThunderTimeout);
      rainThunderTimeout = null;
    }
    if (!rainNodes) return;
    try {
      rainNodes.masterGain.gain.setValueAtTime(rainNodes.masterGain.gain.value, AudioCtx.currentTime);
      rainNodes.masterGain.gain.exponentialRampToValueAtTime(0.0001, AudioCtx.currentTime + 1.5);
      
      const nodesToStop = rainNodes;
      setTimeout(() => {
        if (nodesToStop && nodesToStop.oscillators) {
          nodesToStop.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch (e) {}
          });
        }
      }, 1600);
    } catch (e) {}

    rainNodes = null;
    AppState.dhyana.activeSounds.rain = false;
    const btn = document.getElementById('btnPlayRain');
    if (btn) {
      btn.textContent = 'Play';
      btn.classList.remove('playing');
    }
    showToast('Rain Soundscape Stopped', '✦');
  }

  function startJapaAmbient() {
    initAudioContext();
    if (!AudioCtx) return;

    if (japaNodes) stopJapaAmbient();

    const masterGain = AudioCtx.createGain();
    const currentVol = AppState.dhyana.volumes.japa;
    masterGain.gain.setValueAtTime(0.001, AudioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(currentVol * 0.42, AudioCtx.currentTime + 3);

    // Chanting format filters
    const filter1 = AudioCtx.createBiquadFilter();
    filter1.type = 'bandpass';
    filter1.Q.setValueAtTime(4.0, AudioCtx.currentTime);
    filter1.frequency.setValueAtTime(220, AudioCtx.currentTime); // simulated "O" formant

    const filter2 = AudioCtx.createBiquadFilter();
    filter2.type = 'bandpass';
    filter2.Q.setValueAtTime(5.0, AudioCtx.currentTime);
    filter2.frequency.setValueAtTime(440, AudioCtx.currentTime); // simulated "M" formant

    // Japa chant fundamental tone (108 Hz - Vedic sacred Japa pitch)
    const baseFreq = 108.0;
    const osc1 = AudioCtx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(baseFreq, AudioCtx.currentTime);
    osc1.detune.setValueAtTime(-2, AudioCtx.currentTime);

    const osc2 = AudioCtx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(baseFreq * 1.5, AudioCtx.currentTime); // perfect fifth overtone
    osc2.detune.setValueAtTime(2, AudioCtx.currentTime);

    // Periodic rhythm chant LFO (4-second cycle: "AUM... AUM...")
    const chantLfo = AudioCtx.createOscillator();
    const chantLfoGain = AudioCtx.createGain();
    chantLfo.type = 'sine';
    chantLfo.frequency.setValueAtTime(0.25, AudioCtx.currentTime); // 4 seconds Japa repeat
    
    const chantGain = AudioCtx.createGain();
    chantGain.gain.setValueAtTime(0.5, AudioCtx.currentTime);

    chantLfoGain.gain.setValueAtTime(0.4, AudioCtx.currentTime);
    chantLfo.connect(chantLfoGain);
    chantLfoGain.connect(chantGain.gain);

    osc1.connect(chantGain);
    osc2.connect(chantGain);

    chantGain.connect(filter1);
    chantGain.connect(filter2);

    const mixGain = AudioCtx.createGain();
    mixGain.gain.setValueAtTime(0.8, AudioCtx.currentTime);
    filter1.connect(mixGain);
    filter2.connect(mixGain);

    mixGain.connect(masterGain);
    masterGain.connect(AudioCtx.destination);

    chantLfo.start();
    osc1.start();
    osc2.start();

    japaNodes = {
      oscillators: [osc1, osc2, chantLfo],
      masterGain,
      mixGain
    };

    AppState.dhyana.activeSounds.japa = true;
    const btn = document.getElementById('btnPlayJapa');
    if (btn) {
      btn.textContent = 'Stop';
      btn.classList.add('playing');
    }
    showToast('Subtle Japa Chant Activated (108 Hz)', '☉');
  }

  function stopJapaAmbient() {
    if (!japaNodes) return;
    try {
      japaNodes.masterGain.gain.setValueAtTime(japaNodes.masterGain.gain.value, AudioCtx.currentTime);
      japaNodes.masterGain.gain.exponentialRampToValueAtTime(0.0001, AudioCtx.currentTime + 1.5);
      
      const nodesToStop = japaNodes;
      setTimeout(() => {
        if (nodesToStop && nodesToStop.oscillators) {
          nodesToStop.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch (e) {}
          });
        }
      }, 1600);
    } catch (e) {}

    japaNodes = null;
    AppState.dhyana.activeSounds.japa = false;
    const btn = document.getElementById('btnPlayJapa');
    if (btn) {
      btn.textContent = 'Play';
      btn.classList.remove('playing');
    }
    showToast('Japa Chant Silenced', '☉');
  }

  function triggerRagaNote() {
    if (!AudioCtx || !AppState.dhyana.activeSounds.raga || !ragaNodes) return;

    // Morning Raga Bilawal Scale notes (frequencies)
    const scale = [
      523.25, // C5
      587.33, // D5
      659.25, // E5
      698.46, // F5
      783.99, // G5
      880.00, // A5
      987.77, // B5
      1046.50 // C6
    ];

    // Select random note
    const targetFreq = scale[Math.floor(Math.random() * scale.length)];
    const node = ragaNodes;

    // Glide frequency (portamento)
    node.fluteOsc.frequency.setValueAtTime(node.fluteOsc.frequency.value, AudioCtx.currentTime);
    node.fluteOsc.frequency.exponentialRampToValueAtTime(targetFreq, AudioCtx.currentTime + 0.8 + Math.random() * 0.6);

    // Flute wind breath swell
    node.breathGain.gain.setValueAtTime(node.breathGain.gain.value, AudioCtx.currentTime);
    node.breathGain.gain.linearRampToValueAtTime(0.12 + Math.random() * 0.08, AudioCtx.currentTime + 0.3);
    node.breathGain.gain.linearRampToValueAtTime(0.001, AudioCtx.currentTime + 2.5);
  }

  function startRagaAmbient() {
    initAudioContext();
    if (!AudioCtx) return;

    if (ragaNodes) stopRagaAmbient();

    const masterGain = AudioCtx.createGain();
    const currentVol = AppState.dhyana.volumes.raga;
    masterGain.gain.setValueAtTime(0.001, AudioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(currentVol * 0.38, AudioCtx.currentTime + 2.5);

    // Bansuri flute pitch
    const fluteOsc = AudioCtx.createOscillator();
    fluteOsc.type = 'sine';
    fluteOsc.frequency.setValueAtTime(523.25, AudioCtx.currentTime); // Start on C5

    // Flute breath noise (creates woodwind air texture)
    const bufferSize = AudioCtx.sampleRate * 2;
    const buffer = AudioCtx.createBuffer(1, bufferSize, AudioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const breathSource = AudioCtx.createBufferSource();
    breathSource.buffer = buffer;
    breathSource.loop = true;

    const breathFilter = AudioCtx.createBiquadFilter();
    breathFilter.type = 'bandpass';
    breathFilter.frequency.setValueAtTime(800, AudioCtx.currentTime);
    breathFilter.Q.setValueAtTime(6.0, AudioCtx.currentTime);

    // Vibrato
    const vibrato = AudioCtx.createOscillator();
    const vibratoGain = AudioCtx.createGain();
    vibrato.frequency.setValueAtTime(5.2, AudioCtx.currentTime); // 5.2 Hz bansuri lip vibrato
    vibratoGain.gain.setValueAtTime(4.5, AudioCtx.currentTime);
    
    vibrato.connect(vibratoGain);
    vibratoGain.connect(fluteOsc.frequency);

    // Breath envelope
    const breathGain = AudioCtx.createGain();
    breathGain.gain.setValueAtTime(0.001, AudioCtx.currentTime);

    breathSource.connect(breathFilter);
    breathFilter.connect(breathGain);
    
    // Mix flute oscillator and breath noise
    const oscGain = AudioCtx.createGain();
    oscGain.gain.setValueAtTime(0.2, AudioCtx.currentTime);
    
    fluteOsc.connect(oscGain);
    
    breathGain.connect(masterGain);
    oscGain.connect(masterGain);
    masterGain.connect(AudioCtx.destination);

    fluteOsc.start();
    vibrato.start();
    breathSource.start();

    ragaNodes = {
      oscillators: [fluteOsc, vibrato, breathSource],
      fluteOsc,
      breathGain,
      masterGain
    };

    AppState.dhyana.activeSounds.raga = true;
    const btn = document.getElementById('btnPlayRaga');
    if (btn) {
      btn.textContent = 'Stop';
      btn.classList.add('playing');
    }

    // Play first note
    triggerRagaNote();
    // Schedule note changes every 3 seconds
    if (ragaNoteIntervalId) clearInterval(ragaNoteIntervalId);
    ragaNoteIntervalId = setInterval(triggerRagaNote, 3000);

    showToast('Morning Raga Flute Activated (Bilawal Scale)', '⟡');
  }

  function stopRagaAmbient() {
    if (ragaNoteIntervalId) {
      clearInterval(ragaNoteIntervalId);
      ragaNoteIntervalId = null;
    }
    if (!ragaNodes) return;
    try {
      ragaNodes.masterGain.gain.setValueAtTime(ragaNodes.masterGain.gain.value, AudioCtx.currentTime);
      ragaNodes.masterGain.gain.exponentialRampToValueAtTime(0.0001, AudioCtx.currentTime + 1.8);
      
      const nodesToStop = ragaNodes;
      setTimeout(() => {
        if (nodesToStop && nodesToStop.oscillators) {
          nodesToStop.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch (e) {}
          });
        }
      }, 1900);
    } catch (e) {}

    ragaNodes = null;
    AppState.dhyana.activeSounds.raga = false;
    const btn = document.getElementById('btnPlayRaga');
    if (btn) {
      btn.textContent = 'Play';
      btn.classList.remove('playing');
    }
    showToast('Morning Flute Silenced', '⟡');
  }

  function startNightAmbient() {
    initAudioContext();
    if (!AudioCtx) return;

    if (nightNodes) stopNightAmbient();

    const masterGain = AudioCtx.createGain();
    const currentVol = AppState.dhyana.volumes.night;
    masterGain.gain.setValueAtTime(0.001, AudioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(currentVol * 0.42, AudioCtx.currentTime + 2.5);

    // A. Generate crickets (High frequency filtered noise pulses)
    const bufferSize = AudioCtx.sampleRate * 2;
    const buffer = AudioCtx.createBuffer(1, bufferSize, AudioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const cricketSource = AudioCtx.createBufferSource();
    cricketSource.buffer = buffer;
    cricketSource.loop = true;

    const cricketFilter = AudioCtx.createBiquadFilter();
    cricketFilter.type = 'highpass';
    cricketFilter.frequency.setValueAtTime(3800, AudioCtx.currentTime); // High pitch crickets

    // Gating pulse LFO for cricket chirping rhythm (3.8 Hz chirp pulsing)
    const cricketLfo = AudioCtx.createOscillator();
    const cricketLfoGain = AudioCtx.createGain();
    cricketLfo.type = 'square';
    cricketLfo.frequency.setValueAtTime(3.8, AudioCtx.currentTime);
    cricketLfoGain.gain.setValueAtTime(0.12, AudioCtx.currentTime);

    cricketSource.connect(cricketFilter);
    cricketFilter.connect(cricketLfoGain);
    cricketLfoGain.connect(masterGain);

    cricketSource.start();

    // B. Warm night breeze rumble (Low frequency filtered noise swells)
    const breezeSource = AudioCtx.createBufferSource();
    breezeSource.buffer = buffer;
    breezeSource.loop = true;

    const breezeFilter = AudioCtx.createBiquadFilter();
    breezeFilter.type = 'lowpass';
    breezeFilter.frequency.setValueAtTime(110, AudioCtx.currentTime);

    const breezeLfo = AudioCtx.createOscillator();
    const breezeLfoGain = AudioCtx.createGain();
    breezeLfo.type = 'sine';
    breezeLfo.frequency.setValueAtTime(0.06, AudioCtx.currentTime); // Slow wind swell cycle
    
    const breezeGain = AudioCtx.createGain();
    breezeGain.gain.setValueAtTime(0.15, AudioCtx.currentTime);

    breezeLfoGain.gain.setValueAtTime(0.08, AudioCtx.currentTime);
    breezeLfo.connect(breezeLfoGain);
    breezeLfoGain.connect(breezeGain.gain);

    breezeSource.connect(breezeFilter);
    breezeFilter.connect(breezeGain);
    breezeGain.connect(masterGain);

    breezeLfo.start();
    breezeSource.start();

    masterGain.connect(AudioCtx.destination);

    nightNodes = {
      oscillators: [cricketSource, cricketLfo, breezeSource, breezeLfo],
      masterGain
    };

    AppState.dhyana.activeSounds.night = true;
    const btn = document.getElementById('btnPlayNight');
    if (btn) {
      btn.textContent = 'Stop';
      btn.classList.add('playing');
    }
    showToast('Ashram Night Soundscape Activated', '⚖');
  }

  function stopNightAmbient() {
    if (!nightNodes) return;
    try {
      nightNodes.masterGain.gain.setValueAtTime(nightNodes.masterGain.gain.value, AudioCtx.currentTime);
      nightNodes.masterGain.gain.exponentialRampToValueAtTime(0.0001, AudioCtx.currentTime + 1.5);
      
      const nodesToStop = nightNodes;
      setTimeout(() => {
        if (nodesToStop && nodesToStop.oscillators) {
          nodesToStop.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch (e) {}
          });
        }
      }, 1600);
    } catch (e) {}

    nightNodes = null;
    AppState.dhyana.activeSounds.night = false;
    const btn = document.getElementById('btnPlayNight');
    if (btn) {
      btn.textContent = 'Play';
      btn.classList.remove('playing');
    }
    showToast('Ashram Night Soundscape Silenced', '⚖');
  }

  function adjustDhyanaVolume(soundId, value) {
    AppState.dhyana.volumes[soundId] = value;
    if (soundId === 'tanpura' && tanpuraNodes) {
      tanpuraNodes.masterGain.gain.setValueAtTime(tanpuraNodes.masterGain.gain.value, AudioCtx.currentTime);
      tanpuraNodes.masterGain.gain.linearRampToValueAtTime(value * 0.25, AudioCtx.currentTime + 0.1);
    } else if (soundId === 'om' && omNodes) {
      omNodes.masterGain.gain.setValueAtTime(omNodes.masterGain.gain.value, AudioCtx.currentTime);
      omNodes.masterGain.gain.linearRampToValueAtTime(value * 0.35, AudioCtx.currentTime + 0.1);
    } else if (soundId === 'bells') {
      // Periodic trigger queries volumes directly, volume is updated immediately in state
    } else if (soundId === 'flute' && fluteNodes) {
      fluteNodes.masterGain.gain.setValueAtTime(fluteNodes.masterGain.gain.value, AudioCtx.currentTime);
      fluteNodes.masterGain.gain.linearRampToValueAtTime(value * 0.35, AudioCtx.currentTime + 0.1);
    } else if (soundId === 'bowls' && bowlsNodes) {
      bowlsNodes.masterGain.gain.setValueAtTime(bowlsNodes.masterGain.gain.value, AudioCtx.currentTime);
      bowlsNodes.masterGain.gain.linearRampToValueAtTime(value * 0.4, AudioCtx.currentTime + 0.1);
    } else if (soundId === 'rain' && rainNodes) {
      rainNodes.masterGain.gain.setValueAtTime(rainNodes.masterGain.gain.value, AudioCtx.currentTime);
      rainNodes.masterGain.gain.linearRampToValueAtTime(value * 0.45, AudioCtx.currentTime + 0.1);
    } else if (soundId === 'japa' && japaNodes) {
      japaNodes.masterGain.gain.setValueAtTime(japaNodes.masterGain.gain.value, AudioCtx.currentTime);
      japaNodes.masterGain.gain.linearRampToValueAtTime(value * 0.42, AudioCtx.currentTime + 0.1);
    } else if (soundId === 'raga' && ragaNodes) {
      ragaNodes.masterGain.gain.setValueAtTime(ragaNodes.masterGain.gain.value, AudioCtx.currentTime);
      ragaNodes.masterGain.gain.linearRampToValueAtTime(value * 0.38, AudioCtx.currentTime + 0.1);
    } else if (soundId === 'night' && nightNodes) {
      nightNodes.masterGain.gain.setValueAtTime(nightNodes.masterGain.gain.value, AudioCtx.currentTime);
      nightNodes.masterGain.gain.linearRampToValueAtTime(value * 0.42, AudioCtx.currentTime + 0.1);
    }
  }

  // -------------------------------------------------------------------------
  // MEDITATION TIMER MODULE
  // -------------------------------------------------------------------------
  function startDhyanaTimer(minutes) {
    if (AppState.dhyana.timerInterval) clearInterval(AppState.dhyana.timerInterval);

    AppState.dhyana.timerDuration = minutes * 60;
    AppState.dhyana.timeLeft = minutes * 60;

    document.getElementById('timerStatusLabel').textContent = 'Active';
    document.getElementById('timerDisplayRow').style.display = 'flex';
    updateTimerDisplay();

    // Visual active states on timer buttons
    document.querySelectorAll('.timer-btn').forEach(btn => {
      const btnMin = parseInt(btn.dataset.minutes);
      btn.classList.toggle('active', btnMin === minutes);
    });

    AppState.dhyana.timerInterval = setInterval(() => {
      AppState.dhyana.timeLeft--;
      updateTimerDisplay();

      if (AppState.dhyana.timeLeft <= 0) {
        clearInterval(AppState.dhyana.timerInterval);
        AppState.dhyana.timerInterval = null;
        handleDhyanaTimerComplete();
      }
    }, 1000);

    showToast(`Meditation timer set for ${minutes} minutes`, '⚖');
  }

  function stopDhyanaTimer() {
    if (AppState.dhyana.timerInterval) {
      clearInterval(AppState.dhyana.timerInterval);
      AppState.dhyana.timerInterval = null;
    }
    document.getElementById('timerStatusLabel').textContent = 'Idle';
    document.getElementById('timerDisplayRow').style.display = 'none';
    
    document.querySelectorAll('.timer-btn').forEach(btn => btn.classList.remove('active'));
    showToast('Meditation timer cancelled', '⚖');
  }

  function updateTimerDisplay() {
    const mins = Math.floor(AppState.dhyana.timeLeft / 60);
    const secs = AppState.dhyana.timeLeft % 60;
    document.getElementById('timerCountdown').textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function handleDhyanaTimerComplete() {
    // Fade out all active meditation loops
    if (AppState.dhyana.activeSounds.tanpura) stopTanpuraDrone();
    if (AppState.dhyana.activeSounds.om) stopOmDrone();
    if (AppState.dhyana.activeSounds.bells) stopBellsAmbient();
    if (AppState.dhyana.activeSounds.flute) stopFluteAmbient();
    if (AppState.dhyana.activeSounds.bowls) stopBowlsAmbient();
    if (AppState.dhyana.activeSounds.rain) stopRainAmbient();
    if (AppState.dhyana.activeSounds.japa) stopJapaAmbient();
    if (AppState.dhyana.activeSounds.raga) stopRagaAmbient();
    if (AppState.dhyana.activeSounds.night) stopNightAmbient();

    document.getElementById('timerStatusLabel').textContent = 'Complete';
    document.getElementById('timerDisplayRow').style.display = 'none';
    document.querySelectorAll('.timer-btn').forEach(btn => btn.classList.remove('active'));

    showToast('Dhyana complete. ॐ शान्तिः शान्तिः शान्तिः।', '⚖');

    // Soft chime notification using 528Hz healing pitch
    if (AudioCtx) {
      const masterGain = AudioCtx.createGain();
      masterGain.gain.setValueAtTime(0.001, AudioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.3, AudioCtx.currentTime + 0.05);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, AudioCtx.currentTime + 4);

      const osc = AudioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, AudioCtx.currentTime);
      
      osc.connect(masterGain);
      masterGain.connect(AudioCtx.destination);
      osc.start();
      
      setTimeout(() => {
        try { osc.stop(); osc.disconnect(); } catch(e){}
        masterGain.disconnect();
      }, 5000);
    }
  }

  // -------------------------------------------------------------------------
  // VISUALIZER WAVEFORM ANIMATION
  // -------------------------------------------------------------------------
  let visualizerAnimId = null;

  function initVisualizer() {
    const canvas = DOM.visualizerCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let phase = 0;

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLive = AppState.audio.isPlaying || 
                     AppState.audio.tanpuraActive || 
                     (AppState.dhyana && (
                       AppState.dhyana.activeSounds.om || 
                       AppState.dhyana.activeSounds.bells || 
                       AppState.dhyana.activeSounds.flute ||
                       AppState.dhyana.activeSounds.bowls ||
                       AppState.dhyana.activeSounds.rain ||
                       AppState.dhyana.activeSounds.japa ||
                       AppState.dhyana.activeSounds.raga ||
                       AppState.dhyana.activeSounds.night
                     ));
      
      const bars = 5;
      const barWidth = 4;
      const spacing = 4;
      const startX = 6;

      for (let i = 0; i < bars; i++) {
        let height = 4;
        if (isLive) {
          const wave = Math.sin(phase + i * 0.9) * 0.5 + 0.5;
          height = 4 + wave * 18;
        }

        const x = startX + i * (barWidth + spacing);
        const y = (canvas.height - height) / 2;

        ctx.fillStyle = isLive ? (AppState.theme === 'dark' ? '#D4AF37' : '#B8860B') : 'rgba(150, 150, 150, 0.4)';
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, height, 2);
        ctx.fill();
      }

      phase += 0.08;
      visualizerAnimId = requestAnimationFrame(render);
    }

    if (!visualizerAnimId) {
      render();
    }
  }

  // -------------------------------------------------------------------------
  // INITIALIZATION & DATA LOADING
  // -------------------------------------------------------------------------
  async function initApp() {
    applyTheme(AppState.theme);
    applySanskritScale(AppState.sanskritScale);
    setupEventListeners();
    initVisualizer();

    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }

    try {
      // 1. Direct synchronous read from window.ANTARA_HERITAGE_DB (Eliminates file:// CORS errors)
      if (window.ANTARA_HERITAGE_DB && window.ANTARA_HERITAGE_DB.books) {
        AppState.database = window.ANTARA_HERITAGE_DB;
      } else {
        // Fallback to fetch if opened via HTTP/HTTPS server
        const res = await fetch('texts_database.json');
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        AppState.database = await res.json();
      }
      
      populateBookSelector();
      renderCanonTree();
      updateBookmarksUI();
      
      // Load Default Book & Chapter
      loadChapter(AppState.activeBookId, AppState.activeChapterId);

    } catch (err) {
      console.error('Failed to load heritage database:', err);
      showToast('Error loading heritage corpus', '✕');
    }
  }

  // -------------------------------------------------------------------------
  // THEME & DISPLAY LAYER MANAGEMENT
  // -------------------------------------------------------------------------
  function applyTheme(theme) {
    AppState.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('antara_theme', theme);

    if (theme === 'dark') {
      DOM.themeGlyph.textContent = '☾';
      DOM.themeToggleBtn.setAttribute('title', 'Switch to Heritage Cream Light Theme');
    } else {
      DOM.themeGlyph.textContent = '☀';
      DOM.themeToggleBtn.setAttribute('title', 'Switch to Midnight Obsidian Dark Theme');
    }
  }

  function toggleTheme() {
    const newTheme = AppState.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    showToast(`${newTheme === 'dark' ? 'Midnight Theme' : 'Heritage Cream Theme'} active`, '◈');
  }

  function applySanskritScale(scale) {
    AppState.sanskritScale = scale;
    document.documentElement.style.setProperty('--sanskrit-scale', scale);
    DOM.fontScaleDisplay.textContent = `${Math.round(scale * 100)}%`;
    localStorage.setItem('antara_scale', scale);
  }

  function applyLanguagePreference(lang) {
    AppState.langPreference = lang;
    localStorage.setItem('antara_lang', lang);

    DOM.langDualBtn.classList.toggle('active', lang === 'dual');
    DOM.langEnBtn.classList.toggle('active', lang === 'en');
    DOM.langHiBtn.classList.toggle('active', lang === 'hi');

    // Update visibility on rendered verse cards
    document.querySelectorAll('.verse-card').forEach(card => {
      const enBox = card.querySelector('.translation-box.en');
      const hiBox = card.querySelector('.translation-box.hi');

      if (enBox && hiBox) {
        if (lang === 'dual') {
          enBox.style.display = AppState.visibleLayers.english ? 'block' : 'none';
          hiBox.style.display = AppState.visibleLayers.hindi ? 'block' : 'none';
        } else if (lang === 'en') {
          enBox.style.display = AppState.visibleLayers.english ? 'block' : 'none';
          hiBox.style.display = 'none';
        } else if (lang === 'hi') {
          enBox.style.display = 'none';
          hiBox.style.display = AppState.visibleLayers.hindi ? 'block' : 'none';
        }
      }
    });
  }

  // -------------------------------------------------------------------------
  // BOOK & CHAPTER SELECTION
  // -------------------------------------------------------------------------
  function populateBookSelector() {
    if (!AppState.database || !AppState.database.books) return;
    DOM.bookQuickSelect.innerHTML = '';
    
    // Group books by category
    const categories = AppState.database.categories || [
      { id: 'vedas_upanishads', name: 'Vedas & Upanishads' },
      { id: 'epics_itihasa', name: 'Epics & Itihasa' },
      { id: 'philosophy_darshana', name: 'Philosophical Treatises' },
      { id: 'classical_shastras', name: 'Classical Manuscripts' }
    ];

    categories.forEach(cat => {
      const catBooks = AppState.database.books.filter(b => b.category_id === cat.id);
      if (catBooks.length > 0) {
        const group = document.createElement('optgroup');
        group.label = `${cat.name} (${cat.sanskrit_name || ''})`;
        catBooks.forEach(book => {
          const opt = document.createElement('option');
          opt.value = book.id;
          opt.textContent = `${book.title} — ${book.sanskrit_title}`;
          group.appendChild(opt);
        });
        DOM.bookQuickSelect.appendChild(group);
      }
    });

    DOM.bookQuickSelect.value = AppState.activeBookId;
  }

  function renderCanonTree(filterQuery = '') {
    if (!AppState.database || !AppState.database.books) return;
    DOM.canonTreeView.innerHTML = '';
    const q = filterQuery.trim().toLowerCase();

    const categories = AppState.database.categories || [];

    categories.forEach(cat => {
      // Check if current category filter matches
      if (AppState.activeCategory !== 'all' && cat.id !== AppState.activeCategory) {
        return;
      }

      const catBooks = AppState.database.books.filter(b => b.category_id === cat.id);
      if (catBooks.length === 0) return;

      // Check if any book matches search query
      const matchingBooks = catBooks.filter(book => {
        if (!q) return true;
        if (book.title.toLowerCase().includes(q) || book.sanskrit_title.includes(q) || (book.author && book.author.toLowerCase().includes(q))) {
          return true;
        }
        return book.chapters.some(ch => 
          ch.title.toLowerCase().includes(q) ||
          ch.sanskrit_title.includes(q) ||
          ch.transliteration.toLowerCase().includes(q) ||
          ch.verses.some(v => 
            v.citation.toLowerCase().includes(q) || 
            v.sanskrit.includes(q) || 
            v.english.toLowerCase().includes(q) ||
            v.hindi.includes(q) ||
            v.verse_number.toLowerCase().includes(q)
          )
        );
      });

      if (q && matchingBooks.length === 0) return;

      // Category Section Header
      const catHeader = document.createElement('div');
      catHeader.className = 'category-section-divider';
      catHeader.innerHTML = `<span>❖</span> <span>${cat.name}</span>`;
      DOM.canonTreeView.appendChild(catHeader);

      matchingBooks.forEach(book => {
        const bookNode = document.createElement('div');
        const isCurrentBook = (book.id === AppState.activeBookId);
        bookNode.className = `book-group-node ${isCurrentBook ? '' : ''}`;
        bookNode.dataset.bookId = book.id;

        const matchingChapters = book.chapters.filter(ch => {
          if (!q) return true;
          return (
            book.title.toLowerCase().includes(q) ||
            ch.title.toLowerCase().includes(q) ||
            ch.sanskrit_title.includes(q) ||
            ch.transliteration.toLowerCase().includes(q) ||
            ch.verses.some(v => 
              v.citation.toLowerCase().includes(q) || 
              v.sanskrit.includes(q) || 
              v.english.toLowerCase().includes(q) ||
              v.hindi.includes(q) ||
              v.verse_number.toLowerCase().includes(q)
            )
          );
        });

        const header = document.createElement('div');
        header.className = 'book-node-header';
        header.innerHTML = `
          <div class="book-header-left">
            <div class="book-header-title-row">
              <span class="tree-expander-chevron">▾</span>
              <span class="book-header-title">${book.title}</span>
            </div>
            <span class="book-header-sanskrit">${book.sanskrit_title}</span>
          </div>
          <span class="book-badge-num">${book.chapters.length} Sect.</span>
        `;

        header.addEventListener('click', (e) => {
          bookNode.classList.toggle('collapsed');
          if (!bookNode.classList.contains('collapsed') && book.id !== AppState.activeBookId && book.chapters.length > 0) {
            loadChapter(book.id, book.chapters[0].id);
          }
        });

        const list = document.createElement('ul');
        list.className = 'chapter-node-list';

        matchingChapters.forEach(chap => {
          const item = document.createElement('li');
          const isCurrentChapter = (book.id === AppState.activeBookId && chap.id === AppState.activeChapterId);
          item.className = `chapter-node-item ${isCurrentChapter ? 'active' : ''}`;
          item.dataset.bookId = book.id;
          item.dataset.chapterId = chap.id;

          item.innerHTML = `
            <div class="chap-title-row">
              <span class="chap-title">${chap.title}</span>
              <span class="chap-verse-count">${chap.verses.length} shlokas</span>
            </div>
            <span class="chap-sanskrit-tag">${chap.sanskrit_title}</span>
            <div class="tree-verses-sublist">
              ${chap.verses.map(v => `
                <span class="tree-verse-pill ${AppState.activeVerseId === v.id ? 'active' : ''}" 
                      data-verse-id="${v.id}" 
                      title="${v.citation}: ${v.sanskrit.split('\n')[0]}">
                  ${v.verse_number}
                </span>
              `).join('')}
            </div>
          `;

          // Click on chapter title row
          item.addEventListener('click', (e) => {
            if (e.target.classList.contains('tree-verse-pill')) {
              e.stopPropagation();
              const verseId = e.target.dataset.verseId;
              loadVerseDirectly(book.id, chap.id, verseId);
              return;
            }

            loadChapter(book.id, chap.id);
            if (window.innerWidth < 900) {
              DOM.appSidebar.classList.add('collapsed');
            }
          });

          list.appendChild(item);
        });

        bookNode.appendChild(header);
        bookNode.appendChild(list);
        DOM.canonTreeView.appendChild(bookNode);
      });
    });
  }

  function loadVerseDirectly(bookId, chapterId, verseId) {
    if (AppState.activeBookId !== bookId || AppState.activeChapterId !== chapterId) {
      loadChapter(bookId, chapterId);
    }
    
    AppState.activeVerseId = verseId;
    
    document.querySelectorAll('.tree-verse-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.verseId === verseId);
    });

    setTimeout(() => {
      highlightActiveVerseCard(verseId);
      const verse = findVerseById(verseId);
      if (verse) {
        DOM.audioCitation.textContent = verse.citation;
        DOM.audioSnippet.textContent = verse.sanskrit.split('\n')[0];
      }
    }, 100);

    if (window.innerWidth < 900) {
      DOM.appSidebar.classList.add('collapsed');
    }
  }

  function loadChapter(bookId, chapterId) {
    if (!AppState.database || !AppState.database.books) return;
    const book = AppState.database.books.find(b => b.id === bookId);
    if (!book) return;
    const chapter = book.chapters.find(c => c.id === chapterId) || book.chapters[0];
    if (!chapter) return;

    AppState.activeBookId = book.id;
    AppState.activeChapterId = chapter.id;
    DOM.bookQuickSelect.value = book.id;

    // Update Tree active class
    document.querySelectorAll('.chapter-node-item').forEach(el => {
      const match = el.dataset.chapterId === chapter.id && el.dataset.bookId === book.id;
      el.classList.toggle('active', match);
    });

    // Expand the parent book group node in the sidebar tree
    const activeBookNode = document.querySelector(`.book-group-node[data-book-id="${bookId}"]`);
    if (activeBookNode) {
      activeBookNode.classList.remove('collapsed');
    }

    // Update Hero and Scholarly Metadata
    DOM.heroCategory.textContent = book.category;
    DOM.heroBookTitle.textContent = book.title;
    DOM.heroChapterNum.textContent = `Section ${chapter.chapter_number}`;
    
    // Extended scholarly badges
    if (DOM.heroAuthorText) DOM.heroAuthorText.textContent = book.author || "Traditional Vedic Sage";
    if (DOM.heroTraditionText) DOM.heroTraditionText.textContent = book.tradition || "Sanatana Dharma";
    if (DOM.heroEraText) DOM.heroEraText.textContent = book.era || "Classical Era";

    DOM.heroSanskritTitle.textContent = chapter.sanskrit_title;
    DOM.heroTranslitTitle.textContent = chapter.title;
    DOM.heroSummary.textContent = chapter.summary;

    // Epigraph Check
    if (book.epigraph) {
      DOM.epigraphCard.style.display = 'block';
      DOM.epigraphSanskrit.textContent = book.epigraph;
      DOM.epigraphTrans.textContent = `"${book.epigraph_translation}"`;
    } else {
      DOM.epigraphCard.style.display = 'none';
    }

    // Render Verses
    renderVerses(chapter.verses);

    // Update Chapter Navigation Footer (Prev / Next)
    updateChapterNavFooter(book, chapter);

    // Prepare Audio Queue
    AppState.audio.queue = [...chapter.verses];
    AppState.audio.queueIndex = 0;
    if (chapter.verses.length > 0) {
      const firstVerse = chapter.verses[0];
      DOM.audioCitation.textContent = firstVerse.citation;
      DOM.audioSnippet.textContent = firstVerse.sanskrit.split('\n')[0];
    }

    // Scroll reader to top
    DOM.readerMain.scrollTop = 0;
  }

  function updateChapterNavFooter(book, currentChapter) {
    const currentIndex = book.chapters.findIndex(c => c.id === currentChapter.id);
    
    // Prev Chapter
    if (currentIndex > 0) {
      const prev = book.chapters[currentIndex - 1];
      DOM.prevChapterBtn.disabled = false;
      DOM.prevChapterTitle.textContent = prev.title;
      DOM.prevChapterBtn.onclick = () => loadChapter(book.id, prev.id);
    } else {
      DOM.prevChapterBtn.disabled = true;
      DOM.prevChapterTitle.textContent = 'Beginning';
      DOM.prevChapterBtn.onclick = null;
    }

    // Next Chapter
    if (currentIndex < book.chapters.length - 1) {
      const next = book.chapters[currentIndex + 1];
      DOM.nextChapterBtn.disabled = false;
      DOM.nextChapterTitle.textContent = next.title;
      DOM.nextChapterBtn.onclick = () => loadChapter(book.id, next.id);
    } else {
      DOM.nextChapterBtn.disabled = true;
      DOM.nextChapterTitle.textContent = 'End of Book';
      DOM.nextChapterBtn.onclick = null;
    }
  }

  // -------------------------------------------------------------------------
  // RENDER INTERLINEAR VERSES
  // -------------------------------------------------------------------------
  function renderVerses(verses) {
    DOM.versesContainer.innerHTML = '';

    verses.forEach((verse, idx) => {
      const card = document.createElement('article');
      card.className = `verse-card ${AppState.activeVerseId === verse.id ? 'active-playing' : ''}`;
      card.id = `card_${verse.id}`;
      card.dataset.verseId = verse.id;

      const isBookmarked = AppState.bookmarks.some(b => b.id === verse.id);

      // Format Devanagari Dandas
      const formattedSanskrit = formatDandas(verse.sanskrit);

      card.innerHTML = `
        <div class="verse-header-row">
          <div class="verse-tag-group">
            <span class="verse-citation-badge">${verse.citation}</span>
            ${verse.meter ? `<span class="verse-meter-badge">${verse.meter}</span>` : ''}
          </div>
          <div class="verse-actions-group">
            <button class="verse-action-btn play-verse-btn" title="Chant Verse" data-verse-id="${verse.id}">
              <span>▶</span>
            </button>
            <button class="verse-action-btn loop-verse-btn" title="Chant in Loop (Japa)" data-verse-id="${verse.id}">
              <span>↺</span>
            </button>
            <button class="verse-action-btn bookmark-verse-btn ${isBookmarked ? 'bookmarked' : ''}" title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Verse'}" data-verse-id="${verse.id}">
              <span>✦</span>
            </button>
            <button class="verse-action-btn copy-verse-btn" title="Copy Verse Citation" data-verse-id="${verse.id}">
              <span>⎘</span>
            </button>
          </div>
        </div>

        <!-- Devanagari Layer -->
        <div class="verse-sanskrit-block" style="display: ${AppState.visibleLayers.devanagari ? 'block' : 'none'};">
          <div class="sanskrit-text">${formattedSanskrit}</div>
        </div>

        <!-- IAST Transliteration Layer -->
        <div class="verse-iast-block" style="display: ${AppState.visibleLayers.iast ? 'block' : 'none'};">
          <div class="iast-text">${verse.transliteration}</div>
        </div>

        <!-- Word-by-Word Anvaya Pill Grid -->
        ${verse.word_meanings && verse.word_meanings.length > 0 ? `
          <div class="verse-anvaya-block" style="display: ${AppState.visibleLayers.anvaya ? 'block' : 'none'};">
            <div class="anvaya-toggle-header">
              <span>◈</span>
              <span>Word-by-Word Breakdown (पदच्छेद एवं अन्वय)</span>
            </div>
            <div class="anvaya-pill-grid">
              ${verse.word_meanings.map(w => `
                <div class="anvaya-pill" title="${w.iast}">
                  <span class="anvaya-sans">${w.sanskrit}</span>
                  <span class="anvaya-iast">${w.iast}</span>
                  <span class="anvaya-mean">${w.meaning}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Translations Layer -->
        <div class="verse-translations-layer">
          <div class="translation-box en" style="display: ${(AppState.langPreference !== 'hi' && AppState.visibleLayers.english) ? 'block' : 'none'};">
            <span class="trans-lang-tag">English Translation</span>
            <p class="trans-text-en">${verse.english}</p>
          </div>

          <div class="translation-box hi" style="display: ${(AppState.langPreference !== 'en' && AppState.visibleLayers.hindi) ? 'block' : 'none'};">
            <span class="trans-lang-tag">हिन्दी अनुवाद</span>
            <p class="trans-text-hi">${verse.hindi}</p>
          </div>
        </div>

        <!-- Commentary / Context Layer -->
        ${verse.commentary ? `
          <div class="verse-commentary-block" style="display: ${AppState.visibleLayers.commentary ? 'block' : 'none'};">
            <div class="commentary-label">❖ Philosophical Purport & Insight</div>
            <p class="commentary-text">${verse.commentary}</p>
          </div>
        ` : ''}
      `;

      // Event Listeners on Verse Card Buttons
      const playBtn = card.querySelector('.play-verse-btn');
      playBtn.addEventListener('click', () => {
        playSingleVerse(verse);
      });

      const loopBtn = card.querySelector('.loop-verse-btn');
      loopBtn.addEventListener('click', () => {
        AppState.audio.loopMode = 108; // Set to Japa 108 loop
        updateLoopBadge();
        playSingleVerse(verse);
        showToast('Japa Chanting Mode (108x) Activated', '↺');
      });

      const bmBtn = card.querySelector('.bookmark-verse-btn');
      bmBtn.addEventListener('click', () => {
        toggleBookmark(verse);
      });

      const copyBtn = card.querySelector('.copy-verse-btn');
      copyBtn.addEventListener('click', () => {
        copyVerseText(verse);
      });

      DOM.versesContainer.appendChild(card);
    });
  }

  function formatDandas(sanskritText) {
    return sanskritText
      .replace(/॥/g, '<span class="danda-glyph">॥</span>')
      .replace(/।/g, '<span class="danda-glyph">।</span>');
  }

  // -------------------------------------------------------------------------
  // BOOKMARK SYSTEM
  // -------------------------------------------------------------------------
  function toggleBookmark(verse) {
    const idx = AppState.bookmarks.findIndex(b => b.id === verse.id);
    if (idx >= 0) {
      AppState.bookmarks.splice(idx, 1);
      showToast(`Removed ${verse.citation} from Saved`, '✦');
    } else {
      AppState.bookmarks.push({
        id: verse.id,
        citation: verse.citation,
        bookId: AppState.activeBookId,
        chapterId: AppState.activeChapterId,
        sanskritSnippet: verse.sanskrit.split('\n')[0]
      });
      showToast(`Saved ${verse.citation} to Bookmarks`, '✦');
    }

    localStorage.setItem('antara_bookmarks', JSON.stringify(AppState.bookmarks));
    updateBookmarksUI();
    
    // Update active icon on card
    const card = document.getElementById(`card_${verse.id}`);
    if (card) {
      const bmBtn = card.querySelector('.bookmark-verse-btn');
      if (bmBtn) bmBtn.classList.toggle('bookmarked', idx < 0);
    }
  }

  function updateBookmarksUI() {
    const count = AppState.bookmarks.length;
    if (count > 0) {
      DOM.bookmarkCount.style.display = 'inline-block';
      DOM.bookmarkCount.textContent = count;
    } else {
      DOM.bookmarkCount.style.display = 'none';
    }

    DOM.bookmarksList.innerHTML = '';
    if (count === 0) {
      DOM.bookmarksList.innerHTML = `
        <div style="text-align:center; padding: 2rem 1rem; color: var(--text-muted); font-size: 0.82rem;">
          <span style="font-size: 1.5rem; display:block; margin-bottom:0.4rem; color: var(--accent-gold);">✦</span>
          No saved verses yet. Click the ✦ icon on any verse to bookmark.
        </div>
      `;
      return;
    }

    AppState.bookmarks.forEach(bm => {
      const item = document.createElement('div');
      item.className = 'bookmark-item-card';
      item.innerHTML = `
        <div class="bm-meta-row">
          <span class="bm-citation">${bm.citation}</span>
          <span class="bm-remove-btn" title="Remove bookmark" data-bm-id="${bm.id}">✕</span>
        </div>
        <span class="bm-snippet">${bm.sanskritSnippet}</span>
      `;

      item.addEventListener('click', (e) => {
        if (e.target.classList.contains('bm-remove-btn')) return;
        loadChapter(bm.bookId, bm.chapterId);
        setTimeout(() => {
          const targetCard = document.getElementById(`card_${bm.id}`);
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetCard.classList.add('active-playing');
            setTimeout(() => targetCard.classList.remove('active-playing'), 2500);
          }
        }, 150);
      });

      const removeBtn = item.querySelector('.bm-remove-btn');
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const verseObj = { id: bm.id, citation: bm.citation };
        toggleBookmark(verseObj);
      });

      DOM.bookmarksList.appendChild(item);
    });
  }

  // -------------------------------------------------------------------------
  // DUAL-MODE AUDIO & TEXT-TO-SPEECH CONTROLLER
  // -------------------------------------------------------------------------
  const NARRATION_LANGS = window.AntaraNarration.LANGS;

  function narrationLangFor(engine) {
    return window.AntaraNarration.langFor(engine, AppState.langPreference);
  }

  function resolveNarrationVoice(langDef) {
    const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    return window.AntaraNarration.resolveVoice(langDef, voices);
  }

  function resolveVerseAudioUrl(verse, langKey) {
    return window.AntaraNarration.resolveAudioUrl(verse, langKey);
  }

  function setNarrationStatus(message, kind) {
    if (!DOM.audioStatusNote) return;
    DOM.audioStatusNote.textContent = message || '';
    DOM.audioStatusNote.className = 'audio-status-note' + (kind ? ' is-' + kind : '');
    DOM.audioStatusNote.hidden = !message;
  }

  function reportNarrationUnavailable(langDef, reason) {
    stopCurrentAudio();
    clearInterval(AppState.audio.synthProgressTimer);
    AppState.audio.mode = 'idle';
    updatePlayPauseButtonUI();
    DOM.progressBarFill.style.width = '0%';
    DOM.audioCurrentTime.textContent = formatTime(0);
    setNarrationStatus('Narration unavailable — ' + reason, 'unavailable');
    showToast(langDef.label + ' narration unavailable on this device', '✕');
  }

  function playSingleVerse(verse) {
    AppState.activeVerseId = verse.id;
    highlightActiveVerseCard(verse.id);

    DOM.audioCitation.textContent = verse.citation;
    DOM.audioSnippet.textContent = verse.sanskrit.split('\n')[0];

    const langDef = narrationLangFor(AppState.audio.voiceEngine);
    const recorded = resolveVerseAudioUrl(verse, langDef.key);

    if (recorded) {
      playHtml5Audio(recorded, verse, langDef);
    } else {
      playSpeechSynthesis(verse, langDef);
    }
  }

  function playHtml5Audio(src, verse, langDef) {
    stopCurrentAudio();
    AppState.audio.mode = 'html5';
    DOM.htmlAudioPlayer.src = src;
    DOM.htmlAudioPlayer.playbackRate = AppState.audio.playbackRate;
    DOM.htmlAudioPlayer.volume = AppState.audio.volume;

    DOM.htmlAudioPlayer.play()
      .then(() => {
        AppState.audio.isPlaying = true;
        AppState.audio.isPaused = false;
        updatePlayPauseButtonUI();
        setNarrationStatus('Recorded narration', 'recorded');
      })
      .catch(() => {
        // The file is declared but unplayable (missing, wrong MIME type, blocked
        // autoplay). Fall back to synthesis rather than stalling on a dead src.
        playSpeechSynthesis(verse, langDef);
      });
  }

  function playSpeechSynthesis(verse, langDef, attempt = 0) {
    stopCurrentAudio();
    langDef = langDef || narrationLangFor(AppState.audio.voiceEngine);

    if (!('speechSynthesis' in window)) {
      reportNarrationUnavailable(langDef, 'this browser has no speech engine');
      return;
    }

    AppState.audio.mode = 'synth';
    window.speechSynthesis.cancel(); // Clear any pending

    // Voices load asynchronously and are often empty on the first call. Retry a
    // bounded number of times: the previous version recursed with no cap, which
    // looped once a second forever on machines with no TTS engine installed.
    if (window.speechSynthesis.getVoices().length === 0) {
      if (attempt >= 3) {
        reportNarrationUnavailable(langDef, 'no speech voices are installed on this device');
        return;
      }
      let retried = false;
      const retry = () => {
        if (retried) return;
        retried = true;
        window.speechSynthesis.removeEventListener('voiceschanged', retry);
        playSpeechSynthesis(verse, langDef, attempt + 1);
      };
      window.speechSynthesis.addEventListener('voiceschanged', retry);
      setTimeout(retry, 1000);
      return;
    }

    const selectedVoice = resolveNarrationVoice(langDef);

    // Root cause of the original silent failure: with no voice bound, Chromium
    // fires onstart then onend, produces no sound, and never fires onerror.
    // Refuse to start rather than animate a progress bar over silence.
    if (!selectedVoice) {
      reportNarrationUnavailable(langDef, 'no ' + langDef.label + ' voice is installed on this device');
      return;
    }

    const textToSpeak = langDef.text(verse) || '';
    if (!textToSpeak.trim()) {
      reportNarrationUnavailable(langDef, 'this verse has no text in the selected language');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    // Set a meditative, pleasant cadence
    utterance.rate = Math.max(0.6, Math.min(1.5, AppState.audio.playbackRate * 0.82));
    utterance.pitch = 0.94; // Resonant, natural pitch
    utterance.volume = AppState.audio.volume;
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;

    // Estimate duration for progress animation
    const words = textToSpeak.split(/\s+/).length;
    AppState.audio.synthEstimatedDuration = Math.max(3, (words / (1.5 * AppState.audio.playbackRate)));
    AppState.audio.synthElapsed = 0;

    let startedAt = 0;

    utterance.onstart = () => {
      startedAt = Date.now();
      AppState.audio.isPlaying = true;
      AppState.audio.isPaused = false;
      updatePlayPauseButtonUI();
      startSynthProgressSimulation();
      setNarrationStatus('Browser narration — ' + selectedVoice.name, 'synth');
      // Ensure visual sync: highlight card and scroll
      highlightActiveVerseCard(verse.id);
    };

    utterance.onend = () => {
      clearInterval(AppState.audio.synthProgressTimer);
      // Speaking a full verse cannot complete in a few hundred milliseconds. If
      // it did, the engine accepted the utterance and emitted nothing - the
      // silent-failure case - so report it instead of advancing the queue.
      if (startedAt && Date.now() - startedAt < 400 && textToSpeak.length > 20) {
        reportNarrationUnavailable(langDef, 'the speech engine produced no audio');
        return;
      }
      handleAudioTrackEnded();
    };

    utterance.onerror = (e) => {
      clearInterval(AppState.audio.synthProgressTimer);
      AppState.audio.isPlaying = false;
      updatePlayPauseButtonUI();
      // 'canceled'/'interrupted' fire whenever we intentionally stop/replace
      // an utterance (switching verses, closing the page) - not real failures.
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        reportNarrationUnavailable(langDef, e.error || 'the speech engine reported an error');
      }
    };

    AppState.audio.synthUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  // Grey out voice options this device cannot actually narrate, so the picker
  // never advertises a language that will fail.
  function refreshVoiceOptionAvailability() {
    if (!DOM.voiceSelect) return;
    Array.from(DOM.voiceSelect.options).forEach(opt => {
      const langDef = opt.value === 'auto' ? null : NARRATION_LANGS[opt.value];
      if (!langDef) return;
      const available = !!resolveNarrationVoice(langDef);
      opt.disabled = !available;
      const base = opt.dataset.baseLabel || (opt.dataset.baseLabel = opt.textContent);
      opt.textContent = available ? base : base + ' — unavailable';
    });
  }

  function startSynthProgressSimulation() {
    clearInterval(AppState.audio.synthProgressTimer);
    const duration = AppState.audio.synthEstimatedDuration;
    DOM.audioTotalTime.textContent = formatTime(duration);

    const stepMs = 100;
    AppState.audio.synthProgressTimer = setInterval(() => {
      if (AppState.audio.isPaused) return;

      AppState.audio.synthElapsed += stepMs / 1000;
      const progress = Math.min(1, AppState.audio.synthElapsed / duration);

      DOM.audioCurrentTime.textContent = formatTime(AppState.audio.synthElapsed);
      DOM.progressBarFill.style.width = `${progress * 100}%`;

      if (AppState.audio.synthElapsed >= duration) {
        clearInterval(AppState.audio.synthProgressTimer);
      }
    }, stepMs);
  }

  function handleAudioTrackEnded() {
    AppState.audio.currentLoopCount++;

    // Check Japa / Repetition loop
    if (AppState.audio.currentLoopCount < AppState.audio.loopMode) {
      // Re-chant current verse
      const verse = findVerseById(AppState.activeVerseId);
      if (verse) {
        setTimeout(() => playSingleVerse(verse), 600);
        return;
      }
    }

    // Reset loop count for next verse
    AppState.audio.currentLoopCount = 0;

    // Move to next verse in queue if available
    const nextIndex = AppState.audio.queue.findIndex(v => v.id === AppState.activeVerseId) + 1;
    if (nextIndex < AppState.audio.queue.length) {
      const nextVerse = AppState.audio.queue[nextIndex];
      setTimeout(() => playSingleVerse(nextVerse), 700);
    } else {
      AppState.audio.isPlaying = false;
      AppState.audio.isPaused = false;
      updatePlayPauseButtonUI();
      DOM.progressBarFill.style.width = '0%';
    }
  }

  function stopCurrentAudio() {
    clearInterval(AppState.audio.synthProgressTimer);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (DOM.htmlAudioPlayer) {
      DOM.htmlAudioPlayer.pause();
      DOM.htmlAudioPlayer.currentTime = 0;
    }
    AppState.audio.isPlaying = false;
    AppState.audio.isPaused = false;
  }

  function togglePlayPause() {
    if (!AppState.activeVerseId) {
      // Start from first verse in current chapter
      if (AppState.audio.queue.length > 0) {
        playSingleVerse(AppState.audio.queue[0]);
      }
      return;
    }

    if (AppState.audio.mode === 'html5') {
      if (DOM.htmlAudioPlayer.paused) {
        DOM.htmlAudioPlayer.play();
        AppState.audio.isPlaying = true;
        AppState.audio.isPaused = false;
      } else {
        DOM.htmlAudioPlayer.pause();
        AppState.audio.isPlaying = false;
        AppState.audio.isPaused = true;
      }
      updatePlayPauseButtonUI();
    } else {
      // Speech Synthesis mode
      if (AppState.audio.isPlaying && !AppState.audio.isPaused) {
        window.speechSynthesis.pause();
        AppState.audio.isPlaying = false;
        AppState.audio.isPaused = true;
        updatePlayPauseButtonUI();
      } else if (AppState.audio.isPaused) {
        window.speechSynthesis.resume();
        AppState.audio.isPlaying = true;
        AppState.audio.isPaused = false;
        updatePlayPauseButtonUI();
      } else {
        const verse = findVerseById(AppState.activeVerseId);
        if (verse) playSingleVerse(verse);
      }
    }
  }

  function updatePlayPauseButtonUI() {
    const isLive = AppState.audio.isPlaying && !AppState.audio.isPaused;
    DOM.mainPlayGlyph.textContent = isLive ? '❚❚' : '▶';

    // Update active highlight on card play buttons
    document.querySelectorAll('.play-verse-btn').forEach(btn => {
      const isThisCard = btn.dataset.verseId === AppState.activeVerseId;
      btn.classList.toggle('active-play', isThisCard && isLive);
      btn.innerHTML = isThisCard && isLive ? '<span>❚❚</span>' : '<span>▶</span>';
    });
  }

  function playNextVerse() {
    const idx = AppState.audio.queue.findIndex(v => v.id === AppState.activeVerseId);
    if (idx >= 0 && idx < AppState.audio.queue.length - 1) {
      AppState.audio.currentLoopCount = 0;
      playSingleVerse(AppState.audio.queue[idx + 1]);
    } else {
      showToast('Reached end of chapter', '❖');
    }
  }

  function playPrevVerse() {
    const idx = AppState.audio.queue.findIndex(v => v.id === AppState.activeVerseId);
    if (idx > 0) {
      AppState.audio.currentLoopCount = 0;
      playSingleVerse(AppState.audio.queue[idx - 1]);
    }
  }

  function cycleLoopMode() {
    const modes = [1, 3, 9, 21, 108, Infinity];
    const currentIndex = modes.indexOf(AppState.audio.loopMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    AppState.audio.loopMode = modes[nextIndex];
    AppState.audio.currentLoopCount = 0;
    updateLoopBadge();
    
    const label = AppState.audio.loopMode === Infinity ? 'Infinite Chanting Loop' : `Repeat ${AppState.audio.loopMode}×`;
    showToast(label, '↺');
  }

  function updateLoopBadge() {
    if (AppState.audio.loopMode === Infinity) {
      DOM.loopBadge.textContent = '∞';
    } else {
      DOM.loopBadge.textContent = `${AppState.audio.loopMode}×`;
    }
  }

  function cyclePlaybackSpeed() {
    const speeds = [0.75, 1.0, 1.25, 1.5];
    const currentIndex = speeds.indexOf(AppState.audio.playbackRate);
    const nextIndex = (currentIndex + 1) % speeds.length;
    AppState.audio.playbackRate = speeds[nextIndex];

    DOM.speedLabel.textContent = `${AppState.audio.playbackRate}×`;
    DOM.htmlAudioPlayer.playbackRate = AppState.audio.playbackRate;
    
    showToast(`Recitation Speed: ${AppState.audio.playbackRate}×`, '◈');
  }

  function highlightActiveVerseCard(verseId) {
    document.querySelectorAll('.verse-card').forEach(card => {
      card.classList.toggle('active-playing', card.dataset.verseId === verseId);
    });

    const targetCard = document.getElementById(`card_${verseId}`);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function findVerseById(verseId) {
    if (!AppState.database) return null;
    for (const book of AppState.database.books) {
      for (const chap of book.chapters) {
        const found = chap.verses.find(v => v.id === verseId);
        if (found) return found;
      }
    }
    return null;
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // -------------------------------------------------------------------------
  // FULL-TEXT SEARCH ENGINE
  // -------------------------------------------------------------------------
  function highlightTerm(text, query) {
    if (!text || !query) return text;
    const escaped = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  function performSearch(query, categoryFilter = 'all') {
    if (!AppState.database || !query || query.trim().length === 0) {
      DOM.searchResultsList.innerHTML = `
        <div class="search-empty-prompt">
          <span class="empty-glyph">✧</span>
          <p>Type keywords such as <em>"karma"</em>, <em>"Agni"</em>, <em>"Brahman"</em>, <em>"2.47"</em>, or <em>"सत्यम्"</em></p>
        </div>
      `;
      return;
    }

    const q = query.trim().toLowerCase();
    const results = [];

    AppState.database.books.forEach(book => {
      if (categoryFilter !== 'all' && book.category_id !== categoryFilter) {
        return;
      }

      book.chapters.forEach(chap => {
        chap.verses.forEach(verse => {
          const matchSans = verse.sanskrit.toLowerCase().includes(q);
          const matchIast = verse.transliteration.toLowerCase().includes(q);
          const matchEng = verse.english.toLowerCase().includes(q);
          const matchHin = verse.hindi.toLowerCase().includes(q);
          const matchCit = verse.citation.toLowerCase().includes(q);
          const matchNum = verse.verse_number.toLowerCase().includes(q);
          const matchBook = book.title.toLowerCase().includes(q) || book.sanskrit_title.toLowerCase().includes(q);
          const matchChap = chap.title.toLowerCase().includes(q) || (chap.sanskrit_title && chap.sanskrit_title.toLowerCase().includes(q));

          if (matchSans || matchIast || matchEng || matchHin || matchCit || matchNum || matchBook || matchChap) {
            results.push({
              verse,
              book,
              chap
            });
          }
        });
      });
    });

    if (results.length === 0) {
      DOM.searchResultsList.innerHTML = `
        <div class="search-empty-prompt">
          <span class="empty-glyph">✕</span>
          <p>No sacred manuscripts matched "<strong>${escapeHtml(query)}</strong>"${categoryFilter !== 'all' ? ' in this category' : ''}.</p>
        </div>
      `;
      return;
    }

    DOM.searchResultsList.innerHTML = '';
    results.forEach(res => {
      const card = document.createElement('div');
      card.className = 'search-result-card';
      
      let snippetHTML = '';
      
      // Always show first line of Sanskrit with highlight
      const highlightedSans = highlightTerm(res.verse.sanskrit.split('\n')[0], q);
      snippetHTML += `<div class="search-res-sans">${highlightedSans}</div>`;

      // Show IAST if it matches
      if (res.verse.transliteration.toLowerCase().includes(q)) {
        snippetHTML += `<div class="search-res-iast" style="font-size: 0.82rem; font-style: italic; color: var(--accent-gold); margin-top: 0.2rem;">${highlightTerm(res.verse.transliteration.split('\n')[0], q)}</div>`;
      }

      // Show English if it matches, or if Hindi/IAST do not match
      const matchEng = res.verse.english.toLowerCase().includes(q);
      const matchHin = res.verse.hindi.toLowerCase().includes(q);

      if (matchEng || (!matchHin && !res.verse.transliteration.toLowerCase().includes(q))) {
        const engText = res.verse.english.length > 130 ? res.verse.english.slice(0, 130) + '...' : res.verse.english;
        snippetHTML += `<p class="search-res-trans">${highlightTerm(engText, q)}</p>`;
      }

      // Show Hindi if it matches
      if (matchHin) {
        const hinText = res.verse.hindi.length > 130 ? res.verse.hindi.slice(0, 130) + '...' : res.verse.hindi;
        snippetHTML += `<p class="search-res-trans-hindi">${highlightTerm(hinText, q)}</p>`;
      }

      card.innerHTML = `
        <span class="search-res-citation">${highlightTerm(res.verse.citation, q)} — ${highlightTerm(res.book.title, q)} (${highlightTerm(res.chap.title, q)})</span>
        ${snippetHTML}
      `;

      card.addEventListener('click', () => {
        closeSearchModal();
        loadVerseDirectly(res.book.id, res.chap.id, res.verse.id);
      });

      DOM.searchResultsList.appendChild(card);
    });
  }

  function openSearchModal() {
    DOM.searchModal.style.display = 'flex';
    DOM.globalSearchInput.value = '';
    DOM.globalSearchInput.focus();
    
    // Reset category filter tags to 'all'
    document.querySelectorAll('.search-filter-tag').forEach(t => {
      t.classList.toggle('active', t.dataset.filter === 'all');
    });

    performSearch('');
  }

  function closeSearchModal() {
    DOM.searchModal.style.display = 'none';
  }

  function openLayersModal() {
    DOM.layersModal.style.display = 'flex';
    DOM.layerDevanagari.checked = AppState.visibleLayers.devanagari;
    DOM.layerIast.checked = AppState.visibleLayers.iast;
    DOM.layerWordMeanings.checked = AppState.visibleLayers.anvaya;
    DOM.layerEnglish.checked = AppState.visibleLayers.english;
    DOM.layerHindi.checked = AppState.visibleLayers.hindi;
    DOM.layerCommentary.checked = AppState.visibleLayers.commentary;
  }

  function closeLayersModal() {
    DOM.layersModal.style.display = 'none';
  }

  function saveLayerPreferences() {
    AppState.visibleLayers = {
      devanagari: DOM.layerDevanagari.checked,
      iast: DOM.layerIast.checked,
      anvaya: DOM.layerWordMeanings.checked,
      english: DOM.layerEnglish.checked,
      hindi: DOM.layerHindi.checked,
      commentary: DOM.layerCommentary.checked
    };
    localStorage.setItem('antara_layers', JSON.stringify(AppState.visibleLayers));
    
    // Re-render current chapter to apply
    const book = AppState.database.books.find(b => b.id === AppState.activeBookId);
    if (book) {
      const chapter = book.chapters.find(c => c.id === AppState.activeChapterId);
      if (chapter) renderVerses(chapter.verses);
    }

    closeLayersModal();
    showToast('Display layers updated', '◈');
  }

  // -------------------------------------------------------------------------
  // CLIPBOARD & UTILITIES
  // -------------------------------------------------------------------------
  function copyVerseText(verse) {
    const textToCopy = `॥ ${verse.citation} ॥\n\n${verse.sanskrit}\n\nIAST:\n${verse.transliteration}\n\nEnglish:\n${verse.english}\n\nहिन्दी:\n${verse.hindi}\n\n— Antara Classical Heritage Library`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied ${verse.citation} citation`, '⎘');
      }).catch(() => {
        fallbackCopy(textToCopy);
      });
    } else {
      fallbackCopy(textToCopy);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('Copied citation to clipboard', '⎘');
    } catch (e) {
      showToast('Could not copy to clipboard', '✕');
    }
    document.body.removeChild(textarea);
  }

  let toastTimer = null;
  function showToast(message, glyph = '✦') {
    clearTimeout(toastTimer);
    DOM.toastGlyph.textContent = glyph;
    DOM.toastMsg.textContent = message;
    DOM.toastBox.classList.add('show');
    toastTimer = setTimeout(() => {
      DOM.toastBox.classList.remove('show');
    }, 2800);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // -------------------------------------------------------------------------
  // EVENT LISTENERS SETUP
  // -------------------------------------------------------------------------
  function setupEventListeners() {
    // Theme Toggle
    DOM.themeToggleBtn.addEventListener('click', toggleTheme);

    // Sidebar Toggle
    DOM.sidebarToggle.addEventListener('click', () => {
      DOM.appSidebar.classList.toggle('collapsed');
    });

    // Book Quick Selector
    DOM.bookQuickSelect.addEventListener('change', (e) => {
      const bookId = e.target.value;
      const book = AppState.database.books.find(b => b.id === bookId);
      if (book && book.chapters.length > 0) {
        loadChapter(bookId, book.chapters[0].id);
      }
    });

    // Brand Return
    DOM.brandHomeBtn.addEventListener('click', () => {
      if (AppState.database && AppState.database.books.length > 0) {
        loadChapter('bhagavad_gita', 'bg_ch_02');
      }
    });

    // Tabs
    DOM.tabCatalog.addEventListener('click', () => {
      DOM.tabCatalog.classList.add('active');
      DOM.tabBookmarks.classList.remove('active');
      DOM.tabDhyana.classList.remove('active');
      DOM.catalogTabPane.style.display = 'flex';
      DOM.bookmarksTabPane.style.display = 'none';
      DOM.dhyanaTabPane.style.display = 'none';
    });

    DOM.tabBookmarks.addEventListener('click', () => {
      DOM.tabBookmarks.classList.add('active');
      DOM.tabCatalog.classList.remove('active');
      DOM.tabDhyana.classList.remove('active');
      DOM.bookmarksTabPane.style.display = 'flex';
      DOM.catalogTabPane.style.display = 'none';
      DOM.dhyanaTabPane.style.display = 'none';
      updateBookmarksUI();
    });

    DOM.tabDhyana.addEventListener('click', () => {
      DOM.tabDhyana.classList.add('active');
      DOM.tabCatalog.classList.remove('active');
      DOM.tabBookmarks.classList.remove('active');
      DOM.dhyanaTabPane.style.display = 'flex';
      DOM.catalogTabPane.style.display = 'none';
      DOM.bookmarksTabPane.style.display = 'none';
    });

    DOM.savedVersesBtn.addEventListener('click', () => {
      DOM.tabBookmarks.click();
      if (DOM.appSidebar.classList.contains('collapsed')) {
        DOM.appSidebar.classList.remove('collapsed');
      }
    });

    DOM.clearAllBookmarksBtn.addEventListener('click', () => {
      if (confirm('Clear all saved bookmarks?')) {
        AppState.bookmarks = [];
        localStorage.removeItem('antara_bookmarks');
        updateBookmarksUI();
        // Update all bookmarked buttons
        document.querySelectorAll('.bookmark-verse-btn').forEach(btn => btn.classList.remove('bookmarked'));
        showToast('All bookmarks cleared', '✦');
      }
    });

    // Category Chips Filter
    if (DOM.sidebarCategoryChips) {
      DOM.sidebarCategoryChips.querySelectorAll('.cat-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          DOM.sidebarCategoryChips.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          AppState.activeCategory = chip.dataset.category || 'all';
          renderCanonTree(DOM.sidebarFilter.value);
        });
      });
    }

    // Sidebar Filter Input
    DOM.sidebarFilter.addEventListener('input', (e) => {
      const val = e.target.value;
      DOM.clearFilterBtn.style.display = val ? 'block' : 'none';
      renderCanonTree(val);
    });

    DOM.clearFilterBtn.addEventListener('click', () => {
      DOM.sidebarFilter.value = '';
      DOM.clearFilterBtn.style.display = 'none';
      renderCanonTree('');
    });

    // Tanpura Drone Toggle
    DOM.tanpuraToggleBtn.addEventListener('click', toggleTanpura);

    // Dhyana Sanctuary Play Toggles
    const btnPlayTanpura = document.getElementById('btnPlayTanpura');
    if (btnPlayTanpura) {
      btnPlayTanpura.addEventListener('click', toggleTanpura);
    }

    const btnPlayOm = document.getElementById('btnPlayOm');
    if (btnPlayOm) {
      btnPlayOm.addEventListener('click', () => {
        if (AppState.dhyana.activeSounds.om) {
          stopOmDrone();
        } else {
          startOmDrone();
        }
      });
    }

    const btnPlayBells = document.getElementById('btnPlayBells');
    if (btnPlayBells) {
      btnPlayBells.addEventListener('click', () => {
        if (AppState.dhyana.activeSounds.bells) {
          stopBellsAmbient();
        } else {
          startBellsAmbient();
        }
      });
    }

    const btnPlayFlute = document.getElementById('btnPlayFlute');
    if (btnPlayFlute) {
      btnPlayFlute.addEventListener('click', () => {
        if (AppState.dhyana.activeSounds.flute) {
          stopFluteAmbient();
        } else {
          startFluteAmbient();
        }
      });
    }

    const btnPlayBowls = document.getElementById('btnPlayBowls');
    if (btnPlayBowls) {
      btnPlayBowls.addEventListener('click', () => {
        if (AppState.dhyana.activeSounds.bowls) {
          stopBowlsAmbient();
        } else {
          startBowlsAmbient();
        }
      });
    }

    const btnPlayRain = document.getElementById('btnPlayRain');
    if (btnPlayRain) {
      btnPlayRain.addEventListener('click', () => {
        if (AppState.dhyana.activeSounds.rain) {
          stopRainAmbient();
        } else {
          startRainAmbient();
        }
      });
    }

    const btnPlayJapa = document.getElementById('btnPlayJapa');
    if (btnPlayJapa) {
      btnPlayJapa.addEventListener('click', () => {
        if (AppState.dhyana.activeSounds.japa) {
          stopJapaAmbient();
        } else {
          startJapaAmbient();
        }
      });
    }

    const btnPlayRaga = document.getElementById('btnPlayRaga');
    if (btnPlayRaga) {
      btnPlayRaga.addEventListener('click', () => {
        if (AppState.dhyana.activeSounds.raga) {
          stopRagaAmbient();
        } else {
          startRagaAmbient();
        }
      });
    }

    const btnPlayNight = document.getElementById('btnPlayNight');
    if (btnPlayNight) {
      btnPlayNight.addEventListener('click', () => {
        if (AppState.dhyana.activeSounds.night) {
          stopNightAmbient();
        } else {
          startNightAmbient();
        }
      });
    }

    // Dhyana Sanctuary Volume Sliders
    const sliderVolTanpura = document.getElementById('sliderVolTanpura');
    if (sliderVolTanpura) {
      sliderVolTanpura.addEventListener('input', (e) => {
        adjustDhyanaVolume('tanpura', parseFloat(e.target.value));
      });
    }

    const sliderVolOm = document.getElementById('sliderVolOm');
    if (sliderVolOm) {
      sliderVolOm.addEventListener('input', (e) => {
        adjustDhyanaVolume('om', parseFloat(e.target.value));
      });
    }

    const sliderVolBells = document.getElementById('sliderVolBells');
    if (sliderVolBells) {
      sliderVolBells.addEventListener('input', (e) => {
        adjustDhyanaVolume('bells', parseFloat(e.target.value));
      });
    }

    const sliderVolFlute = document.getElementById('sliderVolFlute');
    if (sliderVolFlute) {
      sliderVolFlute.addEventListener('input', (e) => {
        adjustDhyanaVolume('flute', parseFloat(e.target.value));
      });
    }

    const sliderVolBowls = document.getElementById('sliderVolBowls');
    if (sliderVolBowls) {
      sliderVolBowls.addEventListener('input', (e) => {
        adjustDhyanaVolume('bowls', parseFloat(e.target.value));
      });
    }

    const sliderVolRain = document.getElementById('sliderVolRain');
    if (sliderVolRain) {
      sliderVolRain.addEventListener('input', (e) => {
        adjustDhyanaVolume('rain', parseFloat(e.target.value));
      });
    }

    const sliderVolJapa = document.getElementById('sliderVolJapa');
    if (sliderVolJapa) {
      sliderVolJapa.addEventListener('input', (e) => {
        adjustDhyanaVolume('japa', parseFloat(e.target.value));
      });
    }

    const sliderVolRaga = document.getElementById('sliderVolRaga');
    if (sliderVolRaga) {
      sliderVolRaga.addEventListener('input', (e) => {
        adjustDhyanaVolume('raga', parseFloat(e.target.value));
      });
    }

    const sliderVolNight = document.getElementById('sliderVolNight');
    if (sliderVolNight) {
      sliderVolNight.addEventListener('input', (e) => {
        adjustDhyanaVolume('night', parseFloat(e.target.value));
      });
    }

    // Dhyana Sanctuary Timer Controls
    document.querySelectorAll('.timer-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (btn.id === 'customTimerBtn') {
          const val = prompt('Enter custom meditation duration (in minutes):', '15');
          if (val) {
            const mins = parseInt(val);
            if (!isNaN(mins) && mins > 0) {
              startDhyanaTimer(mins);
            } else {
              showToast('Invalid duration entered', '✕');
            }
          }
        } else {
          const mins = parseInt(btn.dataset.minutes);
          if (!isNaN(mins)) {
            startDhyanaTimer(mins);
          }
        }
      });
    });

    const cancelTimerBtn = document.getElementById('cancelTimerBtn');
    if (cancelTimerBtn) {
      cancelTimerBtn.addEventListener('click', stopDhyanaTimer);
    }

    // Language Filter Buttons
    DOM.langDualBtn.addEventListener('click', () => applyLanguagePreference('dual'));
    DOM.langEnBtn.addEventListener('click', () => applyLanguagePreference('en'));
    DOM.langHiBtn.addEventListener('click', () => applyLanguagePreference('hi'));

    // Hero Action Buttons
    DOM.playAllChapterBtn.addEventListener('click', () => {
      if (AppState.audio.queue.length > 0) {
        playSingleVerse(AppState.audio.queue[0]);
      }
    });

    DOM.focusModeBtn.addEventListener('click', () => {
      DOM.appSidebar.classList.toggle('collapsed');
      showToast('Focus Mode Toggled', '⟡');
    });

    // Sticky Bottom Audio Controls
    DOM.audioPlayPauseBtn.addEventListener('click', togglePlayPause);
    DOM.audioNextBtn.addEventListener('click', playNextVerse);
    DOM.audioPrevBtn.addEventListener('click', playPrevVerse);
    DOM.audioLoopBtn.addEventListener('click', cycleLoopMode);
    DOM.audioSpeedBtn.addEventListener('click', cyclePlaybackSpeed);

    // Audio Voice Selector
    DOM.voiceSelect.addEventListener('change', (e) => {
      AppState.audio.voiceEngine = e.target.value;
      setNarrationStatus('', null);
      const langDef = narrationLangFor(e.target.value);
      if (resolveNarrationVoice(langDef)) {
        showToast(`Recitation Voice: ${e.target.options[e.target.selectedIndex].text}`, '◎');
      } else {
        setNarrationStatus(
          'Narration unavailable — no ' + langDef.label + ' voice is installed on this device',
          'unavailable'
        );
      }
    });

    // Voices arrive asynchronously, so re-check availability when they land.
    refreshVoiceOptionAvailability();
    if (window.speechSynthesis) {
      window.speechSynthesis.addEventListener('voiceschanged', refreshVoiceOptionAvailability);
    }

    // Volume Slider & Mute
    DOM.volumeSlider.addEventListener('input', (e) => {
      const vol = parseFloat(e.target.value);
      AppState.audio.volume = vol;
      DOM.htmlAudioPlayer.volume = vol;
      DOM.volGlyph.textContent = vol === 0 ? '✕' : '☵';
    });

    DOM.volumeMuteBtn.addEventListener('click', () => {
      if (AppState.audio.volume > 0) {
        DOM.volumeSlider.dataset.prevVol = AppState.audio.volume;
        AppState.audio.volume = 0;
        DOM.volumeSlider.value = 0;
        DOM.htmlAudioPlayer.volume = 0;
        DOM.volGlyph.textContent = '✕';
      } else {
        const prev = parseFloat(DOM.volumeSlider.dataset.prevVol || '0.9');
        AppState.audio.volume = prev;
        DOM.volumeSlider.value = prev;
        DOM.htmlAudioPlayer.volume = prev;
        DOM.volGlyph.textContent = '☵';
      }
    });

    DOM.audioCloseBtn.addEventListener('click', () => {
      stopCurrentAudio();
      highlightActiveVerseCard(null);
      DOM.progressBarFill.style.width = '0%';
    });

    // Scrubber click
    DOM.progressBarContainer.addEventListener('click', (e) => {
      const rect = DOM.progressBarContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));

      if (AppState.audio.mode === 'html5' && DOM.htmlAudioPlayer.duration) {
        DOM.htmlAudioPlayer.currentTime = ratio * DOM.htmlAudioPlayer.duration;
      } else if (AppState.audio.mode === 'synth') {
        AppState.audio.synthElapsed = ratio * AppState.audio.synthEstimatedDuration;
        DOM.progressBarFill.style.width = `${ratio * 100}%`;
      }
    });

    // HTML5 Audio Events
    DOM.htmlAudioPlayer.addEventListener('timeupdate', () => {
      if (DOM.htmlAudioPlayer.duration) {
        const cur = DOM.htmlAudioPlayer.currentTime;
        const dur = DOM.htmlAudioPlayer.duration;
        DOM.audioCurrentTime.textContent = formatTime(cur);
        DOM.audioTotalTime.textContent = formatTime(dur);
        DOM.progressBarFill.style.width = `${(cur / dur) * 100}%`;
      }
    });

    DOM.htmlAudioPlayer.addEventListener('ended', handleAudioTrackEnded);

    // Layer Settings Modal
    DOM.viewOptionsBtn.addEventListener('click', openLayersModal);
    DOM.closeLayersModalBtn.addEventListener('click', closeLayersModal);
    DOM.applyLayersBtn.addEventListener('click', saveLayerPreferences);

    // Font Scale
    DOM.fontScaleUp.addEventListener('click', () => {
      const next = Math.min(1.6, AppState.sanskritScale + 0.1);
      applySanskritScale(next);
    });

    DOM.fontScaleDown.addEventListener('click', () => {
      const next = Math.max(0.7, AppState.sanskritScale - 0.1);
      applySanskritScale(next);
    });

    // Search Trigger & Modal
    DOM.searchTrigger.addEventListener('click', openSearchModal);
    DOM.closeSearchModalBtn.addEventListener('click', closeSearchModal);

    // Search Category Filter Tags
    document.querySelectorAll('.search-filter-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        document.querySelectorAll('.search-filter-tag').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        performSearch(DOM.globalSearchInput.value, tag.dataset.filter || 'all');
      });
    });

    DOM.globalSearchInput.addEventListener('input', (e) => {
      const activeTag = document.querySelector('.search-filter-tag.active');
      const cat = activeTag ? (activeTag.dataset.filter || 'all') : 'all';
      performSearch(e.target.value, cat);
    });

    // Asynchronous Voice Loading Fix
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        // Trigger a call to populate local voice list cache
        window.speechSynthesis.getVoices();
      });
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K for Search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearchModal();
      }
      // Escape closes modals
      if (e.key === 'Escape') {
        closeSearchModal();
        closeLayersModal();
      }
      // Spacebar plays/pauses if not in input
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        togglePlayPause();
      }
    });

    // Close Modals on clicking backdrop
    [DOM.layersModal, DOM.searchModal].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    });
  }

  // Execute on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
