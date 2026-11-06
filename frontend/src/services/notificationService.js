import api from './api';

export const notificationService = {
  sendSingle: (data) => api.post('/notifications/send', data),
  sendBulk: (data) => api.post('/notifications/send-bulk', data),
  getHistory: (params) => api.get('/notifications/history', { params }),
};
