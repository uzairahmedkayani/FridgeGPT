import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { generateRecipe, saveRecipe } from "../services/api";
import { useAuth } from "../context/AuthContext";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';

export default function Main() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!ingredients.trim()) {
      setError("Please enter a few ingredients");
      return;
    }

    setLoading(true);
    setError("");
    setRecipe("");
    setMessage("");
    setIsSaved(false);

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSaveRecipe = async () => {
    try {
      const response = await saveRecipe(recipe);
      if (response.success) {
        setMessage("Recipe saved successfully!");
        setIsSaved(true);
        console.log("Recipe saved successfully");
      } else {
        setError(response.message || "Failed to save recipe");
        console.log("Failed to save recipe");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center space-y-4 w-full py-10 bg-gray-800 min-h-screen">
        {user && (
          <div className="w-full max-w-md text-center mb-4">
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-gray-300">
              Ready to create something delicious?
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <textarea
            className="w-full p-3 border text-white bg-gray-700 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Enter ingredients, separated by commas..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            onKeyDown={handleKeyDown}
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
          <div className="w-full max-w-md mt-0.5 text-red-600">
            {error}
          </div>
        )}

        {message && (
          <div className="w-full max-w-md mt-0.5 text-green-600">
            {message}
          </div>
        )}

        {recipe && (
          <div className="w-full max-w-2xl p-6 bg-gray-700 text-white rounded-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Generated Recipe</h2>
              <button
                type="button"
                className={`cursor-pointer ${isSaved ? 'text-green-400' : 'text-blue-200 hover:text-blue-500'}`}
                title={isSaved ? "Recipe saved" : "Save recipe"}
                onClick={handleSaveRecipe}
                disabled={isSaved}
              >
                {isSaved ? <TurnedInIcon /> : <TurnedInNotIcon />}
              </button>
            </div>
            <div className="whitespace-pre-wrap">{recipe}</div>
          </div>
        )}
      </div>
    </div>
  );
}
