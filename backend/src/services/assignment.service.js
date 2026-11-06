const prisma = require('../config/prisma');
const AuditService = require('./audit.service');

class AssignmentService {
  /**
   * Get assignments by class
   */
  static async getAssignmentsByClass(classId) {
    return prisma.classStaff.findMany({
      where: { class_id: parseInt(classId) },
      include: {
        staff: true,
        subject: true,
        class: {
          include: { standard: true, division: true },
        },
      },
    });
  }

  /**
   * Get assignments for a specific staff member
   */
  static async getAssignmentsByStaff(staffId) {
    return prisma.classStaff.findMany({
      where: { staff_id: parseInt(staffId) },
      include: {
        class: {
          include: {
            standard: true,
            division: true,
            academic_year: true,
            _count: { select: { enrollments: true } },
          },
        },
        subject: true,
      },
    });
  }

  /**
   * Assign a teacher to a class and subject
   */
  static async assignTeacher(data, adminUserId, ipAddress) {
    const { class_id, staff_id, subject_id, role, assigned_from, assigned_to } = data;

    const classRecord = await prisma.class.findUnique({
      where: { id: parseInt(class_id) },
    });
    if (!classRecord) throw new Error('Class not found');

    const staff = await prisma.staff.findUnique({
      where: { id: parseInt(staff_id) },
    });
    if (!staff) throw new Error('Staff member not found');

    // Create assignment
    const assignment = await prisma.classStaff.create({
      data: {
        class_id: parseInt(class_id),
        staff_id: parseInt(staff_id),
        subject_id: subject_id ? parseInt(subject_id) : null,
        role: role || 'SUBJECT_TEACHER',
        assigned_from: assigned_from ? new Date(assigned_from) : new Date(),
        assigned_to: assigned_to ? new Date(assigned_to) : null,
      },
      include: {
        class: { include: { standard: true, division: true } },
        staff: true,
        subject: true,
      },
    });

    // If role is CLASS_TEACHER, also update class.class_teacher_id
    if (role === 'CLASS_TEACHER') {
      await prisma.class.update({
        where: { id: parseInt(class_id) },
        data: { class_teacher_id: parseInt(staff_id) },
      });
    }

    await AuditService.log({
      userId: adminUserId,
      action: 'ASSIGN_CLASS_STAFF',
      entityType: 'ClassStaff',
      entityId: assignment.id,
      newData: assignment,
      ipAddress,
    });

    return assignment;
  }

  /**
   * Remove a teacher assignment
   */
  static async removeAssignment(assignmentId, adminUserId, ipAddress) {
    const id = parseInt(assignmentId);
    const existing = await prisma.classStaff.findUnique({ where: { id } });
    if (!existing) throw new Error('Assignment not found');

    const deleted = await prisma.classStaff.delete({ where: { id } });

    // If this was a class teacher, remove from class
    if (existing.role === 'CLASS_TEACHER') {
      await prisma.class.update({
        where: { id: existing.class_id },
        data: { class_teacher_id: null },
      });
    }

    await AuditService.log({
      userId: adminUserId,
      action: 'REMOVE_CLASS_STAFF',
      entityType: 'ClassStaff',
      entityId: id,
      oldData: existing,
      ipAddress,
    });

    return deleted;
  }
}

module.exports = AssignmentService;
