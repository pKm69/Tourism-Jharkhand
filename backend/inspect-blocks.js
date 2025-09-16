const { Web3 } = require('web3');

// Connect to Ganache
const web3 = new Web3('http://127.0.0.1:8545');

async function inspectBlocks() {
    try {
        console.log('🔍 Blockchain Block Inspector\n');
        
        // Get latest block number
        const latestBlock = await web3.eth.getBlockNumber();
        console.log(`📊 Latest Block Number: ${latestBlock}\n`);
        
        // Inspect each block
        for (let i = 0; i <= latestBlock; i++) {
            console.log(`\n📦 ===== BLOCK ${i} =====`);
            
            const block = await web3.eth.getBlock(i, true); // true = include transactions
            
            console.log(`🕒 Timestamp: ${new Date(Number(block.timestamp) * 1000).toLocaleString()}`);
            console.log(`🔗 Hash: ${block.hash}`);
            console.log(`👤 Miner: ${block.miner}`);
            console.log(`⛽ Gas Used: ${block.gasUsed}`);
            console.log(`📝 Transactions: ${block.transactions.length}`);
            
            // Inspect each transaction in the block
            if (block.transactions.length > 0) {
                console.log('\n💳 TRANSACTIONS:');
                
                for (let j = 0; j < block.transactions.length; j++) {
                    const tx = block.transactions[j];
                    console.log(`\n  Transaction ${j + 1}:`);
                    console.log(`  🔗 Hash: ${tx.hash}`);
                    console.log(`  👤 From: ${tx.from}`);
                    console.log(`  👤 To: ${tx.to}`);
                    console.log(`  💰 Value: ${web3.utils.fromWei(tx.value, 'ether')} ETH`);
                    console.log(`  ⛽ Gas: ${tx.gas}`);
                    
                    // Decode transaction data (our payment data)
                    if (tx.input && tx.input !== '0x') {
                        try {
                            const decodedData = web3.utils.hexToUtf8(tx.input);
                            const paymentData = JSON.parse(decodedData);
                            
                            console.log(`  📄 PAYMENT DATA:`);
                            console.log(`    🆔 Transaction ID: ${paymentData.transactionId}`);
                            console.log(`    🛍️ Product: ${paymentData.product?.name || 'N/A'}`);
                            console.log(`    💰 Amount: ₹${paymentData.payment?.amount || 'N/A'}`);
                            console.log(`    📦 Quantity: ${paymentData.product?.quantity || 'N/A'}`);
                            console.log(`    🔐 Customer: ${paymentData.encryptedCustomer ? '[ENCRYPTED]' : 'N/A'}`);
                            console.log(`    🕒 Timestamp: ${paymentData.timestamp || paymentData.metadata?.timestamp || 'N/A'}`);
                            console.log(`    📋 Full Data:`, JSON.stringify(paymentData, null, 2));
                        } catch (error) {
                            console.log(`  📄 Raw Data: ${tx.input.substring(0, 100)}...`);
                        }
                    }
                }
            } else {
                console.log('  (No transactions in this block)');
            }
            
            console.log('\n' + '='.repeat(50));
        }
        
    } catch (error) {
        console.error('❌ Error inspecting blocks:', error.message);
    }
}

// Run the inspector
inspectBlocks();
