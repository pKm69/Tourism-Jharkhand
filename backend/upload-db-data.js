const mongoose = require('mongoose');
const fs = require('fs');
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

// Function to load and parse places.js
const loadPlacesData = () => {
  try {
    const placesPath = path.join(__dirname, '..', 'db', 'places.js');
    const placesContent = fs.readFileSync(placesPath, 'utf8');
    
    // Extract the array from the file content
    const arrayMatch = placesContent.match(/const\s+\w+\s*=\s*(\[[\s\S]*\]);/);
    if (!arrayMatch) {
      throw new Error('Could not parse places.js file');
    }
    
    // Evaluate the array safely
    const placesArray = eval(arrayMatch[1]);
    console.log(`📍 Loaded ${placesArray.length} places from places.js`);
    return placesArray;
  } catch (error) {
    console.error('❌ Error loading places.js:', error);
    return [];
  }
};

// Function to load and parse destination.js
const loadDestinationData = () => {
  try {
    const destPath = path.join(__dirname, '..', 'db', 'destination.js');
    const destContent = fs.readFileSync(destPath, 'utf8');
    
    // Extract the array from the file content
    const arrayMatch = destContent.match(/const\s+\w+\s*=\s*(\[[\s\S]*\]);/);
    if (!arrayMatch) {
      throw new Error('Could not parse destination.js file');
    }
    
    // Evaluate the array safely
    const destinationsArray = eval(arrayMatch[1]);
    console.log(`🏛️ Loaded ${destinationsArray.length} destinations from destination.js`);
    return destinationsArray;
  } catch (error) {
    console.error('❌ Error loading destination.js:', error);
    return [];
  }
};

// Function to determine category based on place name
const determineCategory = (name) => {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('falls') || nameLower.includes('waterfall')) return 'waterfall';
  if (nameLower.includes('dam')) return 'dam';
  if (nameLower.includes('temple') || nameLower.includes('mandir')) return 'temple';
  if (nameLower.includes('fort') || nameLower.includes('palace')) return 'fort';
  if (nameLower.includes('park') || nameLower.includes('zoo') || nameLower.includes('garden')) return 'park';
  if (nameLower.includes('hill') || nameLower.includes('peak') || nameLower.includes('mountain')) return 'hill';
  if (nameLower.includes('museum')) return 'museum';
  return 'other';
};

// Function to transform places.js data to Place model format
const transformPlacesData = (placesArray) => {
  return placesArray.map(place => ({
    name: place.name,
    district: place.district,
    lat: place.lat,
    lon: place.lon,
    streetView: place.streetView || '',
    category: determineCategory(place.name),
    description: `Beautiful ${determineCategory(place.name)} in ${place.district} district`,
    isActive: true
  }));
};

// Function to transform destination.js data to Place model format
const transformDestinationData = (destinationsArray) => {
  return destinationsArray.map(dest => ({
    name: dest.name,
    district: dest.distance ? dest.distance.split(' from ')[1] || 'Ranchi' : 'Ranchi',
    lat: 23.3441, // Default Ranchi coordinates
    lon: 85.3094,
    streetView: '',
    category: determineCategory(dest.name),
    description: dest.description || `Beautiful destination in Jharkhand`,
    isActive: true
  }));
};

// Main upload function
const uploadData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    console.log('🧹 Clearing existing places data...');
    await Place.deleteMany({});
    
    // Load data from files
    const placesArray = loadPlacesData();
    const destinationsArray = loadDestinationData();
    
    // Transform data
    const transformedPlaces = transformPlacesData(placesArray);
    const transformedDestinations = transformDestinationData(destinationsArray);
    
    // Combine all data
    const allPlaces = [...transformedPlaces, ...transformedDestinations];
    
    // Remove duplicates based on name
    const uniquePlaces = allPlaces.filter((place, index, self) => 
      index === self.findIndex(p => p.name === place.name)
    );
    
    console.log(`📤 Uploading ${uniquePlaces.length} unique places to MongoDB...`);
    
    // Insert data in batches
    const batchSize = 10;
    for (let i = 0; i < uniquePlaces.length; i += batchSize) {
      const batch = uniquePlaces.slice(i, i + batchSize);
      await Place.insertMany(batch);
      console.log(`✅ Uploaded batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(uniquePlaces.length/batchSize)}`);
    }
    
    // Verify upload
    const totalCount = await Place.countDocuments();
    console.log(`🎉 Successfully uploaded ${totalCount} places to MongoDB!`);
    
    // Show sample data
    const samplePlaces = await Place.find().limit(5);
    console.log('\n📋 Sample uploaded places:');
    samplePlaces.forEach((place, index) => {
      console.log(`${index + 1}. ${place.name} (${place.district}) - ${place.category}`);
    });
    
  } catch (error) {
    console.error('❌ Upload failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run the upload
if (require.main === module) {
  uploadData();
}

module.exports = { uploadData };
