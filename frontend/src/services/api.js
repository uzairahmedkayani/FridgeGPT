import apiClient from './api-client';

export const generateRecipe = async (ingredients) => {
    try {
        console.log('Generating recipe with ingredients:', ingredients);
        const { data } = await apiClient.post('/recipe/generate', { ingredients });
        console.log('Recipe generation response:', data);
        return data;
    } catch (error) {
        console.error('Recipe generation error:', error);
        console.error('Error response:', error.response);
        throw error.response?.data?.message || 'Failed to generate recipe';
    }
};

export const saveRecipe = async (recipe) => {
    try {
        console.log('Saving recipe:', recipe.substring(0, 100) + '...');
        const { data } = await apiClient.post('/recipe/save', { recipe });
        console.log('Save recipe response:', data);
        return data;
    } catch (error) {
        console.error('Save recipe error:', error);
        console.error('Error response:', error.response);
        console.error('Error status:', error.response?.status);
        console.error('Error data:', error.response?.data);
        throw error.response?.data?.message || 'Failed to save recipe';
    }
};

export const getSavedRecipes = async () => {
    try {
        console.log('Fetching saved recipes');
        const { data } = await apiClient.get('/recipe/saved');
        console.log('Get saved recipes response:', data);
        return data;
    } catch (error) {
        console.error('Get saved recipes error:', error);
        console.error('Error response:', error.response);
        throw error.response?.data?.message || 'Failed to fetch saved recipes';
    }
};