const prisma = require('../config/prisma');
const AuditService = require('./audit.service');

class UserService {
  /**
   * Get all users with roles and permissions
   */
  static async getAllUsers({ page = 1, limit = 20, roleId, isActive, search }) {
    const skip = (page - 1) * limit;
    const where = {};

    if (roleId) where.role_id = parseInt(roleId);
    if (isActive !== undefined) where.is_active = isActive === 'true' || isActive === true;
    if (search) {
      where.OR = [
        { username: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { created_at: 'desc' },
        include: {
          role: true,
          staff_profile: true,
          user_permissions: {
            include: { permission: true },
          },
        },
      }),
    ]);

    const formattedUsers = users.map((u) => ({
      id: u.id,
      username: u.username,
      email: u.email,
      role: u.role.name,
      role_id: u.role_id,
      is_active: u.is_active,
      staff: u.staff_profile,
      permissions: u.user_permissions.map((up) => ({
        id: up.permission.id,
        name: up.permission.name,
        module: up.permission.module,
        description: up.permission.description,
      })),
      last_login: u.last_login,
      created_at: u.created_at,
    }));

    return {
      users: formattedUsers,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get all available permissions grouped by module
   */
  static async getAllPermissions() {
    const permissions = await prisma.permission.findMany({
      orderBy: [{ module: 'asc' }, { name: 'asc' }],
    });

    const grouped = {};
    permissions.forEach((p) => {
      if (!grouped[p.module]) {
        grouped[p.module] = [];
      }
      grouped[p.module].push(p);
    });

    return { permissions, grouped };
  }

  /**
   * Get user permissions
   */
  static async getUserPermissions(userId) {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: {
        user_permissions: {
          include: { permission: true },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.user_permissions.map((up) => up.permission);
  }

  /**
   * Update granular permissions for a user
   */
  static async updateUserPermissions(userId, permissionIds, adminUserId, ipAddress) {
    const targetUserId = parseInt(userId);
    const user = await prisma.user.findUnique({
      where: { id: targetUserId },
      include: {
        user_permissions: { include: { permission: true } },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const oldPerms = user.user_permissions.map((p) => p.permission.name);

    // Delete existing permissions for this user
    await prisma.userPermission.deleteMany({
      where: { user_id: targetUserId },
    });

    // Insert newly assigned permissions
    if (permissionIds && permissionIds.length > 0) {
      const data = permissionIds.map((pId) => ({
        user_id: targetUserId,
        permission_id: parseInt(pId),
        granted_by: adminUserId,
      }));

      await prisma.userPermission.createMany({
        data,
      });
    }

    // Retrieve updated permissions
    const updatedUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      include: {
        user_permissions: { include: { permission: true } },
      },
    });

    const newPerms = updatedUser.user_permissions.map((p) => p.permission.name);

    // Audit log
    await AuditService.log({
      userId: adminUserId,
      action: 'UPDATE_PERMISSIONS',
      entityType: 'UserPermission',
      entityId: targetUserId,
      oldData: { permissions: oldPerms },
      newData: { permissions: newPerms },
      ipAddress,
    });

    return updatedUser.user_permissions.map((up) => up.permission);
  }

  /**
   * Toggle user active status
   */
  static async toggleUserStatus(userId, isActive, adminUserId, ipAddress) {
    const targetUserId = parseInt(userId);
    const user = await prisma.user.findUnique({ where: { id: targetUserId } });

    if (!user) {
      throw new Error('User not found');
    }

    const updated = await prisma.user.update({
      where: { id: targetUserId },
      data: { is_active: isActive },
    });

    await AuditService.log({
      userId: adminUserId,
      action: isActive ? 'ACTIVATE_USER' : 'DEACTIVATE_USER',
      entityType: 'User',
      entityId: targetUserId,
      oldData: { is_active: user.is_active },
      newData: { is_active: updated.is_active },
      ipAddress,
    });

    return updated;
  }
}

module.exports = UserService;
