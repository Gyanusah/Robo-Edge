# Company Website - Full Stack Application

A production-ready, fully responsive company website built with modern web technologies.

## Features

### Public Pages
- **Home** - Hero section with call-to-action
- **About** - Company information and statistics
- **Services** - Service offerings with detailed cards
- **Gallery** - Photo and video gallery with filters
- **Testimonials** - Client testimonials with ratings and Google Reviews integration
- **Contact** - Contact form, Google Maps integration, business info

### Admin Features (JWT-Protected)
- **Admin Login** - Secure authentication
- **Notice Management** - Create, edit, delete notices that appear as floating popups
- **Gallery Management** - Upload and manage photos/videos (Cloudinary ready)
- **Testimonial Management** - Manage client testimonials

### Technical Features
- ✅ Fully responsive design (mobile-first)
- ✅ Tailwind CSS with responsive breakpoints (sm, md, lg, xl)
- ✅ JWT authentication for admin routes
- ✅ MongoDB database with Mongoose ODM
- ✅ RESTful API with Express.js
- ✅ React components with Vite
- ✅ Session storage for notice popups
- ✅ Google Maps iframe embed
- ✅ Google Reviews section

## Project Structure

```
robo edge/
├── frontend/                    # React + Vite
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── NoticePopup.jsx
│   │   │   └── admin/          # Admin components
│   │   │       ├── NoticesManager.jsx
│   │   │       ├── GalleryManager.jsx
│   │   │       └── TestimonialsManager.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── admin/
│   │   │       ├── Login.jsx
│   │   │       └── Dashboard.jsx
│   │   ├── services/           # API services
│   │   │   ├── api.js
│   │   │   └── apiService.js
│   │   ├── styles/
│   │   │   └── index.css       # Tailwind + custom styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
└── backend/                     # Node.js + Express
    ├── src/
    │   ├── models/             # Mongoose schemas
    │   │   ├── User.js
    │   │   ├── Notice.js
    │   │   ├── Gallery.js
    │   │   ├── Testimonial.js
    │   │   └── Contact.js
    │   ├── routes/             # API endpoints
    │   │   ├── auth.js
    │   │   ├── notices.js
    │   │   ├── gallery.js
    │   │   ├── testimonials.js
    │   │   └── contact.js
    │   ├── middleware/         # Auth & error handling
    │   │   └── auth.js
    │   ├── utils/              # Utility functions
    │   │   └── jwt.js
    │   └── server.js           # Main server file
    ├── seed.js                 # Database seeder
    ├── package.json
    └── .env.example
```

## Installation & Setup

### Prerequisites
- Node.js v18+ and npm
- MongoDB (local or Atlas)
- Git

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

Update `.env` with your MongoDB URI:
```
MONGODB_URI=mongodb://localhost:27017/company-website
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_EMAIL=admin@company.com
ADMIN_PASSWORD=password123
```

Seed the database with default admin user:
```bash
node seed.js
```

Start the backend server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` file:
```bash
cp .env.example .env.local
```

The API proxy is already configured in `vite.config.js` to forward `/api` requests to the backend.

Start the development server:
```bash
npm run dev
```

App will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /auth/login` - Admin login
- `POST /auth/logout` - Admin logout
- `GET /auth/me` - Get current user (protected)

### Notices
- `GET /notices` - Get all notices
- `POST /notices` - Create notice (protected)
- `PUT /notices/:id` - Update notice (protected)
- `DELETE /notices/:id` - Delete notice (protected)

### Gallery
- `GET /gallery` - Get all gallery items
- `POST /gallery/upload` - Upload gallery item (protected)
- `PUT /gallery/:id` - Update gallery item (protected)
- `DELETE /gallery/:id` - Delete gallery item (protected)

### Testimonials
- `GET /testimonials` - Get all testimonials
- `POST /testimonials` - Create testimonial (protected)
- `PUT /testimonials/:id` - Update testimonial (protected)
- `DELETE /testimonials/:id` - Delete testimonial (protected)

