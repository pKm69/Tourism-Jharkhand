const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

// Test configuration
const testDbUri = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/jharkhand_tourism_test';

describe('Jharkhand Tourism API', () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(testDbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Clean up and close connection
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe('Health Check', () => {
    test('GET /api/health should return 200', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Jharkhand Tourism API is running');
    });
  });

  describe('API Documentation', () => {
    test('GET /api/docs should return documentation', async () => {
      const response = await request(app)
        .get('/api/docs')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.endpoints).toBeDefined();
      expect(response.body.endpoints.places).toBeDefined();
      expect(response.body.endpoints.images).toBeDefined();
    });
  });

  describe('Places API', () => {
    test('GET /api/places should return empty array initially', async () => {
      const response = await request(app)
        .get('/api/places')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('GET /api/places with invalid district should return empty results', async () => {
      const response = await request(app)
        .get('/api/places/district/NonExistentDistrict')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
    });
  });

  describe('Images API', () => {
    test('GET /api/images should return empty array initially', async () => {
      const response = await request(app)
        .get('/api/images')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('404 Routes', () => {
    test('GET /nonexistent should return 404', async () => {
      const response = await request(app)
        .get('/nonexistent')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Route not found');
    });
  });
});
