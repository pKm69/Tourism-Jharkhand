#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Tourism Jharkhand Project...\n');

// Check if Node.js and npm are installed
try {
  execSync('node --version', { stdio: 'ignore' });
  execSync('npm --version', { stdio: 'ignore' });
  console.log('✅ Node.js and npm are installed');
} catch (error) {
  console.error('❌ Please install Node.js and npm first');
  process.exit(1);
}

// Check if MongoDB is running
try {
  execSync('mongosh --eval "db.runCommand({ ping: 1 })"', { stdio: 'ignore' });
  console.log('✅ MongoDB is running');
} catch (error) {
  console.error('❌ Please start MongoDB first');
  console.log('   Run: mongod or start MongoDB service');
  process.exit(1);
}

// Install backend dependencies
console.log('\n📦 Installing backend dependencies...');
try {
  process.chdir('./backend');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install backend dependencies');
  process.exit(1);
}

// Install frontend dependencies
console.log('\n📦 Installing frontend dependencies...');
try {
  process.chdir('../');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install frontend dependencies');
  process.exit(1);
}

// Create .env file if it doesn't exist
const envPath = './backend/.env';
const envExamplePath = './backend/.env.example';

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  console.log('\n📝 Creating .env file...');
  fs.copyFileSync(envExamplePath, envPath);
  console.log('✅ .env file created from .env.example');
  console.log('   Please update MongoDB connection string if needed');
}

// Seed the database
console.log('\n🌱 Seeding database with places and images...');
try {
  process.chdir('./backend');
  execSync('node utils/dataSeeder.js', { stdio: 'inherit' });
  console.log('✅ Database seeded successfully');
} catch (error) {
  console.error('❌ Failed to seed database');
  console.log('   Make sure arvrPics folder and places.js file exist');
  process.exit(1);
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Start backend: cd backend && npm start');
console.log('2. Start frontend: npm run dev');
console.log('3. Open http://localhost:3000');
console.log('\n💡 Make sure MongoDB is running before starting the servers');
