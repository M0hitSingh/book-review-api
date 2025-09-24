const express = require('express');
const { searchBooks } = require('../controllers/BookController');
const { validateSearch } = require('../middleware/validation');

const router = express.Router();

/**
 * @route GET /api/search
 * @desc Search books by title or author
 * @access Public
 */
router.get('/', validateSearch, searchBooks);

module.exports = router;