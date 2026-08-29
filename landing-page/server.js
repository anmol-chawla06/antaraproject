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

/* Build the OpenAI client lazily, on first use.
 *
 * The constructor THROWS when no key is present. Doing that at module load
 * meant an unset OPENAI_API_KEY took down the whole server on import - locally
 * a crash on start, and on a serverless host a function that fails before it
 * can serve anything, so the map, library and every other page would 404 too.
 * Heritage AI is one feature; it must not be able to fell the site.
 *
 * The route already answers 503 AI_UNCONFIGURED when the key is missing, so
 * this is only ever constructed on a request that has a key to use. */
let openaiClient = null;
function getOpenAI() {
    if (!process.env.OPENAI_API_KEY) return null;
    if (!openaiClient) {
        openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    return openaiClient;
}

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

/* Repository material that is not part of the public site.
 *
 * All of this sits at the repository root and would otherwise be handed out by
 * the root static mount below. Most of it holds no secret, but none of it is
 * part of the product: dependency trees, build tooling, the test harness, the
 * internal documentation and the platform configuration.
 *
 * This guard matters more than it looks. Express is the ONLY thing standing in
 * front of these files — the deployment publishes an empty output directory
 * precisely so that the platform's CDN cannot answer any request before this
 * code runs (see vercel-static/.gitkeep). Anything omitted here is public. */
app.use([
    '/vercel.json', '/api/index.js', '/.vercelignore', '/.vercel',   // platform config
    '/node_modules',                                                 // dependency tree
    '/package.json', '/package-lock.json',                           // manifests
    '/data_builders', '/test_support'                                // build + test tooling
], (req, res) => res.status(404).end());

/* Developer-facing file types, blocked by extension rather than by name so that
   adding another document or script cannot quietly publish it. .vercelignore
   already keeps most of these out of the deployment; this makes local and
   production behave identically, which is the failure mode that produced this
   guard in the first place. Nothing the browser loads uses these extensions. */
const PRIVATE_EXTENSIONS = /\.(md|py|sh|bat|ya?ml|ini|log)$/i;
app.use((req, res, next) => {
    let rel;
    try {
        rel = decodeURIComponent(req.path);
    } catch (err) {
        return res.status(404).end();          // malformed escape sequence
    }
    if (PRIVATE_EXTENSIONS.test(rel)) return res.status(404).end();
    if (/^\/validate_[^/]*\.js$/.test(rel)) return res.status(404).end();
    return next();
});

// The repo root hosts three sibling apps (festival portal, map, library)
// that the landing page links out to.
const ROOT_DIR = path.join(__dirname, '..');

/* This directory is a child of ROOT_DIR, so the repo-root static mount at the
 * bottom of this file served every file in it a second time under the
 * "/landing-page/" prefix — a path the /admin and /data guards above never
 * see. That quietly published the raw contact store (names, e-mail addresses
 * and message bodies), the admin shell, the auth middleware and server.js
 * itself to anyone who asked.
 *
 * Only the landing page's own public assets may be reached by that prefix.
 * Anything else under it is answered 404, exactly as if it were not there. */
const LANDING_PUBLIC_FILES = new Set(['', 'index.html', 'favicon.svg', 'robots.txt']);
const LANDING_PUBLIC_DIRS = ['css', 'js', 'assets'];

app.use('/landing-page', (req, res, next) => {
    let rel;
    try {
        rel = decodeURIComponent(req.path).replace(/\\/g, '/').replace(/^\/+/, '');
    } catch (err) {
        return res.status(404).end();          // malformed escape sequence
    }
    if (rel.split('/').includes('..')) return res.status(404).end();
    if (LANDING_PUBLIC_FILES.has(rel)) return next();
    if (LANDING_PUBLIC_DIRS.some(dir => rel === dir || rel.startsWith(dir + '/'))) return next();
    return res.status(404).end();
});

/* Two different applications ship a file called index.html: the Antara landing
 * page in this directory, and the festival portal at the repository root.
 * Which one answers a given URL is a product decision, so both are stated
 * explicitly here rather than left to whichever express.static mount happens to
 * be registered first.
 *
 *   /               -> the landing page          (the production root)
 *   /festivals.html -> the festival portal       (its own stable URL)
 *   /index.html     -> the festival portal       (kept: the landing page links
 *                      to "../index.html", as do bookmarks and older links)
 */
const LANDING_INDEX = path.join(__dirname, 'index.html');
const FESTIVALS_INDEX = path.join(ROOT_DIR, 'index.html');

app.get('/', (req, res, next) => res.sendFile(LANDING_INDEX, err => err && next(err)));
app.get(['/festivals.html', '/index.html'],
    (req, res, next) => res.sendFile(FESTIVALS_INDEX, err => err && next(err)));

// Serve static frontend files (landing page markup/css/js)
app.use(express.static(__dirname));

// Serve the sibling apps: map.html, library.html, and their data/images
app.use(express.static(ROOT_DIR, { dotfiles: 'ignore' }));

// ==========================================================================
// Contact Service & Storage
// ==========================================================================
/* Storage lives behind services/contactStore.js, which picks an implementation
   from configuration and presents one async interface either way:

     no DATABASE_URL  -> JSON file store, for local development
     DATABASE_URL set -> PostgreSQL store, for Vercel and any other host whose
                         filesystem cannot keep a file between requests

   Construction connects to nothing and writes nothing. That is deliberate: the
   previous code called mkdirSync/writeFileSync at module load, which throws
   EROFS on a serverless read-only filesystem and took down the entire function
   on import — every page, not merely the contact form. */
const { createContactStore } = require('./services/contactStore');
const ContactStore = createContactStore({ dataDir: path.join(__dirname, 'data') });

// Where a visitor should turn if we cannot store their message.
const CONTACT_FALLBACK_EMAIL = (process.env.CONTACT_EMAIL || '').trim();

// ==========================================================================
// API Routes
// ==========================================================================

const contactLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: 'You have sent several messages already. Please try again shortly.'
});