### Contact
- `POST /contact/send` - Send contact form
- `GET /contact/messages` - Get messages (protected)
- `PUT /contact/:id/read` - Mark message as read (protected)
- `DELETE /contact/:id` - Delete message (protected)

## Default Admin Credentials

```
Email: admin@company.com
Password: password123
```

⚠️ **Change these credentials immediately in production!**

## Key Features Implementation

### 1. Notice Popups
- Notices appear as floating popups on page refresh
- Each notice is shown once per session using `sessionStorage`
- Stored as `notice_${noticeId}_shown`

### 2. Responsive Design
- Mobile-first approach
- Tailwind breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Flexbox and grid layouts for adaptability
- Touch-friendly interactive elements

### 3. JWT Authentication
- Tokens stored in HTTP-only cookies for security
- Token validation middleware on protected routes
- Automatic token refresh on 401 response
- Logout clears token from cookies and storage

### 4. Gallery Management
- Two types: photos and videos
- Filter by type (all/photo/video)
- Ready for Cloudinary integration
- URLs stored in MongoDB

### 5. Google Maps Integration
- Embedded iframe for location display
- Customizable coordinates
- Update the embed URL in Contact page

### 6. Google Reviews
- Link to Google Business profile
- Update the URL in Testimonials page

## Environment Variables

### Frontend (.env.local)
```
VITE_API_BASE_URL=http://localhost:5000
```

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/company-website
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Customization Guide

### Update Company Info
Edit the following files:
- `frontend/src/pages/Home.jsx` - Hero content
- `frontend/src/pages/About.jsx` - Company info
- `frontend/src/components/Footer.jsx` - Footer links
- `frontend/src/components/Header.jsx` - Logo/branding

### Update Google Maps
In `frontend/src/pages/Contact.jsx`, update the iframe `src`:
```jsx
src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
```

### Update Google Reviews Link
In `frontend/src/pages/Testimonials.jsx`, update:
```jsx
href="https://www.google.com/maps/place/Your+Business+Name"
```

### Customize Colors
Edit `frontend/tailwind.config.js`:
```js
colors: {
  primary: '#1f2937',    // Dark gray
  secondary: '#3b82f6',  // Blue
  accent: '#10b981'      // Green
}
```

### Add Cloudinary Integration
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Add credentials to backend `.env`
3. Uncomment Cloudinary imports in `src/routes/gallery.js`

## Production Deployment

### Before Deploying
1. Change all default credentials
2. Update JWT_SECRET to a strong random string
3. Set NODE_ENV=production
4. Configure MongoDB Atlas
5. Add Cloudinary credentials
6. Update API URLs in frontend

### Frontend Build
```bash
cd frontend
npm run build
```

Deploy the `dist` folder to your hosting (Vercel, Netlify, etc.)

### Backend Deployment
- Deploy to Heroku, AWS, DigitalOcean, or Railway
- Set environment variables in your hosting platform
- Run `npm start`

## Security Best Practices

✅ JWT tokens for authentication
✅ Bcrypt password hashing
✅ CORS enabled with frontend domain
✅ Input validation on backend
✅ Protected admin routes
✅ No sensitive data in frontend
✅ Secure cookie handling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- Responsive images with lazy loading
- Code splitting with Vite
- Optimized Tailwind CSS bundle
- Minimal dependencies
- Fast API responses

## Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongosh

# Or update MONGODB_URI in .env
```

### CORS Error
- Ensure backend is running on port 5000
- Check vite.config.js proxy settings

### 401 Unauthorized
- Token may have expired
- Clear localStorage/cookies
- Log in again

### Gallery Upload Issues
- Add Cloudinary credentials to .env
- Update uploadItem function in apiService.js

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use for personal or commercial projects

## Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Built with ❤️ using React, Node.js, and MongoDB**
