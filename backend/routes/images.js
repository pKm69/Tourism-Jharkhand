const express = require('express');
const router = express.Router();
const { uploadImage } = require('../middleware/upload');
const {
  uploadImages,
  getImageById,
  getImageByFilename,
  getAllImages,
  deleteImage,
  getImagesForPlace
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

// Delete image by ID
router.delete('/:id', deleteImage);

module.exports = router;
