const AuthService = require('../services/auth.service');
const ApiResponse = require('../utils/apiResponse');

class AuthController {
  static async login(req, res, next) {
    try {
      const { identifier, password } = req.body;
      if (!identifier || !password) {
        return ApiResponse.badRequest(res, 'Username/Email and Password are required');
      }

      const ipAddress = req.ip || req.connection.remoteAddress;
      const result = await AuthService.login({ identifier, password, ipAddress });
      return ApiResponse.success(res, result, 'Login successful');
    } catch (error) {
      if (error.message.includes('Invalid') || error.message.includes('deactivated')) {
        return ApiResponse.unauthorized(res, error.message);
      }
      next(error);
    }
  }

  static async me(req, res, next) {
    try {
      const user = await AuthService.getCurrentUser(req.user.id);
      return ApiResponse.success(res, user, 'Profile retrieved');
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res) {
    return ApiResponse.success(res, {}, 'Logged out successfully');
  }
}

module.exports = AuthController;
