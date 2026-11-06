const prisma = require('../config/prisma');
const AuditService = require('./audit.service');
const { STUDENT_STATUS, ENROLLMENT_STATUS } = require('../constants/status');

class StudentService {
  /**
   * Get all students with filtering, search, sorting and pagination
   */
  static async getAllStudents({
    page = 1,
    limit = 20,
    academicYearId,
    classId,
    standardId,
    divisionId,
    status,
    gender,
    bloodGroup,
    search,
    sortBy = 'first_name',
    sortOrder = 'asc',
  }) {
    const skip = (page - 1) * limit;
    const where = {};

    if (status) where.status = status;
    if (gender) where.gender = gender;
    if (bloodGroup) where.blood_group = bloodGroup;

    // Filter by class or academic year via enrollment
    if (classId || academicYearId || standardId || divisionId) {
      where.enrollments = {
        some: {
          status: 'ACTIVE',
          ...(classId && { class_id: parseInt(classId) }),
          ...(academicYearId && { academic_year_id: parseInt(academicYearId) }),
          ...(standardId && { class: { standard_id: parseInt(standardId) } }),
          ...(divisionId && { class: { division_id: parseInt(divisionId) } }),
        },
      };
    }

    if (search) {
      where.OR = [
        { admission_number: { contains: search } },
        { first_name: { contains: search } },
        { last_name: { contains: search } },
        { city: { contains: search } },
        {
          parents: {
            some: {
              parent: {
                OR: [
                  { first_name: { contains: search } },
                  { last_name: { contains: search } },
                  { phone: { contains: search } },
                  { whatsapp_number: { contains: search } },
                ],
              },
            },
          },
        },
      ];
    }

    const [total, students] = await Promise.all([
      prisma.student.count({ where }),
      prisma.student.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { [sortBy]: sortOrder.toLowerCase() },
        include: {
          parents: {
            include: { parent: true },
            orderBy: { is_primary: 'desc' },
          },
          enrollments: {
            where: { status: 'ACTIVE' },
            include: {
              class: {
                include: { standard: true, division: true, academic_year: true },
              },
            },
            take: 1,
          },
        },
      }),
    ]);

    return {
      students,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get single student detailed profile with complete relations for the 7 tabs
   */
  static async getStudentById(studentId) {
    const id = parseInt(studentId);
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        parents: {
          include: { parent: true },
          orderBy: { is_primary: 'desc' },
        },
        enrollments: {
          orderBy: { enrollment_date: 'desc' },
          include: {
            academic_year: true,
            class: {
              include: {
                standard: true,
                division: true,
                class_teacher: true,
              },
            },
            marks: {
              include: {
                exam: true,
                subject: true,
              },
            },
            fees: {
              include: {
                fee_type: true,
                payments: true,
              },
            },
          },
        },
        notifications: {
          orderBy: { created_at: 'desc' },
          take: 50,
          include: { logs: true },
        },
      },
    });

    if (!student) {
      throw new Error('Student not found');
    }

    return student;
  }

  /**
   * Create a new student with parent details and initial enrollment
   */
  static async createStudent(data, adminUserId, ipAddress) {
    const {
      admission_number,
      first_name,
      middle_name,
      last_name,
      gender,
      date_of_birth,
      blood_group,
      photo_url,
      address,
      city,
      state,
      pincode,
      admission_date,
      // Parent info
      parent_first_name,
      parent_last_name,
      parent_relationship,
      parent_phone,
      parent_whatsapp,
      parent_email,
      parent_occupation,
      parent_address,
      // Initial Enrollment
      academic_year_id,
      class_id,
      roll_number,
    } = data;

    // Check duplicate admission number
    const existing = await prisma.student.findUnique({
      where: { admission_number },
    });
    if (existing) {
      throw new Error(`Admission number '${admission_number}' already exists.`);
    }

    const newStudent = await prisma.$transaction(async (tx) => {
      // 1. Create Student
      const student = await tx.student.create({
        data: {
          admission_number,
          first_name,
          middle_name,
          last_name,
          gender,
          date_of_birth: new Date(date_of_birth),
          blood_group,
          photo_url,
          address,
          city,
          state,
          pincode,
          admission_date: new Date(admission_date || Date.now()),
          status: STUDENT_STATUS.ACTIVE,
        },
      });

      // 2. Create Parent if provided
      if (parent_first_name && parent_phone) {
        const parent = await tx.parent.create({
          data: {
            first_name: parent_first_name,
            last_name: parent_last_name || '',
            relationship: parent_relationship || 'Parent',
            phone: parent_phone,
            whatsapp_number: parent_whatsapp || parent_phone,
            email: parent_email,
            occupation: parent_occupation,
            address: parent_address || address,
          },
        });

        // Link student to parent
        await tx.studentParent.create({
          data: {
            student_id: student.id,
            parent_id: parent.id,
            is_primary: true,
            receives_notifications: true,
          },
        });
      }

      // 3. Create Enrollment if class and academic year provided
      if (academic_year_id && class_id) {
        await tx.studentEnrollment.create({
          data: {
            student_id: student.id,
            academic_year_id: parseInt(academic_year_id),
            class_id: parseInt(class_id),
            roll_number: roll_number || null,
            status: ENROLLMENT_STATUS.ACTIVE,
          },
        });
      }

      return student;
    });

    await AuditService.log({
      userId: adminUserId,
      action: 'CREATE_STUDENT',
      entityType: 'Student',
      entityId: newStudent.id,
      newData: {
        admission_number,
        name: `${first_name} ${last_name}`,
        class_id,
      },
      ipAddress,
    });

    return this.getStudentById(newStudent.id);
  }

  /**
   * Update student profile
   */
  static async updateStudent(studentId, data, adminUserId, ipAddress) {
    const id = parseInt(studentId);
    const existing = await prisma.student.findUnique({ where: { id } });
    if (!existing) {
      throw new Error('Student not found');
    }

    const {
      first_name,
      middle_name,
      last_name,
      gender,
      date_of_birth,
      blood_group,
      photo_url,
      address,
      city,
      state,
      pincode,
      admission_date,
      status,
    } = data;

    const updated = await prisma.student.update({
      where: { id },
      data: {
        first_name,
        middle_name,
        last_name,
        gender,
        date_of_birth: date_of_birth ? new Date(date_of_birth) : undefined,
        blood_group,
        photo_url,
        address,
        city,
        state,
        pincode,
        admission_date: admission_date ? new Date(admission_date) : undefined,
        status,
      },
    });

    await AuditService.log({
      userId: adminUserId,
      action: 'UPDATE_STUDENT',
      entityType: 'Student',
      entityId: id,
      oldData: existing,
      newData: updated,
      ipAddress,
    });

    return this.getStudentById(id);
  }

  /**
   * Add a parent to student
   */
  static async addParent(studentId, parentData, isPrimary = false, receivesNotifications = true) {
    const sId = parseInt(studentId);
    const parent = await prisma.parent.create({
      data: {
        first_name: parentData.first_name,
        last_name: parentData.last_name || '',
        relationship: parentData.relationship || 'Guardian',
        phone: parentData.phone,
        whatsapp_number: parentData.whatsapp_number || parentData.phone,
        email: parentData.email,
        occupation: parentData.occupation,
        address: parentData.address,
      },
    });

    if (isPrimary) {
      await prisma.studentParent.updateMany({
        where: { student_id: sId },
        data: { is_primary: false },
      });
    }

    await prisma.studentParent.create({
      data: {
        student_id: sId,
        parent_id: parent.id,
        is_primary: isPrimary,
        receives_notifications: receivesNotifications,
      },
    });

    return parent;
  }

  /**
   * Enroll or promote student to a new class
   */
  static async enrollStudent(data, adminUserId, ipAddress) {
    const { student_id, academic_year_id, class_id, roll_number, status } = data;

    // If an existing enrollment exists for this student in this academic year, update it
    const existing = await prisma.studentEnrollment.findUnique({
      where: {
        student_id_academic_year_id: {
          student_id: parseInt(student_id),
          academic_year_id: parseInt(academic_year_id),
        },
      },
    });

    let enrollment;
    if (existing) {
      enrollment = await prisma.studentEnrollment.update({
        where: { id: existing.id },
        data: {
          class_id: parseInt(class_id),
          roll_number: roll_number || existing.roll_number,
          status: status || existing.status,
        },
      });
    } else {
      enrollment = await prisma.studentEnrollment.create({
        data: {
          student_id: parseInt(student_id),
          academic_year_id: parseInt(academic_year_id),
          class_id: parseInt(class_id),
          roll_number,
          status: status || ENROLLMENT_STATUS.ACTIVE,
        },
      });
    }

    await AuditService.log({
      userId: adminUserId,
      action: 'ENROLL_STUDENT',
      entityType: 'StudentEnrollment',
      entityId: enrollment.id,
      newData: enrollment,
      ipAddress,
    });

    return enrollment;
  }

  /**
   * Deactivate/Reactivate student
   */
  static async toggleStudentStatus(studentId, status, adminUserId, ipAddress) {
    const id = parseInt(studentId);
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) {
      throw new Error('Student not found');
    }

    const updated = await prisma.student.update({
      where: { id },
      data: { status },
    });

    await AuditService.log({
      userId: adminUserId,
      action: status === 'ACTIVE' ? 'ACTIVATE_STUDENT' : 'DEACTIVATE_STUDENT',
      entityType: 'Student',
      entityId: id,
      oldData: { status: student.status },
      newData: { status: updated.status },
      ipAddress,
    });

    return updated;
  }
}

module.exports = StudentService;
