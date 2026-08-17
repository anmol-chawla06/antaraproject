# -*- coding: utf-8 -*-
"""
Bhagavad Gita Data Builder
Exhaustive individual verse structures for Chapters 1, 2, 3, 4, 7, 9, 12, and 18.
Each verse includes Devanagari Sanskrit, IAST Transliteration, Anvaya (Word Meanings),
English translation, Hindi translation, and Philosophical commentary.
"""

def get_bhagavad_gita():
    return {
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
            # =========================================================================
            # CHAPTER 1: ARJUNA VISHADA YOGA
            # =========================================================================
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
                            {"sanskrit": "धृतराष्ट्रः उवाच", "iast": "dhṛtarāṣṭraḥ uvāca", "meaning": "King Dhritarashtra said"},
                            {"sanskrit": "धर्मक्षेत्रे", "iast": "dharma-kṣetre", "meaning": "in the field of righteousness"},
                            {"sanskrit": "कुरुक्षेत्रे", "iast": "kuru-kṣetre", "meaning": "in the land of Kurukshetra"},
                            {"sanskrit": "समवेताः युयुत्सवः", "iast": "samavetāḥ yuyutsavaḥ", "meaning": "assembled eager for battle"},
                            {"sanskrit": "मामकाः पाण्डवाः च एव", "iast": "māmakāḥ pāṇḍavāḥ ca eva", "meaning": "my sons and Pandu's sons indeed"},
                            {"sanskrit": "किम् अकुर्वत सञ्जय", "iast": "kim akurvata sañjaya", "meaning": "what did they do, O Sanjaya?"}
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
                            {"sanskrit": "सञ्जयः उवाच", "iast": "sañjayaḥ uvāca", "meaning": "Sanjaya said"},
                            {"sanskrit": "दृष्ट्वा तु पाण्डवानीकम्", "iast": "dṛṣṭvā tu pāṇḍavānīkam", "meaning": "having seen the army of the Pandavas"},
                            {"sanskrit": "व्यूढम्", "iast": "vyūḍham", "meaning": "drawn up in strategic battle formation"},
                            {"sanskrit": "दुर्योधनः तदा", "iast": "duryodhanaḥ tadā", "meaning": "Duryodhana then"},
                            {"sanskrit": "आचार्यम् उपसङ्गम्य", "iast": "ācāryam upasaṅgamya", "meaning": "approaching his preceptor Drona"},
                            {"sanskrit": "राजा वचनम् अब्रवीत्", "iast": "rājā vacanam abravīt", "meaning": "the king spoke these words"}
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
                            {"sanskrit": "ततः", "iast": "tataḥ", "meaning": "thereafter"},
                            {"sanskrit": "श्वेतैः हयैः युक्ते", "iast": "śvetaiḥ hayaiḥ yukte", "meaning": "yoked with white horses"},
                            {"sanskrit": "महति स्यन्दने स्थितौ", "iast": "mahati syandane sthitau", "meaning": "seated in a magnificent chariot"},
                            {"sanskrit": "माधवः पाण्डवः च एव", "iast": "mādhavaḥ pāṇḍavaḥ ca eva", "meaning": "Lord Krishna and Arjuna indeed"},
                            {"sanskrit": "दिव्यौ शङ्खौ प्रदध्मतुः", "iast": "divyau śaṅkhau pradadhmatuḥ", "meaning": "blew their divine conch shells"}
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
                            {"sanskrit": "अर्जुनः उवाच", "iast": "arjunaḥ uvāca", "meaning": "Arjuna said"},
                            {"sanskrit": "सेनयोः उभयोः मध्ये", "iast": "senayoḥ ubhayoḥ madhye", "meaning": "between both armies"},
                            {"sanskrit": "रथम् स्थापय मे अच्युत", "iast": "ratham sthāpaya me acyuta", "meaning": "station my chariot, O Infallible One"},
                            {"sanskrit": "यावत् एतान् निरीक्षे अहम्", "iast": "yāvat etān nirīkṣe aham", "meaning": "until I may scrutinize all these"},
                            {"sanskrit": "योद्धुकामान् अवस्थितान्", "iast": "yoddhu-kāmān avasthitān", "meaning": "standing eager for combat"}
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
                            {"sanskrit": "अर्जुनः उवाच", "iast": "arjunaḥ uvāca", "meaning": "Arjuna said"},
                            {"sanskrit": "दृष्ट्वा इमम् स्वजनम्", "iast": "dṛṣṭvā imam svajanam", "meaning": "seeing these my own kinsmen"},
                            {"sanskrit": "कृष्ण", "iast": "kṛṣṇa", "meaning": "O Krishna"},
                            {"sanskrit": "युयुत्सुम् समुपस्थितम्", "iast": "yuyutsum samupasthitam", "meaning": "standing eager to fight"},
                            {"sanskrit": "सीदन्ति मम गात्राणि", "iast": "sīdanti mama gātrāṇi", "meaning": "my limbs fail and tremble"},
                            {"sanskrit": "मुखम् च परिशुष्यति", "iast": "mukham ca pariśuṣyati", "meaning": "and my mouth is completely parched"}
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
                            {"sanskrit": "वेपथुः च शरीरे मे", "iast": "vepathuḥ ca śarīre me", "meaning": "there is trembling in my body"},
                            {"sanskrit": "रोमहर्षः च जायते", "iast": "roma-harṣaḥ ca jāyate", "meaning": "and my hair stands on end"},
                            {"sanskrit": "गाण्डीवम् स्रंसते हस्तात्", "iast": "gāṇḍīvam sraṁsate hastāt", "meaning": "the bow Gandiva slips from my hand"},
                            {"sanskrit": "त्वक् च एव परिदह्यते", "iast": "tvak ca eva paridahyate", "meaning": "and my skin is burning all over"}
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
                            {"sanskrit": "न च शक्नोमि अवस्थातुम्", "iast": "na ca śaknomi avasthātum", "meaning": "nor am I able to remain standing"},
                            {"sanskrit": "भ्रमति इव च मे मनः", "iast": "bhramati iva ca me manaḥ", "meaning": "and my mind seems to be reeling"},
                            {"sanskrit": "निमित्तानि च पश्यामि", "iast": "nimittāni ca paśyāmi", "meaning": "and I perceive omens"},
                            {"sanskrit": "विपरीतानि केशव", "iast": "viparītāni keśava", "meaning": "which are adverse, O Keshava"}
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
                            {"sanskrit": "सञ्जयः उवाच", "iast": "sañjayaḥ uvāca", "meaning": "Sanjaya said"},
                            {"sanskrit": "एवम् उक्त्वा अर्जुनः", "iast": "evam uktvā arjunaḥ", "meaning": "having spoken thus, Arjuna"},
                            {"sanskrit": "सङ्ख्ये", "iast": "saṅkhye", "meaning": "in the midst of battle"},
                            {"sanskrit": "रथोपस्थे उपाविशत्", "iast": "ratha-upasthe upāviśat", "meaning": "sat down on the seat of the chariot"},
                            {"sanskrit": "विसृज्य स-शरम् चापम्", "iast": "visṛjya sa-śaram cāpam", "meaning": "casting aside his bow and arrows"},
                            {"sanskrit": "शोक-संविग्न-मानसः", "iast": "śoka-saṁvigna-mānasaḥ", "meaning": "his mind overwhelmed with grief"}
                        ],
                        "english": "Sanjaya said: Having spoken thus on the battlefield, Arjuna cast aside his bow and arrows and sank down upon the chariot seat, his mind overwhelmed with sorrow.",
                        "hindi": "सञ्जय बोले: युद्धभूमि में इस प्रकार कहकर शोकमग्न चित्त वाले अर्जुन बाणों सहित धनुष को त्यागकर रथ के पिछले भाग में बैठ गए।",
                        "commentary": "The culmination of Chapter 1. The total exhaustion of the ego sets the stage for spiritual illumination in Chapter 2.",
                        "audio": ""
                    }
                ]
            },

            # =========================================================================
            # CHAPTER 2: SANKHYA YOGA
            # =========================================================================
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
                            {"sanskrit": "श्रीभगवान् उवाच", "iast": "śrī-bhagavān uvāca", "meaning": "The Supreme Lord said"},
                            {"sanskrit": "कुतः त्वा कश्मलम् इदम्", "iast": "kutas tvā kaśmalam idam", "meaning": "whence has this delusion come upon you"},
                            {"sanskrit": "विषमे समुपस्थितम्", "iast": "viṣame samupasthitam", "meaning": "arrived at this critical juncture"},
                            {"sanskrit": "अनार्य-जुष्टम्", "iast": "anārya-juṣṭam", "meaning": "unbecoming of an Arya (noble soul)"},
                            {"sanskrit": "अस्वर्ग्यम् अकीर्तिकरम्", "iast": "asvargyam akīrti-karam", "meaning": "barring heaven and causing dishonor"}
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
                            {"sanskrit": "क्लैब्यम् मा स्म गमः", "iast": "klaibyam mā sma gamaḥ", "meaning": "do not yield to unmanliness / impotence"},
                            {"sanskrit": "पार्थ न एतत् त्वयि उपपद्यते", "iast": "pārtha na etat tvayi upapadyate", "meaning": "O Partha, this does not befit you"},
                            {"sanskrit": "क्षुद्रम् हृदय-दौर्बल्यम्", "iast": "kṣudram hṛdaya-daurbalyam", "meaning": "this petty weakness of heart"},
                            {"sanskrit": "त्यक्त्वा उत्तिष्ठ परन्तप", "iast": "tyaktvā uttiṣṭha parantapa", "meaning": "casting aside, arise, O scorcher of foes!"}
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
                            {"sanskrit": "कार्पण्य-दोष-उपहत-स्वभावः", "iast": "kārpaṇya-doṣa-upahata-svabhāvaḥ", "meaning": "with my natural disposition stricken by the flaw of helplessness"},
                            {"sanskrit": "पृच्छामि त्वाम्", "iast": "pṛcchāmi tvām", "meaning": "I ask You"},
                            {"sanskrit": "धर्म-संमूढ-चेताः", "iast": "dharma-sammūḍha-cetāḥ", "meaning": "with mind bewildered regarding righteous duty"},
                            {"sanskrit": "यत् श्रेयः स्यात् निश्चितम्", "iast": "yat śreyaḥ syāt niścitam", "meaning": "whatever is definitely the highest good"},
                            {"sanskrit": "ब्रूहि तत् मे", "iast": "brūhi tat me", "meaning": "tell that to me"},
                            {"sanskrit": "शिष्यः ते अहम्", "iast": "śiṣyaḥ te aham", "meaning": "I am Your disciple"},
                            {"sanskrit": "शाधि माम् त्वाम् प्रपन्नम्", "iast": "śādhi mām tvām prapannam", "meaning": "instruct me who have surrendered unto You"}
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
                            {"sanskrit": "श्रीभगवान् उवाच", "iast": "śrī-bhagavān uvāca", "meaning": "The Supreme Lord said"},
                            {"sanskrit": "अशोच्यान् अन्वशोचः त्वम्", "iast": "aśocyān anvaśocaḥ tvam", "meaning": "you grieve for those not worthy of grief"},
                            {"sanskrit": "प्रज्ञा-वादान् च भाषसे", "iast": "prajñā-vādān ca bhāṣase", "meaning": "yet you speak words of wisdom"},
                            {"sanskrit": "गतासून् अगतासून् च", "iast": "gatāsūn agatāsūn ca", "meaning": "for the departed and for the living"},
                            {"sanskrit": "न अनुशोचन्ति पण्डिताः", "iast": "na anuśocanti paṇḍitāḥ", "meaning": "the truly wise do not grieve"}
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
                            {"sanskrit": "न तु एव अहम् जातु न आसम्", "iast": "na tu eva aham jātu na āsam", "meaning": "never was there a time when I did not exist"},
                            {"sanskrit": "न त्वम् न इमे जनाधिपाः", "iast": "na tvam na ime janādhipāḥ", "meaning": "nor you, nor all these kings"},
                            {"sanskrit": "न च एव न भविष्यामः", "iast": "na ca eva na bhaviṣyāmaḥ", "meaning": "nor shall we ever cease to be"},
                            {"sanskrit": "सर्वे वयम् अतः परम्", "iast": "sarve vayam ataḥ param", "meaning": "all of us hereafter"}
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
                            {"sanskrit": "देहिनः अस्मिन् यथा देहे", "iast": "dehinaḥ asmin yathā dehe", "meaning": "just as the embodied Self passes through in this body"},
                            {"sanskrit": "कौमारम् यौवनम् जरा", "iast": "kaumāram yauvanam jarā", "meaning": "childhood, youth, and old age"},
                            {"sanskrit": "तथा देहान्तर-प्राप्तिः", "iast": "tathā dehāntara-prāptiḥ", "meaning": "similarly is the attainment of another body"},
                            {"sanskrit": "धीरः तत्र न मुह्यति", "iast": "dhīraḥ tatra na muhyati", "meaning": "the steady-minded person is not deluded thereby"}
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
                            {"sanskrit": "मात्रा-स्पर्शाः तु", "iast": "mātrā-sparśāḥ tu", "meaning": "contact of the senses with their objects"},
                            {"sanskrit": "शीत-उष्ण-सुख-दुःख-दाः", "iast": "śīta-uṣṇa-sukha-duḥkha-dāḥ", "meaning": "givers of cold, heat, pleasure, and pain"},
                            {"sanskrit": "आगम-अपायिनः अनित्याः", "iast": "āgama-apāyinaḥ anityāḥ", "meaning": "having a beginning and an end, transient"},
                            {"sanskrit": "तान् तितिक्षस्व भारत", "iast": "tān titikṣasva bhārata", "meaning": "endure them patiently, O descendant of Bharata"}
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
                            {"sanskrit": "न जायते म्रियते वा कदाचित्", "iast": "na jāyate mriyate vā kadācit", "meaning": "it is neither born nor does it ever die"},
                            {"sanskrit": "न अयम् भूत्वा भविता वा न भूयः", "iast": "na ayam bhūtvā bhavitā vā na bhūyaḥ", "meaning": "having come to be, it will never cease to be"},
                            {"sanskrit": "अजः नित्यः शाश्वतः अयम् पुराणः", "iast": "ajaḥ nityaḥ śāśvataḥ ayam purāṇaḥ", "meaning": "unborn, eternal, ever-existing, primeval"},
                            {"sanskrit": "न हन्यते हन्यमाने शरीरे", "iast": "na hanyate hanyamāne śarīre", "meaning": "it is not slain when the body is slain"}
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
                            {"sanskrit": "वासांसि जीर्णानि यथा विहाय", "iast": "vāsāṁsi jīrṇāni yathā vihāya", "meaning": "just as casting off worn-out garments"},
                            {"sanskrit": "नवानि गृह्णाति नरः अपराणि", "iast": "navāni gṛhṇāti naro 'parāṇi", "meaning": "a person takes on new ones"},
                            {"sanskrit": "तथा शरीराणि विहाय जीर्णानि", "iast": "tathā śarīrāṇi vihāya jīrṇāni", "meaning": "so discarding worn-out bodies"},
                            {"sanskrit": "अन्यानि संयाति नवानि देही", "iast": "anyāni saṁyāti navāni dehī", "meaning": "the embodied soul enters into new ones"}
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
                            {"sanskrit": "न एनम् छिन्दन्ति शस्त्राणि", "iast": "na enam chindanti śastrāṇi", "meaning": "weapons cannot cut It"},
                            {"sanskrit": "न एनम् दहति पावकः", "iast": "na enam dahati pāvakaḥ", "meaning": "fire cannot burn It"},
                            {"sanskrit": "न च एनम् क्लेदयन्ति आपः", "iast": "na ca enam kledayanti āpaḥ", "meaning": "water cannot wet It"},
                            {"sanskrit": "न शोषयति मारुतः", "iast": "na śoṣayati mārutaḥ", "meaning": "nor can wind dry It"}
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
                            {"sanskrit": "कर्मणि एव अधिकारः ते", "iast": "karmaṇi eva adhikāraḥ te", "meaning": "in action alone is your right"},
                            {"sanskrit": "मा फलेषु कदाचन", "iast": "mā phaleṣu kadācana", "meaning": "never in its fruits"},
                            {"sanskrit": "मा कर्म-फल-हेतुः भूः", "iast": "mā karma-phala-hetuḥ bhūḥ", "meaning": "do not let the fruit of action be your motive"},
                            {"sanskrit": "मा ते सङ्गः अस्तु अकर्मणि", "iast": "mā te saṅgaḥ astu akarmaṇi", "meaning": "nor let your attachment be to inaction"}
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
                            {"sanskrit": "योग-स्थः कुरु कर्माणि", "iast": "yoga-sthaḥ kuru karmāṇi", "meaning": "established in yoga, perform actions"},
                            {"sanskrit": "सङ्गम् त्यक्त्वा धनञ्जय", "iast": "saṅgam tyaktvā dhanañjaya", "meaning": "abandoning attachment, O Dhananjaya"},
                            {"sanskrit": "सिद्धि-असिद्ध्योः समः भूत्वा", "iast": "siddhi-asiddhyoḥ samaḥ bhūtvā", "meaning": "remaining even-minded in success and failure"},
                            {"sanskrit": "समत्वम् योगः उच्यते", "iast": "samatvam yogaḥ ucyate", "meaning": "equanimity of mind is called Yoga"}
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
                            {"sanskrit": "बुद्धि-युक्तः", "iast": "buddhi-yuktaḥ", "meaning": "endowed with evenness of wisdom"},
                            {"sanskrit": "जहाति इह उभे सुकृत-दुष्कृते", "iast": "jahāti iha ubhe sukṛta-duṣkṛte", "meaning": "casts off both good and evil deeds here"},
                            {"sanskrit": "तस्मात् योगाय युज्यस्व", "iast": "tasmāt yogāya yujyasva", "meaning": "therefore dedicate yourself to Yoga"},
                            {"sanskrit": "योगः कर्मसु कौशलम्", "iast": "yogaḥ karmasu kauśalam", "meaning": "Yoga is dexterity / skill in action"}
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
                            {"sanskrit": "श्रीभगवान् उवाच", "iast": "śrī-bhagavān uvāca", "meaning": "The Supreme Lord said"},
                            {"sanskrit": "प्रजहाति यदा कामान् सर्वान्", "iast": "prajahāti yadā kāmān sarvān", "meaning": "when one completely casts off all desires"},
                            {"sanskrit": "मनोगतान्", "iast": "mano-gatān", "meaning": "dwelling in the mind"},
                            {"sanskrit": "आत्मनि एव आत्मना तुष्टः", "iast": "ātmani eva ātmanā tuṣṭaḥ", "meaning": "satisfied in the Self alone by the Self"},
                            {"sanskrit": "स्थित-प्रज्ञः तदा उच्यते", "iast": "sthita-prajñaḥ tadā ucyate", "meaning": "then is one called a person of steady wisdom"}
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
                            {"sanskrit": "दुःखेषु अनुद्विग्न-मनाः", "iast": "duḥkheṣu anudvigna-manāḥ", "meaning": "whose mind is unshaken in adversity"},
                            {"sanskrit": "सुखेषु विगत-स्पृहः", "iast": "sukheṣu vigata-spṛhaḥ", "meaning": "who has no craving in prosperity"},
                            {"sanskrit": "वीत-राग-भय-क्रोधः", "iast": "vīta-rāga-bhaya-krodhaḥ", "meaning": "freed from attachment, fear, and anger"},
                            {"sanskrit": "स्थित-धीः मुनिः उच्यते", "iast": "sthita-dhīḥ munir ucyate", "meaning": "is called a sage of steady intellect"}
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
                            {"sanskrit": "ध्यायतः विषयान् पुंसः", "iast": "dhyāyataḥ viṣayān puṁsaḥ", "meaning": "for a person contemplating sense objects"},
                            {"sanskrit": "सङ्गः तेषु उपजायते", "iast": "saṅgaḥ teṣu upajāyate", "meaning": "attachment to them develops"},
                            {"sanskrit": "सङ्गात् सञ्जायते कामः", "iast": "saṅgāt sañjāyate kāmaḥ", "meaning": "from attachment arises desire"},
                            {"sanskrit": "कामात् क्रोधः अभिजायते", "iast": "kāmāt krodhaḥ abhijāyate", "meaning": "from thwarted desire anger is born"}
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
                            {"sanskrit": "क्रोधात् भवति संमोहः", "iast": "krodhāt bhavati sammohaḥ", "meaning": "from anger arises delusion"},
                            {"sanskrit": "संमोहात् स्मृति-विभ्रमः", "iast": "sammohāt smṛti-vibhramaḥ", "meaning": "from delusion loss of memory"},
                            {"sanskrit": "स्मृति-भ्रंशात् बुद्धि-नाशः", "iast": "smṛti-bhraṁśāt buddhi-nāśaḥ", "meaning": "from loss of memory destruction of intellect"},
                            {"sanskrit": "बुद्धि-नाशात् प्रणश्यति", "iast": "buddhi-nāśāt praṇaśyati", "meaning": "from ruin of intellect one is lost"}
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
                            {"sanskrit": "आपूर्यमाणम् अचल-प्रतिष्ठम्", "iast": "āpūryamāṇam acala-pratiṣṭham", "meaning": "ever full yet motionless and unshaken"},
                            {"sanskrit": "समुद्रम् आपः प्रविशन्ति यद्वत्", "iast": "samudram āpaḥ praviśanti yadvat", "meaning": "just as waters flow into the ocean"},
                            {"sanskrit": "तद्वत् कामाः यम् प्रविशन्ति सर्वे", "iast": "tadvat kāmāḥ yam praviśanti sarve", "meaning": "so into whom all desires enter without disturbing him"},
                            {"sanskrit": "सः शान्तिम् आप्नोति", "iast": "saḥ śāntim āpnoti", "meaning": "he attains peace"},
                            {"sanskrit": "न काम-कामी", "iast": "na kāma-kāmī", "meaning": "not he who craves desires"}
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
                            {"sanskrit": "विहाय कामान् यः सर्वान्", "iast": "vihāya kāmān yaḥ sarvān", "meaning": "who, casting off all desires"},
                            {"sanskrit": "पुमान् चरति निःस्पृहः", "iast": "pumān carati niḥspṛhaḥ", "meaning": "moves about free from longing"},
                            {"sanskrit": "निर्ममः निरहङ्कारः", "iast": "nirmamaḥ nirahaṅkāraḥ", "meaning": "without the sense of 'mine' and free from egoism"},
                            {"sanskrit": "सः शान्तिम् अधिगच्छति", "iast": "saḥ śāntim adhigacchati", "meaning": "he attains supreme peace"}
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
                            {"sanskrit": "एषा ब्राह्मी स्थितिः पार्थ", "iast": "eṣā brāhmī sthitiḥ pārtha", "meaning": "this is the state of abiding in Brahman, O Partha"},
                            {"sanskrit": "न एनाम् प्राप्य विमुह्यति", "iast": "na enām prāpya vimuhyati", "meaning": "having attained this, one is never deluded again"},
                            {"sanskrit": "स्थित्वा अस्याम् अन्त-काले अपि", "iast": "sthitvā asyām anta-kāle api", "meaning": "established in this even at the final hour of death"},
                            {"sanskrit": "ब्रह्म-निर्वाणम् ऋच्छति", "iast": "brahma-nirvāṇam ṛcchati", "meaning": "one attains liberation in Brahman (Brahma-nirvana)"}
                        ],
                        "english": "This, O Partha, is the state of abiding in Brahman (Brahmi Sthiti). Having attained this, one is never deluded again. Being established in this even at the final hour of death, one attains liberation in Brahman (Brahma-Nirvana).",
                        "hindi": "हे पार्थ! यह ब्रह्म में स्थित पुरुष की स्थिति है; इसको प्राप्त होकर मनुष्य कभी मोहित नहीं होता। अन्तकाल में भी इस स्थिति में स्थित होकर वह ब्रह्म-निर्वाण (परम मोक्ष) को प्राप्त हो जाता है।",
                        "commentary": "Brahmi Sthiti: the culmination of Chapter 2, where consciousness merges in non-dual immortality.",
                        "audio": ""
                    }
                ]
            },

            # =========================================================================
            # CHAPTER 3: KARMA YOGA
            # =========================================================================
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
                            {"sanskrit": "न कर्मणाम् अनारम्भात्", "iast": "na karmaṇām anārambhāt", "meaning": "not by abstaining from actions"},
                            {"sanskrit": "नैष्कर्म्यम् पुरुषः अश्नुते", "iast": "naiṣkarmyam puruṣo 'śnute", "meaning": "does a person attain actionlessness"},
                            {"sanskrit": "न च संन्यसनात् एव", "iast": "na ca sannyasanād eva", "meaning": "nor by mere external renunciation"},
                            {"sanskrit": "सिद्धिम् समधिगच्छति", "iast": "siddhim samadhigacchati", "meaning": "does one attain spiritual perfection"}
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
                            {"sanskrit": "नियतम् कुरु कर्म त्वम्", "iast": "niyatam kuru karma tvam", "meaning": "perform your prescribed duties"},
                            {"sanskrit": "कर्म ज्यायः हि अकर्मणः", "iast": "karma jyāyaḥ hi akarmaṇaḥ", "meaning": "for action is indeed superior to inaction"},
                            {"sanskrit": "शरीर-यात्रा अपि च ते", "iast": "śarīra-yātrā api ca te", "meaning": "even the maintenance of your body"},
                            {"sanskrit": "न प्रसिद्ध्येत् अकर्मणः", "iast": "na prasiddhyet akarmaṇaḥ", "meaning": "would not be possible without action"}
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
                            {"sanskrit": "यज्ञ-अर्थात् कर्मणः अन्यत्र", "iast": "yajña-arthāt karmaṇaḥ anyatra", "meaning": "work done other than as a sacred offering (Yajna)"},
                            {"sanskrit": "लोकः अयम् कर्म-बन्धनः", "iast": "loko 'yam karma-bandhanaḥ", "meaning": "this world is bound by action"},
                            {"sanskrit": "तद्-अर्थम् कर्म कौन्तेय", "iast": "tad-artham karma kaunteya", "meaning": "for that purpose (as an offering), O Kaunteya"},
                            {"sanskrit": "मुक्त-सङ्गः समाचर", "iast": "mukta-saṅgaḥ samācara", "meaning": "perform work free from all attachment"}
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
                            {"sanskrit": "तस्मात् असक्तः सततम्", "iast": "tasmāt asaktaḥ satatam", "meaning": "therefore, unattached, continually"},
                            {"sanskrit": "कार्यम् कर्म समाचर", "iast": "kāryam karma samācara", "meaning": "perform the obligatory duty"},
                            {"sanskrit": "असक्तः हि आचरन् कर्म", "iast": "asakto hy ācaran karma", "meaning": "for performing action without attachment"},
                            {"sanskrit": "परम् आप्नोति पूरुषः", "iast": "param āpnoti pūruṣaḥ", "meaning": "a person attains the Supreme"}
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
                            {"sanskrit": "यत् यत् आचरति श्रेष्ठः", "iast": "yad yad ācarati śreṣṭhaḥ", "meaning": "whatever standard a great person sets by action"},
                            {"sanskrit": "तत् तत् एव इतरः जनः", "iast": "tat tad eva itaro janaḥ", "meaning": "that very standard other people follow"},
                            {"sanskrit": "सः यत् प्रमाणम् कुरुते", "iast": "saḥ yat pramāṇam kurute", "meaning": "whatever benchmark he establishes"},
                            {"sanskrit": "लोकः तत् अनुवर्तते", "iast": "lokas tad anuvartate", "meaning": "the world emulates and follows"}
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
                            {"sanskrit": "प्रकृतेः गुणैः", "iast": "prakṛteḥ guṇaiḥ", "meaning": "by the modes (gunas) of Nature"},
                            {"sanskrit": "क्रियमाणानि कर्माणि सर्वशः", "iast": "kriyamāṇāni karmāṇi sarvaśaḥ", "meaning": "all actions everywhere are being performed"},
                            {"sanskrit": "अहङ्कार-विमूढ-आत्मा", "iast": "ahaṅkāra-vimūḍha-ātmā", "meaning": "one bewildered by the false ego"},
                            {"sanskrit": "कर्ता अहम् इति मन्यते", "iast": "kartā aham iti manyate", "meaning": "thinks 'I am the doer'"}
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
                            {"sanskrit": "श्रेयान् स्व-धर्मः विगुणः", "iast": "śreyān sva-dharmaḥ viguṇaḥ", "meaning": "better is one's own natural duty, even if devoid of merit"},
                            {"sanskrit": "पर-धर्मात् सु-अनुष्ठितात्", "iast": "para-dharmāt su-anuṣṭhitāt", "meaning": "than another's duty well-performed"},
                            {"sanskrit": "स्व-धर्मे निधनम् श्रेयः", "iast": "sva-dharme nidhanam śreyaḥ", "meaning": "death in one's own duty is auspicious"},
                            {"sanskrit": "पर-धर्मः भय-आवहः", "iast": "para-dharmaḥ bhaya-āvahaḥ", "meaning": "another's duty is fraught with peril"}
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
                            {"sanskrit": "इन्द्रियाणि पराणि आहुः", "iast": "indriyāṇi parāṇi āhuḥ", "meaning": "the senses are said to be superior to matter"},
                            {"sanskrit": "इन्द्रियेभ्यः परम् मनः", "iast": "indriyebhyaḥ param manaḥ", "meaning": "superior to the senses is the mind"},
                            {"sanskrit": "मनसः तु परा बुद्धिः", "iast": "manasaḥ tu parā buddhiḥ", "meaning": "superior to the mind is the intellect"},
                            {"sanskrit": "यः बुद्धेः परतः तु सः", "iast": "yaḥ buddheḥ parataḥ tu saḥ", "meaning": "and that which is beyond the intellect is the Self"}
                        ],
                        "english": "The senses are superior to physical matter; superior to the senses is the mind; superior to the mind is the intellect (Buddhi); and that which is even beyond the intellect is the Self (Atman).",
                        "hindi": "इन्द्रियों को स्थूल शरीर से श्रेष्ठ कहते हैं, इन्द्रियों से श्रेष्ठ मन है, मन से श्रेष्ठ बुद्धि है और जो बुद्धि से भी परे है, वह आत्मा है।",
                        "commentary": "The internal hierarchy of human consciousness enabling self-mastery through soul-awareness.",
                        "audio": ""
                    }
                ]
            },

            # =========================================================================
            # CHAPTER 4: JNANA KARMA SANYASA YOGA
            # =========================================================================
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
                            {"sanskrit": "यदा यदा हि धर्मस्य", "iast": "yadā yadā hi dharmasya", "meaning": "whenever indeed of righteousness (Dharma)"},
                            {"sanskrit": "ग्लानिः भवति भारत", "iast": "glāniḥ bhavati bhārata", "meaning": "there is a decline, O descendant of Bharata"},
                            {"sanskrit": "अभ्युत्थानम् अधर्मस्य", "iast": "abhyutthānam adharmasya", "meaning": "and an ascendance of unrighteousness"},
                            {"sanskrit": "तदा आत्मानम् सृजामि अहम्", "iast": "tadā ātmānam sṛjāmi aham", "meaning": "at that time I manifest Myself"}
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
                            {"sanskrit": "परित्राणाय साधूनाम्", "iast": "paritrāṇāya sādhūnām", "meaning": "for the protection of the virtuous"},
                            {"sanskrit": "विनाशाय च दुष्कृताम्", "iast": "vināśāya ca duṣkṛtām", "meaning": "and for the destruction of evildoers"},
                            {"sanskrit": "धर्म-संस्थापन-अर्थाय", "iast": "dharma-saṁsthāpana-arthāya", "meaning": "for re-establishing the cosmic order of Dharma"},
                            {"sanskrit": "संभवामि युगे युगे", "iast": "sambhavāmi yuge yuge", "meaning": "I incarnate age after age"}
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
                            {"sanskrit": "कर्मणि अकर्म यः पश्येत्", "iast": "karmaṇi akarma yaḥ paśyet", "meaning": "he who sees inaction in action"},
                            {"sanskrit": "अकर्मणि च कर्म यः", "iast": "akarmaṇi ca karma yaḥ", "meaning": "and action in inaction"},
                            {"sanskrit": "सः बुद्धिमान् मनुष्येषु", "iast": "saḥ buddhimān manuṣyeṣu", "meaning": "he is wise among human beings"},
                            {"sanskrit": "सः युक्तः कृत्स्न-कर्म-कृत्", "iast": "saḥ yuktaḥ kṛtsna-karma-kṛt", "meaning": "he is a yogi who has accomplished all work"}
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
                            {"sanskrit": "ब्रह्म अर्पणम्", "iast": "brahma arpaṇam", "meaning": "the offering instrument is Brahman"},
                            {"sanskrit": "ब्रह्म हविः", "iast": "brahma haviḥ", "meaning": "the oblation is Brahman"},
                            {"sanskrit": "ब्रह्म-अग्नौ ब्रह्मणा हुतम्", "iast": "brahma-agnau brahmaṇā hutam", "meaning": "poured into the fire of Brahman by Brahman"},
                            {"sanskrit": "ब्रह्म एव तेन गन्तव्यम्", "iast": "brahma eva tena gantavyam", "meaning": "Brahman alone shall be reached by him"},
                            {"sanskrit": "ब्रह्म-कर्म-समाधिना", "iast": "brahma-karma-samādhinā", "meaning": "who is fully absorbed in action as Brahman"}
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
                            {"sanskrit": "तत् विद्धि", "iast": "tat viddhi", "meaning": "know that spiritual truth"},
                            {"sanskrit": "प्रणिपातेन", "iast": "praṇipātena", "meaning": "by humble reverence"},
                            {"sanskrit": "परिप्रश्नेन", "iast": "paripraśnena", "meaning": "by in-depth inquiry"},
                            {"sanskrit": "सेवया", "iast": "sevayā", "meaning": "by selfless service"},
                            {"sanskrit": "उपदेक्ष्यन्ति ते ज्ञानम्", "iast": "upadekṣyanti te jñānam", "meaning": "they will impart knowledge unto you"},
                            {"sanskrit": "ज्ञानिनः तत्त्व-दर्शिनः", "iast": "jñāninaḥ tattva-darśinaḥ", "meaning": "the enlightened seers of the ultimate Truth"}
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
                            {"sanskrit": "न हि ज्ञानेन सदृशम्", "iast": "na hi jñānena sadṛśam", "meaning": "certainly nothing like wisdom"},
                            {"sanskrit": "पवित्रम् इह विद्यते", "iast": "pavitram iha vidyate", "meaning": "purifying exists in this world"},
                            {"sanskrit": "तत् स्वयम् योग-संसिद्धः", "iast": "tat svayam yoga-saṁsiddhaḥ", "meaning": "that, perfected in Yoga"},
                            {"sanskrit": "कालेन आत्मनि विन्दति", "iast": "kālenātmani vindati", "meaning": "in due course of time one realizes within the Self"}
                        ],
                        "english": "In this world, there is nothing as purifying as spiritual knowledge. One who is perfected in Yoga discovers this naturally within the Self in due course of time.",
                        "hindi": "इस संसार में ज्ञान के समान पवित्र करने वाला निःसंदेह कुछ भी नहीं है; उस ज्ञान को योग में सिद्ध हुआ पुरुष समय पाकर अपने आप ही आत्मा में पा लेता है।",
                        "commentary": "Jnana is the supreme purifier, dissolving existential ignorance (Avidya).",
                        "audio": ""
                    }
                ]
            },

            # =========================================================================
            # CHAPTER 7: JNANA VIJNANA YOGA
            # =========================================================================
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
                            {"sanskrit": "भूमिः आपः अनलः वायुः खम्", "iast": "bhūmiḥ āpaḥ analaḥ vāyuḥ kham", "meaning": "earth, water, fire, air, space"},
                            {"sanskrit": "मनः बुद्धिः अहङ्कारः एव च", "iast": "mano buddhir ahaṅkāra eva ca", "meaning": "mind, intellect, and ego indeed"},
                            {"sanskrit": "इति इयम् मे भिन्ना प्रकृतिः अष्टधा", "iast": "itīyaṁ me bhinnā prakṛtir aṣṭadhā", "meaning": "thus is My eightfold divided material Nature"}
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
                            {"sanskrit": "अपरा इयम्", "iast": "aparā iyam", "meaning": "this is My lower nature"},
                            {"sanskrit": "इतः तु अन्याम् प्रकृतिम् विद्धि मे पराम्", "iast": "itas tv anyāṁ prakṛtiṁ viddhi me parām", "meaning": "beyond this know My higher nature"},
                            {"sanskrit": "जीव-भूताम् महाबाहो", "iast": "jīva-bhūtāṁ mahā-bāho", "meaning": "comprising the living conscious souls, O mighty-armed"},
                            {"sanskrit": "यया इदम् धार्यते जगत्", "iast": "yayedaṁ dhāryate jagat", "meaning": "by which this cosmos is sustained"}
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
                            {"sanskrit": "मत्तः परतरम् न अन्यत्", "iast": "mattaḥ parataram na anyat", "meaning": "higher than Me there is nothing else"},
                            {"sanskrit": "किञ्चित् अस्ति धनञ्जय", "iast": "kiñcit asti dhanañjaya", "meaning": "at all, O Dhananjaya"},
                            {"sanskrit": "मयि सर्वम् इदम् प्रोतम्", "iast": "mayi sarvam idam protam", "meaning": "all this is strung upon Me"},
                            {"sanskrit": "सूत्रे मणि-गणाः इव", "iast": "sūtre maṇi-gaṇāḥ iva", "meaning": "like clusters of gems strung on a thread"}
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
                            {"sanskrit": "बहूनाम् जन्मनाम् अन्ते", "iast": "bahūnām janmanām ante", "meaning": "at the end of many births"},
                            {"sanskrit": "ज्ञानवान् माम् प्रपद्यते", "iast": "jñānavān mām prapadyate", "meaning": "the person of wisdom surrenders unto Me"},
                            {"sanskrit": "वासुदेवः सर्वम् इति", "iast": "vāsudevaḥ sarvam iti", "meaning": "realizing 'Vasudeva (God) is all'"},
                            {"sanskrit": "सः महात्मा सु-दुर्लभः", "iast": "saḥ mahātmā su-durlabhaḥ", "meaning": "such a great soul is exceedingly rare"}
                        ],
                        "english": "At the end of many lifetimes of spiritual evolution, the person of wisdom surrenders unto Me, realizing that 'Vasudeva (the Supreme Divine) is all that is.' Such a great soul is exceedingly rare.",
                        "hindi": "बहुत जन्मों के अन्त में ज्ञानवान पुरुष मुझको भजता है, यह अनुभव करते हुए कि 'सब कुछ वासुदेव ही हैं'; ऐसा महात्मा अत्यन्त दुर्लभ है।",
                        "commentary": "'Vasudeva Sarvam Iti'—the pinnacle Advaitic realization seeing all existence as divine manifestation.",
                        "audio": ""
                    }
                ]
            },

            # =========================================================================
            # CHAPTER 9: RAJA VIDYA RAJA GUHYA YOGA
            # =========================================================================
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
                            {"sanskrit": "राज-विद्या राज-गुह्यम्", "iast": "rāja-vidyā rāja-guhyam", "meaning": "king of sciences, king of secrets"},
                            {"sanskrit": "पवित्रम् इदम् उत्तमम्", "iast": "pavitram idam uttamam", "meaning": "this supreme purifier"},
                            {"sanskrit": "प्रत्यक्ष-अवगमम्", "iast": "pratyakṣa-avagamam", "meaning": "directly realizable through immediate intuition"},
                            {"sanskrit": "धर्म्यम् सु-सुखम् कर्तुम् अव्ययम्", "iast": "dharmyam su-sukham kartum avyayam", "meaning": "righteous, joyful to practice, and imperishable"}
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
                            {"sanskrit": "अनन्याः चिन्तयन्तः माम्", "iast": "ananyāḥ cintayantaḥ mām", "meaning": "thinking of Me with single-minded devotion"},
                            {"sanskrit": "ये जनाः पर्युपासते", "iast": "ye janāḥ paryupāsate", "meaning": "those people who worship Me"},
                            {"sanskrit": "तेषाम् नित्य-अभियुक्तानाम्", "iast": "teṣām nitya-abhiyuktānām", "meaning": "to those who are perpetually united with Me"},
                            {"sanskrit": "योग-क्षेमम् वहामि अहम्", "iast": "yoga-kṣemam vahāmi aham", "meaning": "I personally carry their welfare and spiritual security"}
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
                            {"sanskrit": "पत्रम् पुष्पम् फलम् तोयम्", "iast": "patram puṣpam phalam toyam", "meaning": "a leaf, a flower, a fruit, or water"},
                            {"sanskrit": "यः मे भक्त्या प्रयच्छति", "iast": "yaḥ me bhaktyā prayacchati", "meaning": "whoever offers unto Me with love"},
                            {"sanskrit": "तत् अहम् भक्त्युपहृतम् अश्नामि", "iast": "tat aham bhakty-upahṛtam aśnāmi", "meaning": "that devotional offering I accept"},
                            {"sanskrit": "प्रयत-आत्मनः", "iast": "prayata-ātmanaḥ", "meaning": "from the pure-hearted"}
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
                            {"sanskrit": "यत् करोषि यत् अश्नासि", "iast": "yat karoṣi yad aśnāsi", "meaning": "whatever you do, whatever you eat"},
                            {"sanskrit": "यत् जुहोषि ददासि यत्", "iast": "yaj juhoṣi dadāsi yat", "meaning": "whatever you offer in sacrifice, whatever you give in charity"},
                            {"sanskrit": "यत् तपस्यसि कौन्तेय", "iast": "yat tapasyasi kaunteya", "meaning": "whatever austerities you perform, O Kaunteya"},
                            {"sanskrit": "तत् कुरुष्व मद्-अर्पणम्", "iast": "tat kuruṣva mad-arpaṇam", "meaning": "make that an offering unto Me"}
                        ],
                        "english": "Whatever you do, whatever you eat, whatever you offer in sacrifice, whatever you give in charity, whatever austerities you perform, O Kaunteya, dedicate it all as an offering unto Me.",
                        "hindi": "हे कौन्तेय! तुम जो कुछ करते हो, जो कुछ खाते हो, जो कुछ हवन करते हो, जो कुछ दान देते हो और जो कुछ तप करते हो, वह सब मुझे ही अर्पण करो।",
                        "commentary": "Sanctification of everyday life: every biological and ethical act is transformed into spiritual communion.",
                        "audio": ""
                    }
                ]
            },

            # =========================================================================
            # CHAPTER 12: BHAKTI YOGA
            # =========================================================================
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
                            {"sanskrit": "श्रीभगवान् उवाच", "iast": "śrī-bhagavān uvāca", "meaning": "The Supreme Lord said"},
                            {"sanskrit": "मयि आवेश्य मनः", "iast": "mayi āveśya manaḥ", "meaning": "fixing their mind on Me"},
                            {"sanskrit": "नित्य-युक्ताः उपासते", "iast": "nitya-yuktāḥ upāsate", "meaning": "constantly united worship Me"},
                            {"sanskrit": "श्रद्धया परया उपेताः", "iast": "śraddhayā parayā upetāḥ", "meaning": "endowed with supreme faith"},
                            {"sanskrit": "ते मे युक्ततमाः मताः", "iast": "te me yuktatamāḥ matāḥ", "meaning": "they are considered by Me to be the highest yogis"}
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
                            {"sanskrit": "अद्वेष्टा सर्व-भूतानाम्", "iast": "adveṣṭā sarva-bhūtānām", "meaning": "free from ill-will toward all living beings"},
                            {"sanskrit": "मैत्रः करुणः एव च", "iast": "maitraḥ karuṇaḥ eva ca", "meaning": "friendly and compassionate indeed"},
                            {"sanskrit": "निर्ममः निरहङ्कारः", "iast": "nirmamaḥ nirahaṅkāraḥ", "meaning": "free from possessiveness and ego"},
                            {"sanskrit": "सम-दुःख-सुखः क्षमी", "iast": "sama-duḥkha-sukhaḥ kṣamī", "meaning": "equanimous in pleasure and pain, forgiving"}
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
                            {"sanskrit": "सन्तुष्टः सततम् योगी", "iast": "santuṣṭaḥ satatam yogī", "meaning": "ever content, disciplined in yoga"},
                            {"sanskrit": "यतात्मा दृढ-निश्चयः", "iast": "yatātmā dṛḍha-niścayaḥ", "meaning": "self-controlled, of firm resolve"},
                            {"sanskrit": "मयि अर्पित-मनो-बुद्धिः", "iast": "mayi arpita-mano-buddhiḥ", "meaning": "with mind and intellect surrendered unto Me"},
                            {"sanskrit": "यः मद्-भक्तः सः मे प्रियः", "iast": "yo mad-bhaktaḥ sa me priyaḥ", "meaning": "such a devotee of Mine is dear to Me"}
                        ],
                        "english": "Ever content, steady in meditation, self-controlled, of firm resolve, with mind and intellect surrendered unto Me—such a devotee is exceedingly dear to Me.",
                        "hindi": "जो निरन्तर सन्तुष्ट है, मन-इन्द्रियों सहित शरीर को वश में किए हुए है, दृढ़ निश्चय वाला है तथा मुझमें अर्पित मन-बुद्धि वाला मेरा भक्त मुझे अत्यन्त प्रिय है।",
                        "commentary": "Surrender of mind (Manas) and intellect (Buddhi) to the Divine constitutes true devotion.",
                        "audio": ""
                    }
                ]
            },

            # =========================================================================
            # CHAPTER 18: MOKSHA SANNYASA YOGA
            # =========================================================================
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
                            {"sanskrit": "यज्ञ-दान-तपः-कर्म", "iast": "yajña-dāna-tapaḥ-karma", "meaning": "acts of sacrifice, charity, and penance"},
                            {"sanskrit": "न त्याज्यम् कार्यम् एव तत्", "iast": "na tyājyam kāryam eva tat", "meaning": "must not be given up, they must indeed be performed"},
                            {"sanskrit": "पावनानि मनीषिणाम्", "iast": "pāvanāni manīṣiṇām", "meaning": "they are purifiers of the wise"}
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
                            {"sanskrit": "ब्रह्म-भूतः", "iast": "brahma-bhūtaḥ", "meaning": "one who has become one with Brahman"},
                            {"sanskrit": "प्रसन्न-आत्मा", "iast": "prasanna-ātmā", "meaning": "serene and joyful in soul"},
                            {"sanskrit": "न शोचति न काङ्क्षति", "iast": "na śocati na kāṅkṣati", "meaning": "neither grieves nor craves"},
                            {"sanskrit": "समः सर्वेषु भूतेषु", "iast": "samaḥ sarveṣu bhūteṣu", "meaning": "equally disposed toward all beings"},
                            {"sanskrit": "मद्-भक्तिम् लभते पराम्", "iast": "mad-bhaktim labhate parām", "meaning": "attains supreme non-dual devotion unto Me"}
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
                            {"sanskrit": "ईश्वरः सर्व-भूतानाम्", "iast": "īśvaraḥ sarva-bhūtānām", "meaning": "the Supreme Lord of all beings"},
                            {"sanskrit": "हृद्-देशे अर्जुन तिष्ठति", "iast": "hṛd-deśe arjuna tiṣṭhati", "meaning": "dwells in the region of the heart, O Arjuna"},
                            {"sanskrit": "भ्रामयन् सर्व-भूतानि", "iast": "bhrāmayan sarva-bhūtāni", "meaning": "causing all beings to revolve"},
                            {"sanskrit": "यन्त्र-आरूढानि मायया", "iast": "yantra-ārūḍhāni māyayā", "meaning": "as if mounted upon a machine by His Maya"}
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
                            {"sanskrit": "मन्मना भव मद्-भक्तः", "iast": "man-manā bhava mad-bhaktaḥ", "meaning": "fix your mind on Me, be devoted to Me"},
                            {"sanskrit": "मद्-याजी माम् नमस्कुरु", "iast": "mad-yājī mām namaskuru", "meaning": "sacrifice unto Me, bow down to Me"},
                            {"sanskrit": "माम् एव एष्यसि", "iast": "mām evaiṣyasi", "meaning": "you shall surely come to Me alone"},
                            {"sanskrit": "सत्यम् ते प्रतिजाने प्रियोऽसि मे", "iast": "satyam te pratijāne priyo 'si me", "meaning": "truly I promise you, for you are dear to Me"}
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
                            {"sanskrit": "सर्व-धर्मान् परित्यज्य", "iast": "sarva-dharmān parityajya", "meaning": "renouncing all relative dharmas and duties"},
                            {"sanskrit": "माम् एकम् शरणम् व्रज", "iast": "mām ekam śaraṇam vraja", "meaning": "take refuge in Me alone"},
                            {"sanskrit": "अहम् त्वाम् सर्व-पापेभ्यः मोक्षयिष्यामि", "iast": "aham tvām sarva-pāpebhyaḥ mokṣayiṣyāmi", "meaning": "I shall liberate you from all sins"},
                            {"sanskrit": "मा शुचः", "iast": "mā śucaḥ", "meaning": "do not grieve"}
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
                            {"sanskrit": "अर्जुनः उवाच", "iast": "arjunaḥ uvāca", "meaning": "Arjuna said"},
                            {"sanskrit": "नष्टः मोहः", "iast": "naṣṭaḥ mohaḥ", "meaning": "my delusion is destroyed"},
                            {"sanskrit": "स्मृतिः लब्धा", "iast": "smṛtiḥ labdhā", "meaning": "memory of the Self is regained"},
                            {"sanskrit": "त्वत्-प्रसादात् मया अच्युत", "iast": "tvat-prasādāt mayā acyuta", "meaning": "through Your divine grace, O Infallible One"},
                            {"sanskrit": "स्थितः अस्मि गत-सन्देहः", "iast": "sthitaḥ asmi gata-sandehaḥ", "meaning": "I stand firm with all doubts dispelled"},
                            {"sanskrit": "करिष्ये वचनम् तव", "iast": "kariṣye vacanam tava", "meaning": "I shall act according to Your word"}
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
                            {"sanskrit": "यत्र योगेश्वरः कृष्णः", "iast": "yatra yogeśvaraḥ kṛṣṇaḥ", "meaning": "wherever is Krishna, the Lord of Yoga"},
                            {"sanskrit": "यत्र पार्थः धनुर्धरः", "iast": "yatra pārthaḥ dhanur-dharaḥ", "meaning": "wherever is Partha, the archer"},
                            {"sanskrit": "तत्र श्रीः विजयः भूतिः", "iast": "tatra śrīḥ vijayaḥ bhūtiḥ", "meaning": "there are prosperity, victory, expanding glory"},
                            {"sanskrit": "ध्रुवा नीतिः मतिः मम", "iast": "dhruvā nītiḥ matiḥ mama", "meaning": "and unswerving justice—this is my conviction"}
                        ],
                        "english": "Wherever is Krishna, the Lord of Yoga, and wherever is Arjuna, the supreme archer, there surely will be unceasing prosperity, victory, expanding glory, and righteous statecraft—this is my firm conviction.",
                        "hindi": "जहाँ योगेश्वर भगवान श्रीकृष्ण हैं और जहाँ गाण्डीवधनुर्धारी अर्जुन हैं, वहीं पर श्री (लक्ष्मी), विजय, ऐश्वर्य और अचल नीति है—ऐसा मेरा दृढ़ मत है।",
                        "commentary": "The closing verse of the Gita: divine wisdom harmonized with courageous action guarantees victory.",
                        "audio": ""
                    }
                ]
            }
        ]
    }
