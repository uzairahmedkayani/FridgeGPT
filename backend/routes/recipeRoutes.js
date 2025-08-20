import express from 'express';
import { generateRecipe, saveRecipe, getSavedRecipes } from '../controllers/recipeController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Logging middleware
router.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, {
        body: req.body,
        headers: req.headers
    });
    next();
});

// Test endpoint
router.get('/test', (req, res) => {
    res.json({ success: true, message: 'Recipe API is working!' });
});

router.post('/generate', generateRecipe);
router.post('/save', saveRecipe);
router.get('/saved', getSavedRecipes);

export default router;
