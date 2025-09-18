const axios = require('axios');
const Groq = require('groq-sdk');

// Rate limiting and caching
const API_CALL_CACHE = new Map();
const API_CALL_TIMES = [];
const MAX_CALLS_PER_MINUTE = 100; // Groq has much more generous limits
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes cache

// Initialize Groq client (lazy initialization)
let groqClient = null;

function getGroqClient() {
  if (!groqClient) {
    try {
      const apiKey = process.env.GROQ_API_KEY;
      console.log('🔑 Initializing Groq client with key:', apiKey ? `${apiKey.substring(0, 20)}...` : 'undefined');
      
      if (!apiKey || apiKey === 'your_groq_api_key_here') {
        throw new Error('GROQ_API_KEY is not set or still has placeholder value');
      }
      
      groqClient = new Groq({
        apiKey: apiKey
      });
      console.log('✅ Groq client initialized successfully');
    } catch (error) {
      console.error('❌ Groq client initialization failed:', error.message);
      throw error;
    }
  }
  return groqClient;
}

// Language detection and translation mappings
const LANGUAGE_MAPPINGS = {
  'hi': 'Hindi',
  'en': 'English',
  'bho': 'Bhojpuri',
  'mag': 'Magahi',
  'mai': 'Maithili',
  'sa': 'Sanskrit',
  'ur': 'Urdu',
  'bn': 'Bengali',
  'or': 'Odia',
  'auto': 'Auto-detect'
};

// Tourism context for Jharkhand
const TOURISM_CONTEXT = `You are a helpful tourism assistant for Jharkhand, India. You specialize in:
- Tourist destinations in Jharkhand (Ranchi, Jamshedpur, Dhanbad, Bokaro, Deoghar, Hazaribagh, etc.)
- Tribal culture and heritage sites
- National parks and wildlife sanctuaries (Betla National Park, Dalma Wildlife Sanctuary)
- Waterfalls (Hundru Falls, Dassam Falls, Jonha Falls)
- Religious sites (Baidyanath Temple, Rajrappa Temple)
- Adventure activities and eco-tourism
- Local festivals and cultural events
- Transportation and accommodation options
- Best times to visit different locations
- Local cuisine and shopping

Always provide helpful, accurate information about Jharkhand tourism. If asked about other topics, politely redirect to tourism-related information about Jharkhand.`;

/**
 * Detect language from text (basic detection)
 */
function detectLanguage(text) {
  // Simple language detection based on script
  const hindiPattern = /[\u0900-\u097F]/;
  const bengaliPattern = /[\u0980-\u09FF]/;
  const odiaPattern = /[\u0B00-\u0B7F]/;
  
  if (hindiPattern.test(text)) return 'hi';
  if (bengaliPattern.test(text)) return 'bn';
  if (odiaPattern.test(text)) return 'or';
  
  return 'en'; // Default to English
}

/**
 * Check if we can make API call (rate limiting)
 */
function canMakeAPICall() {
  const now = Date.now();
  const oneMinuteAgo = now - 60000;
  
  // Remove old timestamps
  while (API_CALL_TIMES.length > 0 && API_CALL_TIMES[0] < oneMinuteAgo) {
    API_CALL_TIMES.shift();
  }
  
  return API_CALL_TIMES.length < MAX_CALLS_PER_MINUTE;
}

/**
 * Get cached response if available
 */
function getCachedResponse(message, language) {
  const cacheKey = `${message.toLowerCase().trim()}_${language}`;
  const cached = API_CALL_CACHE.get(cacheKey);
  
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.response;
  }
  
  return null;
}

/**
 * Cache API response
 */
function cacheResponse(message, language, response) {
  const cacheKey = `${message.toLowerCase().trim()}_${language}`;
  API_CALL_CACHE.set(cacheKey, {
    response,
    timestamp: Date.now()
  });
  
  // Clean old cache entries (keep only last 100)
  if (API_CALL_CACHE.size > 100) {
    const oldestKey = API_CALL_CACHE.keys().next().value;
    API_CALL_CACHE.delete(oldestKey);
  }
}

