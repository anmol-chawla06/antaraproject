# -*- coding: utf-8 -*-
"""
Rigveda Samhita Data Builder
Comprehensive individual verse sets for:
1. Agni Sukta (Mandala 1, Hymn 1: All 9 individual Rks 1.1.1 to 1.1.9)
2. Gayatri Mantra & Savitur Sukta (Mandala 3, Hymn 62)
3. Mahamrityunjaya Mantra (Mandala 7, Hymn 59)
4. Purusha Sukta - Cosmic Purusha (Mandala 10, Hymn 90: 10.90.1, 10.90.2, 10.90.3, 10.90.16)
5. Nasadiya Sukta - Hymn of Creation (Mandala 10, Hymn 129: All 7 individual Rks 10.129.1 to 10.129.7)
6. Samjnana Sukta - Hymn of Unity (Mandala 10, Hymn 191: 10.191.2, 10.191.3, 10.191.4)
"""

def get_rigveda():
    return {
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
            # 1. AGNI SUKTA (ALL 9 INDIVIDUAL RKS)
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
                            {"sanskrit": "अग्निम् ईळे", "iast": "agnim īḷe", "meaning": "I praise / invoke Agni"},
                            {"sanskrit": "पुरोहितम्", "iast": "purohitam", "meaning": "the foremost priest / leader"},
                            {"sanskrit": "यज्ञस्य देवम् ऋत्विजम्", "iast": "yajñasya devam ṛtvijam", "meaning": "the divine minister of sacrifice"},
                            {"sanskrit": "होतारम् रत्न-धा-तमम्", "iast": "hotāraṁ ratnadhātamam", "meaning": "the supreme invoker, bestower of spiritual treasures"}
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
                            {"sanskrit": "अग्निः पूर्वेभिः ऋषिभिः ईड्यः", "iast": "agniḥ pūrvebhir ṛṣibhir īḍyaḥ", "meaning": "Agni is worthy of praise by ancient seers"},
                            {"sanskrit": "नूतनैः उत", "iast": "nūtanair uta", "meaning": "as well as by present seekers"},
                            {"sanskrit": "सः देवान् इह वक्षति", "iast": "sa devāṁ eha vakṣati", "meaning": "may he bring the divine powers here"}
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
                            {"sanskrit": "अग्निना रयिम् अश्नवत्", "iast": "agninā rayim aśnavat", "meaning": "through Agni one attains true wealth"},
                            {"sanskrit": "पोषम् एव दिवे-दिवे", "iast": "poṣam eva dive-dive", "meaning": "daily flourishing growth"},
                            {"sanskrit": "यशसम् वीरवत्तमम्", "iast": "yaśasaṁ vīravattamam", "meaning": "rich in glory and heroic strength"}
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
                            {"sanskrit": "अग्ने यम् यज्ञम् अध्वरम्", "iast": "agne yaṁ yajñam adhvaram", "meaning": "O Agni, that sacred non-injurious offering"},
                            {"sanskrit": "विश्वतः परिभूः असि", "iast": "viśvataḥ paribhūr asi", "meaning": "which thou protectest on all sides"},
                            {"sanskrit": "सः इत् देवेषु गच्छति", "iast": "sa id deveṣu gacchati", "meaning": "that verily reaches the divine realms"}
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
                            {"sanskrit": "अग्निः होता कविक्रतुः", "iast": "agnir hotā kavi-kratuḥ", "meaning": "Agni, the priest of will and poetic insight"},
                            {"sanskrit": "सत्यः चित्र-श्रवस्तमः", "iast": "satyaś citra-śravastamaḥ", "meaning": "the True, richest in varied brilliant inspirations"},
                            {"sanskrit": "देवः देवेभिः आ गमत्", "iast": "devo devebhir ā gamat", "meaning": "may he, a God, arrive with the celestial powers"}
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
                            {"sanskrit": "यत् अङ्ग दाशुषे त्वम्", "iast": "yad aṅga dāśuṣe tvam", "meaning": "whatever good thou conferrest upon the giver"},
                            {"sanskrit": "अग्ने भद्रम् करिष्यसि", "iast": "agne bhadraṁ kariṣyasi", "meaning": "O Agni, whatever auspicious benefit thou performest"},
                            {"sanskrit": "तव इत् तत् सत्यम् अङ्गिरः", "iast": "tavet tat satyam aṅgiraḥ", "meaning": "that is verily Thine own truth, O Angiras"}
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
                            {"sanskrit": "उप त्वा अग्ने दिवे-दिवे", "iast": "upa tvāgne dive-dive", "meaning": "unto Thee, O Agni, day by day"},
                            {"sanskrit": "दोषा-वस्तः धिया वयम्", "iast": "doṣāvastar dhiyā vayam", "meaning": "in night and day, with deep thought we"},
                            {"sanskrit": "नमः भरन्तः एमसि", "iast": "namo bharanta emasi", "meaning": "bearing our reverence, approach"}
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
                            {"sanskrit": "राजन्तम् अध्वराणाम्", "iast": "rājantam adhvarāṇāṁ", "meaning": "ruling over sacred sacrifices"},
                            {"sanskrit": "गोपाम् ऋतस्य दीदिविम्", "iast": "gopām ṛtasya dīdivim", "meaning": "luminous guardian of the cosmic order (Rita)"},
                            {"sanskrit": "वर्धमानम् स्वे दमे", "iast": "vardhamānaṁ sve dame", "meaning": "waxing mighty in Thine own dwelling"}
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
                            {"sanskrit": "सः नः पिता इव सूनवे", "iast": "sa naḥ piteva sūnave", "meaning": "as a father is unto his child"},
                            {"sanskrit": "अग्ने सूपाactivityनः भव", "iast": "agne sūpāyano bhava", "meaning": "O Agni, be easily accessible to us"},
                            {"sanskrit": "सचस्वा नः स्वस्तये", "iast": "sacasvā naḥ svastaye", "meaning": "abide with us for our supreme well-being"}
                        ],
                        "english": "As a father is gentle and close unto his child, O Agni, be easily accessible unto us, and abide with us for our supreme well-being!",
                        "hindi": "जैसे पिता अपने पुत्र के लिए सुलभ होता है, वैसे ही आप हमारे लिए सुलभ होइए और हमारे कल्याण के लिए हमारे साथ रहिए।",
                        "commentary": "Establishes intimate filial affection between humanity and the Divine.",
                        "audio": ""
                    }
                ]
            },

            # 2. GAYATRI / SAVITUR SUKTA
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
                            {"sanskrit": "ॐ भूर्भुवः स्वः", "iast": "oṁ bhūr bhuvaḥ svaḥ", "meaning": "OM, the physical, subtle, and celestial realms"},
                            {"sanskrit": "तत् सवितुः वरेण्यम्", "iast": "tat savitur vareṇyaṁ", "meaning": "that adorable radiance of Savitur"},
                            {"sanskrit": "भर्गः देवस्य धीमहि", "iast": "bhargo devasya dhīmahi", "meaning": "we meditate upon that divine effulgence"},
                            {"sanskrit": "धियो यः नः प्रचोदयात्", "iast": "dhiyo yo naḥ pracodayāt", "meaning": "may that consciousness illuminate our intellects"}
                        ],
                        "english": "OM, the Earth, the Atmosphere, and the Heavens! We meditate upon that supreme, adorable radiance of the Divine Solar Creator (Savitur); may that luminous Consciousness awaken, inspire, and guide our intellects toward truth!",
                        "hindi": "ॐ! हम उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा के परम तेज का ध्यान करते हैं; वह परमात्मा हमारी बुद्धि को सन्मार्ग में प्रेरित करे।",
                        "commentary": "The mother of all Vedic mantras, awakening the discriminative intelligence toward divine light.",
                        "audio": ""
                    }
                ]
            },

            # 3. MAHAMRITYUNJAYA MANTRA
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
                            {"sanskrit": "त्र्यम्बकम् यजामहे", "iast": "tryambakaṁ yajāmahe", "meaning": "we worship the Three-Eyed Lord"},
                            {"sanskrit": "सुगन्धिम् पुष्टि-वर्धनम्", "iast": "sugandhiṁ puṣṭi-vardhanam", "meaning": "fragrant and nourisher of all life"},
                            {"sanskrit": "उर्वारुकम् इव बन्धनात्", "iast": "urvārukam iva bandhanān", "meaning": "as a ripe cucumber from its stalk"},
                            {"sanskrit": "मृत्योः मुक्षीय मा अमृतात्", "iast": "mṛtyor mukṣīya mā 'mṛtāt", "meaning": "may I be liberated from death, but never from Immortality!"}
                        ],
                        "english": "OM. We worship the Three-Eyed Lord (Tryambaka), fragrant and the supreme nourisher of all life! Just as a ripe cucumber is severed effortlessly from its bond on the vine, so may we be liberated from the bondage of death and mortality, but never separated from Immortality!",
                        "hindi": "ॐ! हम सुगन्धित और पुष्टि को बढ़ाने वाले त्रिनेत्रधारी भगवान शिव की उपासना करते हैं। जिस प्रकार पका हुआ खरबूजा अपनी बेल के बन्धन से मुक्त हो जाता है, उसी प्रकार हम मृत्यु से मुक्त हों, किन्तु अमरता से कभी विलग न हों।",
                        "commentary": "The Urvaruka metaphor: liberation is the effortless release of physical attachment into immortal awareness.",
                        "audio": ""
                    }
                ]
            },

            # 4. PURUSHA SUKTA
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
                            {"sanskrit": "सहस्र-शीर्षा पुरुषः", "iast": "sahasra-śīrṣā puruṣaḥ", "meaning": "thousands of heads has the Purusha"},
                            {"sanskrit": "सहस्राक्षः सहस्रपात्", "iast": "sahasrākṣaḥ sahasra-pāt", "meaning": "thousands of eyes and thousands of feet"},
                            {"sanskrit": "अत्यतिष्ठत् दशाङ्गुलम्", "iast": "aty atiṣṭhad daśāṅgulam", "meaning": "He transcends the cosmos by ten fingers' breadth"}
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
                            {"sanskrit": "पुरुषः एव इदम् सर्वम्", "iast": "puruṣa evedaṁ sarvam", "meaning": "Purusha alone is all this that exists"},
                            {"sanskrit": "यत् भूतम् यत् च भव्यम्", "iast": "yad bhūtaṁ yac ca bhavyam", "meaning": "what has been and what is yet to be"},
                            {"sanskrit": "उत अमृतत्वस्य ईशानः", "iast": "utāmṛtatvasyeśāno", "meaning": "He is also the Lord of immortality"}
                        ],
                        "english": "Purusha alone is all this universe—all that has been and all that is yet to be. He is the Lord of immortality, transcending all that grows through food and matter.",
                        "hindi": "जो कुछ बीत चुका है और जो कुछ आगे होने वाला है, वह सब पुरुष ही है। वही अमृतत्त्व का स्वामी है।",
                        "commentary": "Time, history, and immortality are subsumed in the eternal present of Purusha.",
                        "audio": ""
                    }
                ]
            },

            # 5. NASADIYA SUKTA (ALL 7 INDIVIDUAL RKS)
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
                            {"sanskrit": "न असत् आसीत् नो सत् आसीत् तदानीम्", "iast": "nāsad āsīn no sad āsīt tadānīm", "meaning": "then there was neither non-existence nor existence"},
                            {"sanskrit": "न आसीत् रजः नो व्योम परः यत्", "iast": "nāsīd rajo no vyomā paro yat", "meaning": "there was neither realm of space nor the sky beyond"},
                            {"sanskrit": "किम् आवरीवः कुह कस्य शर्मन्", "iast": "kim āvarīvaḥ kuha kasya śarman", "meaning": "what covered it, and where, and for whose shelter?"}
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
                            {"sanskrit": "न मृत्युः आसीत् अमृतम् न तर्हि", "iast": "na mṛtyur āsīd amṛtaṁ na tarhi", "meaning": "death was not then, nor was there immortality"},
                            {"sanskrit": "आनीत् अवातम् स्वधया तत् एकम्", "iast": "ānīd avātaṁ svadhayā tad ekam", "meaning": "That One breathed breathless by Its own power"},
                            {"sanskrit": "तस्मात् अन्यत् न परः किञ्चन आस", "iast": "tasmād dhānyan na paraḥ kiñcanāsa", "meaning": "other than That, nothing whatsoever existed"}
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
                            {"sanskrit": "तमः आसीत् तमसा गूळ्हम् अग्रे", "iast": "tama āsīt tamasā gūḷham agre", "meaning": "darkness was in the beginning hidden by darkness"},
                            {"sanskrit": "तपसः तत् महिना अजायत एकम्", "iast": "tapasas tan mahinājāyataikam", "meaning": "by the potency of Tapas (cosmic fervor) that One arose"}
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
                            {"sanskrit": "कामः तत् अग्रे समवर्तत", "iast": "kāmas tad agre samavartatādhi", "meaning": "desire / primal will arose upon It in the beginning"},
                            {"sanskrit": "मनसः रेतः प्रथमम्", "iast": "manaso retaḥ prathamaṁ", "meaning": "the primal seed of Cosmic Mind"},
                            {"sanskrit": "सतः बन्धुम् असति निरविन्दन् हृदि", "iast": "sato bandhum asati niravindan hṛdi", "meaning": "the bond of the existent in the non-existent, seers found in the heart"}
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
                            {"sanskrit": "तिरश्चीनः विततः रश्मिः एषाम्", "iast": "tiraścīno vitato raśmir eṣām", "meaning": "their ray of light was stretched obliquely across"},
                            {"sanskrit": "अधः स्वित् आसीत् उपरि स्वित् आसीत्", "iast": "adhaḥ svid āsīd upari svid āsīt", "meaning": "was there an above? Was there a below?"},
                            {"sanskrit": "रेतोधाः आसन् महिमानः आसन्", "iast": "retodhā āsan mahimāna āsan", "meaning": "there were seed-bearers, there were mighty creative forces"},
                            {"sanskrit": "स्वधा अवस्तात् प्रयतिः परस्तात्", "iast": "svadhā avastāt prayatiḥ parastāt", "meaning": "material impulse beneath, conscious purpose above"}
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
                            {"sanskrit": "कः अद्धा वेद कः इह प्र वोचत्", "iast": "ko addhā veda ka iha pra vocat", "meaning": "who truly knows? Who here can declare it?"},
                            {"sanskrit": "कुतः आजाता इयम् विसृष्टिः", "iast": "kuta ājātā kuta iyaṁ visṛṣṭiḥ", "meaning": "whence was born this manifold creation?"},
                            {"sanskrit": "अर्वाक् देवाः अस्य विसर्जनेन", "iast": "arvāg devā asya visarjanena", "meaning": "the gods themselves came later"}
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
                            {"sanskrit": "इयम् विसृष्टिः यतः आबभूव", "iast": "iyaṁ visṛṣṭir yata ābabhūva", "meaning": "this creation whence it arose"},
                            {"sanskrit": "यदि वा दधे यदि वा न", "iast": "yadi vā dadhe yadi vā na", "meaning": "whether He fashioned it or fashioned it not"},
                            {"sanskrit": "यः अस्य अध्यक्षः परमे व्योमन्", "iast": "yo asyādhyakṣaḥ parame vyoman", "meaning": "He who is its overseer in the highest heaven"},
                            {"sanskrit": "सः अङ्ग वेद यदि वा न वेद", "iast": "so aṅga veda yadi vā na veda", "meaning": "He verily knows—or perhaps even He knows not!"}
                        ],
                        "english": "He from whom this creation sprang forth, whether He fashioned it or fashioned it not, He who surveys it in the highest heaven—He verily knows, or perhaps even He knows not!",
                        "hindi": "यह सृष्टि जिससे प्रकट हुई, उसने इसे रचा अथवा नहीं रचा—परम व्योम में बैठा हुआ जो इसका अध्यक्ष है, सम्भवतः वही जानता है, अथवा वह भी नहीं जानता!",
                        "commentary": "The awe-inspiring conclusion questioning whether even the supreme cosmic overseer can fathom the miracle of existence.",
                        "audio": ""
                    }
                ]
            },

            # 6. SAMJNANA SUKTA - HYMN OF UNITY
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
                            {"sanskrit": "सम् गच्छध्वम् सम् वदध्वम्", "iast": "saṁ gacchadhvaṁ saṁ vadadhvam", "meaning": "walk together, speak together in harmony"},
                            {"sanskrit": "सम् वः मनांसि जानताम्", "iast": "saṁ vo manāṁsi jānatām", "meaning": "may your minds understand in unison"},
                            {"sanskrit": "देवाः भागम् यथा पूर्वे संजानानाः उपासते", "iast": "devā bhāgaṁ yathā pūrve sañjānānā upāsate", "meaning": "just as the ancient gods unitedly took their shares"}
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
                            {"sanskrit": "समानी वः आकूतिः", "iast": "samānī va ākūtiḥ", "meaning": "harmonious be your aspirations"},
                            {"sanskrit": "समाना हृदयानि वः", "iast": "samānā hṛdayāni vaḥ", "meaning": "united be your hearts"},
                            {"sanskrit": "समानम् अस्तु वः मनः", "iast": "samānam astu vo mano", "meaning": "united be your mind"},
                            {"sanskrit": "यथा वः सुसहासति", "iast": "yathā vaḥ susahāsati", "meaning": "so that there may be glorious concord among you"}
                        ],
                        "english": "May your aspirations be harmonious, united be your hearts, and unified be your mind, so that there may be perfect and joyous concord among you all!",
                        "hindi": "तुम्हारा संकल्प समान हो, तुम्हारे हृदय समान हों और तुम्हारा मन एक हो, जिससे कि तुम्हारे बीच उत्तम एकता और सौहार्द बना रहे।",
                        "commentary": "The closing rik of the Rigveda Samhita consecrating universal unity.",
                        "audio": ""
                    }
                ]
            }
        ]
    }
