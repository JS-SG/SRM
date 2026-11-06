const ApiResponse = require('../utils/apiResponse');
const roles = require('../constants/roles');

/**
 * Check if the user has a specific granular permission.
 * ADMIN role automatically passes all permission checks.
 * @param {string|string[]} requiredPermissions
 */
const checkPermission = (requiredPermissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.unauthorized(res, 'Authentication required');
    }

    // Admin has superuser access to all resources
    if (req.user.role === roles.ADMIN) {
      return next();
    }

    const perms = Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions];
    const hasPermission = perms.some((p) => req.user.permissions.includes(p));

    if (!hasPermission) {
      return ApiResponse.forbidden(
        res,
        `You do not have the required permission: ${perms.join(' or ')}`
      );
    }

    next();
  };
};

/**
 * Require explicit ADMIN role.
 */
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return ApiResponse.unauthorized(res, 'Authentication required');
  }

  if (req.user.role !== roles.ADMIN) {
    return ApiResponse.forbidden(res, 'Administrator access required');
  }

  next();
};

module.exports = {
  checkPermission,
  requireAdmin,
};
