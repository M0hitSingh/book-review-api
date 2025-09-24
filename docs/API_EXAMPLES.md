# API Usage Examples

This document provides detailed examples of how to use the Book Review API endpoints with various tools and scenarios.

## Authentication Flow Example

### 1. Register a New User

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "bookworm123",
    "email": "bookworm@example.com",
    "password": "securepassword123"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6789012345",
      "username": "bookworm123",
      "email": "bookworm@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  },
  "message": "User registered successfully"
}
```

### 2. Login and Get Token

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "bookworm@example.com",
    "password": "securepassword123"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "65a1b2c3d4e5f6789012345",
      "username": "bookworm123",
      "email": "bookworm@example.com"
    }
  },
  "message": "Login successful"
}
```

## Book Management Examples

### 3. Add a New Book (Authenticated)

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "description": "An epic high fantasy novel about the quest to destroy the One Ring.",
    "isbn": "978-0544003415",
    "publishedDate": "1954-07-29"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "book": {
      "_id": "65a1b2c3d4e5f6789012346",
      "title": "The Lord of the Rings",
      "author": "J.R.R. Tolkien",
      "genre": "Fantasy",
      "description": "An epic high fantasy novel about the quest to destroy the One Ring.",
      "isbn": "978-0544003415",
      "publishedDate": "1954-07-29T00:00:00.000Z",
      "createdBy": "65a1b2c3d4e5f6789012345",
      "createdAt": "2024-01-15T10:35:00.000Z"
    }
  },
  "message": "Book added successfully"
}
```

### 4. Get All Books with Filtering

```bash
# Get all fantasy books, page 1, limit 5
curl "http://localhost:3000/api/books?genre=Fantasy&page=1&limit=5"

# Get books by specific author
curl "http://localhost:3000/api/books?author=Tolkien&page=1&limit=10"

# Get all books with default pagination
curl "http://localhost:3000/api/books"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "books": [
      {
        "_id": "65a1b2c3d4e5f6789012346",
        "title": "The Lord of the Rings",
        "author": "J.R.R. Tolkien",
        "genre": "Fantasy",
        "description": "An epic high fantasy novel...",
        "isbn": "978-0544003415",
        "publishedDate": "1954-07-29T00:00:00.000Z",
        "createdBy": "65a1b2c3d4e5f6789012345",
        "createdAt": "2024-01-15T10:35:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalBooks": 12,
      "hasNext": true,
      "hasPrev": false
    }
  },
  "message": "Books retrieved successfully"
}
```

### 5. Get Book Details with Reviews

```bash
curl "http://localhost:3000/api/books/65a1b2c3d4e5f6789012346?page=1&limit=5"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "book": {
      "_id": "65a1b2c3d4e5f6789012346",
      "title": "The Lord of the Rings",
      "author": "J.R.R. Tolkien",
      "genre": "Fantasy",
      "description": "An epic high fantasy novel...",
      "isbn": "978-0544003415",
      "publishedDate": "1954-07-29T00:00:00.000Z",
      "averageRating": 4.7,
      "totalReviews": 15,
      "createdBy": "65a1b2c3d4e5f6789012345",
      "createdAt": "2024-01-15T10:35:00.000Z"
    },
    "reviews": [
      {
        "_id": "65a1b2c3d4e5f6789012347",
        "rating": 5,
        "comment": "Absolutely masterful storytelling! A timeless classic.",
        "userId": {
          "_id": "65a1b2c3d4e5f6789012348",
          "username": "fantasyfan"
        },
        "createdAt": "2024-01-15T11:00:00.000Z",
        "updatedAt": "2024-01-15T11:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalReviews": 15,
      "hasNext": true,
      "hasPrev": false
    }
  },
  "message": "Book details retrieved successfully"
}
```

## Review Management Examples

### 6. Create a Review (Authenticated)

```bash
curl -X POST http://localhost:3000/api/books/65a1b2c3d4e5f6789012346/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "rating": 5,
    "comment": "One of the greatest fantasy novels ever written. Tolkien created an incredible world with rich characters and an epic story."
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "review": {
      "_id": "65a1b2c3d4e5f6789012349",
      "bookId": "65a1b2c3d4e5f6789012346",
      "userId": "65a1b2c3d4e5f6789012345",
      "rating": 5,
      "comment": "One of the greatest fantasy novels ever written. Tolkien created an incredible world with rich characters and an epic story.",
      "createdAt": "2024-01-15T11:30:00.000Z",
      "updatedAt": "2024-01-15T11:30:00.000Z"
    }
  },
  "message": "Review created successfully"
}
```

### 7. Update a Review (Owner Only)

```bash
curl -X PUT http://localhost:3000/api/reviews/65a1b2c3d4e5f6789012349 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "rating": 4,
    "comment": "Great book, though it can be slow at times. Still a classic worth reading."
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "review": {
      "_id": "65a1b2c3d4e5f6789012349",
      "bookId": "65a1b2c3d4e5f6789012346",
      "userId": "65a1b2c3d4e5f6789012345",
      "rating": 4,
      "comment": "Great book, though it can be slow at times. Still a classic worth reading.",
      "createdAt": "2024-01-15T11:30:00.000Z",
      "updatedAt": "2024-01-15T12:15:00.000Z"
    }
  },
  "message": "Review updated successfully"
}
```

### 8. Delete a Review (Owner Only)

```bash
curl -X DELETE http://localhost:3000/api/reviews/65a1b2c3d4e5f6789012349 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "Review deleted successfully"
}
```

## Search Examples

### 9. Search Books by Title

```bash
# Search for books with "lord" in the title
curl "http://localhost:3000/api/search?q=lord&page=1&limit=10"

