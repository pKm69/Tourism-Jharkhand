const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Place = require('./models/Place');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jharkhand-tourism');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Simple approach: just link image names to places without GridFS
const linkImagesToPlaces = async () => {
  try {
    await connectDB();
    
    const imagesPath = path.join(__dirname, '..', 'db', 'arvrPics');
    const imageFiles = fs.readdirSync(imagesPath);
    
    console.log(`📸 Found ${imageFiles.length} images to link...`);
    
    let linkedCount = 0;
    
    for (const imageFile of imageFiles) {
      try {
        // Get base name without extension
        const baseName = path.parse(imageFile).name;
        
        // Try to find matching place
        const place = await Place.findOne({
          name: { $regex: baseName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' }
        });
        
        if (place) {
          await Place.updateOne(
            { _id: place._id },
            { 
              imageName: imageFile,
              description: `${place.description} This beautiful ${place.category} offers stunning views and is a must-visit destination in ${place.district} district.`
            }
          );
          console.log(`✅ Linked: ${imageFile} → ${place.name}`);
          linkedCount++;
        } else {
          // Try partial matching
          const partialMatch = await Place.findOne({
            $or: [
              { name: { $regex: baseName.split(' ')[0], $options: 'i' } },
              { name: { $regex: baseName.split(' ').slice(-1)[0], $options: 'i' } }
            ]
          });
          
          if (partialMatch) {
            await Place.updateOne(
              { _id: partialMatch._id },
              { 
                imageName: imageFile,
                description: `${partialMatch.description} This beautiful ${partialMatch.category} offers stunning views and is a must-visit destination in ${partialMatch.district} district.`
              }
            );
            console.log(`✅ Partial match: ${imageFile} → ${partialMatch.name}`);
            linkedCount++;
          } else {
            console.log(`⚠️ No match found for: ${imageFile}`);
          }
        }
      } catch (error) {
        console.error(`❌ Error processing ${imageFile}:`, error.message);
      }
    }
    
    console.log(`\n🎉 Successfully linked ${linkedCount} images to places!`);
    
    // Verify results
    const placesWithImages = await Place.countDocuments({ imageName: { $ne: null } });
    console.log(`📊 Places with images: ${placesWithImages}`);
    
  } catch (error) {
    console.error('❌ Linking failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

linkImagesToPlaces();
