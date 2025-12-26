import apiClient from './api';

// Review Moderation API Service
const reviewService = {
  // Get all reviews with pagination
  getAllReviews: async (params = {}) => {
    try {
      const response = await apiClient.get('/api/v1/reviews', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get review statistics
  getReviewStats: async () => {
    try {
      const response = await apiClient.get('/api/v1/reviews/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single review by ID
  getReviewById: async (id) => {
    try {
      const response = await apiClient.get(`/api/v1/reviews/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete review (Admin only)
  deleteReview: async (id) => {
    try {
      const response = await apiClient.delete(`/api/v1/reviews/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default reviewService;
