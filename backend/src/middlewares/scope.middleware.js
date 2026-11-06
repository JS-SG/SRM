const prisma = require('../config/prisma');
const ApiResponse = require('../utils/apiResponse');
const roles = require('../constants/roles');

/**
 * Validates that if the user is a TEACHER, they are authorized for the given class and subject.
 */
const checkClassSubjectScope = async (req, res, next) => {
  try {
    if (!req.user) {
      return ApiResponse.unauthorized(res, 'Authentication required');
    }

    if (req.user.role === roles.ADMIN) {
      return next();
    }

    const staffId = req.user.staff_id;
    if (!staffId) {
      return ApiResponse.forbidden(res, 'No staff profile associated with this account');
    }

    const classId = parseInt(req.body.class_id || req.query.class_id || req.params.class_id);
    const subjectId = parseInt(req.body.subject_id || req.query.subject_id || req.params.subject_id);

    if (!classId) {
      return ApiResponse.badRequest(res, 'class_id is required to verify scope authorization');
    }

    // Check if teacher is assigned to this class and subject, or is the class teacher
    const assignment = await prisma.classStaff.findFirst({
      where: {
        class_id: classId,
        staff_id: staffId,
        OR: [
          { role: 'CLASS_TEACHER' },
          subjectId ? { subject_id: subjectId } : { id: { gt: 0 } },
        ],
      },
    });

    if (!assignment) {
      return ApiResponse.forbidden(
        res,
        'Access Denied: You are not assigned to this class/subject scope.'
      );
    }

    req.class_assignment = assignment;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Validates that if the user is a TEACHER, they are assigned to the specified class.
 */
const checkClassScope = async (req, res, next) => {
  try {
    if (!req.user) {
      return ApiResponse.unauthorized(res, 'Authentication required');
    }

    if (req.user.role === roles.ADMIN) {
      return next();
    }

    const staffId = req.user.staff_id;
    if (!staffId) {
      return ApiResponse.forbidden(res, 'No staff profile associated with this account');
    }

    const classId = parseInt(req.body.class_id || req.query.class_id || req.params.class_id);
    if (!classId) {
      return ApiResponse.badRequest(res, 'class_id is required');
    }

    const assignment = await prisma.classStaff.findFirst({
      where: {
        class_id: classId,
        staff_id: staffId,
      },
    });

    if (!assignment) {
      return ApiResponse.forbidden(
        res,
        'Access Denied: You are not assigned to this class.'
      );
    }

    req.class_assignment = assignment;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Validates that if the user is a TEACHER, the student belongs to a class assigned to this teacher.
 */
const checkStudentScope = async (req, res, next) => {
  try {
    if (!req.user) {
      return ApiResponse.unauthorized(res, 'Authentication required');
    }

    if (req.user.role === roles.ADMIN) {
      return next();
    }

    const staffId = req.user.staff_id;
    if (!staffId) {
      return ApiResponse.forbidden(res, 'No staff profile associated with this account');
    }

    const studentId = parseInt(req.params.id || req.params.student_id || req.body.student_id);
    if (!studentId) {
      return ApiResponse.badRequest(res, 'Student ID is required');
    }

    // Get teacher's assigned classes
    const assignedClasses = await prisma.classStaff.findMany({
      where: { staff_id: staffId },
      select: { class_id: true },
    });
    const classIds = assignedClasses.map((c) => c.class_id);

    // Check if student has an enrollment in any of these classes
    const enrollment = await prisma.studentEnrollment.findFirst({
      where: {
        student_id: studentId,
        class_id: { in: classIds },
      },
    });

    if (!enrollment) {
      return ApiResponse.forbidden(
        res,
        'Access Denied: This student is not enrolled in any of your assigned classes.'
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkClassSubjectScope,
  checkClassScope,
  checkStudentScope,
};
