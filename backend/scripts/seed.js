#!/usr/bin/env node

require('dotenv').config();
const { connectDB } = require('../config/database');
const { runAllSeeders } = require('../utils/dataSeeder');

const runSeeder = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await connectDB();
    
    console.log('🌱 Running data seeders...');
    const result = await runAllSeeders();
    
    console.log('✅ Seeding completed successfully!');
    console.log(`📊 Results: ${result.places} places, ${result.images} images`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  runSeeder();
}

module.exports = runSeeder;
