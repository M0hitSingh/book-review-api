const successHandler = (res, data = null, message = 'Operation successful', statusCode = 200) => {
  console.info(`Success: ${message}`, { statusCode, dataPresent: !!data });
  
  const response = {
    success: true,
    message,
    ...(data && { data })
  };

  return res.status(statusCode).json(response);
};

/**
 * Create an error object with status code and message
 */
const createError = (statusCode, message, details = null) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  if (details) {
    error.details = details;
  }
  return error;
};

module.exports = {
  successHandler,
  createError
};