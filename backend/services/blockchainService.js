const { Web3 } = require('web3');
const crypto = require('crypto-js');

class BlockchainService {
    constructor() {
        // Connect to your Ganache blockchain
        this.web3 = new Web3('http://localhost:8545');
        this.account = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'; // First Ganache account
        this.privateKey = '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d';
        
        // Encryption key for sensitive data
        this.encryptionKey = 'JharkhandTourism2024SecretKey';
    }

    // Test blockchain connection
    async testConnection() {
        try {
            const blockNumber = await this.web3.eth.getBlockNumber();
            const balance = await this.web3.eth.getBalance(this.account);
            
            console.log('🔗 Blockchain Connected!');
            console.log('📦 Current Block:', blockNumber.toString());
            console.log('💰 Account Balance:', this.web3.utils.fromWei(balance, 'ether'), 'ETH');
            
            return { success: true, blockNumber, balance };
        } catch (error) {
            console.error('❌ Blockchain connection failed:', error.message);
            return { success: false, error: error.message };
        }
    }

    // Encrypt sensitive user data
    encryptData(data) {
        try {
            const encrypted = crypto.AES.encrypt(JSON.stringify(data), this.encryptionKey).toString();
            return encrypted;
        } catch (error) {
            console.error('❌ Encryption failed:', error);
            return null;
        }
    }

    // Decrypt user data (for verification)
    decryptData(encryptedData) {
        try {
            const bytes = crypto.AES.decrypt(encryptedData, this.encryptionKey);
            const decrypted = bytes.toString(crypto.enc.Utf8);
            return JSON.parse(decrypted);
        } catch (error) {
            console.error('❌ Decryption failed:', error);
            return null;
        }
    }

    // Generate unique transaction hash
    generateTransactionHash(data) {
        const timestamp = Date.now();
        const dataString = JSON.stringify(data) + timestamp;
        return crypto.SHA256(dataString).toString();
    }

    // Record payment data on blockchain
    async recordPayment(paymentData) {
        try {
            console.log('🔄 Recording payment on blockchain...');

            // Encrypt sensitive user data
            const encryptedUserData = this.encryptData({
                name: paymentData.customerName,
                email: paymentData.customerEmail,
                mobile: paymentData.customerMobile
            });

            // Create blockchain transaction data
            const blockchainData = {
                transactionId: paymentData.transactionId,
                timestamp: paymentData.metadata?.timestamp || new Date().toISOString(),
                encryptedCustomer: encryptedUserData,
                product: {
                    id: paymentData.product?.id,
                    name: paymentData.product?.name,
                    price: paymentData.product?.price,
                    quantity: paymentData.product?.quantity
                },
                payment: {
                    razorpayId: paymentData.payment?.razorpayId,
                    amount: paymentData.payment?.amount,
                    currency: paymentData.payment?.currency || 'INR'
                },
                metadata: {
                    platform: paymentData.metadata?.platform || 'Jharkhand Tourism Marketplace',
                    userAgent: paymentData.metadata?.userAgent || 'Unknown',
                    ipAddress: paymentData.metadata?.ipAddress || 'localhost'
                }
            };

            // Generate unique hash for this transaction
            const transactionHash = this.generateTransactionHash(blockchainData);
            blockchainData.blockchainHash = transactionHash;

            // Convert data to hex for blockchain storage
            const dataHex = this.web3.utils.toHex(JSON.stringify(blockchainData));

            // Create blockchain transaction
            const transaction = {
                from: this.account,
                to: this.account, // Self-transaction for data storage
                value: '0', // No ETH transfer, just data storage
                data: dataHex,
                gas: 2000000,
                gasPrice: '20000000000' // 20 Gwei
            };

            // Sign and send transaction
            const signedTx = await this.web3.eth.accounts.signTransaction(transaction, this.privateKey);
            const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);

            console.log('✅ Payment recorded on blockchain!');
            console.log('🔗 Transaction Hash:', receipt.transactionHash);
            console.log('📦 Block Number:', receipt.blockNumber);

            return {
                success: true,
                blockchainHash: transactionHash,
                transactionHash: receipt.transactionHash,
                blockNumber: receipt.blockNumber,
                data: blockchainData
            };

        } catch (error) {
            console.error('❌ Blockchain recording failed:', error);
            return {
                success: false,
                error: error.message,
                fallback: 'Payment completed but blockchain recording failed'
            };
        }
    }

    // Verify a transaction on blockchain
    async verifyTransaction(transactionHash) {
        try {
            const transaction = await this.web3.eth.getTransaction(transactionHash);
            if (!transaction) {
                return { success: false, error: 'Transaction not found' };
            }

            // Decode the data
            const dataHex = transaction.input;
            const dataString = this.web3.utils.hexToUtf8(dataHex);
            const data = JSON.parse(dataString);

            return {
                success: true,
                verified: true,
                data: data,
                blockNumber: transaction.blockNumber
            };
        } catch (error) {
            console.error('❌ Transaction verification failed:', error);
            return { success: false, error: error.message };
        }
    }

    // Get blockchain statistics
    async getStats() {
        try {
            const blockNumber = await this.web3.eth.getBlockNumber();
            const balance = await this.web3.eth.getBalance(this.account);
            
            return {
                currentBlock: blockNumber.toString(),
                accountBalance: this.web3.utils.fromWei(balance, 'ether') + ' ETH',
                networkId: await this.web3.eth.net.getId(),
                isConnected: await this.web3.eth.net.isListening()
            };
        } catch (error) {
            return { error: error.message };
        }
    }
}

module.exports = new BlockchainService();
