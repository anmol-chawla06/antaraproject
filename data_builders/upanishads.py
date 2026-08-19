# -*- coding: utf-8 -*-
"""
Upanishads Data Builder
Comprehensive datasets for:
1. Isha Upanishad (Complete 18 Mantras + Shanti Invocation - all 19 individual verses)
2. Katha Upanishad (All 6 Vallis with 29 individual classical verses)
3. Mundaka Upanishad (All 3 Mundakas with 18 individual classical verses)
"""

def get_isha_upanishad():
    return {
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
                            {"sanskrit": "पूर्णम् अदः", "iast": "pūrṇam adaḥ", "meaning": "That Unmanifest Absolute is complete and infinite"},
                            {"sanskrit": "पूर्णम् इदम्", "iast": "pūrṇam idam", "meaning": "this manifest cosmos is complete and infinite"},
                            {"sanskrit": "पूर्णात् पूर्णम् उदच्यते", "iast": "pūrṇāt pūrṇam udacyate", "meaning": "from the Infinite emerges the Infinite"},
                            {"sanskrit": "पूर्णस्य पूर्णम् आदाय", "iast": "pūrṇasya pūrṇam ādāya", "meaning": "taking away the Infinite from the Infinite"},
                            {"sanskrit": "पूर्णम् एव अवशिष्यते", "iast": "pūrṇam eva avaśiṣyate", "meaning": "the Infinite alone remains"}
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
                            {"sanskrit": "ईशा वास्यम् इदम् सर्वम्", "iast": "īśā vāsyam idam sarvam", "meaning": "all this is enveloped by the Supreme Lord"},
                            {"sanskrit": "यत् किञ्च जगत्याम् जगत्", "iast": "yat kiñca jagatyām jagat", "meaning": "whatever is moving in this changing universe"},
                            {"sanskrit": "तेन त्यक्तेन भुञ्जीथाः", "iast": "tena tyaktena bhuñjīthāḥ", "meaning": "by that renunciation enjoy / protect yourself"},
                            {"sanskrit": "मा गृधः कस्यस्वित् धनम्", "iast": "mā gṛdhaḥ kasya svit dhanam", "meaning": "do not covet anyone's wealth"}
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
                            {"sanskrit": "कुर्वन् एव इह कर्माणि", "iast": "kurvan eva iha karmāṇi", "meaning": "performing actions indeed in this world"},
                            {"sanskrit": "जिजीविषेत् शतम् समाः", "iast": "jijīviṣet śatam samāḥ", "meaning": "one should desire to live a hundred years"},
                            {"sanskrit": "एवम् त्वयि न अन्यथा इतः अस्ति", "iast": "evam tvayi na anyathā itaḥ asti", "meaning": "thus for you there is no other way"},
                            {"sanskrit": "न कर्म लिप्यते नरे", "iast": "na karma lipyate nare", "meaning": "action will not cling to man"}
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
                            {"sanskrit": "असूर्याः नाम ते लोकाः", "iast": "asūryāḥ nāma te lokāḥ", "meaning": "sunless / demonic indeed are those realms"},
                            {"sanskrit": "अन्धेन तमसा आवृताः", "iast": "andhena tamasā āvṛtāḥ", "meaning": "shrouded in blinding darkness"},
                            {"sanskrit": "तान् ते प्रेत्य अभिगच्छन्ति", "iast": "tān te pretya abhigacchanti", "meaning": "to them go after death"},
                            {"sanskrit": "ये के च आत्म-हनः जनाः", "iast": "ye ke ca ātma-hanaḥ janāḥ", "meaning": "whosoever are slayers of the Self (deniers of truth)"}
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
                            {"sanskrit": "अनेजत् एकम्", "iast": "anejat ekam", "meaning": "unmoving, the One"},
                            {"sanskrit": "मनसः जवीयः", "iast": "manaso javīyaḥ", "meaning": "swifter than the mind"},
                            {"sanskrit": "न एनत् देवाः आप्नुवन्", "iast": "na enad devā āpnuvan", "meaning": "the senses could not overtake It"},
                            {"sanskrit": "पूर्वम् अर्षत्", "iast": "pūrvam arṣat", "meaning": "since It was already there before them"},
                            {"sanskrit": "तिष्ठत् अन्यान् धावतः अत्येति", "iast": "tiṣṭhat anyān dhāvato 'tyeti", "meaning": "standing still, It outstrips all others who run"}
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
                            {"sanskrit": "तत् एजति तत् न एजति", "iast": "tad ejati tan naijati", "meaning": "It moves, and It moves not"},
                            {"sanskrit": "तत् दूरे तत् उ अन्तिके", "iast": "tad dūre tad v antike", "meaning": "It is far, and It is near"},
                            {"sanskrit": "तत् अन्तः अस्य सर्वस्य", "iast": "tad antar asya sarvasya", "meaning": "It is within all this"},
                            {"sanskrit": "तत् उ सर्वस्य अस्य बाह्यतः", "iast": "tad u sarvasyāsya bāhyataḥ", "meaning": "and It is outside all this"}
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
                            {"sanskrit": "यः तु सर्वाणि भूतानि", "iast": "yas tu sarvāṇi bhūtāni", "meaning": "he who beholds all beings"},
                            {"sanskrit": "आत्मनि एव अनुपश्यति", "iast": "ātmany evānupaśyati", "meaning": "in the Self alone"},
                            {"sanskrit": "सर्व-भूतेषु च आत्मानम्", "iast": "sarva-bhūteṣu cātmānam", "meaning": "and the Self in all beings"},
                            {"sanskrit": "ततः न विजुगुप्सते", "iast": "tato na vijugupsate", "meaning": "thereafter feels no hatred / revulsion"}
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
                            {"sanskrit": "यस्मिन् सर्वाणि भूतानि", "iast": "yasmin sarvāṇi bhūtāni", "meaning": "in whom all beings"},
                            {"sanskrit": "आत्मा एव अभूत् विजानतः", "iast": "ātmaivābhūd vijānataḥ", "meaning": "have become the Self to the knower of Truth"},
                            {"sanskrit": "तत्र कः मोहः कः शोकः", "iast": "tatra ko mohaḥ kaḥ śokaḥ", "meaning": "what delusion can there be, what sorrow?"},
                            {"sanskrit": "एकत्वम् अनुपश्यतः", "iast": "ekatvam anupaśyataḥ", "meaning": "for one who beholds this oneness"}
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
                            {"sanskrit": "सः पर्यगात्", "iast": "sa paryagāt", "meaning": "He (the Self) pervades all"},
                            {"sanskrit": "शुक्रम् अकायम् अव्रणम् अस्नाविरम्", "iast": "śukram akāyam avraṇam asnāviram", "meaning": "radiant, bodiless, woundless, sinewless"},
                            {"sanskrit": "शुद्धम् अपाप-विद्धम्", "iast": "śuddham apāpa-viddham", "meaning": "pure, untouched by sin / imperfection"},
                            {"sanskrit": "कविः मनीषी परिभूः स्वयम्भूः", "iast": "kavir manīṣī paribhūḥ svayambhūḥ", "meaning": "the all-seeing Seer, Thinker, All-transcending, Self-existent"}
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
                            {"sanskrit": "अन्धम् तमः प्रविशन्ति", "iast": "andham tamaḥ praviśanti", "meaning": "enter into blinding darkness"},
                            {"sanskrit": "ये अविद्याम् उपासते", "iast": "ye 'vidyām upāsate", "meaning": "those who worship ignorance / outer ritual action alone"},
                            {"sanskrit": "ततः भूयः इव ते तमः", "iast": "tato bhūya iva te tamaḥ", "meaning": "into greater darkness still, as it were"},
                            {"sanskrit": "ये उ विद्यायाम् रताः", "iast": "ye u vidyāyām ratāḥ", "meaning": "those who delight exclusively in theoretical knowledge"}
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
                            {"sanskrit": "अन्यत् एव आहुः विद्यया", "iast": "anyad evāhur vidyayā", "meaning": "one result, they say, is attained by knowledge"},
                            {"sanskrit": "अन्यत् आहुः अविद्यया", "iast": "anyad āhur avidyayā", "meaning": "another result is attained by action"},
                            {"sanskrit": "इति शुश्रुम धीराणाम्", "iast": "iti śuśruma dhīrāṇām", "meaning": "thus have we heard from the wise seers"},
                            {"sanskrit": "ये नः तत् विचचक्षिरे", "iast": "ye nas tad vicacakṣire", "meaning": "who explained that truth unto us"}
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
                            {"sanskrit": "विद्याम् च अविद्याम् च", "iast": "vidyāṁ cāvidyāṁ ca", "meaning": "knowledge and action"},
                            {"sanskrit": "यः तत् वेद उभयम् सह", "iast": "yas tad vedobhayam saha", "meaning": "he who knows both of them together"},
                            {"sanskrit": "अविद्यया मृत्युम् तीर्त्वा", "iast": "avidyayā mṛtyum tīrtvā", "meaning": "crossing beyond death through righteous action"},
                            {"sanskrit": "विद्यया अमृतम् अश्नुते", "iast": "vidyayāmṛtam aśnute", "meaning": "attains immortality through spiritual knowledge"}
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
                            {"sanskrit": "अन्धम् तमः प्रविशन्ति", "iast": "andham tamaḥ praviśanti", "meaning": "enter into blinding darkness"},
                            {"sanskrit": "ये असम्भूतिम् उपासते", "iast": "ye 'sambhūtim upāsate", "meaning": "those who worship the unmanifest cause alone"},
                            {"sanskrit": "ततः भूयः इव ते तमः", "iast": "tato bhūya iva te tamaḥ", "meaning": "into greater darkness still"},
                            {"sanskrit": "ये उ सम्भूत्याम् रताः", "iast": "ye u sambhūtyām ratāḥ", "meaning": "those who delight exclusively in the manifest effects"}
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
                            {"sanskrit": "अन्यत् एव आहुः सम्भवात्", "iast": "anyad evāhuḥ sambhavād", "meaning": "one result is achieved from the manifest"},
                            {"sanskrit": "अन्यत् आहुः असम्भवात्", "iast": "anyad āhur asambhavāt", "meaning": "another result is achieved from the unmanifest"},
                            {"sanskrit": "इति शुश्रुम धीराणाम्", "iast": "iti śuśruma dhīrāṇām", "meaning": "thus have we heard from the wise seers"}
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
                            {"sanskrit": "सम्भूतिम् च विनाशम् च", "iast": "sambhūtiṁ ca vināśaṁ ca", "meaning": "creation and dissolution"},
                            {"sanskrit": "यः तत् वेद उभयम् सह", "iast": "yas tad vedobhayam saha", "meaning": "he who understands both together"},
                            {"sanskrit": "विनाशेन मृत्युम् तीर्त्वा", "iast": "vināśena mṛtyum tīrtvā", "meaning": "crossing beyond death through understanding the mortal realm"},
                            {"sanskrit": "सम्भूतिया अमृतम् अश्नुते", "iast": "sambhūtyāmṛtam aśnute", "meaning": "attains immortality through realization of the eternal Source"}
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
                            {"sanskrit": "हिरण्मयेन पात्रेण", "iast": "hiraṇmayena pātreṇa", "meaning": "by a golden dazzling vessel / disc"},
                            {"sanskrit": "सत्यस्य अपिहितम् मुखम्", "iast": "satyasyāpihitam mukham", "meaning": "the face of Truth is covered"},
                            {"sanskrit": "तत् त्वम् पूषन् अपावृणु", "iast": "tat tvaṁ pūṣann apāvṛṇu", "meaning": "unveil that, O Nourisher (Sun)"},
                            {"sanskrit": "सत्य-धर्माय दृष्टये", "iast": "satya-dharmāya dṛṣṭaye", "meaning": "for the direct sight of the seeker of Truth"}
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
                            {"sanskrit": "पूषन् एकर्षे यम सूर्य प्राजापत्य", "iast": "pūṣann ekarṣe yama sūrya prājāpatya", "meaning": "O Nourisher, solitary Sage, Controller, Sun, child of Prajapati"},
                            {"sanskrit": "व्यूह रश्मीन् समूह तेजः", "iast": "vyūha raśmīn samūha tejaḥ", "meaning": "gather Thy blinding rays, soften Thy radiance"},
                            {"sanskrit": "यत् ते रूपम् कल्याणतमम्", "iast": "yat te rūpaṁ kalyāṇatamam", "meaning": "that most auspicious, benign form of Thine"},
                            {"sanskrit": "तत् ते पश्यामि", "iast": "tat te paśyāmi", "meaning": "that I may behold"},
                            {"sanskrit": "यः असौ पुरुषः सः अहम् अस्मि", "iast": "yo 'sāv asau puruṣaḥ so 'ham asmi", "meaning": "that Person who dwells yonder in the cosmos, That Am I (So'ham Asmi)!"}
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
                            {"sanskrit": "वायुः अनिलम् अमृतम्", "iast": "vāyur anilam amṛtam", "meaning": "let breath merge into the immortal cosmic Prana"},
                            {"sanskrit": "अथ इदम् भस्म-अन्तम् शरीरम्", "iast": "athedaṁ bhasmāntaṁ śarīram", "meaning": "and let this body end in ashes"},
                            {"sanskrit": "ॐ क्रतो स्मर कृतम् स्मर", "iast": "oṁ krato smara kṛtaṁ smara", "meaning": "OM, O Mind (will-power), remember! Remember what was done!"}
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
                            {"sanskrit": "अग्ने नय सुपथा राये अस्मान्", "iast": "agne naya supathā rāye asmān", "meaning": "O Agni, lead us along the righteous path to liberation"},
                            {"sanskrit": "विश्वानि देव वयुनानि विद्वान्", "iast": "viśvāni deva vayunāni vidvān", "meaning": "knowing all our ways and deeds, O Divine Light"},
                            {"sanskrit": "युयोधि अस्मत् जुहुराणम् एनः", "iast": "yuyodhy asmaj juhurāṇam enaḥ", "meaning": "remove from us all crooked and deceptive sins"},
                            {"sanskrit": "भूयिष्ठाम् ते नमः-उक्तिम् विधेम", "iast": "bhūyiṣṭhāṁ te nama-uktiṁ vidhema", "meaning": "we offer to Thee our deepest words of homage"}
                        ],
                        "english": "O Agni (Divine Fire), lead us along the righteous path to ultimate liberation, knowing all our deeds, O God. Remove from us all crooked and deceptive sins; we offer Thee our deepest prayers of surrender and homage!",
                        "hindi": "हे अग्निदेव! आप हमारे सम्पूर्ण कर्मों को जानने वाले हैं, हमें कल्याणकारी मार्ग से परम पद की ओर ले चलिए। हमारे भीतर के कुटिल पापों को दूर कीजिए; हम आपको बारम्बार नमस्कार करते हैं।",
                        "commentary": "The concluding prayer of the Shukla Yajurveda seeking divine guidance toward liberation.",
                        "audio": ""
                    }
                ]
            }
        ]
    }

