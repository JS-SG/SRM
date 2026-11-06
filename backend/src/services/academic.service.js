const prisma = require('../config/prisma');
const AuditService = require('./audit.service');

class AcademicService {
  // ----------------------------------------------------
  // ACADEMIC YEARS
  // ----------------------------------------------------

  static async getAcademicYears() {
    return prisma.academicYear.findMany({
      orderBy: { start_date: 'desc' },
      include: {
        _count: {
          select: { classes: true, student_enrollments: true, exams: true },
        },
      },
    });
  }

  static async createAcademicYear(data, adminUserId, ipAddress) {
    const { name, start_date, end_date, is_current } = data;

    if (is_current) {
      await prisma.academicYear.updateMany({ data: { is_current: false } });
    }

    const created = await prisma.academicYear.create({
      data: {
        name,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        is_current: !!is_current,
      },
    });

    await AuditService.log({
      userId: adminUserId,
      action: 'CREATE_ACADEMIC_YEAR',
      entityType: 'AcademicYear',
      entityId: created.id,
      newData: created,
      ipAddress,
    });

    return created;
  }

  static async setCurrentAcademicYear(yearId, adminUserId, ipAddress) {
    const id = parseInt(yearId);
    await prisma.academicYear.updateMany({ data: { is_current: false } });
    const updated = await prisma.academicYear.update({
      where: { id },
      data: { is_current: true },
    });

    await AuditService.log({
      userId: adminUserId,
      action: 'SET_CURRENT_ACADEMIC_YEAR',
      entityType: 'AcademicYear',
      entityId: id,
      newData: { is_current: true },
      ipAddress,
    });

    return updated;
  }

  // ----------------------------------------------------
  // STANDARDS & DIVISIONS
  // ----------------------------------------------------

  static async getStandards() {
    return prisma.standard.findMany({
      orderBy: { display_order: 'asc' },
      include: {
        standard_subjects: {
          include: { subject: true },
        },
        _count: { select: { classes: true } },
      },
    });
  }

  static async createStandard(data, adminUserId, ipAddress) {
    const { name, display_order } = data;
    const created = await prisma.standard.create({
      data: {
        name,
        display_order: display_order !== undefined ? parseInt(display_order) : 0,
      },
    });

    await AuditService.log({
      userId: adminUserId,
      action: 'CREATE_STANDARD',
      entityType: 'Standard',
      entityId: created.id,
      newData: created,
      ipAddress,
    });

    return created;
  }