// Long enough for a real enquiry, short enough to keep either store sane.
const FIELD_LIMITS = { name: 120, email: 200, subject: 200, message: 5000 };

// POST /api/contact - Public endpoint for submitting a contact form
app.post('/api/contact', contactLimiter, async (req, res) => {
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

        const newMessage = {
            id: 'msg_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            ...trimmed,
            status: 'new',
            created_at: new Date().toISOString()
        };

        const stored = await ContactStore.add(newMessage);

        /* Never accept a message we cannot keep. Answering "received" and then
           dropping it is worse than declining, because the visitor stops
           waiting for a reply that will never come. The reason is logged
           server-side by the store; the visitor is told only what to do next. */
        if (!stored.ok) {
            return fail(res, 503, 'CONTACT_STORAGE_UNAVAILABLE',
                CONTACT_FALLBACK_EMAIL
                    ? 'Messages cannot be received here just now. Please e-mail ' + CONTACT_FALLBACK_EMAIL + ' instead.'
                    : 'Messages cannot be received here just now. Please try again later.');
        }

        return ok(res, { message: 'Your message has been received by Antara.' });
    } catch (error) {
        console.error('Contact API Error:', error);
        return fail(res, 500, 'CONTACT_FAILED', 'Something went wrong. Please try again later.');
    }
});

// GET /api/contact/messages - Admin endpoint to list messages
app.get('/api/contact/messages', requireAdmin, async (req, res) => {
    try {
        // Both stores return newest first, so the inbox needs no re-sorting.
        const messages = await ContactStore.list();
        // The inbox says plainly whether new submissions can be stored at all.
        const writable = await ContactStore.isWritable();
        return ok(res, { messages, storage: { writable, kind: ContactStore.kind } });
    } catch (error) {
        // Store errors are opaque by the time they arrive; details are already logged.
        console.error('Admin list error:', error.message);
        return fail(res, 500, 'FETCH_FAILED', 'Failed to fetch messages.');
    }
});

// PATCH /api/contact/messages/:id - Admin endpoint to update message status
app.patch('/api/contact/messages/:id', requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body || {};

        if (!['new', 'read', 'replied', 'archived'].includes(status)) {
            return fail(res, 400, 'INVALID_STATUS', 'That status is not recognised.');
        }

        const updated = await ContactStore.setStatus(id, status);

        if (!updated.ok && updated.reason === 'NOT_FOUND') {
            return fail(res, 404, 'NOT_FOUND', 'Message not found.');
        }
        if (!updated.ok) {
            return fail(res, 503, 'CONTACT_STORAGE_UNAVAILABLE',
                'Message storage could not be written, so the status was not changed.');
        }

        return ok(res, { message: updated.message });
    } catch (error) {
        console.error('Admin update error:', error.message);
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

        const openai = getOpenAI();
        if (!openai) {
            return fail(res, 503, 'AI_UNCONFIGURED', 'Heritage AI is not configured on this server.');
        }

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

function startupWarnings() {
    if (!isConfigured()) {
        console.warn('  ADMIN_PASSWORD is not set - the admin area is disabled.');
    }
    if (!process.env.ADMIN_SESSION_SECRET) {
        console.warn('  ADMIN_SESSION_SECRET is not set - sessions end when this process does.');
    }
    if (!process.env.OPENAI_API_KEY) {
        console.warn('  OPENAI_API_KEY is not set - Heritage AI is disabled.');
    }
    /* The front ends are static files that a bundler never touches, so they are
       only present in a serverless deployment if the platform was told to
       include them. If that ever silently fails, "/" would fall through to the
       next static mount and quietly serve the WRONG application — so say so at
       start-up instead, where the deployment log will show it. */
    [['landing page', LANDING_INDEX], ['festival portal', FESTIVALS_INDEX]].forEach(([label, file]) => {
        if (!fs.existsSync(file)) {
            console.error('  MISSING: the ' + label + ' (' + file + ') is not in this deployment.');
        }
    });
    /* Says which store is in use and where — the host, never the connection
       string, which carries the password. */
    console.log('  Contact storage: ' + ContactStore.kind + ' (' + ContactStore.location + ')');
    if (ContactStore.kind === 'file' && process.env.VERCEL) {
        console.warn('  No DATABASE_URL on a serverless host - contact messages cannot be stored.');
    }
}

/* Listen only when this file is run directly (`npm run dev`).
 *
 * On a serverless host the platform imports this module and invokes the
 * exported app once per request; calling listen() there would bind a port
 * nothing routes to. Exporting the app keeps a single server definition
 * serving both local development and Vercel. */
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Antara server running on http://localhost:${port}`);
        startupWarnings();
    });
} else {
    startupWarnings();
}

module.exports = app;
