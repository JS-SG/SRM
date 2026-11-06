const prisma = require('../config/prisma');
const AuditService = require('./audit.service');

class MarkService {
  /**
   * Calculate letter grade from marks obtained and max marks
   */
  static calculateGrade(marksObtained, maxMarks) {
    if (maxMarks <= 0) return 'N/A';
    const percentage = (marksObtained / maxMarks) * 100;

    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 35) return 'D';
    return 'F';
  }

  /**
   * Get marks entry matrix for a Class, Exam, and Subject
   */
  static async getClassMarksMatrix({ classId, examId, subjectId }) {
    const cId = parseInt(classId);
    const eId = parseInt(examId);
    const sId = parseInt(subjectId);

    // Get Class details with standard info
    const classRecord = await prisma.class.findUnique({
      where: { id: cId },
      include: {
        standard: true,
        division: true,
        academic_year: true,
      },
    });

    if (!classRecord) throw new Error('Class not found');

    // Get Standard-Subject configuration for max and pass marks
    const stdSubject = await prisma.standardSubject.findUnique({
      where: {
        standard_id_subject_id: {
          standard_id: classRecord.standard_id,
          subject_id: sId,
        },
      },
      include: { subject: true },
    });

    const maxMarks = stdSubject ? Number(stdSubject.max_marks) : 100;
    const passMarks = stdSubject ? Number(stdSubject.pass_marks) : 35;
    const subjectName = stdSubject?.subject?.name || 'Subject';

    // Get all enrolled students in this class
    const enrollments = await prisma.studentEnrollment.findMany({
      where: {
        class_id: cId,
        status: 'ACTIVE',
      },
      orderBy: { roll_number: 'asc' },
      include: {
        student: true,
        marks: {
          where: {
            exam_id: eId,
            subject_id: sId,
          },
        },
      },
    });

    const studentRows = enrollments.map((enr) => {
      const existingMark = enr.marks[0];
      return {
        student_enrollment_id: enr.id,
        student_id: enr.student.id,
        admission_number: enr.student.admission_number,
        student_name: `${enr.student.first_name} ${enr.student.last_name}`.trim(),
        roll_number: enr.roll_number,
        marks_id: existingMark ? existingMark.id : null,
        marks_obtained: existingMark ? Number(existingMark.marks_obtained) : '',
        max_marks: existingMark ? Number(existingMark.max_marks) : maxMarks,
        pass_marks: passMarks,
        grade: existingMark ? existingMark.grade : '',
        remarks: existingMark ? existingMark.remarks : '',
        is_passed: existingMark ? Number(existingMark.marks_obtained) >= passMarks : null,
      };
    });

    return {
      class: {
        id: classRecord.id,
        class_name: classRecord.class_name,
        standard_id: classRecord.standard_id,
        division_id: classRecord.division_id,
      },
      subject: {
        id: sId,
        name: subjectName,
        max_marks: maxMarks,
        pass_marks: passMarks,
      },
      exam_id: eId,
      students: studentRows,
    };
  }

  /**
   * Save or batch update marks for students
   */
  static async saveMarks({ class_id, exam_id, subject_id, marks_data }, userId, ipAddress) {
    const cId = parseInt(class_id);
    const eId = parseInt(exam_id);
    const sId = parseInt(subject_id);

    if (!marks_data || !Array.isArray(marks_data) || marks_data.length === 0) {
      throw new Error('Marks data array is required');
    }

    // Get subject standard max marks for default
    const classRecord = await prisma.class.findUnique({ where: { id: cId } });
    const stdSubject = await prisma.standardSubject.findUnique({
      where: {
        standard_id_subject_id: {
          standard_id: classRecord.standard_id,
          subject_id: sId,
        },
      },
    });

    const defaultMaxMarks = stdSubject ? Number(stdSubject.max_marks) : 100;

    const savedMarks = [];
    for (const item of marks_data) {
      const enrollmentId = parseInt(item.student_enrollment_id);
      if (item.marks_obtained === '' || item.marks_obtained === null || item.marks_obtained === undefined) {
        continue; // skip unentered
      }

      const marksObtained = parseFloat(item.marks_obtained);
      const maxMarks = item.max_marks !== undefined ? parseFloat(item.max_marks) : defaultMaxMarks;

      if (isNaN(marksObtained) || marksObtained < 0) {
        throw new Error(`Invalid marks value '${item.marks_obtained}' for enrollment ID ${enrollmentId}`);
      }

      if (marksObtained > maxMarks) {
        throw new Error(`Marks obtained (${marksObtained}) cannot exceed maximum marks (${maxMarks})`);
      }

      const grade = item.grade || this.calculateGrade(marksObtained, maxMarks);
      const remarks = item.remarks || null;

      const mark = await prisma.mark.upsert({
        where: {
          student_enrollment_id_exam_id_subject_id: {
            student_enrollment_id: enrollmentId,
            exam_id: eId,
            subject_id: sId,
          },
        },
        update: {
          marks_obtained: marksObtained,
          max_marks: maxMarks,
          grade,
          remarks,
          entered_by: userId,
        },
        create: {
          student_enrollment_id: enrollmentId,
          exam_id: eId,
          subject_id: sId,
          marks_obtained: marksObtained,
          max_marks: maxMarks,
          grade,
          remarks,
          entered_by: userId,
        },
      });

      savedMarks.push(mark);
    }

    await AuditService.log({
      userId,
      action: 'SAVE_MARKS',
      entityType: 'Mark',
      newData: {
        class_id: cId,
        exam_id: eId,
        subject_id: sId,
        count: savedMarks.length,
      },
      ipAddress,
    });

    return {
      message: `Successfully saved marks for ${savedMarks.length} students.`,
      savedCount: savedMarks.length,
    };
  }

  /**
   * Get student's report card for all exams in an enrollment
   */
  static async getStudentMarksheet(studentEnrollmentId) {
    const enrId = parseInt(studentEnrollmentId);

    const enrollment = await prisma.studentEnrollment.findUnique({
      where: { id: enrId },
      include: {
        student: true,
        academic_year: true,
        class: {
          include: {
            standard: {
              include: {
                standard_subjects: { include: { subject: true } },
              },
            },
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
      },
    });

    if (!enrollment) throw new Error('Enrollment not found');

    // Group marks by Exam
    const examsMap = {};
    enrollment.marks.forEach((m) => {
      const eName = m.exam.name;
      if (!examsMap[eName]) {
        examsMap[eName] = {
          exam: m.exam,
          subjects: [],
          totalMarksObtained: 0,
          totalMaxMarks: 0,
        };
      }
      const obtained = Number(m.marks_obtained);
      const max = Number(m.max_marks);
      examsMap[eName].subjects.push({
        subject_id: m.subject_id,
        subject_name: m.subject.name,
        subject_code: m.subject.code,
        marks_obtained: obtained,
        max_marks: max,
        grade: m.grade,
        remarks: m.remarks,
      });
      examsMap[eName].totalMarksObtained += obtained;
      examsMap[eName].totalMaxMarks += max;
    });

    // Calculate percentage and overall grade for each exam
    Object.values(examsMap).forEach((ex) => {
      ex.percentage = ex.totalMaxMarks > 0 ? ((ex.totalMarksObtained / ex.totalMaxMarks) * 100).toFixed(2) : 0;
      ex.overallGrade = this.calculateGrade(ex.totalMarksObtained, ex.totalMaxMarks);
    });

    return {
      student: enrollment.student,
      enrollment: {
        id: enrollment.id,
        roll_number: enrollment.roll_number,
        class_name: enrollment.class.class_name,
        academic_year: enrollment.academic_year.name,
        class_teacher: enrollment.class.class_teacher
          ? `${enrollment.class.class_teacher.first_name} ${enrollment.class.class_teacher.last_name}`
          : null,
      },
      exams: Object.values(examsMap),
    };
  }
}

module.exports = MarkService;
