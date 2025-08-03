# FridgeGPT

Tell me what's in your fridge, and I'll make it gourmet.

## 🚀 Current Status: Backend Working

The backend is now fully functional with Gemini AI integration!

### ✅ What's Working:
- **Backend Server**: Express.js server running on port 5000
- **Gemini AI Integration**: Recipe generation using Google's Gemini 1.5 Flash model
- **API Endpoint**: `POST /api/generate` accepts ingredients and returns recipes
- **ES Modules**: All backend code converted to modern ES module syntax
- **Environment Variables**: Secure API key management with `.env` file


## 📋 Development Phases

| Phase       | Features                                                                     | Status |
| ----------- | ---------------------------------------------------------------------------- | ------ |
| **Phase 1** | Input ingredients → Generate recipe text (no login, use default prompt)      | ✅ **COMPLETE** |
| **Phase 2** | Add placeholder image + basic dietary options (from dropdown)                | 🔄 Next |
| **Phase 3** | User auth (Firebase or JWT), save recipe history, fetch personalized recipes | ⏳ Pending |
| **Phase 4** | Add real image generation or API-based image fetching                        | ⏳ Pending |
| **Phase 5** | Polish UI, optimize prompt engineering, handle edge cases                    | ⏳ Pending |
