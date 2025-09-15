# Jharkhand Tourism Backend API

A comprehensive Node.js backend API for the Jharkhand Tourism website with MongoDB integration for storing and serving places data and images.

## Features

- **Places Management**: Upload, store, and retrieve tourist places data
- **Image Storage**: GridFS-based image storage for AR/VR pictures
- **RESTful API**: Clean REST endpoints for all operations
- **File Upload**: Support for places.js file and multiple image uploads
- **Search & Filter**: Advanced search and filtering capabilities
- **Geospatial Queries**: Find nearby places based on coordinates
- **Data Validation**: Comprehensive input validation and error handling

## Tech Stack

- **Runtime**: Node.js 16+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **File Storage**: GridFS for images
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer with GridFS Storage

## Installation

1. **Clone and Navigate**
   ```bash
   cd backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/jharkhand_tourism
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Seed Initial Data**
   ```bash
   npm run seed
   ```

6. **Start Server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Places API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/places/upload` | Upload places.js file |
| `GET` | `/api/places` | Get all places (with filtering) |
| `GET` | `/api/places/district/:district` | Get places by district |
| `GET` | `/api/places/nearby` | Get nearby places |
| `GET` | `/api/places/download/js` | Download places as JS file |
| `GET` | `/api/places/:id` | Get single place by ID |

### Images API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/images/upload` | Upload multiple images |
| `GET` | `/api/images` | Get all images metadata |
| `GET` | `/api/images/:id` | Get image by ID |
| `GET` | `/api/images/download/:filename` | Download image by filename |
| `GET` | `/api/images/place/:placeId` | Get images for specific place |
| `DELETE` | `/api/images/:id` | Delete image by ID |

### System Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/docs` | API documentation |

## Usage Examples

### Upload Places File
```bash
curl -X POST \
  http://localhost:5000/api/places/upload \
  -F "placesFile=@places.js"
```

### Upload Images
```bash
curl -X POST \
  http://localhost:5000/api/images/upload \
  -F "images=@image1.jpg" \
  -F "images=@image2.png"
```

### Get All Places
```bash
curl "http://localhost:5000/api/places"
```

### Get Places by District
```bash
curl "http://localhost:5000/api/places/district/Ranchi"
```

### Search Places
```bash
curl "http://localhost:5000/api/places?search=temple&limit=10"
```

### Get Nearby Places
```bash
curl "http://localhost:5000/api/places/nearby?lat=23.3368&lon=85.6708&radius=50"
```

## Data Models

### Place Schema
```javascript
{
  district: String,      // District name
  name: String,         // Place name
  lat: Number,          // Latitude
  lon: Number,          // Longitude
  streetView: String,   // Google Street View URL
  imageId: ObjectId,    // Reference to GridFS image
  imageName: String,    // Image filename
  description: String,  // Optional description
  category: String,     // Place category
  isActive: Boolean     // Active status
}
```

### PlacesData Schema
```javascript
{
  version: String,      // Data version
  lastUpdated: Date,    // Last update timestamp
  data: Mixed,          // Raw places array
  fileSize: Number,     // File size in bytes
  checksum: String,     // MD5 checksum
  isActive: Boolean     // Active status
}
```

## File Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── placesController.js  # Places logic
│   └── imagesController.js  # Images logic
├── middleware/
│   ├── upload.js           # File upload config
│   └── errorHandler.js     # Error handling
├── models/
│   ├── Place.js            # Place model
│   └── PlacesData.js       # Places data model
├── routes/
│   ├── places.js           # Places routes
│   └── images.js           # Images routes
├── scripts/
│   └── seed.js             # Data seeder
├── utils/
│   └── dataSeeder.js       # Seeding utilities
├── .env.example            # Environment template
├── package.json            # Dependencies
├── server.js               # Main server file
└── README.md               # This file
```

## Scripts

```bash
# Start development server
npm run dev

# Start production server
npm start

# Seed database with initial data
npm run seed

# Run tests (when implemented)
npm test
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/jharkhand_tourism` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `MAX_FILE_SIZE` | Max file upload size | `10485760` (10MB) |
| `ALLOWED_IMAGE_TYPES` | Allowed image MIME types | `image/jpeg,image/jpg,image/png,image/gif,image/webp` |

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **File Validation**: MIME type and size validation
- **Input Sanitization**: Mongoose validation and sanitization

## Error Handling

The API includes comprehensive error handling:
- Validation errors (400)
- Not found errors (404)
- Server errors (500)
- File upload errors
- Database connection errors

## Development

1. **Hot Reload**: Use `npm run dev` for development with nodemon
2. **Debugging**: Set `NODE_ENV=development` for detailed error messages
3. **Testing**: Add tests in the future using Jest
4. **Linting**: Consider adding ESLint for code quality

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a process manager like PM2
3. Set up proper MongoDB Atlas connection
4. Configure reverse proxy (Nginx)
5. Set up SSL certificates
6. Monitor with logging services

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Write meaningful commit messages
5. Test thoroughly before submitting

## License

MIT License - see LICENSE file for details.
