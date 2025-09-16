const blockchainService = require('../services/blockchainService');
const User = require('../models/User');

// Process payment with blockchain integration
const processPayment = async (req, res) => {
    try {
        const {
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            productId,
            productName,
            productPrice,
            quantity,
            userEmail,
            userName,
            userMobile
        } = req.body;

        console.log('🔄 Processing payment with blockchain integration...');
        console.log('📋 Full request body:', JSON.stringify(req.body, null, 2));
        console.log('Payment ID:', razorpayPaymentId);
        console.log('Product:', productName, 'Price:', productPrice, 'Quantity:', quantity);
        console.log('User:', userName, userEmail);

        // Verify Razorpay payment signature (basic verification)
        // In production, you should verify the signature properly
        if (!razorpayPaymentId || !razorpayOrderId) {
            return res.status(400).json({
                success: false,
                error: 'Invalid payment details'
            });
        }

        // Prepare blockchain payment data
        const paymentData = {
            transactionId: `TXN_${Date.now()}_${razorpayPaymentId}`,
            customerName: userName || 'Customer',
            customerEmail: userEmail || 'customer@example.com',
            customerMobile: userMobile || '9999999999',
            product: {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: quantity || 1
            },
            payment: {
                razorpayId: razorpayPaymentId,
                orderId: razorpayOrderId,
                amount: productPrice * (quantity || 1),
                currency: 'INR'
            },
            metadata: {
                platform: 'Jharkhand Tourism Marketplace',
                userAgent: req.get('User-Agent') || 'Unknown',
                ipAddress: req.ip || req.connection.remoteAddress || '127.0.0.1',
                timestamp: new Date().toISOString()
            }
        };

        // Record payment on blockchain
        console.log('🔗 Recording payment on blockchain...');
        const blockchainResult = await blockchainService.recordPayment(paymentData);

        if (blockchainResult.success) {
            console.log('✅ Payment successfully recorded on blockchain!');
            console.log('🔗 Blockchain Hash:', blockchainResult.blockchainHash);
            console.log('📦 Transaction Hash:', blockchainResult.transactionHash);

            // Save to MongoDB (optional - you can fetch user data from here)
            try {
                // You can save payment record to MongoDB here if needed
                console.log('💾 Payment data prepared for database storage');
            } catch (dbError) {
                console.warn('⚠️ Database save failed, but blockchain recording succeeded:', dbError.message);
            }

            return res.status(200).json({
                success: true,
                message: 'Payment processed and recorded on blockchain successfully',
                paymentId: razorpayPaymentId,
                blockchainHash: blockchainResult.blockchainHash,
                transactionHash: blockchainResult.transactionHash,
                blockNumber: blockchainResult.blockNumber.toString(),
                data: {
                    transactionId: paymentData.transactionId,
                    product: paymentData.product,
                    amount: paymentData.payment.amount,
                    timestamp: paymentData.metadata.timestamp
                }
            });

        } else {
            console.warn('⚠️ Blockchain recording failed, but payment was successful');
            console.warn('Error:', blockchainResult.error);

            return res.status(200).json({
                success: true,
                message: 'Payment successful, but blockchain recording failed',
                paymentId: razorpayPaymentId,
                blockchainError: blockchainResult.error,
                fallback: blockchainResult.fallback
            });
        }

    } catch (error) {
        console.error('❌ Payment processing error:', error);
        return res.status(500).json({
            success: false,
            error: 'Payment processing failed',
            details: error.message
        });
    }
};

// Get blockchain transaction details
const getBlockchainTransaction = async (req, res) => {
    try {
        const { transactionHash } = req.params;
        
        console.log('🔍 Fetching blockchain transaction:', transactionHash);
        const result = await blockchainService.verifyTransaction(transactionHash);
        
        if (result.success) {
            return res.status(200).json({
                success: true,
                transaction: result.transaction,
                verified: true
            });
        } else {
            return res.status(404).json({
                success: false,
                error: 'Transaction not found or verification failed'
            });
        }
    } catch (error) {
        console.error('❌ Transaction verification error:', error);
        return res.status(500).json({
            success: false,
            error: 'Transaction verification failed',
            details: error.message
        });
    }
};

// Get blockchain stats
const getBlockchainStats = async (req, res) => {
    try {
        console.log('📊 Fetching blockchain statistics...');
        const stats = await blockchainService.getBlockchainStats();
        
        return res.status(200).json({
            success: true,
            stats: stats
        });
    } catch (error) {
        console.error('❌ Blockchain stats error:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch blockchain stats',
            details: error.message
        });
    }
};

module.exports = {
    processPayment,
    getBlockchainTransaction,
    getBlockchainStats
};
