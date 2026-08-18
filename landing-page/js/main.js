document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
            });
        });
    }

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        const currentTheme = localStorage.getItem('theme') || 'dark';
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggleBtn.textContent = '☾';
        }

        themeToggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            if (current === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.textContent = '☀';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.textContent = '☾';
            }
        });
    }

    // Scroll Reveal Animation (Subtle Opacity Fade Only)
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    if ('IntersectionObserver' in window) {
        const revealOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);
        
        revealElements.forEach(el => {
            revealOnScroll.observe(el);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('is-visible'));
    }

    // Heritage AI Panel Toggle & Chat Logic
    const aiBtn = document.getElementById('heritageAiBtn');
    const aiNavBtn = document.getElementById('heritageAiNavBtn');
    const aiPanel = document.getElementById('heritageAiPanel');
    const closeAiBtn = document.getElementById('closeAiBtn');
    
    // Chat Elements
    const chatHistory = document.getElementById('aiChatHistory');
    const chatInput = document.getElementById('aiChatInput');
    const sendBtn = document.getElementById('aiSendBtn');
    const suggestionChips = document.querySelectorAll('.ai-chip');

    const toggleAiPanel = () => {
        aiPanel.classList.toggle('active');
        if(aiPanel.classList.contains('active') && chatInput) {
            chatInput.focus();
        }
    };

    if(aiBtn && aiPanel && closeAiBtn) {
        aiBtn.addEventListener('click', toggleAiPanel);
        if (aiNavBtn) aiNavBtn.addEventListener('click', toggleAiPanel);

        closeAiBtn.addEventListener('click', () => {
            aiPanel.classList.remove('active');
        });

        // Chat UI Helpers
        const appendMessage = (text, sender) => {
            if (!chatHistory) return;
            const msgDiv = document.createElement('div');
            msgDiv.className = `ai-message ${sender}`;
            msgDiv.textContent = text;
            chatHistory.appendChild(msgDiv);
            chatHistory.scrollTop = chatHistory.scrollHeight;
            return msgDiv;
        };

        const handleSend = async (messageText) => {
            if (!messageText.trim()) return;
            
            appendMessage(messageText, 'user');
            if(chatInput) chatInput.value = '';

            const loadingMsg = appendMessage('Thinking...', 'loading');

            if (window.heritageChatService) {
                try {
                    const reply = await window.heritageChatService.sendMessage(messageText);
                    chatHistory.removeChild(loadingMsg);
                    appendMessage(reply, 'assistant');
                } catch (err) {
                    chatHistory.removeChild(loadingMsg);
                    appendMessage('I am currently unable to reach the archive. Please try again later.', 'assistant');
                }
            } else {
                chatHistory.removeChild(loadingMsg);
                appendMessage('Service unavailable.', 'assistant');
            }
        };

        if (sendBtn) {
            sendBtn.addEventListener('click', () => handleSend(chatInput.value));
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleSend(chatInput.value);
            });
        }

        suggestionChips.forEach(chip => {
            chip.addEventListener('click', () => {
                handleSend(chip.textContent);
                const suggestionsContainer = document.getElementById('aiSuggestions');
                if(suggestionsContainer) {
                    suggestionsContainer.style.display = 'none';
                }
            });
        });
    }

    // Context Awareness Simulation
    const mapSection = document.getElementById('map-section');
    const manuscriptSection = document.getElementById('knowledge-section');
    
    if (window.heritageChatService && window.IntersectionObserver) {
        const contextObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.id === 'map-section') {
                        window.heritageChatService.setContext({ type: 'heritage_site', id: 'general-map' });
                    } else if (entry.target.id === 'knowledge-section') {
                        window.heritageChatService.setContext({ type: 'manuscript', id: 'bhagavad-gita' });
                    }
                }
            });
        }, { threshold: 0.5 });
        
        if(mapSection) contextObserver.observe(mapSection);
        if(manuscriptSection) contextObserver.observe(manuscriptSection);
    }

    // Contact Modal & Form Logic
    const btnOpenContact = document.getElementById('btnOpenContact');
    const contactModal = document.getElementById('contactModal');
    const closeContactBtn = document.getElementById('closeContactBtn');
    const contactForm = document.getElementById('contactForm');
    const stateLoading = document.getElementById('contactLoadingState');
    const stateSuccess = document.getElementById('contactSuccessState');
    const stateError = document.getElementById('contactErrorState');
    const btnRetryContact = document.getElementById('btnRetryContact');

    const openContactModal = () => {
        if(contactModal) contactModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeContactModal = () => {
        if(contactModal) {
            contactModal.classList.remove('active');
            // Reset form state after closing
            setTimeout(() => {
                contactForm.style.display = 'block';
                stateLoading.style.display = 'none';
                stateSuccess.style.display = 'none';
                stateError.style.display = 'none';
                contactForm.reset();
                document.querySelectorAll('.form-group').forEach(g => g.classList.remove('invalid'));
            }, 300);
        }
        document.body.style.overflow = '';
    };

    if(btnOpenContact) btnOpenContact.addEventListener('click', openContactModal);
    if(closeContactBtn) closeContactBtn.addEventListener('click', closeContactModal);
    
    // Close on overlay click
    if(contactModal) {
        contactModal.addEventListener('click', (e) => {
            if(e.target === contactModal) closeContactModal();
        });
    }

    // Escape key
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && contactModal && contactModal.classList.contains('active')) {
            closeContactModal();
        }
    });

    // Form Validation & Submission
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const nameInput = document.getElementById('contactName');
            const emailInput = document.getElementById('contactEmail');
            const messageInput = document.getElementById('contactMessage');

            // Validate Name
            if(!nameInput.value.trim()) {
                nameInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                nameInput.parentElement.classList.remove('invalid');
            }

            // Validate Email
            if(!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
                emailInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                emailInput.parentElement.classList.remove('invalid');
            }

            // Validate Message
            if(!messageInput.value.trim()) {
                messageInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                messageInput.parentElement.classList.remove('invalid');
            }

            if(isValid) {
                // Mock Submission
                contactForm.style.display = 'none';
                stateLoading.style.display = 'block';

                // Simulate API Call POST /api/contact
                setTimeout(() => {
                    stateLoading.style.display = 'none';
                    // 90% success rate mock
                    if (Math.random() > 0.1) {
                        stateSuccess.style.display = 'block';
                    } else {
                        stateError.style.display = 'block';
                    }
                }, 1500);
            }
        });
    }

    if(btnRetryContact) {
        btnRetryContact.addEventListener('click', () => {
            stateError.style.display = 'none';
            contactForm.style.display = 'block';
        });
    }
});
