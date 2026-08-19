# -*- coding: utf-8 -*-
"""
ANTARA HERITAGE LIBRARY - Complete Database Builder & Synchronizer
Combines all scripture modules, validates schema, calculates metadata stats,
and synchronously writes both texts_database.json and texts_data.js.
"""

import json
import os
import sys

from data_builders.gita import get_bhagavad_gita
from data_builders.upanishads import get_isha_upanishad, get_katha_upanishad, get_mundaka_upanishad
from data_builders.rigveda import get_rigveda
from data_builders.classics import get_classics

def build_complete_database():
    categories = [
        {
            "id": "vedas_upanishads",
            "name": "Vedas & Upanishads",
            "sanskrit_name": "श्रुति एवं उपनिषदः",
            "description": "The primordial Vedic Samhitas, Aranyakas, and Vedantic Upanishads exploring cosmic order (Rita), non-dual reality (Brahman), and the immortal Self (Atman)."
        },
        {
            "id": "epics_itihasa",
            "name": "Epics & Itihasa",
            "sanskrit_name": "इतिहास एवं महाकाव्य",
            "description": "Monumental narratives of civilizational ethos, ethical dilemmas, statecraft, and divine dialogue including the Bhagavad Gita, Valmiki Ramayana, and Mahabharata."
        },
        {
            "id": "philosophy_darshana",
            "name": "Philosophical Treatises",
            "sanskrit_name": "दर्शन एवं शास्त्रीय ग्रन्थाः",
            "description": "Systematic inquiries into consciousness, yoga psychology, non-dual metaphysics (Advaita), and ultimate liberation."
        },
        {
            "id": "classical_shastras",
            "name": "Classical Manuscripts & Shastras",
            "sanskrit_name": "ज्ञानविज्ञान एवं शास्त्रपरम्परा",
            "description": "Foundational treatises on aesthetics, dramaturgy, political economy, ethics, governance, and holistic medicine."
        }
    ]

    # Collect books in canonical order
    books = [
        # Epics / Itihasa
        get_bhagavad_gita(),

        # Vedas & Upanishads
        get_rigveda(),
        get_katha_upanishad(),
        get_mundaka_upanishad(),
        get_isha_upanishad(),

        # Remaining books from classics
        *get_classics()
    ]

    total_chapters = sum(len(b.get("chapters", [])) for b in books)
    total_verses = sum(
        sum(len(c.get("verses", [])) for c in b.get("chapters", []))
        for b in books
    )

    db = {
        "library_meta": {
            "name": "Antara Heritage Library",
            "sanskrit_name": "अन्तरा ग्रन्थागार",
            "tagline": "A Classical Archive of Vedic, Epical, Philosophical, and Scientific Sanskrit Literature",
            "version": "5.0.0",
            "total_categories": len(categories),
            "total_books": len(books),
            "total_chapters": total_chapters,
            "total_verses": total_verses
        },
        "categories": categories,
        "books": books
    }

    # Validate Schema
    for book in books:
        assert "id" in book, f"Book missing id: {book}"
        assert "title" in book, f"Book missing title: {book}"
        assert "category_id" in book, f"Book missing category_id: {book}"
        assert "chapters" in book, f"Book missing chapters: {book}"
        for chap in book["chapters"]:
            assert "id" in chap, f"Chapter missing id in book {book['id']}"
            assert "title" in chap, f"Chapter missing title in book {book['id']}"
            assert "verses" in chap, f"Chapter missing verses in chapter {chap['id']}"
            for v in chap["verses"]:
                assert "id" in v, f"Verse missing id in chapter {chap['id']}"
                assert "verse_number" in v, f"Verse missing verse_number in chapter {chap['id']}"
                assert "citation" in v, f"Verse missing citation: {v['id']}"
                assert "sanskrit" in v, f"Verse missing sanskrit: {v['id']}"
                assert "transliteration" in v, f"Verse missing transliteration: {v['id']}"
                assert "word_meanings" in v, f"Verse missing word_meanings: {v['id']}"
                assert "english" in v, f"Verse missing english: {v['id']}"
                assert "hindi" in v, f"Verse missing hindi: {v['id']}"
                assert "commentary" in v, f"Verse missing commentary: {v['id']}"

    # Write files
    workspace_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(workspace_dir, "texts_database.json")
    js_path = os.path.join(workspace_dir, "texts_data.js")

    json_str = json.dumps(db, ensure_ascii=False, indent=2)

    with open(json_path, "w", encoding="utf-8") as f:
        f.write(json_str)

    js_header = """/**
 * ANTARA HERITAGE LIBRARY DATA LAYER
 * Global embedded constant to bypass file:// CORS restrictions.
 */
window.ANTARA_HERITAGE_DB = """

    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js_header + json_str + ";\n")

    print("=" * 70)
    print("ANTARA HERITAGE DATABASE GENERATION COMPLETE")
    print("=" * 70)
    print(f"Total Categories : {len(categories)}")
    print(f"Total Books      : {len(books)}")
    print(f"Total Chapters   : {total_chapters}")
    print(f"Total Verses     : {total_verses}")
    print("-" * 70)
    # Safe printing for Windows console
    for cat in categories:
        cat_books = [b for b in books if b["category_id"] == cat["id"]]
        cat_verses = sum(sum(len(c.get("verses", [])) for c in b.get("chapters", [])) for b in cat_books)
        print(f"\n[*] Category: {cat['name']} ({len(cat_books)} books, {cat_verses} verses)")
        for b in cat_books:
            b_verses = sum(len(c.get("verses", [])) for c in b.get("chapters", []))
            print(f"   [Book] {b['title']} : {len(b['chapters'])} chapters, {b_verses} verses")
            for ch in b['chapters']:
                print(f"      - {ch['title']} ({len(ch['verses'])} verses)")
    print("=" * 70)
    print(f"Successfully synchronized:\n 1. {json_path}\n 2. {js_path}")

if __name__ == "__main__":
    if sys.stdout.encoding != 'utf-8':
        sys.stdout.reconfigure(encoding='utf-8')
    build_complete_database()

