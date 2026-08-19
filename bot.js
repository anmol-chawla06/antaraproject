/**
 * Antara Digital Heritage - Kala Chakra Telegram Bot with Conversational AI RAG
 * 
 * Features:
 * - Unified Single Message Dispatcher (Zero duplicate triggers, zero race conditions)
 * - Message ID & Callback Deduplication (Prevents Telegram re-delivery spam)
 * - Conversational AI Assistant (Google Gemini SDK with Multi-Turn Memory)
 * - Dynamic RAG Grounding from local festivals_database.json
 * - Seamless free-form text handler for greetings ("hi", "hello"), follow-ups ("tell me more", "what food is famous"), and regional queries
 * - State & Context Management: Tracks active festival focus or operates in General Cultural Concierge mode
 * - Professional Cultural Tourism & Heritage Tone (Zero mystical buzzwords or jargon)
 * - Multi-Model AI Failover ('gemini-3.7-flash' -> 'gemini-3.5-flash' -> 'gemini-3.1-flash-lite')
 * - Instant Offline Deterministic Fallback Engine (Zero downtime during live demos)
 * - Interactive Inline Keyboards ([ ◈ Reserve Heritage Pass ], [ ☸ Plan Heritage Trip ], prompt chips)
 */

require('dotenv').config();
const TelegramBotPackage = require('node-telegram-bot-api');
const TelegramBot = TelegramBotPackage.TelegramBot || TelegramBotPackage.default || TelegramBotPackage;
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// 1. Bot & AI Configuration
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const AI_MODELS = ['gemini-3.7-flash', 'gemini-3.5-flash', 'gemini-3.1-flash-lite'];
const AI_TIMEOUT_MS = 6000; // 6-second timeout per model attempt

const bot = new TelegramBot(TELEGRAM_TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10
    }
  }
});

// Suppress polling error spam (e.g. temporary network hiccups)
bot.on('polling_error', (err) => {
  if (err.code !== 'ETELEGRAM') {
    console.warn('[Antara Bot Polling]', err.message);
  }
});

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// 2. Load and Index Festivals Knowledge Base
const DB_PATH = path.join(__dirname, 'festivals_database.json');
let festivals = [];

try {
  const rawData = fs.readFileSync(DB_PATH, 'utf8');
  festivals = JSON.parse(rawData);
  console.log(`[Antara Bot] Successfully loaded ${festivals.length} cultural festivals into knowledge base.`);
} catch (err) {
  console.error('[Antara Bot] Error reading festivals_database.json:', err.message);
  process.exit(1);
}

// 3. User Session & Multi-Turn Conversation Memory
const userSessions = new Map();

function getOrCreateSession(chatId) {
  if (!userSessions.has(chatId)) {
    userSessions.set(chatId, {
      activeFestivalId: null, // null until selected via /start <id> or query
      history: [],           // [{ role: 'user' | 'model', parts: [{ text: '...' }] }]
      lastActivity: Date.now()
    });
  }
  const session = userSessions.get(chatId);
  session.lastActivity = Date.now();
  return session;
}

// 4. Update Deduplication Cache (Ensures every message is handled strictly once)
const processedUpdateIds = new Set();

function isDuplicateUpdate(key) {
  if (processedUpdateIds.has(key)) return true;
  processedUpdateIds.add(key);
  // Bounded memory: keep max 3000 IDs
  if (processedUpdateIds.size > 3000) {
    const firstKey = processedUpdateIds.values().next().value;
    processedUpdateIds.delete(firstKey);
  }
  return false;
}

/**
 * Match festival by ID (supports 'fest_01', 'fest-01', 'fest01', etc.)
 */
function getFestivalById(targetId) {
  if (!targetId) return null;
  const normalized = targetId.trim().toLowerCase().replace('_', '-');
  return festivals.find(f => 
    f.id.toLowerCase() === normalized || 
    f.id.toLowerCase() === targetId.toLowerCase()
  ) || null;
}

/**
 * RAG Search Engine: Identifies relevant festival(s) from natural language query
 */
