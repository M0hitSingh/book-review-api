const express = require('express');
const { updateReview, deleteReview } = require('../controllers/ReviewController');
const { validateUpdateReview } = require('../middleware/validation');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

/**
 * @route PUT /api/reviews/:id
 * @desc Update a review
 * @access Private (Owner only)
 */
router.put('/:id', authenticate, authorize('userId'), validateUpdateReview, updateReview);

/**
 * @route DELETE /api/reviews/:id
 * @desc Delete a review
 * @access Private (Owner only)
 */
router.delete('/:id', authenticate, authorize('userId'), deleteReview);

module.exports = router;