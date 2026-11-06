const prisma = require('../config/prisma');
const logger = require('../utils/logger');

class AuditService {
  /**
   * Record an audit log entry
   */
  static async log({
    userId = null,
    action,
    entityType,
    entityId = null,
    oldData = null,
    newData = null,
    ipAddress = null,
  }) {
    try {
      return await prisma.auditLog.create({
        data: {
          user_id: userId,
          action,
          entity_type: entityType,
          entity_id: entityId ? parseInt(entityId) : null,
          old_data: oldData ? JSON.parse(JSON.stringify(oldData)) : undefined,
          new_data: newData ? JSON.parse(JSON.stringify(newData)) : undefined,
          ip_address: ipAddress,
        },
      });
    } catch (err) {
      logger.error(`Failed to record audit log: ${err.message}`);
      return null;
    }
  }

  /**
   * Retrieve audit logs with filtering and pagination
   */
  static async getLogs({
    page = 1,
    limit = 20,
    entityType,
    entityId,
    userId,
    action,
    startDate,
    endDate,
  }) {
    const skip = (page - 1) * limit;
    const where = {};

    if (entityType) where.entity_type = entityType;
    if (entityId) where.entity_id = parseInt(entityId);
    if (userId) where.user_id = parseInt(userId);
    if (action) where.action = { contains: action };
    if (startDate || endDate) {
      where.created_at = {};
      if (startDate) where.created_at.gte = new Date(startDate);
      if (endDate) where.created_at.lte = new Date(endDate);
    }

    const [total, logs] = await Promise.all([
      prisma.auditLog.count({ where }),
      prisma.auditLog.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { created_at: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              role: { select: { name: true } },
            },
          },
        },
      }),
    ]);

    return {
      logs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

module.exports = AuditService;