// Removed needsAIResponse function - now always using Groq AI

/**
 * Call Groq API with Llama 3 70B for chat responses
 */
const callGroqAPI = async (message, language) => {
  const client = getGroqClient(); // Use lazy initialization

  // Check cache first
  const cachedResponse = getCachedResponse(message, language);
  if (cachedResponse) {
    console.log('📦 Using cached response');
    return cachedResponse;
  }

  // Check rate limits
  if (!canMakeAPICall()) {
    console.log('⚠️ Rate limit reached, using fallback');
    throw new Error('Rate limit exceeded');
  }

  // Record API call time
  API_CALL_TIMES.push(Date.now());

  // Fetch relevant places from MongoDB or fallback to local files
  let contextData = '';
  let relevantPlaces = [];
  
  try {
    const Place = require('../models/Place');
    
    // Search for relevant places based on keywords in the message
    const searchTerms = message.toLowerCase().match(/\b\w+\b/g) || [];
    const places = await Place.find({
      $or: [
        { name: { $regex: searchTerms.join('|'), $options: 'i' } },
        { district: { $regex: searchTerms.join('|'), $options: 'i' } },
        { category: { $regex: searchTerms.join('|'), $options: 'i' } },
        { description: { $regex: searchTerms.join('|'), $options: 'i' } }
      ]
    }).limit(5);

    if (places.length > 0) {
      relevantPlaces = places;
      contextData = '\n\nRelevant places in Jharkhand:\n';
      places.forEach(place => {
        contextData += `- ${place.name} (${place.district}): ${place.description} [Category: ${place.category}]`;
        if (place.imageName) contextData += ` [Has Image: ${place.imageName}]`;
        contextData += '\n';
      });
    } else {
      // If no specific places found, get some popular places by category
      const popularPlaces = await Place.find({}).limit(6);
      if (popularPlaces.length > 0) {
        relevantPlaces = popularPlaces;
        contextData = '\n\nPopular places in Jharkhand:\n';
        popularPlaces.forEach(place => {
          contextData += `- ${place.name} (${place.district}): ${place.description} [Category: ${place.category}]\n`;
        });
      }
    }
  } catch (dbError) {
    console.log('MongoDB query failed, trying fallback data:', dbError.message);
    
    // Fallback to local files
    try {
      const fallbackData = require('../utils/fallback-data');
      const searchTerms = message.toLowerCase().match(/\b\w+\b/g) || [];
      const places = await fallbackData.searchPlaces(searchTerms, 5);
      
      if (places.length > 0) {
        relevantPlaces = places;
        contextData = '\n\nRelevant places in Jharkhand (from local data):\n';
        places.forEach(place => {
          contextData += `- ${place.name} (${place.district}): ${place.description} [Category: ${place.category}]`;
          if (place.imageName) contextData += ` [Has Image: ${place.imageName}]`;
          contextData += '\n';
        });
      }
    } catch (fallbackError) {
      console.log('Fallback data also failed:', fallbackError.message);
    }
  }

  const systemPrompt = `You are a helpful tourism assistant for Jharkhand, India. You specialize in providing accurate information about tourist destinations, cultural sites, travel tips, and local attractions in Jharkhand.

Instructions:
- Respond in ${LANGUAGE_MAPPINGS[language] || 'English'} language
- Give direct, concise answers (2-3 sentences max)
- Use the provided place data when available
- Be helpful but brief
- Focus on facts and practical information
- Don't be overly enthusiastic or use excessive exclamation marks`;

  const userPrompt = `User question: ${message}

${contextData ? 'Available tourism data:\n' + contextData : ''}

Provide a short, helpful response about Jharkhand tourism.`;

  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      model: 'llama-3.1-70b-versatile', // Llama 3.1 70B model
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.95,
      stream: false
    });

    if (chatCompletion?.choices?.[0]?.message?.content) {
      const result = chatCompletion.choices[0].message.content.trim();
      // Cache successful response
      cacheResponse(message, language, result);
      console.log('✅ Groq API success with Llama 3 70B');
      return result;
    } else {
      throw new Error('Invalid response format from Groq API');
    }
  } catch (apiError) {
    console.error('❌ Groq API error:', apiError.message);
    // If Llama 3 70B fails, try Llama 3 8B as fallback
    try {
      console.log('🔄 Trying Llama 3 8B as fallback...');
      const fallbackCompletion = await client.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `Tourism assistant for Jharkhand, India. Respond in ${LANGUAGE_MAPPINGS[language] || 'English'}.`
          },
          {
            role: 'user',
            content: `${message}\n\n${contextData ? 'Context: ' + contextData : ''}`
          }
        ],
        model: 'llama-3.1-8b-instant', // Fallback to Llama 3.1 8B
        temperature: 0.7,
        max_tokens: 512,
        stream: false
      });

      if (fallbackCompletion?.choices?.[0]?.message?.content) {
        const result = fallbackCompletion.choices[0].message.content.trim();
        cacheResponse(message, language, result);
        console.log('✅ Groq fallback success with Llama 3.1 8B');
        return result;
      } else {
        throw new Error('Both Groq models failed');
      }
    } catch (fallbackError) {
      console.error('❌ Groq fallback also failed:', fallbackError.message);
      throw new Error('All Groq models failed: ' + fallbackError.message);
    }
  }
};

