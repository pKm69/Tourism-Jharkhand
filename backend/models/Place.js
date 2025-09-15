const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  district: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  lat: {
    type: Number,
    required: true,
    min: -90,
    max: 90
  },
  lon: {
    type: Number,
    required: true,
    min: -180,
    max: 180
  },
  streetView: {
    type: String,
    required: true,
    trim: true
  },
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'uploads.files'
  },
  imageName: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['temple', 'waterfall', 'dam', 'fort', 'park', 'hill', 'museum', 'other'],
    default: 'other'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for geospatial queries
placeSchema.index({ lat: 1, lon: 1 });
placeSchema.index({ district: 1 });
placeSchema.index({ name: 'text', district: 'text' });

module.exports = mongoose.model('Place', placeSchema);
