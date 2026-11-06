const SubjectService = require('../services/subject.service');
const ApiResponse = require('../utils/apiResponse');

class SubjectController {
  static async getAllSubjects(req, res, next) {
    try {
      const subjects = await SubjectService.getAllSubjects();
      return ApiResponse.success(res, subjects, 'Subjects fetched');
    } catch (error) {
      next(error);
    }
  }

  static async getSubjectById(req, res, next) {
    try {
      const subject = await SubjectService.getSubjectById(req.params.id);
      return ApiResponse.success(res, subject, 'Subject details fetched');
    } catch (error) {
      next(error);
    }
  }

  static async createSubject(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const subject = await SubjectService.createSubject(req.body, req.user.id, ipAddress);
      return ApiResponse.created(res, subject, 'Subject created');
    } catch (error) {
      next(error);
    }
  }

  static async updateSubject(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const subject = await SubjectService.updateSubject(req.params.id, req.body, req.user.id, ipAddress);
      return ApiResponse.success(res, subject, 'Subject updated');
    } catch (error) {
      next(error);
    }
  }

  static async getStandardSubjects(req, res, next) {
    try {
      const mappings = await SubjectService.getStandardSubjects(req.query.standard_id);
      return ApiResponse.success(res, mappings, 'Standard subject mappings fetched');
    } catch (error) {
      next(error);
    }
  }

  static async mapSubjectToStandard(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const mapped = await SubjectService.mapSubjectToStandard(req.body, req.user.id, ipAddress);
      return ApiResponse.success(res, mapped, 'Subject mapped to standard successfully');
    } catch (error) {
      next(error);
    }
  }

  static async removeSubjectFromStandard(req, res, next) {
    try {
      const { standard_id, subject_id } = req.params;
      const ipAddress = req.ip || req.connection.remoteAddress;
      const result = await SubjectService.removeSubjectFromStandard(
        standard_id,
        subject_id,
        req.user.id,
        ipAddress
      );
      return ApiResponse.success(res, result, 'Subject removed from standard');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SubjectController;
