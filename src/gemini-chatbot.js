// Gemini Chatbot Implementation
document.addEventListener('DOMContentLoaded', function() {
  // Create the chat interface elements
  createChatInterface();
  
  // Initialize chat functionality
  initializeChat();
});

// Create the chat interface
function createChatInterface() {
  // Create main container
  const chatContainer = document.createElement('div');
  chatContainer.id = 'gemini-chat-container';
  chatContainer.className = 'gemini-chat-container';
  
  // Create chat button
  const chatButton = document.createElement('div');
  chatButton.id = 'gemini-chat-button';
  chatButton.className = 'gemini-chat-button';
  
  // Add icon to button
  const icon = document.createElement('img');
  icon.src = 'src/assets/favicon.png';
  icon.alt = 'Chat';
  chatButton.appendChild(icon);
  
  // Create chat window (initially hidden)
  const chatWindow = document.createElement('div');
  chatWindow.id = 'gemini-chat-window';
  chatWindow.className = 'gemini-chat-window';
  chatWindow.style.display = 'none';
  
  // Create chat header
  const chatHeader = document.createElement('div');
  chatHeader.className = 'gemini-chat-header';
  
  const chatTitle = document.createElement('div');
  chatTitle.className = 'gemini-chat-title';
  chatTitle.textContent = 'Walter\'s Assistant';
  
  const closeButton = document.createElement('button');
  closeButton.className = 'gemini-chat-close';
  closeButton.innerHTML = '&times;';
  
  chatHeader.appendChild(chatTitle);
  chatHeader.appendChild(closeButton);
  
  // Create chat messages area
  const chatMessages = document.createElement('div');
  chatMessages.id = 'gemini-chat-messages';
  chatMessages.className = 'gemini-chat-messages';
  
  // Add welcome message
  const welcomeMessage = document.createElement('div');
  welcomeMessage.className = 'gemini-chat-message gemini-chat-message-bot';
  welcomeMessage.textContent = 'Hi there! I\'m Walter\'s Assistant. How can I help you with your fitness journey today?';
  chatMessages.appendChild(welcomeMessage);
  
  // Create chat input area
  const chatInputArea = document.createElement('div');
  chatInputArea.className = 'gemini-chat-input-area';
  
  const chatInput = document.createElement('input');
  chatInput.id = 'gemini-chat-input';
  chatInput.className = 'gemini-chat-input';
  chatInput.type = 'text';
  chatInput.placeholder = 'Type your message...';
  
  const sendButton = document.createElement('button');
  sendButton.id = 'gemini-chat-send';
  sendButton.className = 'gemini-chat-send';
  sendButton.textContent = 'Send';
  
  chatInputArea.appendChild(chatInput);
  chatInputArea.appendChild(sendButton);
  
  // Assemble the chat window
  chatWindow.appendChild(chatHeader);
  chatWindow.appendChild(chatMessages);
  chatWindow.appendChild(chatInputArea);
  
  // Add everything to the container
  chatContainer.appendChild(chatButton);
  chatContainer.appendChild(chatWindow);
  
  // Add the container to the body
  document.body.appendChild(chatContainer);
}