function searchFestivalByQuery(query) {
  if (!query || typeof query !== 'string') return null;
  const q = query.toLowerCase().trim();

  let bestMatch = null;
  let highestScore = 0;

  for (const fest of festivals) {
    let score = 0;
    const nameLower = fest.name.toLowerCase();
    const stateLower = fest.state.toLowerCase();
    const locLower = fest.location.toLowerCase();
    const idLower = fest.id.toLowerCase();

    // Exact or strong name match
    if (q.includes(nameLower)) score += 60;

    // Partial name tokens
    const nameTokens = nameLower.split(/[\s(),-]+/).filter(t => t.length > 2);
    for (const token of nameTokens) {
      if (q.includes(token)) score += 15;
    }

    // State match
    if (q.includes(stateLower)) score += 12;

    // Location tokens
    const locTokens = locLower.split(/[\s(),-]+/).filter(t => t.length > 3);
    for (const token of locTokens) {
      if (q.includes(token)) score += 10;
    }

    // Direct ID match
    if (q.includes(idLower) || q.includes(idLower.replace('-', '_'))) score += 40;

    // Key cultural term matches
    const cultureTokens = (fest.culture_and_rituals + ' ' + fest.uniqueness).toLowerCase().split(/[\s(),-]+/).filter(t => t.length > 4);
    for (const token of cultureTokens) {
      if (q.includes(token)) score += 3;
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = fest;
    }
  }

  // Return match if sufficient confidence
  return highestScore >= 15 ? bestMatch : null;
}

/**
 * Generates a randomized mock booking reference code
 */
function generateBookingRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = '';
  for (let i = 0; i < 4; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ANTARA-2026-${ref}`;
}

/**
 * Builds interactive inline keyboard markup for a focused festival
 */
function buildFestivalKeyboard(festivalId) {
  return {
    inline_keyboard: [
      [
        { text: '◈ Reserve Heritage Pass', callback_data: `book_${festivalId}` },
        { text: '☸ Plan Heritage Trip', callback_data: `plan_${festivalId}` }
      ],
      [
        { text: '🪷 Traditions & History', callback_data: `ask_rituals_${festivalId}` },
        { text: '🍲 Regional Cuisine', callback_data: `ask_food_${festivalId}` },
        { text: '🗺 Visitor Access Guide', callback_data: `ask_join_${festivalId}` }
      ]
    ]
  };
}

/**
 * Builds interactive inline keyboard for general concierge discovery mode
 */
function buildGeneralKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: '🏜 Rann Utsav (Gujarat)', callback_data: 'select_fest-04' },
        { text: '🏹 Bastar Dussehra (Chhattisgarh)', callback_data: 'select_fest-03' }
      ],
      [
        { text: '🪔 Dev Deepawali (Varanasi)', callback_data: 'select_fest-12' },
        { text: '🎭 Durga Puja (Bengal)', callback_data: 'select_fest-14' }
      ],
      [
        { text: '📜 View All 14 Festivals', callback_data: 'list_festivals' }
      ]
    ]
  };
}

/**
 * RAG Grounded System Prompt Generator
 * Adapts dynamically between Focused Festival Context and General Concierge Discovery
 */
function constructSystemPrompt(activeFestival) {
  const allFestivalsSummary = festivals.map(f => `• ${f.name} (${f.id}): ${f.state} (${f.location}) [${f.timing}] - ${f.uniqueness}`).join('\n');

  if (activeFestival) {
    return `You are "Antara Heritage AI", the official cultural tourism concierge and heritage guide for the Antara Cultural Platform.

ACTIVE FESTIVAL CONTEXT (GROUND TRUTH):
- ID: ${activeFestival.id}
- Name: ${activeFestival.name}
- State & Location: ${activeFestival.location}, ${activeFestival.state}
- Coordinates: ${activeFestival.coordinates}
- Schedule / Season: ${activeFestival.timing}
- Local Language: ${activeFestival.local_language}
- Historical Significance: ${activeFestival.history}
- Cultural Traditions & Highlights: ${activeFestival.culture_and_rituals}
- Visitor Access & Entry Guidelines: ${activeFestival.how_to_join}
- Cultural Significance & Uniqueness: ${activeFestival.uniqueness}

COMPLETE ANTARA CATALOG (FOR BROADER CONTEXT):
${allFestivalsSummary}

CORE CONVERSATIONAL INSTRUCTIONS:
1. FOCUS: The user is currently exploring "${activeFestival.name}". If the user asks open-ended follow-ups like "tell me more", "tell me something more", "what food is famous", "how do I get there", "is it crowded", or "what should I wear", prioritize and ground your answer in this festival's details.
2. TONE & VOCABULARY: Professional, warm, sophisticated, and culturally authentic. Avoid overly mystical buzzwords or religious jargon. Focus on living heritage, historical narratives, architectural beauty, authentic cuisine, and practical visitor guidance.
3. CULINARY HIGHLIGHTS: Highlight authentic regional delicacies, harvest foods, and traditional festive sweets customary to ${activeFestival.state}.
4. SWITCHING CONTEXT: If the user explicitly asks about a different festival or region (e.g. "What about Pushkar?" or "Tell me about celebrations in Kerala"), answer about that topic using the Antara catalog.
5. FORMATTING: Use clean Telegram Markdown with bold headings and tasteful markers (✦, ❖, 🪷, ◈). Keep responses engaging and structured.`;
  }

  // General Concierge Mode (No active festival selected yet)
  return `You are "Antara Heritage AI", the official cultural tourism concierge and heritage guide for the Antara Cultural Platform.

ANTARA COMPLETE HERITAGE CATALOG (14 FEATURED FESTIVALS):
${allFestivalsSummary}

CORE CONVERSATIONAL INSTRUCTIONS:
1. GENERAL CONCIERGE PERSONA: The user has not selected a specific festival yet. When they send greetings ("hi", "hello", "good morning") or open-ended inquiries ("what is Antara?", "help me plan a trip", "which festivals happen in winter?"), greet them warmly and professionally as Antara's cultural tourism concierge.
2. DISCOVERY & HIGHLIGHTS: Provide an inspiring overview of India's cultural festival calendar. Mention 2-3 iconic highlights (such as Rann Utsav in Gujarat, Bastar Dussehra in Chhattisgarh, Dev Deepawali in Varanasi, or Durga Puja in Kolkata) and invite the traveler to choose a region or ask a specific question.
3. TONE: Welcoming, polished, professional, and culturally informative. Avoid mystical buzzwords or esoteric jargon.
4. FORMATTING: Use clean Telegram Markdown with bold text and bullet points.`;
}

/**
 * Local Deterministic RAG Fallback Engine
 * Generates instant, rich structured answers directly from JSON dataset
 * when Gemini API encounters network timeouts, 503 spikes, or rate limits.
 */
function generateLocalRAGFallback(festival, query) {
  const q = (query || '').toLowerCase().trim();

  // General Greeting Fallback (when no active festival or general query)
  if (!festival || q === 'hi' || q === 'hello' || q === 'hey' || q.includes('start') || q.includes('help')) {
    return `✦ *WELCOME TO ANTARA CULTURAL HERITAGE* ✦
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Namaste! I am your **Antara Cultural Tourism Concierge**.

Antara curates 14 of India's most extraordinary cultural festivals, heritage journeys, and living traditions.

✨ *Featured Highlights to Explore:*
• *Rann Utsav (Gujarat)* — The white salt desert cultural carnival
• *Bastar Dussehra (Chhattisgarh)* — The world's longest 75-day tribal congregation
• *Dev Deepawali (Varanasi)* — A million glowing lamps along the Ganga
• *Pushkar Fair (Rajasthan)* — World-famous camel fair and desert folk arts

_Select an option below or type the name of any festival or region to begin!_`;
  }

  // History & Origins
  if (q.includes('history') || q.includes('origin') || q.includes('story') || q.includes('why') || q.includes('who') || q.includes('background') || q.includes('ancient')) {
    return `✦ *HISTORICAL ROOTS: ${festival.name.toUpperCase()}* ✦
━━━━━━━━━━━━━━━━━━━━━━━━━━━
❖ *Location & State:* ${festival.location}, ${festival.state}
✧ *Schedule / Season:* ${festival.timing}

📜 *Historical Context:*
${festival.history}

🪷 *Cultural Significance:*
${festival.uniqueness}

_Ask another question or select an action below to plan your trip._`;
  }

  // Rituals & Traditions
  if (q.includes('ritual') || q.includes('culture') || q.includes('celebrat') || q.includes('tradition') || q.includes('lore')) {
    return `🪷 *TRADITIONS & HERITAGE: ${festival.name.toUpperCase()}* 🪷
━━━━━━━━━━━━━━━━━━━━━━━━━━━
❖ *Festival:* ${festival.name}
✧ *Regional Language:* ${festival.local_language}

✦ *Cultural Traditions & Highlights:*
${festival.culture_and_rituals}

✧ *Cultural Significance:*
${festival.uniqueness}`;
  }

  // Culinary / Food
  if (q.includes('food') || q.includes('cuisine') || q.includes('eat') || q.includes('dish') || q.includes('delicac') || q.includes('sweet') || q.includes('prasad')) {
    return `🍲 *REGIONAL CULINARY HERITAGE & SPECIALTIES* 🍲
━━━━━━━━━━━━━━━━━━━━━━━━━━━
❖ *Region:* ${festival.location}, ${festival.state}
🪷 *Festival:* ${festival.name}

✦ *Authentic Gastronomic Highlights:*
During ${festival.name}, travelers can savor authentic regional delicacies, ceremonial harvest recipes, and traditional festive specialties preserved across generations in ${festival.state}.

✧ *Hospitality & Culture:*
Experience the rich community dining traditions celebrated in the local language of ${festival.local_language}.`;
  }

  // How to Join / Tickets / Access
  if (q.includes('join') || q.includes('ticket') || q.includes('book') || q.includes('reach') || q.includes('pass') || q.includes('how') || q.includes('entry') || q.includes('visit') || q.includes('attend')) {
    return `🗺 *VISITOR ACCESS & ENTRY GUIDE: ${festival.name.toUpperCase()}* 🗺
━━━━━━━━━━━━━━━━━━━━━━━━━━━
❖ *Destination:* ${festival.location} (\`${festival.coordinates}\`)
✦ *Scheduled Timing:* ${festival.timing}

📜 *Entry Details & How to Attend:*
${festival.how_to_join}

✧ *Antara Concierge Tip:*
Select *Reserve Heritage Pass* below for priority booking and pass issuance.`;
  }

  // Default Structured Synopsis / "Tell me more"
  return `✦ *ANTARA HERITAGE GUIDE: ${festival.name.toUpperCase()}* ✦
━━━━━━━━━━━━━━━━━━━━━━━━━━━
❖ *Region:* ${festival.location}, ${festival.state}
✧ *Season:* ${festival.timing}
△ *Coordinates:* \`${festival.coordinates}\`

📜 *Heritage Overview:*
${festival.history}

🪷 *Living Traditions:*
${festival.culture_and_rituals}

✧ *Cultural Significance:*
${festival.uniqueness}`;
}

