const axios = require('axios');

// Groq API configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_BASE_URL = "https://api.groq.com/openai/v1";

/**
 * Generate AI-powered travel itinerary using Groq API
 */
const generateItinerary = async (req, res) => {
  try {
    const { destination, duration, interests, budget, groupSize, accommodation } = req.body;

    // Validate required fields
    if (!destination || !duration || !interests || !budget) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: destination, duration, interests, and budget are required',
        received: { destination, duration, interests, budget },
        fallback: generateFallbackItinerary({ destination, duration, interests, budget })
      });
    }

    // Validate interests is an array and not empty
    if (!Array.isArray(interests) || interests.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Interests must be a non-empty array',
        received: { interests },
        fallback: generateFallbackItinerary({ destination, duration, interests, budget })
      });
    }

    // Check if Groq API key is available
    if (!GROQ_API_KEY || GROQ_API_KEY === 'your_groq_api_key_here') {
      return res.status(200).json({
        success: false,
        error: 'Groq API key not configured - using fallback',
        fallback: generateFallbackItinerary({ destination, duration, interests, budget })
      });
    }

    // Create detailed prompt for Jharkhand tourism
    const prompt = `
You are a professional travel planner specializing in Jharkhand, India tourism. Create a detailed, day-by-day travel itinerary with the following specifications:

IMPORTANT: Focus ONLY on attractions in and around ${destination}, Jharkhand. Do NOT include attractions from other cities unless they are within reasonable travel distance (max 50km) from ${destination}.

Destination: ${destination}, Jharkhand, India
Duration: ${duration}
Interests: ${Array.isArray(interests) ? interests.join(', ') : interests}
Budget: ${budget}
Group Size: ${groupSize || 'Not specified'}
Accommodation: ${accommodation || 'Hotels'}

LOCATION-SPECIFIC GUIDELINES:
- If destination is Ranchi: Include Hundru Falls, Rock Garden, Jagannath Temple Ranchi, Kanke Dam
- If destination is Deoghar: Include Baidyanath Temple, Nandan Pahar, Tapovan Caves, Satsang Ashram
- If destination is Jamshedpur: Include Jubilee Park, Tata Steel Zoological Park, Dalma Wildlife Sanctuary, Dimna Lake
- If destination is Bokaro: Include Bokaro Steel Plant, City Park, Garga Dam, Parasnath Hills (nearby)
- If destination is Hazaribagh: Include Hazaribagh Wildlife Sanctuary, Canary Hill, Konar Dam, Rajrappa Temple

Please provide:
1. Day-by-day breakdown with specific timings
2. Attractions ONLY in or near ${destination} (within 50km radius)
3. Estimated costs in Indian Rupees (₹)
4. Local transportation within ${destination}
5. Local food recommendations specific to ${destination}
6. Cultural insights about ${destination} area
7. Best times to visit each location in ${destination}

DO NOT mix attractions from different cities. Keep all recommendations focused on ${destination} and its immediate surroundings.

Format the response as a structured itinerary with clear day divisions, timings, activities, and costs.
`;

    // Call Groq API
    const response = await axios.post(
      `${GROQ_BASE_URL}/chat/completions`,
      {
        model: "llama-3.1-8b-instant", // Using current supported model
        messages: [
          {
            role: "system",
            content: "You are an expert travel planner for Jharkhand, India. Provide detailed, practical, and culturally rich travel itineraries."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      }
    );

    const itinerary = response.data.choices[0].message.content;

    // Return successful response
    res.json({
      success: true,
      data: {
        itinerary,
        requestDetails: {
          destination,
          duration,
          interests,
          budget,
          groupSize,
          accommodation
        },
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Travel Planner Error:', error.message);

    // Handle different types of errors
    if (error.response) {
      // Groq API error
      return res.status(error.response.status).json({
        success: false,
        error: `Groq API Error: ${error.response.data?.error?.message || 'Unknown API error'}`,
        fallback: generateFallbackItinerary(req.body)
      });
    } else if (error.code === 'ECONNABORTED') {
      // Timeout error
      return res.status(408).json({
        success: false,
        error: 'Request timeout - please try again',
        fallback: generateFallbackItinerary(req.body)
      });
    } else {
      // Other errors
      return res.status(500).json({
        success: false,
        error: 'Internal server error while generating itinerary',
        fallback: generateFallbackItinerary(req.body)
      });
    }
  }
};

/**
 * Generate fallback itinerary when AI is unavailable
 */
const generateFallbackItinerary = ({ destination, duration, interests, budget }) => {
  // Destination-specific attractions
  const destinationAttractions = {
    'Ranchi': {
      day1: 'Ranchi City Tour',
      attractions: ['Jagannath Temple', 'Rock Garden', 'Hundru Falls', 'Kanke Dam'],
      morning: 'Jagannath Temple',
      afternoon: 'Rock Garden & Kanke Dam',
      evening: 'Hundru Falls'
    },
    'Deoghar': {
      day1: 'Deoghar Spiritual Journey',
      attractions: ['Baidyanath Temple', 'Nandan Pahar', 'Tapovan Caves', 'Satsang Ashram'],
      morning: 'Baidyanath Temple',
      afternoon: 'Nandan Pahar',
      evening: 'Tapovan Caves'
    },
    'Jamshedpur': {
      day1: 'Jamshedpur Exploration',
      attractions: ['Jubilee Park', 'Tata Steel Zoological Park', 'Dalma Wildlife Sanctuary', 'Dimna Lake'],
      morning: 'Jubilee Park',
      afternoon: 'Tata Steel Zoological Park',
      evening: 'Dalma Wildlife Sanctuary'
    },
    'Hazaribagh': {
      day1: 'Hazaribagh Nature Tour',
      attractions: ['Hazaribagh Wildlife Sanctuary', 'Canary Hill', 'Konar Dam', 'Rajrappa Temple'],
      morning: 'Hazaribagh Wildlife Sanctuary',
      afternoon: 'Canary Hill',
      evening: 'Konar Dam'
    },
    'Bokaro': {
      day1: 'Bokaro Steel City Tour',
      attractions: ['Bokaro Steel Plant', 'City Park', 'Garga Dam', 'Parasnath Hills'],
      morning: 'Bokaro Steel Plant',
      afternoon: 'City Park',
      evening: 'Garga Dam'
    },
    'Dhanbad': {
      day1: 'Dhanbad Coal City Exploration',
      attractions: ['Maithon Dam', 'Kalyaneshwari Temple', 'Topchanchi Lake', 'Panchet Dam'],
      morning: 'Maithon Dam',
      afternoon: 'Kalyaneshwari Temple',
      evening: 'Topchanchi Lake'
    }
  };

  const destInfo = destinationAttractions[destination] || destinationAttractions['Ranchi'];
  
  // Select attractions based on interests
  const selectedAttractions = [];
  if (Array.isArray(interests)) {
    interests.forEach(interest => {
      const key = interest.toLowerCase();
      if (key.includes('nature') || key.includes('waterfall')) {
        selectedAttractions.push('Hundru Falls', 'Dassam Falls');
      }
      if (key.includes('temple') || key.includes('culture') || key.includes('spirituality')) {
        selectedAttractions.push('Baidyanath Temple', 'Jagannath Temple');
      }
      if (key.includes('wildlife') || key.includes('adventure')) {
        selectedAttractions.push('Betla National Park', 'Dalma Wildlife Sanctuary');
      }
    });
  }

  return `
**${duration} Jharkhand Itinerary - ${destination}**

**Day 1: ${destInfo.day1}**
- 9:00 AM: Visit ${destInfo.morning} (₹50)
- 11:00 AM: ${destInfo.afternoon} (₹100)
- 2:00 PM: Local lunch at ${destination} (₹300)
- 4:00 PM: ${destInfo.evening} (₹200)

**Day 2: Cultural & Nature Tour**
- 8:00 AM: ${selectedAttractions[0] || destInfo.attractions[1]} (₹150)
- 12:00 PM: Traditional Jharkhand lunch (₹250)
- 3:00 PM: ${selectedAttractions[1] || destInfo.attractions[2]} (₹100)
- 6:00 PM: Local market visit in ${destination} (₹200)

**Budget Estimate:** ₹2,500-5,000 per person
**Best Time:** October to March
**Tips:** Carry comfortable shoes, book accommodation in advance

*This is a basic itinerary. For detailed AI-generated plans, please try again when our AI service is available.*
  `;
};

/**
 * Get popular Jharkhand destinations
 */
const getPopularDestinations = async (req, res) => {
  try {
    const destinations = [
      {
        name: 'Ranchi',
        description: 'Capital city with waterfalls and temples',
        attractions: ['Hundru Falls', 'Rock Garden', 'Jagannath Temple'],
        bestFor: ['Culture', 'Nature', 'Temples']
      },
      {
        name: 'Deoghar',
        description: 'Spiritual center with Baidyanath Temple',
        attractions: ['Baidyanath Temple', 'Nandan Pahar', 'Tapovan'],
        bestFor: ['Temples', 'Culture', 'Spirituality']
      },
      {
        name: 'Jamshedpur',
        description: 'Industrial city with parks and lakes',
        attractions: ['Jubilee Park', 'Tata Steel Zoological Park', 'Dalma Wildlife Sanctuary'],
        bestFor: ['Wildlife', 'Parks', 'Adventure']
      },
      {
        name: 'Hazaribagh',
        description: 'Wildlife and natural beauty',
        attractions: ['Hazaribagh Wildlife Sanctuary', 'Canary Hill', 'Konar Dam'],
        bestFor: ['Wildlife', 'Nature', 'Adventure']
      }
    ];

    res.json({
      success: true,
      data: destinations
    });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch destinations'
    });
  }
};

module.exports = {
  generateItinerary,
  getPopularDestinations
};
