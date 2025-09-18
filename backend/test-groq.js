const Groq = require('groq-sdk');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function testGroqAPI() {
  console.log('🔑 Testing Groq API Key...');
  console.log('API Key (first 20 chars):', process.env.GROQ_API_KEY?.substring(0, 20) + '...');
  
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    console.log('📡 Making test API call...');
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: 'Say hello in one word'
        }
      ],
      model: 'llama-3.1-8b-instant', // Using smaller model for test
      max_tokens: 10
    });

    console.log('✅ Success! Response:', chatCompletion.choices[0].message.content);
    console.log('🎉 Groq API key is working correctly!');
    
  } catch (error) {
    console.error('❌ Groq API Test Failed:');
    console.error('Error message:', error.message);
    console.error('Error details:', error.error || error);
    
    if (error.message.includes('401') || error.message.includes('Invalid API Key')) {
      console.log('\n🔧 Troubleshooting steps:');
      console.log('1. Check your API key at: https://console.groq.com/keys');
      console.log('2. Make sure the key is active and not expired');
      console.log('3. Copy the key exactly without extra spaces');
      console.log('4. Restart the server after updating the .env file');
    }
  }
}

testGroqAPI();
