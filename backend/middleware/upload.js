const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Memory storage for processing files
const storage = multer.memoryStorage();

// File filter for images
const imageFilter = (req, file, cb) => {
  const allowedTypes = process.env.ALLOWED_IMAGE_TYPES?.split(',') || [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false);
  }
};

// File filter for JavaScript files
const jsFilter = (req, file, cb) => {
  if (file.mimetype === 'application/javascript' || 
      file.mimetype === 'text/javascript' ||
      path.extname(file.originalname).toLowerCase() === '.js') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JavaScript files are allowed.'), false);
  }
};

// Upload configurations
const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 // 10MB
  },
  fileFilter: imageFilter
});

const uploadJS = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB for JS files
  },
  fileFilter: jsFilter
});

const uploadMemory = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

module.exports = {
  uploadImage,
  uploadJS,
  uploadMemory
};
