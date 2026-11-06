const prisma = require('../config/prisma');
const AuditService = require('./audit.service');

class SubjectService {
  static async getAllSubjects() {
    return prisma.subject.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { standard_subjects: true, staff_subjects: true, marks: true },
        },
      },
    });
  }

  static async getSubjectById(subjectId) {
    const subject = await prisma.subject.findUnique({
      where: { id: parseInt(subjectId) },
      include: {
        standard_subjects: {
          include: { standard: true },
        },
        staff_subjects: {
          include: { staff: true },
        },
      },
    });

    if (!subject) throw new Error('Subject not found');
    return subject;
  }

  static async createSubject(data, adminUserId, ipAddress) {
    const { name, code, description } = data;

    const created = await prisma.subject.create({
      data: {
        name,
        code: code.toUpperCase(),
        description,
      },
    });

    await AuditService.log({
      userId: adminUserId,
      action: 'CREATE_SUBJECT',
      entityType: 'Subject',
      entityId: created.id,
      newData: created,
      ipAddress,
    });

    return created;
  }

  static async updateSubject(subjectId, data, adminUserId, ipAddress) {
    const id = parseInt(subjectId);
    const existing = await prisma.subject.findUnique({ where: { id } });
    if (!existing) throw new Error('Subject not found');

    const { name, code, description } = data;

    const updated = await prisma.subject.update({
      where: { id },
      data: {
        name,
        code: code ? code.toUpperCase() : undefined,
        description,
      },
    });

    await AuditService.log({
      userId: adminUserId,
      action: 'UPDATE_SUBJECT',
      entityType: 'Subject',
      entityId: id,
      oldData: existing,
      newData: updated,
      ipAddress,
    });

    return updated;
  }

  // ----------------------------------------------------
  // STANDARD - SUBJECT MAPPINGS
  // ----------------------------------------------------

  static async getStandardSubjects(standardId) {
    return prisma.standardSubject.findMany({
      where: standardId ? { standard_id: parseInt(standardId) } : {},
      include: {
        standard: true,
        subject: true,
      },
      orderBy: [{ standard: { display_order: 'asc' } }, { subject: { name: 'asc' } }],
    });
  }

  static async mapSubjectToStandard(data, adminUserId, ipAddress) {
    const { standard_id, subject_id, is_optional, max_marks, pass_marks } = data;

    const mapped = await prisma.standardSubject.upsert({
      where: {
        standard_id_subject_id: {
          standard_id: parseInt(standard_id),
          subject_id: parseInt(subject_id),
        },
      },
      update: {
        is_optional: !!is_optional,
        max_marks: max_marks !== undefined ? parseFloat(max_marks) : 100,
        pass_marks: pass_marks !== undefined ? parseFloat(pass_marks) : 35,
      },
      create: {
        standard_id: parseInt(standard_id),
        subject_id: parseInt(subject_id),
        is_optional: !!is_optional,
        max_marks: max_marks !== undefined ? parseFloat(max_marks) : 100,
        pass_marks: pass_marks !== undefined ? parseFloat(pass_marks) : 35,
      },
      include: {
        standard: true,
        subject: true,
      },
    });

    await AuditService.log({
      userId: adminUserId,
      action: 'MAP_STANDARD_SUBJECT',
      entityType: 'StandardSubject',
      entityId: mapped.id,
      newData: mapped,
      ipAddress,
    });

    return mapped;
  }

  static async removeSubjectFromStandard(standardId, subjectId, adminUserId, ipAddress) {
    const deleted = await prisma.standardSubject.delete({
      where: {
        standard_id_subject_id: {
          standard_id: parseInt(standardId),
          subject_id: parseInt(subjectId),
        },
      },
    });

    await AuditService.log({
      userId: adminUserId,
      action: 'REMOVE_STANDARD_SUBJECT',
      entityType: 'StandardSubject',
      entityId: deleted.id,
      ipAddress,
    });

    return deleted;
  }
}

module.exports = SubjectService;
