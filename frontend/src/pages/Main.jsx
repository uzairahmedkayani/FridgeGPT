import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { generateRecipe } from "../services/api";

export default function Main() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!ingredients.trim()) {
      setError("Please enter some ingredients");
      return;
    }

    setLoading(true);
    setError("");
    setRecipe("");

    try {
      const response = await generateRecipe(ingredients);
      if (response.success) {
        setRecipe(response.recipe);
      } else {
        setError(response.message || "Failed to generate recipe");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center space-y-4 w-full py-10 bg-gray-800 min-h-screen">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <textarea
            className="w-full p-3 border text-white bg-gray-700 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Enter ingredients, separated by commas..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            disabled={loading}
          />
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Recipe"}
          </button>
        </form>

        {error && (
          <div className="w-full max-w-md p-3 bg-red-600 text-white rounded-md">
            {error}
          </div>
        )}

        {recipe && (
          <div className="w-full max-w-2xl p-6 bg-gray-700 text-white rounded-md">
            <h2 className="text-xl font-bold mb-4">Generated Recipe</h2>
            <div className="whitespace-pre-wrap">{recipe}</div>
          </div>
        )}
      </div>
    </div>
  );
}
