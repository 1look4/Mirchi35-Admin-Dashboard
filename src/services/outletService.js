import apiClient from './api';

// Outlet Management API Service
const outletService = {
  // Get all outlets with pagination
  getAllOutlets: async (params = {}) => {
    try {
      const response = await apiClient.get('/api/v1/admin/outlets', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get outlet statistics
  getOutletStats: async () => {
    try {
      const response = await apiClient.get('/api/v1/admin/outlets/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get outlet by ID
  getOutletById: async (id) => {
    try {
      const response = await apiClient.get(`/api/v1/admin/outlets/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update outlet (Admin only)
  updateOutlet: async (id, data) => {
    try {
      const response = await apiClient.put(`/api/v1/admin/outlets/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete outlet (Admin only)
  deleteOutlet: async (id) => {
    try {
      const response = await apiClient.delete(`/api/v1/admin/outlets/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default outletService;
