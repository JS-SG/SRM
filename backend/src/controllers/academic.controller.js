const AcademicService = require('../services/academic.service');
const ApiResponse = require('../utils/apiResponse');

class AcademicController {
  // Academic Years
  static async getAcademicYears(req, res, next) {
    try {
      const years = await AcademicService.getAcademicYears();
      return ApiResponse.success(res, years, 'Academic years fetched');
    } catch (error) {
      next(error);
    }
  }

  static async createAcademicYear(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const year = await AcademicService.createAcademicYear(req.body, req.user.id, ipAddress);
      return ApiResponse.created(res, year, 'Academic year created');
    } catch (error) {
      next(error);
    }
  }

  static async setCurrentAcademicYear(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const year = await AcademicService.setCurrentAcademicYear(req.params.id, req.user.id, ipAddress);
      return ApiResponse.success(res, year, 'Active academic year updated');
    } catch (error) {
      next(error);
    }
  }

  // Standards & Divisions
  static async getStandards(req, res, next) {
    try {
      const standards = await AcademicService.getStandards();
      return ApiResponse.success(res, standards, 'Standards fetched');
    } catch (error) {
      next(error);
    }
  }

  static async createStandard(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const standard = await AcademicService.createStandard(req.body, req.user.id, ipAddress);
      return ApiResponse.created(res, standard, 'Standard created');
    } catch (error) {
      next(error);
    }
  }

  static async getDivisions(req, res, next) {
    try {
      const divisions = await AcademicService.getDivisions();
      return ApiResponse.success(res, divisions, 'Divisions fetched');
    } catch (error) {
      next(error);
    }
  }

  static async createDivision(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const division = await AcademicService.createDivision(req.body, req.user.id, ipAddress);
      return ApiResponse.created(res, division, 'Division created');
    } catch (error) {
      next(error);
    }
  }

  // Classes
  static async getClasses(req, res, next) {
    try {
      const classes = await AcademicService.getClasses(req.query);
      return ApiResponse.success(res, classes, 'Classes fetched');
    } catch (error) {
      next(error);
    }
  }

  static async getClassById(req, res, next) {
    try {
      const classRecord = await AcademicService.getClassById(req.params.id);
      return ApiResponse.success(res, classRecord, 'Class details fetched');
    } catch (error) {
      next(error);
    }
  }

  static async createClass(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const classRecord = await AcademicService.createClass(req.body, req.user.id, ipAddress);
      return ApiResponse.created(res, classRecord, 'Class created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateClass(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const updated = await AcademicService.updateClass(req.params.id, req.body, req.user.id, ipAddress);
      return ApiResponse.success(res, updated, 'Class updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async batchCreateClasses(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const classes = await AcademicService.batchCreateClasses(req.body, req.user.id, ipAddress);
      return ApiResponse.created(res, classes, 'Batch classes created successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AcademicController;
