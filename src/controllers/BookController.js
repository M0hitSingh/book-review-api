const Book = require('../models/Book');
const Review = require('../models/Review');
const { successHandler } = require('../utils/responseHandler');
const CustomError = require('../utils/customError');
const asyncHandler = require('../utils/asyncHandler');
const { parsePaginationParams, createPaginationMeta } = require('../utils/pagination');
const { calculateAverageRating } = require('../utils/reviewUtils');

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

/**
 * Get all books with pagination and filtering
 * @route GET /api/books
 */
const getBooks = asyncHandler(async (req, res) => {
  const { author, genre } = req.query;
  const { page, limit, skip } = parsePaginationParams(req.query);
  const filter = {};

  if (author) {
    filter.author = { $regex: author, $options: 'i' };
  }
  if (genre) {
    filter.genre = { $regex: genre, $options: 'i' };
  }

  const totalCount = await Book.countDocuments(filter);

  const books = await Book.find(filter)
    .populate('createdBy', 'username email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const pagination = createPaginationMeta(totalCount, page, limit);

  successHandler(res, {
    books,
    pagination
  }, 'Books retrieved successfully');
});

/**
 * Get book details by ID with reviews
 * @route GET /api/books/:id
 */
const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { page, limit, skip } = parsePaginationParams(req.query);

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new CustomError('Invalid book ID format', 400);
  }

  const book = await Book.findById(id)
    .populate('createdBy', 'username email')
    .lean();

  if (!book) {
    throw new CustomError('Book not found', 404);
  }
  const ratingData = await calculateAverageRating(id);
  const totalReviews = await Review.countDocuments({ bookId: id });

  const reviews = await Review.find({ bookId: id })
    .populate('userId', 'username')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const reviewsPagination = createPaginationMeta(totalReviews, page, limit);
  const bookWithReviews = {
    ...book,
    averageRating: ratingData.averageRating,
    totalReviews: ratingData.totalReviews,
    reviews,
    reviewsPagination
  };

  successHandler(res, {
    book: bookWithReviews
  }, 'Book details retrieved successfully');
});

module.exports = {
  addBook,
  getBooks,
  getBookById
};