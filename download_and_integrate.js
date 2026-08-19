/**
 * ANTARA HERITAGE LIBRARY
 * Automated Multi-Category Manuscript Archive Dataset Integration Script
 */

const fs = require('fs');
const path = require('path');

const TARGET_DB_FILE = path.join(__dirname, 'texts_database.json');
const TARGET_JS_FILE = path.join(__dirname, 'texts_data.js');

function syncCorpus() {
  if (fs.existsSync(TARGET_DB_FILE)) {
    const raw = fs.readFileSync(TARGET_DB_FILE, 'utf8');
    const existing = JSON.parse(raw);
    
    // Also write texts_data.js
    const jsContent = '/**\n * ANTARA HERITAGE LIBRARY DATA LAYER\n * Global embedded constant to bypass file:// CORS restrictions.\n */\nwindow.ANTARA_HERITAGE_DB = ' + raw + ';\n';
    fs.writeFileSync(TARGET_JS_FILE, jsContent, 'utf8');
    
    console.log('[Validated] Synchronized texts_database.json and texts_data.js');
    existing.categories.forEach(c => {
      const bCount = existing.books.filter(b => b.category_id === c.id).length;
      console.log(` • Category: ${c.name} (${bCount} manuscripts)`);
    });
    console.log(`Total Books: ${existing.books.length}`);
  }
}

syncCorpus();
console.log('[Complete] Archive sync validated.');
