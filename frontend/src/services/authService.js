import api from './api';

export const authService = {
  login: (identifier, password) => api.post('/auth/login', { identifier, password }),
  getProfile: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};
