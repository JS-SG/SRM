const prisma = require('../config/prisma');
const { hashPassword } = require('../utils/password');
const AuditService = require('./audit.service');
const roles = require('../constants/roles');

class StaffService {
  /**
   * Get all staff with filtering and pagination
   */
  static async getAllStaff({ page = 1, limit = 20, department, isActive, search }) {
    const skip = (page - 1) * limit;
    const where = {};

    if (department) where.department = department;
    if (isActive !== undefined) where.is_active = isActive === 'true' || isActive === true;
    if (search) {
      where.OR = [
        { first_name: { contains: search } },
        { last_name: { contains: search } },
        { employee_code: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    const [total, staff] = await Promise.all([
      prisma.staff.count({ where }),
      prisma.staff.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { first_name: 'asc' },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              is_active: true,
              role: true,
              user_permissions: {
                include: { permission: true },
              },
            },
          },
          teaching_subjects: {
            include: { subject: true },
          },
          class_assignments: {
            include: {
              class: {
                include: { standard: true, division: true, academic_year: true },
              },
              subject: true,
            },
          },
          classes_as_class_teacher: {
            include: { standard: true, division: true, academic_year: true },
          },
        },
      }),
    ]);

    return {
      staff,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get single staff member by ID
   */
  static async getStaffById(staffId) {
    const staff = await prisma.staff.findUnique({
      where: { id: parseInt(staffId) },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            is_active: true,
            role: true,
            user_permissions: {
              include: { permission: true },
            },
          },
        },
        teaching_subjects: {
          include: { subject: true },
        },
        class_assignments: {
          include: {
            class: {
              include: { standard: true, division: true, academic_year: true },
            },
            subject: true,
          },
        },
        classes_as_class_teacher: {
          include: { standard: true, division: true, academic_year: true },
        },
      },
    });

    if (!staff) {
      throw new Error('Staff member not found');
    }

    return staff;
  }

  /**
   * Create staff member and linked user account
   */
  static async createStaff(data, adminUserId, ipAddress) {
    const {
      username,
      email,
      password,
      employee_code,
      first_name,
      last_name,
      gender,
      date_of_birth,
      phone,
      address,
      joining_date,
      designation,
      department,
      degree,
      qualification,
      subject_ids,
    } = data;

    // Get TEACHER role
    const teacherRole = await prisma.role.findUnique({
      where: { name: roles.TEACHER },
    });

    if (!teacherRole) {
      throw new Error('Teacher role not configured in database');
    }

    const hashedPassword = await hashPassword(password || 'Teacher@123');

    // Create User and Staff in transaction
    const newStaff = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          username,
          email,
          password_hash: hashedPassword,
          role_id: teacherRole.id,
        },
      });

      const staff = await tx.staff.create({
        data: {
          user_id: user.id,
          employee_code,
          first_name,
          last_name,
          gender,
          date_of_birth: date_of_birth ? new Date(date_of_birth) : null,
          phone,
          email,
          address,
          joining_date: new Date(joining_date || Date.now()),
          designation: designation || 'Teacher',
          department,
          degree,
          qualification
        },
      });

      // Assign subject qualifications
      if (subject_ids && subject_ids.length > 0) {
        await tx.staffSubject.createMany({
          data: subject_ids.map((subId) => ({
            staff_id: staff.id,
            subject_id: parseInt(subId),
          })),
        });
      }

      // Default initial teacher permissions (STUDENT_VIEW, MARKS_VIEW)
      const defaultPerms = await tx.permission.findMany({
        where: {
          name: { in: ['STUDENT_VIEW', 'MARKS_VIEW', 'MARKS_CREATE', 'MARKS_UPDATE'] },
        },
      });

      if (defaultPerms.length > 0) {
        await tx.userPermission.createMany({
          data: defaultPerms.map((p) => ({
            user_id: user.id,
            permission_id: p.id,
            granted_by: adminUserId,
          })),
        });
      }

      return staff;
    });

    await AuditService.log({
      userId: adminUserId,
      action: 'CREATE_STAFF',
      entityType: 'Staff',
      entityId: newStaff.id,
      newData: { employee_code, first_name, last_name, email },
      ipAddress,
    });

    return this.getStaffById(newStaff.id);
  }

  /**
   * Update staff member details
   */
  static async updateStaff(staffId, data, adminUserId, ipAddress) {
    const id = parseInt(staffId);
    const existing = await prisma.staff.findUnique({
      where: { id },
      include: { teaching_subjects: true },
    });

    if (!existing) {
      throw new Error('Staff member not found');
    }

    const {
      first_name,
      last_name,
      gender,
      date_of_birth,
      phone,
      email,
      address,
      joining_date,
      designation,
      department,
      is_active,
      subject_ids,
    } = data;

    const updated = await prisma.$transaction(async (tx) => {
      const staffRecord = await tx.staff.update({
        where: { id },
        data: {
          first_name,
          last_name,
          gender,
          date_of_birth: date_of_birth ? new Date(date_of_birth) : undefined,
          phone,
          email,
          address,
          joining_date: joining_date ? new Date(joining_date) : undefined,
          designation,
          department,
          is_active: is_active !== undefined ? is_active : undefined,
        },
      });

      // Update linked user active state
      if (is_active !== undefined) {
        await tx.user.update({
          where: { id: staffRecord.user_id },
          data: { is_active },
        });
      }

      // Update subject qualifications if provided
      if (subject_ids !== undefined) {
        await tx.staffSubject.deleteMany({ where: { staff_id: id } });
        if (subject_ids.length > 0) {
          await tx.staffSubject.createMany({
            data: subject_ids.map((subId) => ({
              staff_id: id,
              subject_id: parseInt(subId),
            })),
          });
        }
      }

      return staffRecord;
    });

    await AuditService.log({
      userId: adminUserId,
      action: 'UPDATE_STAFF',
      entityType: 'Staff',
      entityId: id,
      oldData: existing,
      newData: updated,
      ipAddress,
    });

    return this.getStaffById(id);
  }

  /**
   * Delete or deactivate staff
   */
  static async deleteStaff(staffId, adminUserId, ipAddress) {
    const id = parseInt(staffId);
    const staff = await prisma.staff.findUnique({ where: { id } });
    if (!staff) {
      throw new Error('Staff member not found');
    }

    // Soft-deactivate staff and linked user account
    await prisma.$transaction([
      prisma.staff.update({ where: { id }, data: { is_active: false } }),
      prisma.user.update({ where: { id: staff.user_id }, data: { is_active: false } }),
    ]);

    await AuditService.log({
      userId: adminUserId,
      action: 'DEACTIVATE_STAFF',
      entityType: 'Staff',
      entityId: id,
      oldData: { is_active: true },
      newData: { is_active: false },
      ipAddress,
    });

    return { message: 'Staff member deactivated successfully' };
  }
}

module.exports = StaffService;
