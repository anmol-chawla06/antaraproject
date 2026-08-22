/**
 * Loads each front end's scripts in the same order its HTML page does, under a
 * mocked DOM, to catch syntax and top-level runtime errors before a browser does.
 *
 * The script lists must mirror the <script> tags in the corresponding page.
 */
const fs = require('fs');
const vm = require('vm');

// Each bundle matches one HTML entry point. app.js reads globals defined by
// map-data.js and data.js, so order matters here exactly as it does in map.html.
const bundles = [
  { page: 'map.html', files: ['map-data.js', 'data.js', 'app.js'] },
  { page: 'library.html', files: ['texts_data.js', 'narration.js', 'library.js'] }
];

function makeElement() {
  const el = {
    style: { setProperty() {}, removeProperty() {}, getPropertyValue() { return ''; } },
    dataset: {},
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    options: [],
    textContent: '',
    innerHTML: '',
    value: '',
    hidden: false,
    disabled: false,
    addEventListener() {},
    removeEventListener() {},
    appendChild() {},
    removeChild() {},
    setAttribute() {},
    removeAttribute() {},
    getAttribute() { return null; },
    querySelector() { return makeElement(); },
    querySelectorAll() { return []; },
    getBoundingClientRect() { return { top: 0, left: 0, width: 0, height: 0, bottom: 0, right: 0 }; },
    scrollIntoView() {},
    focus() {},
    closest() { return null; },
    play() { return Promise.resolve(); },
    pause() {},
    // Canvas contexts are exercised by both the map and the library visualiser.
    getContext() {
      return new Proxy({}, {
        get: (_t, prop) => {
          if (prop === 'createLinearGradient') return () => ({ addColorStop() {} });
          if (prop === 'canvas') return { width: 0, height: 0 };
          return () => {};
        },
        set: () => true
      });
    }
  };
  return el;
}

function createSandbox() {
  const sandbox = {
    console,
    setTimeout: () => 0,
    clearTimeout: () => {},
    setInterval: () => 0,
    clearInterval: () => {},
    requestAnimationFrame: () => 0,
    cancelAnimationFrame: () => {},
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    navigator: { clipboard: {}, userAgent: 'node' },
    matchMedia: () => ({
      matches: false,
      addEventListener() {}, removeEventListener() {},
      addListener() {}, removeListener() {}
    }),
    fetch: () => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }),
    AudioContext: class {
      constructor() { this.destination = {}; this.currentTime = 0; }
      createOscillator() { return { connect() {}, start() {}, stop() {}, frequency: { setValueAtTime() {}, value: 0 }, type: '' }; }
      createGain() { return { connect() {}, gain: { setValueAtTime() {}, value: 0, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {} } }; }
      createAnalyser() { return { connect() {}, fftSize: 0, frequencyBinCount: 8, getByteFrequencyData() {} }; }
      createBiquadFilter() { return { connect() {}, frequency: { setValueAtTime() {}, value: 0 }, type: '' }; }
      resume() { return Promise.resolve(); }
    },
    SpeechSynthesisUtterance: class { constructor(text) { this.text = text; } },
    speechSynthesis: {
      getVoices: () => [],
      speak() {}, cancel() {}, pause() {}, resume() {},
      addEventListener() {}, removeEventListener() {}
    },
    Image: class {},
    performance: { now: () => 0 },
    getComputedStyle: () => ({ getPropertyValue: () => '' }),
    addEventListener: () => {},
    removeEventListener: () => {},
    scrollTo: () => {},
    innerWidth: 1280,
    innerHeight: 800,
    devicePixelRatio: 1,
    location: { href: 'http://localhost/', hash: '', search: '', pathname: '/' },
    history: { pushState() {}, replaceState() {} }
  };

  sandbox.webkitAudioContext = sandbox.AudioContext;
  sandbox.document = {
    readyState: 'complete',
    documentElement: makeElement(),
    body: makeElement(),
    head: makeElement(),
    addEventListener() {},
    removeEventListener() {},
    getElementById: () => makeElement(),
    querySelector: () => makeElement(),
    querySelectorAll: () => [],
    createElement: () => makeElement(),
    createElementNS: () => makeElement(),
    createDocumentFragment: () => makeElement()
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;

  vm.createContext(sandbox);
  return sandbox;
}

let failed = false;

bundles.forEach(({ page, files }) => {
  const sandbox = createSandbox();
  try {
    files.forEach(file => {
      vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
    });
    console.log(`[PASS] ${page} (${files.join(' -> ')}) loaded and executed cleanly.`);
  } catch (err) {
    failed = true;
    console.error(`[FAIL] ${page} failed while loading ${files.join(' -> ')}`);
    console.error(`       ${err.message}`);
    const frame = (err.stack || '').split('\n').find(line => line.includes('.js:'));
    if (frame) console.error(`       ${frame.trim()}`);
  }
});

if (failed) process.exit(1);
