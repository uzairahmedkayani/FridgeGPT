# FridgeGPT

Tell me what's in your fridge, and I'll make it gourmet.

## 🚀 Current Status: Full Application with Authentication

The full-stack application is now fully functional with user authentication, recipe generation, and a complete user experience!

### ✅ What's Working:
- **Full-Stack Integration**: Frontend (React 19 + Vite) connected to Backend (Express.js)
- **User Authentication**: Complete JWT-based authentication system with login/register
- **User Management**: MongoDB integration with user profiles and secure password hashing
- **Recipe Generation**: Complete workflow from ingredient input to AI-generated recipes
- **Protected Routes**: Authentication-based route protection
- **Modern UI**: Material-UI components with TailwindCSS styling
- **Backend Server**: Express.js server running on port 5000 with CORS enabled
- **GeminiAI Integration**: Recipe generation using Gemini's GPT-2.5-Flash model
- **API Endpoints**: 
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User login
  - `POST /api/generate` - Recipe generation
- **Development Scripts**: Easy startup scripts for both Windows batch and PowerShell
- **ES Modules**: All code converted to modern ES module syntax
- **Environment Variables**: Secure API key management with `.env` file

## 📋 Development Phases

| Phase       | Features                                                                     | Status |
| ----------- | ---------------------------------------------------------------------------- | ------ |
| **Phase 1** | Input ingredients → Generate recipe text (no login, use default prompt)      | ✅ **COMPLETE** |
| **Phase 2** | User auth (JWT), save recipe history, fetch personalized recipes             | ✅ **COMPLETE** |
| **Phase 3** | Add basic dietary options (from dropdown or saved in profile)                | 🔄 Next |
| **Phase 4** | Polish UI, optimize prompt engineering, handle edge cases                    | ⏳ Pending |

## 🛠️ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB database (local or cloud)
- API key from Gemini

### Setup Instructions

1. **Clone and Install Dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

2. **Configure Environment Variables**
   ```bash
   # In backend/.env file
   GEMINI_API_KEY=your_gemini_api_key_here
   JWT_SECRET=your_jwt_secret_here
   MONGO_URI=your_mongodb_connection_string
   ```

3. **Start Development Servers**
   
   **Option A: Use the provided scripts**
   ```bash
   # Windows (double-click or run in terminal)
   start-dev.bat
   
   # Or PowerShell
   .\start-dev.ps1
   ```
   
   **Option B: Manual startup**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Usage
1. Open the application in your browser
2. Register a new account or login with existing credentials
3. Enter ingredients separated by commas (e.g., "chicken, rice, vegetables")
4. Click "Generate Recipe"
5. View your AI-generated recipe!

## 🔧 Technical Stack

### Frontend
- **React 19** - Latest React with modern features
- **Vite** - Fast build tool and dev server
- **Material-UI** - Component library for consistent UI
- **TailwindCSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Express.js** - Web framework
- **Node.js** - Runtime environment
- **MongoDB** - Database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### AI & External Services
- **Gemini AI** - Google's AI model for recipe generation
- **Google Generative AI SDK** - Official SDK for Gemini integration

## 🏗️ Project Structure

```
FridgeGPT/
├── backend/
│   ├── controllers/     # Business logic
│   ├── middleware/      # Authentication middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── app.js          # Express app configuration
│   └── server.js       # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # React context providers
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service functions
│   │   └── assets/      # Static assets
│   └── public/          # Public assets
└── start-dev.*         # Development startup scripts
```

## 🔐 Authentication Features

- **User Registration**: Secure account creation with password hashing
- **User Login**: JWT-based authentication with secure token storage
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Session Management**: Persistent login state across browser sessions
- **Password Security**: bcryptjs hashing with salt rounds

## 🍳 Recipe Generation Features

- **Smart Ingredient Processing**: Handles various ingredient formats
- **AI-Powered Recipes**: Uses Gemini 2.5 Flash for high-quality recipe generation
- **Structured Output**: Consistent formatting with clear instructions
- **Error Handling**: Graceful handling of API failures and edge cases
- **Loading States**: User-friendly loading indicators

## 🚀 Future Enhancements

- **Recipe History**: Save and retrieve previously generated recipes
- **Dietary Preferences**: Filter recipes based on dietary restrictions
- **Recipe Sharing**: Share recipes with other users
- **Ingredient Suggestions**: AI-powered ingredient recommendations
- **Recipe Ratings**: User feedback and rating system
- **Mobile Optimization**: Enhanced mobile experience
