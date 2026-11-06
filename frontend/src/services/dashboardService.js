import api from './api';

export const dashboardService = {
  getMetrics: () => api.get('/dashboard/metrics'),
};

export default dashboardService;
