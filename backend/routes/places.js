const express = require('express');
const router = express.Router();
const { uploadMemory } = require('../middleware/upload');
const {
  uploadPlacesFile,
  getAllPlaces,
  getPlacesByDistrict,
  getPlaceById,
  getPlacesAsJS,
  getNearbyPlaces
} = require('../controllers/placesController');

// Upload places.js file
router.post('/upload', uploadMemory.single('placesFile'), uploadPlacesFile);

// Get all places with optional filtering
router.get('/', getAllPlaces);

// Get places by district
router.get('/district/:district', getPlacesByDistrict);

// Get nearby places
router.get('/nearby', getNearbyPlaces);

// Get places data as JavaScript file
router.get('/download/js', getPlacesAsJS);

// Get single place by ID
router.get('/:id', getPlaceById);

module.exports = router;
