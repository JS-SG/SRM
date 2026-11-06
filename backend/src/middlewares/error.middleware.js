const ApiResponse = require('../utils/apiResponse');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`, err.stack);

  // Prisma unique constraint violation
  if (err.code === 'P2002') {
    const target = err.meta?.target ? err.meta.target.toString() : 'field';
    return ApiResponse.conflict(res, `A record with this ${target} already exists.`);
  }

  // Prisma foreign key constraint violation
  if (err.code === 'P2003') {
    return ApiResponse.badRequest(res, 'Invalid related record ID provided (Foreign key violation).');
  }

  // Prisma record not found
  if (err.code === 'P2025') {
    return ApiResponse.notFound(res, 'The requested record was not found or has been removed.');
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return ApiResponse.unauthorized(res, 'Invalid authentication token.');
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'An internal server error occurred';

  return ApiResponse.error(res, message, statusCode);
};

module.exports = errorHandler;
