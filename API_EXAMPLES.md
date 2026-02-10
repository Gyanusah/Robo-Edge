# API Examples & Testing Guide

## Using the API

You can test the API using:
- **cURL** (command line)
- **Postman** (GUI client)
- **Thunder Client** (VS Code extension)
- **REST Client** (VS Code extension)

---

## Authentication Examples

### 1. Admin Login

**Request:**
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@company.com",
    "password": "password123"
  }'
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@company.com",
    "role": "admin"
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "message": "Invalid credentials"
}
```

### 2. Get Current User

**Request:**
```bash
curl -X GET http://localhost:5000/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "admin@company.com",
  "role": "admin",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Response (401 Unauthorized):**
```json
{
  "message": "Invalid token"
}
```

### 3. Logout

**Request:**
```bash
curl -X POST http://localhost:5000/auth/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

---

## Notices API Examples

### 1. Get All Notices

**Request:**
```bash
curl -X GET http://localhost:5000/notices
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Holiday Hours",
    "message": "We will be closed from Dec 25-26",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "New Service Launch",
    "message": "Exciting new service coming soon!",
    "isActive": true,
    "createdAt": "2024-01-14T09:15:00.000Z",
    "updatedAt": "2024-01-14T09:15:00.000Z"
  }
]
```

### 2. Create Notice

**Request:**
```bash
curl -X POST http://localhost:5000/notices \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Important Update",
    "message": "System maintenance scheduled for tonight 2-4 AM"
  }'
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "title": "Important Update",
  "message": "System maintenance scheduled for tonight 2-4 AM",
  "isActive": true,
  "createdAt": "2024-01-16T15:45:00.000Z",
  "updatedAt": "2024-01-16T15:45:00.000Z"
}
```

### 3. Update Notice

**Request:**
```bash
curl -X PUT http://localhost:5000/notices/507f1f77bcf86cd799439013 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Notice",
    "message": "System maintenance now 3-5 AM instead"
  }'
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "title": "Updated Notice",
  "message": "System maintenance now 3-5 AM instead",
  "isActive": true,
  "createdAt": "2024-01-16T15:45:00.000Z",
  "updatedAt": "2024-01-16T16:20:00.000Z"
}
```

### 4. Delete Notice

**Request:**
```bash
curl -X DELETE http://localhost:5000/notices/507f1f77bcf86cd799439013 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response (200 OK):**
```json
{
  "message": "Notice deleted"
}
```

---

## Gallery API Examples

### 1. Get All Gallery Items

**Request:**
```bash
curl -X GET http://localhost:5000/gallery
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439020",
    "title": "Project Photo 1",
    "type": "photo",
    "url": "https://res.cloudinary.com/demo/image/upload/v1234567890/photo1.jpg",
    "description": "Beautiful project completed in 2024",
    "cloudinaryId": "company/photo1",
    "createdAt": "2024-01-10T12:00:00.000Z",
    "updatedAt": "2024-01-10T12:00:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439021",
    "title": "Project Video",
    "type": "video",
    "url": "https://res.cloudinary.com/demo/video/upload/v1234567890/video1.mp4",
    "description": "Time-lapse of project completion",
    "cloudinaryId": "company/video1",
    "createdAt": "2024-01-09T10:30:00.000Z",
    "updatedAt": "2024-01-09T10:30:00.000Z"
  }
]
```

### 2. Upload Gallery Item

**Request:**
```bash
curl -X POST http://localhost:5000/gallery/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Office Renovation",
    "type": "photo",
    "url": "https://res.cloudinary.com/demo/image/upload/v1234567890/office.jpg",
    "description": "Our renovated office space"
  }'
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439022",
  "title": "Office Renovation",
  "type": "photo",
  "url": "https://res.cloudinary.com/demo/image/upload/v1234567890/office.jpg",
  "description": "Our renovated office space",
  "createdAt": "2024-01-17T14:20:00.000Z",
  "updatedAt": "2024-01-17T14:20:00.000Z"
}
```

### 3. Delete Gallery Item

**Request:**
```bash
curl -X DELETE http://localhost:5000/gallery/507f1f77bcf86cd799439022 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response (200 OK):**
```json
{
  "message": "Item deleted"
}
```

---

## Testimonials API Examples

### 1. Get All Testimonials

**Request:**
```bash
curl -X GET http://localhost:5000/testimonials
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439030",
    "name": "John Smith",
    "company": "Tech Solutions Inc",
    "text": "Excellent service! They delivered exactly what we needed on time.",
    "rating": 5,
    "createdAt": "2024-01-05T08:00:00.000Z",
    "updatedAt": "2024-01-05T08:00:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439031",
    "name": "Sarah Johnson",
    "company": "Design Studio Co",
    "text": "Great team to work with. Very professional and responsive.",
    "rating": 5,
    "createdAt": "2024-01-03T16:45:00.000Z",
    "updatedAt": "2024-01-03T16:45:00.000Z"
  }
]
```

### 2. Create Testimonial

**Request:**
```bash
curl -X POST http://localhost:5000/testimonials \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Michael Brown",
    "company": "Brown Enterprises",
    "text": "Outstanding work! Highly recommend to anyone looking for quality service.",
    "rating": 5
  }'
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439032",
  "name": "Michael Brown",
  "company": "Brown Enterprises",
  "text": "Outstanding work! Highly recommend to anyone looking for quality service.",
  "rating": 5,
  "createdAt": "2024-01-18T11:30:00.000Z",
  "updatedAt": "2024-01-18T11:30:00.000Z"
}
```

### 3. Update Testimonial

**Request:**
```bash
curl -X PUT http://localhost:5000/testimonials/507f1f77bcf86cd799439032 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Amazing experience! They exceeded all expectations. Definitely 5 stars!",
    "rating": 5
  }'
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439032",
  "name": "Michael Brown",
  "company": "Brown Enterprises",
  "text": "Amazing experience! They exceeded all expectations. Definitely 5 stars!",
  "rating": 5,
  "createdAt": "2024-01-18T11:30:00.000Z",
  "updatedAt": "2024-01-18T12:15:00.000Z"
}
```

### 4. Delete Testimonial

**Request:**
```bash
curl -X DELETE http://localhost:5000/testimonials/507f1f77bcf86cd799439032 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response (200 OK):**
```json
{
  "message": "Testimonial deleted"
}
```

