const mongoose = require('mongoose');

const placesDataSchema = new mongoose.Schema({
  version: {
    type: String,
    required: true,
    default: '1.0.0'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  fileSize: {
    type: Number
  },
  checksum: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PlacesData', placesDataSchema);