/**
 * Generate intelligent fallback response using MongoDB data
 */
const generateIntelligentFallback = async (message, language) => {
  try {
    const Place = require('../models/Place');
    
    // Try MongoDB first
    let places = [];
    try {
      const searchTerms = message.toLowerCase().match(/\b\w+\b/g) || [];
      places = await Place.find({
        $or: [
          { name: { $regex: searchTerms.join('|'), $options: 'i' } },
          { district: { $regex: searchTerms.join('|'), $options: 'i' } },
          { category: { $regex: searchTerms.join('|'), $options: 'i' } },
          { description: { $regex: searchTerms.join('|'), $options: 'i' } }
        ]
      }).limit(3);
    } catch (dbError) {
      console.log('MongoDB fallback failed, using local data:', dbError.message);
      
      // Use local fallback data
      const fallbackData = require('../utils/fallback-data');
      const searchTerms = message.toLowerCase().match(/\b\w+\b/g) || [];
      places = await fallbackData.searchPlaces(searchTerms, 3);
    }

    let response = '';
    const langMap = LANGUAGE_MAPPINGS[language] || 'English';
    
    if (places.length > 0) {
      // Generate response based on found places
      const placeNames = places.map(p => p.name).join(', ');
      
      if (language === 'hi') {
        response = `झारखंड में ${placeNames} जैसी खूबसूरत जगहें हैं। `;
        places.forEach(place => {
          response += `${place.name} ${place.district} जिले में स्थित है और यह ${place.category} के लिए प्रसिद्ध है। `;
          if (place.imageName) response += `[चित्र उपलब्ध: ${place.imageName}] `;
        });
      } else if (language === 'bn') {
        response = `ঝাড়খণ্ডে ${placeNames} এর মতো সুন্দর জায়গা রয়েছে। `;
        places.forEach(place => {
          response += `${place.name} ${place.district} জেলায় অবস্থিত এবং ${place.category} এর জন্য বিখ্যাত। `;
          if (place.imageName) response += `[ছবি উপলব্ধ: ${place.imageName}] `;
        });
      } else {
        response = `Jharkhand has beautiful places like ${placeNames}. `;
        places.forEach(place => {
          response += `${place.name} is located in ${place.district} district and is famous for ${place.category}. `;
          if (place.imageName) response += `[Image available: ${place.imageName}] `;
        });
      }
    } else {
      // If no places found, throw error instead of generic response
      throw new Error('No relevant places found for the query');
    }
    
    return response;
  } catch (error) {
    console.error('Error in intelligent fallback:', error);
    
    // If no data available, throw error instead of simple fallback
    throw new Error('No tourism data available and unable to generate response');
  }
};

