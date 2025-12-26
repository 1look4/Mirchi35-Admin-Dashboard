import apiClient from './api';

// User Management API Service
const userService = {
  // Get all users with pagination
  getAllUsers: async (params = {}) => {
    try {
      const response = await apiClient.get('/api/v1/users', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user statistics
  getUserStats: async () => {
    try {
      const response = await apiClient.get('/api/v1/users/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single user by ID
  getUserById: async (id) => {
    try {
      const response = await apiClient.get(`/api/v1/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const response = await apiClient.put(`/api/v1/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const response = await apiClient.delete(`/api/v1/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
