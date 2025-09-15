// MongoDB initialization script for Docker
db = db.getSiblingDB('jharkhand_tourism');

// Create collections
db.createCollection('places');
db.createCollection('placesdatas');
db.createCollection('uploads.files');
db.createCollection('uploads.chunks');

// Create indexes for better performance
db.places.createIndex({ "district": 1 });
db.places.createIndex({ "lat": 1, "lon": 1 });
db.places.createIndex({ "name": "text", "district": "text" });

// Create a default user (optional)
db.createUser({
  user: "tourism_user",
  pwd: "tourism_pass",
  roles: [
    {
      role: "readWrite",
      db: "jharkhand_tourism"
    }
  ]
});

print('Database initialized successfully!');
