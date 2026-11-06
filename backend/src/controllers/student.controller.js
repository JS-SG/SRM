const StudentService = require('../services/student.service');
const ApiResponse = require('../utils/apiResponse');

class StudentController {
  static async getAllStudents(req, res, next) {
    try {
      const result = await StudentService.getAllStudents(req.query);
      return ApiResponse.success(res, result.students, 'Students fetched', 200, result.pagination);
    } catch (error) {
      next(error);
    }
  }

  static async getStudentById(req, res, next) {
    try {
      const student = await StudentService.getStudentById(req.params.id);
      return ApiResponse.success(res, student, 'Student profile fetched');
    } catch (error) {
      next(error);
    }
  }

  static async createStudent(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const student = await StudentService.createStudent(req.body, req.user.id, ipAddress);
      return ApiResponse.created(res, student, 'Student admitted and enrolled successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateStudent(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const student = await StudentService.updateStudent(req.params.id, req.body, req.user.id, ipAddress);
      return ApiResponse.success(res, student, 'Student profile updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async addParent(req, res, next) {
    try {
      const { parent_data, is_primary, receives_notifications } = req.body;
      const parent = await StudentService.addParent(
        req.params.id,
        parent_data,
        is_primary,
        receives_notifications
      );
      return ApiResponse.created(res, parent, 'Parent added successfully');
    } catch (error) {
      next(error);
    }
  }

  static async enrollStudent(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const enrollment = await StudentService.enrollStudent(
        { ...req.body, student_id: req.params.id },
        req.user.id,
        ipAddress
      );
      return ApiResponse.success(res, enrollment, 'Student enrolled successfully');
    } catch (error) {
      next(error);
    }
  }

  static async toggleStatus(req, res, next) {
    try {
      const { status } = req.body;
      const ipAddress = req.ip || req.connection.remoteAddress;
      const updated = await StudentService.toggleStudentStatus(
        req.params.id,
        status,
        req.user.id,
        ipAddress
      );
      return ApiResponse.success(res, updated, 'Student status updated successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StudentController;
