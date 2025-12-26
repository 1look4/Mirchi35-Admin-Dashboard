import apiClient from './api';

// Dashboard Statistics API Service
const dashboardService = {
  // Get overall dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await apiClient.get('/api/v1/admin/dashboard/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default dashboardService;
