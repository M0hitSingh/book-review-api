const express = require('express');
const { addBook } = require('../controllers/BookController');
const { validateAddBook } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * @route POST /api/books
 * @desc Add a new book
 * @access Private
 */
router.post('/', authenticate, validateAddBook, addBook);

module.exports = router;