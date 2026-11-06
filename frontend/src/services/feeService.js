import api from './api';

export const feeService = {
  getTypes: () => api.get('/fees/types'),
  createType: (data) => api.post('/fees/types', data),
  getStudentFees: (params) => api.get('/fees/student-fees', { params }),
  assignFee: (data) => api.post('/fees/assign', data),
  recordPayment: (data) => api.post('/fees/payments', data),
};
