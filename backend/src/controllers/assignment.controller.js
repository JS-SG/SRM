const AssignmentService = require('../services/assignment.service');
const ApiResponse = require('../utils/apiResponse');

class AssignmentController {
  static async getAssignmentsByClass(req, res, next) {
    try {
      const assignments = await AssignmentService.getAssignmentsByClass(req.params.class_id);
      return ApiResponse.success(res, assignments, 'Class staff assignments fetched');
    } catch (error) {
      next(error);
    }
  }

  static async getAssignmentsByStaff(req, res, next) {
    try {
      const staffId = req.params.staff_id || req.user.staff_id;
      const assignments = await AssignmentService.getAssignmentsByStaff(staffId);
      return ApiResponse.success(res, assignments, 'Staff assignments fetched');
    } catch (error) {
      next(error);
    }
  }

  static async assignTeacher(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const assignment = await AssignmentService.assignTeacher(req.body, req.user.id, ipAddress);
      return ApiResponse.created(res, assignment, 'Teacher assigned to class successfully');
    } catch (error) {
      next(error);
    }
  }

  static async removeAssignment(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const result = await AssignmentService.removeAssignment(req.params.id, req.user.id, ipAddress);
      return ApiResponse.success(res, result, 'Teacher assignment removed');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AssignmentController;
