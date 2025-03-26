document.addEventListener('DOMContentLoaded', function() {
    // Chat elements
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatContainer = document.getElementById('chatbot-container');
    const closeChat = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    // Enhanced Disaster Knowledge Base
    const disasterKB = {
        "earthquake": {
            steps: ["Drop to the ground", "Take cover under sturdy furniture", "Hold on until shaking stops"],
            faq: {
                "what to do": "Drop, Cover, and Hold On during shaking. After shaking stops, check for injuries and damage.",
                "how to prepare": "Secure heavy furniture, prepare an emergency kit, and identify safe spots in each room.",
                "during": "Stay indoors if you're inside, stay outside if you're outside. Avoid windows and heavy objects.",
                "after": "Check for injuries and damage. Be prepared for aftershocks."
            }
        },
        "tsunami": {
            steps: ["Move to higher ground immediately", "Follow evacuation routes", "Stay away from the coast"],
            faq: {
                "what to do": "Move immediately to higher ground or inland. Don't wait for official warnings.",
                "how to prepare": "Know your community's evacuation routes and plan. Have emergency supplies ready.",
                "warning signs": "Strong earthquakes, unusual ocean behavior (rapid rising or draining), or loud ocean roars",
                "after": "Stay away until officials declare it safe - danger may last for hours"
            }
        },
        "hurricane": {
            steps: ["Follow evacuation orders if given", "Stay indoors away from windows", "Turn off utilities if instructed"],
            faq: {
                "what to do": "Stay informed through weather alerts. Secure outdoor items. Have supplies for several days.",
                "how to prepare": "Know your evacuation zone, prepare emergency kit, reinforce your home.",
                "during": "Stay in interior room away from windows. Don't go outside during eye of storm."
            }
        },
        "general": {
            greeting: "Hello! I'm DisasterBot. Ask me about earthquake, tsunami, hurricane, or other disaster preparedness.",
            emergency: "EMERGENCY MODE: Please state your situation clearly (e.g., 'earthquake happening now')",
            unknown: "I'm not sure about that. For immediate help, contact local emergency services. Try asking about: earthquake, tsunami, or hurricane."
        }
    };

    // Initialize chat
    function initChat() {
        chatContainer.style.display = 'none';
        addBotMessage(getGreeting());
    }

    // Toggle chat visibility
    chatToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isVisible = chatContainer.style.display === 'block';
        chatContainer.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            userInput.focus();
            // Only show greeting if chat is empty
            if (chatMessages.children.length === 0) {
                addBotMessage(getGreeting());
            }
        }
    });

    // Close chat
    closeChat.addEventListener('click', function(e) {
        e.stopPropagation();
        chatContainer.style.display = 'none';
    });

    // Handle sending messages
    function handleSend() {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            userInput.value = '';
            setTimeout(() => {
                processInput(message);
            }, 300);
        }
        userInput.focus();
    }

    // Event listeners
    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleSend();
    });

    // Message display functions
    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'user-message';
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function addBotMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'bot-message';
        
        // Handle bullet points and line breaks
        const formattedText = text.replace(/\n/g, '<br>')
                                 .replace(/\•/g, '•');
        msgDiv.innerHTML = formattedText;
        
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Get context-aware greeting
    function getGreeting() {
        const path = window.location.pathname;
        const disaster = path.split('/').pop().replace('.html', '');
        
        if (disaster && disasterKB[disaster]) {
            return `Welcome to ${disaster.toUpperCase()} preparedness! Ask me anything about ${disaster} safety.\n\nTry asking:\n• "What should I do during ${disaster}?"\n• "How to prepare for ${disaster}?"`;
        }
        return disasterKB.general.greeting;
    }

    // Process user input with improved matching
    function processInput(input) {
        const lowerInput = input.toLowerCase();
        const currentDisaster = window.location.pathname.split('/').pop().replace('.html', '');
        
        // Emergency detection
        if (/(emergency|help|now|happening|urgent)/.test(lowerInput)) {
            return handleEmergency(lowerInput, currentDisaster);
        }
        
        // Check for greetings
        if (/(hello|hi|hey)/.test(lowerInput)) {
            return addBotMessage(getGreeting());
        }
        
        // Check for disaster-specific questions
        if (currentDisaster && disasterKB[currentDisaster]) {
            const response = checkDisasterKB(lowerInput, currentDisaster);
            if (response) return addBotMessage(response);
        }
        
        // General disaster questions
        for (const disaster in disasterKB) {
            if (disaster !== "general" && lowerInput.includes(disaster)) {
                const response = checkDisasterKB(lowerInput, disaster);
                if (response) return addBotMessage(response);
            }
        }
        
        // Default unknown response
        addBotMessage(disasterKB.general.unknown);
    }

    function checkDisasterKB(input, disaster) {
        const kb = disasterKB[disaster].faq;
        
        // Check for common question patterns
        if (/(what should i do|what to do)/.test(input)) {
            return kb["what to do"] || kb["during"];
        }
        
        if (/(how to prepare|how do i prepare)/.test(input)) {
            return kb["how to prepare"];
        }
        
        if (/(warning signs|how to know)/.test(input)) {
            return kb["warning signs"];
        }
        
        if (/(after|afterwards|what next)/.test(input)) {
            return kb["after"];
        }
        
        // Check for specific keywords
        for (const [keyword, response] of Object.entries(kb)) {
            if (input.includes(keyword)) {
                return response;
            }
        }
        
        return null;
    }

    function handleEmergency(input, disaster) {
        // Clear chat to focus on emergency information
        chatMessages.innerHTML = '';
    
        // Add urgent emergency header with visual alert
        const emergencyHeader = document.createElement('div');
        emergencyHeader.className = 'bot-message emergency-header';
        emergencyHeader.innerHTML = `
            <div class="emergency-alert">
                <span class="alert-icon">🚨</span>
                <h3>EMERGENCY MODE ACTIVATED</h3>
            </div>
            <p>I'll guide you through critical steps for your safety.</p>
        `;
        chatMessages.appendChild(emergencyHeader);
    
        // Try to detect disaster type from input if not from URL
        if (!disaster) {
            for (const disasterType in disasterKB) {
                if (disasterType !== "general" && input.toLowerCase().includes(disasterType)) {
                    disaster = disasterType;
                    break;
                }
            }
        }
    
        if (disaster && disasterKB[disaster]) {
            // Add disaster-specific emergency procedures
            const disasterHeader = document.createElement('div');
            disasterHeader.className = 'bot-message disaster-header';
            disasterHeader.innerHTML = `
                <h4>${disaster.toUpperCase()} EMERGENCY PROCEDURES</h4>
                <p>Follow these steps <strong>immediately</strong>:</p>
            `;
            chatMessages.appendChild(disasterHeader);
    
            // Add numbered emergency steps with detailed instructions
            disasterKB[disaster].steps.forEach((step, index) => {
                const stepDiv = document.createElement('div');
                stepDiv.className = 'bot-message emergency-step';
                stepDiv.innerHTML = `
                    <div class="step-number">${index + 1}</div>
                    <div class="step-content">${step}</div>
                `;
                chatMessages.appendChild(stepDiv);
            });
    
            // Add real-time action items
            const actionItems = document.createElement('div');
            actionItems.className = 'bot-message action-items';
            actionItems.innerHTML = `
                <h4>RIGHT NOW:</h4>
                <ul>
                    <li>🔹 <strong>Assess your surroundings</strong> for immediate dangers</li>
                    <li>🔹 <strong>Protect yourself</strong> first before helping others</li>
                    <li>🔹 <strong>Evacuate if necessary</strong> using safest route</li>
                    <li>🔹 <strong>Avoid hazards</strong> like downed power lines or damaged structures</li>
                </ul>
            `;
            chatMessages.appendChild(actionItems);
    
            // Add post-emergency guidance
            const postEmergency = document.createElement('div');
            postEmergency.className = 'bot-message post-emergency';
            postEmergency.innerHTML = `
                <h4>AFTER THE IMMEDIATE DANGER:</h4>
                <ol>
                    <li>Check for injuries and provide first aid if trained</li>
                    <li>Listen to emergency broadcasts for updates</li>
                    <li>Inspect your location for damage and hazards</li>
                    <li>Help neighbors if it's safe to do so</li>
                    <li>Document damage for insurance claims</li>
                </ol>
            `;
            chatMessages.appendChild(postEmergency);
        } else {
            // If disaster type isn't specified or recognized
            const unknownDisaster = document.createElement('div');
            unknownDisaster.className = 'bot-message unknown-disaster';
            unknownDisaster.innerHTML = `
                <div class="warning-alert">
                    <span class="alert-icon">⚠️</span>
                    <h4>EMERGENCY DETECTED</h4>
                </div>
                <p>Please specify the emergency type clearly, for example:</p>
                <ul>
                    <li>"Earthquake happening now"</li>
                    <li>"Tsunami warning in my area"</li>
                    <li>"I'm in a hurricane emergency"</li>
                </ul>
                <p>Available emergency types: earthquake, tsunami, hurricane</p>
            `;
            chatMessages.appendChild(unknownDisaster);
        }
    
        // Add emergency contact information
        const contacts = document.createElement('div');
        contacts.className = 'bot-message emergency-contacts';
        contacts.innerHTML = `
            <h4>EMERGENCY CONTACTS</h4>
            <div class="contact-grid">
                <div class="contact-item">
                    <div class="contact-icon">🚑</div>
                    <div class="contact-info">
                        <strong>Medical Emergency</strong>
                        <div>911 (or local equivalent)</div>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">🚒</div>
                    <div class="contact-info">
                        <strong>Fire Department</strong>
                        <div>911 (or local equivalent)</div>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">👮</div>
                    <div class="contact-info">
                        <strong>Police</strong>
                        <div>911 (or local equivalent)</div>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">🌊</div>
                    <div class="contact-info">
                        <strong>Coast Guard</strong>
                        <div>+1-202-372-2100</div>
                    </div>
                </div>
            </div>
            <p class="disclaimer"><strong>Note:</strong> If phone lines are down, try text messaging or social media to contact help.</p>
        `;
        chatMessages.appendChild(contacts);
    
        // Add final safety reminder
        const reminder = document.createElement('div');
        reminder.className = 'bot-message safety-reminder';
        reminder.innerHTML = `
            <div class="reminder-content">
                <span class="reminder-icon">❗</span>
                <p><strong>Remember:</strong> Your safety is most important. Follow official instructions from local authorities.</p>
            </div>
        `;
        chatMessages.appendChild(reminder);
    
        // Scroll to show all emergency information
        scrollToBottom();
    }

    // Initialize the chat
    initChat();
});