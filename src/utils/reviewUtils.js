const Review = require('../models/Review');

const calculateAverageRating = async (bookId) => {
  const result = await Review.aggregate([
    { $match: { bookId: bookId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  if (result.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0
    };
  }

  return {
    averageRating: Math.round(result[0].averageRating * 10) / 10,
    totalReviews: result[0].totalReviews
  };
};

module.exports = {
  calculateAverageRating
};