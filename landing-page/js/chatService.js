/**
 * Heritage AI Chat Service
 * 
 * Abstracted service for handling chat requests. 
 * Currently uses a Mock provider for the landing page demonstration.
 * Designed to easily swap to a real backend provider (e.g., OpenAI via /api/chat) later.
 */

class MockChatProvider {
    async sendMessage(message, context = null) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        let response = "[Mock AI] Thank you for your inquiry about India's heritage. This is a simulated response. Once connected to the backend, I will provide curated, context-aware information.";
        
        if (context) {
            response += `\n\n[Mock Context Received]: Type: ${context.type}, ID: ${context.id}`;
        }
        
        return response;
    }
}

class OpenAIChatProvider {
    async sendMessage(message, context = null) {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message, context })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data.reply;
        } catch (error) {
            console.error("OpenAIChatProvider Fetch Error:", error);
            throw error;
        }
    }
}

class ChatService {
    constructor(provider = 'mock') {
        this.provider = provider === 'mock' ? new MockChatProvider() : new OpenAIChatProvider();
        
        // Simulating the current context of the user on the page
        // In the full application, this would update dynamically as the user navigates
        this.currentContext = null; 
    }

    /**
     * Updates the contextual awareness of the AI
     * @param {Object} context { type: 'heritage_site' | 'manuscript' | 'festival', id: string }
     */
    setContext(context) {
        this.currentContext = context;
    }

    async sendMessage(message) {
        try {
            return await this.provider.sendMessage(message, this.currentContext);
        } catch (error) {
            console.error("ChatService Error:", error);
            return "[System Error] Unable to reach Heritage AI at this moment.";
        }
    }
}

// Export a singleton instance globally for the landing page script to use
// Switch to 'openai' to use the real backend endpoint.
window.heritageChatService = new ChatService('openai');
