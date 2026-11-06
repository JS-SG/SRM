import api from './api';

export const studentService = {
  getAll: (params) => api.get('/students', { params }),
  getById: (id) => api.get(`/students/${id}`),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  addParent: (id, data) => api.post(`/students/${id}/parents`, data),
  enroll: (id, data) => api.post(`/students/${id}/enroll`, data),
  toggleStatus: (id, status) => api.patch(`/students/${id}/status`, { status }),
};
