const express = require('express');
const router = express.Router();
const { sendMessage, healthCheck } = require('../controllers/chatbotController');

// POST /api/chatbot/message - Send message to chatbot
router.post('/message', sendMessage);

// GET /api/chatbot/health - Check chatbot service health
router.get('/health', healthCheck);

module.exports = router;
