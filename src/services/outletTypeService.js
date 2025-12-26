import apiClient from './api';

// Outlet Type Management API Service
const outletTypeService = {
  // Get all outlet types
  getAllOutletTypes: async (params = {}) => {
    try {
      const response = await apiClient.get('/api/v1/outlet-types', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get outlet type statistics
  getOutletTypeStats: async () => {
    try {
      const response = await apiClient.get('/api/v1/outlet-types/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get outlet types by category
  getOutletTypesByCategory: async (categoryId) => {
    try {
      const response = await apiClient.get(`/api/v1/outlet-types/category/${categoryId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get outlet type by ID
  getOutletTypeById: async (id) => {
    try {
      const response = await apiClient.get(`/api/v1/outlet-types/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create outlet type (Admin only)
  createOutletType: async (data) => {
    try {
      const response = await apiClient.post('/api/v1/outlet-types', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update outlet type (Admin only)
  updateOutletType: async (id, data) => {
    try {
      const response = await apiClient.put(`/api/v1/outlet-types/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete outlet type (Admin only)
  deleteOutletType: async (id) => {
    try {
      const response = await apiClient.delete(`/api/v1/outlet-types/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default outletTypeService;
