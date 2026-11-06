const ReportService = require('../services/report.service');
const ApiResponse = require('../utils/apiResponse');

class ReportController {
  static async getClassExamReport(req, res, next) {
    try {
      const { class_id, exam_id } = req.query;
      if (!class_id || !exam_id) {
        return ApiResponse.badRequest(res, 'class_id and exam_id are required');
      }

      const report = await ReportService.getClassExamReport(class_id, exam_id);
      return ApiResponse.success(res, report, 'Class exam report fetched');
    } catch (error) {
      next(error);
    }
  }

  static async getFeeSummaryReport(req, res, next) {
    try {
      const report = await ReportService.getFeeSummaryReport(req.query);
      return ApiResponse.success(res, report, 'Fee summary report fetched');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReportController;
