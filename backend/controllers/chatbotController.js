const axios = require('axios');

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
 * Call Gemini API for chat responses
 */
const callGeminiAPI = async (message, language) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key not configured');
  }

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

  const prompt = `You are a helpful tourism assistant for Jharkhand, India. 
  Respond in ${LANGUAGE_MAPPINGS[language] || 'English'} language.
  User question: ${message}
  
  ${contextData}
  
  Instructions:
  - Give direct, concise answers (2-3 sentences max)
  - Use the provided place data when available
  - Be helpful but brief
  - Don't be overly enthusiastic or use excessive exclamation marks
  - Focus on facts and practical information
  
  Provide a short, helpful response.`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return response.data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (apiError) {
    // If flash model fails, try pro model with simpler request
    console.log('Flash model failed, trying pro model...');
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{
            text: `Tourism assistant for Jharkhand. User asks: ${message}. Respond in ${LANGUAGE_MAPPINGS[language] || 'English'}. ${contextData ? 'Context: ' + contextData : ''}`
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 8000
      }
    );

    if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return response.data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Both Gemini models failed');
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
    
    try {
      // Try Gemini API first
      console.log('🤖 Attempting Gemini API call...');
      response = await callGeminiAPI(message, detectedLanguage);
      console.log('✅ Gemini API success:', response.substring(0, 100) + '...');
    } catch (geminiError) {
      console.error('❌ Gemini API failed:', {
        message: geminiError.message,
        status: geminiError.response?.status,
        statusText: geminiError.response?.statusText,
        data: geminiError.response?.data
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
    // Check if Gemini API key is configured
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(503).json({
        success: false,
        chatbotService: 'unavailable',
        error: 'Gemini API key not configured'
      });
    }
    
    res.json({
      success: true,
      chatbotService: 'available',
      features: {
        geminiAPI: 'configured',
        multilingualSupport: true,
        supportedLanguages: Object.keys(LANGUAGE_MAPPINGS),
        tourismContext: 'Jharkhand focused'
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
