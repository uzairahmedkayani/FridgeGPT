import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getSavedRecipes } from '../services/api';
import { useAuth } from '../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const fetchSavedRecipes = async () => {
    try {
      setLoading(true);
      console.log('Fetching saved recipes...');
      const response = await getSavedRecipes();
      console.log('Saved recipes response:', response);
      if (response.success) {
        console.log('Setting recipes:', response.recipes);
        setRecipes(response.recipes);
      } else {
        console.error('Failed to fetch recipes:', response.message);
        setError(response.message || "Failed to fetch recipes");
      }
    } catch (err) {
      console.error('Error fetching saved recipes:', err);
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
          <div className="text-white text-xl">Loading your saved recipes...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-800 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Your Saved Recipes
            </h1>
            <p className="text-gray-300">
              All your delicious creations in one place
            </p>
          </div>

          {error && (
            <div className="max-w-md mx-auto mb-6 text-red-600 text-center">
              {error}
            </div>
          )}

          {recipes.length === 0 ? (
            <div className="text-center">
              <div className="text-gray-400 text-xl mb-4">
                No saved recipes yet
              </div>
              <p className="text-gray-500">
                Generate and save some recipes to see them here!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <div key={recipe._id} className="bg-gray-700 rounded-lg p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-blue-300">
                      {recipe.title}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {formatDate(recipe.createdAt)}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-green-300 mb-2">Ingredients:</h4>
                    <ul className="text-sm space-y-1">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-300 mb-2">Instructions:</h4>
                    <div className="text-sm whitespace-pre-wrap text-gray-200">
                      {recipe.instructions}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
