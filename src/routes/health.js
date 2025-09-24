const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//  Health check endpoint for testing API availability and database connection
router.get('/health', (req, res) => {
  try {
    const healthCheck = {
      message: 'API is running',
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      environment: process.env.NODE_ENV || 'development'
    };
    
    res.status(200).json({
      success: true,
      data: healthCheck,
      message: 'Health check successful'
    });
  } catch (error) {
    healthCheck.message = 'Health check failed';
    res.status(503).json({
      success: false,
      data: healthCheck,
      error: error.message
    });
  }
});

module.exports = router;