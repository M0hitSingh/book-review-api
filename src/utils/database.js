const mongoose = require('mongoose');

class Database {
  static async connect() {
    try {
      const mongoUri = process.env.MONGODB_URI;
      
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true
      });
      
      console.info('Connected to MongoDB successfully');
      
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error.message);
      process.exit(1);
    }
  }
}

module.exports = Database;