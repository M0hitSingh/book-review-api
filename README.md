# Book Review API

A RESTful API for a Book Review system built with Node.js, Express.js, and MongoDB. The system allows users to register, authenticate, manage books, and submit reviews with JWT-based authentication.

## Features

- User registration and authentication with JWT
- Book management (create, read, search)
- Review system with ratings (create, read, update, delete)
- Search functionality for books by title or author
- Pagination and filtering for book listings
- Authorization controls for protected operations
- Comprehensive error handling and validation

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Environment Management:** dotenv

## Project Structure

```
src/
├── controllers/     # Request handlers
│   ├── AuthController.js
│   ├── BookController.js
│   └── ReviewController.js
├── middleware/      # Authentication, validation, error handling
│   ├── auth.js
│   ├── errorHandler.js
│   ├── index.js
│   └── validation.js
├── models/         # Mongoose schemas
│   ├── User.js
│   ├── Book.js
│   └── Review.js
├── routes/         # API route definitions
│   ├── auth.js
│   ├── books.js
│   ├── health.js
│   ├── reviews.js
│   └── search.js
├── utils/          # Helper functions and handlers
│   ├── asyncHandler.js
│   ├── auth.js
│   ├── customError.js
│   ├── database.js
│   ├── pagination.js
│   ├── responseHandler.js
│   └── reviewUtils.js
├── config/         # Configuration files
│   └── express.js
└── app.js          # Express app configuration and server startup
```

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd book-review-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Copy the example environment file and configure your settings:
   ```bash
   cp .env.example .env
   ```

4. **Configure MongoDB**
   
   Update the `.env` file with your MongoDB connection string:
   - For local MongoDB: `mongodb://localhost:27017/book-review-api`
   - For MongoDB Atlas: Use your Atlas connection string

5. **Start the server**
   
   For development (with auto-restart):
   ```bash
   npm run dev
   ```
   
   For production:
   ```bash
   npm start
   ```

6. **Verify installation**
   
   Visit `http://localhost:3000/api/health` to check if the API is running.



## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "details": {...} // Only in development mode
}
```

### Authentication

Protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### API Endpoints

#### Health Check
- **GET** `/api/health`
- **Description:** Check API health status
- **Access:** Public

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "OK",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "database": "connected"
  },
  "message": "API is healthy"
}
```

#### Authentication Endpoints

##### Register User
- **POST** `/api/auth/signup`
- **Description:** Register a new user account
- **Access:** Public

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "user_id",
      "username": "johndoe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "message": "User registered successfully"
}
```

##### Login User
- **POST** `/api/auth/login`
- **Description:** Authenticate user and get JWT token
- **Access:** Public

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id",
      "username": "johndoe",
      "email": "john@example.com"
    }
  },
  "message": "Login successful"
}
```

#### Book Endpoints

##### Get All Books
- **GET** `/api/books`
- **Description:** Get paginated list of books with optional filtering
- **Access:** Public

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 50)
- `author` (optional): Filter by author name
- `genre` (optional): Filter by genre

**Example Request:**
```
GET /api/books?page=1&limit=10&genre=Fiction&author=Tolkien
```

**Response:**
```json
{
  "success": true,
  "data": {
    "books": [
      {
        "_id": "book_id",
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "genre": "Fiction",
        "description": "A fantasy novel...",
        "isbn": "978-0547928227",
        "publishedDate": "1937-09-21T00:00:00.000Z",
        "createdBy": "user_id",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalBooks": 45,
      "hasNext": true,
      "hasPrev": false
    }
  },
  "message": "Books retrieved successfully"
}
```

##### Get Book by ID
- **GET** `/api/books/:id`
- **Description:** Get detailed book information with reviews
- **Access:** Public

**Query Parameters:**
- `page` (optional): Page number for reviews (default: 1)
- `limit` (optional): Reviews per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "book": {
      "_id": "book_id",
      "title": "The Hobbit",
      "author": "J.R.R. Tolkien",
      "genre": "Fiction",
      "description": "A fantasy novel...",
      "averageRating": 4.5,
      "totalReviews": 25
    },
    "reviews": [
      {
        "_id": "review_id",
        "rating": 5,
        "comment": "Excellent book!",
        "userId": {
          "_id": "user_id",
          "username": "johndoe"
        },
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalReviews": 25
    }
  },
  "message": "Book details retrieved successfully"
}
```

##### Add New Book
- **POST** `/api/books`
- **Description:** Add a new book to the system
- **Access:** Private (Authentication required)

**Request Body:**
```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "genre": "Fiction",
  "description": "A fantasy novel about Bilbo Baggins...",
  "isbn": "978-0547928227",
  "publishedDate": "1937-09-21"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "book": {
      "_id": "book_id",
      "title": "The Hobbit",
      "author": "J.R.R. Tolkien",
      "genre": "Fiction",
      "description": "A fantasy novel about Bilbo Baggins...",
      "isbn": "978-0547928227",
      "publishedDate": "1937-09-21T00:00:00.000Z",
      "createdBy": "user_id",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "message": "Book added successfully"
}
```

#### Review Endpoints

##### Create Review
- **POST** `/api/books/:bookId/reviews`
- **Description:** Create a new review for a book
- **Access:** Private (Authentication required)

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Excellent book! Highly recommended."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "review": {
      "_id": "review_id",
      "bookId": "book_id",
      "userId": "user_id",
      "rating": 5,
      "comment": "Excellent book! Highly recommended.",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "message": "Review created successfully"
}
```

