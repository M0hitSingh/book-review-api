const express = require('express');
const { addBook, getBooks, getBookById } = require('../controllers/BookController');
const { createReview } = require('../controllers/ReviewController');
const { validateAddBook, validateBookQuery, validateCreateReview } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * @route GET /api/books
 * @desc Get all books with pagination and filtering
 * @access Public
 */
router.get('/', validateBookQuery, getBooks);

/**
 * @route GET /api/books/:id
 * @desc Get book details by ID with reviews
 * @access Public
 */
router.get('/:id', validateBookQuery, getBookById);

/**
 * @route POST /api/books
 * @desc Add a new book
 * @access Private
 */
router.post('/', authenticate, validateAddBook, addBook);

/**
 * @route POST /api/books/:bookId/reviews
 * @desc Create a new review for a book
 * @access Private
 */
router.post('/:bookId/reviews', authenticate, validateCreateReview, createReview);

module.exports = router;