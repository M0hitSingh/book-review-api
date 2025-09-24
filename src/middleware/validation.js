const CustomError = require('../utils/customError');

const isValidEmail = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

const validateSignup = (req, res, next) => {
  const { username, email, password } = req.body;

  // Check required fields
  if (!username || !email || !password) {
    throw new CustomError('Username, email, and password are required', 400);
  }

  // Validate username
  if (typeof username !== 'string' || username.trim().length < 3) {
    throw new CustomError('Username must be at least 3 characters long', 400);
  }

  if (username.trim().length > 30) {
    throw new CustomError('Username cannot exceed 30 characters', 400);
  }

  // Validate email
  if (typeof email !== 'string' || !isValidEmail(email.trim())) {
    throw new CustomError('Please enter a valid email address', 400);
  }

  // Validate password
  if (typeof password !== 'string' || password.length < 6) {
    throw new CustomError('Password must be at least 6 characters long', 400);
  }

  // Sanitize inputs
  req.body.username = username.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.password = password;

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  // Check required fields
  if (!email || !password) {
    throw new CustomError('Email and password are required', 400);
  }

  // Validate email format
  if (typeof email !== 'string' || !isValidEmail(email.trim())) {
    throw new CustomError('Please enter a valid email address', 400);
  }

  // Validate password
  if (typeof password !== 'string' || password.length === 0) {
    throw new CustomError('Password is required', 400);
  }

  // Sanitize inputs
  req.body.email = email.trim().toLowerCase();
  req.body.password = password;

  next();
};

module.exports = {
  validateSignup,
  validateLogin
};