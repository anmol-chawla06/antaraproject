/**
 * ANTARA HERITAGE LIBRARY DATA LAYER
 * Global embedded constant to bypass file:// CORS restrictions.
 */
window.ANTARA_HERITAGE_DB = {
  "library_meta": {
    "name": "Antara Heritage Library",
    "sanskrit_name": "अन्तरा ग्रन्थागार",
    "tagline": "A Classical Archive of Vedic, Epical, Philosophical, and Scientific Sanskrit Literature",
    "version": "5.0.0",
    "total_categories": 4,
    "total_books": 10,
    "total_chapters": 31,
    "total_verses": 142
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
  "books": [
    {
      "id": "bhagavad_gita",
      "category_id": "epics_itihasa",
      "category": "Epics & Itihasa",
      "title": "Bhagavad Gita",
      "sanskrit_title": "श्रीमद्भगवद्गीता",
      "transliteration": "Śrīmadbhagavadgītā",
      "author": "Maharshi Veda Vyasa / Lord Krishna",
      "tradition": "Itihasa / Smriti (Prasthanatrayi)",
      "era": "c. 500–200 BCE",
      "description": "The 700-verse philosophical crown of the Mahabharata delivering the timeless synthesis of Karma Yoga (action), Jnana Yoga (knowledge), and Bhakti Yoga (devotion).",
      "epigraph": "सर्वोपनिषदो गावो दोग्धा गोपालनन्दनः ।\nपार्थो वत्सः सुधीर्भोक्ता दुग्धं गीतामृतं महत् ॥",
      "epigraph_translation": "All the Upanishads are the cows, Krishna is the milker, Arjuna is the calf, the wise are the drinkers, and the nectar of the Gita is the supreme milk.",
      "chapters": [
        {
          "id": "bg_ch_01",
          "chapter_number": 1,
          "title": "Chapter 1: Arjuna Vishada Yoga",
          "sanskrit_title": "अर्जुनविषादयोग (प्रथमोऽध्यायः)",
          "transliteration": "Arjunaviṣādayoga",
          "summary": "The Yoga of Arjuna's Despondency. On the sacred battlefield of Kurukshetra, observing his revered teachers, kinsmen, and friends arrayed for mutual slaughter, Arjuna is overcome with profound compassionate grief, questioning the righteousness of warfare and dropping his weapons.",
          "verses": [
            {
              "id": "bg_1_1",
              "verse_number": "1.1",
              "citation": "Bhagavad Gita 1.1",
              "meter": "Anuṣṭubh",
              "sanskrit": "धृतराष्ट्र उवाच ।\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥",
              "transliteration": "dhṛtarāṣṭra uvāca |\ndharmakṣetre kurukṣetre samavetā yuyutsavaḥ |\nmāmakāḥ pāṇḍavāś caiva kim akurvata sañjaya ||",
              "word_meanings": [
                {
                  "sanskrit": "धृतराष्ट्रः उवाच",
                  "iast": "dhṛtarāṣṭraḥ uvāca",
                  "meaning": "King Dhritarashtra said"
                },
                {
                  "sanskrit": "धर्मक्षेत्रे",
                  "iast": "dharma-kṣetre",
                  "meaning": "in the field of righteousness"
                },
                {
                  "sanskrit": "कुरुक्षेत्रे",
                  "iast": "kuru-kṣetre",
                  "meaning": "in the land of Kurukshetra"
                },
                {
                  "sanskrit": "समवेताः युयुत्सवः",
                  "iast": "samavetāḥ yuyutsavaḥ",
                  "meaning": "assembled eager for battle"
                },
                {
                  "sanskrit": "मामकाः पाण्डवाः च एव",
                  "iast": "māmakāḥ pāṇḍavāḥ ca eva",
                  "meaning": "my sons and Pandu's sons indeed"
                },
                {
                  "sanskrit": "किम् अकुर्वत सञ्जय",
                  "iast": "kim akurvata sañjaya",
                  "meaning": "what did they do, O Sanjaya?"
                }
              ],
              "english": "Dhritarashtra said: O Sanjaya, assembled on the sacred field of Kurukshetra eager for battle, what did my sons and the sons of Pandu do?",
              "hindi": "धृतराष्ट्र बोले: हे सञ्जय! धर्मभूमि कुरुक्षेत्र में युद्ध की इच्छा से एकत्र हुए मेरे और पाण्डु के पुत्रों ने क्या किया?",
              "commentary": "The opening shloka of the entire Gita. The very first word 'Dharmakshetre' establishes human existence as an inner arena where righteousness faces attachment and doubt.",
              "audio": ""
            },
            {
              "id": "bg_1_2",
              "verse_number": "1.2",
              "citation": "Bhagavad Gita 1.2",
              "meter": "Anuṣṭubh",
              "sanskrit": "सञ्जय उवाच ।\nदृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा ।\nआचार्यमुपसङ्गम्य राजा वचनमब्रवीत् ॥",
              "transliteration": "sañjaya uvāca |\ndṛṣṭvā tu pāṇḍavānīkaṁ vyūḍhaṁ duryodhanas tadā |\nācāryam upasaṅgamya rājā vacanam abravīt ||",
              "word_meanings": [
                {
                  "sanskrit": "सञ्जयः उवाच",
                  "iast": "sañjayaḥ uvāca",
                  "meaning": "Sanjaya said"
                },
                {
                  "sanskrit": "दृष्ट्वा तु पाण्डवानीकम्",
                  "iast": "dṛṣṭvā tu pāṇḍavānīkam",
                  "meaning": "having seen the army of the Pandavas"
                },
                {
                  "sanskrit": "व्यूढम्",
                  "iast": "vyūḍham",
                  "meaning": "drawn up in strategic battle formation"
                },
                {
                  "sanskrit": "दुर्योधनः तदा",
                  "iast": "duryodhanaḥ tadā",
                  "meaning": "Duryodhana then"
                },
                {
                  "sanskrit": "आचार्यम् उपसङ्गम्य",
                  "iast": "ācāryam upasaṅgamya",
                  "meaning": "approaching his preceptor Drona"
                },
                {
                  "sanskrit": "राजा वचनम् अब्रवीत्",
                  "iast": "rājā vacanam abravīt",
                  "meaning": "the king spoke these words"
                }
              ],
              "english": "Sanjaya said: Having observed the army of the Pandavas drawn up in battle array, King Duryodhana approached his teacher Dronacharya and spoke these words.",
              "hindi": "सञ्जय ने कहा: उस समय व्यूहरचना से युक्त पाण्डवों की सेना को देखकर राजा दुर्योधन ने द्रोणाचार्य के पास जाकर यह वचन कहा।",
              "commentary": "Duryodhana's immediate reaction upon seeing the strategic formation reveals subtle inner anxiety beneath outer bravado.",
              "audio": ""
            },
            {
              "id": "bg_1_14",
              "verse_number": "1.14",
              "citation": "Bhagavad Gita 1.14",
              "meter": "Anuṣṭubh",
              "sanskrit": "ततः श्वेतैर्हयैर्युक्ते महति स्यन्दने स्थितौ ।\nमाधवः पाण्डवश्चैव दिव्यौ शङ्खौ प्रदध्मतुः ॥",
              "transliteration": "tataḥ śvetair hayair yukte mahati syandane sthitau |\nmādhavaḥ pāṇḍavaś caiva divyau śaṅkhau pradadhmatuḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "ततः",
                  "iast": "tataḥ",
                  "meaning": "thereafter"
                },
                {
                  "sanskrit": "श्वेतैः हयैः युक्ते",
                  "iast": "śvetaiḥ hayaiḥ yukte",
                  "meaning": "yoked with white horses"
                },
                {
                  "sanskrit": "महति स्यन्दने स्थितौ",
                  "iast": "mahati syandane sthitau",
                  "meaning": "seated in a magnificent chariot"
                },
                {
                  "sanskrit": "माधवः पाण्डवः च एव",
                  "iast": "mādhavaḥ pāṇḍavaḥ ca eva",
                  "meaning": "Lord Krishna and Arjuna indeed"
                },
                {
                  "sanskrit": "दिव्यौ शङ्खौ प्रदध्मतुः",
                  "iast": "divyau śaṅkhau pradadhmatuḥ",
                  "meaning": "blew their divine conch shells"
                }
              ],
              "english": "Then, seated in a magnificent chariot yoked with white steeds, Lord Krishna and Arjuna blew their divine conch shells with resounding glory.",
              "hindi": "इसके पश्चात् श्वेत घोड़ों से युक्त विशाल रथ में बैठे हुए श्रीकृष्ण और अर्जुन ने अपने-अपने दिव्य शङ्खों का निनाद किया।",
              "commentary": "The white horses and celestial conches symbolize pure sattva and cosmic victory of truth over ignorance.",
              "audio": ""
            },
            {
              "id": "bg_1_21",
              "verse_number": "1.21",
              "citation": "Bhagavad Gita 1.21",
              "meter": "Anuṣṭubh",
              "sanskrit": "अर्जुन उवाच ।\nसेनयोरुभयोर्मध्ये रथं स्थापय मेऽच्युत ।\nयावदेतान्निरीक्षेऽहं योद्धुकामानवस्थितान् ॥",
              "transliteration": "arjuna uvāca |\nsenayor ubhayor madhye rathaṁ sthāpaya me 'cyuta |\nyāvad etān nirīkṣe 'haṁ yoddhu-kāmān avasthitān ||",
              "word_meanings": [
                {
                  "sanskrit": "अर्जुनः उवाच",
                  "iast": "arjunaḥ uvāca",
                  "meaning": "Arjuna said"
                },
                {
                  "sanskrit": "सेनयोः उभयोः मध्ये",
                  "iast": "senayoḥ ubhayoḥ madhye",
                  "meaning": "between both armies"
                },
                {
                  "sanskrit": "रथम् स्थापय मे अच्युत",
                  "iast": "ratham sthāpaya me acyuta",
                  "meaning": "station my chariot, O Infallible One"
                },
                {
                  "sanskrit": "यावत् एतान् निरीक्षे अहम्",
                  "iast": "yāvat etān nirīkṣe aham",
                  "meaning": "until I may scrutinize all these"
                },
                {
                  "sanskrit": "योद्धुकामान् अवस्थितान्",
                  "iast": "yoddhu-kāmān avasthitān",
                  "meaning": "standing eager for combat"
                }
              ],
              "english": "Arjuna said: O Infallible Krishna, draw up my chariot between the two armies, so that I may behold those who stand here desiring to fight.",
              "hindi": "अर्जुन बोले: हे अच्युत! मेरे रथ को दोनों सेनाओं के बीच में खड़ा कीजिए, जब तक कि मैं युद्ध की इच्छा से खड़े इन योद्धाओं को भली-भाँति देख न लूँ।",
              "commentary": "By asking Krishna to place the chariot in the neutral middle, Arjuna steps into the crucible of existential confrontation.",
              "audio": ""
            },
            {
              "id": "bg_1_28",
              "verse_number": "1.28",
              "citation": "Bhagavad Gita 1.28",
              "meter": "Anuṣṭubh",
              "sanskrit": "अर्जुन उवाच ।\nदृष्ट्वेमं स्वजनं कृष्ण युयुत्सुं समुपस्थितम् ।\nसीदन्ति मम गात्राणि मुखं च परिशुष्यति ॥",
              "transliteration": "arjuna uvāca |\ndṛṣṭvemaṁ svajanaṁ kṛṣṇa yuyutsuṁ samupasthitam |\nsīdanti mama gātrāṇi mukhaṁ ca pariśuṣyati ||",
              "word_meanings": [
                {
                  "sanskrit": "अर्जुनः उवाच",
                  "iast": "arjunaḥ uvāca",
                  "meaning": "Arjuna said"
                },
                {
                  "sanskrit": "दृष्ट्वा इमम् स्वजनम्",
                  "iast": "dṛṣṭvā imam svajanam",
                  "meaning": "seeing these my own kinsmen"
                },
                {
                  "sanskrit": "कृष्ण",
                  "iast": "kṛṣṇa",
                  "meaning": "O Krishna"
                },
                {
                  "sanskrit": "युयुत्सुम् समुपस्थितम्",
                  "iast": "yuyutsum samupasthitam",
                  "meaning": "standing eager to fight"
                },
                {
                  "sanskrit": "सीदन्ति मम गात्राणि",
                  "iast": "sīdanti mama gātrāṇi",
                  "meaning": "my limbs fail and tremble"
                },
                {
                  "sanskrit": "मुखम् च परिशुष्यति",
                  "iast": "mukham ca pariśuṣyati",
                  "meaning": "and my mouth is completely parched"
                }
              ],
              "english": "Arjuna said: O Krishna, seeing my own kinsmen standing before me eager for battle, my limbs fail me and my mouth is parched.",
              "hindi": "अर्जुन बोले: हे कृष्ण! युद्ध की अभिलाषा से उपस्थित इस स्वजन-समुदाय को देखकर मेरे अंग शिथिल हो रहे हैं और मुख सूख रहा है।",
              "commentary": "Arjuna's emotional breakdown exemplifies the human intellect overwhelmed by temporal affection when confronted with profound existential duty.",
              "audio": ""
            },
            {
              "id": "bg_1_29",
              "verse_number": "1.29",
              "citation": "Bhagavad Gita 1.29",
              "meter": "Anuṣṭubh",
              "sanskrit": "वेपथुश्च शरीरे मे रोमहर्षश्च जायते ।\nगाण्डीवं स्रंसते हस्तात्त्वक्चैव परिदह्यते ॥",
              "transliteration": "vepathuś ca śarīre me roma-harṣaś ca jāyate |\ngāṇḍīvaṁ sraṁsate hastāt tvak caiva paridahyate ||",
              "word_meanings": [
                {
                  "sanskrit": "वेपथुः च शरीरे मे",
                  "iast": "vepathuḥ ca śarīre me",
                  "meaning": "there is trembling in my body"
                },
                {
                  "sanskrit": "रोमहर्षः च जायते",
                  "iast": "roma-harṣaḥ ca jāyate",
                  "meaning": "and my hair stands on end"
                },
                {
                  "sanskrit": "गाण्डीवम् स्रंसते हस्तात्",
                  "iast": "gāṇḍīvam sraṁsate hastāt",
                  "meaning": "the bow Gandiva slips from my hand"
                },
                {
                  "sanskrit": "त्वक् च एव परिदह्यते",
                  "iast": "tvak ca eva paridahyate",
                  "meaning": "and my skin is burning all over"
                }
              ],
              "english": "My body trembles and my hair stands on end. The bow Gandiva slips from my hand, and my skin burns all over.",
              "hindi": "मेरे शरीर में कम्पन हो रहा है, रोंगटे खड़े हो रहे हैं। हाथ से गाण्डीव धनुष गिर रहा है और त्वचा जल रही है।",
              "commentary": "The psychosomatic crisis demonstrates how emotional turmoil disarms even the world's greatest warrior.",
              "audio": ""
            },
            {
              "id": "bg_1_30",
              "verse_number": "1.30",
              "citation": "Bhagavad Gita 1.30",
              "meter": "Anuṣṭubh",
              "sanskrit": "न च शक्नोम्यवस्थातुं भ्रमतीव च मे मनः ।\nनिमित्तानि च पश्यामि विपरीतानि केशव ॥",
              "transliteration": "na ca śaknomy avasthātuṁ bhramatīva ca me manaḥ |\nnimittāni ca paśyāmi viparītāni keśava ||",
              "word_meanings": [
                {
                  "sanskrit": "न च शक्नोमि अवस्थातुम्",
                  "iast": "na ca śaknomi avasthātum",
                  "meaning": "nor am I able to remain standing"
                },
                {
                  "sanskrit": "भ्रमति इव च मे मनः",
                  "iast": "bhramati iva ca me manaḥ",
                  "meaning": "and my mind seems to be reeling"
                },
                {
                  "sanskrit": "निमित्तानि च पश्यामि",
                  "iast": "nimittāni ca paśyāmi",
                  "meaning": "and I perceive omens"
                },
                {
                  "sanskrit": "विपरीतानि केशव",
                  "iast": "viparītāni keśava",
                  "meaning": "which are adverse, O Keshava"
                }
              ],
              "english": "I am unable to stand steady, and my mind seems to reel. I foresee only adverse omens, O Keshava.",
              "hindi": "मैं खड़े रहने में भी असमर्थ हूँ और मेरा मन भ्रमित सा हो रहा है। हे केशव! मैं केवल अनिष्टकारक शकुनों को ही देख रहा हूँ।",
              "commentary": "Arjuna projects his inner psychological confusion onto external omens, justifying escapism under the guise of piety.",
              "audio": ""
            },
            {
              "id": "bg_1_47",
              "verse_number": "1.47",
              "citation": "Bhagavad Gita 1.47",
              "meter": "Anuṣṭubh",
              "sanskrit": "सञ्जय उवाच ।\nएवमुक्त्वार्जुनः सङ्ख्ये रथोपस्थ उपाविशत् ।\nविसृज्य सशरं चापं शोकसंविग्नमानसः ॥",
              "transliteration": "sañjaya uvāca |\nevam uktvārjunaḥ saṅkhye rathopastha upāviśat |\nvisṛjya sa-śaraṁ cāpaṁ śoka-saṁvigna-mānasaḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "सञ्जयः उवाच",
                  "iast": "sañjayaḥ uvāca",
                  "meaning": "Sanjaya said"
                },
                {
                  "sanskrit": "एवम् उक्त्वा अर्जुनः",
                  "iast": "evam uktvā arjunaḥ",
                  "meaning": "having spoken thus, Arjuna"
                },
                {
                  "sanskrit": "सङ्ख्ये",
                  "iast": "saṅkhye",
                  "meaning": "in the midst of battle"
                },
                {
                  "sanskrit": "रथोपस्थे उपाविशत्",
                  "iast": "ratha-upasthe upāviśat",
                  "meaning": "sat down on the seat of the chariot"
                },
                {
                  "sanskrit": "विसृज्य स-शरम् चापम्",
                  "iast": "visṛjya sa-śaram cāpam",
                  "meaning": "casting aside his bow and arrows"
                },
                {
                  "sanskrit": "शोक-संविग्न-मानसः",
                  "iast": "śoka-saṁvigna-mānasaḥ",
                  "meaning": "his mind overwhelmed with grief"
                }
              ],
              "english": "Sanjaya said: Having spoken thus on the battlefield, Arjuna cast aside his bow and arrows and sank down upon the chariot seat, his mind overwhelmed with sorrow.",
              "hindi": "सञ्जय बोले: युद्धभूमि में इस प्रकार कहकर शोकमग्न चित्त वाले अर्जुन बाणों सहित धनुष को त्यागकर रथ के पिछले भाग में बैठ गए।",
              "commentary": "The culmination of Chapter 1. The total exhaustion of the ego sets the stage for spiritual illumination in Chapter 2.",
              "audio": ""
            }
          ]
        },
        {
          "id": "bg_ch_02",
          "chapter_number": 2,
          "title": "Chapter 2: Sankhya Yoga",
          "sanskrit_title": "साङ्ख्ययोग (द्वितीयोऽध्यायः)",
          "transliteration": "Sāṅkhyayoga",
          "summary": "The Yoga of Transcendent Analytical Wisdom. Lord Krishna reveals the immortal nature of the Atman (Soul), explains the doctrine of Nishkama Karma (desireless action), and depicts the traits of the Sthitaprajna (the person of steady illumination).",
          "verses": [
            {
              "id": "bg_2_2",
              "verse_number": "2.2",
              "citation": "Bhagavad Gita 2.2",
              "meter": "Anuṣṭubh",
              "sanskrit": "श्रीभगवानुवाच ।\nकुतस्त्वा कश्मलमिदं विषमे समुपस्थितम् ।\nअनार्यजुष्टमस्वर्ग्यमकीर्तिकरमर्जुन ॥",
              "transliteration": "śrī-bhagavān uvāca |\nkutas tvā kaśmalam idaṁ viṣame samupasthitam |\nanārya-juṣṭam asvargyam akīrti-karam arjuna ||",
              "word_meanings": [
                {
                  "sanskrit": "श्रीभगवान् उवाच",
                  "iast": "śrī-bhagavān uvāca",
                  "meaning": "The Supreme Lord said"
                },
                {
                  "sanskrit": "कुतः त्वा कश्मलम् इदम्",
                  "iast": "kutas tvā kaśmalam idam",
                  "meaning": "whence has this delusion come upon you"
                },
                {
                  "sanskrit": "विषमे समुपस्थितम्",
                  "iast": "viṣame samupasthitam",
                  "meaning": "arrived at this critical juncture"
                },
                {
                  "sanskrit": "अनार्य-जुष्टम्",
                  "iast": "anārya-juṣṭam",
                  "meaning": "unbecoming of an Arya (noble soul)"
                },
                {
                  "sanskrit": "अस्वर्ग्यम् अकीर्तिकरम्",
                  "iast": "asvargyam akīrti-karam",
                  "meaning": "barring heaven and causing dishonor"
                }
              ],
              "english": "The Supreme Lord said: Whence has this dejection come upon you at this critical hour? It is unworthy of a noble spirit, non-heavenly, and disgraceful, O Arjuna.",
              "hindi": "श्रीभगवान् बोले: हे अर्जुन! इस संकट के समय तुम्हारे मन में यह कायरता कहाँ से आ गई? यह न तो श्रेष्ठ पुरुषों के योग्य है, न स्वर्ग दिलाने वाली है और न कीर्ति करने वाली है।",
              "commentary": "Krishna's first words in the Gita immediately pierce through Arjuna's sentimental rationalizations.",
              "audio": ""
            },
            {
              "id": "bg_2_3",
              "verse_number": "2.3",
              "citation": "Bhagavad Gita 2.3",
              "meter": "Anuṣṭubh",
              "sanskrit": "क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते ।\nक्षुद्रं हृदयदौर्बल्यं त्यक्त्वोत्तिष्ठ परन्तप ॥",
              "transliteration": "klaibyaṁ mā sma gamaḥ pārtha naitat tvayy upapadyate |\nkṣudraṁ hṛdaya-daurbalyaṁ tyaktvottiṣṭha parantapa ||",
              "word_meanings": [
                {
                  "sanskrit": "क्लैब्यम् मा स्म गमः",
                  "iast": "klaibyam mā sma gamaḥ",
                  "meaning": "do not yield to unmanliness / impotence"
                },
                {
                  "sanskrit": "पार्थ न एतत् त्वयि उपपद्यते",
                  "iast": "pārtha na etat tvayi upapadyate",
                  "meaning": "O Partha, this does not befit you"
                },
                {
                  "sanskrit": "क्षुद्रम् हृदय-दौर्बल्यम्",
                  "iast": "kṣudram hṛdaya-daurbalyam",
                  "meaning": "this petty weakness of heart"
                },
                {
                  "sanskrit": "त्यक्त्वा उत्तिष्ठ परन्तप",
                  "iast": "tyaktvā uttiṣṭha parantapa",
                  "meaning": "casting aside, arise, O scorcher of foes!"
                }
              ],
              "english": "Do not yield to feebleness, O Partha! It does not befit you. Cast off this petty faint-heartedness and arise, O scorcher of foes!",
              "hindi": "हे पार्थ! नपुंसकता को मत प्राप्त हो, यह तेरे योग्य नहीं है। हे परंतप! हृदय की इस तुच्छ दुर्बलता को त्यागकर युद्ध के लिए खड़ा हो जा!",
              "commentary": "Swami Vivekananda called this verse the essence of the Gita—a clarion call to strength and moral courage.",
              "audio": ""
            },
            {
              "id": "bg_2_7",
              "verse_number": "2.7",
              "citation": "Bhagavad Gita 2.7",
              "meter": "Triṣṭubh",
              "sanskrit": "कार्पण्यदोषोपहतस्वभावः\nपृच्छामि त्वां धर्मसंमूढचेताः ।\nयच्छ्रेयः स्यान्निश्चितं ब्रूहि तन्मे\nशिष्यस्तेऽहं शाधि मां त्वां प्रपन्नम् ॥",
              "transliteration": "kārpaṇya-doṣopahata-svabhāvaḥ\npṛcchāmi tvāṁ dharma-sammūḍha-cetāḥ |\nyac chreyaḥ syān niścitaṁ brūhi tan me\nśiṣyas te 'haṁ śādhi māṁ tvāṁ prapannam ||",
              "word_meanings": [
                {
                  "sanskrit": "कार्पण्य-दोष-उपहत-स्वभावः",
                  "iast": "kārpaṇya-doṣa-upahata-svabhāvaḥ",
                  "meaning": "with my natural disposition stricken by the flaw of helplessness"
                },
                {
                  "sanskrit": "पृच्छामि त्वाम्",
                  "iast": "pṛcchāmi tvām",
                  "meaning": "I ask You"
                },
                {
                  "sanskrit": "धर्म-संमूढ-चेताः",
                  "iast": "dharma-sammūḍha-cetāḥ",
                  "meaning": "with mind bewildered regarding righteous duty"
                },
                {
                  "sanskrit": "यत् श्रेयः स्यात् निश्चितम्",
                  "iast": "yat śreyaḥ syāt niścitam",
                  "meaning": "whatever is definitely the highest good"
                },
                {
                  "sanskrit": "ब्रूहि तत् मे",
                  "iast": "brūhi tat me",
                  "meaning": "tell that to me"
                },
                {
                  "sanskrit": "शिष्यः ते अहम्",
                  "iast": "śiṣyaḥ te aham",
                  "meaning": "I am Your disciple"
                },
                {
                  "sanskrit": "शाधि माम् त्वाम् प्रपन्नम्",
                  "iast": "śādhi mām tvām prapannam",
                  "meaning": "instruct me who have surrendered unto You"
                }
              ],
              "english": "My nature stricken by the fault of helplessness, my mind bewildered regarding righteous duty, I ask You: tell me decisively what is the supreme good. I am Your disciple; teach me who have surrendered unto You.",
              "hindi": "कायरता रूपी दोष से उपहत स्वभाव वाला और धर्म के विषय में मोहित चित्त हुआ मैं आपसे पूछता हूँ कि जो निश्चित रूप से श्रेयस्कर हो, वह मुझे बताइए। मैं आपका शिष्य हूँ, आपकी शरण में आए मुझे शिक्षा दीजिए।",
              "commentary": "The formal Guru-Shishya initiation moment. Arjuna transitions from friendship to spiritual discipleship (prapatti).",
              "audio": ""
            },
            {
              "id": "bg_2_11",
              "verse_number": "2.11",
              "citation": "Bhagavad Gita 2.11",
              "meter": "Anuṣṭubh",
              "sanskrit": "श्रीभगवानुवाच ।\nअशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे ।\nगतासूनगतासूंश्च नानुशोचन्ति पण्डिताः ॥",
              "transliteration": "śrī-bhagavān uvāca |\naśocyān anvaśocas tvaṁ prajñā-vādāṁś ca bhāṣase |\ngatāsūn agatāsūṁś ca nānuśocanti paṇḍitāḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "श्रीभगवान् उवाच",
                  "iast": "śrī-bhagavān uvāca",
                  "meaning": "The Supreme Lord said"
                },
                {
                  "sanskrit": "अशोच्यान् अन्वशोचः त्वम्",
                  "iast": "aśocyān anvaśocaḥ tvam",
                  "meaning": "you grieve for those not worthy of grief"
                },
                {
                  "sanskrit": "प्रज्ञा-वादान् च भाषसे",
                  "iast": "prajñā-vādān ca bhāṣase",
                  "meaning": "yet you speak words of wisdom"
                },
                {
                  "sanskrit": "गतासून् अगतासून् च",
                  "iast": "gatāsūn agatāsūn ca",
                  "meaning": "for the departed and for the living"
                },
                {
                  "sanskrit": "न अनुशोचन्ति पण्डिताः",
                  "iast": "na anuśocanti paṇḍitāḥ",
                  "meaning": "the truly wise do not grieve"
                }
              ],
              "english": "The Supreme Lord said: You grieve for those who need no grief, yet speak words of pseudo-wisdom. The wise grieve neither for the living nor for the dead.",
              "hindi": "श्रीभगवान् बोले: तुम न शोक करने योग्य मनुष्यों के लिए शोक करते हो और पण्डितों जैसी बातें बोलते हो। ज्ञानी जन जीवित या मृत किसी के लिए शोक नहीं करते।",
              "commentary": "The inaugural statement of Advaitic wisdom: reality cannot die, and that which dies is unreal.",
              "audio": ""
            },
            {
              "id": "bg_2_12",
              "verse_number": "2.12",
              "citation": "Bhagavad Gita 2.12",
              "meter": "Anuṣṭubh",
              "sanskrit": "न त्वेवाहं जातु नासं न त्वं नेमे जनाधिपाः ।\nन चैव न भविष्यामः सर्वे वयमतः परम् ॥",
              "transliteration": "na tv evāhaṁ jātu nāsaṁ na tvaṁ neme janādhipāḥ |\nna caiva na bhaviṣyāmaḥ sarve vayam ataḥ param ||",
              "word_meanings": [
                {
                  "sanskrit": "न तु एव अहम् जातु न आसम्",
                  "iast": "na tu eva aham jātu na āsam",
                  "meaning": "never was there a time when I did not exist"
                },
                {
                  "sanskrit": "न त्वम् न इमे जनाधिपाः",
                  "iast": "na tvam na ime janādhipāḥ",
                  "meaning": "nor you, nor all these kings"
                },
                {
                  "sanskrit": "न च एव न भविष्यामः",
                  "iast": "na ca eva na bhaviṣyāmaḥ",
                  "meaning": "nor shall we ever cease to be"
                },
                {
                  "sanskrit": "सर्वे वयम् अतः परम्",
                  "iast": "sarve vayam ataḥ param",
                  "meaning": "all of us hereafter"
                }
              ],
              "english": "Never was there a time when I did not exist, nor you, nor all these kings; nor shall we ever cease to exist in the future.",
              "hindi": "न तो ऐसा ही है कि मैं किसी काल में नहीं था, अथवा तुम नहीं थे, अथवा ये राजा लोग नहीं थे; और न ऐसा ही है कि भविष्य में हम सब नहीं रहेंगे।",
              "commentary": "Ontological eternity of consciousness: individual expressions may change bodies, but the underlying essence is eternal.",
              "audio": ""
            },
            {
              "id": "bg_2_13",
              "verse_number": "2.13",
              "citation": "Bhagavad Gita 2.13",
              "meter": "Anuṣṭubh",
              "sanskrit": "देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा ।\nतथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति ॥",
              "transliteration": "dehino 'smin yathā dehe kaumāraṁ yauvanaṁ jarā |\ntathā dehāntara-prāptir dhīras tatra na muhyati ||",
              "word_meanings": [
                {
                  "sanskrit": "देहिनः अस्मिन् यथा देहे",
                  "iast": "dehinaḥ asmin yathā dehe",
                  "meaning": "just as the embodied Self passes through in this body"
                },
                {
                  "sanskrit": "कौमारम् यौवनम् जरा",
                  "iast": "kaumāram yauvanam jarā",
                  "meaning": "childhood, youth, and old age"
                },
                {
                  "sanskrit": "तथा देहान्तर-प्राप्तिः",
                  "iast": "tathā dehāntara-prāptiḥ",
                  "meaning": "similarly is the attainment of another body"
                },
                {
                  "sanskrit": "धीरः तत्र न मुह्यति",
                  "iast": "dhīraḥ tatra na muhyati",
                  "meaning": "the steady-minded person is not deluded thereby"
                }
              ],
              "english": "Just as the embodied Self passes through childhood, youth, and old age in this body, so it passes into another body; the steady-minded are not deluded thereby.",
              "hindi": "जैसे जीवात्मा की इस देह में बालकपन, जवानी और वृद्धावस्था होती है, वैसे ही अन्य शरीर की प्राप्ति होती है; धैर्यवान पुरुष इस विषय में मोहित नहीं होता।",
              "commentary": "Reincarnation is shown to be as natural and continuous as bodily biological aging.",
              "audio": ""
            },
            {
              "id": "bg_2_14",
              "verse_number": "2.14",
              "citation": "Bhagavad Gita 2.14",
              "meter": "Anuṣṭubh",
              "sanskrit": "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः ।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत ॥",
              "transliteration": "mātrā-sparśās tu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ |\nāgamāpāyino 'nityās tāṁs titikṣasva bhārata ||",
              "word_meanings": [
                {
                  "sanskrit": "मात्रा-स्पर्शाः तु",
                  "iast": "mātrā-sparśāḥ tu",
                  "meaning": "contact of the senses with their objects"
                },
                {
                  "sanskrit": "शीत-उष्ण-सुख-दुःख-दाः",
                  "iast": "śīta-uṣṇa-sukha-duḥkha-dāḥ",
                  "meaning": "givers of cold, heat, pleasure, and pain"
                },
                {
                  "sanskrit": "आगम-अपायिनः अनित्याः",
                  "iast": "āgama-apāyinaḥ anityāḥ",
                  "meaning": "having a beginning and an end, transient"
                },
                {
                  "sanskrit": "तान् तितिक्षस्व भारत",
                  "iast": "tān titikṣasva bhārata",
                  "meaning": "endure them patiently, O descendant of Bharata"
                }
              ],
              "english": "The contacts of senses with matter, O Kaunteya, give rise to cold and heat, pleasure and pain. They come and go, being impermanent. Endure them with fortitude, O Bharata.",
              "hindi": "हे कुन्तीपुत्र! सर्दी-गर्मी और सुख-दुःख देने वाले इन्द्रियों और विषयों के संयोग तो उत्पत्ति-विनाशशील और अनित्य हैं, इसलिए हे भारत! तुम उनको सहन करो।",
              "commentary": "Titiksha (forbearance) is established as an essential spiritual discipline for observing dualities without reactive identification.",
              "audio": ""
            },
            {
              "id": "bg_2_20",
              "verse_number": "2.20",
              "citation": "Bhagavad Gita 2.20",
              "meter": "Triṣṭubh",
              "sanskrit": "न जायते म्रियते वा कदाचि-\nन्नायं भूत्वा भविता वा न भूयः ।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे ॥",
              "transliteration": "na jāyate mriyate vā kadācin\nnāyaṁ bhūtvā bhavitā vā na bhūyaḥ |\najo nityaḥ śāśvato 'yaṁ purāṇo\nna hanyate hanyamāne śarīre ||",
              "word_meanings": [
                {
                  "sanskrit": "न जायते म्रियते वा कदाचित्",
                  "iast": "na jāyate mriyate vā kadācit",
                  "meaning": "it is neither born nor does it ever die"
                },
                {
                  "sanskrit": "न अयम् भूत्वा भविता वा न भूयः",
                  "iast": "na ayam bhūtvā bhavitā vā na bhūyaḥ",
                  "meaning": "having come to be, it will never cease to be"
                },
                {
                  "sanskrit": "अजः नित्यः शाश्वतः अयम् पुराणः",
                  "iast": "ajaḥ nityaḥ śāśvataḥ ayam purāṇaḥ",
                  "meaning": "unborn, eternal, ever-existing, primeval"
                },
                {
                  "sanskrit": "न हन्यते हन्यमाने शरीरे",
                  "iast": "na hanyate hanyamāne śarīre",
                  "meaning": "it is not slain when the body is slain"
                }
              ],
              "english": "The Self is never born, nor does it ever die. Having once existed, it never ceases to exist. Unborn, eternal, changeless, and primeval, it is not slain when the body is slain.",
              "hindi": "यह आत्मा किसी काल में भी न तो जन्म लेता है और न मरता ही है तथा न यह उत्पन्न होकर फिर होने वाला ही है; क्योंकि यह अजन्मा, नित्य, सनातन और पुरातन है; शरीर के मारे जाने पर भी यह नहीं मारा जाता।",
              "commentary": "Direct echo of Katha Upanishad 1.2.18. The bedrock verse on the indestructible witness consciousness (Atman).",
              "audio": ""
            },
            {
              "id": "bg_2_22",
              "verse_number": "2.22",
              "citation": "Bhagavad Gita 2.22",
              "meter": "Anuṣṭubh",
              "sanskrit": "वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि ।\nतथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही ॥",
              "transliteration": "vāsāṁsi jīrṇāni yathā vihāya navāni gṛhṇāti naro 'parāṇi |\ntathā śarīrāṇi vihāya jīrṇāny anyāni saṁyāti navāni dehī ||",
              "word_meanings": [
                {
                  "sanskrit": "वासांसि जीर्णानि यथा विहाय",
                  "iast": "vāsāṁsi jīrṇāni yathā vihāya",
                  "meaning": "just as casting off worn-out garments"
                },
                {
                  "sanskrit": "नवानि गृह्णाति नरः अपराणि",
                  "iast": "navāni gṛhṇāti naro 'parāṇi",
                  "meaning": "a person takes on new ones"
                },
                {
                  "sanskrit": "तथा शरीराणि विहाय जीर्णानि",
                  "iast": "tathā śarīrāṇi vihāya jīrṇāni",
                  "meaning": "so discarding worn-out bodies"
                },
                {
                  "sanskrit": "अन्यानि संयाति नवानि देही",
                  "iast": "anyāni saṁyāti navāni dehī",
                  "meaning": "the embodied soul enters into new ones"
                }
              ],
              "english": "Just as a person casts off worn-out garments and puts on new ones, so the embodied Self casts off worn-out bodies and enters into new ones.",
              "hindi": "जैसे मनुष्य पुराने वस्त्रों को त्यागकर दूसरे नए वस्त्रों को ग्रहण करता है, वैसे ही जीवात्मा पुराने शरीरों को त्यागकर दूसरे नए शरीरों को प्राप्त करता है।",
              "commentary": "The supreme physical metaphor of the soul's relationship to the transient material body.",
              "audio": ""
            },
            {
              "id": "bg_2_23",
              "verse_number": "2.23",
              "citation": "Bhagavad Gita 2.23",
              "meter": "Anuṣṭubh",
              "sanskrit": "नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः ।\nन चैनं क्लेदयन्त्यापो न शोषयति मारुतः ॥",
              "transliteration": "nainaṁ chindanti śastrāṇi nainaṁ dahati pāvakaḥ |\nna cainaṁ kledayanty āpo na śoṣayati mārutaḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "न एनम् छिन्दन्ति शस्त्राणि",
                  "iast": "na enam chindanti śastrāṇi",
                  "meaning": "weapons cannot cut It"
                },
                {
                  "sanskrit": "न एनम् दहति पावकः",
                  "iast": "na enam dahati pāvakaḥ",
                  "meaning": "fire cannot burn It"
                },
                {
                  "sanskrit": "न च एनम् क्लेदयन्ति आपः",
                  "iast": "na ca enam kledayanti āpaḥ",
                  "meaning": "water cannot wet It"
                },
                {
                  "sanskrit": "न शोषयति मारुतः",
                  "iast": "na śoṣayati mārutaḥ",
                  "meaning": "nor can wind dry It"
                }
              ],
              "english": "Weapons cannot cut the Self, fire cannot burn It, water cannot wet It, nor can the wind wither or dry It.",
              "hindi": "इस आत्मा को शस्त्र नहीं काट सकते, इसको आग नहीं जला सकती, इसको जल नहीं गला सकता और वायु नहीं सुखा सकता।",
              "commentary": "Consciousness transcends all elemental forces and physical laws.",
              "audio": ""
            },
            {
              "id": "bg_2_47",
              "verse_number": "2.47",
              "citation": "Bhagavad Gita 2.47",
              "meter": "Anuṣṭubh",
              "sanskrit": "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
              "transliteration": "karmaṇy evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi ||",
              "word_meanings": [
                {
                  "sanskrit": "कर्मणि एव अधिकारः ते",
                  "iast": "karmaṇi eva adhikāraḥ te",
                  "meaning": "in action alone is your right"
                },
                {
                  "sanskrit": "मा फलेषु कदाचन",
                  "iast": "mā phaleṣu kadācana",
                  "meaning": "never in its fruits"
                },
                {
                  "sanskrit": "मा कर्म-फल-हेतुः भूः",
                  "iast": "mā karma-phala-hetuḥ bhūḥ",
                  "meaning": "do not let the fruit of action be your motive"
                },
                {
                  "sanskrit": "मा ते सङ्गः अस्तु अकर्मणि",
                  "iast": "mā te saṅgaḥ astu akarmaṇi",
                  "meaning": "nor let your attachment be to inaction"
                }
              ],
              "english": "Your right is to action alone, never to its fruits. Let not the fruit of action be your motive, nor let your attachment be to inaction.",
              "hindi": "तुम्हारा अधिकार केवल कर्म करने में ही है, उसके फलों में कभी नहीं। इसलिए तुम कर्मफल के हेतु मत बनो और तुम्हारी आसक्ति अकर्म (कर्म न करने) में भी न हो।",
              "commentary": "The bedrock of Karma Yoga: selfless action performed as duty dissolves egoic attachment.",
              "audio": ""
            },
            {
              "id": "bg_2_48",
              "verse_number": "2.48",
              "citation": "Bhagavad Gita 2.48",
              "meter": "Anuṣṭubh",
              "sanskrit": "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय ।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते ॥",
              "transliteration": "yoga-sthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya |\nsiddhy-asiddhyoḥ samo bhūtvā samatvaṁ yoga ucyate ||",
              "word_meanings": [
                {
                  "sanskrit": "योग-स्थः कुरु कर्माणि",
                  "iast": "yoga-sthaḥ kuru karmāṇi",
                  "meaning": "established in yoga, perform actions"
                },
                {
                  "sanskrit": "सङ्गम् त्यक्त्वा धनञ्जय",
                  "iast": "saṅgam tyaktvā dhanañjaya",
                  "meaning": "abandoning attachment, O Dhananjaya"
                },
                {
                  "sanskrit": "सिद्धि-असिद्ध्योः समः भूत्वा",
                  "iast": "siddhi-asiddhyoḥ samaḥ bhūtvā",
                  "meaning": "remaining even-minded in success and failure"
                },
                {
                  "sanskrit": "समत्वम् योगः उच्यते",
                  "iast": "samatvam yogaḥ ucyate",
                  "meaning": "equanimity of mind is called Yoga"
                }
              ],
              "english": "Established in Yoga, perform your duties abandoning all attachment, O Dhananjaya, remaining balanced in success and failure; for equanimity of mind is Yoga.",
              "hindi": "हे धनञ्जय! आसक्ति को त्यागकर तथा सिद्धि और असिद्धि में समान बुद्धि वाला होकर योग में स्थित हुआ कर्म कर; क्योंकि समत्व ही योग कहलाता है।",
              "commentary": "'Samatvam Yoga Ucyate'—equanimity in the face of dual outcomes is the core operational definition of Yoga.",
              "audio": ""
            },
            {
              "id": "bg_2_50",
              "verse_number": "2.50",
              "citation": "Bhagavad Gita 2.50",
              "meter": "Anuṣṭubh",
              "sanskrit": "बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते ।\nतस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम् ॥",
              "transliteration": "buddhi-yukto jahātīha ubhe sukṛta-duṣkṛte |\ntasmād yogāya yujyasva yogaḥ karmasu kauśalam ||",
              "word_meanings": [
                {
                  "sanskrit": "बुद्धि-युक्तः",
                  "iast": "buddhi-yuktaḥ",
                  "meaning": "endowed with evenness of wisdom"
                },
                {
                  "sanskrit": "जहाति इह उभे सुकृत-दुष्कृते",
                  "iast": "jahāti iha ubhe sukṛta-duṣkṛte",
                  "meaning": "casts off both good and evil deeds here"
                },
                {
                  "sanskrit": "तस्मात् योगाय युज्यस्व",
                  "iast": "tasmāt yogāya yujyasva",
                  "meaning": "therefore dedicate yourself to Yoga"
                },
                {
                  "sanskrit": "योगः कर्मसु कौशलम्",
                  "iast": "yogaḥ karmasu kauśalam",
                  "meaning": "Yoga is dexterity / skill in action"
                }
              ],
              "english": "One endowed with equanimous wisdom casts off in this very life both good and evil deeds. Therefore, dedicate yourself to Yoga; Yoga is skill in action.",
              "hindi": "समबुद्धि से युक्त पुरुष यहाँ पुण्य और पाप दोनों का त्याग कर देता है। इसलिए तू योग में लग जा; क्योंकि कर्मों में कुशलता ही योग है।",
              "commentary": "'Yogah Karmasu Kaushalam'—Yoga is supreme dexterity and efficiency in selfless work without binding the spirit.",
              "audio": ""
            },
            {
              "id": "bg_2_55",
              "verse_number": "2.55",
              "citation": "Bhagavad Gita 2.55",
              "meter": "Anuṣṭubh",
              "sanskrit": "श्रीभगवानुवाच ।\nप्रजहाति यदा कामान्सर्वान्पार्थ मनोगतान् ।\nआत्मन्येवात्मना तुष्टः स्थितप्रज्ञस्तदोच्यते ॥",
              "transliteration": "śrī-bhagavān uvāca |\nprajahāti yadā kāmān sarvān pārtha mano-gatān |\nātmany evātmanā tuṣṭaḥ sthita-prajñas tadocyate ||",
              "word_meanings": [
                {
                  "sanskrit": "श्रीभगवान् उवाच",
                  "iast": "śrī-bhagavān uvāca",
                  "meaning": "The Supreme Lord said"
                },
                {
                  "sanskrit": "प्रजहाति यदा कामान् सर्वान्",
                  "iast": "prajahāti yadā kāmān sarvān",
                  "meaning": "when one completely casts off all desires"
                },
                {
                  "sanskrit": "मनोगतान्",
                  "iast": "mano-gatān",
                  "meaning": "dwelling in the mind"
                },
                {
                  "sanskrit": "आत्मनि एव आत्मना तुष्टः",
                  "iast": "ātmani eva ātmanā tuṣṭaḥ",
                  "meaning": "satisfied in the Self alone by the Self"
                },
                {
                  "sanskrit": "स्थित-प्रज्ञः तदा उच्यते",
                  "iast": "sthita-prajñaḥ tadā ucyate",
                  "meaning": "then is one called a person of steady wisdom"
                }
              ],
              "english": "The Supreme Lord said: When a person completely casts away all desires of the mind, satisfied in the Self alone by the Self, then is he called a person of steady wisdom (Sthitaprajna).",
              "hindi": "श्रीभगवान् बोले: हे पार्थ! जिस समय मनुष्य मन में स्थित सम्पूर्ण कामनाओं का त्याग कर देता है और आत्मा से आत्मा में ही सन्तुष्ट रहता है, तब वह 'स्थितप्रज्ञ' कहा जाता है।",
              "commentary": "The foundational portrait of the Sthitaprajna—joy rooted in the self-luminous Self rather than external objects.",
              "audio": ""
            },
            {
              "id": "bg_2_56",
              "verse_number": "2.56",
              "citation": "Bhagavad Gita 2.56",
              "meter": "Anuṣṭubh",
              "sanskrit": "दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः ।\nवीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते ॥",
              "transliteration": "duḥkheṣv anudvigna-manāḥ sukheṣu vigata-spṛhaḥ |\nvīta-rāga-bhaya-krodhaḥ sthita-dhīr munir ucyate ||",
              "word_meanings": [
                {
                  "sanskrit": "दुःखेषु अनुद्विग्न-मनाः",
                  "iast": "duḥkheṣu anudvigna-manāḥ",
                  "meaning": "whose mind is unshaken in adversity"
                },
                {
                  "sanskrit": "सुखेषु विगत-स्पृहः",
                  "iast": "sukheṣu vigata-spṛhaḥ",
                  "meaning": "who has no craving in prosperity"
                },
                {
                  "sanskrit": "वीत-राग-भय-क्रोधः",
                  "iast": "vīta-rāga-bhaya-krodhaḥ",
                  "meaning": "freed from attachment, fear, and anger"
                },
                {
                  "sanskrit": "स्थित-धीः मुनिः उच्यते",
                  "iast": "sthita-dhīḥ munir ucyate",
                  "meaning": "is called a sage of steady intellect"
                }
              ],
              "english": "He whose mind is unshaken in adversity, who has no craving in prosperity, and who is free from attachment, fear, and anger, is called a sage of steady intellect.",
              "hindi": "दुःखों की प्राप्ति में जिसके मन में उद्वेग नहीं होता, सुखों की प्राप्ति में जो सर्वथा निष्स्पृह है तथा जिसके राग, भय और क्रोध नष्ट हो गए हैं, वह मुनि 'स्थिरबुद्धि' कहा जाता है।",
              "commentary": "Psychological equilibrium: freedom from the triad of Raga (attachment), Bhaya (fear), and Krodha (anger).",
              "audio": ""
            },
            {
              "id": "bg_2_62",
              "verse_number": "2.62",
              "citation": "Bhagavad Gita 2.62",
              "meter": "Anuṣṭubh",
              "sanskrit": "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते ।\nसङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते ॥",
              "transliteration": "dhyāyato viṣayān puṁsaḥ saṅgas teṣūpajāyate |\nsaṅgāt sañjāyate kāmaḥ kāmāt krodho 'bhijāyate ||",
              "word_meanings": [
                {
                  "sanskrit": "ध्यायतः विषयान् पुंसः",
                  "iast": "dhyāyataḥ viṣayān puṁsaḥ",
                  "meaning": "for a person contemplating sense objects"
                },
                {
                  "sanskrit": "सङ्गः तेषु उपजायते",
                  "iast": "saṅgaḥ teṣu upajāyate",
                  "meaning": "attachment to them develops"
                },
                {
                  "sanskrit": "सङ्गात् सञ्जायते कामः",
                  "iast": "saṅgāt sañjāyate kāmaḥ",
                  "meaning": "from attachment arises desire"
                },
                {
                  "sanskrit": "कामात् क्रोधः अभिजायते",
                  "iast": "kāmāt krodhaḥ abhijāyate",
                  "meaning": "from thwarted desire anger is born"
                }
              ],
              "english": "Dwelling on sense objects, a person develops attachment for them; from attachment arises desire; from desire anger is born.",
              "hindi": "विषयों का चिन्तन करने वाले पुरुष की उनमें आसक्ति हो जाती है, आसक्ति से कामना उत्पन्न होती है और कामना में विघ्न पड़ने से क्रोध उत्पन्न होता है।",
              "commentary": "First half of the famous psychological ladder of downfall.",
              "audio": ""
            },
            {
              "id": "bg_2_63",
              "verse_number": "2.63",
              "citation": "Bhagavad Gita 2.63",
              "meter": "Anuṣṭubh",
              "sanskrit": "क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः ।\nस्मृतिभ्रंशाद्बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ॥",
              "transliteration": "krodhād bhavati sammohaḥ sammohāt smṛti-vibhramaḥ |\nsmṛti-bhraṁśād buddhi-nāśo buddhi-nāśāt praṇaśyati ||",
              "word_meanings": [
                {
                  "sanskrit": "क्रोधात् भवति संमोहः",
                  "iast": "krodhāt bhavati sammohaḥ",
                  "meaning": "from anger arises delusion"
                },
                {
                  "sanskrit": "संमोहात् स्मृति-विभ्रमः",
                  "iast": "sammohāt smṛti-vibhramaḥ",
                  "meaning": "from delusion loss of memory"
                },
                {
                  "sanskrit": "स्मृति-भ्रंशात् बुद्धि-नाशः",
                  "iast": "smṛti-bhraṁśāt buddhi-nāśaḥ",
                  "meaning": "from loss of memory destruction of intellect"
                },
                {
                  "sanskrit": "बुद्धि-नाशात् प्रणश्यति",
                  "iast": "buddhi-nāśāt praṇaśyati",
                  "meaning": "from ruin of intellect one is lost"
                }
              ],
              "english": "From anger comes delusion; from delusion, confusion of memory; from loss of memory, the destruction of discriminative intellect; and from destruction of intellect, the person perishes.",
              "hindi": "क्रोध से सम्मोह (अविवेक) उत्पन्न होता है, सम्मोह से स्मृति भ्रमित होती है, स्मृतिभ्रंश से बुद्धि का नाश होता है और बुद्धि के नाश होने से मनुष्य का सर्वनाश हो जाता है।",
              "commentary": "The eight-step psychological cascading failure concluding in Buddhi-nasha (ruin of discriminative faculty).",
              "audio": ""
            },
            {
              "id": "bg_2_70",
              "verse_number": "2.70",
              "citation": "Bhagavad Gita 2.70",
              "meter": "Triṣṭubh",
              "sanskrit": "आपूर्यमाणमचलप्रतिष्ठं\nसमुद्रमापः प्रविशन्ति यद्वत् ।\nतद्वत्कामा यं प्रविशन्ति सर्वे\nस शान्तिमाप्नोति न कामकामी ॥",
              "transliteration": "āpūryamāṇam acala-pratiṣṭhaṁ\nsamudram āpaḥ praviśanti yadvat |\ntadvat kāmā yaṁ praviśanti sarve\nsa śāntim āpnoti na kāma-kāmī ||",
              "word_meanings": [
                {
                  "sanskrit": "आपूर्यमाणम् अचल-प्रतिष्ठम्",
                  "iast": "āpūryamāṇam acala-pratiṣṭham",
                  "meaning": "ever full yet motionless and unshaken"
                },
                {
                  "sanskrit": "समुद्रम् आपः प्रविशन्ति यद्वत्",
                  "iast": "samudram āpaḥ praviśanti yadvat",
                  "meaning": "just as waters flow into the ocean"
                },
                {
                  "sanskrit": "तद्वत् कामाः यम् प्रविशन्ति सर्वे",
                  "iast": "tadvat kāmāḥ yam praviśanti sarve",
                  "meaning": "so into whom all desires enter without disturbing him"
                },
                {
                  "sanskrit": "सः शान्तिम् आप्नोति",
                  "iast": "saḥ śāntim āpnoti",
                  "meaning": "he attains peace"
                },
                {
                  "sanskrit": "न काम-कामी",
                  "iast": "na kāma-kāmī",
                  "meaning": "not he who craves desires"
                }
              ],
              "english": "Just as the ocean remains full and motionless though all waters continuously flow into it, so the person into whom all desires enter without disturbing attains peace, not he who hungers after desires.",
              "hindi": "जैसे सब ओर से परिपूर्ण अचल प्रतिष्ठा वाले समुद्र में नदियाँ बिना उसे विचलित किए समा जाती हैं, वैसे ही जिस पुरुष में सम्पूर्ण भोग बिना विकार उत्पन्न किए समा जाते हैं, वही शान्ति को प्राप्त होता है, भोगों की कामना करने वाला नहीं।",
              "commentary": "The grand ocean metaphor: true peace is boundless inner depth where sensory impressions dissolve without agitating the core Self.",
              "audio": ""
            },
            {
              "id": "bg_2_71",
              "verse_number": "2.71",
              "citation": "Bhagavad Gita 2.71",
              "meter": "Anuṣṭubh",
              "sanskrit": "विहाय कामान्यः सर्वान्पुमांश्चरति निःस्पृहः ।\nनिर्ममो निरहङ्कारः स शान्तिमधिगच्छति ॥",
              "transliteration": "vihāya kāmān yaḥ sarvān pumāṁś carati niḥspṛhaḥ |\nnirmamo nirahaṅkāraḥ sa śāntim adhigacchati ||",
              "word_meanings": [
                {
                  "sanskrit": "विहाय कामान् यः सर्वान्",
                  "iast": "vihāya kāmān yaḥ sarvān",
                  "meaning": "who, casting off all desires"
                },
                {
                  "sanskrit": "पुमान् चरति निःस्पृहः",
                  "iast": "pumān carati niḥspṛhaḥ",
                  "meaning": "moves about free from longing"
                },
                {
                  "sanskrit": "निर्ममः निरहङ्कारः",
                  "iast": "nirmamaḥ nirahaṅkāraḥ",
                  "meaning": "without the sense of 'mine' and free from egoism"
                },
                {
                  "sanskrit": "सः शान्तिम् अधिगच्छति",
                  "iast": "saḥ śāntim adhigacchati",
                  "meaning": "he attains supreme peace"
                }
              ],
              "english": "That person who abandons all desires and moves about free from longing, without the sense of 'mine' and free from egoism, attains supreme peace.",
              "hindi": "जो पुरुष सम्पूर्ण कामनाओं को त्यागकर ममतारहित, अहंकाररहित और स्पृहारहित होकर विचरण करता है, वही परम शान्ति को प्राप्त होता है।",
              "commentary": "Nirmama (unpossessive) and Nirahankara (egoless) are the dual wings of spiritual liberation.",
              "audio": ""
            },
            {
              "id": "bg_2_72",
              "verse_number": "2.72",
              "citation": "Bhagavad Gita 2.72",
              "meter": "Anuṣṭubh",
              "sanskrit": "एषा ब्राह्मी स्थितिः पार्थ नैनां प्राप्य विमुह्यति ।\nस्थित्वास्यामन्तकालेऽपि ब्रह्मनिर्वाणमृच्छति ॥",
              "transliteration": "eṣā brāhmī sthitiḥ pārtha naināṁ prāpya vimuhyati |\nsthitvāsyām anta-kāle 'pi brahma-nirvāṇam ṛcchati ||",
              "word_meanings": [
                {
                  "sanskrit": "एषा ब्राह्मी स्थितिः पार्थ",
                  "iast": "eṣā brāhmī sthitiḥ pārtha",
                  "meaning": "this is the state of abiding in Brahman, O Partha"
                },
                {
                  "sanskrit": "न एनाम् प्राप्य विमुह्यति",
                  "iast": "na enām prāpya vimuhyati",
                  "meaning": "having attained this, one is never deluded again"
                },
                {
                  "sanskrit": "स्थित्वा अस्याम् अन्त-काले अपि",
                  "iast": "sthitvā asyām anta-kāle api",
                  "meaning": "established in this even at the final hour of death"
                },
                {
                  "sanskrit": "ब्रह्म-निर्वाणम् ऋच्छति",
                  "iast": "brahma-nirvāṇam ṛcchati",
                  "meaning": "one attains liberation in Brahman (Brahma-nirvana)"
                }
              ],
              "english": "This, O Partha, is the state of abiding in Brahman (Brahmi Sthiti). Having attained this, one is never deluded again. Being established in this even at the final hour of death, one attains liberation in Brahman (Brahma-Nirvana).",
              "hindi": "हे पार्थ! यह ब्रह्म में स्थित पुरुष की स्थिति है; इसको प्राप्त होकर मनुष्य कभी मोहित नहीं होता। अन्तकाल में भी इस स्थिति में स्थित होकर वह ब्रह्म-निर्वाण (परम मोक्ष) को प्राप्त हो जाता है।",
              "commentary": "Brahmi Sthiti: the culmination of Chapter 2, where consciousness merges in non-dual immortality.",
              "audio": ""
            }
          ]
        },
        {
          "id": "bg_ch_03",
          "chapter_number": 3,
          "title": "Chapter 3: Karma Yoga",
          "sanskrit_title": "कर्मयोग (तृतीयोऽध्यायः)",
          "transliteration": "Karmayoga",
          "summary": "The Yoga of Action. Lord Krishna explains why selfless action is superior to premature renunciation, how the cosmic wheel (Yajna) sustains creation, the duty of noble leaders to set righteous standards (Lokasangraha), and how to conquer desire and wrath.",
          "verses": [
            {
              "id": "bg_3_4",
              "verse_number": "3.4",
              "citation": "Bhagavad Gita 3.4",
              "meter": "Anuṣṭubh",
              "sanskrit": "न कर्मणामनारम्भान्नैष्कर्म्यं पुरुषोऽश्नुते ।\nन च संन्यसनादेव सिद्धिं समधिगच्छति ॥",
              "transliteration": "na karmaṇām anārambhān naiṣkarmyaṁ puruṣo 'śnute |\nna ca sannyasanād eva siddhiṁ samadhigacchati ||",
              "word_meanings": [
                {
                  "sanskrit": "न कर्मणाम् अनारम्भात्",
                  "iast": "na karmaṇām anārambhāt",
                  "meaning": "not by abstaining from actions"
                },
                {
                  "sanskrit": "नैष्कर्म्यम् पुरुषः अश्नुते",
                  "iast": "naiṣkarmyam puruṣo 'śnute",
                  "meaning": "does a person attain actionlessness"
                },
                {
                  "sanskrit": "न च संन्यसनात् एव",
                  "iast": "na ca sannyasanād eva",
                  "meaning": "nor by mere external renunciation"
                },
                {
                  "sanskrit": "सिद्धिम् समधिगच्छति",
                  "iast": "siddhim samadhigacchati",
                  "meaning": "does one attain spiritual perfection"
                }
              ],
              "english": "Not by merely abstaining from action does a person attain freedom from action (Naishkarmya), nor by mere physical renunciation does one attain spiritual perfection.",
              "hindi": "न तो कर्मों का आरम्भ किए बिना मनुष्य निष्कर्मता को प्राप्त होता है और न कर्मों के केवल त्याग मात्र से सिद्धि (भगवत्प्राप्ति) को प्राप्त होता है।",
              "commentary": "Refutation of superficial monastic escapism. Inner detachment, not external abstention, is true renunciation.",
              "audio": ""
            },
            {
              "id": "bg_3_8",
              "verse_number": "3.8",
              "citation": "Bhagavad Gita 3.8",
              "meter": "Anuṣṭubh",
              "sanskrit": "नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मणः ।\nशरीरयात्रापि च ते न प्रसिद्ध्येदकर्मणः ॥",
              "transliteration": "niyataṁ kuru karma tvaṁ karma jyāyo hy akarmaṇaḥ |\nśarīra-yātrāpi ca te na prasiddhyed akarmaṇaḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "नियतम् कुरु कर्म त्वम्",
                  "iast": "niyatam kuru karma tvam",
                  "meaning": "perform your prescribed duties"
                },
                {
                  "sanskrit": "कर्म ज्यायः हि अकर्मणः",
                  "iast": "karma jyāyaḥ hi akarmaṇaḥ",
                  "meaning": "for action is indeed superior to inaction"
                },
                {
                  "sanskrit": "शरीर-यात्रा अपि च ते",
                  "iast": "śarīra-yātrā api ca te",
                  "meaning": "even the maintenance of your body"
                },
                {
                  "sanskrit": "न प्रसिद्ध्येत् अकर्मणः",
                  "iast": "na prasiddhyet akarmaṇaḥ",
                  "meaning": "would not be possible without action"
                }
              ],
              "english": "Perform your prescribed duty, for action is indeed better than inaction. Even the bare maintenance of your body would not be possible through inaction.",
              "hindi": "तुम अपने नियत कर्म करो, क्योंकि कर्म न करने की अपेक्षा कर्म करना श्रेष्ठ है; और कर्म न करने से तुम्हारा शरीर-निर्वाह भी सिद्ध नहीं होगा।",
              "commentary": "Action is an inescapable biological and ethical imperative of embodied life.",
              "audio": ""
            },
            {
              "id": "bg_3_9",
              "verse_number": "3.9",
              "citation": "Bhagavad Gita 3.9",
              "meter": "Anuṣṭubh",
              "sanskrit": "यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः ।\nतदर्थं कर्म कौन्तेय मुक्तसङ्गः समाचर ॥",
              "transliteration": "yajñārthāt karmaṇo 'nyatra loko 'yaṁ karma-bandhanaḥ |\ntad-arthaṁ karma kaunteya mukta-saṅgaḥ samācara ||",
              "word_meanings": [
                {
                  "sanskrit": "यज्ञ-अर्थात् कर्मणः अन्यत्र",
                  "iast": "yajña-arthāt karmaṇaḥ anyatra",
                  "meaning": "work done other than as a sacred offering (Yajna)"
                },
                {
                  "sanskrit": "लोकः अयम् कर्म-बन्धनः",
                  "iast": "loko 'yam karma-bandhanaḥ",
                  "meaning": "this world is bound by action"
                },
                {
                  "sanskrit": "तद्-अर्थम् कर्म कौन्तेय",
                  "iast": "tad-artham karma kaunteya",
                  "meaning": "for that purpose (as an offering), O Kaunteya"
                },
                {
                  "sanskrit": "मुक्त-सङ्गः समाचर",
                  "iast": "mukta-saṅgaḥ samācara",
                  "meaning": "perform work free from all attachment"
                }
              ],
              "english": "Work done as a sacrifice (Yajna) for the Divine frees one from binding karma; any other work binds this world. Perform action for that purpose, O Kaunteya, free from all attachment.",
              "hindi": "यज्ञ के निमित्त किए जाने वाले कर्मों के अतिरिक्त अन्य कर्मों में लगा हुआ यह संसार कर्म-बन्धन में बँधता है; इसलिए हे कौन्तेय! आसक्ति त्यागकर यज्ञ के निमित्त ही कर्म का भली-भाँति आचरण करो।",
              "commentary": "Yajna as selfless contribution: action consecrated to the cosmic whole liberates instead of binding.",
              "audio": ""
            },
            {
              "id": "bg_3_19",
              "verse_number": "3.19",
              "citation": "Bhagavad Gita 3.19",
              "meter": "Anuṣṭubh",
              "sanskrit": "तस्मादसक्तः सततं कार्यं कर्म समाचर ।\nअसक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः ॥",
              "transliteration": "tasmād asaktaḥ satataṁ kāryaṁ karma samācara |\nasakto hy ācaran karma param āpnoti pūruṣaḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "तस्मात् असक्तः सततम्",
                  "iast": "tasmāt asaktaḥ satatam",
                  "meaning": "therefore, unattached, continually"
                },
                {
                  "sanskrit": "कार्यम् कर्म समाचर",
                  "iast": "kāryam karma samācara",
                  "meaning": "perform the obligatory duty"
                },
                {
                  "sanskrit": "असक्तः हि आचरन् कर्म",
                  "iast": "asakto hy ācaran karma",
                  "meaning": "for performing action without attachment"
                },
                {
                  "sanskrit": "परम् आप्नोति पूरुषः",
                  "iast": "param āpnoti pūruṣaḥ",
                  "meaning": "a person attains the Supreme"
                }
              ],
              "english": "Therefore, constantly perform your obligatory work without attachment, for by doing work without attachment, a person attains the Supreme.",
              "hindi": "इसलिए तुम निरन्तर आसक्ति से रहित होकर कर्तव्य-कर्म का आचरण करो; क्योंकि अनासक्त होकर कर्म करता हुआ मनुष्य परमात्मा को प्राप्त हो जाता है।",
              "commentary": "Nishkama Karma is directly confirmed as a complete and sufficient vehicle for final liberation.",
              "audio": ""
            },
            {
              "id": "bg_3_21",
              "verse_number": "3.21",
              "citation": "Bhagavad Gita 3.21",
              "meter": "Anuṣṭubh",
              "sanskrit": "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः ।\nस यत्प्रमाणं कुरुते लोकस्तदनुवर्तते ॥",
              "transliteration": "yad yad ācarati śreṣṭhas tat tad evetaro janaḥ |\nsa yat pramāṇaṁ kurute lokas tad anuvartate ||",
              "word_meanings": [
                {
                  "sanskrit": "यत् यत् आचरति श्रेष्ठः",
                  "iast": "yad yad ācarati śreṣṭhaḥ",
                  "meaning": "whatever standard a great person sets by action"
                },
                {
                  "sanskrit": "तत् तत् एव इतरः जनः",
                  "iast": "tat tad eva itaro janaḥ",
                  "meaning": "that very standard other people follow"
                },
                {
                  "sanskrit": "सः यत् प्रमाणम् कुरुते",
                  "iast": "saḥ yat pramāṇam kurute",
                  "meaning": "whatever benchmark he establishes"
                },
                {
                  "sanskrit": "लोकः तत् अनुवर्तते",
                  "iast": "lokas tad anuvartate",
                  "meaning": "the world emulates and follows"
                }
              ],
              "english": "Whatever a great person does, common people follow; whatever standard he sets, the world emulates.",
              "hindi": "श्रेष्ठ पुरुष जो-जो आचरण करता है, अन्य लोग भी वैसा-वैसा ही आचरण करते हैं; वह जो प्रमाण कर देता है, संसार उसी के अनुसार चलता है।",
              "commentary": "The principle of Lokasangraha: leadership by moral example and personal integrity.",
              "audio": ""
            },
            {
              "id": "bg_3_27",
              "verse_number": "3.27",
              "citation": "Bhagavad Gita 3.27",
              "meter": "Anuṣṭubh",
              "sanskrit": "प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः ।\nअहङ्कारविमूढात्मा कर्ताहमिति मन्यते ॥",
              "transliteration": "prakṛteḥ kriyamāṇāni guṇaiḥ karmāṇi sarvaśaḥ |\nahaṅkāra-vimūḍhātmā kartāham iti manyate ||",
              "word_meanings": [
                {
                  "sanskrit": "प्रकृतेः गुणैः",
                  "iast": "prakṛteḥ guṇaiḥ",
                  "meaning": "by the modes (gunas) of Nature"
                },
                {
                  "sanskrit": "क्रियमाणानि कर्माणि सर्वशः",
                  "iast": "kriyamāṇāni karmāṇi sarvaśaḥ",
                  "meaning": "all actions everywhere are being performed"
                },
                {
                  "sanskrit": "अहङ्कार-विमूढ-आत्मा",
                  "iast": "ahaṅkāra-vimūḍha-ātmā",
                  "meaning": "one bewildered by the false ego"
                },
                {
                  "sanskrit": "कर्ता अहम् इति मन्यते",
                  "iast": "kartā aham iti manyate",
                  "meaning": "thinks 'I am the doer'"
                }
              ],
              "english": "All actions are performed in all respects by the modes (gunas) of Nature. He whose mind is deluded by egoism thinks: 'I am the doer.'",
              "hindi": "सम्पूर्ण कर्म सब प्रकार से प्रकृति के गुणों द्वारा ही किए जाते हैं, तो भी जिसका अन्तःकरण अहंकार से मोहित हो रहा है, वह अज्ञानी 'मैं कर्ता हूँ' ऐसा मानता है।",
              "commentary": "Disidentification: the pure witness (Sakshi) is not the mechanical doer of nature's impulses.",
              "audio": ""
            },
            {
              "id": "bg_3_35",
              "verse_number": "3.35",
              "citation": "Bhagavad Gita 3.35",
              "meter": "Anuṣṭubh",
              "sanskrit": "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् ।\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः ॥",
              "transliteration": "śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt |\nsva-dharme nidhanaṁ śreyaḥ para-dharmo bhayāvahaḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "श्रेयान् स्व-धर्मः विगुणः",
                  "iast": "śreyān sva-dharmaḥ viguṇaḥ",
                  "meaning": "better is one's own natural duty, even if devoid of merit"
                },
                {
                  "sanskrit": "पर-धर्मात् सु-अनुष्ठितात्",
                  "iast": "para-dharmāt su-anuṣṭhitāt",
                  "meaning": "than another's duty well-performed"
                },
                {
                  "sanskrit": "स्व-धर्मे निधनम् श्रेयः",
                  "iast": "sva-dharme nidhanam śreyaḥ",
                  "meaning": "death in one's own duty is auspicious"
                },
                {
                  "sanskrit": "पर-धर्मः भय-आवहः",
                  "iast": "para-dharmaḥ bhaya-āvahaḥ",
                  "meaning": "another's duty is fraught with peril"
                }
              ],
              "english": "Better is one's own natural duty (Svadharma), though imperfectly performed, than the duty of another well-executed. Death in the discharge of one's own duty is auspicious; the duty of another is perilous.",
              "hindi": "अच्छी प्रकार आचरण में लाए हुए दूसरे के धर्म से गुणरहित भी अपना धर्म श्रेष्ठ है। अपने धर्म में तो मरना भी कल्याणकारक है और दूसरे का धर्म भय को देने वाला है।",
              "commentary": "Svadharma: living in harmony with one's authentic inner nature (svabhava) rather than imitating others.",
              "audio": ""
            },
            {
              "id": "bg_3_42",
              "verse_number": "3.42",
              "citation": "Bhagavad Gita 3.42",
              "meter": "Anuṣṭubh",
              "sanskrit": "इन्द्रियाणि पराण्याहुरिन्द्रियेभ्यः परं मनः ।\nमनसस्तु परा बुद्धिर्यो बुद्धेः परतस्तु सः ॥",
              "transliteration": "indriyāṇi parāṇy āhur indriyebhyaḥ paraṁ manaḥ |\nmanasas tu parā buddhir yo buddheḥ paratas tu saḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "इन्द्रियाणि पराणि आहुः",
                  "iast": "indriyāṇi parāṇi āhuḥ",
                  "meaning": "the senses are said to be superior to matter"
                },
                {
                  "sanskrit": "इन्द्रियेभ्यः परम् मनः",
                  "iast": "indriyebhyaḥ param manaḥ",
                  "meaning": "superior to the senses is the mind"
                },
                {
                  "sanskrit": "मनसः तु परा बुद्धिः",
                  "iast": "manasaḥ tu parā buddhiḥ",
                  "meaning": "superior to the mind is the intellect"
                },
                {
                  "sanskrit": "यः बुद्धेः परतः तु सः",
                  "iast": "yaḥ buddheḥ parataḥ tu saḥ",
                  "meaning": "and that which is beyond the intellect is the Self"
                }
              ],
              "english": "The senses are superior to physical matter; superior to the senses is the mind; superior to the mind is the intellect (Buddhi); and that which is even beyond the intellect is the Self (Atman).",
              "hindi": "इन्द्रियों को स्थूल शरीर से श्रेष्ठ कहते हैं, इन्द्रियों से श्रेष्ठ मन है, मन से श्रेष्ठ बुद्धि है और जो बुद्धि से भी परे है, वह आत्मा है।",
              "commentary": "The internal hierarchy of human consciousness enabling self-mastery through soul-awareness.",
              "audio": ""
            }
          ]
        },
        {
          "id": "bg_ch_04",
          "chapter_number": 4,
          "title": "Chapter 4: Jnana Karma Sanyasa Yoga",
          "sanskrit_title": "ज्ञानकर्मसंन्यासयोग (चतुर्थोऽध्यायः)",
          "transliteration": "Jñānakarmasannyāsayoga",
          "summary": "The Yoga of Knowledge and the Renunciation of Action in Knowledge. Lord Krishna reveals the lineage of solar wisdom, the divine purpose of Avataric incarnation across yugas, the secret of seeing action in inaction, and the purifying fire of Brahma-Jnana.",
          "verses": [
            {
              "id": "bg_4_7",
              "verse_number": "4.7",
              "citation": "Bhagavad Gita 4.7",
              "meter": "Anuṣṭubh",
              "sanskrit": "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥",
              "transliteration": "yadā yadā hi dharmasya glānir bhavati bhārata |\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham ||",
              "word_meanings": [
                {
                  "sanskrit": "यदा यदा हि धर्मस्य",
                  "iast": "yadā yadā hi dharmasya",
                  "meaning": "whenever indeed of righteousness (Dharma)"
                },
                {
                  "sanskrit": "ग्लानिः भवति भारत",
                  "iast": "glāniḥ bhavati bhārata",
                  "meaning": "there is a decline, O descendant of Bharata"
                },
                {
                  "sanskrit": "अभ्युत्थानम् अधर्मस्य",
                  "iast": "abhyutthānam adharmasya",
                  "meaning": "and an ascendance of unrighteousness"
                },
                {
                  "sanskrit": "तदा आत्मानम् सृजामि अहम्",
                  "iast": "tadā ātmānam sṛjāmi aham",
                  "meaning": "at that time I manifest Myself"
                }
              ],
              "english": "Whenever and wherever there is a decline in righteousness, O Bharata, and an ascendance of unrighteousness, at that time I manifest Myself.",
              "hindi": "हे भारत! जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं अपने रूप को रचता हूँ अर्थात् प्रकट करता हूँ।",
              "commentary": "The foundational scripture on the Avatar doctrine: periodic divine intervention to restore cosmic order.",
              "audio": ""
            },
            {
              "id": "bg_4_8",
              "verse_number": "4.8",
              "citation": "Bhagavad Gita 4.8",
              "meter": "Anuṣṭubh",
              "sanskrit": "परित्राणाय साधूनां विनाशाय च दुष्कृताम् ।\nधर्मसंस्थापनार्थाय संभवामि युगे युगे ॥",
              "transliteration": "paritrāṇāya sādhūnāṁ vināśāya ca duṣkṛtām |\ndharma-saṁsthāpanārthāya sambhavāmi yuge yuge ||",
              "word_meanings": [
                {
                  "sanskrit": "परित्राणाय साधूनाम्",
                  "iast": "paritrāṇāya sādhūnām",
                  "meaning": "for the protection of the virtuous"
                },
                {
                  "sanskrit": "विनाशाय च दुष्कृताम्",
                  "iast": "vināśāya ca duṣkṛtām",
                  "meaning": "and for the destruction of evildoers"
                },
                {
                  "sanskrit": "धर्म-संस्थापन-अर्थाय",
                  "iast": "dharma-saṁsthāpana-arthāya",
                  "meaning": "for re-establishing the cosmic order of Dharma"
                },
                {
                  "sanskrit": "संभवामि युगे युगे",
                  "iast": "sambhavāmi yuge yuge",
                  "meaning": "I incarnate age after age"
                }
              ],
              "english": "For the protection of the virtuous, the destruction of evil-doers, and the firm re-establishment of cosmic order (Dharma), I incarnate age after age.",
              "hindi": "साधु पुरुषों के उद्धार के लिए, पापकर्म करने वालों के विनाश के लिए और धर्म की अच्छी तरह स्थापना करने के लिए मैं युग-युग में प्रकट हुआ करता हूँ।",
              "commentary": "The triple purpose of the Divine descent: protecting virtue, dissolving corruption, and establishing Dharma.",
              "audio": ""
            },
            {
              "id": "bg_4_18",
              "verse_number": "4.18",
              "citation": "Bhagavad Gita 4.18",
              "meter": "Anuṣṭubh",
              "sanskrit": "कर्मण्यकर्म यः पश्येदकर्मणि च कर्म यः ।\nस बुद्धिमान्मनुष्येषु स युक्तः कृत्स्नकर्मकृत् ॥",
              "transliteration": "karmaṇy akarma yaḥ paśyed akarmaṇi ca karma yaḥ |\nsa buddhimān manuṣyeṣu sa yuktaḥ kṛtsna-karma-kṛt ||",
              "word_meanings": [
                {
                  "sanskrit": "कर्मणि अकर्म यः पश्येत्",
                  "iast": "karmaṇi akarma yaḥ paśyet",
                  "meaning": "he who sees inaction in action"
                },
                {
                  "sanskrit": "अकर्मणि च कर्म यः",
                  "iast": "akarmaṇi ca karma yaḥ",
                  "meaning": "and action in inaction"
                },
                {
                  "sanskrit": "सः बुद्धिमान् मनुष्येषु",
                  "iast": "saḥ buddhimān manuṣyeṣu",
                  "meaning": "he is wise among human beings"
                },
                {
                  "sanskrit": "सः युक्तः कृत्स्न-कर्म-कृत्",
                  "iast": "saḥ yuktaḥ kṛtsna-karma-kṛt",
                  "meaning": "he is a yogi who has accomplished all work"
                }
              ],
              "english": "He who sees inaction in action, and action in inaction, is enlightened among men; he is a yogi who has accomplished all actions.",
              "hindi": "जो मनुष्य कर्म में अकर्म (अनासक्ति) देखता है और अकर्म में कर्म देखता है, वह मनुष्यों में बुद्धिमान है और वह सम्पूर्ण कर्मों को करने वाला सच्चा योगी है।",
              "commentary": "The paradox of non-dual action: active in the world while remaining the motionless witness.",
              "audio": ""
            },
            {
              "id": "bg_4_24",
              "verse_number": "4.24",
              "citation": "Bhagavad Gita 4.24",
              "meter": "Anuṣṭubh",
              "sanskrit": "ब्रह्मार्पणं ब्रह्म हविर्ब्रह्माग्नौ ब्रह्मणा हुतम् ।\nब्रह्मैव तेन गन्तव्यं ब्रह्मकर्मसमाधिना ॥",
              "transliteration": "brahmārpaṇaṁ brahma havir brahmāgnau brahmaṇā hutam |\nbrahmaiva tena gantavyaṁ brahma-karma-samādhinā ||",
              "word_meanings": [
                {
                  "sanskrit": "ब्रह्म अर्पणम्",
                  "iast": "brahma arpaṇam",
                  "meaning": "the offering instrument is Brahman"
                },
                {
                  "sanskrit": "ब्रह्म हविः",
                  "iast": "brahma haviḥ",
                  "meaning": "the oblation is Brahman"
                },
                {
                  "sanskrit": "ब्रह्म-अग्नौ ब्रह्मणा हुतम्",
                  "iast": "brahma-agnau brahmaṇā hutam",
                  "meaning": "poured into the fire of Brahman by Brahman"
                },
                {
                  "sanskrit": "ब्रह्म एव तेन गन्तव्यम्",
                  "iast": "brahma eva tena gantavyam",
                  "meaning": "Brahman alone shall be reached by him"
                },
                {
                  "sanskrit": "ब्रह्म-कर्म-समाधिना",
                  "iast": "brahma-karma-samādhinā",
                  "meaning": "who is fully absorbed in action as Brahman"
                }
              ],
              "english": "Brahman is the offering, Brahman is the oblation, poured out by Brahman into the fire of Brahman. Brahman alone shall be reached by one who is fully absorbed in seeing Brahman in all actions.",
              "hindi": "जिस यज्ञ में अर्पण भी ब्रह्म है, हवन द्रव्य भी ब्रह्म है, ब्रह्म रूप अग्नि में ब्रह्म द्वारा आहुति दी जाती है—उस ब्रह्मकर्म में लीन पुरुष द्वारा प्राप्त फल भी ब्रह्म ही है।",
              "commentary": "The universal non-dual consecration transforming every activity into cosmic communion.",
              "audio": ""
            },
            {
              "id": "bg_4_34",
              "verse_number": "4.34",
              "citation": "Bhagavad Gita 4.34",
              "meter": "Anuṣṭubh",
              "sanskrit": "तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया ।\nउपदेक्ष्यन्ति ते ज्ञानं ज्ञानिनस्तत्त्वदर्शिनः ॥",
              "transliteration": "tad viddhi praṇipātena paripraśnena sevayā |\nupadekṣyanti te jñānaṁ jñāninas tattva-darśinaḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "तत् विद्धि",
                  "iast": "tat viddhi",
                  "meaning": "know that spiritual truth"
                },
                {
                  "sanskrit": "प्रणिपातेन",
                  "iast": "praṇipātena",
                  "meaning": "by humble reverence"
                },
                {
                  "sanskrit": "परिप्रश्नेन",
                  "iast": "paripraśnena",
                  "meaning": "by in-depth inquiry"
                },
                {
                  "sanskrit": "सेवया",
                  "iast": "sevayā",
                  "meaning": "by selfless service"
                },
                {
                  "sanskrit": "उपदेक्ष्यन्ति ते ज्ञानम्",
                  "iast": "upadekṣyanti te jñānam",
                  "meaning": "they will impart knowledge unto you"
                },
                {
                  "sanskrit": "ज्ञानिनः तत्त्व-दर्शिनः",
                  "iast": "jñāninaḥ tattva-darśinaḥ",
                  "meaning": "the enlightened seers of the ultimate Truth"
                }
              ],
              "english": "Know that Truth by approaching enlightened masters with humble reverence, sincere inquiry, and selfless service. Those wise seers who have directly realized the Truth will initiate you into divine wisdom.",
              "hindi": "उस ज्ञान को तुम तत्त्वदर्शी ज्ञानियों के पास जाकर समझो; उनको प्रणाम करने से, उनकी सेवा करने से और निष्कपट भाव से प्रश्न करने से वे ज्ञानी पुरुष तुम्हें ज्ञान का उपदेश करेंगे।",
              "commentary": "Vedantic pedagogy: Pranipata (reverence), Pariprashna (critical questioning), and Seva (service).",
              "audio": ""
            },
            {
              "id": "bg_4_38",
              "verse_number": "4.38",
              "citation": "Bhagavad Gita 4.38",
              "meter": "Anuṣṭubh",
              "sanskrit": "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते ।\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति ॥",
              "transliteration": "na hi jñānena sadṛśaṁ pavitram iha vidyate |\ntat svayaṁ yoga-saṁsiddhaḥ kālenātmani vindati ||",
              "word_meanings": [
                {
                  "sanskrit": "न हि ज्ञानेन सदृशम्",
                  "iast": "na hi jñānena sadṛśam",
                  "meaning": "certainly nothing like wisdom"
                },
                {
                  "sanskrit": "पवित्रम् इह विद्यते",
                  "iast": "pavitram iha vidyate",
                  "meaning": "purifying exists in this world"
                },
                {
                  "sanskrit": "तत् स्वयम् योग-संसिद्धः",
                  "iast": "tat svayam yoga-saṁsiddhaḥ",
                  "meaning": "that, perfected in Yoga"
                },
                {
                  "sanskrit": "कालेन आत्मनि विन्दति",
                  "iast": "kālenātmani vindati",
                  "meaning": "in due course of time one realizes within the Self"
                }
              ],
              "english": "In this world, there is nothing as purifying as spiritual knowledge. One who is perfected in Yoga discovers this naturally within the Self in due course of time.",
              "hindi": "इस संसार में ज्ञान के समान पवित्र करने वाला निःसंदेह कुछ भी नहीं है; उस ज्ञान को योग में सिद्ध हुआ पुरुष समय पाकर अपने आप ही आत्मा में पा लेता है।",
              "commentary": "Jnana is the supreme purifier, dissolving existential ignorance (Avidya).",
              "audio": ""
            }
          ]
        },
        {
          "id": "bg_ch_07",
          "chapter_number": 7,
          "title": "Chapter 7: Jnana Vijnana Yoga",
          "sanskrit_title": "ज्ञानविज्ञानयोग (सप्तमोऽध्यायः)",
          "transliteration": "Jñānavijñānayoga",
          "summary": "The Yoga of Knowledge and Direct Experiential Realization. Krishna explains His lower material nature (Apara Prakriti) and higher spiritual nature (Para Prakriti), declares His immanence in the cosmos like gems on a thread, classifies four types of devotees, and praises the Jnani Bhakta.",
          "verses": [
            {
              "id": "bg_7_4",
              "verse_number": "7.4",
              "citation": "Bhagavad Gita 7.4",
              "meter": "Anuṣṭubh",
              "sanskrit": "भूमिरापोऽनलो वायुः खं मनो बुद्धिरेव च ।\nअहङ्कार इतीयं मे भिन्ना प्रकृतिरष्टधा ॥",
              "transliteration": "bhūmir āpo 'nalo vāyuḥ khaṁ mano buddhir eva ca |\nahaṅkāra itīyaṁ me bhinnā prakṛtir aṣṭadhā ||",
              "word_meanings": [
                {
                  "sanskrit": "भूमिः आपः अनलः वायुः खम्",
                  "iast": "bhūmiḥ āpaḥ analaḥ vāyuḥ kham",
                  "meaning": "earth, water, fire, air, space"
                },
                {
                  "sanskrit": "मनः बुद्धिः अहङ्कारः एव च",
                  "iast": "mano buddhir ahaṅkāra eva ca",
                  "meaning": "mind, intellect, and ego indeed"
                },
                {
                  "sanskrit": "इति इयम् मे भिन्ना प्रकृतिः अष्टधा",
                  "iast": "itīyaṁ me bhinnā prakṛtir aṣṭadhā",
                  "meaning": "thus is My eightfold divided material Nature"
                }
              ],
              "english": "Earth, water, fire, air, space, mind, intellect, and ego—these are the eightfold divisions of My material nature (Apara Prakriti).",
              "hindi": "पृथ्वी, जल, अग्नि, वायु, आकाश, मन, बुद्धि और अहंकार—इस प्रकार यह आठ प्रकार से विभक्त मेरी प्रकृति है।",
              "commentary": "The eightfold material spectrum spanning gross elements to subtle psychological faculties.",
              "audio": ""
            },
            {
              "id": "bg_7_5",
              "verse_number": "7.5",
              "citation": "Bhagavad Gita 7.5",
              "meter": "Anuṣṭubh",
              "sanskrit": "अपरेयमितस्त्वन्यां प्रकृतिं विद्धि मे पराम् ।\nजीवभूतां महाबाहो ययेदं धार्यते जगत् ॥",
              "transliteration": "apareyam itas tv anyāṁ prakṛtiṁ viddhi me parām |\njīva-bhūtāṁ mahā-bāho yayedaṁ dhāryate jagat ||",
              "word_meanings": [
                {
                  "sanskrit": "अपरा इयम्",
                  "iast": "aparā iyam",
                  "meaning": "this is My lower nature"
                },
                {
                  "sanskrit": "इतः तु अन्याम् प्रकृतिम् विद्धि मे पराम्",
                  "iast": "itas tv anyāṁ prakṛtiṁ viddhi me parām",
                  "meaning": "beyond this know My higher nature"
                },
                {
                  "sanskrit": "जीव-भूताम् महाबाहो",
                  "iast": "jīva-bhūtāṁ mahā-bāho",
                  "meaning": "comprising the living conscious souls, O mighty-armed"
                },
                {
                  "sanskrit": "यया इदम् धार्यते जगत्",
                  "iast": "yayedaṁ dhāryate jagat",
                  "meaning": "by which this cosmos is sustained"
                }
              ],
              "english": "Beyond this lower nature, O mighty-armed Arjuna, know My higher nature (Para Prakriti), which comprises the living consciousness by which this entire universe is sustained.",
              "hindi": "यह तो मेरी अपरा प्रकृति है; इससे भिन्न मेरी जीवरूपा परा (चेतन) प्रकृति को जान, जिसके द्वारा यह सम्पूर्ण जगत धारण किया जाता है।",
              "commentary": "Para Prakriti: sentient consciousness that animates and sustains insentient matter.",
              "audio": ""
            },
            {
              "id": "bg_7_7",
              "verse_number": "7.7",
              "citation": "Bhagavad Gita 7.7",
              "meter": "Anuṣṭubh",
              "sanskrit": "मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय ।\nमयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव ॥",
              "transliteration": "mattaḥ parataraṁ nānyat kiñcid asti dhanañjaya |\nmayi sarvam idaṁ protaṁ sūtre maṇi-gaṇā iva ||",
              "word_meanings": [
                {
                  "sanskrit": "मत्तः परतरम् न अन्यत्",
                  "iast": "mattaḥ parataram na anyat",
                  "meaning": "higher than Me there is nothing else"
                },
                {
                  "sanskrit": "किञ्चित् अस्ति धनञ्जय",
                  "iast": "kiñcit asti dhanañjaya",
                  "meaning": "at all, O Dhananjaya"
                },
                {
                  "sanskrit": "मयि सर्वम् इदम् प्रोतम्",
                  "iast": "mayi sarvam idam protam",
                  "meaning": "all this is strung upon Me"
                },
                {
                  "sanskrit": "सूत्रे मणि-गणाः इव",
                  "iast": "sūtre maṇi-gaṇāḥ iva",
                  "meaning": "like clusters of gems strung on a thread"
                }
              ],
              "english": "There is nothing whatsoever superior to Me, O Dhananjaya. All this universe is strung upon Me, like clusters of pearls strung upon a thread.",
              "hindi": "हे धनञ्जय! मुझसे श्रेष्ठ दूसरा कोई भी परम कारण नहीं है। यह सम्पूर्ण जगत सूत्र में मणियों के सदृश मुझमें ही गुंथा हुआ है।",
              "commentary": "The Sutra-Mani metaphor: unmanifest Divine consciousness connects all manifest multiplicity.",
              "audio": ""
            },
            {
              "id": "bg_7_19",
              "verse_number": "7.19",
              "citation": "Bhagavad Gita 7.19",
              "meter": "Anuṣṭubh",
              "sanskrit": "बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते ।\nवासुदेवः सर्वमिति स महात्मा सुदुर्लभः ॥",
              "transliteration": "bahūnāṁ janmanām ante jñānavān māṁ prapadyate |\nvāsudevaḥ sarvam iti sa mahātmā su-durlabhaḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "बहूनाम् जन्मनाम् अन्ते",
                  "iast": "bahūnām janmanām ante",
                  "meaning": "at the end of many births"
                },
                {
                  "sanskrit": "ज्ञानवान् माम् प्रपद्यते",
                  "iast": "jñānavān mām prapadyate",
                  "meaning": "the person of wisdom surrenders unto Me"
                },
                {
                  "sanskrit": "वासुदेवः सर्वम् इति",
                  "iast": "vāsudevaḥ sarvam iti",
                  "meaning": "realizing 'Vasudeva (God) is all'"
                },
                {
                  "sanskrit": "सः महात्मा सु-दुर्लभः",
                  "iast": "saḥ mahātmā su-durlabhaḥ",
                  "meaning": "such a great soul is exceedingly rare"
                }
              ],
              "english": "At the end of many lifetimes of spiritual evolution, the person of wisdom surrenders unto Me, realizing that 'Vasudeva (the Supreme Divine) is all that is.' Such a great soul is exceedingly rare.",
              "hindi": "बहुत जन्मों के अन्त में ज्ञानवान पुरुष मुझको भजता है, यह अनुभव करते हुए कि 'सब कुछ वासुदेव ही हैं'; ऐसा महात्मा अत्यन्त दुर्लभ है।",
              "commentary": "'Vasudeva Sarvam Iti'—the pinnacle Advaitic realization seeing all existence as divine manifestation.",
              "audio": ""
            }
          ]
        },
        {
          "id": "bg_ch_09",
          "chapter_number": 9,
          "title": "Chapter 9: Raja Vidya Raja Guhya Yoga",
          "sanskrit_title": "राजविद्याराजगुह्ययोग (नवमोऽध्यायः)",
          "transliteration": "Rājavidyārājaguhyayoga",
          "summary": "The Yoga of the Sovereign Science and the Supreme Secret. Krishna reveals His all-pervasive yet unattached majesty, the unconditional refuge given to wholehearted devotees, the simple offering of love, and universal grace.",
          "verses": [
            {
              "id": "bg_9_2",
              "verse_number": "9.2",
              "citation": "Bhagavad Gita 9.2",
              "meter": "Anuṣṭubh",
              "sanskrit": "राजविद्या राजगुह्यं पवित्रमिदमुत्तमम् ।\nप्रत्यक्षावगमं धर्म्यं सुसुखं कर्तुमव्ययम् ॥",
              "transliteration": "rāja-vidyā rāja-guhyaṁ pavitram idam uttamam |\npratyakṣāvagamaṁ dharmyaṁ su-sukhaṁ kartum avyayam ||",
              "word_meanings": [
                {
                  "sanskrit": "राज-विद्या राज-गुह्यम्",
                  "iast": "rāja-vidyā rāja-guhyam",
                  "meaning": "king of sciences, king of secrets"
                },
                {
                  "sanskrit": "पवित्रम् इदम् उत्तमम्",
                  "iast": "pavitram idam uttamam",
                  "meaning": "this supreme purifier"
                },
                {
                  "sanskrit": "प्रत्यक्ष-अवगमम्",
                  "iast": "pratyakṣa-avagamam",
                  "meaning": "directly realizable through immediate intuition"
                },
                {
                  "sanskrit": "धर्म्यम् सु-सुखम् कर्तुम् अव्ययम्",
                  "iast": "dharmyam su-sukham kartum avyayam",
                  "meaning": "righteous, joyful to practice, and imperishable"
                }
              ],
              "english": "This is the sovereign science, the sovereign secret, the supreme purifier, directly realizable through experiential intuition, righteous, joyful to practice, and imperishable.",
              "hindi": "यह विज्ञान सब विद्याओं का राजा, सब रहस्यों का राजा, अतीव पवित्र, प्रत्यक्ष अनुभव वाला, धर्मयुक्त, साधन करने में अत्यन्त सुगम और अविनाशी है।",
              "commentary": "Spiritual wisdom is not dogma, but direct experiential realization (Pratyaksha-avagama).",
              "audio": ""
            },
            {
              "id": "bg_9_22",
              "verse_number": "9.22",
              "citation": "Bhagavad Gita 9.22",
              "meter": "Anuṣṭubh",
              "sanskrit": "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते ।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ॥",
              "transliteration": "ananyāś cintayanto māṁ ye janāḥ paryupāsate |\nteṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham ||",
              "word_meanings": [
                {
                  "sanskrit": "अनन्याः चिन्तयन्तः माम्",
                  "iast": "ananyāḥ cintayantaḥ mām",
                  "meaning": "thinking of Me with single-minded devotion"
                },
                {
                  "sanskrit": "ये जनाः पर्युपासते",
                  "iast": "ye janāḥ paryupāsate",
                  "meaning": "those people who worship Me"
                },
                {
                  "sanskrit": "तेषाम् नित्य-अभियुक्तानाम्",
                  "iast": "teṣām nitya-abhiyuktānām",
                  "meaning": "to those who are perpetually united with Me"
                },
                {
                  "sanskrit": "योग-क्षेमम् वहामि अहम्",
                  "iast": "yoga-kṣemam vahāmi aham",
                  "meaning": "I personally carry their welfare and spiritual security"
                }
              ],
              "english": "To those people who worship Me with single-minded devotion, meditating on Me constantly, I personally provide what they lack and preserve what they possess (Yoga-Kshema).",
              "hindi": "जो अनन्यप्रेमी भक्तजन मुझ परमेश्वर का निरन्तर चिन्तन करते हुए निष्काम भाव से भजते हैं, उन नित्य-युक्त पुरुषों का योगक्षेम मैं स्वयं वहन करता हूँ।",
              "commentary": "The covenant of total spiritual surrender: divine providence ensuring spiritual attainment (Yoga) and protection (Kshema).",
              "audio": ""
            },
            {
              "id": "bg_9_26",
              "verse_number": "9.26",
              "citation": "Bhagavad Gita 9.26",
              "meter": "Anuṣṭubh",
              "sanskrit": "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति ।\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ॥",
              "transliteration": "patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati |\ntad ahaṁ bhakty-upahṛtam aśnāmi prayatātmanaḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "पत्रम् पुष्पम् फलम् तोयम्",
                  "iast": "patram puṣpam phalam toyam",
                  "meaning": "a leaf, a flower, a fruit, or water"
                },
                {
                  "sanskrit": "यः मे भक्त्या प्रयच्छति",
                  "iast": "yaḥ me bhaktyā prayacchati",
                  "meaning": "whoever offers unto Me with love"
                },
                {
                  "sanskrit": "तत् अहम् भक्त्युपहृतम् अश्नामि",
                  "iast": "tat aham bhakty-upahṛtam aśnāmi",
                  "meaning": "that devotional offering I accept"
                },
                {
                  "sanskrit": "प्रयत-आत्मनः",
                  "iast": "prayata-ātmanaḥ",
                  "meaning": "from the pure-hearted"
                }
              ],
              "english": "Whoever offers Me with love a leaf, a flower, a fruit, or even water—that offering of love from the pure-hearted I accept with joy.",
              "hindi": "जो कोई भक्त मेरे लिए प्रेम से पत्र, पुष्प, फल, जल आदि अर्पण करता है, उस शुद्ध बुद्धि वाले भक्त का भक्तिपूर्वक दिया हुआ वह उपहार मैं सहर्ष स्वीकार करता हूँ।",
              "commentary": "Democratization of devotion: love and purity of heart matter infinitely more than elaborate rituals.",
              "audio": ""
            },
            {
              "id": "bg_9_27",
              "verse_number": "9.27",
              "citation": "Bhagavad Gita 9.27",
              "meter": "Anuṣṭubh",
              "sanskrit": "यत्करोषि यदश्नासि यज्जुहोषि ददासि यत् ।\nयत्तपस्यसि कौन्तेय तत्कुरुष्व मदर्पणम् ॥",
              "transliteration": "yat karoṣi yad aśnāsi yaj juhoṣi dadāsi yat |\nyat tapasyasi kaunteya tat kuruṣva mad-arpaṇam ||",
              "word_meanings": [
                {
                  "sanskrit": "यत् करोषि यत् अश्नासि",
                  "iast": "yat karoṣi yad aśnāsi",
                  "meaning": "whatever you do, whatever you eat"
                },
                {
                  "sanskrit": "यत् जुहोषि ददासि यत्",
                  "iast": "yaj juhoṣi dadāsi yat",
                  "meaning": "whatever you offer in sacrifice, whatever you give in charity"
                },
                {
                  "sanskrit": "यत् तपस्यसि कौन्तेय",
                  "iast": "yat tapasyasi kaunteya",
                  "meaning": "whatever austerities you perform, O Kaunteya"
                },
                {
                  "sanskrit": "तत् कुरुष्व मद्-अर्पणम्",
                  "iast": "tat kuruṣva mad-arpaṇam",
                  "meaning": "make that an offering unto Me"
                }
              ],
              "english": "Whatever you do, whatever you eat, whatever you offer in sacrifice, whatever you give in charity, whatever austerities you perform, O Kaunteya, dedicate it all as an offering unto Me.",
              "hindi": "हे कौन्तेय! तुम जो कुछ करते हो, जो कुछ खाते हो, जो कुछ हवन करते हो, जो कुछ दान देते हो और जो कुछ तप करते हो, वह सब मुझे ही अर्पण करो।",
              "commentary": "Sanctification of everyday life: every biological and ethical act is transformed into spiritual communion.",
              "audio": ""
            }
          ]
        },
        {
          "id": "bg_ch_12",
          "chapter_number": 12,
          "title": "Chapter 12: Bhakti Yoga",
          "sanskrit_title": "भक्तियोग (द्वादशोऽध्यायः)",
          "transliteration": "Bhaktiyoga",
          "summary": "The Yoga of Devotion. Lord Krishna compares the worship of the Unmanifest Absolute (Avyakta) with devotion to the Personal Divine, and details the serene, compassionate virtues of the ideal devotee who is dearest to God.",
          "verses": [
            {
              "id": "bg_12_2",
              "verse_number": "12.2",
              "citation": "Bhagavad Gita 12.2",
              "meter": "Anuṣṭubh",
              "sanskrit": "श्रीभगवानुवाच ।\nमय्यावेश्य मनो ये मां नित्ययुक्ता उपासते ।\nश्रद्धया परयोपेतास्ते मे युक्ततमा मताः ॥",
              "transliteration": "śrī-bhagavān uvāca |\nmayy āveśya mano ye māṁ nitya-yuktā upāsate |\nśraddhayā parayopetās te me yuktatamā matāḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "श्रीभगवान् उवाच",
                  "iast": "śrī-bhagavān uvāca",
                  "meaning": "The Supreme Lord said"
                },
                {
                  "sanskrit": "मयि आवेश्य मनः",
                  "iast": "mayi āveśya manaḥ",
                  "meaning": "fixing their mind on Me"
                },
                {
                  "sanskrit": "नित्य-युक्ताः उपासते",
                  "iast": "nitya-yuktāḥ upāsate",
                  "meaning": "constantly united worship Me"
                },
                {
                  "sanskrit": "श्रद्धया परया उपेताः",
                  "iast": "śraddhayā parayā upetāḥ",
                  "meaning": "endowed with supreme faith"
                },
                {
                  "sanskrit": "ते मे युक्ततमाः मताः",
                  "iast": "te me yuktatamāḥ matāḥ",
                  "meaning": "they are considered by Me to be the highest yogis"
                }
              ],
              "english": "The Supreme Lord said: Those who, fixing their minds on Me, worship Me with perpetual devotion and supreme faith—them I consider to be the most perfectly united in Yoga.",
              "hindi": "श्रीभगवान् बोले: मुझमें मन को एकाग्र करके जो भक्तजन निरन्तर मेरे भजन-ध्यान में लगे रहते हैं और परम श्रद्धा से युक्त होकर मेरी उपासना करते हैं, वे मुझे योगियों में सर्वश्रेष्ठ मान्य हैं।",
              "commentary": "Heartfelt devotion endowed with Shraddha provides direct, joyful union with the Supreme.",
              "audio": ""
            },
            {
              "id": "bg_12_13",
              "verse_number": "12.13",
              "citation": "Bhagavad Gita 12.13",
              "meter": "Anuṣṭubh",
              "sanskrit": "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च ।\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी ॥",
              "transliteration": "adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca |\nnirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī ||",
              "word_meanings": [
                {
                  "sanskrit": "अद्वेष्टा सर्व-भूतानाम्",
                  "iast": "adveṣṭā sarva-bhūtānām",
                  "meaning": "free from ill-will toward all living beings"
                },
                {
                  "sanskrit": "मैत्रः करुणः एव च",
                  "iast": "maitraḥ karuṇaḥ eva ca",
                  "meaning": "friendly and compassionate indeed"
                },
                {
                  "sanskrit": "निर्ममः निरहङ्कारः",
                  "iast": "nirmamaḥ nirahaṅkāraḥ",
                  "meaning": "free from possessiveness and ego"
                },
                {
                  "sanskrit": "सम-दुःख-सुखः क्षमी",
                  "iast": "sama-duḥkha-sukhaḥ kṣamī",
                  "meaning": "equanimous in pleasure and pain, forgiving"
                }
              ],
              "english": "He who harbors no ill-will toward any living being, who is friendly and compassionate, free from possessiveness and egotism, even-minded in pleasure and pain, forgiving.",
              "hindi": "जो पुरुष सब भूतों में द्वेषभाव से रहित, सबका मित्र और दयालु है, ममतारहित, अहंकाररहित, सुख-दुःख की प्राप्ति में सम और क्षमाशील है।",
              "commentary": "The ethical foundation of Bhakti: universal friendship (Maitri) and compassion (Karuna).",
              "audio": ""
            },
            {
              "id": "bg_12_14",
              "verse_number": "12.14",
              "citation": "Bhagavad Gita 12.14",
              "meter": "Anuṣṭubh",
              "sanskrit": "सन्तुष्टः सततं योगी यतात्मा दृढनिश्चयः ।\nमय्यर्पितमनोबुद्धिर्यो मद्भक्तः स मे प्रियः ॥",
              "transliteration": "santuṣṭaḥ satataṁ yogī yatātmā dṛḍha-niścayaḥ |\nmayy arpita-mano-buddhir yo mad-bhaktaḥ sa me priyaḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "सन्तुष्टः सततम् योगी",
                  "iast": "santuṣṭaḥ satatam yogī",
                  "meaning": "ever content, disciplined in yoga"
                },
                {
                  "sanskrit": "यतात्मा दृढ-निश्चयः",
                  "iast": "yatātmā dṛḍha-niścayaḥ",
                  "meaning": "self-controlled, of firm resolve"
                },
                {
                  "sanskrit": "मयि अर्पित-मनो-बुद्धिः",
                  "iast": "mayi arpita-mano-buddhiḥ",
                  "meaning": "with mind and intellect surrendered unto Me"
                },
                {
                  "sanskrit": "यः मद्-भक्तः सः मे प्रियः",
                  "iast": "yo mad-bhaktaḥ sa me priyaḥ",
                  "meaning": "such a devotee of Mine is dear to Me"
                }
              ],
              "english": "Ever content, steady in meditation, self-controlled, of firm resolve, with mind and intellect surrendered unto Me—such a devotee is exceedingly dear to Me.",
              "hindi": "जो निरन्तर सन्तुष्ट है, मन-इन्द्रियों सहित शरीर को वश में किए हुए है, दृढ़ निश्चय वाला है तथा मुझमें अर्पित मन-बुद्धि वाला मेरा भक्त मुझे अत्यन्त प्रिय है।",
              "commentary": "Surrender of mind (Manas) and intellect (Buddhi) to the Divine constitutes true devotion.",
              "audio": ""
            }
          ]
        },
        {
          "id": "bg_ch_18",
          "chapter_number": 18,
          "title": "Chapter 18: Moksha Sannyasa Yoga",
          "sanskrit_title": "मोक्षसंन्यासयोग (अष्टादशोऽध्यायः)",
          "transliteration": "Mokṣasannyāsayoga",
          "summary": "The Yoga of Liberation through Renunciation. The monumental grand synthesis of the entire Gita: analysis of Tyaga vs Sannyasa, the three gunas affecting knowledge, intellect, and courage, the indwelling Lord in the heart, and the supreme surrender (Sharanagati).",
          "verses": [
            {
              "id": "bg_18_5",
              "verse_number": "18.5",
              "citation": "Bhagavad Gita 18.5",
              "meter": "Anuṣṭubh",
              "sanskrit": "यज्ञदानतपःकर्म न त्याज्यं कार्यमेव तत् ।\nयज्ञो दानं तपश्चैव पावनानि मनीषिणाम् ॥",
              "transliteration": "yajña-dāna-tapaḥ-karma na tyājyaṁ kāryam eva tat |\nyajño dānaṁ tapaś caiva pāvanāni manīṣiṇām ||",
              "word_meanings": [
                {
                  "sanskrit": "यज्ञ-दान-तपः-कर्म",
                  "iast": "yajña-dāna-tapaḥ-karma",
                  "meaning": "acts of sacrifice, charity, and penance"
                },
                {
                  "sanskrit": "न त्याज्यम् कार्यम् एव तत्",
                  "iast": "na tyājyam kāryam eva tat",
                  "meaning": "must not be given up, they must indeed be performed"
                },
                {
                  "sanskrit": "पावनानि मनीषिणाम्",
                  "iast": "pāvanāni manīṣiṇām",
                  "meaning": "they are purifiers of the wise"
                }
              ],
              "english": "Acts of sacrifice, charity, and penance must not be relinquished; they must indeed be performed. Sacrifice, charity, and penance are purifiers for even the wise.",
              "hindi": "यज्ञ, दान और तप रूप कर्म त्याग करने के योग्य नहीं हैं, बल्कि वे अवश्य करने चाहिए; क्योंकि यज्ञ, दान और तप—ये तीनों ही बुद्धिमान पुरुषों को पवित्र करने वाले हैं।",
              "commentary": "Authentic renunciation preserves purifying societal duties while eliminating selfish attachment.",
              "audio": ""
            },
            {
              "id": "bg_18_54",
              "verse_number": "18.54",
              "citation": "Bhagavad Gita 18.54",
              "meter": "Anuṣṭubh",
              "sanskrit": "ब्रह्मभूतः प्रसन्नात्मा न शोचति न काङ्क्षति ।\nसमः सर्वेषु भूतेषु मद्भक्तिं लभते पराम् ॥",
              "transliteration": "brahma-bhūtaḥ prasannātmā na śocati na kāṅkṣati |\nsamaḥ sarveṣu bhūteṣu mad-bhaktiṁ labhate parām ||",
              "word_meanings": [
                {
                  "sanskrit": "ब्रह्म-भूतः",
                  "iast": "brahma-bhūtaḥ",
                  "meaning": "one who has become one with Brahman"
                },
                {
                  "sanskrit": "प्रसन्न-आत्मा",
                  "iast": "prasanna-ātmā",
                  "meaning": "serene and joyful in soul"
                },
                {
                  "sanskrit": "न शोचति न काङ्क्षति",
                  "iast": "na śocati na kāṅkṣati",
                  "meaning": "neither grieves nor craves"
                },
                {
                  "sanskrit": "समः सर्वेषु भूतेषु",
                  "iast": "samaḥ sarveṣu bhūteṣu",
                  "meaning": "equally disposed toward all beings"
                },
                {
                  "sanskrit": "मद्-भक्तिम् लभते पराम्",
                  "iast": "mad-bhaktim labhate parām",
                  "meaning": "attains supreme non-dual devotion unto Me"
                }
              ],
              "english": "One who has become one with Brahman and is cheerful in spirit neither grieves nor craves. Being equally disposed toward all living beings, he attains supreme non-dual devotion (Para Bhakti) unto Me.",
              "hindi": "ब्रह्मभाव को प्राप्त, प्रसन्नचित्त वाला योगी न तो किसी के लिए शोक करता है और न किसी की आकांक्षा करता है। सब प्राणियों में समभाव वाला वह मेरी पराभक्ति को प्राप्त होता है।",
              "commentary": "The synthesis of Jnana and Bhakti: non-dual enlightenment blossoms into supreme devotion (Para Bhakti).",
              "audio": ""
            },
            {
              "id": "bg_18_61",
              "verse_number": "18.61",
              "citation": "Bhagavad Gita 18.61",
              "meter": "Anuṣṭubh",
              "sanskrit": "ईश्वरः सर्वभूतानां हृद्देशेऽर्जुन तिष्ठति ।\nभ्रामयन्सर्वभूतानि यन्त्रारूढानि मायया ॥",
              "transliteration": "īśvaraḥ sarva-bhūtānāṁ hṛd-deśe 'rjuna tiṣṭhati |\nbhrāmayan sarva-bhūtāni yantrārūḍhāni māyayā ||",
              "word_meanings": [
                {
                  "sanskrit": "ईश्वरः सर्व-भूतानाम्",
                  "iast": "īśvaraḥ sarva-bhūtānām",
                  "meaning": "the Supreme Lord of all beings"
                },
                {
                  "sanskrit": "हृद्-देशे अर्जुन तिष्ठति",
                  "iast": "hṛd-deśe arjuna tiṣṭhati",
                  "meaning": "dwells in the region of the heart, O Arjuna"
                },
                {
                  "sanskrit": "भ्रामयन् सर्व-भूतानि",
                  "iast": "bhrāmayan sarva-bhūtāni",
                  "meaning": "causing all beings to revolve"
                },
                {
                  "sanskrit": "यन्त्र-आरूढानि मायया",
                  "iast": "yantra-ārūḍhāni māyayā",
                  "meaning": "as if mounted upon a machine by His Maya"
                }
              ],
              "english": "The Supreme Lord dwells in the heart of all beings, O Arjuna, directing the wanderings of all creatures by His illusory potency (Maya), as if they were seated upon a machine.",
              "hindi": "हे अर्जुन! शरीर रूपी यन्त्र में आरूढ़ हुए सम्पूर्ण प्राणियों को अन्तर्यामी ईश्वर अपनी माया से उनके कर्मों के अनुसार भ्रमण कराता हुआ सब प्राणियों के हृदय-देश में स्थित है।",
              "commentary": "The Antaryamin (Inner Ruler) seated in the heart governs cosmic psychosomatic machinery.",
              "audio": ""
            },
            {
              "id": "bg_18_65",
              "verse_number": "18.65",
              "citation": "Bhagavad Gita 18.65",
              "meter": "Anuṣṭubh",
              "sanskrit": "मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु ।\nमामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे ॥",
              "transliteration": "man-manā bhava mad-bhakto mad-yājī māṁ namaskuru |\nmām evaiṣyasi satyaṁ te pratijāne priyo 'si me ||",
              "word_meanings": [
                {
                  "sanskrit": "मन्मना भव मद्-भक्तः",
                  "iast": "man-manā bhava mad-bhaktaḥ",
                  "meaning": "fix your mind on Me, be devoted to Me"
                },
                {
                  "sanskrit": "मद्-याजी माम् नमस्कुरु",
                  "iast": "mad-yājī mām namaskuru",
                  "meaning": "sacrifice unto Me, bow down to Me"
                },
                {
                  "sanskrit": "माम् एव एष्यसि",
                  "iast": "mām evaiṣyasi",
                  "meaning": "you shall surely come to Me alone"
                },
                {
                  "sanskrit": "सत्यम् ते प्रतिजाने प्रियोऽसि मे",
                  "iast": "satyam te pratijāne priyo 'si me",
                  "meaning": "truly I promise you, for you are dear to Me"
                }
              ],
              "english": "Fix your mind on Me, be devoted to Me, sacrifice unto Me, and bow down to Me. You shall come to Me alone; this I promise you truly, for you are dearly beloved to Me.",
              "hindi": "मुझमें मन वाला हो, मेरा भक्त बन, मेरा पूजन करने वाला हो और मुझको प्रणाम कर; ऐसा करने से तू मुझे ही प्राप्त होगा, यह मैं तुझसे सत्य प्रतिज्ञा करता हूँ, क्योंकि तू मेरा अत्यन्त प्रिय है।",
              "commentary": "The loving promise of the Supreme Lord guaranteeing divine attainment through heartfelt devotion.",
              "audio": ""
            },
            {
              "id": "bg_18_66",
              "verse_number": "18.66",
              "citation": "Bhagavad Gita 18.66",
              "meter": "Anuṣṭubh",
              "sanskrit": "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥",
              "transliteration": "sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja |\nahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "सर्व-धर्मान् परित्यज्य",
                  "iast": "sarva-dharmān parityajya",
                  "meaning": "renouncing all relative dharmas and duties"
                },
                {
                  "sanskrit": "माम् एकम् शरणम् व्रज",
                  "iast": "mām ekam śaraṇam vraja",
                  "meaning": "take refuge in Me alone"
                },
                {
                  "sanskrit": "अहम् त्वाम् सर्व-पापेभ्यः मोक्षयिष्यामि",
                  "iast": "aham tvām sarva-pāpebhyaḥ mokṣayiṣyāmi",
                  "meaning": "I shall liberate you from all sins"
                },
                {
                  "sanskrit": "मा शुचः",
                  "iast": "mā śucaḥ",
                  "meaning": "do not grieve"
                }
              ],
              "english": "Completely relinquishing all relative dharmas, take refuge in Me alone. I shall liberate you from all sins; do not grieve.",
              "hindi": "सम्पूर्ण धर्मों (कर्तव्यों) के आश्रय को त्यागकर केवल मेरी एक की शरण में आ जा। मैं तुझे सम्पूर्ण पापों से मुक्त कर दूँगा, तू शोक मत कर।",
              "commentary": "The Charama Shloka: the final supreme verdict of absolute non-dual self-surrender (Sharanagati).",
              "audio": ""
            },
            {
              "id": "bg_18_73",
              "verse_number": "18.73",
              "citation": "Bhagavad Gita 18.73",
              "meter": "Anuṣṭubh",
              "sanskrit": "अर्जुन उवाच ।\nनष्टो मोहः स्मृतिर्लब्धा त्वत्प्रसादान्मयाच्युत ।\nस्थितोऽस्मि गतसन्देहः करिष्ये वचनं तव ॥",
              "transliteration": "arjuna uvāca |\nnaṣṭo mohaḥ smṛtir labdhā tvat-prasādān mayācyuta |\nsthito 'smi gata-sandehaḥ kariṣye vacanaṁ tava ||",
              "word_meanings": [
                {
                  "sanskrit": "अर्जुनः उवाच",
                  "iast": "arjunaḥ uvāca",
                  "meaning": "Arjuna said"
                },
                {
                  "sanskrit": "नष्टः मोहः",
                  "iast": "naṣṭaḥ mohaḥ",
                  "meaning": "my delusion is destroyed"
                },
                {
                  "sanskrit": "स्मृतिः लब्धा",
                  "iast": "smṛtiḥ labdhā",
                  "meaning": "memory of the Self is regained"
                },
                {
                  "sanskrit": "त्वत्-प्रसादात् मया अच्युत",
                  "iast": "tvat-prasādāt mayā acyuta",
                  "meaning": "through Your divine grace, O Infallible One"
                },
                {
                  "sanskrit": "स्थितः अस्मि गत-सन्देहः",
                  "iast": "sthitaḥ asmi gata-sandehaḥ",
                  "meaning": "I stand firm with all doubts dispelled"
                },
                {
                  "sanskrit": "करिष्ये वचनम् तव",
                  "iast": "kariṣye vacanam tava",
                  "meaning": "I shall act according to Your word"
                }
              ],
              "english": "Arjuna said: My delusion is destroyed! Through Your divine grace, O Infallible Krishna, I have regained remembrance of my true nature. I stand firm, free from all doubts. I shall act according to Your word.",
              "hindi": "अर्जुन बोले: हे अच्युत! आपकी कृपा से मेरा मोह नष्ट हो गया और मैंने स्मृति (आत्मज्ञान) प्राप्त कर ली है; अब मैं संशयरहित होकर स्थित हूँ और आपकी आज्ञा का पालन करूँगा।",
              "commentary": "The spiritual climax: awakening from delusion into fearless, selfless action.",
              "audio": ""
            },
            {
              "id": "bg_18_78",
              "verse_number": "18.78",
              "citation": "Bhagavad Gita 18.78",
              "meter": "Anuṣṭubh",
              "sanskrit": "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः ।\nतत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम ॥",
              "transliteration": "yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanur-dharaḥ |\ntatra śrīr vijayo bhūtir dhruvā nītir matir mama ||",
              "word_meanings": [
                {
                  "sanskrit": "यत्र योगेश्वरः कृष्णः",
                  "iast": "yatra yogeśvaraḥ kṛṣṇaḥ",
                  "meaning": "wherever is Krishna, the Lord of Yoga"
                },
                {
                  "sanskrit": "यत्र पार्थः धनुर्धरः",
                  "iast": "yatra pārthaḥ dhanur-dharaḥ",
                  "meaning": "wherever is Partha, the archer"
                },
                {
                  "sanskrit": "तत्र श्रीः विजयः भूतिः",
                  "iast": "tatra śrīḥ vijayaḥ bhūtiḥ",
                  "meaning": "there are prosperity, victory, expanding glory"
                },
                {
                  "sanskrit": "ध्रुवा नीतिः मतिः मम",
                  "iast": "dhruvā nītiḥ matiḥ mama",
                  "meaning": "and unswerving justice—this is my conviction"
                }
              ],
              "english": "Wherever is Krishna, the Lord of Yoga, and wherever is Arjuna, the supreme archer, there surely will be unceasing prosperity, victory, expanding glory, and righteous statecraft—this is my firm conviction.",
              "hindi": "जहाँ योगेश्वर भगवान श्रीकृष्ण हैं और जहाँ गाण्डीवधनुर्धारी अर्जुन हैं, वहीं पर श्री (लक्ष्मी), विजय, ऐश्वर्य और अचल नीति है—ऐसा मेरा दृढ़ मत है।",
              "commentary": "The closing verse of the Gita: divine wisdom harmonized with courageous action guarantees victory.",
              "audio": ""
            }
          ]
        }
      ]
    },
    {
      "id": "rigveda",
      "category_id": "vedas_upanishads",
      "category": "Vedas & Upanishads",
      "title": "Rigveda Samhita",
      "sanskrit_title": "ऋग्वेदसंहिता",
      "transliteration": "Ṛgvedasaṁhitā",
      "author": "Vedic Rishis (Madhucchandas, Vishvamitra, Vasishtha, Narayana, Prajapati Parameshthi)",
      "tradition": "Shruti (Mula Veda)",
      "era": "c. 1500–1000 BCE",
      "description": "The oldest sacred literature of the Indo-European world, containing 1,028 hymns (suktas) organized into 10 Mandalas exploring cosmic order (Rita), the supreme solar consciousness (Savitur), the primeval Purusha, and the enigma of creation (Nasadiya).",
      "epigraph": "एकं सद्विप्रा बहुधा वदन्त्यग्निं यमं मातरिश्वानमाहुः ॥",
      "epigraph_translation": "Truth is One; the illumined seers speak of It in diverse ways—they call It Agni, Yama, and Matarishvan.",
      "chapters": [
        {
          "id": "rv_m1_s1",
          "chapter_number": 1,
          "title": "Agni Sukta (Mandala 1, Hymn 1: Complete 9 Rks)",
          "sanskrit_title": "अग्निसूक्तम् (मण्डल १, सूक्त १)",
          "transliteration": "Agnisūktam (Mandala 1, Sukta 1)",
          "summary": "The very opening hymn of the Rigveda, composed by Rishi Madhucchandas Vaishvamitra in Gayatri meter. Agni is invoked as the cosmic priest, the divine flame of aspiration, radiant dispeller of darkness, and protector of sacred order.",
          "verses": [
            {
              "id": "rv_1_1_1",
              "verse_number": "1.1.1",
              "citation": "Rigveda 1.1.1",
              "meter": "Gāyatrī",
              "sanskrit": "अ॒ग्निमी॑ळे पु॒रोहि॑तं य॒ज्ञस्य॑ दे॒वमृ॒त्विज॑म् ।\nहोता॑रं रत्न॒धात॑मम् ॥",
              "transliteration": "agnim īḷe purohitaṁ yajñasya devam ṛtvijam |\nhotāraṁ ratnadhātamam ||",
              "word_meanings": [
                {
                  "sanskrit": "अग्निम् ईळे",
                  "iast": "agnim īḷe",
                  "meaning": "I praise / invoke Agni"
                },
                {
                  "sanskrit": "पुरोहितम्",
                  "iast": "purohitam",
                  "meaning": "the foremost priest / leader"
                },
                {
                  "sanskrit": "यज्ञस्य देवम् ऋत्विजम्",
                  "iast": "yajñasya devam ṛtvijam",
                  "meaning": "the divine minister of sacrifice"
                },
                {
                  "sanskrit": "होतारम् रत्न-धा-तमम्",
                  "iast": "hotāraṁ ratnadhātamam",
                  "meaning": "the supreme invoker, bestower of spiritual treasures"
                }
              ],
              "english": "I adore Agni, the high priest, the divine minister of the cosmic sacrifice, the invoker of deities, and the supreme bestower of luminous treasures.",
              "hindi": "मैं यज्ञ के पुरोहित, दिव्य ऋत्विज, देवताओं का आह्वान करने वाले और परम रत्नों को धारण करने वाले अग्निदेव की स्तुति करता हूँ।",
              "commentary": "The opening rik of the entire Rigveda. Agni is the primary bridge between human consciousness and transcendent reality.",
              "audio": ""
            },
            {
              "id": "rv_1_1_2",
              "verse_number": "1.1.2",
              "citation": "Rigveda 1.1.2",
              "meter": "Gāyatrī",
              "sanskrit": "अ॒ग्निः पूर्वे॑भि॒र्ऋषि॑भि॒रीड्यो॒ नूत॑नैरु॒त ।\nस दे॒वाँ एह व॑क्षति ॥",
              "transliteration": "agniḥ pūrvebhir ṛṣibhir īḍyo nūtanair uta |\nsa devāṁ eha vakṣati ||",
              "word_meanings": [
                {
                  "sanskrit": "अग्निः पूर्वेभिः ऋषिभिः ईड्यः",
                  "iast": "agniḥ pūrvebhir ṛṣibhir īḍyaḥ",
                  "meaning": "Agni is worthy of praise by ancient seers"
                },
                {
                  "sanskrit": "नूतनैः उत",
                  "iast": "nūtanair uta",
                  "meaning": "as well as by present seekers"
                },
                {
                  "sanskrit": "सः देवान् इह वक्षति",
                  "iast": "sa devāṁ eha vakṣati",
                  "meaning": "may he bring the divine powers here"
                }
              ],
              "english": "Agni, worthy of adoration by ancient seers as well as by modern sages, may he conduct the divine powers hither to this sacred gathering!",
              "hindi": "अग्निदेव प्राचीन ऋषियों द्वारा स्तुत्य हैं और नवीन ऋषियों द्वारा भी; वे यहाँ दिव्य शक्तियों को लेकर आएँ।",
              "commentary": "Affirms the continuous, living tradition of Vedic spiritual discovery.",
              "audio": ""
            },
            {
              "id": "rv_1_1_3",
              "verse_number": "1.1.3",
              "citation": "Rigveda 1.1.3",
              "meter": "Gāyatrī",
              "sanskrit": "अ॒ग्निना॑ र॒यिम॑श्नव॒त्पोष॑मे॒व दि॒वेदि॑वे ।\nय॒शसं॑ वी॒रव॑त्तमाम ॥",
              "transliteration": "agninā rayim aśnavat poṣam eva dive-dive |\nyaśasaṁ vīravattamam ||",
              "word_meanings": [
                {
                  "sanskrit": "अग्निना रयिम् अश्नवत्",
                  "iast": "agninā rayim aśnavat",
                  "meaning": "through Agni one attains true wealth"
                },
                {
                  "sanskrit": "पोषम् एव दिवे-दिवे",
                  "iast": "poṣam eva dive-dive",
                  "meaning": "daily flourishing growth"
                },
                {
                  "sanskrit": "यशसम् वीरवत्तमम्",
                  "iast": "yaśasaṁ vīravattamam",
                  "meaning": "rich in glory and heroic strength"
                }
              ],
              "english": "Through Agni may one attain abundance and flourishing prosperity day by day, rich in spiritual glory and heroic strength.",
              "hindi": "अग्नि के माध्यम से मनुष्य दिन-प्रतिदिन पुष्टि और ऐश्वर्य प्राप्त करता है, जो यश और वीर संतानों से युक्त होता है।",
              "commentary": "Rayi (inner and outer wealth) combined with Viravat (spiritual heroism).",
              "audio": ""
            },
            {
              "id": "rv_1_1_4",
              "verse_number": "1.1.4",
              "citation": "Rigveda 1.1.4",
              "meter": "Gāyatrī",
              "sanskrit": "अग्ने॒ यं य॒ज्ञम॑ध्व॒रं वि॒श्वत॑ः परि॒भूरसि॑ ।\nस इद्दे॒वेषु॑ गच्छति ॥",
              "transliteration": "agne yaṁ yajñam adhvaraṁ viśvataḥ paribhūr asi |\nsa id deveṣu gacchati ||",
              "word_meanings": [
                {
                  "sanskrit": "अग्ने यम् यज्ञम् अध्वरम्",
                  "iast": "agne yaṁ yajñam adhvaram",
                  "meaning": "O Agni, that sacred non-injurious offering"
                },
                {
                  "sanskrit": "विश्वतः परिभूः असि",
                  "iast": "viśvataḥ paribhūr asi",
                  "meaning": "which thou protectest on all sides"
                },
                {
                  "sanskrit": "सः इत् देवेषु गच्छति",
                  "iast": "sa id deveṣu gacchati",
                  "meaning": "that verily reaches the divine realms"
                }
              ],
              "english": "O Agni! That sacred uninjured offering which thou encompassest on all sides reaches the celestial realms.",
              "hindi": "हे अग्नि! जिस निर्बाध यज्ञ को आप सब ओर से रक्षित करते हैं, वही देवताओं तक पहुँचता है।",
              "commentary": "Adhvara: the sacrifice that is non-violent and uninjured by hostile forces.",
              "audio": ""
            },
            {
              "id": "rv_1_1_5",
              "verse_number": "1.1.5",
              "citation": "Rigveda 1.1.5",
              "meter": "Gāyatrī",
              "sanskrit": "अ॒ग्निर्होता॑ क॒विक्र॑तुः स॒त्यश्चि॒त्रश्र॑वस्तमः ।\nदे॒वो दे॒वेभि॒रा ग॑मत् ॥",
              "transliteration": "agnir hotā kavi-kratuḥ satyaś citra-śravastamaḥ |\ndevo devebhir ā gamat ||",
              "word_meanings": [
                {
                  "sanskrit": "अग्निः होता कविक्रतुः",
                  "iast": "agnir hotā kavi-kratuḥ",
                  "meaning": "Agni, the priest of will and poetic insight"
                },
                {
                  "sanskrit": "सत्यः चित्र-श्रवस्तमः",
                  "iast": "satyaś citra-śravastamaḥ",
                  "meaning": "the True, richest in varied brilliant inspirations"
                },
                {
                  "sanskrit": "देवः देवेभिः आ गमत्",
                  "iast": "devo devebhir ā gamat",
                  "meaning": "may he, a God, arrive with the celestial powers"
                }
              ],
              "english": "May Agni, the divine invoker possessing the seer's inspired will (Kavikratu), true and endowed with multifaceted brilliance, arrive with the gods!",
              "hindi": "कवि-हृदय (दूरदर्शी), सत्यस्वरूप और विविध प्रकाशमान महिमा वाले अग्निदेव अन्य देवों के साथ यहाँ पधारें।",
              "commentary": "Kavikratu: synthetic harmony of visionary wisdom (Kavi) and decisive conscious will (Kratu).",
              "audio": ""
            },
            {
              "id": "rv_1_1_6",
              "verse_number": "1.1.6",
              "citation": "Rigveda 1.1.6",
              "meter": "Gāyatrī",
              "sanskrit": "यद॒ङ्ग दा॒शुषे॒ त्वमग्ने॑ भ॒द्रं क॑रि॒ष्यसि॑ ।\nतवेत्तत्स॒त्यम॑ङ्गिरः ॥",
              "transliteration": "yad aṅga dāśuṣe tvam agne bhadraṁ kariṣyasi |\ntavet tat satyam aṅgiraḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "यत् अङ्ग दाशुषे त्वम्",
                  "iast": "yad aṅga dāśuṣe tvam",
                  "meaning": "whatever good thou conferrest upon the giver"
                },
                {
                  "sanskrit": "अग्ने भद्रम् करिष्यसि",
                  "iast": "agne bhadraṁ kariṣyasi",
                  "meaning": "O Agni, whatever auspicious benefit thou performest"
                },
                {
                  "sanskrit": "तव इत् तत् सत्यम् अङ्गिरः",
                  "iast": "tavet tat satyam aṅgiraḥ",
                  "meaning": "that is verily Thine own truth, O Angiras"
                }
              ],
              "english": "Whatever auspicious good thou conferrest upon the sincere giver, O Agni, that verily is Thy own intrinsic truth, O Angiras!",
              "hindi": "हे अग्नि! आप अपने समर्पित भक्त का जो कल्याण करते हैं, वह आपकी ही सत्यनिष्ठा है।",
              "commentary": "Divine grace is not a whimsical favor, but the necessary expression of Agni's intrinsic truth (Satya).",
              "audio": ""
            },
            {
              "id": "rv_1_1_7",
              "verse_number": "1.1.7",
              "citation": "Rigveda 1.1.7",
              "meter": "Gāyatrī",
              "sanskrit": "उप॑ त्वाग्ने दि॒वेदि॑वे॒ दोषा॑वस्तर्धि॒या व॒यम् ।\nनमो॒ भर॑न्त॒ एम॑सि ॥",
              "transliteration": "upa tvāgne dive-dive doṣāvastar dhiyā vayam |\nnamo bharanta emasi ||",
              "word_meanings": [
                {
                  "sanskrit": "उप त्वा अग्ने दिवे-दिवे",
                  "iast": "upa tvāgne dive-dive",
                  "meaning": "unto Thee, O Agni, day by day"
                },
                {
                  "sanskrit": "दोषा-वस्तः धिया वयम्",
                  "iast": "doṣāvastar dhiyā vayam",
                  "meaning": "in night and day, with deep thought we"
                },
                {
                  "sanskrit": "नमः भरन्तः एमसि",
                  "iast": "namo bharanta emasi",
                  "meaning": "bearing our reverence, approach"
                }
              ],
              "english": "Unto Thee, O Agni, day after day, in night and day, we approach with deep contemplative meditation, bearing our reverent homage!",
              "hindi": "हे अग्निदेव! रात और दिन, हम श्रेष्ठ बुद्धि के साथ नमस्कार करते हुए आपके समीप आते हैं।",
              "commentary": "Daily internal contemplation (Dhiya) approaching the inner flame.",
              "audio": ""
            },
            {
              "id": "rv_1_1_8",
              "verse_number": "1.1.8",
              "citation": "Rigveda 1.1.8",
              "meter": "Gāyatrī",
              "sanskrit": "राज॑न्तमध्व॒राणां॑ गो॒पामृ॒तस्य॒ दीदि॑विम् ।\nवर्ध॑मानं॒ स्वे दमे॑ ॥",
              "transliteration": "rājantam adhvarāṇāṁ gopām ṛtasya dīdivim |\nvardhamānaṁ sve dame ||",
              "word_meanings": [
                {
                  "sanskrit": "राजन्तम् अध्वराणाम्",
                  "iast": "rājantam adhvarāṇāṁ",
                  "meaning": "ruling over sacred sacrifices"
                },
                {
                  "sanskrit": "गोपाम् ऋतस्य दीदिविम्",
                  "iast": "gopām ṛtasya dīdivim",
                  "meaning": "luminous guardian of the cosmic order (Rita)"
                },
                {
                  "sanskrit": "वर्धमानम् स्वे दमे",
                  "iast": "vardhamānaṁ sve dame",
                  "meaning": "waxing mighty in Thine own dwelling"
                }
              ],
              "english": "Ruler of sacred sacrifices, shining guardian of cosmic truth (Rita), waxing mighty in Thine own sacred dwelling!",
              "hindi": "आप यज्ञों के सम्राट, शाश्वत सत्य (ऋत) के देदीप्यमान रक्षक और अपने दिव्य धाम में वृद्धि को प्राप्त होने वाले हैं।",
              "commentary": "Gopam Ritasya: Agni as the protector of the cosmic moral and physical order (Rita).",
              "audio": ""
            },
            {
              "id": "rv_1_1_9",
              "verse_number": "1.1.9",
              "citation": "Rigveda 1.1.9",
              "meter": "Gāyatrī",
              "sanskrit": "स न॑ः पि॒तेव॑ सू॒नवेऽग्ने॑ सूपाkeyनो भ॑व ।\nसच॑स्वा नः स्व॒स्तये॑ ॥",
              "transliteration": "sa naḥ piteva sūnave 'gne sūpāyano bhava |\nsacasvā naḥ svastaye ||",
              "word_meanings": [
                {
                  "sanskrit": "सः नः पिता इव सूनवे",
                  "iast": "sa naḥ piteva sūnave",
                  "meaning": "as a father is unto his child"
                },
                {
                  "sanskrit": "अग्ने सूपाactivityनः भव",
                  "iast": "agne sūpāyano bhava",
                  "meaning": "O Agni, be easily accessible to us"
                },
                {
                  "sanskrit": "सचस्वा नः स्वस्तये",
                  "iast": "sacasvā naḥ svastaye",
                  "meaning": "abide with us for our supreme well-being"
                }
              ],
              "english": "As a father is gentle and close unto his child, O Agni, be easily accessible unto us, and abide with us for our supreme well-being!",
              "hindi": "जैसे पिता अपने पुत्र के लिए सुलभ होता है, वैसे ही आप हमारे लिए सुलभ होइए और हमारे कल्याण के लिए हमारे साथ रहिए।",
              "commentary": "Establishes intimate filial affection between humanity and the Divine.",
              "audio": ""
            }
          ]
        },
        {
          "id": "rv_m3_s62",
          "chapter_number": 2,
          "title": "Gayatri Mantra & Savitur Sukta (Mandala 3, Hymn 62)",
          "sanskrit_title": "गायत्री मन्त्रः एवं सवितृसूक्तम् (मण्डल ३, सूक्त ६२)",
          "transliteration": "Gāyatrī Mantra & Savitṛ Sūktam",
          "summary": "Revealed to Brahmarshi Vishvamitra in Mandala 3, Hymn 62, Verse 10. The supreme prayer of the Vedic canon invoking Savitur, the solar light of cosmic consciousness, to illuminate and awaken the human intellect (Dhiyah).",
          "verses": [
            {
              "id": "rv_3_62_10",
              "verse_number": "3.62.10",
              "citation": "Rigveda 3.62.10 (Gayatri Mantra)",
              "meter": "Gāyatrī",
              "sanskrit": "ॐ भूर्भुवः॒ स्वः॑ ।\nतत् स॑वि॒तुर्वरे॑ण्यं॒ भर्गो॑ दे॒वस्य॑ धीमहि ।\nधियो॒ यो न॑ः प्रचो॒दया॑त् ॥",
              "transliteration": "oṁ bhūr bhuvaḥ svaḥ |\ntat savitur vareṇyaṁ bhargo devasya dhīmahi |\ndhiyo yo naḥ pracodayāt ||",
              "word_meanings": [
                {
                  "sanskrit": "ॐ भूर्भुवः स्वः",
                  "iast": "oṁ bhūr bhuvaḥ svaḥ",
                  "meaning": "OM, the physical, subtle, and celestial realms"
                },
                {
                  "sanskrit": "तत् सवितुः वरेण्यम्",
                  "iast": "tat savitur vareṇyaṁ",
                  "meaning": "that adorable radiance of Savitur"
                },
                {
                  "sanskrit": "भर्गः देवस्य धीमहि",
                  "iast": "bhargo devasya dhīmahi",
                  "meaning": "we meditate upon that divine effulgence"
                },
                {
                  "sanskrit": "धियो यः नः प्रचोदयात्",
                  "iast": "dhiyo yo naḥ pracodayāt",
                  "meaning": "may that consciousness illuminate our intellects"
                }
              ],
              "english": "OM, the Earth, the Atmosphere, and the Heavens! We meditate upon that supreme, adorable radiance of the Divine Solar Creator (Savitur); may that luminous Consciousness awaken, inspire, and guide our intellects toward truth!",
              "hindi": "ॐ! हम उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा के परम तेज का ध्यान करते हैं; वह परमात्मा हमारी बुद्धि को सन्मार्ग में प्रेरित करे।",
              "commentary": "The mother of all Vedic mantras, awakening the discriminative intelligence toward divine light.",
              "audio": ""
            }
          ]
        },
        {
          "id": "rv_m7_s59",
          "chapter_number": 3,
          "title": "Mahamrityunjaya Mantra (Mandala 7, Hymn 59)",
          "sanskrit_title": "महामृत्युञ्जयमन्त्रः (मण्डल ७, सूक्त ५९)",
          "transliteration": "Mahāmṛtyuñjaya Mantra (Mandala 7, Sukta 59)",
          "summary": "Revealed to Maharshi Vasishtha in Mandala 7, Hymn 59, Verse 12. The supreme death-conquering mantra of Vedic literature addressed to Tryambaka (the Three-Eyed Lord), liberating the soul from mortality into immortality like a ripe cucumber released from its stalk.",
          "verses": [
            {
              "id": "rv_7_59_12",
              "verse_number": "7.59.12",
              "citation": "Rigveda 7.59.12",
              "meter": "Anuṣṭubh",
              "sanskrit": "ॐ त्र्य॑म्बकं यजामहे सुग॒न्धिं पु॑ष्टि॒वर्ध॑नम् ।\nउ॒र्वा॒रु॒कमि॑व॒ बन्ध॑नान्मृ॒त्योर्मु॑क्षीय॒ माऽमृता॑त् ॥",
              "transliteration": "oṁ tryambakaṁ yajāmahe sugandhiṁ puṣṭi-vardhanam |\nurvārukam iva bandhanān mṛtyor mukṣīya mā 'mṛtāt ||",
              "word_meanings": [
                {
                  "sanskrit": "त्र्यम्बकम् यजामहे",
                  "iast": "tryambakaṁ yajāmahe",
                  "meaning": "we worship the Three-Eyed Lord"
                },
                {
                  "sanskrit": "सुगन्धिम् पुष्टि-वर्धनम्",
                  "iast": "sugandhiṁ puṣṭi-vardhanam",
                  "meaning": "fragrant and nourisher of all life"
                },
                {
                  "sanskrit": "उर्वारुकम् इव बन्धनात्",
                  "iast": "urvārukam iva bandhanān",
                  "meaning": "as a ripe cucumber from its stalk"
                },
                {
                  "sanskrit": "मृत्योः मुक्षीय मा अमृतात्",
                  "iast": "mṛtyor mukṣīya mā 'mṛtāt",
                  "meaning": "may I be liberated from death, but never from Immortality!"
                }
              ],
              "english": "OM. We worship the Three-Eyed Lord (Tryambaka), fragrant and the supreme nourisher of all life! Just as a ripe cucumber is severed effortlessly from its bond on the vine, so may we be liberated from the bondage of death and mortality, but never separated from Immortality!",
              "hindi": "ॐ! हम सुगन्धित और पुष्टि को बढ़ाने वाले त्रिनेत्रधारी भगवान शिव की उपासना करते हैं। जिस प्रकार पका हुआ खरबूजा अपनी बेल के बन्धन से मुक्त हो जाता है, उसी प्रकार हम मृत्यु से मुक्त हों, किन्तु अमरता से कभी विलग न हों।",
              "commentary": "The Urvaruka metaphor: liberation is the effortless release of physical attachment into immortal awareness.",
              "audio": ""
            }
          ]
        },
        {
          "id": "rv_m10_s90",
          "chapter_number": 4,
          "title": "Purusha Sukta - Cosmic Being (Mandala 10, Hymn 90)",
          "sanskrit_title": "पुरुषसूक्तम् (मण्डल १०, सूक्त ९०)",
          "transliteration": "Puruṣasūktam (Mandala 10, Sukta 90)",
          "summary": "Revealed to Rishi Narayana. The foundational cosmic cosmogony of the Vedas depicting the Supreme Cosmic Person (Purusha) who pervades the universe with thousands of heads and eyes, yet transcends all manifestation by ten fingers' breadth.",
          "verses": [
            {
              "id": "rv_10_90_1",
              "verse_number": "10.90.1",
              "citation": "Rigveda 10.90.1",
              "meter": "Anuṣṭubh",
              "sanskrit": "स॒हस्र॑शीर्षा॒ पुरु॑षः सहस्रा॒क्षः स॒हस्र॑पात् ।\nस भूमिं॑ वि॒श्वतो॑ वृ॒त्वात्य॑तिष्ठद्दशाङ्गु॒लम् ॥",
              "transliteration": "sahasra-śīrṣā puruṣaḥ sahasrākṣaḥ sahasra-pāt |\nsa bhūmiṁ viśvato vṛtvāty atiṣṭhad daśāṅgulam ||",
              "word_meanings": [
                {
                  "sanskrit": "सहस्र-शीर्षा पुरुषः",
                  "iast": "sahasra-śīrṣā puruṣaḥ",
                  "meaning": "thousands of heads has the Purusha"
                },
                {
                  "sanskrit": "सहस्राक्षः सहस्रपात्",
                  "iast": "sahasrākṣaḥ sahasra-pāt",
                  "meaning": "thousands of eyes and thousands of feet"
                },
                {
                  "sanskrit": "अत्यतिष्ठत् दशाङ्गुलम्",
                  "iast": "aty atiṣṭhad daśāṅgulam",
                  "meaning": "He transcends the cosmos by ten fingers' breadth"
                }
              ],
              "english": "The Cosmic Person (Purusha) has a thousand heads, a thousand eyes, and a thousand feet. Encompassing the entire universe on every side, He transcends it by ten fingers' breadth.",
              "hindi": "उस विराट पुरुष के सहस्रों सिर, सहस्रों नेत्र और सहस्रों पैर हैं। वह सम्पूर्ण ब्रह्माण्ड को सब ओर से व्याप्त करके भी उससे दस अंगुल परे स्थित है।",
              "commentary": "Panentheism: the Divine is both omnipresent in creation and forever transcendent beyond it.",
              "audio": ""
            },
            {
              "id": "rv_10_90_2",
              "verse_number": "10.90.2",
              "citation": "Rigveda 10.90.2",
              "meter": "Anuṣṭubh",
              "sanskrit": "पुरु॑ष ए॒वेदं सर्वं॒ यद्भू॒तं यच्च॒ भव्य॑म् ।\nउ॒तामृ॑त॒त्वस्येशhistoryानो॒ यदन्ने॑नाति॒रोह॑ति ॥",
              "transliteration": "puruṣa evedaṁ sarvaṁ yad bhūtaṁ yac ca bhavyam |\nutāmṛtatvasyeśāno yad annenātirohati ||",
              "word_meanings": [
                {
                  "sanskrit": "पुरुषः एव इदम् सर्वम्",
                  "iast": "puruṣa evedaṁ sarvam",
                  "meaning": "Purusha alone is all this that exists"
                },
                {
                  "sanskrit": "यत् भूतम् यत् च भव्यम्",
                  "iast": "yad bhūtaṁ yac ca bhavyam",
                  "meaning": "what has been and what is yet to be"
                },
                {
                  "sanskrit": "उत अमृतत्वस्य ईशानः",
                  "iast": "utāmṛtatvasyeśāno",
                  "meaning": "He is also the Lord of immortality"
                }
              ],
              "english": "Purusha alone is all this universe—all that has been and all that is yet to be. He is the Lord of immortality, transcending all that grows through food and matter.",
              "hindi": "जो कुछ बीत चुका है और जो कुछ आगे होने वाला है, वह सब पुरुष ही है। वही अमृतत्त्व का स्वामी है।",
              "commentary": "Time, history, and immortality are subsumed in the eternal present of Purusha.",
              "audio": ""
            }
          ]
        },
        {
          "id": "rv_m10_s129",
          "chapter_number": 5,
          "title": "Nasadiya Sukta - Hymn of Creation (Mandala 10, Hymn 129: Complete 7 Rks)",
          "sanskrit_title": "नासदीयसूक्तम् (मण्डल १०, सूक्त १२९)",
          "transliteration": "Nāsadīyasūktam (Mandala 10, Sukta 129)",
          "summary": "Revealed to Prajapati Parameshthi in Trishtubh meter. The world's most breathtaking metaphysical poem questioning the primeval state before creation: when there was neither existence (Sat) nor non-existence (Asat), only That One breathing breathless by Its own nature, wrapped in dark profundity.",
          "verses": [
            {
              "id": "rv_10_129_1",
              "verse_number": "10.129.1",
              "citation": "Rigveda 10.129.1",
              "meter": "Triṣṭubh",
              "sanskrit": "नास॑दासी॒न्नो सदा॑सीत्त॒दानीं॒ नासी॒द्रजो॒ नो व्यो॑मा प॒रो यत् ।\nकिमाव॑रीव॒ः कुह॒ कस्य॒ शर्म॒न्नम्भः॒ किमा॑सी॒द्गह॑नं गभी॒रम् ॥",
              "transliteration": "nāsad āsīn no sad āsīt tadānīṁ nāsīd rajo no vyomā paro yat |\nkim āvarīvaḥ kuha kasya śarmann ambhaḥ kim āsīd gahanaṁ gabhīram ||",
              "word_meanings": [
                {
                  "sanskrit": "न असत् आसीत् नो सत् आसीत् तदानीम्",
                  "iast": "nāsad āsīn no sad āsīt tadānīm",
                  "meaning": "then there was neither non-existence nor existence"
                },
                {
                  "sanskrit": "न आसीत् रजः नो व्योम परः यत्",
                  "iast": "nāsīd rajo no vyomā paro yat",
                  "meaning": "there was neither realm of space nor the sky beyond"
                },
                {
                  "sanskrit": "किम् आवरीवः कुह कस्य शर्मन्",
                  "iast": "kim āvarīvaḥ kuha kasya śarman",
                  "meaning": "what covered it, and where, and for whose shelter?"
                }
              ],
              "english": "Then was not non-existence nor existence; there was no realm of space, no sky beyond. What covered it, and where? and what gave shelter? Was there water, unfathomed and deep?",
              "hindi": "उस समय न असत्य था और न सत्य था; न अन्तरिक्ष था और न उससे परे कोई आकाश। किसने किसको ढँक रखा था? कहाँ और किसकी शरण में? क्या अथाह गहरा जल वहाँ था?",
              "commentary": "The radical apophatic ontology: all binary categories collapse in the primordial state.",
              "audio": ""
            },
            {
              "id": "rv_10_129_2",
              "verse_number": "10.129.2",
              "citation": "Rigveda 10.129.2",
              "meter": "Triṣṭubh",
              "sanskrit": "न मृ॒त्युरा॑सीद॒मृतं॒ न तर्हि॒ न रात्र्या॒ अह्न॑ आसीत्प्रके॒तः ।\nआनी॑दवा॒तं स्व॒धया॒ तदेकं॒ तस्मा॑द्धा॒न्यन्न प॒रः किञ्च॒नास॑ ॥",
              "transliteration": "na mṛtyur āsīd amṛtaṁ na tarhi na rātryā ahna āsīt praketaḥ |\nānīd avātaṁ svadhayā tad ekaṁ tasmād dhānyan na paraḥ kiñcanāsa ||",
              "word_meanings": [
                {
                  "sanskrit": "न मृत्युः आसीत् अमृतम् न तर्हि",
                  "iast": "na mṛtyur āsīd amṛtaṁ na tarhi",
                  "meaning": "death was not then, nor was there immortality"
                },
                {
                  "sanskrit": "आनीत् अवातम् स्वधया तत् एकम्",
                  "iast": "ānīd avātaṁ svadhayā tad ekam",
                  "meaning": "That One breathed breathless by Its own power"
                },
                {
                  "sanskrit": "तस्मात् अन्यत् न परः किञ्चन आस",
                  "iast": "tasmād dhānyan na paraḥ kiñcanāsa",
                  "meaning": "other than That, nothing whatsoever existed"
                }
              ],
              "english": "Death was not then, nor was there immortality; no sign was there, the day's and night's divider. That One Thing, breathless, breathed by its own nature; apart from It was nothing whatsoever.",
              "hindi": "उस समय न मृत्यु थी और न अमरता; न रात और दिन का कोई भेद था। वह 'एक परमतत्त्व' बिना वायु के अपनी ही शक्ति से श्वास ले रहा था; उसके अतिरिक्त परे कुछ भी नहीं था।",
              "commentary": "'Tad Ekam' (That One) breathing breathless by Svadhā (intrinsic cosmic energy).",
              "audio": ""
            },
            {
              "id": "rv_10_129_3",
              "verse_number": "10.129.3",
              "citation": "Rigveda 10.129.3",
              "meter": "Triṣṭubh",
              "sanskrit": "तम॑ आसी॒त्तम॑सा गू॒ळ्हमग्रे॑ऽप्रके॒तं स॑लि॒लं सर्व॑मा इ॒दम् ।\nतु॒च्छ्येना॒भ्वपि॑हितं॒ यदासी॒त्तप॑स॒स्तन्म॑हि॒नाजा॑य॒तैक॑म् ॥",
              "transliteration": "tama āsīt tamasā gūḷham agre 'praketaṁ salilaṁ sarvam ā idam |\ntucchyenābhv apihitaṁ yad āsīt tapasas tan mahinājāyataikam ||",
              "word_meanings": [
                {
                  "sanskrit": "तमः आसीत् तमसा गूळ्हम् अग्रे",
                  "iast": "tama āsīt tamasā gūḷham agre",
                  "meaning": "darkness was in the beginning hidden by darkness"
                },
                {
                  "sanskrit": "तपसः तत् महिना अजायत एकम्",
                  "iast": "tapasas tan mahinājāyataikam",
                  "meaning": "by the potency of Tapas (cosmic fervor) that One arose"
                }
              ],
              "english": "Darkness there was at first concealed by darkness; an undifferentiated cosmic ocean was all this. That One, enveloped in void, arose by the majestic power of contemplative fervor (Tapas).",
              "hindi": "आरम्भ में अन्धकार अन्धकार से छिपा हुआ था; यह सब अप्रकट जल रूप था। शून्य से आवृत जो वह तत्त्व था, वह तप के प्रभाव से प्रकट हुआ।",
              "commentary": "Tapas (cosmic self-heating / focused intent) ignites manifestation out of primeval potential.",
              "audio": ""
            },
            {
              "id": "rv_10_129_4",
              "verse_number": "10.129.4",
              "citation": "Rigveda 10.129.4",
              "meter": "Triṣṭubh",
              "sanskrit": "काम॒स्तदग्रे॒ सम॑वर्त॒ताधि॒ मन॑सो॒ रेत॑ः प्रथ॒मं यदासी॑त् ।\nस॒तो बन्धु॒मस॑ति॒ निर॑विन्दन्हृ॒दि प्र॒तीष्या॑ क॒वयो॑ मनी॒षा ॥",
              "transliteration": "kāmas tad agre samavartatādhi manaso retaḥ prathamaṁ yad āsīt |\nsato bandhum asati niravindan hṛdi pratīṣyā kavayo manīṣā ||",
              "word_meanings": [
                {
                  "sanskrit": "कामः तत् अग्रे समवर्तत",
                  "iast": "kāmas tad agre samavartatādhi",
                  "meaning": "desire / primal will arose upon It in the beginning"
                },
                {
                  "sanskrit": "मनसः रेतः प्रथमम्",
                  "iast": "manaso retaḥ prathamaṁ",
                  "meaning": "the primal seed of Cosmic Mind"
                },
                {
                  "sanskrit": "सतः बन्धुम् असति निरविन्दन् हृदि",
                  "iast": "sato bandhum asati niravindan hṛdi",
                  "meaning": "the bond of the existent in the non-existent, seers found in the heart"
                }
              ],
              "english": "In the beginning arose Desire (Kama), which was the primal germ and seed of Mind. Sages, searching deeply in their hearts with wisdom, discovered the kinship of the existent in the non-existent.",
              "hindi": "सबसे पहले उसमें 'काम' (सृष्टि-संकल्प) का प्रादुर्भाव हुआ, जो मन का प्रथम बीज था। तत्त्वदर्शी ऋषियों ने अपने अन्तःकरण में विचार करके असत्य में सत्य के सम्बन्ध को खोज निकाला।",
              "commentary": "Kama as the creative impulse bridging unmanifest nothingness and manifest forms.",
              "audio": ""
            },
            {
              "id": "rv_10_129_5",
              "verse_number": "10.129.5",
              "citation": "Rigveda 10.129.5",
              "meter": "Triṣṭubh",
              "sanskrit": "ति॒र॒श्चीनो॒ वित॑तो र॒श्मिरे॑षा॒मधः॑ स्वि॑दा॒सी३दु॒परि॑ स्विदासी३त् ।\nरे॒तो॒धा आ॑सन्महि॒मान॑ आसन्त्स्व॒धा अ॒वस्ता॒त्प्रय॑तिः प॒रस्ता॑त् ॥",
              "transliteration": "tiraścīno vitato raśmir eṣām adhaḥ svid āsī3d upari svid āsī3t |\nretodhā āsan mahimāna āsan svadhā avastāt prayatiḥ parastāt ||",
              "word_meanings": [
                {
                  "sanskrit": "तिरश्चीनः विततः रश्मिः एषाम्",
                  "iast": "tiraścīno vitato raśmir eṣām",
                  "meaning": "their ray of light was stretched obliquely across"
                },
                {
                  "sanskrit": "अधः स्वित् आसीत् उपरि स्वित् आसीत्",
                  "iast": "adhaḥ svid āsīd upari svid āsīt",
                  "meaning": "was there an above? Was there a below?"
                },
                {
                  "sanskrit": "रेतोधाः आसन् महिमानः आसन्",
                  "iast": "retodhā āsan mahimāna āsan",
                  "meaning": "there were seed-bearers, there were mighty creative forces"
                },
                {
                  "sanskrit": "स्वधा अवस्तात् प्रयतिः परस्तात्",
                  "iast": "svadhā avastāt prayatiḥ parastāt",
                  "meaning": "material impulse beneath, conscious purpose above"
                }
              ],
              "english": "Their ray of light was stretched across: was there an above? Was there a below? There were seed-bearers and mighty forces; material nature (Svadha) was beneath, and conscious purpose (Prayati) was above.",
              "hindi": "उनकी रश्मि तिरछी फैली हुई थी: क्या वहाँ ऊपर कुछ था? क्या नीचे कुछ था? वहाँ बीज-धारक शक्तियाँ थीं और महिमावान् सामर्थ्य थे—नीचे भौतिक प्रकृति थी और ऊपर चेतन संकल्प शक्ति।",
              "commentary": "The structural polarity of cosmos: unconscious matter below and conscious spiritual will above.",
              "audio": ""
            },
            {
              "id": "rv_10_129_6",
              "verse_number": "10.129.6",
              "citation": "Rigveda 10.129.6",
              "meter": "Triṣṭubh",
              "sanskrit": "को अ॒द्धा वे॑द॒ क इ॒ह प्र वो॑च॒त्कुत॒ आजा॑ता॒ कुत॑ इ॒यं विसृ॑ष्टिः ।\nअ॒र्वाग्दे॒वा अ॒स्य वि॒सर्ज॑ने॒नाथा॒ को वे॑द॒ यत॑ आब॒भूव॑ ॥",
              "transliteration": "ko addhā veda ka iha pra vocat kuta ājātā kuta iyaṁ visṛṣṭiḥ |\narvāg devā asya visarjanenāthā ko veda yata ābabhūva ||",
              "word_meanings": [
                {
                  "sanskrit": "कः अद्धा वेद कः इह प्र वोचत्",
                  "iast": "ko addhā veda ka iha pra vocat",
                  "meaning": "who truly knows? Who here can declare it?"
                },
                {
                  "sanskrit": "कुतः आजाता इयम् विसृष्टिः",
                  "iast": "kuta ājātā kuta iyaṁ visṛṣṭiḥ",
                  "meaning": "whence was born this manifold creation?"
                },
                {
                  "sanskrit": "अर्वाक् देवाः अस्य विसर्जनेन",
                  "iast": "arvāg devā asya visarjanena",
                  "meaning": "the gods themselves came later"
                }
              ],
              "english": "Who truly knows? Who here can declare it? Whence was it born, whence came this manifold creation? The gods themselves came later after creation's unfolding—who then knows whence it first arose?",
              "hindi": "कौन यथार्थ जानता है? यहाँ कौन बता सकता है कि यह विविध सृष्टि कहाँ से उत्पन्न हुई और कहाँ से आई? देवगण भी इस सृष्टि के बाद प्रकट हुए, फिर कौन जान सकता है कि यह कहाँ से उत्पन्न हुई?",
              "commentary": "The pinnacle of intellectual honesty: acknowledging that created beings cannot easily witness their own origin.",
              "audio": ""
            },
            {
              "id": "rv_10_129_7",
              "verse_number": "10.129.7",
              "citation": "Rigveda 10.129.7",
              "meter": "Triṣṭubh",
              "sanskrit": "इ॒यं विसृ॑ष्टि॒र्यत॑ आब॒भूव॒ यदि॑ वा द॒धे यदि॑ वा॒ न ।\nयो अ॒स्याध्य॑क्षः पर॒मे व्यो॑म॒न्त्सो अ॒ङ्ग वे॑द॒ यदि॑ वा॒ न वेद॑ ॥",
              "transliteration": "iyaṁ visṛṣṭir yata ābabhūva yadi vā dadhe yadi vā na |\nyo asyādhyakṣaḥ parame vyoman so aṅga veda yadi vā na veda ||",
              "word_meanings": [
                {
                  "sanskrit": "इयम् विसृष्टिः यतः आबभूव",
                  "iast": "iyaṁ visṛṣṭir yata ābabhūva",
                  "meaning": "this creation whence it arose"
                },
                {
                  "sanskrit": "यदि वा दधे यदि वा न",
                  "iast": "yadi vā dadhe yadi vā na",
                  "meaning": "whether He fashioned it or fashioned it not"
                },
                {
                  "sanskrit": "यः अस्य अध्यक्षः परमे व्योमन्",
                  "iast": "yo asyādhyakṣaḥ parame vyoman",
                  "meaning": "He who is its overseer in the highest heaven"
                },
                {
                  "sanskrit": "सः अङ्ग वेद यदि वा न वेद",
                  "iast": "so aṅga veda yadi vā na veda",
                  "meaning": "He verily knows—or perhaps even He knows not!"
                }
              ],
              "english": "He from whom this creation sprang forth, whether He fashioned it or fashioned it not, He who surveys it in the highest heaven—He verily knows, or perhaps even He knows not!",
              "hindi": "यह सृष्टि जिससे प्रकट हुई, उसने इसे रचा अथवा नहीं रचा—परम व्योम में बैठा हुआ जो इसका अध्यक्ष है, सम्भवतः वही जानता है, अथवा वह भी नहीं जानता!",
              "commentary": "The awe-inspiring conclusion questioning whether even the supreme cosmic overseer can fathom the miracle of existence.",
              "audio": ""
            }
          ]
        },
        {
          "id": "rv_m10_s191",
          "chapter_number": 6,
          "title": "Samjnana Sukta - Hymn of Unity & Harmony (Mandala 10, Hymn 191)",
          "sanskrit_title": "संज्ञानसूक्तम् (मण्डल १०, सूक्त १९१)",
          "transliteration": "Saṁjñānasūktam (Mandala 10, Sukta 191)",
          "summary": "The very final hymn of the Rigveda Samhita (Mandala 10, Sukta 191). A monumental prayer for collective concord, united hearts, harmonized intellects, and common purpose among all human beings.",
          "verses": [
            {
              "id": "rv_10_191_2",
              "verse_number": "10.191.2",
              "citation": "Rigveda 10.191.2",
              "meter": "Anuṣṭubh",
              "sanskrit": "सं ग॑च्छध्वं॒ सं व॑दध्वं॒ सं वो॒ मनां॑सि जानताम् ।\nदे॒वा भा॒गं यथा॒ पूर्वे॑ सञ्जाना॒ना उ॒पास॑ते ॥",
              "transliteration": "saṁ gacchadhvaṁ saṁ vadadhvaṁ saṁ vo manāṁsi jānatām |\ndevā bhāgaṁ yathā pūrve sañjānānā upāsate ||",
              "word_meanings": [
                {
                  "sanskrit": "सम् गच्छध्वम् सम् वदध्वम्",
                  "iast": "saṁ gacchadhvaṁ saṁ vadadhvam",
                  "meaning": "walk together, speak together in harmony"
                },
                {
                  "sanskrit": "सम् वः मनांसि जानताम्",
                  "iast": "saṁ vo manāṁsi jānatām",
                  "meaning": "may your minds understand in unison"
                },
                {
                  "sanskrit": "देवाः भागम् यथा पूर्वे संजानानाः उपासते",
                  "iast": "devā bhāgaṁ yathā pūrve sañjānānā upāsate",
                  "meaning": "just as the ancient gods unitedly took their shares"
                }
              ],
              "english": "Assemble together, speak together in concord, let your minds be of one accord, just as the ancient wise powers unitedly shared their portions!",
              "hindi": "तुम सब एक साथ मिलकर चलो, एक स्वर में बोलो, तुम्हारे मन एक समान होकर ज्ञान प्राप्त करें; जैसे प्राचीन काल के देवगण एकमत होकर अपना-अपना भाग ग्रहण करते थे।",
              "commentary": "The universal anthem of community concord and shared human destiny.",
              "audio": ""
            },
            {
              "id": "rv_10_191_4",
              "verse_number": "10.191.4",
              "citation": "Rigveda 10.191.4",
              "meter": "Anuṣṭubh",
              "sanskrit": "स॒मा॒नी व॒ आकू॑तिः समा॒ना हृद॑यानि वः ।\nस॒मा॒नम॑स्तु वो॒ मनो॒ यथा॑ वः॒ सुस॒हास॑ति ॥",
              "transliteration": "samānī va ākūtiḥ samānā hṛdayāni vaḥ |\nsamānam astu vo mano yathā vaḥ susahāsati ||",
              "word_meanings": [
                {
                  "sanskrit": "समानी वः आकूतिः",
                  "iast": "samānī va ākūtiḥ",
                  "meaning": "harmonious be your aspirations"
                },
                {
                  "sanskrit": "समाना हृदयानि वः",
                  "iast": "samānā hṛdayāni vaḥ",
                  "meaning": "united be your hearts"
                },
                {
                  "sanskrit": "समानम् अस्तु वः मनः",
                  "iast": "samānam astu vo mano",
                  "meaning": "united be your mind"
                },
                {
                  "sanskrit": "यथा वः सुसहासति",
                  "iast": "yathā vaḥ susahāsati",
                  "meaning": "so that there may be glorious concord among you"
                }
              ],
              "english": "May your aspirations be harmonious, united be your hearts, and unified be your mind, so that there may be perfect and joyous concord among you all!",
              "hindi": "तुम्हारा संकल्प समान हो, तुम्हारे हृदय समान हों और तुम्हारा मन एक हो, जिससे कि तुम्हारे बीच उत्तम एकता और सौहार्द बना रहे।",
              "commentary": "The closing rik of the Rigveda Samhita consecrating universal unity.",
              "audio": ""
            }
          ]
        }
      ]
    },
    {
      "id": "katha_upanishad",
      "category_id": "vedas_upanishads",
      "category": "Vedas & Upanishads",
      "title": "Katha Upanishad",
      "sanskrit_title": "कठोपनिषद्",
      "transliteration": "Kaṭhopaniṣad",
      "author": "Krishna Yajurveda Tradition (Katha Shakha)",
      "tradition": "Mukhya Upanishad (Shruti)",
      "era": "c. 800–500 BCE",
      "description": "The dramatic and profound dialogue between young Nachiketa and Yama (the Lord of Death), exploring the mystery of what lies beyond mortality, the distinction between Shreyas (the good) and Preyas (the pleasant), the Chariot allegory of human consciousness, and the razor-sharp path to immortality.",
      "epigraph": "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत ।\nक्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस्तत्कवयो वदन्ति ॥",
      "epigraph_translation": "Arise! Awake! Approach the great teachers and realize the Self. Sharp as the razor's edge and hard to traverse is that difficult path, say the wise.",
      "chapters": [
        {
          "id": "ku_valli_1",
          "chapter_number": 1,
          "title": "Valli 1: Nachiketa and the Three Boons",
          "sanskrit_title": "प्रथमा वल्ली (नचिकेता-यम-संवादः)",
          "transliteration": "Prathamā Vallī",
          "summary": "Young Nachiketa witnesses his father Vajashravas giving barren cows in sacrifice and questions the insincerity. He goes to the realm of Yama, waits three nights without food, and is offered three boons. For his third boon, he asks the supreme mystery of what happens to consciousness beyond death.",
          "verses": [
            {
              "id": "ku_1_shanti",
              "verse_number": "Invocation",
              "citation": "Katha Upanishad Shanti Mantra",
              "meter": "Anuṣṭubh",
              "sanskrit": "ॐ सह नाववतु । सह नौ भुनक्तु ।\nसह वीर्यं करवावहै ।\nतेजस्वि नावधीतमस्तु मा विद्विषावहै ॥\nॐ शान्तिः शान्तिः शान्तिः ॥",
              "transliteration": "oṁ saha nāv avatu | saha nau bhunaktu |\nsaha vīryaṁ karavāvahai |\ntejasvi nāv adhītam astu mā vidviṣāvahai ||\noṁ śāntiḥ śāntiḥ śāntiḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "सह नौ अवतु",
                  "iast": "saha nau avatu",
                  "meaning": "may He protect both of us together"
                },
                {
                  "sanskrit": "सह नौ भुनक्तु",
                  "iast": "saha nau bhunaktu",
                  "meaning": "may He nourish both of us together"
                },
                {
                  "sanskrit": "सह वीर्यम् करवावहै",
                  "iast": "saha vīryaṁ karavāvahai",
                  "meaning": "may we work together with great energy"
                },
                {
                  "sanskrit": "तेजस्वि नौ अधीतम् अस्तु",
                  "iast": "tejasvi nāv adhītam astu",
                  "meaning": "may our study be illuminating"
                },
                {
                  "sanskrit": "मा विद्विषावहै",
                  "iast": "mā vidviṣāvahai",
                  "meaning": "may we never harbor discord"
                }
              ],
              "english": "OM. May the Supreme Divine protect both teacher and student together. May He nourish us both together. May we generate great strength and spiritual vigor together. May our learning be luminous and effective. May we never harbor discord. OM Peace, Peace, Peace.",
              "hindi": "ॐ! परमात्मा हम दोनों (गुरु और शिष्य) की साथ-साथ रक्षा करें, हम दोनों का साथ-साथ पालन-पोषण करें। हम साथ मिलकर महान सामर्थ्य प्राप्त करें। हमारा अध्ययन तेजोमय हो और हम कभी परस्पर द्वेष न करें। ॐ शान्तिः शान्तिः शान्तिः।",
              "commentary": "The universal peace prayer of the Krishna Yajurveda establishing harmonious resonance between Master and Disciple.",
              "audio": ""
            },
            {
              "id": "ku_1_1_1",
              "verse_number": "1.1.1",
              "citation": "Katha Upanishad 1.1.1",
              "meter": "Anuṣṭubh",
              "sanskrit": "ॐ उशन् ह वै वाजश्रवसः सर्ववेदसं ददौ ।\nतस्य ह नचिकेता नाम पुत्र आस ॥",
              "transliteration": "oṁ uśan ha vai vājaśravasaḥ sarva-vedasaṁ dadau |\ntasya ha naciketā nāma putra āsa ||",
              "word_meanings": [
                {
                  "sanskrit": "उशन् ह वै वाजश्रवसः",
                  "iast": "uśan ha vai vājaśravasaḥ",
                  "meaning": "desiring heavenly fruit, Vajashravas"
                },
                {
                  "sanskrit": "सर्व-वेदसम् ददौ",
                  "iast": "sarva-vedasaṁ dadau",
                  "meaning": "gave away all his worldly possessions in sacrifice"
                },
                {
                  "sanskrit": "तस्य ह नचिकेता नाम पुत्रः आस",
                  "iast": "tasya ha naciketā nāma putra āsa",
                  "meaning": "he had a son named Nachiketa"
                }
              ],
              "english": "Desiring heavenly rewards, Vajashravas gave away all his possessions in sacrifice. He had a son named Nachiketa.",
              "hindi": "स्वर्ग के फलों की इच्छा करते हुए वाजश्रवा के पुत्र उद्दालक ने विश्वजित् यज्ञ में अपना सब कुछ दान कर दिया। उनका नचिकेता नाम का एक पुत्र था।",
              "commentary": "The opening context of the Katha Upanishad contrasting external ritualism with the sincere seeking of youth.",
              "audio": ""
            },
            {
              "id": "ku_1_1_20",
              "verse_number": "1.1.20",
              "citation": "Katha Upanishad 1.1.20",
              "meter": "Triṣṭubh",
              "sanskrit": "येयं प्रेते विचिकित्सा मनुष्ये-\nऽस्तीत्येके नायमस्तीति चैके ।\nएतद्विद्यामनुशिष्टस्त्वयाऽहं\nवराणामेष वरस्तृतीयः ॥",
              "transliteration": "yeyaṁ prete vicikitsā manuṣye\n'stīty eke nāyam astīti caike |\netad vidyām anuśiṣṭas tvayāhaṁ\nvarāṇām eṣa varas tṛtīyaḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "या इयम् प्रेते विचिकित्सा",
                  "iast": "yā iyam prete vicikitsā",
                  "meaning": "this doubt that exists when a human dies"
                },
                {
                  "sanskrit": "अस्ति इति एके",
                  "iast": "astīty eke",
                  "meaning": "some say 'He still exists'"
                },
                {
                  "sanskrit": "न अयम् अस्ति इति च एके",
                  "iast": "nāyam astīti caike",
                  "meaning": "and others say 'He exists no more'"
                },
                {
                  "sanskrit": "वराणाम् एषः वरः तृतीयः",
                  "iast": "varāṇām eṣa varas tṛtīyaḥ",
                  "meaning": "of all boons, this is my third boon"
                }
              ],
              "english": "Nachiketa said: There is this profound doubt when a person departs from this world: some say 'The Self exists,' while others say 'It exists no more.' Taught by you, I wish to know the absolute truth of this. Of all boons, this is my third boon!",
              "hindi": "नचिकेता बोले: मनुष्य के मरने के पश्चात् जो यह संशय बना रहता है—कुछ कहते हैं कि 'वह रहता है' और कुछ कहते हैं कि 'वह नहीं रहता'—आपके द्वारा उपदेश पाकर मैं इस तत्त्व को जानना चाहता हूँ। वरों में यह मेरा तीसरा वर है।",
              "commentary": "The fundamental existential question opening the Upanishadic inquiry on death and immortality.",
              "audio": ""
            },
            {
              "id": "ku_1_1_29",
              "verse_number": "1.1.29",
              "citation": "Katha Upanishad 1.1.29",
              "meter": "Triṣṭubh",
              "sanskrit": "यस्मिन्निदं विचिकित्सन्ति मृत्यो\nयत्साम्पराये महति ब्रूहि नस्तत् ।\nयोऽयं वरो गूढमनुप्रविष्टो\nनान्यं तस्मान्नचिकेता वृणीते ॥",
              "transliteration": "yasminn idaṁ vicikitsanti mṛtyo\nyat sāmparāye mahati brūhi nas tat |\nyo 'yaṁ varo gūḍham anupraviṣṭo\nnānyaṁ tasmān naciketā vṛṇīte ||",
              "word_meanings": [
                {
                  "sanskrit": "यस्मिन् इदम् विचिकित्सन्ति मृत्यो",
                  "iast": "yasminn idaṁ vicikitsanti mṛtyo",
                  "meaning": "about which they doubt, O Death"
                },
                {
                  "sanskrit": "महति साम्पराये",
                  "iast": "mahati sāmparāye",
                  "meaning": "concerning that great transition beyond death"
                },
                {
                  "sanskrit": "न अन्यम् तस्मात् नचिकेता वृणीते",
                  "iast": "nānyaṁ tasmān naciketā vṛṇīte",
                  "meaning": "other than that boon, Nachiketa chooses none"
                }
              ],
              "english": "Tell me of that great beyond about which people doubt, O Death! Nachiketa chooses no other boon than this which penetrates the deep mystery of the immortal Self!",
              "hindi": "हे मृत्युदेव! उस महान परलोक के विषय में जिसमें लोग संशय करते हैं, वही मुझे बताइए। इसके अतिरिक्त नचिकेता किसी अन्य वर को नहीं चाहता।",
              "commentary": "Nachiketa's unyielding dispassion (Vairagya) rejects all worldly pleasures for Truth.",
              "audio": ""
            }
          ]
        },
        {
          "id": "ku_valli_2",
          "chapter_number": 2,
          "title": "Valli 2: Shreyas vs Preyas & The Eternal Self",
          "sanskrit_title": "द्वितीया वल्ली (श्रेयः-प्रेयः-विवेकः)",
          "transliteration": "Dvitīyā Vallī",
          "summary": "Yama praises Nachiketa for choosing Shreyas (the spiritually good) over Preyas (the worldly pleasant). He reveals the sacred syllable OM as the supreme symbol of Brahman, and declares that the Atman is unborn, eternal, subtler than the subtle, and realized through inner grace.",
          "verses": [
            {
              "id": "ku_1_2_1",
              "verse_number": "1.2.1",
              "citation": "Katha Upanishad 1.2.1",
              "meter": "Triṣṭubh",
              "sanskrit": "अन्यच्छ्रेयोऽन्यदुतैव प्रेय-\nस्ते उभे नानार्थे पुरुषं सिनीतः ।\nतयोः श्रेय आददानस्य साधु\nभवति हीयतेऽर्थाद्य उ प्रेयो वृणीते ॥",
              "transliteration": "anyac chreyo 'nyad utaiva preyas\nte ubhe nānārthe puruṣaṁ sinītaḥ |\ntayoḥ śreya ādadānasya sādhu\nbhavati hīyate 'rthād ya u preyo vṛṇīte ||",
              "word_meanings": [
                {
                  "sanskrit": "अन्यत् श्रेयः अन्यत् उत एव प्रेयः",
                  "iast": "anyac chreyo 'nyad utaiva preyaḥ",
                  "meaning": "one thing is the good (Shreyas), quite another is the pleasant (Preyas)"
                },
                {
                  "sanskrit": "तयोः श्रेयः आददानस्य साधु भवति",
                  "iast": "tayoḥ śreya ādadānasya sādhu bhavati",
                  "meaning": "of the two, well it is with him who chooses the good"
                },
                {
                  "sanskrit": "हीयते अर्थात् यः प्रेयः वृणीते",
                  "iast": "hīyate 'rthād ya u preyo vṛṇīte",
                  "meaning": "he falls away from the true goal who chooses the pleasant"
                }
              ],
              "english": "One thing is Shreyas (the spiritually good and liberating); quite another is Preyas (the materially pleasant and alluring). Both bind human beings to different ends. It is well with him who chooses Shreyas; but he who chooses Preyas falls away from the true goal of life.",
              "hindi": "श्रेय (कल्याणकारी मार्ग) भिन्न है और प्रेय (सांसारिक प्रिय मार्ग) भिन्न है। ये दोनों मनुष्य को भिन्न-भिन्न लक्ष्यों में बाँधते हैं। इनमें से श्रेय को चुनने वाले का कल्याण होता है और जो प्रेय को चुनता है, वह अपने परम लक्ष्य से भ्रष्ट हो जाता है।",
              "commentary": "The foundational fork in Indian ethics: Shreyas (spiritual liberation) vs Preyas (instant gratification).",
              "audio": ""
            },
            {
              "id": "ku_1_2_2",
              "verse_number": "1.2.2",
              "citation": "Katha Upanishad 1.2.2",
              "meter": "Triṣṭubh",
              "sanskrit": "श्रेयश्च प्रेयश्च मनुष्यमेत-\nस्तौ सम्परीत्य विविनक्ति धीरः ।\nश्रेयो हि धीरोऽभि प्रेयसो वृणीते\nप्रेयो मन्दो योगक्षेमाद्वृणीते ॥",
              "transliteration": "śreyaś ca preyaś ca manuṣyam etaḥ\ntau samparītya vivinakti dhīraḥ |\nśreyo hi dhīro 'bhi preyaso vṛṇīte\npreyo mando yoga-kṣemād vṛṇīte ||",
              "word_meanings": [
                {
                  "sanskrit": "श्रेयः च प्रेयः च मनुष्यम् एतः",
                  "iast": "śreyaś ca preyaś ca manuṣyam etaḥ",
                  "meaning": "the good and the pleasant both approach man"
                },
                {
                  "sanskrit": "तौ सम्परीत्य विविनक्ति धीरः",
                  "iast": "tau samparītya vivinakti dhīraḥ",
                  "meaning": "examining both, the wise discriminates between them"
                },
                {
                  "sanskrit": "श्रेयः हि धीरः अभि प्रेयसः वृणीते",
                  "iast": "śreyo hi dhīro 'bhi preyaso vṛṇīte",
                  "meaning": "the wise chooses the good over the pleasant"
                }
              ],
              "english": "The good and the pleasant both approach human beings. The wise person examines both and discriminates between them. The wise chooses the good over the pleasant, whereas the foolish chooses the pleasant for bodily acquisition and comfort.",
              "hindi": "धीर पुरुष दोनों की परीक्षा करके विवेकपूर्वक श्रेय को अपनाता है, जबकि मन्दबुद्धि मनुष्य सांसारिक भोगों और सुख-सुविधाओं के कारण प्रेय को चुनता है।",
              "commentary": "Viveka (discrimination) is the hallmark of the philosophical mind.",
              "audio": ""
            },
            {
              "id": "ku_1_2_15",
              "verse_number": "1.2.15",
              "citation": "Katha Upanishad 1.2.15",
              "meter": "Triṣṭubh",
              "sanskrit": "सर्वे वेदा यत्पदमामनन्ति\nतपांसि सर्वाणि च यद्वदन्ति ।\nयदिच्छन्तो ब्रह्मचर्यं चरन्ति\nतत्ते पदं सङ्ग्रहेण ब्रवीम्योमित्येतत् ॥",
              "transliteration": "sarve vedā yat padam āmananti\ntapāṁsi sarvāṇi ca yad vadanti |\nyad icchanto brahmacaryaṁ caranti\ntat te padaṁ saṅgraheṇa bravīmy om ity etat ||",
              "word_meanings": [
                {
                  "sanskrit": "सर्वे वेदाः यत् पदम् आमनन्ति",
                  "iast": "sarve vedā yat padam āmananti",
                  "meaning": "that goal which all the Vedas declare"
                },
                {
                  "sanskrit": "तपांसि सर्वाणि च यत् वदन्ति",
                  "iast": "tapāṁsi sarvāṇi ca yad vadanti",
                  "meaning": "and which all austerities proclaim"
                },
                {
                  "sanskrit": "तद् ब्रवीमि ॐ इति एतत्",
                  "iast": "tad bravīmi om ity etat",
                  "meaning": "that I tell you in brief: It is OM"
                }
              ],
              "english": "That goal which all the Vedas proclaim, which all austerities declare, and desiring which seekers lead a life of sacred discipline—that goal I tell you in brief: It is OM.",
              "hindi": "सम्पूर्ण वेद जिस परम पद का प्रतिपादन करते हैं, सारे तप जिसको कहते हैं और जिसकी इच्छा करते हुए साधक ब्रह्मचर्य का पालन करते हैं, उस पद को मैं तुमसे संक्षेप में कहता हूँ—वह 'ॐ' है।",
              "commentary": "OM as the acoustic symbol of the unmanifest Absolute.",
              "audio": ""
            },
            {
              "id": "ku_1_2_18",
              "verse_number": "1.2.18",
              "citation": "Katha Upanishad 1.2.18",
              "meter": "Triṣṭubh",
              "sanskrit": "न जायते म्रियते वा विपश्चि-\nन्नायं कुतश्चिन्न बभूव कश्चित् ।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे ॥",
              "transliteration": "na jāyate mriyate vā vipaścin\nnāyaṁ kutaścin na babhūva kaścit |\najo nityaḥ śāśvato 'yaṁ purāṇo\nna hanyate hanyamāne śarīre ||",
              "word_meanings": [
                {
                  "sanskrit": "न जायते म्रियते वा विपश्चित्",
                  "iast": "na jāyate mriyate vā vipaścin",
                  "meaning": "the knowing Self is neither born nor dies"
                },
                {
                  "sanskrit": "अजः नित्यः शाश्वतः अयम् पुराणः",
                  "iast": "ajo nityaḥ śāśvato 'yaṁ purāṇo",
                  "meaning": "unborn, eternal, everlasting, primeval"
                },
                {
                  "sanskrit": "न हन्यते हन्यमाने शरीरे",
                  "iast": "na hanyate hanyamāne śarīre",
                  "meaning": "It is not slain when the body is slain"
                }
              ],
              "english": "The knowing Self is never born, nor does It ever die. It sprang from nothing, and nothing sprang from It. Unborn, eternal, everlasting, and primeval, It is not slain when the body is destroyed.",
              "hindi": "यह सर्वज्ञ आत्मा न तो कभी जन्म लेता है और न कभी मरता है। यह न किसी कारण से उत्पन्न हुआ है और न इससे कोई अन्य उत्पन्न हुआ है। यह अजन्मा, नित्य, शाश्वत और पुरातन है; शरीर के नष्ट होने पर भी इसका नाश नहीं होता।",
              "commentary": "The classical revelation on the deathless Atman, later quoted in Bhagavad Gita 2.20.",
              "audio": ""
            },
            {
              "id": "ku_1_2_20",
              "verse_number": "1.2.20",
              "citation": "Katha Upanishad 1.2.20",
              "meter": "Triṣṭubh",
              "sanskrit": "अणोरणीयान्महतो महीया-\nनात्माऽस्य जन्तोर्निहितो गुहायाम् ।\nतमक्रतुः पश्यति वीतशोको\nधातुप्रसादान्महिमानमात्मनः ॥",
              "transliteration": "aṇor aṇīyān mahato mahīyān\nātmā 'sya jantor nihito guhāyām |\ntam akratuḥ paśyati vīta-śoko\ndhātu-prasādān mahimānam ātmanaḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "अणोः अणीयान् महतो महीयान्",
                  "iast": "aṇor aṇīyān mahato mahīyān",
                  "meaning": "subtler than the subtle, vaster than the vast"
                },
                {
                  "sanskrit": "आत्मा अस्य जन्तोः निहितः गुहायाम्",
                  "iast": "ātmāsya jantor nihito guhāyām",
                  "meaning": "the Self is seated in the heart-cave of living beings"
                },
                {
                  "sanskrit": "वीत-शोकः पश्यति",
                  "iast": "vīta-śokaḥ paśyati",
                  "meaning": "free from sorrow, one beholds That"
                }
              ],
              "english": "Subtler than the subtlest atom, vaster than the vastest cosmos, the Self is seated in the hidden cave of the heart of every creature. One who is free from selfish craving beholds that glory of the Self and transcends all grief.",
              "hindi": "अणु से भी अत्यंत सूक्ष्म और महान से भी अत्यंत महान यह आत्मा इस प्राणी के हृदय रूपी गुहा में स्थित है। निष्काम पुरुष मन और इन्द्रियों की प्रसन्नता से उस आत्मा की महिमा का साक्षात्कार करके शोकरहित हो जाता है।",
              "commentary": "The cave of the heart (Hridaya Guha) as the dwelling of the infinite Self.",
              "audio": ""
            }
          ]
        },
        {
          "id": "ku_valli_3",
          "chapter_number": 3,
          "title": "Valli 3: The Chariot Metaphor & Arise, Awake!",
          "sanskrit_title": "तृतीया वल्ली (रथरूपकम् एवं आत्मबोधः)",
          "transliteration": "Tṛtīyā Vallī",
          "summary": "Yama presents the famous Allegory of the Chariot: the Atman is the master, the body is the chariot, intellect (Buddhi) is the driver, mind is the reins, senses are the horses, and sense-objects are the road. He details the hierarchy of consciousness and issues the clarion call: 'Uttishthata Jagrata' (Arise! Awake!).",
          "verses": [
            {
              "id": "ku_1_3_3",
              "verse_number": "1.3.3",
              "citation": "Katha Upanishad 1.3.3",
              "meter": "Anuṣṭubh",
              "sanskrit": "आत्मानं रथिनं विद्धि शरीरं रथमेव तु ।\nबुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च ॥",
              "transliteration": "ātmānaṁ rathinaṁ viddhi śarīraṁ ratham eva tu |\nbuddhiṁ tu sārathiṁ viddhi manaḥ pragraham eva ca ||",
              "word_meanings": [
                {
                  "sanskrit": "आत्मानम् रथिनम् विद्धि",
                  "iast": "ātmānaṁ rathinaṁ viddhi",
                  "meaning": "know the Self as the Lord of the chariot"
                },
                {
                  "sanskrit": "शरीरम् रथम् एव तु",
                  "iast": "śarīraṁ ratham eva tu",
                  "meaning": "and the body as verily the chariot"
                },
                {
                  "sanskrit": "बुद्धिम् तु सारथिम् विद्धि",
                  "iast": "buddhiṁ tu sārathiṁ viddhi",
                  "meaning": "know the intellect as the charioteer"
                },
                {
                  "sanskrit": "मनः प्रग्रहम् एव च",
                  "iast": "manaḥ pragraham eva ca",
                  "meaning": "and the mind as the reins"
                }
              ],
              "english": "Know the Self (Atman) as the master of the chariot, and the physical body as the chariot itself. Know the intellect (Buddhi) as the charioteer, and the mind (Manas) as the reins.",
              "hindi": "तुम आत्मा को रथ का स्वामी जानो और शरीर को रथ समझो। बुद्धि को सारथि जानो और मन को लगाम समझो।",
              "commentary": "The foundational psychological chariot metaphor of Indian philosophy.",
              "audio": ""
            },
            {
              "id": "ku_1_3_4",
              "verse_number": "1.3.4",
              "citation": "Katha Upanishad 1.3.4",
              "meter": "Anuṣṭubh",
              "sanskrit": "इन्द्रियाणि हयानाहुर्विषयांस्तेषु गोचरान् ।\nआत्मेन्द्रियमनोयुक्तं भोक्तेत्याहुर्मनीषिणः ॥",
              "transliteration": "indriyāṇi hayān āhur viṣayāṁs teṣu gocarān |\nātmendriya-mano-yuktaṁ bhoktety āhur manīṣiṇaḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "इन्द्रियाणि हयान् आहुः",
                  "iast": "indriyāṇi hayān āhuḥ",
                  "meaning": "the senses are called the horses"
                },
                {
                  "sanskrit": "विषयान् तेषु गोचरान्",
                  "iast": "viṣayāṁs teṣu gocarān",
                  "meaning": "the sense objects are the roads"
                },
                {
                  "sanskrit": "भोक्ता इति आहुः मनीषिणः",
                  "iast": "bhoktety āhur manīṣiṇaḥ",
                  "meaning": "the wise call It the experiential enjoyer"
                }
              ],
              "english": "The senses are called the horses, and the objects of the senses are the roads they traverse. When the Self is united with the body, senses, and mind, the wise call It the experiential enjoyer (Bhokta).",
              "hindi": "ज्ञानी जन इन्द्रियों को घोड़े कहते हैं और सांसारिक विषयों को उनके दौड़ने का मार्ग। आत्मा, इन्द्रिय और मन से युक्त उस चेतना को मनीषी जन 'भोक्ता' कहते हैं।",
              "commentary": "Sensory impulses pull the mind unless disciplined by wise discriminative intellect.",
              "audio": ""
            },
            {
              "id": "ku_1_3_9",
              "verse_number": "1.3.9",
              "citation": "Katha Upanishad 1.3.9",
              "meter": "Anuṣṭubh",
              "sanskrit": "विज्ञानसारथिर्यस्तु मनःप्रग्रहवान्नरः ।\nसोऽध्वनः पारमाप्नोति तद्विष्णोः परमं पदम् ॥",
              "transliteration": "vijñāna-sārathir yas tu manaḥ-pragrahavān naraḥ |\nso 'dhvanaḥ pāram āpnoti tad viṣṇoḥ paramaṁ padam ||",
              "word_meanings": [
                {
                  "sanskrit": "विज्ञान-सारथिः यः तु",
                  "iast": "vijñāna-sārathir yas tu",
                  "meaning": "he whose charioteer is wise intellect"
                },
                {
                  "sanskrit": "मनः-प्रग्रहवान् नरः",
                  "iast": "manaḥ-pragrahavān naraḥ",
                  "meaning": "and who holds the reins of the mind"
                },
                {
                  "sanskrit": "सः अध्वनः पारम् आप्नोति",
                  "iast": "so 'dhvanaḥ pāram āpnoti",
                  "meaning": "he reaches the end of the journey"
                },
                {
                  "sanskrit": "तत् विष्णोः परमम् पदम्",
                  "iast": "tad viṣṇoḥ paramaṁ padam",
                  "meaning": "that supreme abode of Vishnu"
                }
              ],
              "english": "He who has discerning wisdom as his charioteer, and who holds the reins of the mind firmly in control, reaches the final destination of life's journey—that supreme, all-pervading state of Vishnu.",
              "hindi": "जिस मनुष्य का सारथि विवेकपूर्ण बुद्धि है और जिसका मन लगाम की भाँति वश में है, वही संसार-मार्ग के पार पहुँचता है—वह सर्वव्यापी परमात्मा का परम पद है।",
              "commentary": "The destination of spiritual journey: the supreme abode of all-pervading consciousness.",
              "audio": ""
            },
            {
              "id": "ku_1_3_14",
              "verse_number": "1.3.14",
              "citation": "Katha Upanishad 1.3.14",
              "meter": "Triṣṭubh",
              "sanskrit": "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत ।\nक्षुरस्य धारा निशिता दुरत्यया\nदुर्गं पथस्तत्कवयो वदन्ति ॥",
              "transliteration": "uttiṣṭhata jāgrata prāpya varān nibodhata |\nkṣurasya dhārā niśitā duratyayā\ndurgaṁ pathas tat kavayo vadanti ||",
              "word_meanings": [
                {
                  "sanskrit": "उत्तिष्ठत जाग्रत",
                  "iast": "uttiṣṭhata jāgrata",
                  "meaning": "arise! Awake!"
                },
                {
                  "sanskrit": "प्राप्य वरान् निबोधत",
                  "iast": "prāpya varān nibodhata",
                  "meaning": "approaching the wise masters, realize the Truth"
                },
                {
                  "sanskrit": "क्षुरस्य धारा निशिता दुरत्यया",
                  "iast": "kṣurasya dhārā niśitā duratyayā",
                  "meaning": "sharp as the razor's edge, hard to traverse"
                }
              ],
              "english": "Arise! Awake! Approach the great enlightened masters and realize the supreme Self! Sharp as the edge of a razor and difficult to cross is that impassable path, declare the wise seers.",
              "hindi": "उठो! जागो! और श्रेष्ठ महापुरुषों के समीप जाकर उस आत्मतत्त्व को जानो। छुरे की तीक्ष्ण धार के समान वह मार्ग अत्यन्त दुर्गम और कठिन है—ऐसा तत्त्वदर्शी विद्वान कहते हैं।",
              "commentary": "The iconic clarion call immortalized by Swami Vivekananda: 'Arise, awake, and stop not till the goal is reached!'",
              "audio": ""
            }
          ]
        },
        {
          "id": "ku_valli_4",
          "chapter_number": 4,
          "title": "Valli 4: The Inward Turn & Non-Duality",
          "sanskrit_title": "चतुर्थी वल्ली (अन्तर्दृष्टिः एवं अद्वैतम्)",
          "transliteration": "Caturthī Vallī",
          "summary": "Yama explains why human beings remain blind to the Self: nature created senses with outward openings. A rare heroic seeker turns the gaze inward to perceive the immortal Soul. He reveals that what is here in this body is there in the cosmos.",
          "verses": [
            {
              "id": "ku_2_1_1",
              "verse_number": "2.1.1",
              "citation": "Katha Upanishad 2.1.1",
              "meter": "Triṣṭubh",
              "sanskrit": "पराञ्चि खानि व्यतृणत्स्वयम्भू-\nस्तस्मात्पराङ्पश्यति नान्तरात्मन् ।\nकश्चिद्धीरः प्रत्यगात्मानमैक्ष-\nदावृत्तचक्षुरमृतत्वमिच्छन् ॥",
              "transliteration": "parāñci khāni vyatṛṇat svayambhūs\ntasmāt parāṅ paśyati nāntar-ātman |\nkaścid dhīraḥ pratyag-ātmānam aikṣad\nāvṛtta-cakṣur amṛtatvam icchan ||",
              "word_meanings": [
                {
                  "sanskrit": "पराञ्चि खानि व्यतृणत् स्वयम्भूः",
                  "iast": "parāñci khāni vyatṛṇat svayambhūḥ",
                  "meaning": "the Creator pierced the senses with outward openings"
                },
                {
                  "sanskrit": "तस्मात् पराङ् पश्यति",
                  "iast": "tasmāt parāṅ paśyati",
                  "meaning": "therefore one gazes outward"
                },
                {
                  "sanskrit": "कश्चित् धीरः प्रत्यगात्मानम् ऐक्षत्",
                  "iast": "kaścid dhīraḥ pratyag-ātmānam aikṣat",
                  "meaning": "some rare courageous seeker beheld the indwelling Self"
                },
                {
                  "sanskrit": "आवृत-चक्षुः अमृतत्वम् इच्छन्",
                  "iast": "āvṛtta-cakṣur amṛtatvam icchan",
                  "meaning": "turning the gaze inward, desiring immortality"
                }
              ],
              "english": "The Self-Existent Lord created the senses with outward openings; therefore, human beings gaze outward toward external objects, not inward at the indwelling Self. But some rare courageous seeker, desiring immortality, turned the gaze inward and directly beheld the inner Self (Pratyagatman).",
              "hindi": "स्वयम्भू परमात्मा ने इन्द्रियों के मुख बाहर की ओर बनाए हैं, इसलिए मनुष्य बाहर की ओर देखता है, अपने भीतर स्थित अन्तरात्मा को नहीं देखता। किन्तु अमरत्व की इच्छा रखने वाले किसी धीर पुरुष ने अपनी दृष्टि को भीतर की ओर मोड़कर अन्तरात्मा का साक्षात्कार किया।",
              "commentary": "Pratyahara: turning the lens of consciousness 180 degrees inward toward the source of perception.",
              "audio": ""
            },
            {
              "id": "ku_2_1_10",
              "verse_number": "2.1.10",
              "citation": "Katha Upanishad 2.1.10",
              "meter": "Anuṣṭubh",
              "sanskrit": "यदेवेह तदमुत्र यदमुत्र तदन्विह ।\nमृत्योः स मृत्युमाप्नोति य इह नानेव पश्यति ॥",
              "transliteration": "yad eveha tad amutra yad amutra tad anv iha |\nmṛtyoḥ sa mṛtyum āpnoti ya iha nāneva paśyati ||",
              "word_meanings": [
                {
                  "sanskrit": "यत् एव इह तत् अमुत्र",
                  "iast": "yad eveha tad amutra",
                  "meaning": "what is here in this body, that is there in the cosmos"
                },
                {
                  "sanskrit": "मृत्योः सः मृत्युम् आप्नोति",
                  "iast": "mṛtyoḥ sa mṛtyum āpnoti",
                  "meaning": "from death to death he goes"
                },
                {
                  "sanskrit": "यः इह नाना इव पश्यति",
                  "iast": "ya iha nāneva paśyati",
                  "meaning": "who perceives manifold difference here"
                }
              ],
              "english": "Whatever is here in this manifest body, that very same is there in the cosmic expanse; whatever is there in the cosmos, that is here in the body. He who sees manifold difference here without realizing the underlying unity goes from death to death.",
              "hindi": "जो यहाँ (इस शरीर में) है, वही वहाँ (ब्रह्माण्ड में) है; और जो वहाँ है, वही यहाँ है। जो मनुष्य इस तत्त्व में भिन्नता देखता है, वह मृत्यु से मृत्यु को (बार-बार जन्म-मरण के चक्र को) प्राप्त होता है।",
              "commentary": "Microcosm equals macrocosm (Pinda-Brahmanda non-duality).",
              "audio": ""
            }
          ]
        },
        {
          "id": "ku_valli_5",
          "chapter_number": 5,
          "title": "Valli 5: The City of Eleven Gates & The Supreme Light",
          "sanskrit_title": "पञ्चमी वल्ली (एकादशद्वारं पुरम् एवं परं ज्योतिः)",
          "transliteration": "Pañcamī Vallī",
          "summary": "The human body is an eleven-gated city ruled by the unborn Consciousness. Just as one fire permeates the world and assumes varied shapes according to the fuel, so the one indwelling Self assumes varied forms yet remains unattached. There the sun shines not, yet all shines by Its light.",
          "verses": [
            {
              "id": "ku_2_2_9",
              "verse_number": "2.2.9",
              "citation": "Katha Upanishad 2.2.9",
              "meter": "Triṣṭubh",
              "sanskrit": "अग्निर्यथैको भुवनं प्रविष्टो\nरूपं रूपं प्रतिरूपो बभूव ।\nएकस्तथा सर्वभूतान्तरात्मा\nरूपं रूपं प्रतिरूपो बहिश्च ॥",
              "transliteration": "agnir yathaiko bhuvanaṁ praviṣṭo\nrūpaṁ rūpaṁ pratirūpo babhūva |\nekas tathā sarva-bhūtāntar-ātmā\nrūpaṁ rūpaṁ pratirūpo bahiś ca ||",
              "word_meanings": [
                {
                  "sanskrit": "अग्निः यथा एकः भुवनम् प्रविष्टः",
                  "iast": "agnir yathaiko bhuvanaṁ praviṣṭo",
                  "meaning": "just as one fire having entered the world"
                },
                {
                  "sanskrit": "रूपम् रूपम् प्रतिरूपः बभूव",
                  "iast": "rūpaṁ rūpaṁ pratirūpo babhūva",
                  "meaning": "assumes varied forms in each object"
                },
                {
                  "sanskrit": "एकः तथा सर्व-भूत-अन्तरात्मा",
                  "iast": "ekas tathā sarva-bhūtāntar-ātmā",
                  "meaning": "so the one Indwelling Self of all beings"
                }
              ],
              "english": "Just as the one non-dual fire, having entered the world, assumes various forms according to whatever it burns, so the one indwelling Self of all beings assumes varied forms in every creature, yet remains transcendent outside them all.",
              "hindi": "जैसे एक ही अग्नि संसार में प्रविष्ट होकर भिन्न-भिन्न काष्ठ आदि के अनुसार अनेक रूपों वाली प्रतीत होती है, वैसे ही सम्पूर्ण प्राणियों का एक ही अन्तरात्मा प्रत्येक शरीर में भिन्न-भिन्न रूप में स्थित है और उनसे बाहर भी विद्यमान है।",
              "commentary": "Immanence and transcendence: manifesting as every living soul while untainted by bodily limits.",
              "audio": ""
            },
            {
              "id": "ku_2_2_15",
              "verse_number": "2.2.15",
              "citation": "Katha Upanishad 2.2.15",
              "meter": "Triṣṭubh",
              "sanskrit": "न तत्र सूर्यो भाति न चन्द्रतारकं\nनेमा विद्युतो भान्ति कुतोऽयमग्निः ।\nतमेव भान्तमनुभाति सर्वं\nतस्य भासा सर्वमिदं विभाति ॥",
              "transliteration": "na tatra sūryo bhāti na candra-tārakaṁ\nnemā vidyuto bhānti kuto 'yam agniḥ |\ntam eva bhāntam anubhāti sarvaṁ\ntasya bhāsā sarvam idaṁ vibhāti ||",
              "word_meanings": [
                {
                  "sanskrit": "न तत्र सूर्यः भाति",
                  "iast": "na tatra sūryo bhāti",
                  "meaning": "there the sun does not shine"
                },
                {
                  "sanskrit": "न चन्द्र-तारकम्",
                  "iast": "na candra-tārakam",
                  "meaning": "nor the moon and stars"
                },
                {
                  "sanskrit": "तम् एव भान्तम् अनुभाति सर्वम्",
                  "iast": "tam eva bhāntam anubhāti sarvam",
                  "meaning": "after It alone as It shines does everything shine"
                },
                {
                  "sanskrit": "तस्य भासा सर्वम् इदम् विभाति",
                  "iast": "tasya bhāsā sarvam idaṁ vibhāti",
                  "meaning": "by Its light alone is all this illuminated"
                }
              ],
              "english": "There the sun shines not, nor the moon and the stars, nor these lightnings flash; how then could this earthly fire? Everything shines only after That Self as It shines; by Its light alone is this entire universe illuminated.",
              "hindi": "वहाँ न सूर्य प्रकाशित होता है, न चन्द्रमा और तारे, न ये बिजलियाँ ही चमकती हैं; फिर इस पार्थिव अग्नि की तो बात ही क्या? उस स्वयंप्रकाश परमात्मा के प्रकाशित होने पर ही यह सब प्रकाशित होता है; उसी के प्रकाश से यह सम्पूर्ण संसार आलोकित है।",
              "commentary": "Consciousness is the self-luminous ground enabling all sensory and mental cognition.",
              "audio": ""
            }
          ]
        },
        {
          "id": "ku_valli_6",
          "chapter_number": 6,
          "title": "Valli 6: The Eternal Ashvattha Tree & Immortality",
          "sanskrit_title": "षष्ठी वल्ली (ऊर्ध्वमूलः अश्वत्थः एवं कैवल्यम्)",
          "transliteration": "Ṣaṣṭhī Vallī",
          "summary": "The cosmos is depicted as an eternal cosmic tree with roots above in Brahman and branches below. When all desires clinging to the heart fall away, the mortal becomes immortal. Nachiketa, having received this wisdom from Yama, attains liberation.",
          "verses": [
            {
              "id": "ku_2_3_1",
              "verse_number": "2.3.1",
              "citation": "Katha Upanishad 2.3.1",
              "meter": "Triṣṭubh",
              "sanskrit": "ऊर्ध्वमूलोऽवाक्शाख एषोऽश्वत्थः सनातनः ।\nतदेव शुक्रं तद्ब्रह्म तदेवामृतमुच्यते ।\nतस्मिंल्लोकाः श्रिताः सर्वे तदु नात्येति कश्चन । एतद्वै तत् ॥",
              "transliteration": "ūrdhva-mūlo 'vāk-śākha eṣo 'śvatthaḥ sanātanaḥ |\ntad eva śukraṁ tad brahma tad evāmṛtam ucyate |\ntasmiḻ lokāḥ śritāḥ sarve tad u nātyeti kaścana | etad vai tat ||",
              "word_meanings": [
                {
                  "sanskrit": "ऊर्ध्व-मूलः अवाक्-शाखः",
                  "iast": "ūrdhva-mūlo 'vāk-śākhaḥ",
                  "meaning": "roots above, branches downward"
                },
                {
                  "sanskrit": "एषः अश्वत्थः सनातनः",
                  "iast": "eṣo 'śvatthaḥ sanātanaḥ",
                  "meaning": "this ancient eternal Ashvattha tree"
                },
                {
                  "sanskrit": "तत् एव शुक्रम् तत् ब्रह्म",
                  "iast": "tad eva śukraṁ tad brahma",
                  "meaning": "that root alone is pure, that is Brahman"
                }
              ],
              "english": "This is that ancient, eternal Ashvattha tree whose roots are above in the Supreme and whose branches spread below. That root alone is pure; that is Brahman; that alone is called Immortal. Upon It all worlds rest. This verily is That!",
              "hindi": "यह सनातन अश्वत्थ (पीपल का) वृक्ष है, जिसकी जड़ें ऊपर (परमात्मा में) हैं और शाखाएँ नीचे फैली हुई हैं। वही मूल विशुद्ध है, वही ब्रह्म है और उसी को अमृत कहा जाता है।",
              "commentary": "The cosmic tree rooted in transcendent Consciousness (elaborated in Gita 15.1).",
              "audio": ""
            },
            {
              "id": "ku_2_3_14",
              "verse_number": "2.3.14",
              "citation": "Katha Upanishad 2.3.14",
              "meter": "Anuṣṭubh",
              "sanskrit": "यदा सर्वे प्रमुच्यन्ते कामा येऽस्य हृदि श्रिताः ।\nअथ मर्त्योऽमृतो भवत्यत्र ब्रह्म समश्नुते ॥",
              "transliteration": "yadā sarve pramucyante kāmā ye 'sya hṛdi śritāḥ |\natha martyo 'mṛto bhavaty atra brahma samaśnute ||",
              "word_meanings": [
                {
                  "sanskrit": "यदा सर्वे प्रमुच्यन्ते कामाः",
                  "iast": "yadā sarve pramucyante kāmāḥ",
                  "meaning": "when all the desires fall away"
                },
                {
                  "sanskrit": "ये अस्य हृदि श्रिताः",
                  "iast": "ye 'sya hṛdi śritāḥ",
                  "meaning": "that cling to the human heart"
                },
                {
                  "sanskrit": "अथ मर्त्यः अमृतः भवति",
                  "iast": "atha martyo 'mṛto bhavati",
                  "meaning": "then the mortal becomes immortal"
                },
                {
                  "sanskrit": "अत्र ब्रह्म समश्नुते",
                  "iast": "atra brahma samaśnute",
                  "meaning": "here in this very life one attains Brahman"
                }
              ],
              "english": "When all the desires that cling to the human heart are completely cast away, then does the mortal become immortal, and attains Brahman here in this very life!",
              "hindi": "जिस समय मनुष्य के हृदय में स्थित सम्पूर्ण कामनाएँ छूट जाती हैं, तब मरणधर्मा मनुष्य अमर हो जाता है और इसी जीवन में ब्रह्म का साक्षात्कार कर लेता है।",
              "commentary": "Jivanmukti: immortality realized in this very physical life through desireless purity.",
              "audio": ""
            }
          ]
        }
      ]
    },
    {
      "id": "mundaka_upanishad",
      "category_id": "vedas_upanishads",
      "category": "Vedas & Upanishads",
      "title": "Mundaka Upanishad",
      "sanskrit_title": "मुण्डकोपनिषद्",
      "transliteration": "Muṇḍakopaniṣad",
      "author": "Atharvaveda Tradition (Shaunaka Shakha)",
      "tradition": "Mukhya Upanishad (Shruti)",
      "era": "c. 800–500 BCE",
      "description": "The poetic and luminous Upanishad of the Atharvaveda, distinguishing Para (higher) and Apara (lower) knowledge, unveiling the bow of OM shooting the arrow of Atman into Brahman, giving India her national motto 'Satyameva Jayate', and portraying the allegory of the Two Birds.",
      "epigraph": "सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः ।\nयेनाक्रमन्त्यृषयो ह्याप्तकामा यत्र तत् सत्यस्य परमं निधानम् ॥",
      "epigraph_translation": "Truth alone triumphs, not untruth. By Truth is paved the divine path along which the sages, with desires fulfilled, ascend to where lies that supreme treasure of Truth.",
      "chapters": [
        {
          "id": "mu_mundaka_1",
          "chapter_number": 1,
          "title": "Mundaka 1: Higher & Lower Knowledge",
          "sanskrit_title": "प्रथमं मुण्डकम् (परा-अपरा-विद्या)",
          "transliteration": "Prathamaṁ Muṇḍakam",
          "summary": "Angiras instructs Shaunaka on the two kinds of knowledge: Apara Vidya (empirical sciences, grammar, ritual texts) and Para Vidya (that by which the Imperishable Brahman is directly known). Creation streams forth from Brahman like a web from a spider or sparks from a blazing fire.",
          "verses": [
            {
              "id": "mu_1_shanti",
              "verse_number": "Invocation",
              "citation": "Atharvaveda Shanti Mantra",
              "meter": "Triṣṭubh",
              "sanskrit": "ॐ भद्रं कर्णेभिः शृणुयाम देवाः ।\nभद्रं पश्येमाक्षभिर्यजत्राः ।\nस्थिरैरङ्गैस्तुष्टुवांसस्तनूभिः ।\nव्यशेम देवहितं यदायूः ॥\nॐ शान्तिः शान्तिः शान्तिः ॥",
              "transliteration": "oṁ bhadraṁ karṇebhiḥ śṛṇuyāma devāḥ |\nbhadraṁ paśyemākṣabhir yajatrāḥ |\nsthirair aṅgais tuṣṭuvāṁsas tanūbhiḥ |\nvyaśema deva-hitaṁ yad āyuḥ ||\noṁ śāntiḥ śāntiḥ śāntiḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "भद्रम् कर्णेभिः शृणुयाम",
                  "iast": "bhadraṁ karṇebhiḥ śṛṇuyāma",
                  "meaning": "may we hear with our ears what is auspicious"
                },
                {
                  "sanskrit": "भद्रम् पश्येम अक्षभिः",
                  "iast": "bhadraṁ paśyemākṣabhiḥ",
                  "meaning": "may we see with our eyes what is noble"
                },
                {
                  "sanskrit": "व्यशेम देव-हितम् आयुः",
                  "iast": "vyaśema deva-hitaṁ yad āyuḥ",
                  "meaning": "may we enjoy the life ordained by the Divine"
                }
              ],
              "english": "OM. O Divine Powers, may we hear with our ears what is noble and auspicious. May we see with our eyes what is pure and uplifting. With firm and healthy limbs, may we enjoy the full span of life dedicated to the Divine. OM Peace, Peace, Peace.",
              "hindi": "ॐ! हे देवगण! हम कानों से कल्याणकारी वचन सुनें। हम नेत्रों से शुभ और पवित्र दृश्य देखें। स्वस्थ अंगों और शरीर से युक्त होकर हम ईश्वर द्वारा निर्धारित आयु पर्यन्त आपका गुणगान करते हुए जीवन व्यतीत करें। ॐ शान्तिः शान्तिः शान्तिः।",
              "commentary": "The foundational Atharvaveda peace invocation sanctifying sensory perception.",
              "audio": ""
            },
            {
              "id": "mu_1_1_4",
              "verse_number": "1.1.4",
              "citation": "Mundaka Upanishad 1.1.4",
              "meter": "Anuṣṭubh",
              "sanskrit": "द्वे विद्ये वेदितव्ये इति ह स्म यद्ब्रह्मविदो वदन्ति परा चैवापरा च ॥",
              "transliteration": "dve vidye veditavye iti ha sma yad brahma-vido vadanti parā caivāparā ca ||",
              "word_meanings": [
                {
                  "sanskrit": "द्वे विद्ये वेदितव्ये",
                  "iast": "dve vidye veditavye",
                  "meaning": "two kinds of knowledge are to be known"
                },
                {
                  "sanskrit": "इति ब्रह्म-विदः वदन्ति",
                  "iast": "iti brahma-vido vadanti",
                  "meaning": "thus say the knowers of Brahman"
                },
                {
                  "sanskrit": "परा च एव अपरा च",
                  "iast": "parā caivāparā ca",
                  "meaning": "the higher (Para) and the lower (Apara)"
                }
              ],
              "english": "Two kinds of knowledge are to be acquired, say the knowers of Brahman: the higher (Para Vidya) and the lower (Apara Vidya).",
              "hindi": "ब्रह्मवेत्ताओं का कहना है कि जानने योग्य दो प्रकार की विद्याएँ हैं—एक परा विद्या और दूसरी अपरा विद्या।",
              "commentary": "Radical epistemological classification distinguishing spiritual intuition from intellectual academia.",
              "audio": ""
            },
            {
              "id": "mu_1_1_7",
              "verse_number": "1.1.7",
              "citation": "Mundaka Upanishad 1.1.7",
              "meter": "Anuṣṭubh",
              "sanskrit": "यथोर्णनाभिः सृजते गृह्णते च\nयथा पृथिव्यामोषधयः सम्भवन्ति ।\nयथा सतः पुरुषात्केशलोमानि\nतथाऽक्षरात्सम्भवतीह विश्वम् ॥",
              "transliteration": "yathorṇanābhiḥ sṛjate gṛhṇate ca\nyathā pṛthivyām oṣadhayaḥ sambhavanti |\nyathā sataḥ puruṣāt keśa-lomāni\ntathākṣarāt sambhavatīha viśvam ||",
              "word_meanings": [
                {
                  "sanskrit": "यथा ऊर्णनाभिः सृजते गृह्णते च",
                  "iast": "yathorṇanābhiḥ sṛjate gṛhṇate ca",
                  "meaning": "as a spider spins its web and draws it back"
                },
                {
                  "sanskrit": "तथा अक्षरात् सम्भवति इह विश्वम्",
                  "iast": "tathākṣarāt sambhavatīha viśvam",
                  "meaning": "so from the Imperishable emerges this universe"
                }
              ],
              "english": "As a spider spins its web out of itself and absorbs it back, as plants naturally grow from the earth, as hairs grow from a living person, so from the Imperishable Brahman springs forth this entire universe.",
              "hindi": "जैसे मकड़ी अपने भीतर से जाले को उत्पन्न करती है और फिर उसे अपने में ही समेट लेती है, जैसे पृथ्वी से वनस्पतियाँ उगती हैं—वैसे ही उस अविनाशी ब्रह्म से इस सम्पूर्ण विश्व की सृष्टि होती है।",
              "commentary": "Brahman manifests the universe out of Its own consciousness without external material.",
              "audio": ""
            }
          ]
        },
        {
          "id": "mu_mundaka_2",
          "chapter_number": 2,
          "title": "Mundaka 2: The Bow of OM & The Knot of the Heart",
          "sanskrit_title": "द्वितीयं मुण्डकम् (प्रणव-धनुः एवं हृदयग्रन्थि-भेदः)",
          "transliteration": "Dvitīyaṁ Muṇḍakam",
          "summary": "The sacred method of meditation: taking the mighty bow of the Upanishad, fixing the arrow of the Self sharpened by devotion, and shooting with the mind fixed on Brahman. When Brahman is realized, the knot of the heart is severed and all doubts dissolve.",
          "verses": [
            {
              "id": "mu_2_2_4",
              "verse_number": "2.2.4",
              "citation": "Mundaka Upanishad 2.2.4",
              "meter": "Anuṣṭubh",
              "sanskrit": "प्रणवो धनुः शरो ह्यात्मा ब्रह्म तल्लक्ष्यमुच्यते ।\nअप्रमत्तेन वेद्धव्यं शरवत्तन्मयो भवेत् ॥",
              "transliteration": "praṇavo dhanuḥ śaro hy ātmā brahma tal lakṣyam ucyate |\napramattena veddhavyaṁ śaravat tan-mayo bhavet ||",
              "word_meanings": [
                {
                  "sanskrit": "प्रणवः धनुः",
                  "iast": "praṇavo dhanuḥ",
                  "meaning": "the sacred syllable OM is the bow"
                },
                {
                  "sanskrit": "शरः हि आत्मा",
                  "iast": "śaro hy ātmā",
                  "meaning": "the individual Self is the arrow"
                },
                {
                  "sanskrit": "ब्रह्म तत् लक्ष्यम् उच्यते",
                  "iast": "brahma tal lakṣyam ucyate",
                  "meaning": "Brahman is the target"
                },
                {
                  "sanskrit": "शरवत् तन्मयः भवेत्",
                  "iast": "śaravat tan-mayo bhavet",
                  "meaning": "like the arrow becoming one with the target, one should merge in It"
                }
              ],
              "english": "The sacred syllable OM is the bow; the individual Self is the arrow; Brahman is the target. With an undistracted mind, It must be hit; and like the arrow penetrating the target, one should become completely unified with Brahman.",
              "hindi": "प्रणव (ॐ) धनुष है, आत्मा बाण है और ब्रह्म उसका लक्ष्य है। प्रमादरहित होकर उस लक्ष्य को बींधना चाहिए और बाण की तरह ब्रह्म में तन्मय (एकाकार) हो जाना चाहिए।",
              "commentary": "The supreme archery metaphor of meditation: shooting consciousness straight into non-dual absorption.",
              "audio": ""
            },
            {
              "id": "mu_2_2_8",
              "verse_number": "2.2.8",
              "citation": "Mundaka Upanishad 2.2.8",
              "meter": "Anuṣṭubh",
              "sanskrit": "भिद्यते हृदयग्रन्थिश्छिद्यन्ते सर्वसंशयाः ।\nक्षीयन्ते चास्य कर्माणि तस्मिन्दृष्टे परावरे ॥",
              "transliteration": "bhidyate hṛdaya-granthiś chidyante sarva-saṁśayāḥ |\nkṣīyante cāsya karmāṇi tasmin dṛṣṭe parāvare ||",
              "word_meanings": [
                {
                  "sanskrit": "भिद्यते हृदय-ग्रन्थिः",
                  "iast": "bhidyate hṛdaya-granthiḥ",
                  "meaning": "the knot of the heart is severed"
                },
                {
                  "sanskrit": "छिद्यन्ते सर्व-संशयाः",
                  "iast": "chidyante sarva-saṁśayāḥ",
                  "meaning": "all doubts are rent asunder"
                },
                {
                  "sanskrit": "क्षीयन्ते च अस्य कर्माणि",
                  "iast": "kṣīyante cāsya karmāṇi",
                  "meaning": "all karmic bindings dissolve"
                }
              ],
              "english": "The knot of the heart is completely severed, all doubts are rent asunder, and all bindings of karma dissolve away, when That Supreme Reality—at once transcendent and immanent—is directly realized.",
              "hindi": "उस परब्रह्म का साक्षात्कार हो जाने पर हृदय की अविद्या रूपी गाँठ कट जाती है, सम्पूर्ण संशय छिन्न-भिन्न हो जाते हैं और मनुष्य के सम्पूर्ण संचित कर्म क्षीण हो जाते हैं।",
              "commentary": "The threefold fruit of Self-realization: ego dissolution, doubt destruction, and karmic liberation.",
              "audio": ""
            }
          ]
        },
        {
          "id": "mu_mundaka_3",
          "chapter_number": 3,
          "title": "Mundaka 3: The Two Birds, Satyameva Jayate & Ultimate Oneness",
          "sanskrit_title": "तृतीयं मुण्डकम् (द्वा सुपर्णा, सत्यमेव जयते एवं ब्रह्मीभावः)",
          "transliteration": "Tṛtīyaṁ Muṇḍakam",
          "summary": "The allegory of the Two Birds on the same tree (the individual Jiva eating sweet and bitter fruits, and the silent witnessing Ishvara). The historic declaration 'Satyameva Jayate Nanritam'. How rivers shed their names and forms to merge into the ocean, so the illumined sage merges into Brahman.",
          "verses": [
            {
              "id": "mu_3_1_1",
              "verse_number": "3.1.1",
              "citation": "Mundaka Upanishad 3.1.1",
              "meter": "Triṣṭubh",
              "sanskrit": "द्वा सुपर्णा सयुजा सखाया\nसमानं वृक्षं परिषस्वजाते ।\nतयोरन्यः पिप्पलं स्वाद्वत्त्य-\nनश्नन्नन्यो अभिचाकशीति ॥",
              "transliteration": "dvā suparṇā sayujā sakhāyā\nsamānaṁ vṛkṣaṁ pariṣasvajāte |\ntayor anyaḥ pippalaṁ svādv atty\nanaśnann anyo abhicākaśīti ||",
              "word_meanings": [
                {
                  "sanskrit": "द्वा सुपर्णा सयुजा सखाया",
                  "iast": "dvā suparṇā sayujā sakhāyā",
                  "meaning": "two birds of beautiful plumage, companions"
                },
                {
                  "sanskrit": "समानम् वृक्षम् परिषस्वजाते",
                  "iast": "samānaṁ vṛkṣaṁ pariṣasvajāte",
                  "meaning": "dwell upon the selfsame tree"
                },
                {
                  "sanskrit": "तयोः अन्यः पिप्पलम् स्वादु अत्ति",
                  "iast": "tayor anyaḥ pippalaṁ svādv atti",
                  "meaning": "one eats the sweet fruits of action"
                },
                {
                  "sanskrit": "अनश्नन् अन्यः अभिचाकशीति",
                  "iast": "anaśnann anyo abhicākaśīti",
                  "meaning": "the other, without eating, looks on as a radiant witness"
                }
              ],
              "english": "Two birds of golden plumage, inseparable companions, cling to the selfsame tree. Of these two, one eats the sweet and bitter fruits of karma, while the other looks on silently as a radiant witness without eating.",
              "hindi": "सदा साथ रहने वाले दो सखा सुन्दर पक्षी एक ही वृक्ष पर बैठे हैं। उनमें से एक पक्षी (जीवात्मा) फल खाता है और दूसरा (परमात्मा) बिना खाए केवल साक्षी रूप में देखता रहता है।",
              "commentary": "The allegory of Jiva (the experiencing ego) and Sakshi (the unaffected witnessing consciousness).",
              "audio": ""
            },
            {
              "id": "mu_3_1_6",
              "verse_number": "3.1.6",
              "citation": "Mundaka Upanishad 3.1.6",
              "meter": "Triṣṭubh",
              "sanskrit": "सत्यमेव जयते नानृतं\nसत्येन पन्था विततो देवयानः ।\nयेनाक्रमन्त्यृषयो ह्याप्तकामा\nयत्र तत् सत्यस्य परमं निधानम् ॥",
              "transliteration": "satyam eva jayate nānṛtaṁ\nsatyena panthā vitato deva-yānaḥ |\nyenākramanty ṛṣayo hy āpta-kāmā\nyatra tat satyasya paramaṁ nidhānam ||",
              "word_meanings": [
                {
                  "sanskrit": "सत्यम् एव जयते",
                  "iast": "satyam eva jayate",
                  "meaning": "Truth alone triumphs"
                },
                {
                  "sanskrit": "न अनृतम्",
                  "iast": "nānṛtam",
                  "meaning": "never untruth"
                },
                {
                  "sanskrit": "सत्येन पन्थाः विततः देव-यानः",
                  "iast": "satyena panthā vitato deva-yānaḥ",
                  "meaning": "by Truth is paved the divine path of the sages"
                }
              ],
              "english": "Truth alone triumphs, not untruth! By Truth is paved the divine path (Devayana) along which the ancient sages, free from selfish craving, ascend to that supreme abode where lies the ultimate treasure of Truth.",
              "hindi": "सत्य की ही विजय होती है, असत्य की नहीं। सत्य से ही देवयान का मार्ग प्रशस्त होता है, जिस मार्ग से होकर आप्तकाम ऋषिगण उस परम पद पर पहुँचते हैं, जहाँ सत्य का परम भण्डार विद्यमान है।",
              "commentary": "The National Motto of India: 'Satyameva Jayate'—Truth is the fundamental metaphysical order of reality.",
              "audio": ""
            },
            {
              "id": "mu_3_2_9",
              "verse_number": "3.2.9",
              "citation": "Mundaka Upanishad 3.2.9",
              "meter": "Triṣṭubh",
              "sanskrit": "स यो ह वै तत्परमं ब्रह्म वेद\nब्रह्मैव भवति नास्याब्रह्मवित्कुले भवति ।\nतरति शोकं तरति पाप्मानं\nगुहाग्रन्थिभ्यो विमुक्तोऽमृतो भवति ॥",
              "transliteration": "sa yo ha vai tat paramaṁ brahma veda\nbrahmaiva bhavati nāsyābrahmavit kule bhavati |\ntarati śokaṁ tarati pāpmānaṁ\nguhā-granthibhyo vimukto 'mṛto bhavati ||",
              "word_meanings": [
                {
                  "sanskrit": "सः यः ह वै तत् परम् ब्रह्म वेद",
                  "iast": "sa yo ha vai tat paramaṁ brahma veda",
                  "meaning": "he who verily knows that Supreme Brahman"
                },
                {
                  "sanskrit": "ब्रह्म एव भवति",
                  "iast": "brahmaiva bhavati",
                  "meaning": "becomes Brahman Itself!"
                },
                {
                  "sanskrit": "तरति शोकम् तरति पाप्मानम्",
                  "iast": "tarati śokaṁ tarati pāpmānam",
                  "meaning": "crosses beyond grief, crosses beyond sin"
                }
              ],
              "english": "He who verily knows that Supreme Brahman becomes Brahman Itself! He crosses beyond grief, crosses beyond sin, and freed from the knots of the heart, becomes immortal.",
              "hindi": "जो कोई उस परब्रह्म को जान लेता है, वह स्वयं ब्रह्म ही हो जाता है। वह शोक को पार कर जाता है, पापों से छूट जाता है और हृदय की गाँठों से मुक्त होकर अमर हो जाता है।",
              "commentary": "'Brahmavit Brahmaiva Bhavati'—the knower of Brahman becomes Brahman Itself.",
              "audio": ""
            }
          ]
        }
      ]
    },
    {
      "id": "isha_upanishad",
      "category_id": "vedas_upanishads",
      "category": "Vedas & Upanishads",
      "title": "Isha Upanishad",
      "sanskrit_title": "ईशावास्योपनिषद्",
      "transliteration": "Īśāvāsyopaniṣad",
      "author": "Shukla Yajurveda Tradition (Kanva / Madhyandina Shakha)",
      "tradition": "Mukhya Upanishad (Shruti)",
      "era": "c. 800–500 BCE",
      "description": "The foundational 40th chapter of the Shukla Yajurveda Samhita, synthesizing absolute non-dual consciousness with dynamic life in the world through the mantra of spiritual renunciation and divine fullness.",
      "epigraph": "ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते ।\nपूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥",
      "epigraph_translation": "That Absolute is Full; this manifest universe is Full. From Fullness emerges Fullness. Taking Fullness from Fullness, Fullness alone remains.",
      "chapters": [
        {
          "id": "iu_complete",
          "chapter_number": 1,
          "title": "Isha Upanishad Complete Verses (1 to 18)",
          "sanskrit_title": "ईशावास्योपनिषद् सम्पूर्णमन्त्राः",
          "transliteration": "Īśāvāsyopaniṣad Sampūrṇa-Mantrāḥ",
          "summary": "The complete 18 mantras of the Isha Upanishad, opening with the pervasive vision of the Divine in all things, reconciling contemplation (Vidya) and dynamic action (Avidya), and closing with the prayer to the solar light and fire of consciousness.",
          "verses": [
            {
              "id": "iu_shanti",
              "verse_number": "Invocation",
              "citation": "Isha Upanishad Shanti Mantra",
              "meter": "Anuṣṭubh",
              "sanskrit": "ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते ।\nपूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥\nॐ शान्तिः शान्तिः शान्तिः ॥",
              "transliteration": "oṁ pūrṇam adaḥ pūrṇam idaṁ pūrṇāt pūrṇam udacyate |\npūrṇasya pūrṇam ādāya pūrṇam evāvaśiṣyate ||\noṁ śāntiḥ śāntiḥ śāntiḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "पूर्णम् अदः",
                  "iast": "pūrṇam adaḥ",
                  "meaning": "That Unmanifest Absolute is complete and infinite"
                },
                {
                  "sanskrit": "पूर्णम् इदम्",
                  "iast": "pūrṇam idam",
                  "meaning": "this manifest cosmos is complete and infinite"
                },
                {
                  "sanskrit": "पूर्णात् पूर्णम् उदच्यते",
                  "iast": "pūrṇāt pūrṇam udacyate",
                  "meaning": "from the Infinite emerges the Infinite"
                },
                {
                  "sanskrit": "पूर्णस्य पूर्णम् आदाय",
                  "iast": "pūrṇasya pūrṇam ādāya",
                  "meaning": "taking away the Infinite from the Infinite"
                },
                {
                  "sanskrit": "पूर्णम् एव अवशिष्यते",
                  "iast": "pūrṇam eva avaśiṣyate",
                  "meaning": "the Infinite alone remains"
                }
              ],
              "english": "OM. That (Unmanifest Absolute) is Full; this (manifest cosmos) is Full. From Fullness emerges Fullness. When Fullness is subtracted from Fullness, Fullness alone remains. OM Peace, Peace, Peace.",
              "hindi": "ॐ वह (परब्रह्म) पूर्ण है और यह (जगत) भी पूर्ण है। उस पूर्ण से ही यह पूर्ण प्रकट होता है। पूर्ण में से पूर्ण को निकाल लेने पर भी पूर्ण ही शेष रहता है। ॐ शान्तिः शान्तिः शान्तिः।",
              "commentary": "The foundational mathematical and metaphysical paradox of Advaita Vedanta: Infinity minus Infinity equals Infinity.",
              "audio": ""
            },
            {
              "id": "iu_m01",
              "verse_number": "Mantra 1",
              "citation": "Isha Upanishad 1",
              "meter": "Anuṣṭubh",
              "sanskrit": "ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् ।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥",
              "transliteration": "īśā vāsyam idaṁ sarvaṁ yat kiñca jagatyāṁ jagat |\ntena tyaktena bhuñjīthā mā gṛdhaḥ kasya svid dhanam ||",
              "word_meanings": [
                {
                  "sanskrit": "ईशा वास्यम् इदम् सर्वम्",
                  "iast": "īśā vāsyam idam sarvam",
                  "meaning": "all this is enveloped by the Supreme Lord"
                },
                {
                  "sanskrit": "यत् किञ्च जगत्याम् जगत्",
                  "iast": "yat kiñca jagatyām jagat",
                  "meaning": "whatever is moving in this changing universe"
                },
                {
                  "sanskrit": "तेन त्यक्तेन भुञ्जीथाः",
                  "iast": "tena tyaktena bhuñjīthāḥ",
                  "meaning": "by that renunciation enjoy / protect yourself"
                },
                {
                  "sanskrit": "मा गृधः कस्यस्वित् धनम्",
                  "iast": "mā gṛdhaḥ kasya svit dhanam",
                  "meaning": "do not covet anyone's wealth"
                }
              ],
              "english": "All this—whatever exists moving or unmoving in this changing universe—is enveloped by the Supreme Divine. Protect and enjoy yourself through renunciation; do not covet the wealth of anyone.",
              "hindi": "इस सम्पूर्ण परिवर्तनशील संसार में जो कुछ भी चराचर जगत है, वह सब ईश्वर से व्याप्त है। उस ईश्वर को साथ रखते हुए त्यागभाव से भोग करो; किसी के धन का लोभ मत करो।",
              "commentary": "The quintessential verse of Indian philosophy synthesizing transcendence and ethical living.",
              "audio": ""
            },
            {
              "id": "iu_m02",
              "verse_number": "Mantra 2",
              "citation": "Isha Upanishad 2",
              "meter": "Anuṣṭubh",
              "sanskrit": "कुर्वन्नेवेह कर्माणि जिजीविषेच्छतं समाः ।\nएवं त्वयि नान्यथेतोऽस्ति न कर्म लिप्यते नरे ॥",
              "transliteration": "kurvann eveha karmāṇi jijīviṣec chataṁ samāḥ |\nevaṁ tvayi nānyatheto 'sti na karma lipyate nare ||",
              "word_meanings": [
                {
                  "sanskrit": "कुर्वन् एव इह कर्माणि",
                  "iast": "kurvan eva iha karmāṇi",
                  "meaning": "performing actions indeed in this world"
                },
                {
                  "sanskrit": "जिजीविषेत् शतम् समाः",
                  "iast": "jijīviṣet śatam samāḥ",
                  "meaning": "one should desire to live a hundred years"
                },
                {
                  "sanskrit": "एवम् त्वयि न अन्यथा इतः अस्ति",
                  "iast": "evam tvayi na anyathā itaḥ asti",
                  "meaning": "thus for you there is no other way"
                },
                {
                  "sanskrit": "न कर्म लिप्यते नरे",
                  "iast": "na karma lipyate nare",
                  "meaning": "action will not cling to man"
                }
              ],
              "english": "Performing dedicated actions alone should one desire to live here for a hundred years. For a human being who lives thus, there is no other path; action does not cling to him.",
              "hindi": "इस लोक में निष्काम भाव से कर्म करते हुए ही सौ वर्ष जीने की इच्छा करनी चाहिए। तुम्हारे लिए इससे भिन्न कोई मार्ग नहीं है, जिससे कि कर्म तुम्हें लिप्त न करे।",
              "commentary": "Reconciles worldly work with spiritual liberation: action consecrated to God does not bind.",
              "audio": ""
            },
            {
              "id": "iu_m03",
              "verse_number": "Mantra 3",
              "citation": "Isha Upanishad 3",
              "meter": "Anuṣṭubh",
              "sanskrit": "असूर्या नाम ते लोका अन्धेन तमसावृताः ।\nतांस्ते प्रेत्याभिगच्छन्ति ये के चात्महनो जनाः ॥",
              "transliteration": "asūryā nāma te lokā andhena tamasāvṛtāḥ |\ntāṁs te pretyābhigacchanti ye ke cātmahano janāḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "असूर्याः नाम ते लोकाः",
                  "iast": "asūryāḥ nāma te lokāḥ",
                  "meaning": "sunless / demonic indeed are those realms"
                },
                {
                  "sanskrit": "अन्धेन तमसा आवृताः",
                  "iast": "andhena tamasā āvṛtāḥ",
                  "meaning": "shrouded in blinding darkness"
                },
                {
                  "sanskrit": "तान् ते प्रेत्य अभिगच्छन्ति",
                  "iast": "tān te pretya abhigacchanti",
                  "meaning": "to them go after death"
                },
                {
                  "sanskrit": "ये के च आत्म-हनः जनाः",
                  "iast": "ye ke ca ātma-hanaḥ janāḥ",
                  "meaning": "whosoever are slayers of the Self (deniers of truth)"
                }
              ],
              "english": "Sunless and joyless are those realms, enveloped in blinding darkness, to which go after departing this world all those who are slayers of the Self (those who live purely in sensory egoism).",
              "hindi": "वे लोक सूर्य-रहित और घने अन्धकार से आच्छादित हैं; शरीर त्यागने के पश्चात् वे सभी लोग उन्हीं लोकों को प्राप्त होते हैं, जो अपनी आत्मा का हनन करने वाले (अज्ञानी) हैं।",
              "commentary": "'Atma-hana' refers to those who deny their divine nature and live purely as biological automatons.",
              "audio": ""
            },
            {
              "id": "iu_m04",
              "verse_number": "Mantra 4",
              "citation": "Isha Upanishad 4",
              "meter": "Triṣṭubh",
              "sanskrit": "अनेजदेकं मनसो जवीयो नैनद्देवा आप्नुवन्पूर्वमर्षत् ।\nतद्धावतोऽन्यानत्येति तिष्ठत्तस्मिन्नपो मातरिश्वा दधाति ॥",
              "transliteration": "anejad ekaṁ manaso javīyo nainad devā āpnuvan pūrvam arṣat |\ntad dhāvato 'nyān atyeti tiṣṭhat tasminn apo mātariśvā dadhāti ||",
              "word_meanings": [
                {
                  "sanskrit": "अनेजत् एकम्",
                  "iast": "anejat ekam",
                  "meaning": "unmoving, the One"
                },
                {
                  "sanskrit": "मनसः जवीयः",
                  "iast": "manaso javīyaḥ",
                  "meaning": "swifter than the mind"
                },
                {
                  "sanskrit": "न एनत् देवाः आप्नुवन्",
                  "iast": "na enad devā āpnuvan",
                  "meaning": "the senses could not overtake It"
                },
                {
                  "sanskrit": "पूर्वम् अर्षत्",
                  "iast": "pūrvam arṣat",
                  "meaning": "since It was already there before them"
                },
                {
                  "sanskrit": "तिष्ठत् अन्यान् धावतः अत्येति",
                  "iast": "tiṣṭhat anyān dhāvato 'tyeti",
                  "meaning": "standing still, It outstrips all others who run"
                }
              ],
              "english": "Unmoving, the One is swifter than the mind. The senses could not overtake It, for It ran before them. Standing still, It overtakes all others who run. In It, cosmic vitality (Matarishvan) establishes all life.",
              "hindi": "वह आत्मतत्त्व अचल, एक और मन से भी तीव्र गति वाला है। इसे इन्द्रियाँ प्राप्त नहीं कर सकीं, क्योंकि यह सबसे पहले विद्यमान था। वह स्थिर रहकर भी दौड़ने वालों को पीछे छोड़ देता है।",
              "commentary": "Consciousness is the motionless ground of all movement and perception.",
              "audio": ""
            },
            {
              "id": "iu_m05",
              "verse_number": "Mantra 5",
              "citation": "Isha Upanishad 5",
              "meter": "Anuṣṭubh",
              "sanskrit": "तदेजति तन्नैजति तद्दूरे तद्वन्तिके ।\nतदन्तरस्य सर्वस्य तदु सर्वस्यास्य बाह्यतः ॥",
              "transliteration": "tad ejati tan naijati tad dūre tad v antike |\ntad antar asya sarvasya tad u sarvasyāsya bāhyataḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "तत् एजति तत् न एजति",
                  "iast": "tad ejati tan naijati",
                  "meaning": "It moves, and It moves not"
                },
                {
                  "sanskrit": "तत् दूरे तत् उ अन्तिके",
                  "iast": "tad dūre tad v antike",
                  "meaning": "It is far, and It is near"
                },
                {
                  "sanskrit": "तत् अन्तः अस्य सर्वस्य",
                  "iast": "tad antar asya sarvasya",
                  "meaning": "It is within all this"
                },
                {
                  "sanskrit": "तत् उ सर्वस्य अस्य बाह्यतः",
                  "iast": "tad u sarvasyāsya bāhyataḥ",
                  "meaning": "and It is outside all this"
                }
              ],
              "english": "It moves, and It moves not; It is far away, and It is near. It is within all this, and It is outside all this.",
              "hindi": "वह चलता है और नहीं भी चलता; वह दूर है और अत्यन्त समीप भी है; वह सबके भीतर है और सबके बाहर भी वही है।",
              "commentary": "The classical transcendence-immanence antinomy of non-dual consciousness.",
              "audio": ""
            },
            {
              "id": "iu_m06",
              "verse_number": "Mantra 6",
              "citation": "Isha Upanishad 6",
              "meter": "Anuṣṭubh",
              "sanskrit": "यस्तु सर्वाणि भूतान्यात्मन्येवानुपश्यति ।\nसर्वभूतेषु चात्मानं ततो न विजुगुप्सते ॥",
              "transliteration": "yas tu sarvāṇi bhūtāny ātmany evānupaśyati |\nsarva-bhūteṣu cātmānaṁ tato na vijugupsate ||",
              "word_meanings": [
                {
                  "sanskrit": "यः तु सर्वाणि भूतानि",
                  "iast": "yas tu sarvāṇi bhūtāni",
                  "meaning": "he who beholds all beings"
                },
                {
                  "sanskrit": "आत्मनि एव अनुपश्यति",
                  "iast": "ātmany evānupaśyati",
                  "meaning": "in the Self alone"
                },
                {
                  "sanskrit": "सर्व-भूतेषु च आत्मानम्",
                  "iast": "sarva-bhūteṣu cātmānam",
                  "meaning": "and the Self in all beings"
                },
                {
                  "sanskrit": "ततः न विजुगुप्सते",
                  "iast": "tato na vijugupsate",
                  "meaning": "thereafter feels no hatred / revulsion"
                }
              ],
              "english": "He who sees all beings in the Self, and the Self in all beings, never feels hatred or revulsion toward anything.",
              "hindi": "जो पुरुष सम्पूर्ण भूतों को अपनी आत्मा में ही देखता है और सम्पूर्ण भूतों में आत्मा को देखता है, वह किसी से घृणा नहीं करता।",
              "commentary": "Universal compassion is the natural spontaneous expression of realizing non-dual oneness.",
              "audio": ""
            },
            {
              "id": "iu_m07",
              "verse_number": "Mantra 7",
              "citation": "Isha Upanishad 7",
              "meter": "Anuṣṭubh",
              "sanskrit": "यस्मिन्सर्वाणि भूतान्यात्मैवाभूद्विजानतः ।\nतत्र को मोहः कः शोक एकत्वमनुपश्यतः ॥",
              "transliteration": "yasmin sarvāṇi bhūtāny ātmaivābhūd vijānataḥ |\ntatra ko mohaḥ kaḥ śoka ekatvam anupaśyataḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "यस्मिन् सर्वाणि भूतानि",
                  "iast": "yasmin sarvāṇi bhūtāni",
                  "meaning": "in whom all beings"
                },
                {
                  "sanskrit": "आत्मा एव अभूत् विजानतः",
                  "iast": "ātmaivābhūd vijānataḥ",
                  "meaning": "have become the Self to the knower of Truth"
                },
                {
                  "sanskrit": "तत्र कः मोहः कः शोकः",
                  "iast": "tatra ko mohaḥ kaḥ śokaḥ",
                  "meaning": "what delusion can there be, what sorrow?"
                },
                {
                  "sanskrit": "एकत्वम् अनुपश्यतः",
                  "iast": "ekatvam anupaśyataḥ",
                  "meaning": "for one who beholds this oneness"
                }
              ],
              "english": "When to the seer of oneness, all beings have verily become the Self, what delusion, what sorrow can there be for him who beholds that oneness?",
              "hindi": "जिस अवस्था में ज्ञानी पुरुष के लिए सम्पूर्ण प्राणी आत्मस्वरूप ही हो जाते हैं, उस समय एकत्व देखने वाले उस पुरुष को कहाँ का मोह और कहाँ का शोक?",
              "commentary": "Ekatvam (oneness): when duality vanishes, fear, grief, and confusion disappear forever.",
              "audio": ""
            },
            {
              "id": "iu_m08",
              "verse_number": "Mantra 8",
              "citation": "Isha Upanishad 8",
              "meter": "Triṣṭubh",
              "sanskrit": "स पर्यगाच्छुक्रमकायमव्रणमस्नाविरं शुद्धमपापविद्धम् ।\nकविर्मनीषी परिभूः स्वयम्भूर्याथातथ्यतोऽर्थान्व्यदधाच्छाश्वतीभ्यः समाभ्यः ॥",
              "transliteration": "sa paryagāc chukram akāyam avraṇam asnāviraṁ śuddham apāpa-viddham |\nkavir manīṣī paribhūḥ svayambhūr yāthātathyato 'rthān vyadadhāc chāśvatībhyaḥ samābhyaḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "सः पर्यगात्",
                  "iast": "sa paryagāt",
                  "meaning": "He (the Self) pervades all"
                },
                {
                  "sanskrit": "शुक्रम् अकायम् अव्रणम् अस्नाविरम्",
                  "iast": "śukram akāyam avraṇam asnāviram",
                  "meaning": "radiant, bodiless, woundless, sinewless"
                },
                {
                  "sanskrit": "शुद्धम् अपाप-विद्धम्",
                  "iast": "śuddham apāpa-viddham",
                  "meaning": "pure, untouched by sin / imperfection"
                },
                {
                  "sanskrit": "कविः मनीषी परिभूः स्वयम्भूः",
                  "iast": "kavir manīṣī paribhūḥ svayambhūḥ",
                  "meaning": "the all-seeing Seer, Thinker, All-transcending, Self-existent"
                }
              ],
              "english": "That Self is all-pervading, radiant, bodiless, woundless, sinewless, pure, untouched by evil. He is the all-seeing Sage (Kavi), the Ruler of mind (Manishi), the All-transcending (Paribhu), the Self-existent (Svayambhu), who has ordered all things rightly through eternal ages.",
              "hindi": "वह आत्मा सर्वव्यापी, ज्योतिर्मय, अशरीरी, क्षतरहित, नस-नाड़ियों से रहित, शुद्ध और पाप से अस्पृश्य है। वह सर्वदर्शी, मन का स्वामी, सर्वोपरि और स्वयम्भू है; उसी ने अनादि काल से सम्पूर्ण पदार्थों का यथायोग्य विधान किया है।",
              "commentary": "Portrays the immaculate purity and cosmic governance of Supreme Consciousness.",
              "audio": ""
            },
            {
              "id": "iu_m09",
              "verse_number": "Mantra 9",
              "citation": "Isha Upanishad 9",
              "meter": "Anuṣṭubh",
              "sanskrit": "अन्धं तमः प्रविशन्ति येऽविद्यामुपासते ।\nततो भूय इव ते तमो य उ विद्यायां रताः ॥",
              "transliteration": "andhaṁ tamaḥ praviśanti ye 'vidyām upāsate |\ntato bhūya iva te tamo ya u vidyāyāṁ ratāḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "अन्धम् तमः प्रविशन्ति",
                  "iast": "andham tamaḥ praviśanti",
                  "meaning": "enter into blinding darkness"
                },
                {
                  "sanskrit": "ये अविद्याम् उपासते",
                  "iast": "ye 'vidyām upāsate",
                  "meaning": "those who worship ignorance / outer ritual action alone"
                },
                {
                  "sanskrit": "ततः भूयः इव ते तमः",
                  "iast": "tato bhūya iva te tamaḥ",
                  "meaning": "into greater darkness still, as it were"
                },
                {
                  "sanskrit": "ये उ विद्यायाम् रताः",
                  "iast": "ye u vidyāyām ratāḥ",
                  "meaning": "those who delight exclusively in theoretical knowledge"
                }
              ],
              "english": "Into blinding darkness enter those who worship external action (Avidya) alone; into greater darkness still enter those who revel exclusively in abstract theory (Vidya).",
              "hindi": "जो केवल अविद्या (सकाम कर्म) की उपासना करते हैं, वे घोर अन्धकार में प्रवेश करते हैं; और जो केवल विद्या (सैद्धान्तिक ज्ञान) में ही रत हैं, वे मानो उससे भी अधिक अन्धकार में गिरते हैं।",
              "commentary": "Criticism of both blind ritualism and detached, ivory-tower intellectualism.",
              "audio": ""
            },
            {
              "id": "iu_m10",
              "verse_number": "Mantra 10",
              "citation": "Isha Upanishad 10",
              "meter": "Anuṣṭubh",
              "sanskrit": "अन्यदेवाहुर्विद्ययान्यदाहुरविद्यया ।\nइति शुश्रुम धीराणां ये नस्तद्विचचक्षिरे ॥",
              "transliteration": "anyad evāhur vidyayānyad āhur avidyayā |\niti śuśruma dhīrāṇāṁ ye nas tad vicacakṣire ||",
              "word_meanings": [
                {
                  "sanskrit": "अन्यत् एव आहुः विद्यया",
                  "iast": "anyad evāhur vidyayā",
                  "meaning": "one result, they say, is attained by knowledge"
                },
                {
                  "sanskrit": "अन्यत् आहुः अविद्यया",
                  "iast": "anyad āhur avidyayā",
                  "meaning": "another result is attained by action"
                },
                {
                  "sanskrit": "इति शुश्रुम धीराणाम्",
                  "iast": "iti śuśruma dhīrāṇām",
                  "meaning": "thus have we heard from the wise seers"
                },
                {
                  "sanskrit": "ये नः तत् विचचक्षिरे",
                  "iast": "ye nas tad vicacakṣire",
                  "meaning": "who explained that truth unto us"
                }
              ],
              "english": "One result, they say, is achieved by knowledge (Vidya), and another by action (Avidya). Thus have we heard from the ancient wise masters who explained this truth to us.",
              "hindi": "विद्या से अन्य ही फल बताया गया है और अविद्या से अन्य ही फल बताया गया है। ऐसा हमने धीर पुरुषों से सुना है, जिन्होंने हमारे लिए उस तत्त्व की व्याख्या की थी।",
              "commentary": "Affirms the lineage tradition (Sampradaya) of spiritual wisdom passed from master to student.",
              "audio": ""
            },
            {
              "id": "iu_m11",
              "verse_number": "Mantra 11",
              "citation": "Isha Upanishad 11",
              "meter": "Anuṣṭubh",
              "sanskrit": "विद्यां चाविद्यां च यस्तद्वेदोभयं सह ।\nअविद्यया मृत्युं तीर्त्वा विद्ययामृतमश्नुते ॥",
              "transliteration": "vidyāṁ cāvidyāṁ ca yas tad vedobhayaṁ saha |\navidyayā mṛtyuṁ tīrtvā vidyayāmṛtam aśnute ||",
              "word_meanings": [
                {
                  "sanskrit": "विद्याम् च अविद्याम् च",
                  "iast": "vidyāṁ cāvidyāṁ ca",
                  "meaning": "knowledge and action"
                },
                {
                  "sanskrit": "यः तत् वेद उभयम् सह",
                  "iast": "yas tad vedobhayam saha",
                  "meaning": "he who knows both of them together"
                },
                {
                  "sanskrit": "अविद्यया मृत्युम् तीर्त्वा",
                  "iast": "avidyayā mṛtyum tīrtvā",
                  "meaning": "crossing beyond death through righteous action"
                },
                {
                  "sanskrit": "विद्यया अमृतम् अश्नुते",
                  "iast": "vidyayāmṛtam aśnute",
                  "meaning": "attains immortality through spiritual knowledge"
                }
              ],
              "english": "He who knows both Vidya (knowledge) and Avidya (action) together, transcends mortal death through righteous action and attains immortality through spiritual knowledge.",
              "hindi": "जो विद्या और अविद्या दोनों को एक साथ जानता है, वह अविद्या से मृत्यु को पार करके विद्या से अमृतत्त्व को प्राप्त करता है।",
              "commentary": "Samuccaya-Vada: the harmonious synthesis of empirical action and transcendental wisdom.",
              "audio": ""
            },
            {
              "id": "iu_m12",
              "verse_number": "Mantra 12",
              "citation": "Isha Upanishad 12",
              "meter": "Anuṣṭubh",
              "sanskrit": "अन्धं तमः प्रविशन्ति येऽसम्भूतिमुपासते ।\nततो भूय इव ते तमो य उ सम्भूत्यां रताः ॥",
              "transliteration": "andhaṁ tamaḥ praviśanti ye 'sambhūtim upāsate |\ntato bhūya iva te tamo ya u sambhūtyāṁ ratāḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "अन्धम् तमः प्रविशन्ति",
                  "iast": "andham tamaḥ praviśanti",
                  "meaning": "enter into blinding darkness"
                },
                {
                  "sanskrit": "ये असम्भूतिम् उपासते",
                  "iast": "ye 'sambhūtim upāsate",
                  "meaning": "those who worship the unmanifest cause alone"
                },
                {
                  "sanskrit": "ततः भूयः इव ते तमः",
                  "iast": "tato bhūya iva te tamaḥ",
                  "meaning": "into greater darkness still"
                },
                {
                  "sanskrit": "ये उ सम्भूत्याम् रताः",
                  "iast": "ye u sambhūtyām ratāḥ",
                  "meaning": "those who delight exclusively in the manifest effects"
                }
              ],
              "english": "Into blinding darkness enter those who worship the unmanifest cause (Asambhuti) alone; into greater darkness still enter those who revel exclusively in manifest effects (Sambhuti).",
              "hindi": "जो अव्यक्त प्रकृति (असंभूति) की उपासना करते हैं, वे घोर अन्धकार में प्रवेश करते हैं; और जो केवल व्यक्त कार्य-ब्रह्म (संभूति) में ही रत हैं, वे मानो उससे भी अधिक अन्धकार में गिरते हैं।",
              "commentary": "Warning against one-sided absorption in either abstract unmanifest void or transient physical forms.",
              "audio": ""
            },
            {
              "id": "iu_m13",
              "verse_number": "Mantra 13",
              "citation": "Isha Upanishad 13",
              "meter": "Anuṣṭubh",
              "sanskrit": "अन्यदेवाहुः सम्भवादन्यदाहुरसम्भवात् ।\nइति शुश्रुम धीराणां ये नस्तद्विचचक्षिरे ॥",
              "transliteration": "anyad evāhuḥ sambhavād anyad āhur asambhavāt |\niti śuśruma dhīrāṇāṁ ye nas tad vicacakṣire ||",
              "word_meanings": [
                {
                  "sanskrit": "अन्यत् एव आहुः सम्भवात्",
                  "iast": "anyad evāhuḥ sambhavād",
                  "meaning": "one result is achieved from the manifest"
                },
                {
                  "sanskrit": "अन्यत् आहुः असम्भवात्",
                  "iast": "anyad āhur asambhavāt",
                  "meaning": "another result is achieved from the unmanifest"
                },
                {
                  "sanskrit": "इति शुश्रुम धीराणाम्",
                  "iast": "iti śuśruma dhīrāṇām",
                  "meaning": "thus have we heard from the wise seers"
                }
              ],
              "english": "One outcome is attained from the manifest, and quite another from the unmanifest. Thus have we heard from the wise seers who explained this to us.",
              "hindi": "संभूति (व्यक्त) से अन्य ही फल बताया गया है और असंभूति (अव्यक्त) से अन्य ही फल बताया गया है। ऐसा हमने ज्ञानी पुरुषों से सुना है जिन्होंने हमें इसका उपदेश दिया था।",
              "commentary": "Both dimensions of reality have their distinct fruits in cosmic comprehension.",
              "audio": ""
            },
            {
              "id": "iu_m14",
              "verse_number": "Mantra 14",
              "citation": "Isha Upanishad 14",
              "meter": "Anuṣṭubh",
              "sanskrit": "सम्भूतिं च विनाशं च यस्तद्वेदोभयं सह ।\nविनाशेन मृत्युं तीर्त्वा सम्भूत्यामृतमश्नुते ॥",
              "transliteration": "sambhūtiṁ ca vināśaṁ ca yas tad vedobhayaṁ saha |\nvināśena mṛtyuṁ tīrtvā sambhūtyāmṛtam aśnute ||",
              "word_meanings": [
                {
                  "sanskrit": "सम्भूतिम् च विनाशम् च",
                  "iast": "sambhūtiṁ ca vināśaṁ ca",
                  "meaning": "creation and dissolution"
                },
                {
                  "sanskrit": "यः तत् वेद उभयम् सह",
                  "iast": "yas tad vedobhayam saha",
                  "meaning": "he who understands both together"
                },
                {
                  "sanskrit": "विनाशेन मृत्युम् तीर्त्वा",
                  "iast": "vināśena mṛtyum tīrtvā",
                  "meaning": "crossing beyond death through understanding the mortal realm"
                },
                {
                  "sanskrit": "सम्भूतिया अमृतम् अश्नुते",
                  "iast": "sambhūtyāmṛtam aśnute",
                  "meaning": "attains immortality through realization of the eternal Source"
                }
              ],
              "english": "He who knows both the manifest creation and dissolution together, crosses beyond death through the knowledge of the mortal realm, and attains immortality through the realization of the Eternal.",
              "hindi": "जो संभूति और विनाश (अव्यक्त और नश्वर जगत) दोनों को एक साथ जानता है, वह नश्वरता के विवेक से मृत्यु को पार करके शाश्वत तत्त्व के द्वारा अमृतत्त्व का उपभोग करता है।",
              "commentary": "Holistic spiritual integration: understanding mortality releases fear of physical decay.",
              "audio": ""
            },
            {
              "id": "iu_m15",
              "verse_number": "Mantra 15",
              "citation": "Isha Upanishad 15",
              "meter": "Anuṣṭubh",
              "sanskrit": "हिरण्मयेन पात्रेण सत्यस्यापिहितं मुखम् ।\nतत्त्वं पूषन्नपावृणु सत्यधर्माय दृष्टये ॥",
              "transliteration": "hiraṇmayena pātreṇa satyasyāpihitaṁ mukham |\ntat tvaṁ pūṣann apāvṛṇu satya-dharmāya dṛṣṭaye ||",
              "word_meanings": [
                {
                  "sanskrit": "हिरण्मयेन पात्रेण",
                  "iast": "hiraṇmayena pātreṇa",
                  "meaning": "by a golden dazzling vessel / disc"
                },
                {
                  "sanskrit": "सत्यस्य अपिहितम् मुखम्",
                  "iast": "satyasyāpihitam mukham",
                  "meaning": "the face of Truth is covered"
                },
                {
                  "sanskrit": "तत् त्वम् पूषन् अपावृणु",
                  "iast": "tat tvaṁ pūṣann apāvṛṇu",
                  "meaning": "unveil that, O Nourisher (Sun)"
                },
                {
                  "sanskrit": "सत्य-धर्माय दृष्टये",
                  "iast": "satya-dharmāya dṛṣṭaye",
                  "meaning": "for the direct sight of the seeker of Truth"
                }
              ],
              "english": "The face of Truth is concealed by a dazzling golden orb. Unveil that, O Pushan (Nourisher), so that I, dedicated to Truth, may behold It!",
              "hindi": "सत्य का मुख स्वर्णिम चमकीले पात्र से ढँका हुआ है। हे पूषन् (सूर्यदेव)! मुझ सत्यधर्मा को दर्शन देने के लिए आप उस आवरण को हटा दीजिए।",
              "commentary": "The golden vessel represents the dazzling beauty of the empirical universe that blinds the intellect to the underlying truth.",
              "audio": ""
            },
            {
              "id": "iu_m16",
              "verse_number": "Mantra 16",
              "citation": "Isha Upanishad 16",
              "meter": "Triṣṭubh",
              "sanskrit": "पूषन्नेकर्षे यम सूर्य प्राजापत्य व्यूह रश्मीन्समूह तेजः ।\nयत्ते रूपं कल्याणतमं तत्ते पश्यामि योऽसावसौ पुरुषः सोऽहमस्मि ॥",
              "transliteration": "pūṣann ekarṣe yama sūrya prājāpatya vyūha raśmīn samūha tejaḥ |\nyat te rūpaṁ kalyāṇatamaṁ tat te paśyāmi yo 'sāv asau puruṣaḥ so 'ham asmi ||",
              "word_meanings": [
                {
                  "sanskrit": "पूषन् एकर्षे यम सूर्य प्राजापत्य",
                  "iast": "pūṣann ekarṣe yama sūrya prājāpatya",
                  "meaning": "O Nourisher, solitary Sage, Controller, Sun, child of Prajapati"
                },
                {
                  "sanskrit": "व्यूह रश्मीन् समूह तेजः",
                  "iast": "vyūha raśmīn samūha tejaḥ",
                  "meaning": "gather Thy blinding rays, soften Thy radiance"
                },
                {
                  "sanskrit": "यत् ते रूपम् कल्याणतमम्",
                  "iast": "yat te rūpaṁ kalyāṇatamam",
                  "meaning": "that most auspicious, benign form of Thine"
                },
                {
                  "sanskrit": "तत् ते पश्यामि",
                  "iast": "tat te paśyāmi",
                  "meaning": "that I may behold"
                },
                {
                  "sanskrit": "यः असौ पुरुषः सः अहम् अस्मि",
                  "iast": "yo 'sāv asau puruṣaḥ so 'ham asmi",
                  "meaning": "that Person who dwells yonder in the cosmos, That Am I (So'ham Asmi)!"
                }
              ],
              "english": "O Sun, solitary traveler of the heavens, controller, divine light—gather Thy blinding rays, soften Thy radiance, that I may behold Thy most auspicious form: That Person who dwells yonder in the cosmos, That very Person Am I (So'ham Asmi)!",
              "hindi": "हे पोषक, एकाकी ऋषि, यम, सूर्य! अपनी किरणों को समेट लीजिए, अपने तेज को सौम्य कीजिए जिससे मैं आपके परम कल्याणमय रूप को देख सकूँ। वह जो आदित्यमण्डलस्थ परम पुरुष है, 'वह मैं ही हूँ' (सोऽहमस्मि)।",
              "commentary": "The Mahavakya 'So'ham Asmi' (I am That Person): non-dual realization of identity with cosmic consciousness.",
              "audio": ""
            },
            {
              "id": "iu_m17",
              "verse_number": "Mantra 17",
              "citation": "Isha Upanishad 17",
              "meter": "Anuṣṭubh",
              "sanskrit": "वायुरनिलममृतमथेदं भस्मान्तं शरीरम् ।\nॐ क्रतो स्मर कृतं स्मर क्रतो स्मर कृतं स्मर ॥",
              "transliteration": "vāyur anilam amṛtam athedaṁ bhasmāntaṁ śarīram |\noṁ krato smara kṛtaṁ smara krato smara kṛtaṁ smara ||",
              "word_meanings": [
                {
                  "sanskrit": "वायुः अनिलम् अमृतम्",
                  "iast": "vāyur anilam amṛtam",
                  "meaning": "let breath merge into the immortal cosmic Prana"
                },
                {
                  "sanskrit": "अथ इदम् भस्म-अन्तम् शरीरम्",
                  "iast": "athedaṁ bhasmāntaṁ śarīram",
                  "meaning": "and let this body end in ashes"
                },
                {
                  "sanskrit": "ॐ क्रतो स्मर कृतम् स्मर",
                  "iast": "oṁ krato smara kṛtaṁ smara",
                  "meaning": "OM, O Mind (will-power), remember! Remember what was done!"
                }
              ],
              "english": "Let breath merge into the immortal Life-Principle, and let this physical body be reduced to ashes! OM! O Mind, remember! Remember all that has been done! Remember!",
              "hindi": "मेरा प्राण अमर वायुतत्त्व में लीन हो और यह शरीर भस्म में समाप्त हो जाए। ॐ! हे संकल्पमय मन! स्मरण कर, अपने किए हुए कर्मों का स्मरण कर!",
              "commentary": "The moment of mortal transition: remembering the eternal reality behind transient physical existence.",
              "audio": ""
            },
            {
              "id": "iu_m18",
              "verse_number": "Mantra 18",
              "citation": "Isha Upanishad 18",
              "meter": "Triṣṭubh",
              "sanskrit": "अग्ने नय सुपथा राये अस्मान् विश्वानि देव वयुनानि विद्वान् ।\nयुयोध्यस्मज्जुहुराणमेनो भूयिष्ठां ते नमउक्तिं विधेम ॥",
              "transliteration": "agne naya supathā rāye asmān viśvāni deva vayunāni vidvān |\nyuyodhy asmaj juhurāṇam eno bhūyiṣṭhāṁ te nama-uktiṁ vidhema ||",
              "word_meanings": [
                {
                  "sanskrit": "अग्ने नय सुपथा राये अस्मान्",
                  "iast": "agne naya supathā rāye asmān",
                  "meaning": "O Agni, lead us along the righteous path to liberation"
                },
                {
                  "sanskrit": "विश्वानि देव वयुनानि विद्वान्",
                  "iast": "viśvāni deva vayunāni vidvān",
                  "meaning": "knowing all our ways and deeds, O Divine Light"
                },
                {
                  "sanskrit": "युयोधि अस्मत् जुहुराणम् एनः",
                  "iast": "yuyodhy asmaj juhurāṇam enaḥ",
                  "meaning": "remove from us all crooked and deceptive sins"
                },
                {
                  "sanskrit": "भूयिष्ठाम् ते नमः-उक्तिम् विधेम",
                  "iast": "bhūyiṣṭhāṁ te nama-uktiṁ vidhema",
                  "meaning": "we offer to Thee our deepest words of homage"
                }
              ],
              "english": "O Agni (Divine Fire), lead us along the righteous path to ultimate liberation, knowing all our deeds, O God. Remove from us all crooked and deceptive sins; we offer Thee our deepest prayers of surrender and homage!",
              "hindi": "हे अग्निदेव! आप हमारे सम्पूर्ण कर्मों को जानने वाले हैं, हमें कल्याणकारी मार्ग से परम पद की ओर ले चलिए। हमारे भीतर के कुटिल पापों को दूर कीजिए; हम आपको बारम्बार नमस्कार करते हैं।",
              "commentary": "The concluding prayer of the Shukla Yajurveda seeking divine guidance toward liberation.",
              "audio": ""
            }
          ]
        }
      ]
    },
    {
      "id": "valmiki_ramayana",
      "category_id": "epics_itihasa",
      "category": "Epics & Itihasa",
      "title": "Valmiki Ramayana",
      "sanskrit_title": "वाल्मीकिरामायणम्",
      "transliteration": "Vālmīkirāmāyaṇam",
      "author": "Maharshi Valmiki (Adikavi)",
      "tradition": "Itihasa (Adi Kavya)",
      "era": "c. 500–200 BCE",
      "description": "The primordial epic poem (Adi Kavya) of India in 24,000 verses chronicling the righteous life, ethical fortitude, and divine leadership of Sri Rama.",
      "epigraph": "मा निषाद प्रतिष्ठां त्वमगमः शाश्वतीः समाः ।\nयत्क्रौञ्चमिथुनादेकमवधीः काममोहितम् ॥",
      "epigraph_translation": "O hunter, may you not find peace for endless years, since you killed one of the pair of curlews infatuated with love.",
      "chapters": [
        {
          "id": "vr_bala_kanda",
          "chapter_number": 1,
          "title": "Balakanda: The Qualities of the Ideal Leader (Mula Ramayana)",
          "sanskrit_title": "बालकाण्डम् (मूलरामायणम्)",
          "transliteration": "Bālakāṇḍam",
          "summary": "Maharshi Valmiki asks Sage Narada: 'Who in this world is truly endowed with ideal virtues, self-mastery, truthfulness, and compassion?' Narada reveals the character of Sri Rama.",
          "verses": [
            {
              "id": "vr_1_1_1",
              "verse_number": "1.1.1",
              "citation": "Valmiki Ramayana 1.1.1",
              "meter": "Anuṣṭubh",
              "sanskrit": "तपःस्वाध्यायनिरतं तपस्वी वाग्विदां वरम् ।\nनारदं परिपप्रच्छ वाल्मीकिर्मुनिपुङ्गवम् ॥",
              "transliteration": "tapaḥ-svādhyāya-nirataṁ tapasvī vāg-vidāṁ varam |\nnāradaṁ paripapraccha vālmīkir muni-puṅgavam ||",
              "word_meanings": [
                {
                  "sanskrit": "तपः-स्वाध्याय-निरतम्",
                  "iast": "tapaḥ-svādhyāya-niratam",
                  "meaning": "ever devoted to contemplation and study"
                },
                {
                  "sanskrit": "वाग्विदां वरम्",
                  "iast": "vāg-vidāṁ varam",
                  "meaning": "foremost among the eloquent"
                },
                {
                  "sanskrit": "नारदम् परिपप्रच्छ वाल्मीकिः",
                  "iast": "nāradaṁ paripapraccha vālmīkiḥ",
                  "meaning": "Valmiki questioned Sage Narada"
                }
              ],
              "english": "Ascetic Valmiki earnestly questioned the eminent sage Narada, who was ever absorbed in contemplation and self-study, and foremost among masters of speech.",
              "hindi": "तपस्या और स्वाध्याय में निरन्तर लगे रहने वाले, वाणी के ज्ञाताओं में श्रेष्ठ तपस्वी नारदजी से मुनिश्रेष्ठ वाल्मीकि ने पूछा।",
              "commentary": "The opening of the Adi Kavya establishing poetry as an ethical inquiry.",
              "audio": ""
            },
            {
              "id": "vr_1_1_2",
              "verse_number": "1.1.2",
              "citation": "Valmiki Ramayana 1.1.2",
              "meter": "Anuṣṭubh",
              "sanskrit": "को न्वस्मिन् साम्प्रतं लोके गुणवान् कश्च वीर्यवान् ।\nधर्मज्ञश्च कृतज्ञश्च सत्यवाक्यो दृढव्रतः ॥",
              "transliteration": "ko nv asmin sāmprataṁ loke guṇavān kaś ca vīryavān |\ndharma-jñaś ca kṛta-jñaś ca satya-vākyo dṛḍha-vrataḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "कः नु अस्मिन् साम्प्रतम् लोके",
                  "iast": "ko nv asmin sāmprataṁ loke",
                  "meaning": "who indeed in this contemporary world"
                },
                {
                  "sanskrit": "गुणवान् कः च वीर्यवान्",
                  "iast": "guṇavān kaś ca vīryavān",
                  "meaning": "is endowed with noble virtues and valor?"
                },
                {
                  "sanskrit": "धर्मज्ञः कृतज्ञः सत्यवाक्यः दृढव्रतः",
                  "iast": "dharma-jñaś ca kṛta-jñaś ca satya-vākyo dṛḍha-vrataḥ",
                  "meaning": "knower of Dharma, grateful, truthful, and resolute"
                }
              ],
              "english": "Who in this contemporary world is truly endowed with ideal virtue and heroic valor? Who is righteous, grateful, truthful in speech, and unwavering in noble resolve?",
              "hindi": "इस समय संसार में ऐसा कौन सा पुरुष है जो उत्तम गुणों से युक्त, पराक्रमी, धर्म का ज्ञाता, कृतज्ञ, सत्यवादी और अपने संकल्प पर दृढ़ रहने वाला है?",
              "commentary": "The sixteen ideal virtues that define Maryada Purushottama.",
              "audio": ""
            }
          ]
        },
        {
          "id": "vr_yuddha_kanda",
          "chapter_number": 6,
          "title": "Yuddhakanda: The Solar Invocation (Aditya Hridaya)",
          "sanskrit_title": "युद्धकाण्डम् (आदित्यहृदयस्तोत्रम्)",
          "transliteration": "Yuddhakaṇḍam",
          "summary": "Sage Agastya imparts the sacred solar hymn 'Aditya Hridaya' to Sri Rama on the battlefield to invoke inexhaustible courage and victory.",
          "verses": [
            {
              "id": "vr_6_105_1",
              "verse_number": "6.105.1",
              "citation": "Valmiki Ramayana 6.105.1",
              "meter": "Anuṣṭubh",
              "sanskrit": "ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम् ।\nरावणं चाग्रतो दृष्ट्वा युद्धाय समुपस्थितम् ॥",
              "transliteration": "tato yuddha-pariśrāntaṁ samare cintayā sthitam |\nrāvaṇaṁ cāgrato dṛṣṭvā yuddhāya samupasthitam ||",
              "word_meanings": [
                {
                  "sanskrit": "युद्ध-परिश्रान्तम्",
                  "iast": "yuddha-pariśrāntam",
                  "meaning": "exhausted by long combat"
                },
                {
                  "sanskrit": "चिन्तया स्थितम्",
                  "iast": "cintayā sthitam",
                  "meaning": "standing thoughtful on the field"
                },
                {
                  "sanskrit": "रावणम् च अग्रतः दृष्ट्वा",
                  "iast": "rāvaṇaṁ cāgrato dṛṣṭvā",
                  "meaning": "seeing Ravana standing before him"
                }
              ],
              "english": "Seeing Rama standing exhausted by the long battle and absorbed in deep thought, while Ravana stood before him ready for furious combat.",
              "hindi": "युद्ध से थके हुए और रणभूमि में चिन्तामग्न खड़े श्रीराम को देखकर तथा सामने रावण को युद्ध के लिए प्रस्तुत पाकर।",
              "commentary": "The psychological setting preceding the recitation of the Aditya Hridaya.",
              "audio": ""
            },
            {
              "id": "vr_6_105_2",
              "verse_number": "6.105.2",
              "citation": "Valmiki Ramayana 6.105.2",
              "meter": "Anuṣṭubh",
              "sanskrit": "दैवतैश्च समागम्य द्रष्टुमभ्यागतो रणम् ।\nउपागम्याब्रवीद्राममगस्त्यो भगवानृषिः ॥",
              "transliteration": "daivataiś ca samāgamya draṣṭum abhyāgato raṇam |\nupāgamyābravīd rāmam agastyo bhagavān ṛṣiḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "दैवतैः च समागम्य",
                  "iast": "daivataiś ca samāgamya",
                  "meaning": "having arrived with the divine powers"
                },
                {
                  "sanskrit": "उपागम्य अब्रवीत् रामम् अगस्त्यः",
                  "iast": "upāgamyābravīd rāmam agastyaḥ",
                  "meaning": "approaching Sri Rama, sage Agastya spoke"
                }
              ],
              "english": "The revered sage Agastya, who had arrived with the gods to witness the battle, approached Rama and imparted the eternal solar hymn.",
              "hindi": "देवगणों सहित युद्ध देखने आए भगवान अगस्त्य मुनि ने श्रीराम के समीप जाकर 'आदित्यहृदय स्तोत्र' का उपदेश दिया।",
              "commentary": "Solar consciousness invoked to destroy darkness.",
              "audio": ""
            }
          ]
        }
      ]
    },
    {
      "id": "yoga_sutras",
      "category_id": "philosophy_darshana",
      "category": "Philosophical Treatises",
      "title": "Yoga Sutras of Patanjali",
      "sanskrit_title": "पातञ्जलयोगसूत्राणि",
      "transliteration": "Pātañjalayogasūtrāṇi",
      "author": "Maharshi Patanjali",
      "tradition": "Yoga Darshana (Shad Darshana)",
      "era": "c. 400 BCE – 200 CE",
      "description": "The 196 aphorisms of classical Raja Yoga delineating the eight-limbed path (Ashtanga Yoga) for quieting mental modifications and attaining Kaivalya (liberation).",
      "epigraph": "योगेन चित्तस्य पदेन वाचां मलं शरीरस्य च वैद्यकेन ।\nयोऽपाकरोत्तं प्रवरं मुनीनां पतञ्जलिं प्राञ्जलिरानतोऽस्मि ॥",
      "epigraph_translation": "I bow with folded hands to Patanjali, the foremost of sages, who removed the impurities of mind through Yoga, of speech through grammar, and of the body through Ayurveda.",
      "chapters": [
        {
          "id": "ys_samadhi_pada",
          "chapter_number": 1,
          "title": "Samadhi Pada: Contemplation & Mental Stillness",
          "sanskrit_title": "समाधिपादः (प्रथमोऽध्यायः)",
          "transliteration": "Samādhipādaḥ",
          "summary": "Patanjali defines Yoga as the cessation of the fluctuating patterns of the mind-field (Citta-vritti-nirodha) and describes the stages of meditative absorption.",
          "verses": [
            {
              "id": "ys_1_1",
              "verse_number": "1.1",
              "citation": "Yoga Sutras 1.1",
              "meter": "Sūtra",
              "sanskrit": "अथ योगानुशासनम् ॥",
              "transliteration": "atha yogānuśāsanam ||",
              "word_meanings": [
                {
                  "sanskrit": "अथ",
                  "iast": "atha",
                  "meaning": "now begins"
                },
                {
                  "sanskrit": "योग-अनुशासनम्",
                  "iast": "yoga-anuśāsanam",
                  "meaning": "the authoritative instruction on Yoga"
                }
              ],
              "english": "Now begins the authoritative instruction on Yoga.",
              "hindi": "अब योग के प्रामाणिक अनुशासन का प्रारम्भ होता है।",
              "commentary": "'Atha' indicates readiness for spiritual practice after empirical exploration.",
              "audio": ""
            },
            {
              "id": "ys_1_2",
              "verse_number": "1.2",
              "citation": "Yoga Sutras 1.2",
              "meter": "Sūtra",
              "sanskrit": "योगश्चित्तवृत्तिनिरोधः ॥",
              "transliteration": "yogaś citta-vṛtti-nirodhaḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "योगः",
                  "iast": "yogaḥ",
                  "meaning": "Yoga is"
                },
                {
                  "sanskrit": "चित्त-वृत्ति-निरोधः",
                  "iast": "citta-vṛtti-nirodhaḥ",
                  "meaning": "the intentional stilling of the fluctuating whirlpools of the mind-field"
                }
              ],
              "english": "Yoga is the intentional quieting and mastery of the fluctuating whirlpools of the mind-field (Citta-vritti-nirodha).",
              "hindi": "चित्त की वृत्तियों का निरोध (मन के भटकावों और चंचलता का पूर्ण रूप से थम जाना) ही 'योग' है।",
              "commentary": "The foundational definition of classical Raja Yoga.",
              "audio": ""
            },
            {
              "id": "ys_1_3",
              "verse_number": "1.3",
              "citation": "Yoga Sutras 1.3",
              "meter": "Sūtra",
              "sanskrit": "तदा द्रष्टुः स्वरूपेऽवस्थानम् ॥",
              "transliteration": "tadā draṣṭuḥ svarūpe 'vasthānam ||",
              "word_meanings": [
                {
                  "sanskrit": "तदा",
                  "iast": "tadā",
                  "meaning": "then"
                },
                {
                  "sanskrit": "द्रष्टुः स्वरूपे अवस्थानम्",
                  "iast": "draṣṭuḥ svarūpe 'vasthānam",
                  "meaning": "the Seer abides in Its own pristine nature"
                }
              ],
              "english": "Then the Seer (pure witness consciousness) abides in Its own pristine nature.",
              "hindi": "उस समय द्रष्टा (शुद्ध चेतना/आत्मा) अपने वास्तविक स्वरूप में स्थित हो जाता है।",
              "commentary": "When thoughts quiet down, consciousness recognizes itself as the witness.",
              "audio": ""
            },
            {
              "id": "ys_1_33",
              "verse_number": "1.33",
              "citation": "Yoga Sutras 1.33",
              "meter": "Sūtra",
              "sanskrit": "मैत्रीकरुणामुदितोपेक्षाणां सुखदुःखपुण्यापुण्यविषयाणां भावनातश्चित्तप्रसादनम् ॥",
              "transliteration": "maitrī-karuṇā-muditopekṣāṇāṁ sukha-duḥkha-puṇyāpuṇya-viṣayāṇāṁ bhāvanātaś citta-prasādanam ||",
              "word_meanings": [
                {
                  "sanskrit": "मैत्री",
                  "iast": "maitrī",
                  "meaning": "friendliness toward the happy"
                },
                {
                  "sanskrit": "करुणा",
                  "iast": "karuṇā",
                  "meaning": "compassion toward the suffering"
                },
                {
                  "sanskrit": "मुदिता",
                  "iast": "muditā",
                  "meaning": "joy in the virtuous"
                },
                {
                  "sanskrit": "उपेक्षा",
                  "iast": "upekṣā",
                  "meaning": "serene equanimity toward the unvirtuous"
                },
                {
                  "sanskrit": "चित्त-प्रसादनम्",
                  "iast": "citta-prasādanam",
                  "meaning": "clarity and tranquility of the mind"
                }
              ],
              "english": "By cultivating attitudes of friendliness toward the happy, compassion toward the suffering, delight in the virtuous, and serene neutrality toward the unrighteous, the mind-field attains undisturbed clarity and peace.",
              "hindi": "सुखी प्राणियों के प्रति मित्रता, दुःखी प्राणियों के प्रति करुणा, पुण्यात्माओं के प्रति प्रसन्नता तथा पापियों के प्रति उपेक्षा की भावना रखने से चित्त निर्मल और शान्त हो जाता है।",
              "commentary": "The Brahmaviharas: interpersonal psychological hygiene for unshakeable peace.",
              "audio": ""
            }
          ]
        },
        {
          "id": "ys_sadhana_pada",
          "chapter_number": 2,
          "title": "Sadhana Pada: The Eight Limbs of Yoga (Ashtanga)",
          "sanskrit_title": "साधनपादः (द्वितीयोऽध्यायः)",
          "transliteration": "Sādhanapādaḥ",
          "summary": "Patanjali delineates the practical eightfold path (Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi) and defines stable posture.",
          "verses": [
            {
              "id": "ys_2_29",
              "verse_number": "2.29",
              "citation": "Yoga Sutras 2.29",
              "meter": "Sūtra",
              "sanskrit": "यमनियमासनप्राणायामप्रत्याहारधारणाध्यानसमाधयोऽष्टावङ्गानि ॥",
              "transliteration": "yama-niyamāsana-prāṇāyāma-pratyāhāra-dhāraṇā-dhyāna-samādhayo 'ṣṭāv aṅgāni ||",
              "word_meanings": [
                {
                  "sanskrit": "अष्टौ अङ्गानि",
                  "iast": "aṣṭāv aṅgāni",
                  "meaning": "the eight limbs are Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, and Samadhi"
                }
              ],
              "english": "The eight limbs of Yoga are: ethical restraints (Yama), personal observances (Niyama), physical posture (Asana), breath regulation (Pranayama), sensory withdrawal (Pratyahara), concentration (Dharana), meditation (Dhyana), and unitive absorption (Samadhi).",
              "hindi": "यम, नियम, आसन, प्राणायाम, प्रत्याहार, धारणा, ध्यान और समाधि—ये योग के आठ अंग हैं।",
              "commentary": "The complete roadmap of classical Ashtanga Yoga.",
              "audio": ""
            },
            {
              "id": "ys_2_46",
              "verse_number": "2.46",
              "citation": "Yoga Sutras 2.46",
              "meter": "Sūtra",
              "sanskrit": "स्थिरसुखमासनम् ॥",
              "transliteration": "sthira-sukham āsanam ||",
              "word_meanings": [
                {
                  "sanskrit": "स्थिर-सुखम्",
                  "iast": "sthira-sukham",
                  "meaning": "steady and comfortable"
                },
                {
                  "sanskrit": "आसनम्",
                  "iast": "āsanam",
                  "meaning": "posture"
                }
              ],
              "english": "Posture (Asana) should be both steady (sthira) and comfortable (sukha).",
              "hindi": "आसन स्थिर और सुखदायक होना चाहिए।",
              "commentary": "Easeful stability is the prerequisite for meditative transcendence.",
              "audio": ""
            }
          ]
        }
      ]
    },
    {
      "id": "ashtavakra_gita",
      "category_id": "philosophy_darshana",
      "category": "Philosophical Treatises",
      "title": "Ashtavakra Gita",
      "sanskrit_title": "अष्टावक्रगीता",
      "transliteration": "Aṣṭāvakragītā",
      "author": "Sage Ashtavakra",
      "tradition": "Advaita Vedanta",
      "era": "c. 500–100 BCE",
      "description": "The uncompromising masterwork of pure non-dual Advaita dialogue between Sage Ashtavakra and King Janaka declaring immediate liberation as pure awareness.",
      "epigraph": "मुक्ताभिमानी मुक्तो हि बद्धो बद्धाभिमान्यपि ।\nकिंवदन्तीह सत्येयं या मतिः सा गतिर्भवेत् ॥",
      "epigraph_translation": "If one thinks oneself free, one is free; if one thinks oneself bound, one remains bound. For here the saying is true: 'As one thinks, so one becomes.'",
      "chapters": [
        {
          "id": "ag_ch_01",
          "chapter_number": 1,
          "title": "Chapter 1: Direct Realization of Pure Awareness",
          "sanskrit_title": "प्रथमोऽध्यायः (आत्मसाक्षात्कारः)",
          "transliteration": "Prathamo 'dhyāyaḥ",
          "summary": "King Janaka asks how wisdom is attained, how liberation comes, and how renunciation is achieved. Ashtavakra directly answers that the Self is already free, pure consciousness, untouched by worldly attributes.",
          "verses": [
            {
              "id": "ag_1_1",
              "verse_number": "1.1",
              "citation": "Ashtavakra Gita 1.1",
              "meter": "Anuṣṭubh",
              "sanskrit": "जनक उवाच ।\nकथं ज्ञानमवाप्नोति कथं मुक्तिर्भविष्यति ।\nवैराग्यं च कथं प्राप्तमेतद्ब्रूहि मम प्रभो ॥",
              "transliteration": "janaka uvāca |\nkathaṁ jñānam avāpnoti kathaṁ muktir bhaviṣyati |\nvairāgyaṁ ca kathaṁ prāptam etad brūhi mama prabho ||",
              "word_meanings": [
                {
                  "sanskrit": "जनकः उवाच",
                  "iast": "janaka uvāca",
                  "meaning": "King Janaka said"
                },
                {
                  "sanskrit": "कथम् ज्ञानम् अवाप्नोति",
                  "iast": "kathaṁ jñānam avāpnoti",
                  "meaning": "how is wisdom attained?"
                },
                {
                  "sanskrit": "कथम् मुक्तिः भविष्यति",
                  "iast": "kathaṁ muktir bhaviṣyati",
                  "meaning": "how does liberation occur?"
                },
                {
                  "sanskrit": "वैराग्यम् च कथम् प्राप्तम्",
                  "iast": "vairāgyaṁ ca kathaṁ prāptam",
                  "meaning": "and how is dispassion achieved?"
                }
              ],
              "english": "King Janaka said: 'O Master, tell me how spiritual knowledge is attained, how liberation is achieved, and how dispassion is found?'",
              "hindi": "राजा जनक ने पूछा: 'हे प्रभु! ज्ञान कैसे प्राप्त होता है, मुक्ति कैसे मिलती है और वैराग्य कैसे प्राप्त किया जाता है—यह मुझे बताइए।'",
              "commentary": "The royal seeker's direct existential inquiry opening the Advaitic dialogue.",
              "audio": ""
            },
            {
              "id": "ag_1_4",
              "verse_number": "1.4",
              "citation": "Ashtavakra Gita 1.4",
              "meter": "Anuṣṭubh",
              "sanskrit": "यदि देहं पृथक् कृत्य चित्ति विश्राम्य तिष्ठसि ।\nअधुनैव सुखी शान्तो बन्धमुक्तो भविष्यसि ॥",
              "transliteration": "yadi dehaṁ pṛthak kṛtya citti viśrāmya tiṣṭhasi |\nadhunaiva sukhī śānto bandha-mukto bhaviṣyasi ||",
              "word_meanings": [
                {
                  "sanskrit": "यदि देहम् पृथक् कृत्य",
                  "iast": "yadi dehaṁ pṛthak kṛtya",
                  "meaning": "if separating yourself from the physical body"
                },
                {
                  "sanskrit": "चित्ति विश्राम्य तिष्ठसि",
                  "iast": "citti viśrāmya tiṣṭhasi",
                  "meaning": "you abide resting in pure consciousness"
                },
                {
                  "sanskrit": "अधुना एव सुखी शान्तः",
                  "iast": "adhunaiva sukhī śānto",
                  "meaning": "this very moment you shall be happy, peaceful"
                },
                {
                  "sanskrit": "बन्ध-मुक्तः भविष्यसि",
                  "iast": "bandha-mukto bhaviṣyasi",
                  "meaning": "and liberated from all bondage"
                }
              ],
              "english": "If you simply separate yourself from the body and abide resting in pure consciousness, this very moment you will become happy, peaceful, and liberated from all bondage!",
              "hindi": "यदि तुम स्वयं को शरीर से पृथक करके केवल शुद्ध चैतन्य में विश्राम करो, तो इसी क्षण तुम सुखी, शान्त और बन्धनमुक्त हो जाओगे!",
              "commentary": "Sadyo-Mukti (instant liberation): bondage is an optical illusion of identification.",
              "audio": ""
            }
          ]
        }
      ]
    },
    {
      "id": "natya_shastra",
      "category_id": "classical_shastras",
      "category": "Classical Manuscripts & Shastras",
      "title": "Natya Shastra",
      "sanskrit_title": "नाट्यशास्त्रम्",
      "transliteration": "Nāṭyaśāstram",
      "author": "Bharata Muni",
      "tradition": "Gandharva Veda / Sahitya Shastra",
      "era": "c. 200 BCE – 200 CE",
      "description": "The monumental encyclopedic treatise on classical Indian performing arts, dramaturgy, aesthetics, dance, and music, formulating the immortal Rasa theory.",
      "epigraph": "न हि रसादृते कश्चिदर्थः प्रवर्तते ॥",
      "epigraph_translation": "No dramatic meaning or artistic expression can proceed without Rasa (aesthetic essence).",
      "chapters": [
        {
          "id": "ns_rasa_adhyaya",
          "chapter_number": 6,
          "title": "Rasa Adhyaya: Aesthetic Theory & The Rasa Sutra",
          "sanskrit_title": "रसाध्यायः (षष्ठोऽध्यायः)",
          "transliteration": "Rasādhyāyaḥ",
          "summary": "Bharata Muni formulates the seminal Rasa Sutra explaining how aesthetic experience (Rasa) arises through the combination of Vibhavas (determinants), Anubhavas (consequents), and Vyabhichari Bhavas (transitory emotions).",
          "verses": [
            {
              "id": "ns_6_31",
              "verse_number": "6.31",
              "citation": "Natya Shastra 6.31 (Rasa Sutra)",
              "meter": "Sūtra & Anuṣṭubh",
              "sanskrit": "तत्र विभावानुभावव्यभिचारिसंयोगाद्रसनिष्पत्तिः ॥",
              "transliteration": "tatra vibhāvānubhāva-vyabhicāri-saṁyogād rasa-niṣpattiḥ ||",
              "word_meanings": [
                {
                  "sanskrit": "विभाव-अनुभाव-व्यभिचारि-संयोगात्",
                  "iast": "vibhāva-anubhāva-vyabhicāri-saṁyogāt",
                  "meaning": "from the combination of determinants, physical consequents, and transitory emotions"
                },
                {
                  "sanskrit": "रस-निष्पत्तिः",
                  "iast": "rasa-niṣpattiḥ",
                  "meaning": "the aesthetic essence (Rasa) is produced / realized"
                }
              ],
              "english": "Aesthetic essence (Rasa) arises from the harmonious combination of dramatic determinants (Vibhavas), expressive consequents (Anubhavas), and transitory emotional states (Vyabhichari Bhavas).",
              "hindi": "विभाव (कारण), अनुभाव (शारीरिक चेष्टाएँ) और व्यभिचारी भावों (क्षणिक भावों) के संयोग से रस की निष्पत्ति (अनुभूति) होती है।",
              "commentary": "The foundational aesthetic principle of Indian civilization: art transforms personal emotion into universal aesthetic bliss (Ananda).",
              "audio": ""
            }
          ]
        }
      ]
    },
    {
      "id": "arthashastra",
      "category_id": "classical_shastras",
      "category": "Classical Manuscripts & Shastras",
      "title": "Arthashastra of Kautilya",
      "sanskrit_title": "कौटिलीयम् अर्थशास्त्रम्",
      "transliteration": "Kauṭilīyam Arthaśāstram",
      "author": "Kautilya (Chanakya / Vishnugupta)",
      "tradition": "Niti & Artha Shastra",
      "era": "c. 350–275 BCE",
      "description": "The masterwork on political economy, statecraft, administrative governance, legal systems, diplomacy, and ethical leadership.",
      "epigraph": "प्रजासुखे सुखं राज्ञः प्रजानां च हिते हितम् ।\nनात्मप्रियं हितं राज्ञः प्रजानां तु प्रियं हितम् ॥",
      "epigraph_translation": "In the happiness of his citizens lies the king's happiness; in their welfare his welfare. He shall not consider as good only what pleases him, but what pleases his citizens.",
      "chapters": [
        {
          "id": "as_book_1",
          "chapter_number": 1,
          "title": "Adhyakshaprachara: Duties of Leadership & Governance",
          "sanskrit_title": "अध्यक्षप्रचारः (राजधर्मः एवं प्रजापालनम्)",
          "transliteration": "Adhyakṣapracāraḥ",
          "summary": "Kautilya articulates the supreme ethical maxim of public service: the ruler exists solely for the welfare, protection, and prosperity of the people.",
          "verses": [
            {
              "id": "as_1_19_34",
              "verse_number": "1.19.34",
              "citation": "Arthashastra 1.19.34",
              "meter": "Anuṣṭubh",
              "sanskrit": "प्रजासुखे सुखं राज्ञः प्रजानां च हिते हितम् ।\nनात्मप्रियं हितं राज्ञः प्रजानां तु प्रियं हितम् ॥",
              "transliteration": "prajā-sukhe sukhaṁ rājñaḥ prajānāṁ ca hite hitam |\nnātma-priyaṁ hitaṁ rājñaḥ prajānāṁ tu priyaṁ hitam ||",
              "word_meanings": [
                {
                  "sanskrit": "प्रजा-सुखे सुखम् राज्ञः",
                  "iast": "prajā-sukhe sukhaṁ rājñaḥ",
                  "meaning": "in the happiness of the subjects lies the king's happiness"
                },
                {
                  "sanskrit": "प्रजानाम् च हिते हितम्",
                  "iast": "prajānāṁ ca hite hitam",
                  "meaning": "in their welfare lies his true welfare"
                },
                {
                  "sanskrit": "प्रजानाम् तु प्रियम् हितम्",
                  "iast": "prajānāṁ tu priyaṁ hitam",
                  "meaning": "whatever is beneficial to the subjects is his true good"
                }
              ],
              "english": "In the happiness of his subjects lies the ruler's true happiness; in their welfare, his own welfare. What pleases himself is not truly beneficial to the king; whatever pleases and uplifts his citizens is his true benefit.",
              "hindi": "प्रजा के सुख में ही राजा का सच्चा सुख है; प्रजा के कल्याण में ही उसका कल्याण है। जो स्वयं को प्रिय लगे वह राजा के लिए हितकर नहीं है, बल्कि जो प्रजा को प्रिय और कल्याणकारी हो, वही राजा का वास्तविक हित है।",
              "commentary": "The foundational principle of Raja-Dharma in ancient Indian political philosophy: servant leadership and absolute accountability.",
              "audio": ""
            }
          ]
        }
      ]
    }
  ]
};
