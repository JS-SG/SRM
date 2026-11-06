const prisma = require('../config/prisma');
const AuditService = require('./audit.service');

class ExamService {
  static async getExams(academicYearId) {
    const where = {};
    if (academicYearId) where.academic_year_id = parseInt(academicYearId);

    return prisma.exam.findMany({
      where,
      orderBy: { start_date: 'desc' },
      include: {
        academic_year: true,
        _count: { select: { marks: true } },
      },
    });
  }

  static async getExamById(examId) {
    const exam = await prisma.exam.findUnique({
      where: { id: parseInt(examId) },
      include: {
        academic_year: true,
        marks: {
          include: {
            enrollment: {
              include: {
                student: true,
                class: { include: { standard: true, division: true } },
              },
            },
            subject: true,
          },
        },
      },
    });

    if (!exam) throw new Error('Exam not found');
    return exam;
  }

  static async createExam(data, adminUserId, ipAddress) {
    const { academic_year_id, name, exam_type, start_date, end_date } = data;

    const created = await prisma.exam.create({
      data: {
        academic_year_id: parseInt(academic_year_id),
        name,
        exam_type: exam_type || 'INTERNAL',
        start_date: new Date(start_date),
        end_date: new Date(end_date),
      },
      include: { academic_year: true },
    });

    await AuditService.log({
      userId: adminUserId,
      action: 'CREATE_EXAM',
      entityType: 'Exam',
      entityId: created.id,
      newData: created,
      ipAddress,
    });

    return created;
  }

  static async updateExam(examId, data, adminUserId, ipAddress) {
    const id = parseInt(examId);
    const existing = await prisma.exam.findUnique({ where: { id } });
    if (!existing) throw new Error('Exam not found');

    const { name, exam_type, start_date, end_date } = data;

    const updated = await prisma.exam.update({
      where: { id },
      data: {
        name,
        exam_type,
        start_date: start_date ? new Date(start_date) : undefined,
        end_date: end_date ? new Date(end_date) : undefined,
      },
      include: { academic_year: true },
    });

    await AuditService.log({
      userId: adminUserId,
      action: 'UPDATE_EXAM',
      entityType: 'Exam',
      entityId: id,
      oldData: existing,
      newData: updated,
      ipAddress,
    });

    return updated;
  }
}

module.exports = ExamService;