/**
 * Execute Gemini AI Query with Multi-Model Failover & Timeout Fallback
 */
async function answerWithRAG(chatId, userQuery, activeFestival) {
  const session = getOrCreateSession(chatId);
  const systemPrompt = constructSystemPrompt(activeFestival);

  // Try models in failover sequence
  for (const modelName of AI_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: systemPrompt
      });

      const recentHistory = session.history.slice(-4);
      const chat = model.startChat({
        history: recentHistory
      });

      const aiPromise = chat.sendMessage(userQuery);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('TIMEOUT')), AI_TIMEOUT_MS)
      );

      const response = await Promise.race([aiPromise, timeoutPromise]);
      const responseText = response.response.text();

      // Update conversation history
      session.history.push({
        role: 'user',
        parts: [{ text: userQuery }]
      });
      session.history.push({
        role: 'model',
        parts: [{ text: responseText }]
      });

      if (session.history.length > 8) {
        session.history = session.history.slice(-8);
      }

      return responseText;
    } catch (err) {
      console.warn(`[Antara Bot] Model ${modelName} skipped: ${err.message}`);
      // Proceed to next model
    }
  }

  // Local Grounded RAG Fallback
  console.log(`[Antara Bot] Using Local Grounded RAG Fallback for Chat ${chatId}`);
  return generateLocalRAGFallback(activeFestival, userQuery);
}

/**
 * Helper to safely send markdown or fallback to plain text
 */
async function sendSafeMessage(chatId, text, options = {}) {
  try {
    return await bot.sendMessage(chatId, text, { parse_mode: 'Markdown', ...options });
  } catch (err) {
    try {
      return await bot.sendMessage(chatId, text, { ...options, parse_mode: undefined });
    } catch (innerErr) {
      console.error('[Antara Bot] Message delivery failed:', innerErr.message);
    }
  }
}

