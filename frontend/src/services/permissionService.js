import api from './api';

export const permissionService = {
  getUsers: (params) => api.get('/users', { params }),
  getAllPermissions: () => api.get('/users/permissions/all'),
  getUserPermissions: (userId) => api.get(`/users/${userId}/permissions`),
  updateUserPermissions: (userId, permissionIds) =>
    api.put(`/users/${userId}/permissions`, { permission_ids: permissionIds }),
  toggleUserStatus: (userId, isActive) => api.patch(`/users/${userId}/status`, { is_active: isActive }),
};
