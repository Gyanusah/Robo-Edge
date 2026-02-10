# Troubleshooting Guide

## Common Issues and Solutions

### Backend Issues

#### 1. MongoDB Connection Error
**Error:** `MongooseError: Cannot connect to MongoDB`

**Solutions:**
```bash
# If using local MongoDB, start it:
# macOS
brew services start mongodb-community

# Windows (run as Administrator)
net start MongoDB

# Or verify the connection string in .env
MONGODB_URI=mongodb://localhost:27017/company-website

# Use MongoDB Atlas instead:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/company-website
```

#### 2. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`

**Solutions:**
```bash
# Find process on port 5000
lsof -i :5000        # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process
kill -9 <PID>        # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or change port in .env
PORT=5001
```

#### 3. JWT Secret Error
**Error:** `JsonWebTokenError: invalid token`

**Solutions:**
```bash
# JWT_SECRET must match on login and token validation
# Ensure JWT_SECRET in .env is the same
# Change to a strong random string:
JWT_SECRET=your-very-secret-key-at-least-32-characters-long

# Logout and login again
```

#### 4. Database Seeding Failed
**Error:** `Error: Admin user already exists` or connection error

**Solutions:**
```bash
# Reset admin user
node seed.js

# Or manually create admin:
# Connect to MongoDB and run:
db.users.deleteMany({})  # Clear users
node seed.js             # Recreate

# Verify in MongoDB:
mongosh
use company-website
db.users.find()
```

#### 5. CORS Error
**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solutions:**
```bash
# Backend might not be running
npm run dev  # Start backend

# Or CORS not enabled in server.js
# Ensure app.use(cors()) is present

# Check frontend URL in .env:
VITE_API_BASE_URL=http://localhost:5000
```

---

### Frontend Issues

#### 1. API Not Responding
**Error:** `Network error: Failed to fetch`

**Solutions:**
```bash
# Backend not running
cd backend
npm run dev

# Or incorrect API URL
# Check .env.local:
VITE_API_BASE_URL=http://localhost:5000

# Or proxy issue
# Check vite.config.js has proxy configured
```

#### 2. Components Not Rendering
**Error:** `Cannot find module` or blank page

**Solutions:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev

# Check for syntax errors in files
npm run build  # Shows compilation errors

# Check browser console (F12)
```

#### 3. Token Expired/Invalid
**Error:** `401 Unauthorized` after login

**Solutions:**
```javascript
// Clear cookies and login again
// In browser console:
document.cookie.split(";").forEach(function(c) { 
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
});

// Reload page and login again
location.reload()

// Or check JWT_EXPIRE in backend .env (default 7d)
```

#### 4. Images Not Loading
**Error:** Broken image placeholders

**Solutions:**
```bash
# Update Gallery with valid URLs
# Admin Dashboard → Gallery → Add Item
# Paste valid image URL from Cloudinary or image service

# Or use placeholder service:
# https://via.placeholder.com/400x300
```

#### 5. Contact Form Not Submitting
**Error:** `Error sending message` or network error

**Solutions:**
```bash
# Backend not running
npm run dev  # In backend folder

# Or missing CORS
# Check backend has: app.use(cors())

# Or validation failing
# Ensure all fields filled:
// name, email, subject, message required
```

---

### Database Issues

#### 1. Data Not Persisting
**Error:** Data disappears after refresh

**Solutions:**
```bash
# MongoDB might not be running
mongosh  # Test connection

# Or using in-memory database
# Ensure MONGODB_URI points to real database:
MONGODB_URI=mongodb://localhost:27017/company-website

# Check data exists:
mongosh
use company-website
db.notices.find()
```

#### 2. Duplicate Key Error
**Error:** `MongoError: E11000 duplicate key error`

**Solutions:**
```javascript
// Usually for email field (unique index)
// Clear duplicate data:
db.users.deleteMany({ email: "admin@company.com" })
node seed.js  // Recreate

// Or drop collection and recreate:
db.users.drop()
node seed.js
```

#### 3. Large Database Size
**Error:** High storage usage

**Solutions:**
```bash
# Remove old/test data
# Connect to MongoDB:
mongosh
use company-website

# Remove old messages
db.contacts.deleteMany({ createdAt: { $lt: new Date("2024-01-01") } })

# Remove old gallery items
db.galleries.deleteMany({ createdAt: { $lt: new Date("2024-01-01") } })
```

---

### Authentication Issues

#### 1. Admin Login Always Fails
**Error:** `Invalid credentials` for correct email/password

**Solutions:**
```bash
# Password might be hashed incorrectly
# Reset admin user:
node seed.js

# Then use:
# Email: admin@company.com
# Password: password123

# Or manually hash password:
const bcrypt = require('bcryptjs');
bcrypt.hash('newpassword', 10).then(console.log);
// Update in DB with hash
```

#### 2. Token Not Stored
**Error:** Logout/login cycle keeps happening

**Solutions:**
```javascript
// Check cookie storage:
// Console: document.cookie

// Ensure js-cookie is installed:
npm install js-cookie

// Clear all cookies:
Cookies.remove('token')

// Reinstall dependencies:
rm -rf node_modules
npm install
```

#### 3. Protected Routes Failing
**Error:** Can't access `/admin/dashboard` even logged in

**Solutions:**
```javascript
// Check token is stored:
console.log(Cookies.get('token'))

// Verify backend is validating:
// Check backend middleware/auth.js has protect middleware

