import { GoogleGenerativeAI } from "@google/generative-ai";

const generateRecipe = async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || ingredients.trim() === "") {
    return res
      .status(400)
      .json({ success: false, message: "Ingredients are required." });
  }

  const prompt = `Generate a simple and creative recipe using only the following ingredients: ${ingredients}. Focus on building a cohesive and delicious dish using the most suitable items from the list. Provide a clear recipe name, a complete list of used ingredients, and step-by-step cooking instructions that are easy to follow for home cooks. Only in case you notice any ingredient or ingredients that don't naturally fit into the main recipe, mention them at the end only, without disrupting the recipe flow. Briefly explain why they might be less suitable for this particular dish, and suggest a practical way they could be used separately—such as in a sauce, dip, drink, or side item that complements the main recipe. If all the ingredients fit well, there's no need to mention ANYTHING EXTRA, just present the recipe.`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const recipeText = response.text();

    res.status(200).json({ success: true, recipe: recipeText });
  } catch (error) {
    console.error("Gemini API error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to generate recipe.",
    });
  }
};

export { generateRecipe };
