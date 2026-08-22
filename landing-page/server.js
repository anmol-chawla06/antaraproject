const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const { requireAdmin, passwordMatches, startSession, endSession, isConfigured } = require('./middleware/adminAuth');
const { rateLimit } = require('./middleware/rateLimit');

// Consistent response envelopes, so every client parses replies the same way.
const ok = (res, data) => res.json({ success: true, data });
const fail = (res, status, code, message) =>
    res.status(status).json({ success: false, error: { code, message } });

// Browsers on the same origin send no Origin header, so local use needs no
// entry here. Cross-origin callers must be named in ALLOWED_ORIGINS.
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => callback(null, !origin || allowedOrigins.includes(origin)),
    credentials: true
}));

// Contact and chat payloads are small; a cap stops trivial memory abuse.
app.use(express.json({ limit: '32kb' }));

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many sign-in attempts. Try again in a few minutes.'
});

app.post('/api/admin/login', loginLimiter, (req, res) => {
    if (!isConfigured()) {
        return fail(res, 503, 'ADMIN_DISABLED', 'Admin access is not configured on this server.');
    }
    if (!passwordMatches(req.body && req.body.password)) {
        return fail(res, 401, 'INVALID_PASSWORD', 'That password is not correct.');
    }
    startSession(res);
    return ok(res, { signedIn: true });
});

app.post('/api/admin/logout', (req, res) => {
    endSession(res);
    return ok(res, { signedIn: false });
});

// Serve static admin files behind real session auth
app.use('/admin', requireAdmin, express.static(path.join(__dirname, 'admin')));

// Never expose the raw contact-message store over HTTP (was previously
// reachable at /data/contact_messages.json via the static middleware below)
app.use('/data', (req, res) => res.status(404).end());

// The repo root hosts three sibling apps (festival portal, map, library)
// that the landing page links out to.
const ROOT_DIR = path.join(__dirname, '..');

// Both the landing page and the festival portal ship a file named
// index.html. The landing page owns bare "/"; any explicit request for
// "/index.html" (e.g. the "../index.html" links from the landing page)
// should always resolve to the festival portal at the repo root.
app.get('/index.html', (req, res) => res.sendFile(path.join(ROOT_DIR, 'index.html')));

// Serve static frontend files (landing page markup/css/js, and "/" itself)
app.use(express.static(__dirname));

// Serve the sibling apps: map.html, library.html, and their data/images
app.use(express.static(ROOT_DIR, { dotfiles: 'ignore' }));

// ==========================================================================
// Contact Service & Storage
// ==========================================================================
const DATA_DIR = path.join(__dirname, 'data');
const CONTACT_FILE = path.join(DATA_DIR, 'contact_messages.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
// Ensure JSON file exists
if (!fs.existsSync(CONTACT_FILE)) {
    fs.writeFileSync(CONTACT_FILE, JSON.stringify([]));
}

const ContactService = {
    getMessages: () => {
        try {
            const data = fs.readFileSync(CONTACT_FILE, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error("Error reading contact messages:", error);
            return [];
        }
    },
    saveMessages: (messages) => {
        try {
            fs.writeFileSync(CONTACT_FILE, JSON.stringify(messages, null, 2));
        } catch (error) {
            console.error("Error saving contact messages:", error);
        }
    }
};

// ==========================================================================
// API Routes
// ==========================================================================

const contactLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: 'You have sent several messages already. Please try again shortly.'
});

// Long enough for a real enquiry, short enough to keep the JSON store sane.
const FIELD_LIMITS = { name: 120, email: 200, subject: 200, message: 5000 };

// POST /api/contact - Public endpoint for submitting a contact form
app.post('/api/contact', contactLimiter, (req, res) => {
    try {
        const { name, email, subject, message } = req.body || {};

        if (!name || !String(name).trim()) return fail(res, 400, 'NAME_REQUIRED', 'Please enter your name.');
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
            return fail(res, 400, 'EMAIL_INVALID', 'Please enter a valid email address.');
        }
        if (!message || !String(message).trim()) {
            return fail(res, 400, 'MESSAGE_REQUIRED', 'Please tell us how we can help.');
        }

        const trimmed = {
            name: String(name).trim(),
            email: String(email).trim(),
            subject: subject ? String(subject).trim() : 'No Subject',
            message: String(message).trim()
        };

        for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
            if (trimmed[field].length > limit) {
                return fail(res, 400, 'FIELD_TOO_LONG', `Your ${field} is longer than ${limit} characters.`);
            }
        }

        const messages = ContactService.getMessages();
        const newMessage = {
            id: 'msg_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            ...trimmed,
            status: 'new',
            created_at: new Date().toISOString()
        };

        messages.push(newMessage);
        ContactService.saveMessages(messages);

        return ok(res, { message: 'Your message has been received by Antara.' });
    } catch (error) {
        console.error('Contact API Error:', error);
        return fail(res, 500, 'CONTACT_FAILED', 'Something went wrong. Please try again later.');
    }
});

