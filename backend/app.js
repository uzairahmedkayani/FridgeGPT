import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import recipeRoutes from './routes/recipeRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', recipeRoutes);

export default app;