  static async getDivisions() {
    return prisma.division.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { classes: true } },
      },
    });
  }

  static async createDivision(data, adminUserId, ipAddress) {
    const { name } = data;
    const created = await prisma.division.create({
      data: { name: name.toUpperCase() },
    });

    await AuditService.log({
      userId: adminUserId,
      action: 'CREATE_DIVISION',
      entityType: 'Division',
      entityId: created.id,
      newData: created,
      ipAddress,
    });

    return created;
  }

  // ----------------------------------------------------
  // CLASSES
  // ----------------------------------------------------

  static async getClasses({ academicYearId, standardId, isActive }) {
    const where = {};
    if (academicYearId) where.academic_year_id = parseInt(academicYearId);
    if (standardId) where.standard_id = parseInt(standardId);
    if (isActive !== undefined) where.is_active = isActive === 'true' || isActive === true;

    return prisma.class.findMany({
      where,
      orderBy: [{ standard: { display_order: 'asc' } }, { division: { name: 'asc' } }],
      include: {
        academic_year: true,
        standard: true,
        division: true,
        class_teacher: true,
        _count: {
          select: { enrollments: true, staff_assignments: true },
        },
      },
    });
  }

  static async getClassById(classId) {
    const c = await prisma.class.findUnique({
      where: { id: parseInt(classId) },
      include: {
        academic_year: true,
        standard: {
          include: {
            standard_subjects: {
              include: { subject: true },
            },
          },
        },
        division: true,
        class_teacher: true,
        enrollments: {
          where: { status: 'ACTIVE' },
          include: {
            student: {
              include: {
                parents: { include: { parent: true } },
              },
            },
          },
          orderBy: { roll_number: 'asc' },
        },
        staff_assignments: {
          include: {
            staff: true,
            subject: true,
          },
        },
      },
    });

    if (!c) {
      throw new Error('Class not found');
    }

    return c;
  }

  static async createClass(data, adminUserId, ipAddress) {
    const { academic_year_id, standard_id, division_id, class_teacher_id, room_number } = data;

    const [standard, division] = await Promise.all([
      prisma.standard.findUnique({ where: { id: parseInt(standard_id) } }),
      prisma.division.findUnique({ where: { id: parseInt(division_id) } }),
    ]);

    if (!standard || !division) {
      throw new Error('Standard or Division does not exist');
    }

    const className = `${standard.name}-${division.name}`;

    const created = await prisma.class.create({
      data: {
        academic_year_id: parseInt(academic_year_id),
        standard_id: parseInt(standard_id),
        division_id: parseInt(division_id),
        class_name: className,
        class_teacher_id: class_teacher_id ? parseInt(class_teacher_id) : null,
        room_number,
      },
      include: {
        academic_year: true,
        standard: true,
        division: true,
        class_teacher: true,
      },
    });

    // If class teacher assigned, also add to ClassStaff assignment
    if (class_teacher_id) {
      await prisma.classStaff.create({
        data: {
          class_id: created.id,
          staff_id: parseInt(class_teacher_id),
          role: 'CLASS_TEACHER',
        },
      });
    }

    await AuditService.log({
      userId: adminUserId,
      action: 'CREATE_CLASS',
      entityType: 'Class',
      entityId: created.id,
      newData: created,
      ipAddress,
    });

    return created;
  }

  static async updateClass(classId, data, adminUserId, ipAddress) {
    const id = parseInt(classId);
    const existing = await prisma.class.findUnique({ where: { id } });
    if (!existing) {
      throw new Error('Class not found');
    }

    const { class_teacher_id, room_number, is_active } = data;

    const updated = await prisma.class.update({
      where: { id },
      data: {
        class_teacher_id: class_teacher_id !== undefined ? (class_teacher_id ? parseInt(class_teacher_id) : null) : undefined,
        room_number,
        is_active: is_active !== undefined ? is_active : undefined,
      },
      include: {
        academic_year: true,
        standard: true,
        division: true,
        class_teacher: true,
      },
    });

    // Sync class teacher in ClassStaff
    if (class_teacher_id !== undefined) {
      await prisma.classStaff.deleteMany({
        where: { class_id: id, role: 'CLASS_TEACHER' },
      });
      if (class_teacher_id) {
        await prisma.classStaff.create({
          data: {
            class_id: id,
            staff_id: parseInt(class_teacher_id),
            role: 'CLASS_TEACHER',
          },
        });
      }
    }

    await AuditService.log({
      userId: adminUserId,
      action: 'UPDATE_CLASS',
      entityType: 'Class',
      entityId: id,
      oldData: existing,
      newData: updated,
      ipAddress,
    });

    return updated;
  }

  /**
   * Batch create classes for a standard with multiple divisions in one academic year
   */
  static async batchCreateClasses(data, adminUserId, ipAddress) {
    const { academic_year_id, standard_id, division_ids } = data;
    const standard = await prisma.standard.findUnique({ where: { id: parseInt(standard_id) } });

    if (!standard) throw new Error('Standard not found');

    const createdClasses = [];
    for (const divId of division_ids) {
      const division = await prisma.division.findUnique({ where: { id: parseInt(divId) } });
      if (division) {
        const className = `${standard.name}-${division.name}`;
        try {
          const c = await prisma.class.create({
            data: {
              academic_year_id: parseInt(academic_year_id),
              standard_id: parseInt(standard_id),
              division_id: parseInt(divId),
              class_name: className,
            },
          });
          createdClasses.push(c);
        } catch (e) {
          // Ignore duplicate if already exists
        }
      }
    }

    await AuditService.log({
      userId: adminUserId,
      action: 'BATCH_CREATE_CLASSES',
      entityType: 'Class',
      newData: { count: createdClasses.length, standard: standard.name },
      ipAddress,
    });

    return createdClasses;
  }
}

module.exports = AcademicService;
