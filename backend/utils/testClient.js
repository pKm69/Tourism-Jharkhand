#!/usr/bin/env node

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5000/api';

class TourismAPIClient {
  constructor(baseUrl = BASE_URL) {
    this.baseUrl = baseUrl;
    this.axios = axios.create({
      baseURL: baseUrl,
      timeout: 30000
    });
  }

  // Test API health
  async testHealth() {
    try {
      console.log('🏥 Testing API health...');
      const response = await this.axios.get('/health');
      console.log('✅ Health check passed:', response.data.message);
      return response.data;
    } catch (error) {
      console.error('❌ Health check failed:', error.message);
      throw error;
    }
  }

  // Test places upload
  async testPlacesUpload() {
    try {
      console.log('📤 Testing places file upload...');
      
      const placesFilePath = path.join(__dirname, '../../public/places.js');
      
      if (!fs.existsSync(placesFilePath)) {
        throw new Error('places.js file not found');
      }

      const formData = new FormData();
      formData.append('placesFile', fs.createReadStream(placesFilePath));

      const response = await this.axios.post('/places/upload', formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      console.log('✅ Places upload successful:', response.data.message);
      console.log(`📊 Total places: ${response.data.data.totalPlaces}`);
      return response.data;
    } catch (error) {
      console.error('❌ Places upload failed:', error.response?.data || error.message);
      throw error;
    }
  }

  // Test image upload
  async testImageUpload() {
    try {
      console.log('🖼️ Testing image upload...');
      
      const imagesDir = path.join(__dirname, '../../public/arvrPics');
      
      if (!fs.existsSync(imagesDir)) {
        throw new Error('arvrPics directory not found');
      }

      const files = fs.readdirSync(imagesDir)
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .slice(0, 5); // Test with first 5 images

      if (files.length === 0) {
        throw new Error('No image files found');
      }

      const formData = new FormData();
      files.forEach(file => {
        const filePath = path.join(imagesDir, file);
        formData.append('images', fs.createReadStream(filePath));
      });

      const response = await this.axios.post('/images/upload', formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      console.log('✅ Images upload successful:', response.data.message);
      console.log(`📊 Uploaded files: ${response.data.data.length}`);
      return response.data;
    } catch (error) {
      console.error('❌ Images upload failed:', error.response?.data || error.message);
      throw error;
    }
  }

  // Test places retrieval
  async testPlacesRetrieval() {
    try {
      console.log('📋 Testing places retrieval...');
      
      // Test get all places
      const allPlaces = await this.axios.get('/places');
      console.log(`✅ Retrieved ${allPlaces.data.data.length} places`);

      if (allPlaces.data.data.length > 0) {
        // Test get by district
        const firstPlace = allPlaces.data.data[0];
        const districtPlaces = await this.axios.get(`/places/district/${firstPlace.district}`);
        console.log(`✅ Retrieved ${districtPlaces.data.data.length} places for ${firstPlace.district}`);

        // Test get by ID
        const singlePlace = await this.axios.get(`/places/${firstPlace._id}`);
        console.log(`✅ Retrieved place: ${singlePlace.data.data.name}`);

        // Test nearby places
        const nearbyPlaces = await this.axios.get(`/places/nearby?lat=${firstPlace.lat}&lon=${firstPlace.lon}&radius=50`);
        console.log(`✅ Found ${nearbyPlaces.data.data.length} nearby places`);
      }

      return allPlaces.data;
    } catch (error) {
      console.error('❌ Places retrieval failed:', error.response?.data || error.message);
      throw error;
    }
  }

  // Test images retrieval
  async testImagesRetrieval() {
    try {
      console.log('🖼️ Testing images retrieval...');
      
      const allImages = await this.axios.get('/images');
      console.log(`✅ Retrieved ${allImages.data.data.length} images metadata`);

      if (allImages.data.data.length > 0) {
        const firstImage = allImages.data.data[0];
        
        // Test get image by ID (just check response, don't download)
        const imageResponse = await this.axios.head(`/images/${firstImage.id}`);
        console.log(`✅ Image ${firstImage.filename} is accessible`);
      }

      return allImages.data;
    } catch (error) {
      console.error('❌ Images retrieval failed:', error.response?.data || error.message);
      throw error;
    }
  }

  // Run comprehensive test suite
  async runAllTests() {
    console.log('🚀 Starting comprehensive API tests...\n');
    
    try {
      // Test 1: Health check
      await this.testHealth();
      console.log('');

      // Test 2: Upload places
      await this.testPlacesUpload();
      console.log('');

      // Test 3: Upload images
      await this.testImageUpload();
      console.log('');

      // Test 4: Retrieve places
      await this.testPlacesRetrieval();
      console.log('');

      // Test 5: Retrieve images
      await this.testImagesRetrieval();
      console.log('');

      console.log('🎉 All tests completed successfully!');
      return { success: true, message: 'All tests passed' };

    } catch (error) {
      console.error('💥 Test suite failed:', error.message);
      return { success: false, error: error.message };
    }
  }
}

// CLI usage
if (require.main === module) {
  const client = new TourismAPIClient();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'health':
      client.testHealth();
      break;
    case 'upload-places':
      client.testPlacesUpload();
      break;
    case 'upload-images':
      client.testImageUpload();
      break;
    case 'get-places':
      client.testPlacesRetrieval();
      break;
    case 'get-images':
      client.testImagesRetrieval();
      break;
    case 'all':
    default:
      client.runAllTests();
      break;
  }
}

module.exports = TourismAPIClient;
