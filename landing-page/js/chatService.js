/**
 * Heritage AI Chat Service
 *
 * Talks to the server-side /api/chat endpoint, which holds the OpenAI
 * credentials. No API key is ever present in the browser.
 */

class OpenAIChatProvider {
    async sendMessage(message, context = null) {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, context })
        });

        const payload = await response.json().catch(() => null);

        if (!response.ok || !payload || !payload.success) {
            // Surface the server's own wording so the panel can explain what
            // actually happened rather than showing a generic failure.
            const error = new Error(
                (payload && payload.error && payload.error.message) ||
                'Heritage AI could not answer just now.'
            );
            error.code = payload && payload.error && payload.error.code;
            throw error;
        }

        return payload.data.reply;
    }
}

class ChatService {
    constructor() {
        this.provider = new OpenAIChatProvider();
        this.currentContext = null;
    }

    /**
     * Updates the contextual awareness of the AI
     * @param {Object} context { type: 'heritage_site' | 'manuscript' | 'festival', id: string }
     */
    setContext(context) {
        this.currentContext = context;
    }

    sendMessage(message) {
        return this.provider.sendMessage(message, this.currentContext);
    }
}

window.heritageChatService = new ChatService();
