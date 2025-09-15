const fetch = require('node-fetch');

// Test authentication endpoints
async function testAuthEndpoints() {
  const baseURL = 'http://localhost:5000/api/auth';
  
  console.log('🔍 Testing Authentication System...\n');

  // Test 1: Health check
  try {
    console.log('1. Testing server health...');
    const healthResponse = await fetch('http://localhost:5000/api/health');
    const healthData = await healthResponse.json();
    console.log('✅ Server is running:', healthData.message);
  } catch (error) {
    console.log('❌ Server not running. Please start backend server first.');
    console.log('   Run: cd backend && npm start');
    return;
  }

  // Test 2: User Registration
  console.log('\n2. Testing user registration...');
  const testUser = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'testpass123',
    phone: '9876543210'
  };

  try {
    const registerResponse = await fetch(`${baseURL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    const registerData = await registerResponse.json();
    
    if (registerData.success) {
      console.log('✅ Registration successful');
      console.log('   User:', registerData.data.user.name);
      console.log('   Token received:', registerData.data.token ? 'Yes' : 'No');
      
      // Test 3: User Login
      console.log('\n3. Testing user login...');
      const loginResponse = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password
        })
      });
      const loginData = await loginResponse.json();
      
      if (loginData.success) {
        console.log('✅ Login successful');
        console.log('   User:', loginData.data.user.name);
        console.log('   Token received:', loginData.data.token ? 'Yes' : 'No');
        
        // Test 4: Protected Route (Profile)
        console.log('\n4. Testing protected route...');
        const profileResponse = await fetch(`${baseURL}/profile`, {
          headers: { 'Authorization': `Bearer ${loginData.data.token}` }
        });
        const profileData = await profileResponse.json();
        
        if (profileData.success) {
          console.log('✅ Profile access successful');
          console.log('   Profile data received for:', profileData.data.user.name);
        } else {
          console.log('❌ Profile access failed:', profileData.message);
        }
        
        // Test 5: Logout
        console.log('\n5. Testing logout...');
        const logoutResponse = await fetch(`${baseURL}/logout`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${loginData.data.token}` }
        });
        const logoutData = await logoutResponse.json();
        
        if (logoutData.success) {
          console.log('✅ Logout successful');
        } else {
          console.log('❌ Logout failed:', logoutData.message);
        }
        
      } else {
        console.log('❌ Login failed:', loginData.message);
      }
      
    } else {
      console.log('❌ Registration failed:', registerData.message);
    }
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }

  console.log('\n🎯 Authentication System Test Complete!');
}

// Run tests
testAuthEndpoints();
