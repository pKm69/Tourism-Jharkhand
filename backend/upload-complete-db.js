const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { GridFSBucket } = require('mongodb');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Import models
const Place = require('./models/Place');

let gfsBucket;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jharkhand-tourism');
    console.log('✅ Connected to MongoDB');
    
    // Initialize GridFS
    gfsBucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads'
    });
    console.log('✅ GridFS initialized');
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
    
    const arrayMatch = placesContent.match(/const\s+\w+\s*=\s*(\[[\s\S]*\]);/);
    if (!arrayMatch) {
      throw new Error('Could not parse places.js file');
    }
    
    const placesArray = eval(arrayMatch[1]);
    console.log(`📍 Loaded ${placesArray.length} places from places.js`);
    return placesArray;
  } catch (error) {
    console.error('❌ Error loading places.js:', error);
    return [];
  }
};

// Function to load and parse destination.js (ES6 format)
const loadDestinationData = () => {
  try {
    const destPath = path.join(__dirname, '..', 'db', 'destination.js');
    let destContent = fs.readFileSync(destPath, 'utf8');
    
    // Convert ES6 export to CommonJS for evaluation
    destContent = destContent.replace('export default destinations;', '');
    
    const arrayMatch = destContent.match(/const\s+destinations\s*=\s*(\[[\s\S]*\])/);
    if (!arrayMatch) {
      throw new Error('Could not parse destination.js file');
    }
    
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
  if (nameLower.includes('hill') || nameLower.includes('peak') || nameLower.includes('mountain') || nameLower.includes('valley')) return 'hill';
  if (nameLower.includes('museum')) return 'museum';
  return 'other';
};

// Function to upload image to GridFS
const uploadImageToGridFS = (imagePath, imageName) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(imagePath);
    const uploadStream = gfsBucket.openUploadStream(imageName, {
      metadata: {
        originalName: imageName,
        uploadDate: new Date()
      }
    });

    readStream.pipe(uploadStream);

    uploadStream.on('error', reject);
    uploadStream.on('finish', () => {
      resolve(uploadStream.id);
    });
  });
};

// Function to upload all images from arvrPics folder
const uploadImages = async () => {
  const imagesPath = path.join(__dirname, '..', 'db', 'arvrPics');
  const imageFiles = fs.readdirSync(imagesPath);
  const imageMap = new Map();

  console.log(`📸 Found ${imageFiles.length} images to upload...`);

  for (const imageFile of imageFiles) {
    try {
      const imagePath = path.join(imagesPath, imageFile);
      const imageId = await uploadImageToGridFS(imagePath, imageFile);
      
      // Create a mapping based on image name (without extension)
      const baseName = path.parse(imageFile).name;
      imageMap.set(baseName.toLowerCase(), {
        id: imageId,
        filename: imageFile
      });
      
      console.log(`✅ Uploaded: ${imageFile}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${imageFile}:`, error.message);
    }
  }

  return imageMap;
};

// Function to find matching image for a place
const findMatchingImage = (placeName, imageMap) => {
  const searchName = placeName.toLowerCase();
  
  // Direct match
  if (imageMap.has(searchName)) {
    return imageMap.get(searchName);
  }
  
  // Partial match
  for (const [imageName, imageData] of imageMap) {
    if (imageName.includes(searchName) || searchName.includes(imageName)) {
      return imageData;
    }
  }
  
  return null;
};

// Function to transform places.js data to Place model format
const transformPlacesData = (placesArray, imageMap) => {
  return placesArray.map(place => {
    const matchingImage = findMatchingImage(place.name, imageMap);
    
    return {
      name: place.name,
      district: place.district,
      lat: place.lat,
      lon: place.lon,
      streetView: place.streetView || 'https://www.google.com/maps/embed?pb=!4v1757713814586!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHEzSUNmSWc.!2m2!1d23.45092199211176!2d85.66745002193967!3f342.14!4f10.939999999999998!5f0.7820865974627469',
      category: determineCategory(place.name),
      description: `Beautiful ${determineCategory(place.name)} in ${place.district} district`,
      imageId: matchingImage ? matchingImage.id : null,
      imageName: matchingImage ? matchingImage.filename : null,
      isActive: true
    };
  });
};

// Function to transform destination.js data to Place model format
const transformDestinationData = (destinationsArray, imageMap) => {
  return destinationsArray.map(dest => {
    const matchingImage = findMatchingImage(dest.name, imageMap);
    
    return {
      name: dest.name,
      district: dest.distance ? dest.distance.split(' from ')[1] || 'Ranchi' : 'Ranchi',
      lat: 23.3441, // Default Ranchi coordinates
      lon: 85.3094,
      streetView: 'https://www.google.com/maps/embed?pb=!4v1757713814586!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHEzSUNmSWc.!2m2!1d23.45092199211176!2d85.66745002193967!3f342.14!4f10.939999999999998!5f0.7820865974627469', // Default streetView
      category: determineCategory(dest.name),
      description: dest.description || `Beautiful destination in Jharkhand`,
      imageId: matchingImage ? matchingImage.id : null,
      imageName: matchingImage ? matchingImage.filename : null,
      isActive: true
    };
  });
};

// Main upload function
const uploadCompleteData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    console.log('🧹 Clearing existing places data...');
    await Place.deleteMany({});
    
    // Clear existing images
    console.log('🧹 Clearing existing images...');
    const cursor = gfsBucket.find({});
    for await (const file of cursor) {
      await gfsBucket.delete(file._id);
    }
    
    // Upload images first
    console.log('📸 Uploading images to GridFS...');
    const imageMap = await uploadImages();
    
    // Load data from files
    const placesArray = loadPlacesData();
    const destinationsArray = loadDestinationData();
    
    // Transform data with image references
    const transformedPlaces = transformPlacesData(placesArray, imageMap);
    const transformedDestinations = transformDestinationData(destinationsArray, imageMap);
    
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
    const placesWithImages = await Place.countDocuments({ imageId: { $ne: null } });
    
    console.log(`🎉 Successfully uploaded ${totalCount} places to MongoDB!`);
    console.log(`📸 ${placesWithImages} places have associated images`);
    
    // Show sample data
    const samplePlaces = await Place.find().limit(5);
    console.log('\n📋 Sample uploaded places:');
    samplePlaces.forEach((place, index) => {
      const imageStatus = place.imageId ? '🖼️' : '📷';
      console.log(`${index + 1}. ${place.name} (${place.district}) - ${place.category} ${imageStatus}`);
    });
    
    // Show statistics
    const categoryStats = await Place.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\n📊 Category Statistics:');
    categoryStats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} places`);
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
  uploadCompleteData();
}

module.exports = { uploadCompleteData };
