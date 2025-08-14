import apiClient from './api-client';

export const generateRecipe = async (ingredients) => {
    try {
        const { data } = await apiClient.post('/recipe/generate', { ingredients });
        return data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to generate recipe';
    }
};

export const saveRecipe = async (recipe) => {
    try {
        const { data } = await apiClient.post('/recipe/save', recipe);
        return data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to save recipe';
    }
};