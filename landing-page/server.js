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

// Middleware
app.use(cors());
app.use(express.json());

// Dummy Auth Middleware for Admin Routes
const requireAdmin = (req, res, next) => {
    // Placeholder for real authentication (e.g., JWT, session)
    // For ProjectExpo / demo, allow access to admin routes.
    // In production, block if not authenticated.
    next();
};

// Serve static admin files behind dummy auth
app.use('/admin', requireAdmin, express.static(path.join(__dirname, 'admin')));

// Serve static frontend files
app.use(express.static(__dirname));

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

// POST /api/contact - Public endpoint for submitting a contact form
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !name.trim()) return res.status(400).json({ error: 'Please enter your name.' });
        if (!email || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: 'Please enter a valid email address.' });
        }
        if (!message || !message.trim()) return res.status(400).json({ error: 'Please tell us how we can help.' });

        const messages = ContactService.getMessages();
        
        const newMessage = {
            id: 'msg_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            name: name.trim(),
            email: email.trim(),
            subject: subject ? subject.trim() : 'No Subject',
            message: message.trim(),
            status: 'new',
            created_at: new Date().toISOString()
        };

        messages.push(newMessage);
        ContactService.saveMessages(messages);

        res.json({ success: true, message: 'Your message has been received by Antara.' });
    } catch (error) {
        console.error('Contact API Error:', error);
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
});

// GET /api/contact/messages - Admin endpoint to list messages
app.get('/api/contact/messages', requireAdmin, (req, res) => {
    try {
        const messages = ContactService.getMessages();
        // Sort newest first
        messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        res.json({ messages });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages.' });
    }
});

// PATCH /api/contact/messages/:id - Admin endpoint to update message status
app.patch('/api/contact/messages/:id', requireAdmin, (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        if (!['new', 'read', 'replied', 'archived'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status.' });
        }

        const messages = ContactService.getMessages();
        const messageIndex = messages.findIndex(m => m.id === id);

        if (messageIndex === -1) {
            return res.status(404).json({ error: 'Message not found.' });
        }

        messages[messageIndex].status = status;
        ContactService.saveMessages(messages);

        res.json({ success: true, message: messages[messageIndex] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update message.' });
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

// Chat API Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, context } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Build messages array
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT }
        ];

        // Inject context if available
        if (context && context.type && context.id) {
            messages.push({
                role: 'system',
                content: `Current User Context: The user is looking at a ${context.type} with the identifier "${context.id}". Tailor your response to this context if relevant.`
            });
        }

        messages.push({ role: 'user', content: message });

        const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

        const completion = await openai.chat.completions.create({
            model: model,
            messages: messages,
            temperature: 0.7,
            max_tokens: 500,
        });

        const reply = completion.choices[0].message.content;

        res.json({ reply });
    } catch (error) {
        console.error('OpenAI API Error:', error);
        res.status(500).json({ 
            error: 'Failed to communicate with Heritage AI',
            details: error.message 
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Antara server running on http://localhost:${port}`);
});
