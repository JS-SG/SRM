const UserService = require('../services/user.service');
const ApiResponse = require('../utils/apiResponse');

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const result = await UserService.getAllUsers(req.query);
      return ApiResponse.success(res, result.users, 'Users fetched', 200, result.pagination);
    } catch (error) {
      next(error);
    }
  }

  static async getAllPermissions(req, res, next) {
    try {
      const result = await UserService.getAllPermissions();
      return ApiResponse.success(res, result, 'Permissions fetched');
    } catch (error) {
      next(error);
    }
  }

  static async getUserPermissions(req, res, next) {
    try {
      const permissions = await UserService.getUserPermissions(req.params.id);
      return ApiResponse.success(res, permissions, 'User permissions fetched');
    } catch (error) {
      next(error);
    }
  }

  static async updateUserPermissions(req, res, next) {
    try {
      const { permission_ids } = req.body;
      const ipAddress = req.ip || req.connection.remoteAddress;
      const updated = await UserService.updateUserPermissions(
        req.params.id,
        permission_ids,
        req.user.id,
        ipAddress
      );
      return ApiResponse.success(res, updated, 'User permissions updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async toggleStatus(req, res, next) {
    try {
      const { is_active } = req.body;
      const ipAddress = req.ip || req.connection.remoteAddress;
      const updated = await UserService.toggleUserStatus(
        req.params.id,
        is_active,
        req.user.id,
        ipAddress
      );
      return ApiResponse.success(res, updated, 'User status updated successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
