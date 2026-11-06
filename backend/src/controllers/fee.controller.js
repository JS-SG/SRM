const FeeService = require('../services/fee.service');
const ApiResponse = require('../utils/apiResponse');

class FeeController {
  static async getFeeTypes(req, res, next) {
    try {
      const feeTypes = await FeeService.getFeeTypes();
      return ApiResponse.success(res, feeTypes, 'Fee types fetched');
    } catch (error) {
      next(error);
    }
  }

  static async createFeeType(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const feeType = await FeeService.createFeeType(req.body, req.user.id, ipAddress);
      return ApiResponse.created(res, feeType, 'Fee type created');
    } catch (error) {
      next(error);
    }
  }

  static async getStudentFees(req, res, next) {
    try {
      const result = await FeeService.getStudentFees(req.query);
      return ApiResponse.success(res, result.fees, 'Student fees fetched', 200, result.pagination);
    } catch (error) {
      next(error);
    }
  }

  static async assignFee(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const result = await FeeService.assignFee(req.body, req.user.id, ipAddress);
      return ApiResponse.created(res, result, 'Fees assigned successfully');
    } catch (error) {
      next(error);
    }
  }

  static async recordPayment(req, res, next) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const result = await FeeService.recordPayment(req.body, req.user.id, ipAddress);
      return ApiResponse.created(res, result, 'Payment recorded successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FeeController;