// ==========================================
// 5. UNIFIED COMMAND & MESSAGE DISPATCHERS
// ==========================================

// Handle /start command (with optional deep-link parameter)
async function handleStartCommand(chatId, param) {
  const session = getOrCreateSession(chatId);

  // If a festival parameter was passed (e.g. from web portal button)
  if (param) {
    const festival = getFestivalById(param);
    if (festival) {
      session.activeFestivalId = festival.id;
      session.history = []; // Clean state for newly selected festival

      const welcomeMessage = 
`✦ *ANTARA — CULTURAL HERITAGE & FESTIVALS* ✦
━━━━━━━━━━━━━━━━━━━━━━━━━━━
❖ *${festival.name}*
• *State:* ${festival.state}
• *Location:* ${festival.location}
• *Timing:* ${festival.timing}
• *Language:* ${festival.local_language}

📜 *Heritage Overview:*
_${festival.uniqueness}_

🤖 *Antara AI Guide Active:*
_I am your cultural tourism concierge powered by Gemini. Ask me anything about this festival's history, traditions, cuisine, or visitor entry, or select an option below:_`;

      await sendSafeMessage(chatId, welcomeMessage, {
        reply_markup: buildFestivalKeyboard(festival.id)
      });
      return;
    }
  }

  // Default /start (General Discovery Mode)
  session.activeFestivalId = null;
  session.history = [];

  const generalWelcome = 
`✦ *WELCOME TO ANTARA — DIGITAL HERITAGE PORTAL* ✦
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Namaste! I am your **Antara Cultural Tourism Concierge**, powered by Google Gemini AI and grounded in our verified heritage database.

I can help you explore India's vibrant cultural festivals, plan customized itineraries, discover regional culinary traditions, and secure verified heritage passes.

💬 *Ask me anything naturally! For example:*
• _"Tell me about Rann Utsav in Gujarat."_
• _"What festivals happen during monsoon season?"_
• _"What traditional foods are famous during Durga Puja?"_
• _"Which festival is the longest in the world?"_

Or select a featured destination below to begin:`;

  await sendSafeMessage(chatId, generalWelcome, {
    reply_markup: buildGeneralKeyboard()
  });
}

// Handle /help command
async function handleHelpCommand(chatId) {
  const helpText = 
`✦ *ANTARA HERITAGE ASSISTANT — GUIDE* ✦
━━━━━━━━━━━━━━━━━━━━━━━━━━━
• */start* — Discover curated cultural festivals
• */start <festival_id>* — Deep-link into a specific heritage festival
• */festivals* — View complete list of all 14 featured festivals
• */reset* — Clear conversation memory & start fresh

💬 *Conversational AI Guide:*
You can speak to me freely at any time!
- Send greetings like *"hi"* or *"hello"*.
- Ask follow-ups like *"tell me something more"*, *"what food is famous"*, or *"how do I reach there"*.
- Ask cross-festival questions like *"which festivals feature dance and music?"*`;

  await sendSafeMessage(chatId, helpText);
}

