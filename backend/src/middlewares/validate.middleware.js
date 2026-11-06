const ApiResponse = require('../utils/apiResponse');

/**
 * Zod request validation middleware
 * @param {import('zod').ZodSchema} schema
 * @param {'body'|'query'|'params'} source
 */
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req[source]);
      if (!result.success) {
        const formattedErrors = result.error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return ApiResponse.badRequest(res, 'Validation failed', formattedErrors);
      }
      req[source] = result.data;
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = validate;
