# -*- coding: utf-8 -*-
"""
Classics & Philosophical Treatises Data Builder
Datasets for:
1. Valmiki Ramayana (Balakanda, Ayodhyakanda, Sundarakanda, Yuddhakanda)
2. Yoga Sutras of Patanjali (Samadhi Pada, Sadhana Pada, Vibhuti Pada, Kaivalya Pada)
3. Ashtavakra Gita (Chapters 1, 2, 18)
4. Natya Shastra of Bharata Muni (Rasa Adhyaya, Abhinaya)
5. Arthashastra of Kautilya (Raja-Dharma, Governance)
"""

def get_classics():
    return [
        # =========================================================================
        # 1. VALMIKI RAMAYANA
        # =========================================================================
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
                                {"sanskrit": "तपः-स्वाध्याय-निरतम्", "iast": "tapaḥ-svādhyāya-niratam", "meaning": "ever devoted to contemplation and study"},
                                {"sanskrit": "वाग्विदां वरम्", "iast": "vāg-vidāṁ varam", "meaning": "foremost among the eloquent"},
                                {"sanskrit": "नारदम् परिपप्रच्छ वाल्मीकिः", "iast": "nāradaṁ paripapraccha vālmīkiḥ", "meaning": "Valmiki questioned Sage Narada"}
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
                                {"sanskrit": "कः नु अस्मिन् साम्प्रतम् लोके", "iast": "ko nv asmin sāmprataṁ loke", "meaning": "who indeed in this contemporary world"},
                                {"sanskrit": "गुणवान् कः च वीर्यवान्", "iast": "guṇavān kaś ca vīryavān", "meaning": "is endowed with noble virtues and valor?"},
                                {"sanskrit": "धर्मज्ञः कृतज्ञः सत्यवाक्यः दृढव्रतः", "iast": "dharma-jñaś ca kṛta-jñaś ca satya-vākyo dṛḍha-vrataḥ", "meaning": "knower of Dharma, grateful, truthful, and resolute"}
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
                                {"sanskrit": "युद्ध-परिश्रान्तम्", "iast": "yuddha-pariśrāntam", "meaning": "exhausted by long combat"},
                                {"sanskrit": "चिन्तया स्थितम्", "iast": "cintayā sthitam", "meaning": "standing thoughtful on the field"},
                                {"sanskrit": "रावणम् च अग्रतः दृष्ट्वा", "iast": "rāvaṇaṁ cāgrato dṛṣṭvā", "meaning": "seeing Ravana standing before him"}
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
                                {"sanskrit": "दैवतैः च समागम्य", "iast": "daivataiś ca samāgamya", "meaning": "having arrived with the divine powers"},
                                {"sanskrit": "उपागम्य अब्रवीत् रामम् अगस्त्यः", "iast": "upāgamyābravīd rāmam agastyaḥ", "meaning": "approaching Sri Rama, sage Agastya spoke"}
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

        # =========================================================================
        # 2. YOGA SUTRAS OF PATANJALI
        # =========================================================================
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
                                {"sanskrit": "अथ", "iast": "atha", "meaning": "now begins"},
                                {"sanskrit": "योग-अनुशासनम्", "iast": "yoga-anuśāsanam", "meaning": "the authoritative instruction on Yoga"}
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
                                {"sanskrit": "योगः", "iast": "yogaḥ", "meaning": "Yoga is"},
                                {"sanskrit": "चित्त-वृत्ति-निरोधः", "iast": "citta-vṛtti-nirodhaḥ", "meaning": "the intentional stilling of the fluctuating whirlpools of the mind-field"}
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
                                {"sanskrit": "तदा", "iast": "tadā", "meaning": "then"},
                                {"sanskrit": "द्रष्टुः स्वरूपे अवस्थानम्", "iast": "draṣṭuḥ svarūpe 'vasthānam", "meaning": "the Seer abides in Its own pristine nature"}
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
                                {"sanskrit": "मैत्री", "iast": "maitrī", "meaning": "friendliness toward the happy"},
                                {"sanskrit": "करुणा", "iast": "karuṇā", "meaning": "compassion toward the suffering"},
                                {"sanskrit": "मुदिता", "iast": "muditā", "meaning": "joy in the virtuous"},
                                {"sanskrit": "उपेक्षा", "iast": "upekṣā", "meaning": "serene equanimity toward the unvirtuous"},
                                {"sanskrit": "चित्त-प्रसादनम्", "iast": "citta-prasādanam", "meaning": "clarity and tranquility of the mind"}
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
                                {"sanskrit": "अष्टौ अङ्गानि", "iast": "aṣṭāv aṅgāni", "meaning": "the eight limbs are Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, and Samadhi"}
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
                                {"sanskrit": "स्थिर-सुखम्", "iast": "sthira-sukham", "meaning": "steady and comfortable"},
                                {"sanskrit": "आसनम्", "iast": "āsanam", "meaning": "posture"}
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

        # =========================================================================
        # 3. ASHTAVAKRA GITA
        # =========================================================================
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
                                {"sanskrit": "जनकः उवाच", "iast": "janaka uvāca", "meaning": "King Janaka said"},
                                {"sanskrit": "कथम् ज्ञानम् अवाप्नोति", "iast": "kathaṁ jñānam avāpnoti", "meaning": "how is wisdom attained?"},
                                {"sanskrit": "कथम् मुक्तिः भविष्यति", "iast": "kathaṁ muktir bhaviṣyati", "meaning": "how does liberation occur?"},
                                {"sanskrit": "वैराग्यम् च कथम् प्राप्तम्", "iast": "vairāgyaṁ ca kathaṁ prāptam", "meaning": "and how is dispassion achieved?"}
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
                                {"sanskrit": "यदि देहम् पृथक् कृत्य", "iast": "yadi dehaṁ pṛthak kṛtya", "meaning": "if separating yourself from the physical body"},
                                {"sanskrit": "चित्ति विश्राम्य तिष्ठसि", "iast": "citti viśrāmya tiṣṭhasi", "meaning": "you abide resting in pure consciousness"},
                                {"sanskrit": "अधुना एव सुखी शान्तः", "iast": "adhunaiva sukhī śānto", "meaning": "this very moment you shall be happy, peaceful"},
                                {"sanskrit": "बन्ध-मुक्तः भविष्यसि", "iast": "bandha-mukto bhaviṣyasi", "meaning": "and liberated from all bondage"}
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

        # =========================================================================
        # 4. NATYA SHASTRA
        # =========================================================================
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
                                {"sanskrit": "विभाव-अनुभाव-व्यभिचारि-संयोगात्", "iast": "vibhāva-anubhāva-vyabhicāri-saṁyogāt", "meaning": "from the combination of determinants, physical consequents, and transitory emotions"},
                                {"sanskrit": "रस-निष्पत्तिः", "iast": "rasa-niṣpattiḥ", "meaning": "the aesthetic essence (Rasa) is produced / realized"}
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

        # =========================================================================
        # 5. ARTHASHASTRA
        # =========================================================================
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
                                {"sanskrit": "प्रजा-सुखे सुखम् राज्ञः", "iast": "prajā-sukhe sukhaṁ rājñaḥ", "meaning": "in the happiness of the subjects lies the king's happiness"},
                                {"sanskrit": "प्रजानाम् च हिते हितम्", "iast": "prajānāṁ ca hite hitam", "meaning": "in their welfare lies his true welfare"},
                                {"sanskrit": "प्रजानाम् तु प्रियम् हितम्", "iast": "prajānāṁ tu priyaṁ hitam", "meaning": "whatever is beneficial to the subjects is his true good"}
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
