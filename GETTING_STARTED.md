# Getting Started Guide

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** v18 or higher ([download](https://nodejs.org/))
- **MongoDB** installed locally OR MongoDB Atlas account ([create free account](https://www.mongodb.com/cloud/atlas))
- **Git** (optional, for version control)

Verify installation:
```bash
node --version    # Should be v18+
npm --version     # Should be v9+
mongosh --version # If MongoDB installed locally
```

## 🚀 Quick Start (5 minutes)

### 1. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and update MongoDB connection:
```
MONGODB_URI=mongodb://localhost:27017/company-website
JWT_SECRET=your_secret_key_here
PORT=5000
```

Seed the database with admin user:
```bash
node seed.js
```

Start backend:
```bash
npm run dev
```

✅ Backend running on http://localhost:5000

### 2. Setup Frontend

In a new terminal:

```bash
cd frontend
npm install
cp .env.example .env.local
```

The `.env.local` should already have:
```
VITE_API_BASE_URL=http://localhost:5000
```

Start frontend:
```bash
npm run dev
```

✅ Frontend running on http://localhost:5173

### 3. Test the Application

1. Open http://localhost:5173 in your browser
2. Navigate through the pages (Home, About, Services, etc.)
3. Go to `/admin/login` to test admin panel
4. Use credentials:
   - Email: `admin@company.com`
   - Password: `password123`

## 📁 File Structure Quick Reference

```
robo edge/
├── frontend/              # React app
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API functions
│   │   ├── styles/       # CSS
│   │   └── App.jsx       # Main app
│   ├── package.json
│   └── README.md
├── backend/              # Express API
│   ├── src/
│   │   ├── models/       # Database schemas
│   │   ├── routes/       # API endpoints
│   │   ├── middleware/   # Auth & errors
│   │   ├── utils/        # Helpers
│   │   └── server.js     # Main server
│   ├── seed.js           # Database seeder
│   ├── package.json
│   └── README.md
└── README.md             # Main docs
```

## 🔧 Configuration

### Frontend Configuration

**Edit company info in these files:**

1. **Logo/Brand** → `src/components/Header.jsx`
2. **Hero content** → `src/pages/Home.jsx`
3. **About info** → `src/pages/About.jsx`
4. **Services** → `src/pages/Services.jsx`
5. **Footer links** → `src/components/Footer.jsx`
6. **Contact map** → `src/pages/Contact.jsx`
7. **Colors** → `tailwind.config.js`

### Backend Configuration

**Update credentials in `.env`:**
```bash
ADMIN_EMAIL=admin@company.com
ADMIN_PASSWORD=password123  # Change this!
```

**Regenerate admin user:**
```bash
node seed.js
```

## 🌐 Google Integration

### Google Maps
1. Go to [Google Maps Embed API](https://developers.google.com/maps)
2. Get your embed code
3. Update in `frontend/src/pages/Contact.jsx`:
```jsx
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
  // ...
/>
```

### Google Reviews
1. Create a Google Business Profile
2. Get your Business Profile URL
3. Update in `frontend/src/pages/Testimonials.jsx`:
```jsx
<a href="https://www.google.com/maps/place/Your+Business">
  View on Google Maps
</a>
```

## 🎨 Customization

### Change Brand Colors

Edit `frontend/tailwind.config.js`:
```js
colors: {
  primary: '#1f2937',      // Header/Footer
  secondary: '#3b82f6',    // Buttons/Links
  accent: '#10b981'        // Highlights
}
```

Then rebuild:
```bash
cd frontend
npm run build
```

### Change Typography

Edit CSS variables in `frontend/src/styles/index.css`:
```css
body {
  font-family: 'Your Font', sans-serif;
}
```

## 🚢 Production Deployment

### Before Deploying

1. **Change credentials**
```env
ADMIN_EMAIL=your_email@company.com
ADMIN_PASSWORD=very_strong_password_123!
JWT_SECRET=random_string_at_least_32_chars
```

2. **Update MongoDB**
   - Switch from local to MongoDB Atlas
   - Update `MONGODB_URI` in `.env`

3. **Update API URL**
   - In `frontend/.env.production`
   - Set `VITE_API_BASE_URL=https://your-api-domain.com`

### Deploy Backend

Options:
- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repo
- **AWS/DigitalOcean**: Deploy Node.js app
- **Vercel**: Serverless Node.js

Required env vars:
```
MONGODB_URI
JWT_SECRET
JWT_EXPIRE
PORT
NODE_ENV=production
```

### Deploy Frontend

1. Build:
```bash
cd frontend
npm run build
```

2. Deploy `dist/` folder to:
   - **Vercel** (recommended)
   - **Netlify**
   - **GitHub Pages**
   - **AWS S3 + CloudFront**

## 🧪 Testing

### Test Backend APIs

```bash
# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@company.com","password":"password123"}'

# Get notices
curl http://localhost:5000/notices

# Create notice (requires token)
curl -X POST http://localhost:5000/notices \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","message":"This is a test"}'
```

### Test Frontend

1. Check all pages load
2. Test responsive design (F12 → Toggle device toolbar)
3. Test contact form submission
4. Test admin login
5. Test admin CRUD operations

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check MongoDB
mongosh

# If local MongoDB isn't running:
# On Mac: brew services start mongodb-community
# On Windows: net start MongoDB
# Or use MongoDB Atlas instead

# Check port 5000 is free
lsof -i :5000
```

### Frontend shows blank page
- Check browser console (F12)
- Ensure backend is running
- Check VITE_API_BASE_URL is correct
- Clear browser cache

### CORS errors
- Ensure backend is running
- Check frontend URL is allowed in CORS config
- Verify vite.config.js proxy settings

### Database errors
- Check MongoDB connection string
- Verify database name matches
- Check credentials if using Atlas

### Token expired errors
- Clear browser cookies
- Log out and log back in
- JWT expires in 7 days by default

## 📱 Mobile Testing

Test responsive design:
1. Open http://localhost:5173
2. Press F12 (DevTools)
3. Click device toggle (top-left)
4. Test various screen sizes

Breakpoints to test:
- Mobile: 375px (iPhone)
- Tablet: 768px (iPad)
- Desktop: 1024px (MacBook)
- Wide: 1440px (Desktop)

## 🔐 Security Checklist

Before production:
- [ ] Change default admin password
- [ ] Change JWT_SECRET to random string
- [ ] Set NODE_ENV=production
- [ ] Use HTTPS only
- [ ] Setup MongoDB authentication
- [ ] Enable CORS only for your domain
- [ ] Setup rate limiting
- [ ] Add input validation
- [ ] Regular backups

## 📚 Learn More

- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Express**: https://expressjs.com
- **MongoDB**: https://docs.mongodb.com
- **Vite**: https://vitejs.dev

## ✉️ Support

For issues:
1. Check README.md files in frontend/ and backend/
2. Check error logs in terminal
3. Look for similar issues on GitHub
4. Create an issue with error details

## 🎉 Next Steps

1. ✅ Get the project running (you are here!)
2. Customize branding and colors
3. Add your company information
4. Setup Google integrations
5. Create admin accounts
6. Test all features
7. Deploy to production
8. Monitor and update regularly

---

**Happy building! 🚀**