def get_katha_upanishad():
    return {
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
            # VALLI 1
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
                            {"sanskrit": "सह नौ अवतु", "iast": "saha nau avatu", "meaning": "may He protect both of us together"},
                            {"sanskrit": "सह नौ भुनक्तु", "iast": "saha nau bhunaktu", "meaning": "may He nourish both of us together"},
                            {"sanskrit": "सह वीर्यम् करवावहै", "iast": "saha vīryaṁ karavāvahai", "meaning": "may we work together with great energy"},
                            {"sanskrit": "तेजस्वि नौ अधीतम् अस्तु", "iast": "tejasvi nāv adhītam astu", "meaning": "may our study be illuminating"},
                            {"sanskrit": "मा विद्विषावहै", "iast": "mā vidviṣāvahai", "meaning": "may we never harbor discord"}
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
                            {"sanskrit": "उशन् ह वै वाजश्रवसः", "iast": "uśan ha vai vājaśravasaḥ", "meaning": "desiring heavenly fruit, Vajashravas"},
                            {"sanskrit": "सर्व-वेदसम् ददौ", "iast": "sarva-vedasaṁ dadau", "meaning": "gave away all his worldly possessions in sacrifice"},
                            {"sanskrit": "तस्य ह नचिकेता नाम पुत्रः आस", "iast": "tasya ha naciketā nāma putra āsa", "meaning": "he had a son named Nachiketa"}
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
                            {"sanskrit": "या इयम् प्रेते विचिकित्सा", "iast": "yā iyam prete vicikitsā", "meaning": "this doubt that exists when a human dies"},
                            {"sanskrit": "अस्ति इति एके", "iast": "astīty eke", "meaning": "some say 'He still exists'"},
                            {"sanskrit": "न अयम् अस्ति इति च एके", "iast": "nāyam astīti caike", "meaning": "and others say 'He exists no more'"},
                            {"sanskrit": "वराणाम् एषः वरः तृतीयः", "iast": "varāṇām eṣa varas tṛtīyaḥ", "meaning": "of all boons, this is my third boon"}
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
                            {"sanskrit": "यस्मिन् इदम् विचिकित्सन्ति मृत्यो", "iast": "yasminn idaṁ vicikitsanti mṛtyo", "meaning": "about which they doubt, O Death"},
                            {"sanskrit": "महति साम्पराये", "iast": "mahati sāmparāye", "meaning": "concerning that great transition beyond death"},
                            {"sanskrit": "न अन्यम् तस्मात् नचिकेता वृणीते", "iast": "nānyaṁ tasmān naciketā vṛṇīte", "meaning": "other than that boon, Nachiketa chooses none"}
                        ],
                        "english": "Tell me of that great beyond about which people doubt, O Death! Nachiketa chooses no other boon than this which penetrates the deep mystery of the immortal Self!",
                        "hindi": "हे मृत्युदेव! उस महान परलोक के विषय में जिसमें लोग संशय करते हैं, वही मुझे बताइए। इसके अतिरिक्त नचिकेता किसी अन्य वर को नहीं चाहता।",
                        "commentary": "Nachiketa's unyielding dispassion (Vairagya) rejects all worldly pleasures for Truth.",
                        "audio": ""
                    }
                ]
            },

            # VALLI 2
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
                            {"sanskrit": "अन्यत् श्रेयः अन्यत् उत एव प्रेयः", "iast": "anyac chreyo 'nyad utaiva preyaḥ", "meaning": "one thing is the good (Shreyas), quite another is the pleasant (Preyas)"},
                            {"sanskrit": "तयोः श्रेयः आददानस्य साधु भवति", "iast": "tayoḥ śreya ādadānasya sādhu bhavati", "meaning": "of the two, well it is with him who chooses the good"},
                            {"sanskrit": "हीयते अर्थात् यः प्रेयः वृणीते", "iast": "hīyate 'rthād ya u preyo vṛṇīte", "meaning": "he falls away from the true goal who chooses the pleasant"}
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
                            {"sanskrit": "श्रेयः च प्रेयः च मनुष्यम् एतः", "iast": "śreyaś ca preyaś ca manuṣyam etaḥ", "meaning": "the good and the pleasant both approach man"},
                            {"sanskrit": "तौ सम्परीत्य विविनक्ति धीरः", "iast": "tau samparītya vivinakti dhīraḥ", "meaning": "examining both, the wise discriminates between them"},
                            {"sanskrit": "श्रेयः हि धीरः अभि प्रेयसः वृणीते", "iast": "śreyo hi dhīro 'bhi preyaso vṛṇīte", "meaning": "the wise chooses the good over the pleasant"}
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
                            {"sanskrit": "सर्वे वेदाः यत् पदम् आमनन्ति", "iast": "sarve vedā yat padam āmananti", "meaning": "that goal which all the Vedas declare"},
                            {"sanskrit": "तपांसि सर्वाणि च यत् वदन्ति", "iast": "tapāṁsi sarvāṇi ca yad vadanti", "meaning": "and which all austerities proclaim"},
                            {"sanskrit": "तद् ब्रवीमि ॐ इति एतत्", "iast": "tad bravīmi om ity etat", "meaning": "that I tell you in brief: It is OM"}
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
                            {"sanskrit": "न जायते म्रियते वा विपश्चित्", "iast": "na jāyate mriyate vā vipaścin", "meaning": "the knowing Self is neither born nor dies"},
                            {"sanskrit": "अजः नित्यः शाश्वतः अयम् पुराणः", "iast": "ajo nityaḥ śāśvato 'yaṁ purāṇo", "meaning": "unborn, eternal, everlasting, primeval"},
                            {"sanskrit": "न हन्यते हन्यमाने शरीरे", "iast": "na hanyate hanyamāne śarīre", "meaning": "It is not slain when the body is slain"}
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
                            {"sanskrit": "अणोः अणीयान् महतो महीयान्", "iast": "aṇor aṇīyān mahato mahīyān", "meaning": "subtler than the subtle, vaster than the vast"},
                            {"sanskrit": "आत्मा अस्य जन्तोः निहितः गुहायाम्", "iast": "ātmāsya jantor nihito guhāyām", "meaning": "the Self is seated in the heart-cave of living beings"},
                            {"sanskrit": "वीत-शोकः पश्यति", "iast": "vīta-śokaḥ paśyati", "meaning": "free from sorrow, one beholds That"}
                        ],
                        "english": "Subtler than the subtlest atom, vaster than the vastest cosmos, the Self is seated in the hidden cave of the heart of every creature. One who is free from selfish craving beholds that glory of the Self and transcends all grief.",
                        "hindi": "अणु से भी अत्यंत सूक्ष्म और महान से भी अत्यंत महान यह आत्मा इस प्राणी के हृदय रूपी गुहा में स्थित है। निष्काम पुरुष मन और इन्द्रियों की प्रसन्नता से उस आत्मा की महिमा का साक्षात्कार करके शोकरहित हो जाता है।",
                        "commentary": "The cave of the heart (Hridaya Guha) as the dwelling of the infinite Self.",
                        "audio": ""
                    }
                ]
            },

            # VALLI 3
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
                            {"sanskrit": "आत्मानम् रथिनम् विद्धि", "iast": "ātmānaṁ rathinaṁ viddhi", "meaning": "know the Self as the Lord of the chariot"},
                            {"sanskrit": "शरीरम् रथम् एव तु", "iast": "śarīraṁ ratham eva tu", "meaning": "and the body as verily the chariot"},
                            {"sanskrit": "बुद्धिम् तु सारथिम् विद्धि", "iast": "buddhiṁ tu sārathiṁ viddhi", "meaning": "know the intellect as the charioteer"},
                            {"sanskrit": "मनः प्रग्रहम् एव च", "iast": "manaḥ pragraham eva ca", "meaning": "and the mind as the reins"}
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
                            {"sanskrit": "इन्द्रियाणि हयान् आहुः", "iast": "indriyāṇi hayān āhuḥ", "meaning": "the senses are called the horses"},
                            {"sanskrit": "विषयान् तेषु गोचरान्", "iast": "viṣayāṁs teṣu gocarān", "meaning": "the sense objects are the roads"},
                            {"sanskrit": "भोक्ता इति आहुः मनीषिणः", "iast": "bhoktety āhur manīṣiṇaḥ", "meaning": "the wise call It the experiential enjoyer"}
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
                            {"sanskrit": "विज्ञान-सारथिः यः तु", "iast": "vijñāna-sārathir yas tu", "meaning": "he whose charioteer is wise intellect"},
                            {"sanskrit": "मनः-प्रग्रहवान् नरः", "iast": "manaḥ-pragrahavān naraḥ", "meaning": "and who holds the reins of the mind"},
                            {"sanskrit": "सः अध्वनः पारम् आप्नोति", "iast": "so 'dhvanaḥ pāram āpnoti", "meaning": "he reaches the end of the journey"},
                            {"sanskrit": "तत् विष्णोः परमम् पदम्", "iast": "tad viṣṇoḥ paramaṁ padam", "meaning": "that supreme abode of Vishnu"}
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
                            {"sanskrit": "उत्तिष्ठत जाग्रत", "iast": "uttiṣṭhata jāgrata", "meaning": "arise! Awake!"},
                            {"sanskrit": "प्राप्य वरान् निबोधत", "iast": "prāpya varān nibodhata", "meaning": "approaching the wise masters, realize the Truth"},
                            {"sanskrit": "क्षुरस्य धारा निशिता दुरत्यया", "iast": "kṣurasya dhārā niśitā duratyayā", "meaning": "sharp as the razor's edge, hard to traverse"}
                        ],
                        "english": "Arise! Awake! Approach the great enlightened masters and realize the supreme Self! Sharp as the edge of a razor and difficult to cross is that impassable path, declare the wise seers.",
                        "hindi": "उठो! जागो! और श्रेष्ठ महापुरुषों के समीप जाकर उस आत्मतत्त्व को जानो। छुरे की तीक्ष्ण धार के समान वह मार्ग अत्यन्त दुर्गम और कठिन है—ऐसा तत्त्वदर्शी विद्वान कहते हैं।",
                        "commentary": "The iconic clarion call immortalized by Swami Vivekananda: 'Arise, awake, and stop not till the goal is reached!'",
                        "audio": ""
                    }
                ]
            },

            # VALLI 4
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
                            {"sanskrit": "पराञ्चि खानि व्यतृणत् स्वयम्भूः", "iast": "parāñci khāni vyatṛṇat svayambhūḥ", "meaning": "the Creator pierced the senses with outward openings"},
                            {"sanskrit": "तस्मात् पराङ् पश्यति", "iast": "tasmāt parāṅ paśyati", "meaning": "therefore one gazes outward"},
                            {"sanskrit": "कश्चित् धीरः प्रत्यगात्मानम् ऐक्षत्", "iast": "kaścid dhīraḥ pratyag-ātmānam aikṣat", "meaning": "some rare courageous seeker beheld the indwelling Self"},
                            {"sanskrit": "आवृत-चक्षुः अमृतत्वम् इच्छन्", "iast": "āvṛtta-cakṣur amṛtatvam icchan", "meaning": "turning the gaze inward, desiring immortality"}
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
                            {"sanskrit": "यत् एव इह तत् अमुत्र", "iast": "yad eveha tad amutra", "meaning": "what is here in this body, that is there in the cosmos"},
                            {"sanskrit": "मृत्योः सः मृत्युम् आप्नोति", "iast": "mṛtyoḥ sa mṛtyum āpnoti", "meaning": "from death to death he goes"},
                            {"sanskrit": "यः इह नाना इव पश्यति", "iast": "ya iha nāneva paśyati", "meaning": "who perceives manifold difference here"}
                        ],
                        "english": "Whatever is here in this manifest body, that very same is there in the cosmic expanse; whatever is there in the cosmos, that is here in the body. He who sees manifold difference here without realizing the underlying unity goes from death to death.",
                        "hindi": "जो यहाँ (इस शरीर में) है, वही वहाँ (ब्रह्माण्ड में) है; और जो वहाँ है, वही यहाँ है। जो मनुष्य इस तत्त्व में भिन्नता देखता है, वह मृत्यु से मृत्यु को (बार-बार जन्म-मरण के चक्र को) प्राप्त होता है।",
                        "commentary": "Microcosm equals macrocosm (Pinda-Brahmanda non-duality).",
                        "audio": ""
                    }
                ]
            },

            # VALLI 5
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
                            {"sanskrit": "अग्निः यथा एकः भुवनम् प्रविष्टः", "iast": "agnir yathaiko bhuvanaṁ praviṣṭo", "meaning": "just as one fire having entered the world"},
                            {"sanskrit": "रूपम् रूपम् प्रतिरूपः बभूव", "iast": "rūpaṁ rūpaṁ pratirūpo babhūva", "meaning": "assumes varied forms in each object"},
                            {"sanskrit": "एकः तथा सर्व-भूत-अन्तरात्मा", "iast": "ekas tathā sarva-bhūtāntar-ātmā", "meaning": "so the one Indwelling Self of all beings"}
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
                            {"sanskrit": "न तत्र सूर्यः भाति", "iast": "na tatra sūryo bhāti", "meaning": "there the sun does not shine"},
                            {"sanskrit": "न चन्द्र-तारकम्", "iast": "na candra-tārakam", "meaning": "nor the moon and stars"},
                            {"sanskrit": "तम् एव भान्तम् अनुभाति सर्वम्", "iast": "tam eva bhāntam anubhāti sarvam", "meaning": "after It alone as It shines does everything shine"},
                            {"sanskrit": "तस्य भासा सर्वम् इदम् विभाति", "iast": "tasya bhāsā sarvam idaṁ vibhāti", "meaning": "by Its light alone is all this illuminated"}
                        ],
                        "english": "There the sun shines not, nor the moon and the stars, nor these lightnings flash; how then could this earthly fire? Everything shines only after That Self as It shines; by Its light alone is this entire universe illuminated.",
                        "hindi": "वहाँ न सूर्य प्रकाशित होता है, न चन्द्रमा और तारे, न ये बिजलियाँ ही चमकती हैं; फिर इस पार्थिव अग्नि की तो बात ही क्या? उस स्वयंप्रकाश परमात्मा के प्रकाशित होने पर ही यह सब प्रकाशित होता है; उसी के प्रकाश से यह सम्पूर्ण संसार आलोकित है।",
                        "commentary": "Consciousness is the self-luminous ground enabling all sensory and mental cognition.",
                        "audio": ""
                    }
                ]
            },

            # VALLI 6
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
                            {"sanskrit": "ऊर्ध्व-मूलः अवाक्-शाखः", "iast": "ūrdhva-mūlo 'vāk-śākhaḥ", "meaning": "roots above, branches downward"},
                            {"sanskrit": "एषः अश्वत्थः सनातनः", "iast": "eṣo 'śvatthaḥ sanātanaḥ", "meaning": "this ancient eternal Ashvattha tree"},
                            {"sanskrit": "तत् एव शुक्रम् तत् ब्रह्म", "iast": "tad eva śukraṁ tad brahma", "meaning": "that root alone is pure, that is Brahman"}
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
                            {"sanskrit": "यदा सर्वे प्रमुच्यन्ते कामाः", "iast": "yadā sarve pramucyante kāmāḥ", "meaning": "when all the desires fall away"},
                            {"sanskrit": "ये अस्य हृदि श्रिताः", "iast": "ye 'sya hṛdi śritāḥ", "meaning": "that cling to the human heart"},
                            {"sanskrit": "अथ मर्त्यः अमृतः भवति", "iast": "atha martyo 'mṛto bhavati", "meaning": "then the mortal becomes immortal"},
                            {"sanskrit": "अत्र ब्रह्म समश्नुते", "iast": "atra brahma samaśnute", "meaning": "here in this very life one attains Brahman"}
                        ],
                        "english": "When all the desires that cling to the human heart are completely cast away, then does the mortal become immortal, and attains Brahman here in this very life!",
                        "hindi": "जिस समय मनुष्य के हृदय में स्थित सम्पूर्ण कामनाएँ छूट जाती हैं, तब मरणधर्मा मनुष्य अमर हो जाता है और इसी जीवन में ब्रह्म का साक्षात्कार कर लेता है।",
                        "commentary": "Jivanmukti: immortality realized in this very physical life through desireless purity.",
                        "audio": ""
                    }
                ]
            }
        ]
    }

