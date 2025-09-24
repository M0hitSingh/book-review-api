const express = require('express');
const cors = require('cors');

function configureExpress() {
  console.info("Configuring Express Server")
  try{
    const app = express();
    app.use(cors({
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true
    }));
    
    app.use(express.json());
    
    app.use((req, res, next) => {
      console.info(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });
    
    return app;
  } catch (err){
    console.error(err)
    throw Error(err)
  }
}

module.exports = configureExpress;