---

## Contact API Examples

### 1. Submit Contact Form

**Request:**
```bash
curl -X POST http://localhost:5000/contact/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "(555) 123-4567",
    "subject": "Inquiry about services",
    "message": "Hi, I would like to know more about your web development services. Can you provide a quote for a custom website?"
  }'
```

**Response (201 Created):**
```json
{
  "message": "Message sent successfully",
  "contact": {
    "_id": "507f1f77bcf86cd799439040",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "(555) 123-4567",
    "subject": "Inquiry about services",
    "message": "Hi, I would like to know more about your web development services. Can you provide a quote for a custom website?",
    "isRead": false,
    "createdAt": "2024-01-19T13:50:00.000Z",
    "updatedAt": "2024-01-19T13:50:00.000Z"
  }
}
```

### 2. Get All Contact Messages (Admin Only)

**Request:**
```bash
curl -X GET http://localhost:5000/contact/messages \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439040",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "(555) 123-4567",
    "subject": "Inquiry about services",
    "message": "Hi, I would like to know more about your web development services...",
    "isRead": false,
    "createdAt": "2024-01-19T13:50:00.000Z",
    "updatedAt": "2024-01-19T13:50:00.000Z"
  }
]
```

### 3. Mark Message as Read

**Request:**
```bash
curl -X PUT http://localhost:5000/contact/507f1f77bcf86cd799439040/read \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439040",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "(555) 123-4567",
  "subject": "Inquiry about services",
  "message": "Hi, I would like to know more about your web development services...",
  "isRead": true,
  "createdAt": "2024-01-19T13:50:00.000Z",
  "updatedAt": "2024-01-19T14:00:00.000Z"
}
```

### 4. Delete Message

**Request:**
```bash
curl -X DELETE http://localhost:5000/contact/507f1f77bcf86cd799439040 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response (200 OK):**
```json
{
  "message": "Message deleted"
}
```

---

## Health Check

### Check Server Status

**Request:**
```bash
curl -X GET http://localhost:5000/health
```

**Response (200 OK):**
```json
{
  "status": "Server is running"
}
```

---

## Error Responses

### Missing Required Fields

**Request:**
```bash
curl -X POST http://localhost:5000/notices \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Notice without message"}'
```

**Response (400 Bad Request):**
```json
{
  "message": "Please provide title and message"
}
```

### Unauthorized (Missing Token)

**Request:**
```bash
curl -X POST http://localhost:5000/notices \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "message": "Test"}'
```

**Response (401 Unauthorized):**
```json
{
  "message": "No token provided"
}
```

### Invalid Token

**Request:**
```bash
curl -X POST http://localhost:5000/notices \
  -H "Authorization: Bearer invalid_token_here" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "message": "Test"}'
```

**Response (401 Unauthorized):**
```json
{
  "message": "Invalid token"
}
```

### Resource Not Found

**Request:**
```bash
curl -X GET http://localhost:5000/notices/invalid_id
```

**Response (404 Not Found):**
```json
{
  "message": "Notice not found"
}
```

### Server Error

**Request:** (Any request that causes server error)

**Response (500 Internal Server Error):**
```json
{
  "message": "Error description here"
}
```

---

## Testing with Postman

### Import Collection
1. Open Postman
2. Click "Import"
3. Create requests for each endpoint

### Sample Postman Collection (JSON)

```json
{
  "info": {
    "name": "Company Website API",
    "version": "1.0.0"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "http://localhost:5000/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\"email\": \"admin@company.com\", \"password\": \"password123\"}"
            }
          }
        }
      ]
    }
  ]
}
```

---

## Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | GET request returned data |
| 201 | Created | POST created new resource |
| 400 | Bad Request | Missing required fields |
| 401 | Unauthorized | Missing/invalid token |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Database error |

---

## Common Request Headers

```bash
# Authentication (all protected routes)
Authorization: Bearer YOUR_JWT_TOKEN

# Content Type (for POST/PUT requests)
Content-Type: application/json

# CORS headers (sent automatically by browsers)
Origin: http://localhost:5173
```

---

## Pro Tips

1. **Save token after login** - Use it for subsequent requests
2. **Test without token** - Verify auth middleware works
3. **Check response status** - 200 vs 400 vs 401
4. **Inspect error messages** - Tells you what's wrong
5. **Use Postman Collections** - Organize all API calls
6. **Set environment variables** - Reuse URLs and tokens

---

## Quick Start

1. Start backend: `npm run dev`
2. Test health: `curl http://localhost:5000/health`
3. Login: `curl -X POST http://localhost:5000/auth/login ...`
4. Save token from response
5. Use token in other requests

That's it! You're now familiar with the entire API. 🚀
