const CustomError = require('./customError');

const parsePaginationParams = (query) => {
  const { page = 1, limit = 10 } = query;
  
  // Parse page number
  const pageNum = parseInt(page, 10);
  if (isNaN(pageNum) || pageNum < 1) {
    throw new CustomError('Page must be a positive integer', 400);
  }
  
  // Parse limit
  const limitNum = parseInt(limit, 10);
  if (isNaN(limitNum) || limitNum < 1) {
    throw new CustomError('Limit must be a positive integer', 400);
  }
  
  // Set maximum limit to prevent abuse
  const maxLimit = 100;
  if (limitNum > maxLimit) {
    throw new CustomError(`Limit cannot exceed ${maxLimit}`, 400);
  }
  
  const skip = (pageNum - 1) * limitNum;
  
  return {
    page: pageNum,
    limit: limitNum,
    skip
  };
};

const createPaginationMeta = (totalCount, page, limit) => {
  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  
  return {
    currentPage: page,
    totalPages,
    totalCount,
    hasNextPage,
    hasPrevPage,
    nextPage: hasNextPage ? page + 1 : null,
    prevPage: hasPrevPage ? page - 1 : null
  };
};

module.exports = {
  parsePaginationParams,
  createPaginationMeta
};