const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'http://localhost:5000/api/travel-planner';

// Test data
const testItineraryRequest = {
  destination: "Ranchi",
  duration: "3 days",
  interests: ["Culture", "Nature", "Waterfalls"],
  budget: "Medium",
  groupSize: "2-4 people",
  accommodation: "Hotels"
};

async function testTravelPlannerAPI() {
  console.log('🧪 Testing Travel Planner API Integration\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data);
    console.log(`   Groq Configured: ${healthResponse.data.groqConfigured}\n`);

    // Test 2: Get Popular Destinations
    console.log('2️⃣ Testing Popular Destinations...');
    const destinationsResponse = await axios.get(`${BASE_URL}/destinations`);
    console.log('✅ Popular Destinations:', destinationsResponse.data.data.length, 'destinations found');
    destinationsResponse.data.data.forEach((dest, index) => {
      console.log(`   ${index + 1}. ${dest.name} - ${dest.description}`);
    });
    console.log();

    // Test 3: Generate Itinerary (with API key)
    if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your_groq_api_key_here') {
      console.log('3️⃣ Testing AI Itinerary Generation...');
      console.log('   Request:', testItineraryRequest);
      
      const itineraryResponse = await axios.post(`${BASE_URL}/generate`, testItineraryRequest, {
        timeout: 30000 // 30 second timeout
      });
      
      if (itineraryResponse.data.success) {
        console.log('✅ AI Itinerary Generated Successfully!');
        console.log('   Generated at:', itineraryResponse.data.data.generatedAt);
        console.log('   Itinerary preview:', itineraryResponse.data.data.itinerary.substring(0, 200) + '...');
      } else {
        console.log('⚠️ AI Generation failed, but fallback should work');
        if (itineraryResponse.data.fallback) {
          console.log('   Fallback itinerary provided');
        }
      }
    } else {
      console.log('3️⃣ Testing Fallback Itinerary (No API Key)...');
      
      try {
        const fallbackResponse = await axios.post(`${BASE_URL}/generate`, testItineraryRequest);
        console.log('✅ Fallback Response:', fallbackResponse.data.success ? 'Success with fallback' : 'Error with fallback provided');
        if (fallbackResponse.data.fallback) {
          console.log('   Fallback preview:', fallbackResponse.data.fallback.substring(0, 200) + '...');
        }
      } catch (error) {
        if (error.response && error.response.data.fallback) {
          console.log('✅ Fallback itinerary provided in error response');
          console.log('   Fallback preview:', error.response.data.fallback.substring(0, 200) + '...');
        } else {
          console.log('❌ No fallback provided:', error.message);
        }
      }
    }

    console.log('\n🎉 Travel Planner API Integration Test Complete!');
    
    // Test 4: Rate Limiting Test
    console.log('\n4️⃣ Testing Rate Limiting...');
    let rateLimitHit = false;
    for (let i = 0; i < 12; i++) {
      try {
        await axios.post(`${BASE_URL}/generate`, testItineraryRequest);
        console.log(`   Request ${i + 1}: ✅`);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.log(`   Request ${i + 1}: ⚠️ Rate limit hit (expected after 10 requests)`);
          rateLimitHit = true;
          break;
        } else {
          console.log(`   Request ${i + 1}: ❌ ${error.message}`);
        }
      }
    }
    
    if (rateLimitHit) {
      console.log('✅ Rate limiting working correctly');
    } else {
      console.log('⚠️ Rate limiting may not be working as expected');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('   Response:', error.response.data);
    }
    
    console.log('\n🔧 Troubleshooting Tips:');
    console.log('1. Make sure backend server is running on port 5000');
    console.log('2. Check if GROQ_API_KEY is set in backend/.env file');
    console.log('3. Verify MongoDB connection is working');
    console.log('4. Check backend console for detailed error logs');
  }
}

// Run the test
if (require.main === module) {
  testTravelPlannerAPI();
}

module.exports = { testTravelPlannerAPI };
