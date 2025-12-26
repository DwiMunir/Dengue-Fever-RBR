import apiClient from './authApi';
import { getTests, getUser } from '@/utils/localStorage';

// Dashboard API functions
export const dashboardApi = {
  // Get dashboard overview
  getOverview: async () => {
    // Uncomment when backend is ready:
    const response = await apiClient.get('/dashboard/overview', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('dengue_expert_token')}`,
      },
    });
    return response.data;
  },
};

export default dashboardApi;
