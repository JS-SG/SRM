const ExamService = require('../services/exam.service');
const ApiResponse = require('../utils/apiResponse');

class ExamController {
  static async getExams(req, res, next) {
    try {
      const exams = await ExamService.getExams(req.query.academic_year_id);
      return ApiResponse.success(res, exams, 'Exams fetched');
    } catch (error) {
      next(error);
    }
  }

  static async getExamById(req, res, next) {
    try {
      const exam = await ExamService.getExamById(req.params.id);
      return ApiResponse.success(res, exam, 'Exam fetched');
    } catch (error) {
      next(error);
    }
  }

  static async createExam(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const exam = await ExamService.createExam(req.body, req.user.id, ipAddress);
      return ApiResponse.created(res, exam, 'Exam created');
    } catch (error) {
      next(error);
    }
  }

  static async updateExam(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const exam = await ExamService.updateExam(req.params.id, req.body, req.user.id, ipAddress);
      return ApiResponse.success(res, exam, 'Exam updated');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ExamController;
