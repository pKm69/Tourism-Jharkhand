const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const Place = require('./models/Place');

const quickCheck = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jharkhand-tourism');
    console.log('✅ Connected to MongoDB');
    
    // Check places
    const totalPlaces = await Place.countDocuments();
    const placesWithImages = await Place.countDocuments({ imageName: { $ne: null } });
    console.log(`📍 Places: ${totalPlaces}, With images: ${placesWithImages}`);
    
    // Check GridFS
    const gfsBucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
    const files = await gfsBucket.find({}).toArray();
    console.log(`📸 GridFS files: ${files.length}`);
    
    // Sample place with image
    const placeWithImage = await Place.findOne({ imageName: { $ne: null } });
    if (placeWithImage) {
      console.log(`🖼️ Sample place with image: ${placeWithImage.name} - Image: ${placeWithImage.imageName}`);
    }
    
    // Check arvrPics folder
    const fs = require('fs');
    const path = require('path');
    const arvrPicsPath = path.join(__dirname, '..', 'db', 'arvrPics');
    if (fs.existsSync(arvrPicsPath)) {
      const imageFiles = fs.readdirSync(arvrPicsPath);
      console.log(`📁 arvrPics folder: ${imageFiles.length} files`);
    } else {
      console.log('❌ arvrPics folder not found');
    }
    
    // Test Gemini API key
    const apiKey = process.env.GEMINI_API_KEY;
    console.log(`🔑 Gemini API key: ${apiKey ? 'Present' : 'Missing'}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
  }
};

quickCheck();
