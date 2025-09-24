const express = require('express');
const mongoose = require('mongoose');
const { successHandler, CustomError } = require('../utils');
const router = express.Router();

//  Health check endpoint for testing API availability and database connection
router.get('/health', (req, res, next) => {
  try {
    const healthCheck = {
      message: 'API is running',
      database: 'connected',
      environment: process.env.NODE_ENV || 'development'
    };

    if (mongoose.connection.readyState !== 1) {
      throw new CustomError('Database connection failed', 503);
    }

    successHandler(res, healthCheck, 'Health check successful');
  } catch (error) {
    next(error);
  }
});

module.exports = router;