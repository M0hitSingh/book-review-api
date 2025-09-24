const successHandler = (res, data = null, message = 'Operation successful', statusCode = 200) => {
  console.info(`Success: ${message}`, { statusCode, dataPresent: !!data });
  
  const response = {
    success: true,
    message,
    ...(data && { data })
  };

  return res.status(statusCode).json(response);
};

module.exports = {
  successHandler
};