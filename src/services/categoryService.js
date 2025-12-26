import apiClient from './api';

// Category Management API Service
const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    try {
      const response = await apiClient.get('/api/v1/categories');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new category (Admin only)
  createCategory: async (categoryData) => {
    try {
      const response = await apiClient.post('/api/v1/categories', categoryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update category (Admin only)
  updateCategory: async (id, categoryData) => {
    try {
      const response = await apiClient.put(`/api/v1/categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete category (Admin only)
  deleteCategory: async (id) => {
    try {
      const response = await apiClient.delete(`/api/v1/categories/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // SubCategory Management
  // Get all subcategories
  getAllSubCategories: async () => {
    try {
      const response = await apiClient.get('/api/v1/subcategories');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get subcategories by category ID
  getSubCategoriesByCategory: async (categoryId) => {
    try {
      const response = await apiClient.get(`/api/v1/subcategories/category/${categoryId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new subcategory (Admin only)
  createSubCategory: async (subCategoryData) => {
    try {
      const response = await apiClient.post('/api/v1/subcategories', subCategoryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update subcategory (Admin only)
  updateSubCategory: async (id, subCategoryData) => {
    try {
      const response = await apiClient.put(`/api/v1/subcategories/${id}`, subCategoryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete subcategory (Admin only)
  deleteSubCategory: async (id) => {
    try {
      const response = await apiClient.delete(`/api/v1/subcategories/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default categoryService;
