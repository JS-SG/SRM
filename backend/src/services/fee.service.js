const prisma = require('../config/prisma');
const AuditService = require('./audit.service');
const { FEE_STATUS } = require('../constants/status');

class FeeService {
  // ----------------------------------------------------
  // FEE TYPES
  // ----------------------------------------------------

  static async getFeeTypes() {
    return prisma.feeType.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { student_fees: true } },
      },
    });
  }

  static async createFeeType(data, adminUserId, ipAddress) {
    const { name, description } = data;
    const created = await prisma.feeType.create({
      data: { name, description },
    });

    await AuditService.log({
      userId: adminUserId,
      action: 'CREATE_FEE_TYPE',
      entityType: 'FeeType',
      entityId: created.id,
      newData: created,
      ipAddress,
    });

    return created;
  }

  // ----------------------------------------------------
  // STUDENT FEES & ASSIGNMENT
  // ----------------------------------------------------

  static async getStudentFees({ studentEnrollmentId, classId, status, search, page = 1, limit = 20 }) {
    const skip = (page - 1) * limit;
    const where = {};

    if (studentEnrollmentId) where.student_enrollment_id = parseInt(studentEnrollmentId);
    if (status) where.status = status;
    if (classId) where.enrollment = { class_id: parseInt(classId) };

    if (search) {
      where.enrollment = {
        student: {
          OR: [
            { first_name: { contains: search } },
            { last_name: { contains: search } },
            { admission_number: { contains: search } },
          ],
        },
      };
    }

    const [total, fees] = await Promise.all([
      prisma.studentFee.count({ where }),
      prisma.studentFee.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { due_date: 'asc' },
        include: {
          fee_type: true,
          payments: {
            include: { receiver: { select: { username: true } } },
          },
          enrollment: {
            include: {
              student: true,
              class: { include: { standard: true, division: true } },
            },
          },
        },
      }),
    ]);

    const formattedFees = fees.map((fee) => {
      const totalAmount = Number(fee.amount);
      const totalPaid = fee.payments.reduce((acc, p) => acc + Number(p.amount_paid), 0);
      const balance = Math.max(0, totalAmount - totalPaid);

      // Check if overdue
      let computedStatus = fee.status;
      if (computedStatus !== FEE_STATUS.PAID && new Date(fee.due_date) < new Date()) {
        computedStatus = FEE_STATUS.OVERDUE;
      }

      return {
        id: fee.id,
        student_enrollment_id: fee.student_enrollment_id,
        student: {
          id: fee.enrollment.student.id,
          admission_number: fee.enrollment.student.admission_number,
          name: `${fee.enrollment.student.first_name} ${fee.enrollment.student.last_name}`.trim(),
          class_name: fee.enrollment.class.class_name,
          roll_number: fee.enrollment.roll_number,
        },
        fee_type: fee.fee_type,
        amount: totalAmount,
        total_paid: totalPaid,
        balance,
        due_date: fee.due_date,
        status: computedStatus,
        payments: fee.payments,
      };
    });

    return {
      fees: formattedFees,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Assign fee to a student or entire class
   */
  static async assignFee(data, adminUserId, ipAddress) {
    const { student_enrollment_id, class_id, fee_type_id, amount, due_date } = data;

    let targetEnrollmentIds = [];
    if (student_enrollment_id) {
      targetEnrollmentIds.push(parseInt(student_enrollment_id));
    } else if (class_id) {
      const enrollments = await prisma.studentEnrollment.findMany({
        where: { class_id: parseInt(class_id), status: 'ACTIVE' },
        select: { id: true },
      });
      targetEnrollmentIds = enrollments.map((e) => e.id);
    }

    if (targetEnrollmentIds.length === 0) {
      throw new Error('No students selected for fee assignment');
    }

    const assignedFees = [];
    for (const enrId of targetEnrollmentIds) {
      const fee = await prisma.studentFee.create({
        data: {
          student_enrollment_id: enrId,
          fee_type_id: parseInt(fee_type_id),
          amount: parseFloat(amount),
          due_date: new Date(due_date),
          status: FEE_STATUS.PENDING,
        },
      });
      assignedFees.push(fee);
    }

    await AuditService.log({
      userId: adminUserId,
      action: 'ASSIGN_FEE',
      entityType: 'StudentFee',
      newData: { count: assignedFees.length, fee_type_id, amount, due_date },
      ipAddress,
    });

    return {
      message: `Assigned fee to ${assignedFees.length} student(s) successfully.`,
      count: assignedFees.length,
    };
  }

  // ----------------------------------------------------
  // PAYMENTS
  // ----------------------------------------------------

  /**
   * Record fee payment with partial/full support and balance recalculation
   */
  static async recordPayment(data, userId, ipAddress) {
    const { student_fee_id, amount_paid, payment_method, transaction_reference, payment_date } = data;

    const feeId = parseInt(student_fee_id);
    const payingAmount = parseFloat(amount_paid);

    if (isNaN(payingAmount) || payingAmount <= 0) {
      throw new Error('Payment amount must be greater than 0');
    }

    const studentFee = await prisma.studentFee.findUnique({
      where: { id: feeId },
      include: { payments: true, fee_type: true, enrollment: { include: { student: true } } },
    });

    if (!studentFee) throw new Error('Student fee record not found');

    const totalFeeAmount = Number(studentFee.amount);
    const existingPaid = studentFee.payments.reduce((acc, p) => acc + Number(p.amount_paid), 0);
    const currentBalance = totalFeeAmount - existingPaid;

    if (payingAmount > currentBalance) {
      throw new Error(
        `Payment amount (${payingAmount}) exceeds the remaining balance (${currentBalance})`
      );
    }

    const txRef =
      transaction_reference ||
      `REC-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;

    const result = await prisma.$transaction(async (tx) => {
      // 1. Create Fee Payment
      const payment = await tx.feePayment.create({
        data: {
          student_fee_id: feeId,
          amount_paid: payingAmount,
          payment_date: payment_date ? new Date(payment_date) : new Date(),
          payment_method: payment_method || 'CASH',
          transaction_reference: txRef,
          received_by: userId,
        },
      });

      // 2. Recalculate status
      const newTotalPaid = existingPaid + payingAmount;
      let newStatus = FEE_STATUS.PENDING;

      if (newTotalPaid >= totalFeeAmount) {
        newStatus = FEE_STATUS.PAID;
      } else if (newTotalPaid > 0) {
        newStatus = FEE_STATUS.PARTIAL;
      }

      const updatedFee = await tx.studentFee.update({
        where: { id: feeId },
        data: { status: newStatus },
        include: { fee_type: true },
      });

      return { payment, updatedFee, newBalance: totalFeeAmount - newTotalPaid };
    });

    await AuditService.log({
      userId,
      action: 'COLLECT_FEE_PAYMENT',
      entityType: 'FeePayment',
      entityId: result.payment.id,
      newData: {
        student_fee_id: feeId,
        amount_paid: payingAmount,
        receipt: txRef,
        new_status: result.updatedFee.status,
      },
      ipAddress,
    });

    return {
      message: 'Payment recorded successfully',
      payment: result.payment,
      fee: result.updatedFee,
      receiptNumber: txRef,
      remainingBalance: result.newBalance,
    };
  }
}

module.exports = FeeService;
