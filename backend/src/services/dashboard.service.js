const prisma = require('../config/prisma');

class DashboardService {
  /**
   * Admin Dashboard Metrics
   */
  static async getAdminMetrics() {
    const [
      totalStudents,
      totalTeachers,
      totalClasses,
      currentYear,
      allFees,
      recentActivities,
      recentNotifications,
      upcomingExams,
    ] = await Promise.all([
      prisma.student.count({ where: { status: 'ACTIVE' } }),
      prisma.staff.count({ where: { is_active: true } }),
      prisma.class.count({ where: { is_active: true } }),
      prisma.academicYear.findFirst({ where: { is_current: true } }),
      prisma.studentFee.findMany({
        include: { payments: true },
      }),
      prisma.auditLog.findMany({
        take: 8,
        orderBy: { created_at: 'desc' },
        include: {
          user: { select: { username: true, role: { select: { name: true } } } },
        },
      }),
      prisma.notification.findMany({
        take: 6,
        orderBy: { created_at: 'desc' },
        include: {
          student: { select: { first_name: true, last_name: true, admission_number: true } },
          parent: { select: { first_name: true, last_name: true, phone: true } },
        },
      }),
      prisma.exam.findMany({
        take: 4,
        orderBy: { start_date: 'desc' },
        include: { academic_year: true },
      }),
    ]);

    let totalAssignedFee = 0;
    let totalCollectedFee = 0;
    let overdueFee = 0;
    let pendingFee = 0;
    const now = new Date();

    allFees.forEach((fee) => {
      const amount = Number(fee.amount);
      const paid = fee.payments.reduce((acc, p) => acc + Number(p.amount_paid), 0);
      const bal = Math.max(0, amount - paid);

      totalAssignedFee += amount;
      totalCollectedFee += paid;

      if (bal > 0) {
        if (new Date(fee.due_date) < now) {
          overdueFee += bal;
        } else {
          pendingFee += bal;
        }
      }
    });

    return {
      overview: {
        total_students: totalStudents,
        total_teachers: totalTeachers,
        total_classes: totalClasses,
        current_academic_year: currentYear ? currentYear.name : 'Not Configured',
      },
      financials: {
        total_assigned: totalAssignedFee,
        total_collected: totalCollectedFee,
        pending_amount: pendingFee,
        overdue_amount: overdueFee,
        collection_percentage:
          totalAssignedFee > 0 ? ((totalCollectedFee / totalAssignedFee) * 100).toFixed(1) : 0,
      },
      recent_activities: recentActivities,
      recent_notifications: recentNotifications,
      upcoming_exams: upcomingExams,
    };
  }

  /**
   * Teacher Dashboard Metrics
   */
  static async getTeacherMetrics(staffId) {
    const sId = parseInt(staffId);

    // Get teacher's assignments
    const assignments = await prisma.classStaff.findMany({
      where: { staff_id: sId },
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

    const classIds = [...new Set(assignments.map((a) => a.class_id))];

    // Total unique students taught by this teacher
    const totalStudentsTaught = await prisma.studentEnrollment.count({
      where: {
        class_id: { in: classIds },
        status: 'ACTIVE',
      },
    });

    // Get active exams
    const activeExams = await prisma.exam.findMany({
      orderBy: { start_date: 'desc' },
      take: 3,
    });

    // Count pending marks entries for teacher's class + subject combinations
    let pendingMarksCount = 0;
    for (const assign of assignments) {
      if (assign.subject_id && activeExams.length > 0) {
        const latestExam = activeExams[0];
        const enrolledCount = assign.class._count.enrollments;
        const enteredCount = await prisma.mark.count({
          where: {
            exam_id: latestExam.id,
            subject_id: assign.subject_id,
            enrollment: { class_id: assign.class_id, status: 'ACTIVE' },
          },
        });
        if (enteredCount < enrolledCount) {
          pendingMarksCount += enrolledCount - enteredCount;
        }
      }
    }

    return {
      assigned_classes: assignments,
      metrics: {
        total_classes: classIds.length,
        total_students: totalStudentsTaught,
        pending_marks_entry: pendingMarksCount,
      },
      active_exams: activeExams,
    };
  }
}

module.exports = DashboardService;
