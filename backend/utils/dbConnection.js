const mongoose = require('mongoose');

// Test database connection
const testConnection = async () => {
  try {
    console.log('🔌 Testing MongoDB connection...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔗 Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    
    // Test basic operations
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`📁 Collections: ${collections.length}`);
    
    return {
      success: true,
      host: conn.connection.host,
      database: conn.connection.name,
      collections: collections.length
    };
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

// Run connection test if called directly
if (require.main === module) {
  require('dotenv').config();
  testConnection().then(() => {
    process.exit(0);
  }).catch(() => {
    process.exit(1);
  });
}

module.exports = { testConnection };