// Initialize chat functionality
function initializeChat() {
  const chatButton = document.getElementById('gemini-chat-button');
  const chatWindow = document.getElementById('gemini-chat-window');
  const closeButton = document.querySelector('.gemini-chat-close');
  const chatInput = document.getElementById('gemini-chat-input');
  const sendButton = document.getElementById('gemini-chat-send');
  const chatMessages = document.getElementById('gemini-chat-messages');
  
  // Toggle chat window when button is clicked
  chatButton.addEventListener('click', function() {
    if (chatWindow.style.display === 'none') {
      chatWindow.style.display = 'flex';
      chatInput.focus();
    } else {
      chatWindow.style.display = 'none';
    }
  });
  
  // Close chat window when close button is clicked
  closeButton.addEventListener('click', function() {
    chatWindow.style.display = 'none';
  });
  
  // Send message when send button is clicked
  sendButton.addEventListener('click', sendMessage);
  
  // Send message when Enter key is pressed
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Function to send a message
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    chatInput.value = '';
    
    // Get response from Gemini (simulated for now)
    setTimeout(() => {
      getGeminiResponse(message);
    }, 500);
  }
  
  // Function to add a message to the chat
  function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `gemini-chat-message gemini-chat-message-${sender}`;
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Function to get response from Gemini
  async function getGeminiResponse(userMessage) {
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'gemini-chat-message gemini-chat-message-bot gemini-typing-indicator';
    typingIndicator.textContent = 'Walter\'s Assistant is typing...';
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    try {
      // Call the Gemini API
      const response = await callGeminiAPI(userMessage);
      
      // Remove typing indicator
      chatMessages.removeChild(typingIndicator);
      
      // Add bot response to chat
      addMessage(response, 'bot');
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Remove typing indicator
      chatMessages.removeChild(typingIndicator);
      
      // Fallback to predefined responses if API fails
      const lowerMessage = userMessage.toLowerCase();
      let fallbackResponse = '';
      
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        fallbackResponse = 'Hello! How can I help you with your fitness journey today?';
      } else if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
        fallbackResponse = 'We offer various coaching packages starting from $50 per month. For detailed pricing, please contact Walter directly.';
      } else if (lowerMessage.includes('workout') || lowerMessage.includes('exercise') || lowerMessage.includes('training')) {
        fallbackResponse = 'Our personalized workout plans are tailored to your specific goals, fitness level, and available equipment. Would you like to know more about our approach?';
      } else if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition') || lowerMessage.includes('meal')) {
        fallbackResponse = 'Nutrition is a key component of our coaching. We provide customized meal plans and nutritional guidance to support your fitness goals.';
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
        fallbackResponse = 'You can contact Walter through the contact form on this website, or directly via email at walter@whcoaching.com';
      } else {
        fallbackResponse = 'Sorry, I\'m having trouble connecting right now. For specific information about our coaching services, please use the contact form or email Walter directly.';
      }
      
      // Add fallback response to chat
      addMessage(fallbackResponse, 'bot');
    }
  }
}

