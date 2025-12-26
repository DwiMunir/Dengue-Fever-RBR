import axios from 'axios';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('dengue_expert_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('dengue_expert_token');
      localStorage.removeItem('dengue_expert_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authApi = {
  // Login
  login: async (credentials) => {
    // Uncomment when backend is ready:
    const response = await apiClient.post('/login', credentials);
    return response.data;
  },

  // Register
  register: async (userData) => {
    const response = await apiClient.post('/register', userData);
    return response.data;
  },

  // Logout
  logout: async () => {
    // Uncomment when backend is ready:
    const response = await apiClient.post('/logout', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('dengue_expert_token')}`,
      },
    });
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    // Mock implementation
    const user = localStorage.getItem('dengue_expert_user');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: user ? JSON.parse(user) : null });
      }, 500);
    });
    
    // Uncomment when backend is ready:
    // const response = await apiClient.get('/auth/profile');
    // return response.data;
  },
};

export default apiClient;
