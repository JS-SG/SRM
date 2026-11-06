const prisma = require('../config/prisma');

class ReportService {
  /**
   * Comprehensive Class Exam Performance & Broadsheet Report
   */
  static async getClassExamReport(classId, examId) {
    const cId = parseInt(classId);
    const eId = parseInt(examId);

    const [classRecord, exam, subjects] = await Promise.all([
      prisma.class.findUnique({
        where: { id: cId },
        include: { standard: true, division: true, academic_year: true, class_teacher: true },
      }),
      prisma.exam.findUnique({ where: { id: eId } }),
      prisma.standardSubject.findMany({
        where: {
          standard: { classes: { some: { id: cId } } },
        },
        include: { subject: true },
        orderBy: { subject: { name: 'asc' } },
      }),
    ]);

    if (!classRecord || !exam) throw new Error('Class or Exam not found');

    const enrollments = await prisma.studentEnrollment.findMany({
      where: { class_id: cId, status: 'ACTIVE' },
      orderBy: { roll_number: 'asc' },
      include: {
        student: true,
        marks: {
          where: { exam_id: eId },
          include: { subject: true },
        },
      },
    });

    let classTotalMarks = 0;
    let studentRankings = [];

    enrollments.forEach((enr) => {
      const marksMap = {};
      let studentTotal = 0;
      let studentMax = 0;
      let hasFailed = false;

      enr.marks.forEach((m) => {
        const obtained = Number(m.marks_obtained);
        const max = Number(m.max_marks);
        marksMap[m.subject_id] = {
          obtained,
          max,
          grade: m.grade,
        };
        studentTotal += obtained;
        studentMax += max;

        // Check if failed
        const stdSub = subjects.find((s) => s.subject_id === m.subject_id);
        const passMark = stdSub ? Number(stdSub.pass_marks) : 35;
        if (obtained < passMark) {
          hasFailed = true;
        }
      });

      const percentage = studentMax > 0 ? ((studentTotal / studentMax) * 100).toFixed(2) : 0;

      studentRankings.push({
        enrollment_id: enr.id,
        student_id: enr.student.id,
        admission_number: enr.student.admission_number,
        student_name: `${enr.student.first_name} ${enr.student.last_name}`.trim(),
        roll_number: enr.roll_number,
        marks: marksMap,
        total_obtained: studentTotal,
        total_max: studentMax,
        percentage: parseFloat(percentage),
        result: hasFailed ? 'FAIL' : 'PASS',
      });
      classTotalMarks += studentTotal;
    });

    // Sort by total marks descending for ranking
    studentRankings.sort((a, b) => b.total_obtained - a.total_obtained);
    studentRankings = studentRankings.map((st, idx) => ({
      ...st,
      rank: st.total_obtained > 0 ? idx + 1 : 'N/A',
    }));

    const totalStudents = studentRankings.length;
    const passedStudents = studentRankings.filter((s) => s.result === 'PASS').length;
    const passPercentage = totalStudents > 0 ? ((passedStudents / totalStudents) * 100).toFixed(1) : 0;

    return {
      class: classRecord,
      exam,
      subjects: subjects.map((s) => ({
        id: s.subject.id,
        name: s.subject.name,
        code: s.subject.code,
        max_marks: Number(s.max_marks),
        pass_marks: Number(s.pass_marks),
      })),
      students: studentRankings,
      summary: {
        total_students: totalStudents,
        passed_students: passedStudents,
        failed_students: totalStudents - passedStudents,
        pass_percentage: Number(passPercentage),
        average_marks: totalStudents > 0 ? (classTotalMarks / totalStudents).toFixed(2) : 0,
      },
    };
  }

  /**
   * Fee Collection & Outstanding Summary Report
   */
  static async getFeeSummaryReport({ academicYearId, classId }) {
    const where = {};
    if (classId) where.enrollment = { class_id: parseInt(classId) };
    if (academicYearId) where.enrollment = { academic_year_id: parseInt(academicYearId) };

    const fees = await prisma.studentFee.findMany({
      where,
      include: {
        fee_type: true,
        payments: true,
        enrollment: {
          include: {
            class: { include: { standard: true, division: true } },
            student: true,
          },
        },
      },
    });

    let totalAssigned = 0;
    let totalCollected = 0;
    let statusCounts = { PENDING: 0, PARTIAL: 0, PAID: 0, OVERDUE: 0 };
    const classBreakdown = {};

    fees.forEach((f) => {
      const amount = Number(f.amount);
      const paid = f.payments.reduce((acc, p) => acc + Number(p.amount_paid), 0);
      const balance = Math.max(0, amount - paid);

      totalAssigned += amount;
      totalCollected += paid;

      let st = f.status;
      if (st !== 'PAID' && new Date(f.due_date) < new Date()) {
        st = 'OVERDUE';
      }
      statusCounts[st] = (statusCounts[st] || 0) + 1;

      const cName = f.enrollment.class.class_name;
      if (!classBreakdown[cName]) {
        classBreakdown[cName] = {
          class_name: cName,
          assigned: 0,
          collected: 0,
          pending: 0,
        };
      }
      classBreakdown[cName].assigned += amount;
      classBreakdown[cName].collected += paid;
      classBreakdown[cName].pending += balance;
    });

    return {
      total_assigned: totalAssigned,
      total_collected: totalCollected,
      total_outstanding: totalAssigned - totalCollected,
      collection_rate: totalAssigned > 0 ? ((totalCollected / totalAssigned) * 100).toFixed(1) : 0,
      status_counts: statusCounts,
      class_breakdown: Object.values(classBreakdown),
    };
  }
}

module.exports = ReportService;
