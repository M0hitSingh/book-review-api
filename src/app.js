require('dotenv').config();
const configureExpress = require('./config/express');
const Database = require('./utils/database');
const healthRoutes = require('./routes/health');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const reviewRoutes = require('./routes/reviews');
const { errorHandler } = require('./middleware');
const { successHandler } = require('./utils');

async function startServer() {
  try {
    await Database.connect();
    const app = configureExpress();
    
    // Routes
    app.use('/api', healthRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/books', bookRoutes);
    app.use('/api/reviews', reviewRoutes);
 
    app.get('/', (req, res) => {
      successHandler(res, {
        version: '1.0.0',
        endpoints: {
          health: '/api/health',
          signup: '/api/auth/signup',
          login: '/api/auth/login',
          books: '/api/books',
          reviews: '/api/reviews'
        }
      }, 'Book Review API is running');
    });

    app.use(/(.*)/, (req, res) => {
      res.status(404).json({
        success: false,
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}`
      });
    });

    // Centralized error handler
    app.use(errorHandler);
    
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