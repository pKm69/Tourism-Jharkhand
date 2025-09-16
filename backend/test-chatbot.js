const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Import models
const Place = require('./models/Place');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jharkhand-tourism');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Test chatbot functionality without Gemini API
const testChatbot = async () => {
  try {
    await connectDB();
    
    console.log('🧪 Testing chatbot functionality...\n');
    
    // Test 1: Search for waterfalls
    console.log('Test 1: Searching for waterfalls...');
    const waterfalls = await Place.find({ category: 'waterfall' }).limit(3);
    console.log(`Found ${waterfalls.length} waterfalls:`);
    waterfalls.forEach(place => {
      console.log(`- ${place.name} (${place.district}): ${place.description}`);
    });
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test 2: Search for temples
    console.log('Test 2: Searching for temples...');
    const temples = await Place.find({ category: 'temple' }).limit(3);
    console.log(`Found ${temples.length} temples:`);
    temples.forEach(place => {
      console.log(`- ${place.name} (${place.district}): ${place.description}`);
    });
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test 3: Search by name (Hundru Falls)
    console.log('Test 3: Searching for "Hundru Falls"...');
    const hundru = await Place.findOne({ name: { $regex: 'Hundru', $options: 'i' } });
    if (hundru) {
      console.log(`Found: ${hundru.name} (${hundru.district})`);
      console.log(`Category: ${hundru.category}`);
      console.log(`Description: ${hundru.description}`);
      console.log(`Coordinates: ${hundru.lat}, ${hundru.lon}`);
      console.log(`Has Image: ${hundru.imageId ? 'Yes' : 'No'}`);
    } else {
      console.log('Hundru Falls not found');
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test 4: Get statistics
    console.log('Test 4: Database statistics...');
    const totalPlaces = await Place.countDocuments();
    const placesWithImages = await Place.countDocuments({ imageId: { $ne: null } });
    
    console.log(`Total places: ${totalPlaces}`);
    console.log(`Places with images: ${placesWithImages}`);
    
    // Category breakdown
    const categoryStats = await Place.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\nCategory breakdown:');
    categoryStats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} places`);
    });
    
    console.log('\n✅ All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Simulate chatbot response without Gemini API
const simulateChatbotResponse = async (message) => {
  try {
    await connectDB();
    
    console.log(`\n🤖 User: ${message}`);
    
    // Search for relevant places based on keywords
    const searchTerms = message.toLowerCase().match(/\b\w+\b/g) || [];
    const places = await Place.find({
      $or: [
        { name: { $regex: searchTerms.join('|'), $options: 'i' } },
        { district: { $regex: searchTerms.join('|'), $options: 'i' } },
        { category: { $regex: searchTerms.join('|'), $options: 'i' } },
        { description: { $regex: searchTerms.join('|'), $options: 'i' } }
      ]
    }).limit(5);
    
    let response = "🏞️ Here's what I found about Jharkhand tourism:\n\n";
    
    if (places.length > 0) {
      places.forEach((place, index) => {
        response += `${index + 1}. **${place.name}** (${place.district})\n`;
        response += `   Category: ${place.category}\n`;
        response += `   ${place.description}\n`;
        if (place.imageId) response += `   📸 Image available\n`;
        response += `\n`;
      });
    } else {
      response += "I couldn't find specific places matching your query, but Jharkhand has many beautiful destinations including waterfalls, temples, hills, and parks!";
    }
    
    console.log(`🤖 Bot: ${response}`);
    
  } catch (error) {
    console.error('❌ Simulation failed:', error);
  } finally {
    await mongoose.connection.close();
  }
};

// Run tests
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    // Simulate chatbot with user message
    simulateChatbotResponse(args.join(' '));
  } else {
    // Run full test suite
    testChatbot();
  }
}

module.exports = { testChatbot, simulateChatbotResponse };
