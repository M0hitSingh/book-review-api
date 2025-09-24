require('dotenv').config();
const configureExpress = require('./config/express');
const Database = require('./utils/database');
const healthRoutes = require('./routes/health');

async function startServer() {
  try {
    await Database.connect();
    const app = configureExpress();
    
    // Routes
    app.use('/api', healthRoutes);
 
    app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'Book Review API is running',
        version: '1.0.0',
        endpoints: {
          health: '/api/health'
        }
      });
    });

    app.use(/(.*)/, (req, res) => {
      res.status(404).json({
        success: false,
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}`
      });
    });

    // error handler
    app.use((error, req, res, next) => {
      console.error('Unhandled error:', error);
      
      res.status(error.status || 500).json({
        success: false,
        error: error.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
      });
    });
    
    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.info(`Server running on port ${PORT}`);
      console.info(`Health check: http://localhost:${PORT}/api/health`);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();