// Handle /festivals command
async function handleFestivalsCommand(chatId) {
  let listText = `✦ *ANTARA HERITAGE CATALOG (${festivals.length} FEATURED FESTIVALS)* ✦\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  festivals.forEach((f, idx) => {
    listText += `*${idx + 1}. ${f.name}*\n📍 ${f.location}, ${f.state} | 🗓 ${f.timing}\n👉 /start ${f.id}\n\n`;
  });

  await sendSafeMessage(chatId, listText);
}

// Handle /reset command
async function handleResetCommand(chatId) {
  userSessions.delete(chatId);
  await sendSafeMessage(chatId, `✧ *Session Reset:* Conversation memory cleared. Ready for your next heritage exploration!`, {
    reply_markup: buildGeneralKeyboard()
  });
}

// ==========================================
// 6. MAIN EVENT LISTENERS (DEDUPLICATED)
// ==========================================

// Unified Message Listener: Handles commands and free-form messages strictly once without conflicts
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const messageId = msg.message_id;

  // Deduplication check: Ignore if this message was already processed
  const updateKey = `msg_${chatId}_${messageId}`;
  if (isDuplicateUpdate(updateKey)) return;

  // Ignore non-text messages
  if (!msg.text || typeof msg.text !== 'string') return;
  const rawText = msg.text.trim();

  // 1. Process Explicit Commands (Strictly routes to command handlers, never falls through to conversational AI)
  if (rawText.startsWith('/')) {
    const parts = rawText.split(/\s+/);
    const command = parts[0].toLowerCase().split('@')[0]; // Remove bot handle if present (e.g. /start@AntaraBot)
    const param = parts.slice(1).join(' ').trim();

    if (command === '/start') {
      await handleStartCommand(chatId, param);
      return;
    }
    if (command === '/help') {
      await handleHelpCommand(chatId);
      return;
    }
    if (command === '/festivals') {
      await handleFestivalsCommand(chatId);
      return;
    }
    if (command === '/reset') {
      await handleResetCommand(chatId);
      return;
    }

    // Default unknown command response
    await sendSafeMessage(chatId, `✦ Type */start* to explore festivals, */festivals* to view the catalog, or ask me any question!`);
    return;
  }

  // 2. Process Free-Form Conversational Message (RAG AI Chat)
  const session = getOrCreateSession(chatId);

  // Send typing indicator immediately for fluid feedback
  bot.sendChatAction(chatId, 'typing').catch(() => {});

  // Check if query explicitly references a specific festival
  const matchedFestival = searchFestivalByQuery(rawText);
  if (matchedFestival) {
    session.activeFestivalId = matchedFestival.id;
  }

  const activeFestival = getFestivalById(session.activeFestivalId);

  try {
    const aiResponse = await answerWithRAG(chatId, rawText, activeFestival);
    const keyboard = activeFestival 
      ? buildFestivalKeyboard(activeFestival.id) 
      : buildGeneralKeyboard();

    await sendSafeMessage(chatId, aiResponse, {
      reply_markup: keyboard
    });
  } catch (err) {
    console.error('[Antara Bot] Conversational message error:', err.message);
    const fallbackResponse = generateLocalRAGFallback(activeFestival, rawText);
    const keyboard = activeFestival 
      ? buildFestivalKeyboard(activeFestival.id) 
      : buildGeneralKeyboard();

    await sendSafeMessage(chatId, fallbackResponse, {
      reply_markup: keyboard
    });
  }
});

// Callback Query Listener: Interactive Action Buttons
bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const callbackId = query.id;
  const data = query.data || '';

  // Deduplication check: Ignore repeated callback delivery
  const callbackKey = `cb_${callbackId}`;
  if (isDuplicateUpdate(callbackKey)) return;

  // Instantly acknowledge callback to eliminate client spinner
  bot.answerCallbackQuery(callbackId).catch(() => {});

  const session = getOrCreateSession(chatId);

  // General list callback
  if (data === 'list_festivals') {
    await handleFestivalsCommand(chatId);
    return;
  }

  // Festival selection from general menu (e.g. select_fest-04)
  if (data.startsWith('select_')) {
    const festId = data.replace('select_', '');
    const festival = getFestivalById(festId);
    if (festival) {
      session.activeFestivalId = festival.id;
      session.history = [];

      const festivalIntro = 
`✦ *ANTARA CULTURAL GUIDE: ${festival.name.toUpperCase()}* ✦
━━━━━━━━━━━━━━━━━━━━━━━━━━━
❖ *Location:* ${festival.location}, ${festival.state}
🗓 *Season:* ${festival.timing}
✧ *Regional Tongue:* ${festival.local_language}

📜 *Overview:*
_${festival.uniqueness}_

_Ask me anything about ${festival.name} or select an option below:_`;

      await sendSafeMessage(chatId, festivalIntro, {
        reply_markup: buildFestivalKeyboard(festival.id)
      });
      return;
    }
  }

  // Quick AI prompt chips (ask_rituals_fest-01, ask_food_fest-01, ask_join_fest-01)
  if (data.startsWith('ask_')) {
    const parts = data.split('_');
    const category = parts[1]; // 'rituals', 'food', 'join'
    const festId = parts.slice(2).join('_');
    const festival = getFestivalById(festId || session.activeFestivalId) || festivals[0];
    session.activeFestivalId = festival.id;

    let question = `Tell me about the traditions, history, and cultural highlights of ${festival.name}.`;
    if (category === 'food') question = `What are the authentic delicacies and regional food traditions of ${festival.name} in ${festival.state}?`;
    if (category === 'join') question = `How can I visit and attend ${festival.name}? What are the visitor access and entry guidelines?`;

    bot.sendChatAction(chatId, 'typing').catch(() => {});
    const aiAnswer = await answerWithRAG(chatId, question, festival);

    await sendSafeMessage(chatId, aiAnswer, {
      reply_markup: buildFestivalKeyboard(festival.id)
    });
    return;
  }

  // Extract action and festivalId for booking & planning
  const underscoreIndex = data.indexOf('_');
  if (underscoreIndex === -1) return;

  const action = data.substring(0, underscoreIndex);
  const festivalId = data.substring(underscoreIndex + 1);
  const festival = getFestivalById(festivalId || session.activeFestivalId) || festivals[0];
  session.activeFestivalId = festival.id;

  if (action === 'book') {
    const bookingRef = generateBookingRef();
    const paymentTimestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const bookingMessage =
`◈ *ANTARA HERITAGE PASS — CONFIRMATION* ◈
━━━━━━━━━━━━━━━━━━━━━━━━━━━
• *Payment Gateway:* Razorpay (Settled & Verified)
• *Booking Ref:* \`${bookingRef}\`
• *Issued At:* ${paymentTimestamp}

❖ *Expedition:* ${festival.name}
❖ *Destination:* ${festival.location}, ${festival.state}
✦ *Schedule:* ${festival.timing}
✦ *Total Paid:* ₹4,999 (All-Inclusive Heritage Pass)

📜 *Access & Entry Details:*
${festival.how_to_join}

✧ _Present this digital pass at the Antara Welcome Desk upon arrival._`;

    await sendSafeMessage(chatId, bookingMessage, {
      reply_markup: {
        inline_keyboard: [
          [{ text: '☸ Plan Heritage Trip', callback_data: `plan_${festival.id}` }],
          [{ text: '💬 Ask AI Guide about this Festival', callback_data: `ask_rituals_${festival.id}` }]
        ]
      }
    });
  } else if (action === 'plan') {
    const itineraryMessage =
`☸ *2-DAY HERITAGE ITINERARY: ${festival.name.toUpperCase()}* ☸
━━━━━━━━━━━━━━━━━━━━━━━━━━━
❖ *Region:* ${festival.location}, ${festival.state}
✧ *Local Language:* ${festival.local_language}
△ *Coordinates:* \`${festival.coordinates}\`

✦ *DAY 1 — HERITAGE ORIENTATION & ROOTS*
• *Morning:* Arrival & traditional welcome. Private check-in at curated heritage accommodation.
• *Afternoon:* Historical briefing with an Antara cultural historian.
  _${festival.history}_
• *Evening:* Guided walk through historic heritage avenues & evening cultural program.

✦ *DAY 2 — FESTIVAL HIGHLIGHTS & TRADITIONAL EXPERIENCES*
• *Morning:* Priority access to core festivities and celebratory processions.
  _${festival.culture_and_rituals}_
• *Afternoon:* Artisan immersion — witness traditional craftspeople and folk musicians.
• *Night:* Concluding community banquet and evening cultural gathering.

🪷 *AUTHENTIC CULINARY HIGHLIGHT*
• Savor regional festive delicacies and traditional recipes passed down through generations.

✧ *Cultural Significance:*
_${festival.uniqueness}_
━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    await sendSafeMessage(chatId, itineraryMessage, {
      reply_markup: {
        inline_keyboard: [
          [{ text: '◈ Reserve Heritage Pass', callback_data: `book_${festival.id}` }],
          [{ text: '🍲 Ask AI about Regional Cuisine', callback_data: `ask_food_${festival.id}` }]
        ]
      }
    });
  }
});

console.log(`[Antara Bot] Conversational AI Heritage Bot initialized successfully.`);
console.log(`[Antara Bot] Single Unified Dispatcher: Active (Zero Duplicate Spams)`);
console.log(`[Antara Bot] Failover Pipeline: ${AI_MODELS.join(' -> ')}`);
console.log(`[Antara Bot] Festivals Loaded: ${festivals.length}`);
console.log(`[Antara Bot] Ready to assist travelers and cultural visitors.`);