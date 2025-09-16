require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('\nCollections in database:');
    collections.forEach(col => console.log(`- ${col.name}`));
    
    // Check places collection
    const placesCount = await db.collection('places').countDocuments();
    console.log(`\nPlaces collection: ${placesCount} documents`);
    
    // Check images/GridFS
    const imagesCount = await db.collection('uploads.files').countDocuments();
    console.log(`Images (GridFS): ${imagesCount} files`);
    
    // Check if there are any sample documents
    if (placesCount > 0) {
      const samplePlace = await db.collection('places').findOne();
      console.log('\nSample place:', JSON.stringify(samplePlace, null, 2));
    }
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Database check error:', error);
  }
}

checkDatabase();
