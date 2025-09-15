const Place = require('../models/Place');
const PlacesData = require('../models/PlacesData');
const { getGridFSBucket } = require('../config/database');
const mongoose = require('mongoose');
const crypto = require('crypto');

// Upload places.js file and parse data
const uploadPlacesFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Parse the JavaScript file content
    const fileContent = req.file.buffer.toString('utf8');
    
    // Extract the array data from the JS file
    let placesArray;
    try {
      // Remove export statement and evaluate the array
      const cleanContent = fileContent
        .replace(/export\s+default\s+/, '')
        .replace(/const\s+\w+\s*=\s*/, '')
        .replace(/;?\s*$/, '');
      
      placesArray = eval(cleanContent);
    } catch (parseError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid JavaScript file format',
        error: parseError.message
      });
    }

    // Calculate checksum
    const checksum = crypto.createHash('md5').update(fileContent).digest('hex');

    // Save places data to database
    const placesData = new PlacesData({
      data: placesArray,
      fileSize: req.file.size,
      checksum: checksum
    });

    await placesData.save();

    // Also save individual places to Place collection
    await Place.deleteMany({}); // Clear existing data
    
    const placesToInsert = placesArray.map(place => ({
      district: place.district,
      name: place.name,
      lat: place.lat,
      lon: place.lon,
      streetView: place.streetView
    }));

    await Place.insertMany(placesToInsert);

    res.status(200).json({
      success: true,
      message: 'Places file uploaded and processed successfully',
      data: {
        totalPlaces: placesArray.length,
        checksum: checksum,
        version: placesData.version
      }
    });

  } catch (error) {
    console.error('Upload places file error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing places file',
      error: error.message
    });
  }
};

// Get all places data
const getAllPlaces = async (req, res) => {
  try {
    const { district, search, limit = 50, page = 1 } = req.query;
    
    let query = { isActive: true };
    
    // Filter by district
    if (district) {
      query.district = new RegExp(district, 'i');
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { district: new RegExp(search, 'i') }
      ];
    }

    const places = await Place.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ district: 1, name: 1 });

    const total = await Place.countDocuments(query);

    res.status(200).json({
      success: true,
      data: places,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get places error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching places',
      error: error.message
    });
  }
};

// Get places by district
const getPlacesByDistrict = async (req, res) => {
  try {
    const { district } = req.params;
    
    const places = await Place.find({
      district: new RegExp(district, 'i'),
      isActive: true
    }).sort({ name: 1 });

    res.status(200).json({
      success: true,
      data: places,
      count: places.length
    });

  } catch (error) {
    console.error('Get places by district error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching places by district',
      error: error.message
    });
  }
};

// Get single place by ID
const getPlaceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const place = await Place.findById(id);
    
    if (!place) {
      return res.status(404).json({
        success: false,
        message: 'Place not found'
      });
    }

    res.status(200).json({
      success: true,
      data: place
    });

  } catch (error) {
    console.error('Get place by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching place',
      error: error.message
    });
  }
};

// Get places data as JavaScript file
const getPlacesAsJS = async (req, res) => {
  try {
    const placesData = await PlacesData.findOne({ isActive: true })
      .sort({ createdAt: -1 });

    if (!placesData) {
      return res.status(404).json({
        success: false,
        message: 'Places data not found'
      });
    }

    // Generate JavaScript file content
    const jsContent = `const jharkhandTouristPlaces = ${JSON.stringify(placesData.data, null, 2)};

export default jharkhandTouristPlaces;
`;

    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Content-Disposition', 'attachment; filename="places.js"');
    res.send(jsContent);

  } catch (error) {
    console.error('Get places as JS error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating JavaScript file',
      error: error.message
    });
  }
};

// Get nearby places
const getNearbyPlaces = async (req, res) => {
  try {
    const { lat, lon, radius = 50 } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    // Convert radius from km to degrees (approximate)
    const radiusInDegrees = parseFloat(radius) / 111;

    const places = await Place.find({
      lat: {
        $gte: parseFloat(lat) - radiusInDegrees,
        $lte: parseFloat(lat) + radiusInDegrees
      },
      lon: {
        $gte: parseFloat(lon) - radiusInDegrees,
        $lte: parseFloat(lon) + radiusInDegrees
      },
      isActive: true
    });

    res.status(200).json({
      success: true,
      data: places,
      count: places.length
    });

  } catch (error) {
    console.error('Get nearby places error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching nearby places',
      error: error.message
    });
  }
};

module.exports = {
  uploadPlacesFile,
  getAllPlaces,
  getPlacesByDistrict,
  getPlaceById,
  getPlacesAsJS,
  getNearbyPlaces
};
