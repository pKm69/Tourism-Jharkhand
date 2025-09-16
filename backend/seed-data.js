require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

// Sample Jharkhand tourism data
const touristPlaces = [
  {
    id: "ranchi-1",
    name: "Rock Garden",
    location: "Ranchi",
    district: "Ranchi",
    category: "Garden",
    description: "A beautiful rock garden with sculptures and landscaping, perfect for family visits.",
    coordinates: { lat: 23.3441, lng: 85.3096 },
    image: "/betla-national-park-wildlife-tigers-jharkhand.jpg",
    rating: 4.2,
    visitingHours: "6:00 AM - 6:00 PM",
    entryFee: "₹10"
  },
  {
    id: "ranchi-2", 
    name: "Hundru Falls",
    location: "Ranchi",
    district: "Ranchi",
    category: "Waterfall",
    description: "One of the highest waterfalls in Jharkhand, cascading from 320 feet height.",
    coordinates: { lat: 23.2599, lng: 85.5954 },
    image: "/betla-national-park-wildlife-tigers-jharkhand.jpg",
    rating: 4.5,
    visitingHours: "8:00 AM - 5:00 PM",
    entryFee: "₹20"
  },
  {
    id: "ranchi-3",
    name: "Jagannath Temple",
    location: "Ranchi",
    district: "Ranchi", 
    category: "Temple",
    description: "Famous temple dedicated to Lord Jagannath, replica of Puri temple.",
    coordinates: { lat: 23.3569, lng: 85.3350 },
    image: "/betla-national-park-wildlife-tigers-jharkhand.jpg",
    rating: 4.3,
    visitingHours: "5:00 AM - 9:00 PM",
    entryFee: "Free"
  },
  {
    id: "jamshedpur-1",
    name: "Jubilee Park",
    location: "Jamshedpur",
    district: "East Singhbhum",
    category: "Park",
    description: "Large urban park with rose garden, zoo and recreational facilities.",
    coordinates: { lat: 22.8046, lng: 86.2029 },
    image: "/betla-national-park-wildlife-tigers-jharkhand.jpg",
    rating: 4.1,
    visitingHours: "6:00 AM - 8:00 PM",
    entryFee: "₹5"
  },
  {
    id: "jamshedpur-2",
    name: "Tata Steel Zoological Park",
    location: "Jamshedpur", 
    district: "East Singhbhum",
    category: "Zoo",
    description: "Well-maintained zoo with diverse wildlife and safari experience.",
    coordinates: { lat: 22.7996, lng: 86.1844 },
    image: "/betla-national-park-wildlife-tigers-jharkhand.jpg",
    rating: 4.0,
    visitingHours: "9:00 AM - 5:00 PM",
    entryFee: "₹30"
  },
  {
    id: "deoghar-1",
    name: "Baidyanath Temple",
    location: "Deoghar",
    district: "Deoghar",
    category: "Temple",
    description: "One of the 12 Jyotirlingas, major pilgrimage site for Lord Shiva devotees.",
    coordinates: { lat: 24.4839, lng: 86.6972 },
    image: "/betla-national-park-wildlife-tigers-jharkhand.jpg",
    rating: 4.7,
    visitingHours: "4:00 AM - 10:00 PM",
    entryFee: "Free"
  },
  {
    id: "hazaribagh-1",
    name: "Hazaribagh National Park",
    location: "Hazaribagh",
    district: "Hazaribagh",
    category: "National Park",
    description: "Wildlife sanctuary known for tigers, leopards and diverse flora.",
    coordinates: { lat: 23.9820, lng: 85.3647 },
    image: "/betla-national-park-wildlife-tigers-jharkhand.jpg",
    rating: 4.4,
    visitingHours: "6:00 AM - 6:00 PM",
    entryFee: "₹100"
  },
  {
    id: "palamau-1",
    name: "Betla National Park",
    location: "Palamau",
    district: "Palamau", 
    category: "National Park",
    description: "Famous for Royal Bengal Tigers and elephant safari experiences.",
    coordinates: { lat: 23.8103, lng: 84.1790 },
    image: "/betla-national-park-wildlife-tigers-jharkhand.jpg",
    rating: 4.6,
    visitingHours: "6:00 AM - 6:00 PM",
    entryFee: "₹150"
  },
  {
    id: "dhanbad-1",
    name: "Maithon Dam",
    location: "Dhanbad",
    district: "Dhanbad",
    category: "Dam",
    description: "Beautiful dam with boating facilities and scenic surroundings.",
    coordinates: { lat: 23.8103, lng: 86.8136 },
    image: "/betla-national-park-wildlife-tigers-jharkhand.jpg",
    rating: 4.2,
    visitingHours: "8:00 AM - 6:00 PM",
    entryFee: "₹25"
  },
  {
    id: "bokaro-1",
    name: "Parasnath Hill",
    location: "Bokaro",
    district: "Bokaro",
    category: "Hill",
    description: "Highest peak in Jharkhand, sacred Jain pilgrimage site.",
    coordinates: { lat: 23.9629, lng: 86.1722 },
    image: "/betla-national-park-wildlife-tigers-jharkhand.jpg",
    rating: 4.5,
    visitingHours: "5:00 AM - 7:00 PM",
    entryFee: "₹50"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await mongoose.connection.db.collection('places').deleteMany({});
    console.log('Cleared existing places data');
    
    // Insert new data
    const result = await mongoose.connection.db.collection('places').insertMany(touristPlaces);
    console.log(`Inserted ${result.insertedCount} tourist places`);
    
    // Verify insertion
    const count = await mongoose.connection.db.collection('places').countDocuments();
    console.log(`Total places in database: ${count}`);
    
    // Show sample data
    const sample = await mongoose.connection.db.collection('places').findOne();
    console.log('\nSample place data:');
    console.log(JSON.stringify(sample, null, 2));
    
    mongoose.disconnect();
    console.log('\nDatabase seeding completed successfully!');
    
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
