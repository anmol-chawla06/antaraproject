const fs = require('fs');
const vm = require('vm');

const files = ['texts_data.js', 'app.js'];

files.forEach(f => {
  try {
    const content = fs.readFileSync(f, 'utf8');
    // Wrap app.js code in a function or mock standard browser window objects so it parses cleanly
    const sandbox = {
      window: {},
      document: {
        readyState: 'complete',
        addEventListener: () => {},
        documentElement: {
          style: {
            setProperty: () => {}
          },
          setAttribute: () => {}
        },
        querySelectorAll: () => [],
        querySelector: () => ({ addEventListener: () => {} }),
        getElementById: () => null,
        createElement: () => ({ addEventListener: () => {} })
      },
      localStorage: {
        getItem: () => null,
        setItem: () => null
      },
      navigator: {
        clipboard: {}
      },
      setInterval: () => {},
      clearInterval: () => {},
      setTimeout: () => {},
      AudioContext: class {},
      webkitAudioContext: class {},
      console: console
    };
    sandbox.window = sandbox;
    vm.createContext(sandbox);
    vm.runInContext(content, sandbox);
    console.log(`[PASS] ${f} is syntactically valid and executed successfully.`);
  } catch (err) {
    console.error(`[FAIL] ${f} has errors:`, err.message);
    process.exit(1);
  }
});
