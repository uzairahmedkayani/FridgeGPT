import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import recipeRoutes from './routes/recipeRoutes.js';
import authRoutes from './routes/auth.js';

const app = express();

// Core middleware
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);
app.use(express.json());

// API routes
app.use('/api/recipe', recipeRoutes);
app.use('/api/auth', authRoutes);

export default app;