// Gemini API integration
async function callGeminiAPI(userMessage) {
  try {
    console.log('Attempting to call Gemini API...');
    
    // In development environment, we'll use predefined responses instead of the actual API
    // This is because direct API calls from the browser may face CORS issues
    // In production, you would use a server-side proxy or Vercel Edge Functions
    
    // For now, let's simulate a delay and return a relevant response
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    
    // Generate a contextually relevant response based on the user's message
    const lowerMessage = userMessage.toLowerCase();
    let response = '';
    
    // Expanded keyword detection with more variations
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('what') || lowerMessage.includes('who')) {
      const greetings = [
        'Hello! I\'m Walter\'s Assistant. How can I help you with your fitness journey today?',
        'Hi there! I\'m here to help you learn about Walter\'s coaching services. What would you like to know?',
        'Hey! I\'m Walter\'s virtual assistant. I can tell you about our fitness coaching programs, nutrition plans, or answer any questions you might have.'
      ];
      response = greetings[Math.floor(Math.random() * greetings.length)];
    } 
    // Services and offerings
    else if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('provide') || lowerMessage.includes('coaching') || lowerMessage.includes('program')) {
      response = 'Walter offers comprehensive fitness coaching services including personalized workout programs, nutrition planning, progress tracking, and ongoing support. Our coaching is fully online, allowing us to work with clients anywhere while providing regular check-ins and adjustments to your plan as needed.';
    }
    // Pricing information
    else if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('package') || lowerMessage.includes('pay') || lowerMessage.includes('fee') || lowerMessage.includes('much')) {
      response = 'We offer various coaching packages starting from $50 per month. Each package is tailored to your specific needs and goals. For detailed pricing and to find the perfect package for you, please contact Walter directly through the contact form or via email.';
    } 
    // Workout and training
    else if (lowerMessage.includes('workout') || lowerMessage.includes('exercise') || lowerMessage.includes('training') || lowerMessage.includes('gym') || lowerMessage.includes('fitness') || lowerMessage.includes('routine')) {
      response = 'Our personalized workout plans are tailored to your specific goals, fitness level, and available equipment. Walter focuses on creating sustainable training programs that progressively challenge you while keeping workouts enjoyable. We can design programs for home workouts, gym training, or a combination of both.';
    } 
    // Nutrition and diet
    else if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition') || lowerMessage.includes('meal') || lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('calorie') || lowerMessage.includes('macro')) {
      response = 'Nutrition is a key component of our coaching. Walter provides customized meal plans and nutritional guidance to support your fitness goals. We focus on sustainable eating habits rather than restrictive diets, helping you develop a healthy relationship with food while achieving your body composition goals.';
    } 
    // Contact information
    else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('reach') || lowerMessage.includes('talk') || lowerMessage.includes('call')) {
      response = 'You can contact Walter through the contact form on this website, or directly via email at walter@whcoaching.com. Walter typically responds within 24 hours and is happy to schedule a free consultation call to discuss your fitness goals.';
    } 
    // Help requests
    else if (lowerMessage.includes('help') || lowerMessage.includes('assist') || lowerMessage.includes('support') || lowerMessage.includes('guide')) {
      response = 'I\'d be happy to help! I can provide information about Walter\'s coaching services, answer questions about fitness programs, nutrition plans, or pricing. What specific aspect of fitness coaching are you interested in learning more about?';
    } 
    // Muscle building
    else if (lowerMessage.includes('muscle') || lowerMessage.includes('strength') || lowerMessage.includes('build') || lowerMessage.includes('gain') || lowerMessage.includes('strong') || lowerMessage.includes('bulk')) {
      response = 'Building muscle and strength is one of our specialties! Walter designs progressive resistance training programs that focus on proper form, appropriate volume, and recovery. Combined with nutrition guidance tailored to support muscle growth, you\'ll see sustainable results that last.';
    } 
    // Weight loss
    else if (lowerMessage.includes('weight loss') || lowerMessage.includes('fat loss') || lowerMessage.includes('lose weight') || lowerMessage.includes('slim') || lowerMessage.includes('thin') || lowerMessage.includes('cut') || lowerMessage.includes('lean')) {
      response = 'Our weight loss approach focuses on sustainable habits rather than quick fixes. Walter will create a personalized plan combining strategic calorie management, enjoyable workouts, and lifestyle adjustments that fit your schedule. We aim for gradual, lasting results rather than rapid weight loss that quickly returns.';
    }
    // Experience and qualifications
    else if (lowerMessage.includes('experience') || lowerMessage.includes('qualification') || lowerMessage.includes('certified') || lowerMessage.includes('background') || lowerMessage.includes('education')) {
      response = 'Walter is a certified personal trainer with extensive experience in fitness coaching. He has completed three different personal training courses and has a background in sports, particularly football. His own transformation journey from being skinny to overweight to fit gives him a unique perspective on different fitness challenges.';
    }
    // Results and success stories
    else if (lowerMessage.includes('result') || lowerMessage.includes('success') || lowerMessage.includes('testimonial') || lowerMessage.includes('before') || lowerMessage.includes('after') || lowerMessage.includes('transform')) {
      response = 'Our clients have achieved remarkable results through consistent work and proper guidance. Success stories include significant weight loss transformations, muscle building achievements, and improved overall fitness levels. The key to these successes has been personalized programs and consistent support throughout the journey.';
    }
    // About Walter
    else if (lowerMessage.includes('about') || lowerMessage.includes('walter') || lowerMessage.includes('coach') || lowerMessage.includes('who is') || lowerMessage.includes('tell me about')) {
      response = 'Walter is an online fitness coach passionate about helping people achieve their fitness goals and live happier lifestyles. He has a background in football and has gone through his own fitness journey, transforming from being skinny to overweight to developing a fit physique. This personal experience drives his commitment to helping others succeed in their fitness goals.';
    }
    // Catch-all for any other queries
    else {
      const generalResponses = [
        'I\'d be happy to tell you more about Walter\'s coaching services! We offer personalized fitness and nutrition plans to help you reach your goals. What specific aspect are you interested in?',
        'Thanks for reaching out! Walter specializes in online fitness coaching with customized workout and nutrition plans. How can I help you today?',
        'Walter\'s coaching focuses on creating sustainable fitness and nutrition habits. Is there something specific about our services you\'d like to know more about?'
      ];
      response = generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }
    
    return response;
    
    /* The code below would be used in production with a server-side proxy
    
    // Create a context message about Walter's coaching services
    const contextMessage = `You are Walter's Assistant, a helpful AI assistant for WH Coaching, a fitness coaching service. 
    Your role is to provide information about Walter's coaching services, answer questions about fitness, nutrition, 
    and training programs. Be friendly, professional, and encouraging. Focus on helping potential clients understand 
    the benefits of working with Walter as their coach. If asked about pricing, mention that coaching packages start 
    from $50 per month and encourage them to contact Walter directly for detailed pricing. Always be supportive of 
    people's fitness goals.`;
    
    // Combine the context with the user's message
    const fullPrompt = contextMessage + '\n\nUser message: ' + userMessage;
    
    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY not found in environment variables');
      throw new Error('API key not configured');
    }
    
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && 
        data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error('Unexpected API response structure:', data);
      throw new Error('Invalid API response format');
    }
    */
  } catch (error) {
    console.error('Error with chatbot response:', error);
    throw error; // Re-throw to trigger fallback responses
  }
}