# Search for books by author name
curl "http://localhost:3000/api/search?q=tolkien&page=1&limit=5"

# Search with special characters (URL encoded)
curl "http://localhost:3000/api/search?q=harry%20potter&page=1&limit=10"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "books": [
      {
        "_id": "65a1b2c3d4e5f6789012346",
        "title": "The Lord of the Rings",
        "author": "J.R.R. Tolkien",
        "genre": "Fantasy",
        "description": "An epic high fantasy novel...",
        "createdAt": "2024-01-15T10:35:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalBooks": 1,
      "hasNext": false,
      "hasPrev": false
    },
    "searchQuery": "lord"
  },
  "message": "Search completed successfully"
}
```

## Error Handling Examples

### 10. Validation Errors

```bash
# Missing required fields
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ab",
    "email": "invalid-email",
    "password": "123"
  }'
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "username": "Username must be at least 3 characters long",
    "email": "Please enter a valid email",
    "password": "Password must be at least 6 characters long"
  }
}
```

### 11. Authentication Errors

```bash
# Missing token
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Book",
    "author": "Test Author",
    "genre": "Test Genre"
  }'
```

**Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": "Authentication required",
  "message": "Access token is required"
}
```

### 12. Authorization Errors

```bash
# Trying to update another user's review
curl -X PUT http://localhost:3000/api/reviews/65a1b2c3d4e5f6789012349 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer different_user_token..." \
  -d '{
    "rating": 1,
    "comment": "Trying to modify someone else review"
  }'
```

**Response (403 Forbidden):**
```json
{
  "success": false,
  "error": "Access denied",
  "message": "You can only modify your own reviews"
}
```

### 13. Not Found Errors

```bash
# Non-existent book ID
curl "http://localhost:3000/api/books/65a1b2c3d4e5f6789999999"
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Resource not found",
  "message": "Book not found"
}
```

### 14. Duplicate Resource Errors

```bash
# Trying to create a second review for the same book
curl -X POST http://localhost:3000/api/books/65a1b2c3d4e5f6789012346/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "rating": 3,
    "comment": "Second review attempt"
  }'
```

**Response (409 Conflict):**
```json
{
  "success": false,
  "error": "Duplicate resource",
  "message": "You have already reviewed this book"
}
```

## JavaScript/Node.js Examples

### Using axios in Node.js

```javascript
const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';
let authToken = '';

// Register and login
async function authenticateUser() {
  try {
    // Register
    const signupResponse = await axios.post(`${API_BASE_URL}/auth/signup`, {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('User registered:', signupResponse.data);
    
    // Login
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    
    authToken = loginResponse.data.data.token;
    console.log('Login successful, token received');
    
    return authToken;
  } catch (error) {
    console.error('Authentication error:', error.response?.data || error.message);
  }
}

// Add a book
async function addBook() {
  try {
    const response = await axios.post(`${API_BASE_URL}/books`, {
      title: 'Sample Book',
      author: 'Sample Author',
      genre: 'Fiction',
      description: 'A sample book for testing'
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Book added:', response.data);
    return response.data.data.book._id;
  } catch (error) {
    console.error('Add book error:', error.response?.data || error.message);
  }
}

// Get books with filtering
async function getBooks() {
  try {
    const response = await axios.get(`${API_BASE_URL}/books`, {
      params: {
        page: 1,
        limit: 10,
        genre: 'Fiction'
      }
    });
    
    console.log('Books retrieved:', response.data);
    return response.data.data.books;
  } catch (error) {
    console.error('Get books error:', error.response?.data || error.message);
  }
}

// Search books
async function searchBooks(query) {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: {
        q: query,
        page: 1,
        limit: 10
      }
    });
    
    console.log('Search results:', response.data);
    return response.data.data.books;
  } catch (error) {
    console.error('Search error:', error.response?.data || error.message);
  }
}

// Usage example
async function main() {
  await authenticateUser();
  const bookId = await addBook();
  await getBooks();
  await searchBooks('sample');
}

main();
```

## Frontend Integration Examples

### Using fetch in the browser

```javascript
class BookReviewAPI {
  constructor(baseURL = 'http://localhost:3000/api') {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('authToken');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    
    this.token = response.data.token;
    localStorage.setItem('authToken', this.token);
    return response;
  }

  async getBooks(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/books?${params}`);
  }

  async addBook(bookData) {
    return this.request('/books', {
      method: 'POST',
      body: JSON.stringify(bookData)
    });
  }

  async createReview(bookId, reviewData) {
    return this.request(`/books/${bookId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  }

  async searchBooks(query, page = 1, limit = 10) {
    const params = new URLSearchParams({ q: query, page, limit });
    return this.request(`/search?${params}`);
  }
}

// Usage
const api = new BookReviewAPI();

// Login and use the API
api.login('user@example.com', 'password123')
  .then(() => api.getBooks({ genre: 'Fiction', page: 1, limit: 5 }))
  .then(response => console.log('Books:', response.data.books))
  .catch(error => console.error('Error:', error));
```

## Health Check and Monitoring

### Health Check Endpoint

```bash
curl http://localhost:3000/api/health
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "OK",
    "timestamp": "2024-01-15T12:00:00.000Z",
    "database": "connected",
    "uptime": 3600
  },
  "message": "API is healthy"
}
```

### Root Endpoint Information

```bash
curl http://localhost:3000/
```

**Response:**
```json
{
  "success": true,
  "data": {
    "version": "1.0.0",
    "endpoints": {
      "health": "/api/health",
      "signup": "/api/auth/signup",
      "login": "/api/auth/login",
      "books": "/api/books",
      "reviews": "/api/reviews",
      "search": "/api/search"
    }
  },
  "message": "Book Review API is running"
}
```