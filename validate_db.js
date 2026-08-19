const fs = require('fs');
const vm = require('vm');

const jsContent = fs.readFileSync('texts_data.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(jsContent, sandbox);

const db = sandbox.window.ANTARA_HERITAGE_DB;
console.log('[PASS] texts_data.js evaluated cleanly.');
console.log('Total Categories:', db.categories.length);
console.log('Total Books:', db.books.length);
console.log('Library Meta:', JSON.stringify(db.library_meta, null, 2));

let vCount = 0;
db.books.forEach(b => {
  if (!b.id || !b.title || !b.category_id || !b.chapters) {
    throw new Error('Invalid book: ' + b.id);
  }
  b.chapters.forEach(c => {
    if (!c.id || !c.title || !c.verses) {
      throw new Error('Invalid chapter: ' + c.id);
    }
    c.verses.forEach(v => {
      vCount++;
      if (!v.id || !v.verse_number || !v.sanskrit || !v.transliteration || !v.english || !v.hindi || !v.word_meanings || !v.commentary) {
        throw new Error('Invalid verse: ' + v.id);
      }
    });
  });
});
console.log(`[PASS] All ${vCount} verses verified with complete multi-language fields.`);

const queries = ['dharma', 'कर्म', 'सत्यमेव', 'chariot', 'arjuna', 'nasadiya', 'purusha', 'rasa', 'yoga'];
queries.forEach(q => {
  let matches = 0;
  db.books.forEach(b => {
    b.chapters.forEach(c => {
      c.verses.forEach(v => {
        if (
          v.sanskrit.includes(q) ||
          v.hindi.includes(q) ||
          v.english.toLowerCase().includes(q.toLowerCase()) ||
          v.transliteration.toLowerCase().includes(q.toLowerCase()) ||
          v.citation.toLowerCase().includes(q.toLowerCase())
        ) {
          matches++;
        }
      });
    });
  });
  console.log(`[SEARCH MATCH] Query "${q}" matched in ${matches} verses.`);
});
