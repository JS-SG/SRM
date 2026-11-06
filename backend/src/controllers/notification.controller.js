const NotificationService = require('../services/notification/notification.service');
const ApiResponse = require('../utils/apiResponse');

class NotificationController {
  static async sendSingle(req, res, next) {
    try {
      const { student_id, type, title, message_template, extra_variables } = req.body;
      if (!student_id || !title || !message_template) {
        return ApiResponse.badRequest(res, 'student_id, title, and message_template are required');
      }

      const result = await NotificationService.sendToStudent({
        studentId: student_id,
        type: type || 'GENERAL',
        title,
        messageTemplate: message_template,
        extraVariables: extra_variables,
      });

      return ApiResponse.success(res, result, 'Notification processed');
    } catch (error) {
      next(error);
    }
  }

  static async sendBulk(req, res, next) {
    try {
      const { class_id, student_ids, type, title, message_template, extra_variables } = req.body;
      if (!title || !message_template || (!class_id && (!student_ids || student_ids.length === 0))) {
        return ApiResponse.badRequest(res, 'Target recipients (class_id or student_ids), title, and message_template are required');
      }

      const result = await NotificationService.sendBulk({
        classId: class_id,
        studentIds: student_ids,
        type: type || 'GENERAL',
        title,
        messageTemplate: message_template,
        extraVariables: extra_variables,
      });

      return ApiResponse.success(res, result, 'Bulk notifications processed');
    } catch (error) {
      next(error);
    }
  }

  static async getHistory(req, res, next) {
    try {
      const result = await NotificationService.getHistory(req.query);
      return ApiResponse.success(
        res,
        result.notifications,
        'Notification history fetched',
        200,
        result.pagination
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NotificationController;
