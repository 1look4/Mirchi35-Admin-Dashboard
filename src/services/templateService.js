import apiClient from './api';

// Template Management API Service
const templateService = {
  // Get all templates
  getAllTemplates: async (params = {}) => {
    try {
      const response = await apiClient.get('/api/templates', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single template by ID
  getTemplateById: async (id) => {
    try {
      const response = await apiClient.get(`/api/templates/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload new template
  uploadTemplate: async (formData) => {
    try {
      const response = await apiClient.post('/api/templates', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update template
  updateTemplate: async (id, templateData) => {
    try {
      const response = await apiClient.put(`/api/templates/${id}`, templateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete template
  deleteTemplate: async (id) => {
    try {
      const response = await apiClient.delete(`/api/templates/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get templates by category
  getTemplatesByCategory: async (categoryId, subCategoryId = null) => {
    try {
      const params = { categoryId };
      if (subCategoryId) {
        params.subCategoryId = subCategoryId;
      }
      const response = await apiClient.get('/api/templates/by-category', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Download template
  downloadTemplate: async (id) => {
    try {
      const response = await apiClient.get(`/api/templates/${id}/download`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Search templates
  searchTemplates: async (query) => {
    try {
      const response = await apiClient.get('/api/templates/search', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default templateService;
