import apiClient from './authApi';
import { getTests, getTestById, saveTest as saveTestLocal, deleteTest as deleteTestLocal } from '@/utils/localStorage';

// Test API functions
export const testApi = {
  // Get all tests
  getAllTests: async () => {
    // Uncomment when backend is ready:
    const response = await apiClient.get('/medical-records', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('dengue_expert_token')}`,
      }
    });
    return response.data;
  },

  // Get single test by ID
  getTest: async (testId) => {
    // Uncomment when backend is ready:
    const response = await apiClient.get(`/medical-records/${testId}`);
    return response.data;
  },

  // Create new test
  createTest: async (testData) => {
    // Mock implementation - replace with actual API call
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     const newTest = saveTestLocal(testData);
    //     resolve({ data: newTest });
    //   }, 800);
    // });
    
    // Uncomment when backend is ready:
    const response = await apiClient.post('/medical-records', testData);
    return response.data;
  },

  // Delete test
  deleteTest: async (testId) => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const test = getTestById(testId);
        if (test) {
          deleteTestLocal(testId);
          resolve({ data: { message: 'Test deleted successfully' } });
        } else {
          reject(new Error('Test not found'));
        }
      }, 500);
    });
    
    // Uncomment when backend is ready:
    // const response = await apiClient.delete(`/tests/${testId}`);
    // return response.data;
  },

  // Get test statistics
  getTestStatistics: async () => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const tests = getTests();
        
        // Calculate statistics
        const totalTests = tests.length;
        const averageConfidence = tests.length > 0
          ? (tests.reduce((acc, test) => acc + (test.confidence || 0), 0) / tests.length)
          : 0;
        
        // Severity distribution
        const severityDistribution = tests.reduce((acc, test) => {
          const severity = test.ruleResult?.severity || 'unknown';
          acc[severity] = (acc[severity] || 0) + 1;
          return acc;
        }, {});
        
        // Tests by month (last 6 months)
        const now = new Date();
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        const testsByMonth = tests
          .filter(test => new Date(test.timestamp) >= sixMonthsAgo)
          .reduce((acc, test) => {
            const date = new Date(test.timestamp);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            acc[monthKey] = (acc[monthKey] || 0) + 1;
            return acc;
          }, {});
        
        const statistics = {
          totalTests,
          averageConfidence: averageConfidence.toFixed(2),
          severityDistribution,
          testsByMonth,
        };
        
        resolve({ data: statistics });
      }, 500);
    });
    
    // Uncomment when backend is ready:
    // const response = await apiClient.get('/tests/statistics');
    // return response.data;
  },
};

export default testApi;
