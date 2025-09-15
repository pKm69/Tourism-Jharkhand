const express = require('express');
const router = express.Router();
const { processPayment, getBlockchainTransaction, getBlockchainStats } = require('../controllers/paymentController');

// Process payment with blockchain integration
router.post('/process', processPayment);

// Get blockchain transaction details
router.get('/blockchain/:transactionHash', getBlockchainTransaction);

// Get blockchain statistics
router.get('/blockchain/stats', getBlockchainStats);

module.exports = router;
