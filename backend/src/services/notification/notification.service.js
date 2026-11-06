const prisma = require('../../config/prisma');
const config = require('../../config/env');
const MockWhatsAppProvider = require('./mockWhatsAppProvider');
const MetaWhatsAppProvider = require('./metaWhatsAppProvider');
const logger = require('../../utils/logger');

class NotificationService {
  constructor() {
    this.provider =
      config.WHATSAPP_PROVIDER === 'META'
        ? new MetaWhatsAppProvider()
        : new MockWhatsAppProvider();
  }

  /**
   * Replace placeholders in template text
   */
  interpolate(template, variables) {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{${key}}`, 'g');
      result = result.replace(regex, value !== undefined && value !== null ? value : '');
    }
    return result;
  }

  /**
   * Send notification to a single student's primary parent
   */
  async sendToStudent({ studentId, type, title, messageTemplate, extraVariables = {} }) {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(studentId) },
      include: {
        parents: {
          include: { parent: true },
          orderBy: { is_primary: 'desc' },
        },
        enrollments: {
          where: { status: 'ACTIVE' },
          include: {
            class: {
              include: { standard: true, division: true },
            },
          },
          take: 1,
        },
      },
    });

    if (!student) {
      throw new Error(`Student with ID ${studentId} not found`);
    }

    const primaryParentRel = student.parents.find((p) => p.receives_notifications) || student.parents[0];
    const parent = primaryParentRel ? primaryParentRel.parent : null;
    const phone = parent?.whatsapp_number || parent?.phone;

    const currentEnrollment = student.enrollments[0];
    const className = currentEnrollment?.class?.class_name || 'N/A';
    const rollNo = currentEnrollment?.roll_number || 'N/A';

    const variables = {
      student_name: `${student.first_name} ${student.last_name}`.trim(),
      admission_number: student.admission_number,
      parent_name: parent ? `${parent.first_name} ${parent.last_name}`.trim() : 'Parent/Guardian',
      class_name: className,
      roll_number: rollNo,
      ...extraVariables,
    };

    const finalMessage = this.interpolate(messageTemplate, variables);

    // Create Notification record
    const notification = await prisma.notification.create({
      data: {
        student_id: student.id,
        parent_id: parent ? parent.id : null,
        type,
        title,
        message: finalMessage,
        status: 'QUEUED',
      },
    });

    if (!phone) {
      // Log missing phone
      await prisma.notificationLog.create({
        data: {
          notification_id: notification.id,
          phone_number: 'N/A',
          provider: this.provider.name,
          status: 'FAILED',
          error_message: 'No valid phone or WhatsApp number found for parent',
        },
      });

      await prisma.notification.update({
        where: { id: notification.id },
        data: { status: 'FAILED' },
      });

      return { notification, success: false, reason: 'Missing phone number' };
    }

    // Send via provider
    const dispatchResult = await this.provider.sendMessage({
      to: phone,
      message: finalMessage,
    });

    // Create log
    await prisma.notificationLog.create({
      data: {
        notification_id: notification.id,
        phone_number: phone,
        provider: this.provider.name,
        provider_message_id: dispatchResult.messageId,
        status: dispatchResult.status,
        error_message: dispatchResult.error || null,
      },
    });

    const updatedStatus = dispatchResult.success ? 'SENT' : 'FAILED';
    const updatedNotification = await prisma.notification.update({
      where: { id: notification.id },
      data: { status: updatedStatus },
    });

    return { notification: updatedNotification, success: dispatchResult.success, dispatchResult };
  }

  /**
   * Bulk send notifications by Class or Student IDs
   */
  async sendBulk({ classId, studentIds, type, title, messageTemplate, extraVariables = {} }) {
    let targetStudentIds = [];

    if (studentIds && Array.isArray(studentIds) && studentIds.length > 0) {
      targetStudentIds = studentIds.map((id) => parseInt(id));
    } else if (classId) {
      const enrollments = await prisma.studentEnrollment.findMany({
        where: { class_id: parseInt(classId), status: 'ACTIVE' },
        select: { student_id: true },
      });
      targetStudentIds = enrollments.map((e) => e.student_id);
    }

    if (targetStudentIds.length === 0) {
      throw new Error('No students found for notification dispatch');
    }

    const results = [];
    for (const sId of targetStudentIds) {
      try {
        const res = await this.sendToStudent({
          studentId: sId,
          type,
          title,
          messageTemplate,
          extraVariables,
        });
        results.push({ studentId: sId, ...res });
      } catch (err) {
        results.push({ studentId: sId, success: false, error: err.message });
      }
    }

    const successful = results.filter((r) => r.success).length;
    const failed = results.length - successful;

    return {
      total: results.length,
      successful,
      failed,
      results,
    };
  }

  /**
   * Get notification history
   */
  async getHistory({ page = 1, limit = 20, type, status, studentId, search }) {
    const skip = (page - 1) * limit;
    const where = {};

    if (type) where.type = type;
    if (status) where.status = status;
    if (studentId) where.student_id = parseInt(studentId);
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { message: { contains: search } },
      ];
    }

    const [total, notifications] = await Promise.all([
      prisma.notification.count({ where }),
      prisma.notification.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { created_at: 'desc' },
        include: {
          student: {
            select: {
              id: true,
              admission_number: true,
              first_name: true,
              last_name: true,
            },
          },
          parent: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              whatsapp_number: true,
              phone: true,
            },
          },
          logs: true,
        },
      }),
    ]);

    return {
      notifications,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

module.exports = new NotificationService();
