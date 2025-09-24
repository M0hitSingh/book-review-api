const Book = require('../models/Book');
const { successHandler } = require('../utils/responseHandler');
const CustomError = require('../utils/customError');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Add a new book
 * @route POST /api/books
 */
const addBook = asyncHandler(async (req, res) => {
  const { title, author, genre, description, isbn, publishedDate } = req.body;
  
  if (isbn) {
    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      throw new CustomError('A book with this ISBN already exists', 409);
    }
  }

  const book = new Book({
    title,
    author,
    genre,
    description,
    isbn,
    publishedDate: publishedDate ? new Date(publishedDate) : undefined,
    createdBy: req.user.id
  });

  await book.save();
  await book.populate('createdBy', 'username email');

  successHandler(res, {
    book
  }, 'Book added successfully', 201);
});

module.exports = {
  addBook
};