def get_mundaka_upanishad():
    return {
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
            # MUNDAKA 1
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
                            {"sanskrit": "भद्रम् कर्णेभिः शृणुयाम", "iast": "bhadraṁ karṇebhiḥ śṛṇuyāma", "meaning": "may we hear with our ears what is auspicious"},
                            {"sanskrit": "भद्रम् पश्येम अक्षभिः", "iast": "bhadraṁ paśyemākṣabhiḥ", "meaning": "may we see with our eyes what is noble"},
                            {"sanskrit": "व्यशेम देव-हितम् आयुः", "iast": "vyaśema deva-hitaṁ yad āyuḥ", "meaning": "may we enjoy the life ordained by the Divine"}
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
                            {"sanskrit": "द्वे विद्ये वेदितव्ये", "iast": "dve vidye veditavye", "meaning": "two kinds of knowledge are to be known"},
                            {"sanskrit": "इति ब्रह्म-विदः वदन्ति", "iast": "iti brahma-vido vadanti", "meaning": "thus say the knowers of Brahman"},
                            {"sanskrit": "परा च एव अपरा च", "iast": "parā caivāparā ca", "meaning": "the higher (Para) and the lower (Apara)"}
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
                            {"sanskrit": "यथा ऊर्णनाभिः सृजते गृह्णते च", "iast": "yathorṇanābhiḥ sṛjate gṛhṇate ca", "meaning": "as a spider spins its web and draws it back"},
                            {"sanskrit": "तथा अक्षरात् सम्भवति इह विश्वम्", "iast": "tathākṣarāt sambhavatīha viśvam", "meaning": "so from the Imperishable emerges this universe"}
                        ],
                        "english": "As a spider spins its web out of itself and absorbs it back, as plants naturally grow from the earth, as hairs grow from a living person, so from the Imperishable Brahman springs forth this entire universe.",
                        "hindi": "जैसे मकड़ी अपने भीतर से जाले को उत्पन्न करती है और फिर उसे अपने में ही समेट लेती है, जैसे पृथ्वी से वनस्पतियाँ उगती हैं—वैसे ही उस अविनाशी ब्रह्म से इस सम्पूर्ण विश्व की सृष्टि होती है।",
                        "commentary": "Brahman manifests the universe out of Its own consciousness without external material.",
                        "audio": ""
                    }
                ]
            },

            # MUNDAKA 2
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
                            {"sanskrit": "प्रणवः धनुः", "iast": "praṇavo dhanuḥ", "meaning": "the sacred syllable OM is the bow"},
                            {"sanskrit": "शरः हि आत्मा", "iast": "śaro hy ātmā", "meaning": "the individual Self is the arrow"},
                            {"sanskrit": "ब्रह्म तत् लक्ष्यम् उच्यते", "iast": "brahma tal lakṣyam ucyate", "meaning": "Brahman is the target"},
                            {"sanskrit": "शरवत् तन्मयः भवेत्", "iast": "śaravat tan-mayo bhavet", "meaning": "like the arrow becoming one with the target, one should merge in It"}
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
                            {"sanskrit": "भिद्यते हृदय-ग्रन्थिः", "iast": "bhidyate hṛdaya-granthiḥ", "meaning": "the knot of the heart is severed"},
                            {"sanskrit": "छिद्यन्ते सर्व-संशयाः", "iast": "chidyante sarva-saṁśayāḥ", "meaning": "all doubts are rent asunder"},
                            {"sanskrit": "क्षीयन्ते च अस्य कर्माणि", "iast": "kṣīyante cāsya karmāṇi", "meaning": "all karmic bindings dissolve"}
                        ],
                        "english": "The knot of the heart is completely severed, all doubts are rent asunder, and all bindings of karma dissolve away, when That Supreme Reality—at once transcendent and immanent—is directly realized.",
                        "hindi": "उस परब्रह्म का साक्षात्कार हो जाने पर हृदय की अविद्या रूपी गाँठ कट जाती है, सम्पूर्ण संशय छिन्न-भिन्न हो जाते हैं और मनुष्य के सम्पूर्ण संचित कर्म क्षीण हो जाते हैं।",
                        "commentary": "The threefold fruit of Self-realization: ego dissolution, doubt destruction, and karmic liberation.",
                        "audio": ""
                    }
                ]
            },

            # MUNDAKA 3
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
                            {"sanskrit": "द्वा सुपर्णा सयुजा सखाया", "iast": "dvā suparṇā sayujā sakhāyā", "meaning": "two birds of beautiful plumage, companions"},
                            {"sanskrit": "समानम् वृक्षम् परिषस्वजाते", "iast": "samānaṁ vṛkṣaṁ pariṣasvajāte", "meaning": "dwell upon the selfsame tree"},
                            {"sanskrit": "तयोः अन्यः पिप्पलम् स्वादु अत्ति", "iast": "tayor anyaḥ pippalaṁ svādv atti", "meaning": "one eats the sweet fruits of action"},
                            {"sanskrit": "अनश्नन् अन्यः अभिचाकशीति", "iast": "anaśnann anyo abhicākaśīti", "meaning": "the other, without eating, looks on as a radiant witness"}
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
                            {"sanskrit": "सत्यम् एव जयते", "iast": "satyam eva jayate", "meaning": "Truth alone triumphs"},
                            {"sanskrit": "न अनृतम्", "iast": "nānṛtam", "meaning": "never untruth"},
                            {"sanskrit": "सत्येन पन्थाः विततः देव-यानः", "iast": "satyena panthā vitato deva-yānaḥ", "meaning": "by Truth is paved the divine path of the sages"}
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
                            {"sanskrit": "सः यः ह वै तत् परम् ब्रह्म वेद", "iast": "sa yo ha vai tat paramaṁ brahma veda", "meaning": "he who verily knows that Supreme Brahman"},
                            {"sanskrit": "ब्रह्म एव भवति", "iast": "brahmaiva bhavati", "meaning": "becomes Brahman Itself!"},
                            {"sanskrit": "तरति शोकम् तरति पाप्मानम्", "iast": "tarati śokaṁ tarati pāpmānam", "meaning": "crosses beyond grief, crosses beyond sin"}
                        ],
                        "english": "He who verily knows that Supreme Brahman becomes Brahman Itself! He crosses beyond grief, crosses beyond sin, and freed from the knots of the heart, becomes immortal.",
                        "hindi": "जो कोई उस परब्रह्म को जान लेता है, वह स्वयं ब्रह्म ही हो जाता है। वह शोक को पार कर जाता है, पापों से छूट जाता है और हृदय की गाँठों से मुक्त होकर अमर हो जाता है।",
                        "commentary": "'Brahmavit Brahmaiva Bhavati'—the knower of Brahman becomes Brahman Itself.",
                        "audio": ""
                    }
                ]
            }
        ]
    }
