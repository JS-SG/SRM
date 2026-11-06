import api from './api';

export const reportService = {
  getClassExamReport: (classId, examId) =>
    api.get('/reports/class-exam', { params: { class_id: classId, exam_id: examId } }),
  getFeeSummary: (params) => api.get('/reports/fee-summary', { params }),
};

export default reportService;
