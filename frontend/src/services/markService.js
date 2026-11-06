import api from './api';

export const markService = {
  getMatrix: (classId, examId, subjectId) =>
    api.get('/marks/matrix', { params: { class_id: classId, exam_id: examId, subject_id: subjectId } }),
  saveMarks: (data) => api.post('/marks', data),
  getStudentMarksheet: (enrollmentId) => api.get(`/marks/student/${enrollmentId}`),
};
