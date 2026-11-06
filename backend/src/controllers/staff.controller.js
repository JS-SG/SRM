const StaffService = require('../services/staff.service');
const ApiResponse = require('../utils/apiResponse');

class StaffController {
  static async getAllStaff(req, res, next) {
    try {
      const result = await StaffService.getAllStaff(req.query);
      return ApiResponse.success(res, result.staff, 'Staff members fetched', 200, result.pagination);
    } catch (error) {
      next(error);
    }
  }

  static async getStaffById(req, res, next) {
    try {
      const staff = await StaffService.getStaffById(req.params.id);
      return ApiResponse.success(res, staff, 'Staff details fetched');
    } catch (error) {
      next(error);
    }
  }

  static async createStaff(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const staff = await StaffService.createStaff(req.body, req.user.id, ipAddress);
      return ApiResponse.created(res, staff, 'Staff member created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateStaff(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const staff = await StaffService.updateStaff(req.params.id, req.body, req.user.id, ipAddress);
      return ApiResponse.success(res, staff, 'Staff member updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteStaff(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const result = await StaffService.deleteStaff(req.params.id, req.user.id, ipAddress);
      return ApiResponse.success(res, result, 'Staff member deactivated');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StaffController;
