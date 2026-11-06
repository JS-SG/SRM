const MarkService = require('../services/mark.service');
const ApiResponse = require('../utils/apiResponse');

class MarkController {
  static async getClassMarksMatrix(req, res, next) {
    try {
      const { class_id, exam_id, subject_id } = req.query;
      if (!class_id || !exam_id || !subject_id) {
        return ApiResponse.badRequest(res, 'class_id, exam_id, and subject_id are required');
      }

      const matrix = await MarkService.getClassMarksMatrix({ classId: class_id, examId: exam_id, subjectId: subject_id });
      return ApiResponse.success(res, matrix, 'Marks matrix fetched');
    } catch (error) {
      next(error);
    }
  }

  static async saveMarks(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const result = await MarkService.saveMarks(req.body, req.user.id, ipAddress);
      return ApiResponse.success(res, result, 'Marks saved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getStudentMarksheet(req, res, next) {
    try {
      const marksheet = await MarkService.getStudentMarksheet(req.params.enrollment_id);
      return ApiResponse.success(res, marksheet, 'Student marksheet fetched');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MarkController;
