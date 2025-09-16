const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { uploadImage } = require('../middleware/upload');
const {
  uploadImages,
  getImageById,
  getImageByFilename,
  getAllImages,
  deleteImage,
  getImagesForPlace,
  getImageByDestinationName
} = require('../controllers/imagesController');

// Upload multiple images
router.post('/upload', uploadImage.array('images', 50), uploadImages);

// Get all images metadata
router.get('/', getAllImages);

// Get image by ID (for display)
router.get('/:id', getImageById);

// Get image by filename (for download)
router.get('/download/:filename', getImageByFilename);

// Get images for a specific place
router.get('/place/:placeId', getImagesForPlace);

// Get image URL by destination name
router.get('/destination/:destinationName', getImageByDestinationName);

// Get image by place name (for chatbot usage) - with fallback support
router.get('/place-name/:placeName', async (req, res) => {
  try {
    const { placeName } = req.params;
    console.log(`🖼️ Images: Fetching image for place: "${placeName}"`);
    
    // First try to get from MongoDB
    let imageFile = null;
    let imagePath = null;
    
    try {
      const Place = require('../models/Place');
      const place = await Place.findOne({
        $or: [
          { name: { $regex: placeName, $options: 'i' } },
          { name: { $regex: placeName.replace(/[-\s]/g, ''), $options: 'i' } }
        ]
      });
      
      if (place && place.imageName) {
        imageFile = place.imageName;
        imagePath = path.join(__dirname, '..', '..', 'db', 'arvrPics', imageFile);
        console.log(`🖼️ Images: Found image in MongoDB: ${imageFile}`);
      }
    } catch (dbError) {
      console.log(`🖼️ Images: MongoDB query failed, using fallback: ${dbError.message}`);
    }
    
    // If not found in MongoDB, try fallback data
    if (!imageFile) {
      try {
        const fallbackData = require('../utils/fallback-data');
        imageFile = fallbackData.findImageName(placeName);
        if (imageFile) {
          imagePath = path.join(__dirname, '..', '..', 'db', 'arvrPics', imageFile);
          console.log(`🖼️ Images: Found image via fallback: ${imageFile}`);
        }
      } catch (fallbackError) {
        console.log(`🖼️ Images: Fallback search failed: ${fallbackError.message}`);
      }
    }
    
    // If still not found, try direct file search
    if (!imageFile) {
      const imagesDir = path.join(__dirname, '..', '..', 'db', 'arvrPics');
      
      if (fs.existsSync(imagesDir)) {
        const files = fs.readdirSync(imagesDir);
        imageFile = files.find(file => {
          const fileName = path.parse(file).name.toLowerCase();
          const searchName = placeName.toLowerCase();
          return fileName === searchName || fileName.includes(searchName) || searchName.includes(fileName);
        });
        
        if (imageFile) {
          imagePath = path.join(imagesDir, imageFile);
          console.log(`🖼️ Images: Found image via direct search: ${imageFile}`);
        }
      }
    }
    
    if (!imageFile || !imagePath) {
      console.log(`🖼️ Images: No image found for "${placeName}"`);
      return res.status(404).json({
        success: false,
        message: `No image found for place: ${placeName}`
      });
    }
    
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      console.log(`🖼️ Images: Image file not found: ${imagePath}`);
      return res.status(404).json({
        success: false,
        message: `Image file not found: ${imageFile}`
      });
    }
    
    console.log(`🖼️ Images: Serving image: ${imageFile}`);
    
    // Set appropriate content type
    const ext = path.extname(imageFile).toLowerCase();
    const contentType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 
                       ext === '.png' ? 'image/png' : 
                       ext === '.gif' ? 'image/gif' : 'image/jpeg';
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
    
    // Stream the file
    const fileStream = fs.createReadStream(imagePath);
    fileStream.pipe(res);
    
  } catch (error) {
    console.error('🖼️ Images: Error serving image by place name:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Delete image by ID
router.delete('/:id', deleteImage);

module.exports = router;