// Clear browser data:
// Settings → Privacy → Clear browsing data
// Then login again
```

---

### Performance Issues

#### 1. Slow Page Load
**Error:** Pages take 5+ seconds to load

**Solutions:**
```bash
# Check backend response time
# Open DevTools Network tab
# See if API calls are slow

# Optimize queries:
# Add MongoDB indexes
# Use pagination for large datasets

# Frontend optimization:
npm run build  # Create production build
npm run preview  # Test production version
```

#### 2. High Memory Usage
**Error:** Process crashes or becomes unresponsive

**Solutions:**
```bash
# Monitor memory:
node --inspect src/server.js

# Check for memory leaks:
# Don't keep large data in variables
# Clear cache regularly

# Limit payload size in Express:
app.use(express.json({ limit: '10mb' }))
```

#### 3. Database Queries Slow
**Error:** Gallery/testimonials take long to load

**Solutions:**
```bash
# Add indexes to frequently queried fields
# In MongoDB:
db.notices.createIndex({ createdAt: -1 })
db.gallery.createIndex({ type: 1 })
db.testimonials.createIndex({ createdAt: -1 })

# Or use MongoDB Compass GUI
```

---

### Deployment Issues

#### 1. Deployment Fails
**Error:** Deploy script exits with error

**Solutions:**
```bash
# Check dependencies:
npm install

# Check build:
npm run build  # Frontend
# Should create dist/ folder

# Check environment variables:
# Ensure all required .env vars set on hosting platform
# MONGODB_URI, JWT_SECRET, PORT, etc.

# Check Node version matches
node --version  # Should be 18+
```

#### 2. Frontend Shows Backend Errors
**Error:** API calls fail in production

**Solutions:**
```bash
# Update API URL in .env.production
VITE_API_BASE_URL=https://your-backend-domain.com

# Rebuild frontend:
npm run build

# Clear cache on server
# Or use new domain

# Check CORS on backend:
// Allow frontend domain:
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}))
```

#### 3. Database Not Accessible
**Error:** Connection timeout in production

**Solutions:**
```bash
# If using MongoDB Atlas:
// Add IP to whitelist
// Dashboard → Network Access → Add Current IP

// Or allow all IPs (not recommended):
// 0.0.0.0/0

// Check connection string:
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

---

### Browser-Specific Issues

#### 1. Mobile Responsiveness Broken
**Error:** Layout broken on phone

**Solutions:**
```html
<!-- Check viewport meta tag in index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Ensure Tailwind responsive classes used:
<div class="block md:flex">
```

#### 2. Mobile Menu Not Working
**Error:** Hamburger menu click doesn't work

**Solutions:**
```javascript
// Check Header.jsx has proper click handler
const [isMenuOpen, setIsMenuOpen] = useState(false)

// Test in DevTools mobile mode (F12)
// Click hamburger button
```

#### 3. Touch Events Not Working
**Error:** Buttons not responsive to touch

**Solutions:**
```css
/* Add touch-action to buttons */
.btn-primary {
  touch-action: manipulation;
  -webkit-user-select: none;
  user-select: none;
}
```

---

### Email/Notification Issues

#### 1. Contact Form Submits But No Notification
**Error:** Form sent but no email received

**Solutions:**
```javascript
// Email feature not implemented
// To add email:
// 1. Install nodemailer
npm install nodemailer

// 2. Configure in backend
// 3. Send email on contact submission

// For now, check data in MongoDB:
mongosh
use company-website
db.contacts.find()  // Should see form submission
```

---

## Quick Diagnostics

### Check What's Running
```bash
# Backend health
curl http://localhost:5000/health

# Frontend health
curl http://localhost:5173

# Check ports
lsof -i :5000   # Backend
lsof -i :5173   # Frontend
```

### Check Logs
```bash
# Backend logs show in terminal where you ran npm run dev
# Frontend logs show in:
# Browser DevTools → Console (F12)
# Terminal where you ran npm run dev
```

### Check Environment
```bash
# Backend .env variables
cat backend/.env

# Frontend .env variables
cat frontend/.env.local

# Node version
node --version

# npm version
npm --version
```

---

## Getting Help

1. **Check the documentation**
   - README.md (main)
   - frontend/README.md
   - backend/README.md
   - GETTING_STARTED.md

2. **Check browser console**
   - F12 → Console
   - Shows frontend errors

3. **Check terminal logs**
   - Backend terminal shows API errors
   - Frontend terminal shows build errors

4. **Check network requests**
   - F12 → Network tab
   - See all API calls
   - Check response status and body

5. **Common fixes**
   ```bash
   # Clear cache
   rm -rf node_modules package-lock.json
   npm install
   
   # Restart servers
   npm run dev  # Both frontend and backend
   
   # Check connections
   mongosh      # MongoDB
   curl localhost:5000/health  # Backend health
   ```

---

## Still Stuck?

1. Check error message carefully
2. Search error in documentation
3. Look at file that caused error
4. Check environment variables
5. Restart servers
6. Clear cache and reinstall
7. Check browser console
8. Check backend terminal logs

**Most issues resolved by:**
- Restarting servers
- Clearing cache
- Checking .env files
- Verifying all dependencies installed

---

## Version Information

- Node: 18+ required
- MongoDB: 5.0+ required
- Express: 4.18+
- React: 18.2+
- Tailwind: 3.4+

Check compatibility if issues arise!
