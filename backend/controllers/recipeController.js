import { GoogleGenerativeAI } from '@google/generative-ai';

const generateRecipe = async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || ingredients.trim() === '') {
    return res.status(400).json({ success: false, message: 'Ingredients are required.' });
  }

  const prompt = `Generate a creative, simple recipe using only the following ingredients: ${ingredients}. Provide the recipe name, ingredients list, and step-by-step instructions.`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const recipeText = response.text();

    res.status(200).json({ success: true, recipe: recipeText });
  } catch (error) {
    console.error('Gemini API error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to generate recipe.',
    });
  }
};

export { generateRecipe };
