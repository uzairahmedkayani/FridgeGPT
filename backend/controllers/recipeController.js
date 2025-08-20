import { GoogleGenerativeAI } from "@google/generative-ai";
import Recipe from "../models/recipeSchema.js";
import mongoose from "mongoose";

const generateRecipe = async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || ingredients.trim() === "") {
    return res
      .status(400)
      .json({ success: false, message: "Ingredients are required." });
  }

  

  const prompt = `Act as a professional chef with expertise in all cuisines of the world and give a simple and creative recipe using only the following ingredients: ${ingredients}. Format the output with these specific rules:
  - Recipe name should be a plain text heading
  - Ingredients should be listed with bullet points (•) with a heading "Ingredients"
  - Instructions should be in a numbered list with a heading "Instructions"
  Focus on building a cohesive and delicious dish using the most suitable items from the list. Provide a clear recipe name, a complete list of used ingredients, and step-by-step cooking instructions that are easy to follow for home cooks. Only in case you notice any ingredient or ingredients that don't naturally fit into the main recipe, mention them at the end only, without disrupting the recipe flow. Briefly explain why they might be less suitable for this particular dish, and suggest a practical way they could be used separately—such as in a sauce, dip, drink, or side item that complements the main recipe. Furthermore if the user adds all items which are inedible (such as a window, it's never eaten), just reply with 'SYBAU'. If all the ingredients fit well, there's no need to mention ANYTHING EXTRA, just present the recipe.`;

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'Server is missing GEMINI_API_KEY. Please configure the API key.'
      });
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let recipeText = response.text();
    
    // Clean up any remaining asterisks that might appear around headings
    recipeText = recipeText.replace(/\*(.*?)\*/g, '$1');

    res.status(200).json({ success: true, recipe: recipeText });
  } catch (error) {
    console.error("Gemini API error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to generate recipe.",
    });
  }
};

const saveRecipe = async (req, res) => {
    try {
        const { recipe } = req.body;
        // Get user ID from auth middleware if available
        const userId = req.user?.id;

        console.log('Save recipe request:', { recipe: recipe?.substring(0, 100) + '...', userId });

        if (!recipe || recipe.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Recipe content is required"
            });
        }

        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            return res.status(500).json({
                success: false,
                message: "Database not connected. Please try again later."
            });
        }

        // Parse the recipe text to extract title, ingredients, and instructions
        const lines = recipe.split('\n').filter(line => line.trim());
        let title = '';
        let ingredients = [];
        let instructions = '';

        let currentSection = '';
        for (const line of lines) {
            const trimmedLine = line.trim();
            
            if (trimmedLine && !trimmedLine.startsWith('•') && !trimmedLine.match(/^\d+\./)) {
                // This could be a title or section header
                if (!title && !trimmedLine.toLowerCase().includes('ingredients') && !trimmedLine.toLowerCase().includes('instructions')) {
                    title = trimmedLine;
                } else if (trimmedLine.toLowerCase().includes('ingredients')) {
                    currentSection = 'ingredients';
                } else if (trimmedLine.toLowerCase().includes('instructions')) {
                    currentSection = 'instructions';
                }
            } else if (trimmedLine.startsWith('•')) {
                // This is an ingredient
                ingredients.push(trimmedLine.substring(1).trim());
            } else if (trimmedLine.match(/^\d+\./)) {
                // This is an instruction step
                if (currentSection === 'instructions') {
                    instructions += trimmedLine + '\n';
                }
            }
        }

        // If we couldn't parse properly, save the entire recipe as instructions
        if (!title) {
            title = 'Generated Recipe';
        }
        if (ingredients.length === 0) {
            ingredients = ['See recipe for ingredients'];
        }
        if (!instructions) {
            instructions = recipe;
        }

        console.log('Parsed recipe data:', { title, ingredients: ingredients.length, instructionsLength: instructions.length });

        // Create recipe object with or without createdBy field
        const recipeData = {
            title,
            ingredients,
            instructions
        };

        // Only add createdBy if user is authenticated
        if (userId) {
            recipeData.createdBy = userId;
        }

        const newRecipe = new Recipe(recipeData);

        const savedRecipe = await newRecipe.save();
        console.log('Recipe saved successfully:', savedRecipe._id);

        res.status(201).json({
            success: true,
            recipe: savedRecipe,
            message: "Recipe saved successfully"
        });
    } catch (error) {
        console.error("Save recipe error:", error.message);
        console.error("Full error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to save recipe: " + error.message
        });
    }
};

const getSavedRecipes = async (req, res) => {
    try {
        // Get user ID from auth middleware if available
        const userId = req.user?.id;
        
        let recipes;
        if (userId) {
            // If user is authenticated, get their recipes
            recipes = await Recipe.find({ createdBy: userId })
                .sort({ createdAt: -1 }); // Most recent first
        } else {
            // If no user is authenticated, get all recipes (since we're saving without user IDs)
            recipes = await Recipe.find({})
                .sort({ createdAt: -1 }); // Most recent first
        }

        console.log(`Found ${recipes.length} recipes for user: ${userId || 'anonymous'}`);

        res.status(200).json({
            success: true,
            recipes
        });
    } catch (error) {
        console.error("Get saved recipes error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch saved recipes"
        });
    }
};

export { generateRecipe, saveRecipe, getSavedRecipes };