##### Update Review
- **PUT** `/api/reviews/:id`
- **Description:** Update an existing review (owner only)
- **Access:** Private (Authentication required, owner only)

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Good book, but could be better."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "review": {
      "_id": "review_id",
      "bookId": "book_id",
      "userId": "user_id",
      "rating": 4,
      "comment": "Good book, but could be better.",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T12:00:00.000Z"
    }
  },
  "message": "Review updated successfully"
}
```

##### Delete Review
- **DELETE** `/api/reviews/:id`
- **Description:** Delete a review (owner only)
- **Access:** Private (Authentication required, owner only)

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "Review deleted successfully"
}
```

#### Search Endpoint

##### Search Books
- **GET** `/api/search`
- **Description:** Search books by title or author
- **Access:** Public

**Query Parameters:**
- `q` (required): Search query string
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example Request:**
```
GET /api/search?q=tolkien&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": {
    "books": [
      {
        "_id": "book_id",
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "genre": "Fiction",
        "description": "A fantasy novel...",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalBooks": 15
    },
    "searchQuery": "tolkien"
  },
  "message": "Search completed successfully"
}
```

## Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  username: String (required, unique, 3-30 chars),
  email: String (required, unique, valid email format),
  password: String (required, hashed, min 6 chars),
  createdAt: Date (default: now)
}
```

**Indexes:**
- `username`: unique
- `email`: unique

### Book Collection

```javascript
{
  _id: ObjectId,
  title: String (required, max 200 chars),
  author: String (required, max 100 chars),
  genre: String (required, max 50 chars),
  description: String (optional, max 1000 chars),
  isbn: String (optional, unique, valid ISBN format),
  publishedDate: Date (optional),
  createdBy: ObjectId (ref: User, required),
  createdAt: Date (default: now)
}
```

**Indexes:**
- `title, author`: text index for search
- `genre, createdAt`: compound index
- `author, createdAt`: compound index
- `isbn`: unique sparse index

### Review Collection

```javascript
{
  _id: ObjectId,
  bookId: ObjectId (ref: Book, required),
  userId: ObjectId (ref: User, required),
  rating: Number (required, 1-5, integer),
  comment: String (optional, max 1000 chars),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

**Indexes:**
- `bookId, userId`: unique compound index (prevents duplicate reviews)
- `bookId, createdAt`: compound index
- `userId, createdAt`: compound index

## Error Handling

The API uses centralized error handling with consistent error responses:

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

### Error Response Examples

**Validation Error (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "username": "Username is required",
    "email": "Please enter a valid email"
  }
}
```

**Authentication Error (401):**
```json
{
  "success": false,
  "error": "Authentication required",
  "message": "Please provide a valid token"
}
```

**Authorization Error (403):**
```json
{
  "success": false,
  "error": "Access denied",
  "message": "You can only modify your own reviews"
}
```

**Not Found Error (404):**
```json
{
  "success": false,
  "error": "Resource not found",
  "message": "Book not found"
}
```

## Security Features

- **Password Hashing:** bcryptjs with salt rounds of 12
- **JWT Authentication:** Secure token-based authentication
- **Input Validation:** Comprehensive validation for all endpoints
- **Authorization:** Role-based access control for protected operations
- **CORS Configuration:** Configurable cross-origin resource sharing
- **Error Handling:** Secure error messages (no sensitive data exposure)

## Development

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-restart
- `npm test` - Run tests (placeholder)

### Development Guidelines

1. **Code Style:** Follow consistent JavaScript/Node.js conventions
2. **Error Handling:** Always use the centralized error handler
3. **Validation:** Validate all inputs using middleware
4. **Authentication:** Protect sensitive endpoints with JWT middleware
5. **Database:** Use Mongoose for all database operations
6. **Logging:** Use console.info for information and console.error for errors

## Testing

The API includes comprehensive error handling and validation. For testing:

1. **Health Check:** `GET /api/health`
2. **Authentication Flow:** Register → Login → Access protected endpoints
3. **CRUD Operations:** Test all book and review operations
4. **Search Functionality:** Test search with various queries
5. **Error Scenarios:** Test validation errors, authentication failures, etc.

## Deployment

### Environment Setup

1. Set `NODE_ENV=production`
2. Use a secure `JWT_SECRET`
3. Configure production MongoDB URI
4. Set appropriate `CORS_ORIGIN`
5. Use environment-specific port configuration

### Production Considerations

- Use a process manager like PM2
- Set up proper logging
- Configure reverse proxy (nginx)
- Enable HTTPS
- Set up monitoring and health checks
- Configure database backups

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.