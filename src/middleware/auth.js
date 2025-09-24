const { verifyToken, extractTokenFromHeader } = require('../utils/auth');
const User = require('../models/User');
const { createError } = require('../utils/responseHandler');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return next(createError(401, 'Access token is required'));
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      return next(createError(401, error.message));
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(createError(401, 'User not found'));
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication middleware error:', error);
    next(createError(500, 'Authentication failed'));
  }
};

/**
 * Authorization middleware to check if user owns a resource
 * Should be used after authenticate middleware
 * @param {string} resourceUserField - Field name that contains the user ID in the resource
 */
const authorize = (resourceUserField = 'userId') => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return next(createError(401, 'Authentication required'));
      }

      const resourceId = req.params.id;
      
      req.checkOwnership = async (resource) => {
        if (!resource) {
          throw createError(404, 'Resource not found');
        }
        
        const resourceUserId = resource[resourceUserField];
        if (!resourceUserId || resourceUserId.toString() !== req.user._id.toString()) {
          throw createError(403, 'Access denied: You can only modify your own resources');
        }
        
        return true;
      };

      next();
    } catch (error) {
      console.error('Authorization middleware error:', error);
      next(createError(500, 'Authorization failed'));
    }
  };
};


module.exports = {
  authenticate,
  authorize,
};