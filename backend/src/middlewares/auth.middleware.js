const jwt = require('jsonwebtoken');
const config = require('../config/env');
const prisma = require('../config/prisma');
const ApiResponse = require('../utils/apiResponse');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiResponse.unauthorized(res, 'Authentication token missing or invalid');
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, config.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return ApiResponse.unauthorized(res, 'Token has expired. Please log in again.');
      }
      return ApiResponse.unauthorized(res, 'Invalid authentication token');
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        role: true,
        staff_profile: true,
        user_permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    if (!user) {
      return ApiResponse.unauthorized(res, 'User account no longer exists');
    }

    if (!user.is_active) {
      return ApiResponse.forbidden(res, 'User account is deactivated. Please contact administrator.');
    }

    const permissions = user.user_permissions.map((up) => up.permission.name);

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role.name,
      role_id: user.role_id,
      staff_id: user.staff_profile ? user.staff_profile.id : null,
      staff_profile: user.staff_profile,
      permissions,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
};
