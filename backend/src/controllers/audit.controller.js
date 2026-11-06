const AuditService = require('../services/audit.service');
const ApiResponse = require('../utils/apiResponse');

class AuditController {
  static async getLogs(req, res, next) {
    try {
      const result = await AuditService.getLogs(req.query);
      return ApiResponse.success(res, result.logs, 'Audit logs fetched', 200, result.pagination);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuditController;
