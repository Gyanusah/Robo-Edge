# Backend API Documentation

## Overview
Express.js REST API with MongoDB and JWT authentication for the company website.

## Quick Start

```bash
npm install
node seed.js      # Create admin user
npm run dev       # Start server
```

Server runs on `http://localhost:5000`

## Architecture

```
src/
├── models/        # Mongoose schemas
├── routes/        # API endpoints
├── middleware/    # Auth & error handling
├── utils/         # Helper functions
└── server.js      # Main server
```

## Environment Setup

Create `.env` from `.env.example`:
```bash
cp .env.example .env
```

Update with your values:
```
MONGODB_URI=mongodb://localhost:27017/company-website
JWT_SECRET=change_this_to_random_string
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

## Database Models

### User
```js
{
  email: String (unique, required),
  password: String (hashed, required),
  role: String ('admin' | 'superadmin'),
  createdAt: Date,
  updatedAt: Date
}
```

### Notice
```js
{
  title: String (required),
  message: String (required),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Gallery
```js
{
  title: String (required),
  type: String ('photo' | 'video', required),
  url: String (required),
  cloudinaryId: String (for Cloudinary),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Testimonial
```js
{
  name: String (required),
  company: String,
  text: String (required),
  rating: Number (1-5, default: 5),
  createdAt: Date,
  updatedAt: Date
}
```

### Contact
```js
{
  name: String (required),
  email: String (required),
  phone: String,
  subject: String (required),
  message: String (required),
  isRead: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentication

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "admin@company.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "email": "admin@company.com",
    "role": "admin"
  }
}
```

#### Logout
```
POST /auth/logout
Authorization: Bearer {token}

Response:
{
  "message": "Logged out successfully"
}
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer {token}

Response:
{
  "_id": "...",
  "email": "admin@company.com",
  "role": "admin",
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Notices

#### Get All Notices
```
GET /notices

Response:
[
  {
    "_id": "...",
    "title": "Important Update",
    "message": "We are closed on holidays",
    "isActive": true,
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

#### Create Notice
```
POST /notices
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "New Notice",
  "message": "Notice message here"
}

Response: Created notice object
```

#### Update Notice
```
PUT /notices/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "message": "Updated message"
}

Response: Updated notice object
```

#### Delete Notice
```
DELETE /notices/{id}
Authorization: Bearer {token}

Response:
{
  "message": "Notice deleted"
}
```

### Gallery

#### Get All Items
```
GET /gallery

Response:
[
  {
    "_id": "...",
    "title": "Project Photo",
    "type": "photo",
    "url": "https://...",
    "description": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

#### Upload Item
```
POST /gallery/upload
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "My Photo",
  "type": "photo",
  "url": "https://cloudinary.../image.jpg",
  "description": "Photo description"
}

Response: Created item object
```

#### Update Item
```
PUT /gallery/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}

Response: Updated item object
```

#### Delete Item
```
DELETE /gallery/{id}
Authorization: Bearer {token}

Response:
{
  "message": "Item deleted"
}
```

### Testimonials

#### Get All Testimonials
```
GET /testimonials

Response:
[
  {
    "_id": "...",
    "name": "John Doe",
    "company": "Tech Corp",
    "text": "Great service!",
    "rating": 5,
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

#### Create Testimonial
```
POST /testimonials
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Smith",
  "company": "Design Inc",
  "text": "Excellent work!",
  "rating": 5
}

Response: Created testimonial object
```

#### Update Testimonial
```
PUT /testimonials/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "text": "Updated review",
  "rating": 4
}

Response: Updated testimonial object
```

#### Delete Testimonial
```
DELETE /testimonials/{id}
Authorization: Bearer {token}

Response:
{
  "message": "Testimonial deleted"
}
```

### Contact

#### Send Contact Message
```
POST /contact/send
Content-Type: application/json

{
  "name": "John",
  "email": "john@example.com",
  "phone": "555-1234",
  "subject": "Inquiry",
  "message": "I would like to know more..."
}

Response:
{
  "message": "Message sent successfully",
  "contact": { ... }
}
```

#### Get All Messages
```
GET /contact/messages
Authorization: Bearer {token}

Response:
[
  {
    "_id": "...",
    "name": "John",
    "email": "john@example.com",
    "phone": "555-1234",
    "subject": "Inquiry",
    "message": "Message content",
    "isRead": false,
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

#### Mark as Read
```
PUT /contact/{id}/read
Authorization: Bearer {token}

Response: Updated contact object
```

#### Delete Message
```
DELETE /contact/{id}
Authorization: Bearer {token}

Response:
{
  "message": "Message deleted"
}
```

## Authentication

### JWT Token
- Created on login
- Expires in 7 days (configurable)
- Sent in `Authorization: Bearer {token}` header

### Protected Routes
All routes with `Authorization` header requirement are protected by the `protect` middleware.

### Token Structure
```js
{
  id: userId,
  iat: issuedAt,
  exp: expiresAt
}
```

## Error Handling

All errors return consistent format:
```json
{
  "message": "Error description"
}
```

Status codes:
- `200` - Success
- `201` - Created
- `400` - Bad request
- `401` - Unauthorized
- `404` - Not found
- `500` - Server error

## Middleware

### protect
- Validates JWT token
- Attaches user to request
- Returns 401 if invalid

### errorHandler
- Catches all errors
- Returns formatted response
- Logs errors in development

## Database Connection

MongoDB connection string format:
```
mongodb://localhost:27017/company-website
mongodb+srv://user:pass@cluster.mongodb.net/company-website
```

## Seeding Database

Create default admin user:
```bash
node seed.js
```

Credentials:
- Email: `admin@company.com`
- Password: `password123`

## Production Checklist

- [ ] Change JWT_SECRET to random string
- [ ] Set NODE_ENV=production
- [ ] Use MongoDB Atlas (not local)
- [ ] Add Cloudinary credentials
- [ ] Enable CORS for frontend domain only
- [ ] Set secure cookies (HTTPS only)
- [ ] Change default admin password
- [ ] Add rate limiting
- [ ] Set up logging
- [ ] Add backup strategy

## Security Features

✅ Password hashing with bcrypt
✅ JWT token authentication
✅ Protected admin routes
✅ Input validation
✅ CORS enabled
✅ No sensitive data in responses

## Performance Tips

- Index frequently queried fields
- Use pagination for large datasets
- Cache static data
- Optimize MongoDB queries
- Use connection pooling

## Deployment

### Environment Variables
Set in hosting platform:
```
MONGODB_URI=...
JWT_SECRET=...
NODE_ENV=production
PORT=5000
```

### Run Production
```bash
npm install
npm start
```

## Troubleshooting

### MongoDB Connection Error
```
MongooseError: Cannot connect
```
- Check MongoDB is running
- Verify connection string in .env

### JWT Token Invalid
```
401: Invalid token
```
- Token may be expired (7 days)
- Check JWT_SECRET matches
- Verify Bearer format in header

### CORS Error
```
Access-Control-Allow-Origin header missing
```
- Check frontend URL in CORS config
- Verify server is running

### Port Already in Use
```
EADDRINUSE: address already in use :::5000
```
- Kill process on port 5000
- Or change PORT in .env

## API Testing

Use Postman or cURL:
```bash
# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@company.com","password":"password123"}'

# Get notices with token
curl -X GET http://localhost:5000/notices \
  -H "Authorization: Bearer eyJhbGc..."
```

## Contributing

Follow these guidelines:
- Use descriptive variable names
- Add comments for complex logic
- Validate all inputs
- Handle errors gracefully
- Test before committing

## License

MIT License
