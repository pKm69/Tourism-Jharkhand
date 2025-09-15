const mongoose = require('mongoose');
const Place = require('../models/Place');
const { GridFSBucket } = require('mongodb');

async function linkImagesToPlaces() {
  try {
    console.log('🔗 Starting image-to-place linking process...');
    
    // Get all images from GridFS
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });
    
    const images = await bucket.find({}).toArray();
    console.log(`📸 Found ${images.length} images in GridFS`);
    
    let linkedCount = 0;
    
    for (const image of images) {
      const filename = image.filename;
      const originalName = filename.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
      
      console.log(`\n🔍 Processing: ${filename}`);
      console.log(`   Original name: ${originalName}`);
      
      // Try different matching strategies
      let place = null;
      
      // Strategy 1: Exact match
      place = await Place.findOne({
        name: { $regex: new RegExp(`^${originalName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
      });
      
      if (!place) {
        // Strategy 2: Partial match
        place = await Place.findOne({
          name: { $regex: new RegExp(originalName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }
        });
      }
      
      if (!place) {
        // Strategy 3: Try with common variations
        const variations = [
          originalName.replace(/[-_]/g, ' '),
          originalName.replace(/\s+/g, ''),
          originalName.replace(/\s+/g, '-'),
          originalName.replace(/\s+/g, '_')
        ];
        
        for (const variation of variations) {
          place = await Place.findOne({
            name: { $regex: new RegExp(variation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }
          });
          if (place) break;
        }
      }
      
      if (place) {
        // Update the place with image information
        place.imageId = image._id;
        place.imageName = filename;
        await place.save();
        
        console.log(`   ✅ Linked to: ${place.name}`);
        linkedCount++;
      } else {
        console.log(`   ❌ No matching place found`);
        
        // Show some potential matches for debugging
        const potentialMatches = await Place.find({
          name: { $regex: new RegExp(originalName.split(/[-_\s]+/)[0], 'i') }
        }).limit(3);
        
        if (potentialMatches.length > 0) {
          console.log(`   🤔 Potential matches:`);
          potentialMatches.forEach(p => console.log(`      - ${p.name}`));
        }
      }
    }
    
    console.log(`\n🎉 Linking complete! Successfully linked ${linkedCount}/${images.length} images`);
    
    // Show some examples of linked places
    const linkedPlaces = await Place.find({ imageId: { $exists: true } }).limit(5);
    console.log(`\n📋 Sample linked places:`);
    linkedPlaces.forEach(place => {
      console.log(`   - ${place.name} → ${place.imageName}`);
    });
    
  } catch (error) {
    console.error('❌ Error linking images:', error);
  }
}

// Connect to MongoDB and run the linking
mongoose.connect('mongodb://localhost:27017/jharkhand_tourism')
  .then(() => {
    console.log('📦 Connected to MongoDB');
    return linkImagesToPlaces();
  })
  .then(() => {
    console.log('✅ Process completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Process failed:', error);
    process.exit(1);
  });
