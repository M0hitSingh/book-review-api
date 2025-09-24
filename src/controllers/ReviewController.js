const Review = require('../models/Review');
const Book = require('../models/Book');
const { successHandler } = require('../utils/responseHandler');
const CustomError = require('../utils/customError');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Create a new review for a book
 * @route POST /api/books/:bookId/reviews
 */
const createReview = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.id;

  // Check if book exists
  const book = await Book.findById(bookId);
  if (!book) {
    throw new CustomError('Book not found', 404);
  }

  // Check if user has already reviewed this book
  const existingReview = await Review.findOne({ bookId, userId });
  if (existingReview) {
    throw new CustomError('You have already reviewed this book. You can update your existing review instead.', 409);
  }


  const review = new Review({
    bookId,
    userId,
    rating,
    comment: comment?.trim()
  });
  await review.save();
  await review.populate('userId', 'username');

  successHandler(res, {
    review
  }, 'Review created successfully', 201);
});

module.exports = {
  createReview
};