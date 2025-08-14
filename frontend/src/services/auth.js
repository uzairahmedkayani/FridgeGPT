import apiClient from './api-client';

export const login = async (credentials) => {
    try {
        const { data } = await apiClient.post('/auth/login', credentials);
        
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        return data;
    } catch (error) {
        throw error.response?.data?.message || 'Login failed';
    }
};

export const register = async (userData) => {
    try {
        const { data } = await apiClient.post('/auth/register', userData);

        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        return data;
    } catch (error) {
        throw error.response?.data?.message || 'Registration failed';
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};