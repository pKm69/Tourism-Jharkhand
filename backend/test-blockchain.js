const blockchainService = require('./services/blockchainService');

async function testBlockchain() {
    console.log('🧪 Testing Blockchain Connection...\n');
    
    // Test 1: Connection
    const connection = await blockchainService.testConnection();
    console.log('Connection Result:', connection);
    
    if (connection.success) {
        console.log('\n🧪 Testing Encryption/Decryption...');
        
        // Test 2: Encryption
        const testData = {
            name: 'Rahul Kumar',
            email: 'rahul@example.com',
            mobile: '9876543210'
        };
        
        const encrypted = blockchainService.encryptData(testData);
        console.log('✅ Encrypted Data:', encrypted.substring(0, 50) + '...');
        
        const decrypted = blockchainService.decryptData(encrypted);
        console.log('✅ Decrypted Data:', decrypted);
        
        // Test 3: Transaction Hash Generation
        const hash = blockchainService.generateTransactionHash(testData);
        console.log('✅ Generated Hash:', hash);
        
        // Test 4: Mock Payment Recording
        console.log('\n🧪 Testing Payment Recording...');
        const mockPayment = {
            transactionId: 'TEST_TXN_' + Date.now(),
            customerName: 'Rahul Kumar',
            customerEmail: 'rahul@example.com',
            customerMobile: '9876543210',
            productId: 1,
            productName: 'Traditional Sohrai Art Painting',
            productPrice: 2500,
            quantity: 2,
            razorpayPaymentId: 'pay_test_123456',
            amount: 5000,
            currency: 'INR',
            userAgent: 'Test Browser',
            ipAddress: '127.0.0.1'
        };
        
        const result = await blockchainService.recordPayment(mockPayment);
        console.log('Payment Recording Result:', result);
        
        if (result.success) {
            console.log('\n🎉 ALL TESTS PASSED! Blockchain is ready!');
        }
    }
}

// Run the test
testBlockchain().catch(console.error);