// GET /api/contact/messages - Admin endpoint to list messages
app.get('/api/contact/messages', requireAdmin, (req, res) => {
    try {
        const messages = ContactService.getMessages();
        messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        return ok(res, { messages });
    } catch (error) {
        console.error('Admin list error:', error);
        return fail(res, 500, 'FETCH_FAILED', 'Failed to fetch messages.');
    }
});

// PATCH /api/contact/messages/:id - Admin endpoint to update message status
app.patch('/api/contact/messages/:id', requireAdmin, (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body || {};

        if (!['new', 'read', 'replied', 'archived'].includes(status)) {
            return fail(res, 400, 'INVALID_STATUS', 'That status is not recognised.');
        }

        const messages = ContactService.getMessages();
        const messageIndex = messages.findIndex(m => m.id === id);

        if (messageIndex === -1) {
            return fail(res, 404, 'NOT_FOUND', 'Message not found.');
        }

        messages[messageIndex].status = status;
        ContactService.saveMessages(messages);

        return ok(res, { message: messages[messageIndex] });
    } catch (error) {
        console.error('Admin update error:', error);
        return fail(res, 500, 'UPDATE_FAILED', 'Failed to update message.');
    }
});

// ==========================================================================
// OpenAI Chat Endpoint
// ==========================================================================

// System prompt for the Antara Heritage AI
const SYSTEM_PROMPT = `
You are the Heritage AI for a platform called ANTARA. 
ANTARA is a premium digital heritage platform connecting place, history, culture, language, tradition, travel, festivals, and knowledge in India.
The user is currently exploring the ANTARA platform.

Your philosophy is: "स्मृतिषु संस्कृतिः, स्थलेषु इतिहासः।" (In memories, culture; in places, history.)

Guidelines:
- Maintain a warm, elegant, intellectual, and helpful tone.
- When answering questions about Indian heritage, be accurate and respectful.
- If the user context is provided, tailor your response to that specific heritage site, manuscript, or festival.
- Keep responses concise unless the user asks for a detailed story.
- Do NOT fabricate heritage facts or statistics.
- If you don't know the answer, politely say so.
`;

const chatLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 12,
    message: 'You are asking faster than Heritage AI can answer. Please wait a moment.'
});

// Chat API Endpoint
app.post('/api/chat', chatLimiter, async (req, res) => {
    try {
        const { message, context } = req.body || {};

        if (!message || !String(message).trim()) {
            return fail(res, 400, 'MESSAGE_REQUIRED', 'Please enter a question.');
        }
        if (String(message).length > 2000) {
            return fail(res, 400, 'MESSAGE_TOO_LONG', 'Please shorten your question to 2000 characters or fewer.');
        }
        if (!process.env.OPENAI_API_KEY) {
            return fail(res, 503, 'AI_UNCONFIGURED', 'Heritage AI is not configured on this server.');
        }

        // Build messages array
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT }
        ];

        // Inject context if available. Values reach the prompt from the browser,
        // so they are clipped rather than passed through at arbitrary length.
        if (context && context.type && context.id) {
            const type = String(context.type).slice(0, 40);
            const id = String(context.id).slice(0, 120);
            messages.push({
                role: 'system',
                content: `Current User Context: The user is looking at a ${type} with the identifier "${id}". Tailor your response to this context if relevant.`
            });
        }

        messages.push({ role: 'user', content: String(message) });

        const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

        const completion = await openai.chat.completions.create({
            model: model,
            messages: messages,
            temperature: 0.7,
            max_tokens: 500,
        });

        const reply = completion.choices[0].message.content;

        return ok(res, { reply });
    } catch (error) {
        // Logged in full server-side; the client is told only that it failed,
        // so upstream provider details never reach the browser.
        console.error('OpenAI API Error:', error);
        return fail(res, 502, 'AI_UNAVAILABLE', 'Heritage AI could not answer just now. Please try again.');
    }
});

// Catch-all error handler, so a thrown route never returns a stack trace.
app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);

    // express.json rejects oversized and malformed bodies before any route runs;
    // both deserve their real status rather than a blanket 500.
    if (error.type === 'entity.too.large') {
        return fail(res, 413, 'PAYLOAD_TOO_LARGE', 'That request is too large.');
    }
    if (error.type === 'entity.parse.failed') {
        return fail(res, 400, 'MALFORMED_JSON', 'That request body is not valid JSON.');
    }

    console.error('Unhandled error:', error);
    return fail(res, 500, 'INTERNAL_ERROR', 'Something went wrong. Please try again.');
});

// Start the server
app.listen(port, () => {
    console.log(`Antara server running on http://localhost:${port}`);
    if (!isConfigured()) {
        console.warn('  ADMIN_PASSWORD is not set - the admin area is disabled.');
    }
    if (!process.env.OPENAI_API_KEY) {
        console.warn('  OPENAI_API_KEY is not set - Heritage AI is disabled.');
    }
});
