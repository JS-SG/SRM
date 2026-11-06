import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('srm_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error normalization and auth expiry
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      errors: error.response?.data?.errors || null,
      status: error.response?.status,
    };

    if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
      localStorage.removeItem('srm_token');
      localStorage.removeItem('srm_user');
      window.location.href = '/login?expired=true';
    }

    return Promise.reject(customError);
  }
);

export default api;
