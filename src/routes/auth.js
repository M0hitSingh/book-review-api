const express = require('express');
const { signup, login } = require('../controllers/AuthController');
const { validateSignup, validateLogin } = require('../middleware/validation');

const router = express.Router();

/**
 * @route POST /api/auth/signup
 * @desc Register a new user
 * @access Public
 */
router.post('/signup', validateSignup, signup);

/**
 * @route POST /api/auth/login
 * @desc Login user
 * @access Public
 */
router.post('/login', validateLogin, login);

module.exports = router;