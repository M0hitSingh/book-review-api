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

const validateAddBook = (req, res, next) => {
  const { title, author, genre, description, isbn, publishedDate } = req.body;

  // Check required fields
  if (!title || !author || !genre) {
    throw new CustomError('Title, author, and genre are required', 400);
  }

  // Validate title
  if (typeof title !== 'string' || title.trim().length === 0) {
    throw new CustomError('Title is required', 400);
  }
  if (title.trim().length > 200) {
    throw new CustomError('Title cannot exceed 200 characters', 400);
  }

  // Validate author
  if (typeof author !== 'string' || author.trim().length === 0) {
    throw new CustomError('Author is required', 400);
  }
  if (author.trim().length > 100) {
    throw new CustomError('Author name cannot exceed 100 characters', 400);
  }

  // Validate genre
  if (typeof genre !== 'string' || genre.trim().length === 0) {
    throw new CustomError('Genre is required', 400);
  }
  if (genre.trim().length > 50) {
    throw new CustomError('Genre cannot exceed 50 characters', 400);
  }

  // Validate optional description
  if (description !== undefined) {
    if (typeof description !== 'string') {
      throw new CustomError('Description must be a string', 400);
    }
    if (description.trim().length > 1000) {
      throw new CustomError('Description cannot exceed 1000 characters', 400);
    }
  }

  // Validate optional ISBN
  if (isbn !== undefined) {
    if (typeof isbn !== 'string') {
      throw new CustomError('ISBN must be a string', 400);
    }
    const isbnRegex = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;
    if (isbn.trim().length > 0 && !isbnRegex.test(isbn.trim())) {
      throw new CustomError('Please enter a valid ISBN', 400);
    }
  }

  // Validate optional published date
  if (publishedDate !== undefined) {
    if (typeof publishedDate !== 'string') {
      throw new CustomError('Published date must be a string', 400);
    }
    const date = new Date(publishedDate);
    if (isNaN(date.getTime())) {
      throw new CustomError('Please enter a valid published date', 400);
    }
    if (date > new Date()) {
      throw new CustomError('Published date cannot be in the future', 400);
    }
  }

  // Sanitize inputs
  req.body.title = title.trim();
  req.body.author = author.trim();
  req.body.genre = genre.trim();
  if (description !== undefined) {
    req.body.description = description.trim() || undefined;
  }
  if (isbn !== undefined) {
    req.body.isbn = isbn.trim() || undefined;
  }

  next();
};

const validateBookQuery = (req, res, next) => {
  const { author, genre, page, limit } = req.query;

  // Validate author filter if provided
  if (author !== undefined) {
    if (typeof author !== 'string') {
      throw new CustomError('Author filter must be a string', 400);
    }
    if (author.trim().length === 0) {
      throw new CustomError('Author filter cannot be empty', 400);
    }
    if (author.trim().length > 100) {
      throw new CustomError('Author filter cannot exceed 100 characters', 400);
    }
    req.query.author = author.trim();
  }

  // Validate genre filter if provided
  if (genre !== undefined) {
    if (typeof genre !== 'string') {
      throw new CustomError('Genre filter must be a string', 400);
    }
    if (genre.trim().length === 0) {
      throw new CustomError('Genre filter cannot be empty', 400);
    }
    if (genre.trim().length > 50) {
      throw new CustomError('Genre filter cannot exceed 50 characters', 400);
    }
    req.query.genre = genre.trim();
  }

  // Validate pagination parameters if provided
  if (page !== undefined) {
    const pageNum = parseInt(page, 10);
    if (isNaN(pageNum) || pageNum < 1) {
      throw new CustomError('Page must be a positive integer', 400);
    }
  }

  if (limit !== undefined) {
    const limitNum = parseInt(limit, 10);
    if (isNaN(limitNum) || limitNum < 1) {
      throw new CustomError('Limit must be a positive integer', 400);
    }
    if (limitNum > 100) {
      throw new CustomError('Limit cannot exceed 100', 400);
    }
  }

  next();
};

const validateCreateReview = (req, res, next) => {
  const { rating, comment } = req.body;

  // Check required fields
  if (!rating) {
    throw new CustomError('Rating is required', 400);
  }

  // Validate rating
  if (typeof rating !== 'number' || !Number.isInteger(rating)) {
    throw new CustomError('Rating must be an integer', 400);
  }

  if (rating < 1 || rating > 5) {
    throw new CustomError('Rating must be between 1 and 5', 400);
  }

  // Validate optional comment
  if (comment !== undefined) {
    if (typeof comment !== 'string') {
      throw new CustomError('Comment must be a string', 400);
    }
    if (comment.trim().length > 1000) {
      throw new CustomError('Comment cannot exceed 1000 characters', 400);
    }
  }

  next();
};

module.exports = {
  validateSignup,
  validateLogin,
  validateAddBook,
  validateBookQuery,
  validateCreateReview
};