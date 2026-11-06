import api from './api';

export const academicService = {
  // Years
  getYears: () => api.get('/academic/years'),
  createYear: (data) => api.post('/academic/years', data),
  setCurrentYear: (id) => api.patch(`/academic/years/${id}/current`),

  // Standards & Divisions
  getStandards: () => api.get('/academic/standards'),
  createStandard: (data) => api.post('/academic/standards', data),
  getDivisions: () => api.get('/academic/divisions'),
  createDivision: (data) => api.post('/academic/divisions', data),

  // Classes
  getClasses: (params) => api.get('/academic/classes', { params }),
  getClassById: (id) => api.get(`/academic/classes/${id}`),
  createClass: (data) => api.post('/academic/classes', data),
  updateClass: (id, data) => api.put(`/academic/classes/${id}`, data),
  batchCreateClasses: (data) => api.post('/academic/classes/batch', data),

  // Subjects
  getSubjects: () => api.get('/subjects'),
  getSubjectById: (id) => api.get(`/subjects/${id}`),
  createSubject: (data) => api.post('/subjects', data),
  updateSubject: (id, data) => api.put(`/subjects/${id}`, data),
  getStandardSubjects: (standardId) => api.get('/subjects/standard-mappings', { params: { standard_id: standardId } }),
  mapSubjectToStandard: (data) => api.post('/subjects/map-standard', data),
  removeSubjectFromStandard: (standardId, subjectId) => api.delete(`/subjects/map-standard/${standardId}/${subjectId}`),

  // Assignments
  getClassAssignments: (classId) => api.get(`/assignments/class/${classId}`),
  getStaffAssignments: (staffId) => api.get(`/assignments/staff/${staffId || ''}`),
  assignTeacher: (data) => api.post('/assignments', data),
  removeAssignment: (id) => api.delete(`/assignments/${id}`),

  // Exams
  getExams: (academicYearId) => api.get('/exams', { params: { academic_year_id: academicYearId } }),
  getExamById: (id) => api.get(`/exams/${id}`),
  createExam: (data) => api.post('/exams', data),
  updateExam: (id, data) => api.put(`/exams/${id}`, data),
};
