const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');
const config = require('../config/env');
const { comparePassword } = require('../utils/password');
const AuditService = require('./audit.service');

class AuthService {
  /**
   * Authenticate user with username/email and password
   */
  static async login({ identifier, password, ipAddress }) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
      include: {
        role: true,
        staff_profile: true,
        user_permissions: {
          include: { permission: true },
        },
      },
    });

    if (!user) {
      throw new Error('Invalid username/email or password');
    }

    if (!user.is_active) {
      throw new Error('Your account has been deactivated. Please contact the administrator.');
    }

    const isValidPassword = await comparePassword(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error('Invalid username/email or password');
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { last_login: new Date() },
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role.name,
      },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN }
    );

    // Audit log
    await AuditService.log({
      userId: user.id,
      action: 'USER_LOGIN',
      entityType: 'User',
      entityId: user.id,
      newData: { email: user.email, role: user.role.name },
      ipAddress,
    });

    const permissions = user.user_permissions.map((up) => up.permission.name);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role.name,
        staff: user.staff_profile,
        permissions,
        last_login: user.last_login,
      },
    };
  }

  /**
   * Get current authenticated user profile
   */
  static async getCurrentUser(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: true,
        staff_profile: {
          include: {
            class_assignments: {
              include: {
                class: {
                  include: { standard: true, division: true, academic_year: true },
                },
                subject: true,
              },
            },
            teaching_subjects: {
              include: { subject: true },
            },
          },
        },
        user_permissions: {
          include: { permission: true },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const permissions = user.user_permissions.map((up) => up.permission.name);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role.name,
      staff: user.staff_profile,
      permissions,
      last_login: user.last_login,
      created_at: user.created_at,
    };
  }
}

module.exports = AuthService;
