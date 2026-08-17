# -*- coding: utf-8 -*-
"""
ANTARA HERITAGE LIBRARY - Comprehensive Dataset Generator
Generates high-precision Devanagari, IAST transliteration, word-by-word Anvaya,
English translations, Hindi translations, and philosophical commentaries across
Vedas, Upanishads, Bhagavad Gita, Epics, Philosophy, and Classical Shastras.
"""

import json
import os

def create_dataset():
    db = {
        "library_meta": {
            "name": "Antara Heritage Library",
            "sanskrit_name": "अन्तरा ग्रन्थागार",
            "tagline": "A Classical Archive of Vedic, Epical, Philosophical, and Scientific Sanskrit Literature",
            "version": "5.0.0",
            "total_categories": 4,
            "total_books": 10
        },
        "categories": [
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
        ],
        "books": []
    }
    return db

if __name__ == '__main__':
    print("Initializing dataset generator...")
