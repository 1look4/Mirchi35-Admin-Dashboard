import apiClient from './api';

// Business Management API Service
const businessService = {
  // Get all businesses with pagination
  getAllBusinesses: async (params = {}) => {
    try {
      const response = await apiClient.get('/api/v1/businesses', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get business statistics
  getBusinessStats: async () => {
    try {
      const response = await apiClient.get('/api/v1/businesses/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete business (Admin only)
  deleteBusiness: async (id) => {
    try {
      const response = await apiClient.delete(`/api/v1/businesses/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default businessService;
