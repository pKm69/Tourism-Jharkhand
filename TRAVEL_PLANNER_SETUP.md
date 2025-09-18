# 🧳 AI Travel Planner Setup Guide

## Overview
The AI Travel Planner has been successfully integrated into your Tourism Jharkhand website, replacing the Python Flask implementation with a Node.js equivalent that seamlessly integrates with your existing architecture.

## 🚀 Quick Start

### 1. Get Groq API Key
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key (starts with `gsk_...`)

### 2. Configure Environment Variables
1. Navigate to your backend folder:
   ```bash
   cd backend
   ```

2. Update your `.env` file with the Groq API key:
   ```env
   # Add this line to your existing .env file
   GROQ_API_KEY=gsk_your_actual_groq_api_key_here
   ```

### 3. Install Dependencies (if needed)
```bash
cd backend
npm install
```

### 4. Start the Services

#### Option A: Full System Restart
```bash
# 1. Start MongoDB (if not running)
# MongoDB should already be running from your existing setup

# 2. Start Backend Server
cd backend
npm start

# 3. Start Frontend (in new terminal)
cd ..
npm run dev
```

#### Option B: If servers are already running
Just restart the backend server to load the new travel planner routes:
```bash
cd backend
# Stop current server (Ctrl+C) then restart
npm start
```

## 🧪 Testing the Integration

### Test Backend API
```bash
cd backend
node test-travel-planner.js
```

This will test:
- ✅ Health check endpoint
- ✅ Popular destinations endpoint  
- ✅ AI itinerary generation (with API key)
- ✅ Fallback system (without API key)
- ✅ Rate limiting functionality

### Test Frontend Integration
1. Open your browser to `http://localhost:3000`
2. Navigate to **AI Features** page
3. Click on **AI-Powered Itinerary Planning** 
4. Click **"Try This Feature"** button
5. You should be redirected to `/travel-planner`
6. Fill out the form and test itinerary generation

## 📋 Features Overview

### Backend Features
- **Groq API Integration**: Uses Llama 3.1-70b-versatile for intelligent responses
- **Jharkhand Tourism Focus**: Specialized prompts for local attractions
- **Smart Fallback System**: Works even without API key
- **Rate Limiting**: 10 requests per 15 minutes per IP
- **Error Handling**: Comprehensive error management

### Frontend Features
- **Jharkhand Theme**: Maroon (#800020), navy (#1e3a8a), gold (#f4d03f) colors
- **Glassmorphism Design**: Modern UI matching your website
- **Real-time Preview**: See trip details as you configure
- **Loading States**: Professional UX with loading indicators
- **Error Handling**: User-friendly error messages

### API Endpoints
- `POST /api/travel-planner/generate` - Generate AI itinerary
- `GET /api/travel-planner/destinations` - Get popular destinations  
- `GET /api/travel-planner/health` - Service health check

## 🎯 Usage Instructions

### For Users
1. Visit the **AI Features** page
2. Click on **AI-Powered Itinerary Planning**
3. Click **"Try This Feature"**
4. Fill out the travel preferences form:
   - **Destination**: Choose from Jharkhand cities
   - **Duration**: 2 days to 2 weeks
   - **Interests**: Select multiple categories
   - **Budget**: Budget/Medium/Luxury ranges
   - **Group Size**: Solo to large groups
5. Click **"Generate AI Itinerary"**
6. View your personalized itinerary
7. Download or share the results

### Sample Form Data
```json
{
  "destination": "Ranchi",
  "duration": "3 days", 
  "interests": ["Culture", "Nature", "Waterfalls"],
  "budget": "Medium",
  "groupSize": "2-4 people",
  "accommodation": "Hotels"
}
```

## 🔧 Troubleshooting

### Common Issues

#### 1. "Network error" message
- **Cause**: Backend server not running
- **Solution**: Start backend server with `npm start`

#### 2. "AI service temporarily unavailable"
- **Cause**: Invalid or missing GROQ_API_KEY
- **Solution**: Check your `.env` file and API key

#### 3. "Too many AI requests" 
- **Cause**: Rate limiting activated
- **Solution**: Wait 15 minutes or test with different IP

#### 4. Blank itinerary response
- **Cause**: API timeout or invalid request
- **Solution**: Check backend logs and try again

### Debug Commands
```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Test travel planner health
curl http://localhost:5000/api/travel-planner/health

# Check backend logs
cd backend && npm start
```

## 🌟 Advanced Configuration

### Customizing AI Prompts
Edit `backend/controllers/travelPlannerController.js` to modify the AI prompt for different tourism focuses.

### Adjusting Rate Limits
Modify the rate limiting in `backend/routes/travelPlanner.js`:
```javascript
const aiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Adjust this number
});
```

### Adding New Destinations
Update the destinations array in `backend/controllers/travelPlannerController.js`.

## 📊 Integration Status

✅ **Backend API**: Fully integrated with existing Express server  
✅ **Frontend Page**: `/travel-planner` route created  
✅ **AI Features Link**: Updated to point to travel planner  
✅ **Styling**: Matches website theme perfectly  
✅ **Error Handling**: Comprehensive fallback system  
✅ **Rate Limiting**: Production-ready security  
✅ **Documentation**: API endpoints documented  

## 🎉 Success Indicators

When everything is working correctly, you should see:

1. **Backend Console**:
   ```
   🚀 Jharkhand Tourism API Server running on port 5000
   ✈️ Travel Planner API: http://localhost:5000/api/travel-planner/health
   ```

2. **Frontend**: Travel planner page loads with Jharkhand theme

3. **API Test**: `node test-travel-planner.js` passes all tests

4. **User Flow**: AI Features → Try This Feature → Travel Planner works

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review backend console logs for detailed errors
3. Test API endpoints individually using the test script
4. Verify all environment variables are set correctly

The travel planner is now fully integrated and ready for production use! 🚀
