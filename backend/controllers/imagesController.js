const { getGridFSBucket } = require('../config/database');
const Place = require('../models/Place');
const mongoose = require('mongoose');

// Upload multiple images from arvrPics folder
const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const gridfsBucket = getGridFSBucket();
    const uploadedFiles = [];

    // Upload each file to GridFS
    for (const file of req.files) {
      const filename = require('crypto').randomBytes(16).toString('hex') + require('path').extname(file.originalname);
      
      const uploadStream = gridfsBucket.openUploadStream(filename, {
        metadata: {
          originalName: file.originalname,
          uploadedBy: req.ip,
          uploadedAt: new Date()
        }
      });

      // Upload file buffer
      await new Promise((resolve, reject) => {
        uploadStream.end(file.buffer, (error) => {
          if (error) reject(error);
          else resolve();
        });
      });

      uploadedFiles.push({
        id: uploadStream.id,
        filename: filename,
        originalName: file.originalname,
        size: file.size,
        uploadDate: new Date()
      });

      // Try to match images with places based on filename
      const originalName = file.originalname.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
      
      const place = await Place.findOne({
        name: new RegExp(originalName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
      });

      if (place) {
        place.imageId = uploadStream.id;
        place.imageName = filename;
        await place.save();
      }
    }

    res.status(200).json({
      success: true,
      message: `${uploadedFiles.length} images uploaded successfully`,
      data: uploadedFiles
    });

  } catch (error) {
    console.error('Upload images error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading images',
      error: error.message
    });
  }
};

// Get image by ID
const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image ID'
      });
    }

    const gridfsBucket = getGridFSBucket();
    
    // Check if file exists
    const files = await gridfsBucket.find({ _id: new mongoose.Types.ObjectId(id) }).toArray();
    
    if (!files || files.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    const file = files[0];

    // Set appropriate headers
    res.setHeader('Content-Type', file.contentType || 'image/jpeg');
    res.setHeader('Content-Length', file.length);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

    // Stream the file
    const downloadStream = gridfsBucket.openDownloadStream(new mongoose.Types.ObjectId(id));
    
    downloadStream.on('error', (error) => {
      console.error('Stream error:', error);
      res.status(500).json({
        success: false,
        message: 'Error streaming image'
      });
    });

    downloadStream.pipe(res);

  } catch (error) {
    console.error('Get image error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching image',
      error: error.message
    });
  }
};

// Get image by filename
const getImageByFilename = async (req, res) => {
  try {
    const { filename } = req.params;
    
    const gridfsBucket = getGridFSBucket();
    
    // Check if file exists
    const files = await gridfsBucket.find({ filename }).toArray();
    
    if (!files || files.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    const file = files[0];

    // Set appropriate headers
    res.setHeader('Content-Type', file.contentType || 'image/jpeg');
    res.setHeader('Content-Length', file.length);
    res.setHeader('Cache-Control', 'public, max-age=31536000');

    // Stream the file
    const downloadStream = gridfsBucket.openDownloadStreamByName(filename);
    
    downloadStream.on('error', (error) => {
      console.error('Stream error:', error);
      res.status(500).json({
        success: false,
        message: 'Error streaming image'
      });
    });

    downloadStream.pipe(res);

  } catch (error) {
    console.error('Get image by filename error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching image',
      error: error.message
    });
  }
};

// Get all images metadata
const getAllImages = async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    
    const gridfsBucket = getGridFSBucket();
    
    const files = await gridfsBucket.find({})
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ uploadDate: -1 })
      .toArray();

    const imagesWithUrls = files.map(file => ({
      id: file._id,
      filename: file.filename,
      originalName: file.metadata?.originalName,
      size: file.length,
      contentType: file.contentType,
      uploadDate: file.uploadDate,
      url: `/api/images/${file._id}`,
      downloadUrl: `/api/images/download/${file.filename}`
    }));

    res.status(200).json({
      success: true,
      data: imagesWithUrls,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: files.length
      }
    });

  } catch (error) {
    console.error('Get all images error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching images',
      error: error.message
    });
  }
};

// Delete image by ID
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image ID'
      });
    }

    const gridfsBucket = getGridFSBucket();
    
    // Check if file exists
    const files = await gridfsBucket.find({ _id: new mongoose.Types.ObjectId(id) }).toArray();
    
    if (!files || files.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Remove image reference from places
    await Place.updateMany(
      { imageId: new mongoose.Types.ObjectId(id) },
      { $unset: { imageId: 1, imageName: 1 } }
    );

    // Delete the file
    await gridfsBucket.delete(new mongoose.Types.ObjectId(id));

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully'
    });

  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting image',
      error: error.message
    });
  }
};

// Get images for a specific place
const getImagesForPlace = async (req, res) => {
  try {
    const { placeId } = req.params;
    
    const place = await Place.findById(placeId);
    
    if (!place) {
      return res.status(404).json({
        success: false,
        message: 'Place not found'
      });
    }

    if (!place.imageId) {
      return res.status(200).json({
        success: true,
        data: null,
        message: 'No image associated with this place'
      });
    }

    const gridfsBucket = getGridFSBucket();
    const files = await gridfsBucket.find({ _id: place.imageId }).toArray();
    
    if (!files || files.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Associated image not found'
      });
    }

    const file = files[0];
    
    res.status(200).json({
      success: true,
      data: {
        id: file._id,
        filename: file.filename,
        originalName: file.metadata?.originalName,
        size: file.length,
        contentType: file.contentType,
        uploadDate: file.uploadDate,
        url: `/api/images/${file._id}`,
        place: {
          id: place._id,
          name: place.name,
          district: place.district
        }
      }
    });

  } catch (error) {
    console.error('Get images for place error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching images for place',
      error: error.message
    });
  }
};

module.exports = {
  uploadImages,
  getImageById,
  getImageByFilename,
  getAllImages,
  deleteImage,
  getImagesForPlace
};
