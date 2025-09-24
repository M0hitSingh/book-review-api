const User = require('../models/User');
const { generateToken } = require('../utils/auth');
const { successHandler } = require('../utils/responseHandler');
const CustomError = require('../utils/customError');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Register a new user
 * @route POST /api/auth/signup
 */
const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new CustomError('Email already registered', 409);
    }
    if (existingUser.username === username) {
      throw new CustomError('Username already taken', 409);
    }
  }
  const user = new User({
    username,
    email,
    password
  });

  await user.save();

  // Generate JWT token
  const token = generateToken({
    id: user._id,
    username: user.username,
    email: user.email
  });

  successHandler(res, {
    user: user.toJSON(),
    token
  }, 'User registered successfully', 201);
});

/**
 * Login user
 * @route POST /api/auth/login
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new CustomError('Invalid email or password', 401);
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new CustomError('Invalid email or password', 401);
  }

  // Generate JWT token
  const token = generateToken({
    id: user._id,
    username: user.username,
    email: user.email
  });

  successHandler(res, {
    user: user.toJSON(),
    token
  }, 'Login successful');
});

module.exports = {
  signup,
  login
};