const DashboardService = require('../services/dashboard.service');
const ApiResponse = require('../utils/apiResponse');
const roles = require('../constants/roles');

class DashboardController {
  static async getDashboardMetrics(req, res, next) {
    try {
      if (req.user.role === roles.ADMIN) {
        const data = await DashboardService.getAdminMetrics();
        return ApiResponse.success(res, { role: roles.ADMIN, ...data }, 'Admin dashboard data fetched');
      } else {
        const data = await DashboardService.getTeacherMetrics(req.user.staff_id);
        return ApiResponse.success(res, { role: roles.TEACHER, ...data }, 'Teacher dashboard data fetched');
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DashboardController;
