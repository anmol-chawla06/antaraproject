const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const path = require('path');

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

// Serve static files from the current directory (since we are in the frontend directory)
app.use(express.static(__dirname));

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
