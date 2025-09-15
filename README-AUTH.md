# Authentication System Documentation

## Overview
Complete authentication system for Jharkhand Tourism website with login, signup, logout, and profile management.

## Features Implemented

### 🔐 Authentication Flow
- **User Registration**: Name, email, password, phone validation
- **User Login**: Email/password authentication with JWT tokens
- **User Logout**: Secure logout with token cleanup
- **Profile Management**: View and edit user profile information
- **Protected Routes**: Authentication middleware for secure endpoints

### 🎯 Frontend Components

#### 1. Authentication Page (`/app/auth/page.tsx`)
- Toggle between login and signup modes
- Form validation (email format, password length, phone number)
- Real-time error handling and feedback
- Integration with authentication hook
- Responsive design with maroon/navy/gold theme

#### 2. Authentication Hook (`/hooks/use-auth.ts`)
- Global authentication state management
- Persistent login state across page reloads
- Token and user data storage in localStorage
- Centralized login/logout functions
- User profile updates

#### 3. Enhanced Navigation (`/components/navigation.tsx`)
- Dynamic UI based on authentication state
- User dropdown menu when logged in
- Profile access and logout functionality
- Mobile-responsive authentication menu

#### 4. Profile Page (`/app/profile/page.tsx`)
- View user profile information
- Edit name and phone number
- Account status and member since date
- Protected route (requires authentication)

### 🛡️ Backend Security

#### Authentication Controller (`/backend/controllers/authController.js`)
- Password hashing with bcrypt
- JWT token generation (7-day expiry)
- User registration with duplicate email check
- Login with password verification
- Profile management endpoints
- Account status validation

#### Security Middleware
- Rate limiting (500 requests/15 minutes)
- CORS protection for localhost origins
- Helmet security headers
- Input validation and sanitization
- Protected route authentication

### 📡 API Endpoints

```
POST /api/auth/register    - User registration
POST /api/auth/login       - User authentication
POST /api/auth/logout      - User logout
GET  /api/auth/profile     - Get user profile
PUT  /api/auth/profile     - Update user profile
PUT  /api/auth/change-password - Change password
```

### 🔧 Usage Instructions

#### Starting the System
1. **Backend Server**:
   ```bash
   cd backend
   npm install
   npm start
   ```
   Server runs on http://localhost:5000

2. **Frontend Application**:
   ```bash
   npm install
   npm run dev
   ```
   Application runs on http://localhost:3000

#### Testing Authentication
1. Navigate to `/auth` page
2. Register a new account or login with existing credentials
3. Upon successful authentication, user is redirected to `/destinations`
4. Navigation shows user menu with profile access and logout
5. Visit `/profile` to view and edit profile information

#### Authentication Flow
1. User submits login/signup form
2. Frontend validates input and sends to backend
3. Backend verifies credentials/creates user
4. JWT token generated and returned to frontend
5. Token and user data stored in localStorage
6. Navigation updates to show authenticated state
7. Protected routes accessible with valid token

### 🎨 Design Features
- Consistent maroon (#800020), navy (#1e3a8a), gold (#f4d03f) color scheme
- Glassmorphism effects with translucent backgrounds
- Smooth animations and hover effects
- Responsive design for mobile and desktop
- Form validation with real-time feedback
- Loading states and error handling

### 🔒 Security Features
- Bcrypt password hashing with salt
- JWT tokens with secure secret and expiration
- Rate limiting to prevent brute force attacks
- CORS protection for cross-origin requests
- Input validation and sanitization
- Protected routes with authentication middleware
- Secure token storage and cleanup on logout

### 📱 Mobile Responsiveness
- Mobile-friendly navigation menu
- Touch-optimized form inputs
- Responsive grid layouts
- Optimized button sizes for mobile
- Collapsible user menu for small screens

## File Structure
```
/app/auth/page.tsx          - Authentication page component
/app/profile/page.tsx       - User profile page
/hooks/use-auth.ts          - Authentication state hook
/components/navigation.tsx  - Enhanced navigation with auth
/backend/controllers/authController.js - Authentication logic
/backend/routes/auth.js     - Authentication routes
/backend/middleware/auth.js - Authentication middleware
/backend/models/User.js     - User database model
```

## Environment Variables
```
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

The authentication system is now fully functional with comprehensive security, user experience, and integration features.