/**
 * Simple fallback responses for different languages
 */
const SIMPLE_FALLBACK_RESPONSES = {
  'en': "I'm here to help you explore Jharkhand! Ask me about tourist destinations, cultural sites, or travel tips.",
  'hi': "मैं झारखंड की खोज में आपकी मदद करने के लिए यहाँ हूँ! मुझसे पर्यटन स्थलों, सांस्कृतिक स्थानों या यात्रा सुझावों के बारे में पूछें।",
  'bn': "আমি ঝাড়খণ্ড অন্বেষণে আপনাকে সাহায্য করতে এখানে আছি! পর্যটন গন্তব্য, সাংস্কৃতিক স্থান বা ভ্রমণ টিপস সম্পর্কে আমাকে জিজ্ঞাসা করুন।",
  'or': "ମୁଁ ଝାଡଖଣ୍ଡ ଅନ୍ବେଷଣରେ ଆପଣଙ୍କୁ ସାହାଯ୍ୟ କରିବାକୁ ଏଠାରେ ଅଛି! ପର୍ଯ୍ୟଟନ ଗନ୍ତବ୍ୟ, ସାଂସ୍କୃତିକ ସ୍ଥାନ କିମ୍ବା ଭ୍ରମଣ ଟିପ୍ସ ବିଷୟରେ ମୋତେ ପଚାରନ୍ତୁ।"
};

/**
 * Enhanced chat message handler with Gemini API integration
 */
const sendMessage = async (req, res) => {
  try {
    const { message, language } = req.body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a non-empty string'
      });
    }

    // Detect language if not provided
    const detectedLanguage = language === 'auto' ? detectLanguage(message) : (language || 'en');
    
    let response;
    
    // Always use Groq AI for all queries
    console.log('🤖 Using Groq AI for query:', message);
    
    try {
      response = await callGroqAPI(message, detectedLanguage);
      console.log('✅ Groq API success:', response.substring(0, 100) + '...');
    } catch (groqError) {
      console.error('❌ Groq API failed:', {
        message: groqError.message,
        status: groqError.response?.status,
        statusText: groqError.response?.statusText,
        data: groqError.response?.data
      });
      console.log('🔄 Trying intelligent fallback...');
      try {
        response = await generateIntelligentFallback(message, detectedLanguage);
        console.log('✅ Fallback success:', response.substring(0, 100) + '...');
      } catch (fallbackError) {
        console.error('❌ Fallback also failed:', fallbackError.message);
        throw fallbackError;
      }
    }

    // Return the chatbot response
    res.json({
      success: true,
      response: response,
      detectedLanguage: detectedLanguage,
      supportedLanguages: Object.keys(LANGUAGE_MAPPINGS)
    });

  } catch (error) {
    console.error('Chatbot error:', error.message);
    
    // Return error without fallback response
    const detectedLanguage = detectLanguage(req.body.message || '');
    res.status(500).json({
      success: false,
      error: 'Sorry, I encountered an error. Please try again.',
      detectedLanguage: detectedLanguage
    });
  }
};

/**
 * Health check for chatbot service
 */
const healthCheck = async (req, res) => {
  try {
    // Check if Groq API client can be initialized
    try {
      getGroqClient();
    } catch (error) {
      return res.status(503).json({
        success: false,
        chatbotService: 'unavailable',
        error: 'Groq API client initialization failed: ' + error.message
      });
    }
    
    res.json({
      success: true,
      chatbotService: 'available',
      features: {
        groqAPI: 'configured',
        model: 'llama-3.1-70b-versatile',
        fallbackModel: 'llama-3.1-8b-instant',
        multilingualSupport: true,
        supportedLanguages: Object.keys(LANGUAGE_MAPPINGS),
        tourismContext: 'Jharkhand focused',
        rateLimit: `${MAX_CALLS_PER_MINUTE} calls per minute`
      }
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      chatbotService: 'unavailable',
      error: error.message
    });
  }
};

module.exports = {
  sendMessage,
  healthCheck
};
