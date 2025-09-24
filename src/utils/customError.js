/**
 * Custom error class for application-specific errors
 * Allows setting custom status codes and messages
 */
class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'CustomError';
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;