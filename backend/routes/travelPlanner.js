const express = require('express');
const router = express.Router();
const { generateItinerary, getPopularDestinations } = require('../controllers/travelPlannerController');

// Rate limiting middleware for AI requests
const rateLimit = require('express-rate-limit');

const aiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    success: false,
    error: 'Too many AI requests. Please try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * @route   POST /api/travel-planner/generate
 * @desc    Generate AI-powered travel itinerary
 * @access  Public
 * @body    { destination, duration, interests, budget, groupSize, accommodation }
 */
router.post('/generate', aiRateLimit, generateItinerary);

/**
 * @route   GET /api/travel-planner/destinations
 * @desc    Get popular Jharkhand destinations
 * @access  Public
 */
router.get('/destinations', getPopularDestinations);

/**
 * @route   GET /api/travel-planner/health
 * @desc    Health check for travel planner service
 * @access  Public
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    service: 'Travel Planner API',
    status: 'operational',
    timestamp: new Date().toISOString(),
    groqConfigured: !!process.env.GROQ_API_KEY
  });
});

module.exports = router;
