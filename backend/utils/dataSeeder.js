const fs = require('fs').promises;
const path = require('path');
const Place = require('../models/Place');
const PlacesData = require('../models/PlacesData');
const { getGridFSBucket } = require('../config/database');
const mongoose = require('mongoose');

// Seed places data from existing places.js file
const seedPlacesData = async () => {
  try {
    console.log('🌱 Starting places data seeding...');
    
    // Read the existing places.js file
    const placesFilePath = path.join(__dirname, '../../public/places.js');
    const fileContent = await fs.readFile(placesFilePath, 'utf8');
    
    // Parse the JavaScript file content
    let placesArray;
    
    // Remove export statement and extract the array
    let cleanContent = fileContent
      .replace(/export\s+default\s+\w+\s*;?\s*$/m, '')
      .replace(/^\s*const\s+(\w+)\s*=\s*/, '');
    
    // Find the array content between [ and ];
    const arrayMatch = cleanContent.match(/(\[[\s\S]*\]);?\s*$/);
    if (arrayMatch) {
      cleanContent = arrayMatch[1];
    }
    
    placesArray = eval(cleanContent);
    
    // Clear existing data
    await Place.deleteMany({});
    await PlacesData.deleteMany({});
    
    // Save places data
    const placesData = new PlacesData({
      data: placesArray,
      fileSize: Buffer.byteLength(fileContent, 'utf8'),
      checksum: require('crypto').createHash('md5').update(fileContent).digest('hex')
    });
    
    await placesData.save();
    
    // Save individual places
    const placesToInsert = placesArray.map(place => ({
      district: place.district,
      name: place.name,
      lat: place.lat,
      lon: place.lon,
      streetView: place.streetView,
      category: categorizePlace(place.name)
    }));
    
    await Place.insertMany(placesToInsert);
    
    console.log(`✅ Successfully seeded ${placesArray.length} places`);
    return { success: true, count: placesArray.length };
    
  } catch (error) {
    console.error('❌ Error seeding places data:', error);
    throw error;
  }
};

// Seed images from arvrPics folder
const seedImagesData = async () => {
  try {
    console.log('🖼️ Starting images seeding...');
    
    const imagesDir = path.join(__dirname, '../../public/arvrPics');
    const files = await fs.readdir(imagesDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );
    
    const gridfsBucket = getGridFSBucket();
    let uploadedCount = 0;
    
    for (const filename of imageFiles) {
      const filePath = path.join(imagesDir, filename);
      const fileBuffer = await fs.readFile(filePath);
      
      // Check if file already exists
      const existingFiles = await gridfsBucket.find({ 
        'metadata.originalName': filename 
      }).toArray();
      
      if (existingFiles.length > 0) {
        console.log(`⏭️ Skipping ${filename} - already exists`);
        continue;
      }
      
      // Create upload stream
      const uploadStream = gridfsBucket.openUploadStream(filename, {
        metadata: {
          originalName: filename,
          uploadedBy: 'seeder',
          uploadedAt: new Date()
        }
      });
      
      // Upload the file
      await new Promise((resolve, reject) => {
        uploadStream.end(fileBuffer, (error) => {
          if (error) reject(error);
          else resolve();
        });
      });
      
      // Try to match images with places based on filename
      const originalName = filename.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
      
      // Try exact match first
      let place = await Place.findOne({
        name: { $regex: new RegExp(`^${originalName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
      });

      if (!place) {
        // Try partial match
        place = await Place.findOne({
          name: { $regex: new RegExp(originalName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }
        });
      }

      if (place) {
        place.imageId = uploadStream.id;
        place.imageName = filename;
        await place.save();
        console.log(`🔗 Linked ${filename} to ${place.name}`);
      } else {
        console.log(`⚠️ No place found for image: ${filename} (original: ${originalName})`);
      }
      
      uploadedCount++;
      console.log(`📤 Uploaded ${filename}`);
    }
    
    console.log(`✅ Successfully uploaded ${uploadedCount} images`);
    return { success: true, count: uploadedCount };
    
  } catch (error) {
    console.error('❌ Error seeding images:', error);
    throw error;
  }
};

// Helper function to categorize places
const categorizePlace = (name) => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('temple') || lowerName.includes('mandir') || lowerName.includes('dham')) {
    return 'temple';
  }
  if (lowerName.includes('falls') || lowerName.includes('waterfall')) {
    return 'waterfall';
  }
  if (lowerName.includes('dam')) {
    return 'dam';
  }
  if (lowerName.includes('fort')) {
    return 'fort';
  }
  if (lowerName.includes('park') || lowerName.includes('biological')) {
    return 'park';
  }
  if (lowerName.includes('hill') || lowerName.includes('pahar')) {
    return 'hill';
  }
  if (lowerName.includes('museum')) {
    return 'museum';
  }
  
  return 'other';
};

// Run all seeders
const runAllSeeders = async () => {
  try {
    console.log('🚀 Starting data seeding process...');
    
    const placesResult = await seedPlacesData();
    const imagesResult = await seedImagesData();
    
    console.log('🎉 Data seeding completed successfully!');
    console.log(`📊 Summary: ${placesResult.count} places, ${imagesResult.count} images`);
    
    return {
      success: true,
      places: placesResult.count,
      images: imagesResult.count
    };
    
  } catch (error) {
    console.error('💥 Data seeding failed:', error);
    throw error;
  }
};

module.exports = {
  seedPlacesData,
  seedImagesData,
  runAllSeeders
};
