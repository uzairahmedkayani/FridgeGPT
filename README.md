# FridgeGPT

Tell me what's in your fridge, and I'll make it gourmet.

## 🚀 Current Status: Recipe Generation Working

The full-stack application is now fully functional with frontend-backend integration and GeminiAI-powered recipe generation!

### ✅ What's Working:
- **Full-Stack Integration**: Frontend (React + Vite) connected to Backend (Express.js)
- **Recipe Generation**: Complete workflow from ingredient input to AI-generated recipes
- **Backend Server**: Express.js server running on port 5000 with CORS enabled
- **Frontend Interface**: Modern React UI with form handling, loading states, and error management
- **GeminiAI Integration**: Recipe generation using Gemini's GPT model
- **API Endpoint**: `POST /api/generate` accepts ingredients and returns recipes
- **Development Scripts**: Easy startup scripts for both Windows batch and PowerShell
- **ES Modules**: All code converted to modern ES module syntax
- **Environment Variables**: Secure API key management with `.env` file


## 📋 Development Phases

| Phase       | Features                                                                     | Status |
| ----------- | ---------------------------------------------------------------------------- | ------ |
| **Phase 1** | Input ingredients → Generate recipe text (no login, use default prompt)      | ✅ **COMPLETE** |
| **Phase 2** | Add basic dietary options (from dropdown)                                    | 🔄 Next |
| **Phase 3** | User auth (Firebase or JWT), save recipe history, fetch personalized recipes | ⏳ Pending |
| **Phase 4** | Polish UI, optimize prompt engineering, handle edge cases                    | ⏳ Pending |

## 🛠️ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
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
2. Enter ingredients separated by commas (e.g., "chicken, rice, vegetables")
3. Click "Generate Recipe"
4. View your AI-generated recipe!

## 🔧 Technical Stack

- **Frontend**: React 19, Vite, TailwindCSS
- **Backend**: Express.js, Node.js
- **AI**: Gemini AI
- **Development**: Hot reload, CORS enabled, ES modules
