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

## Additional Documentation

- **[Setup Guide](docs/SETUP_GUIDE.md)** - Detailed installation and setup instructions
- **[API Examples](docs/API_EXAMPLES.md)** - Comprehensive API usage examples with curl and JavaScript
- **[Database Schema](docs/DATABASE_SCHEMA.md)** - Detailed database schema documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.