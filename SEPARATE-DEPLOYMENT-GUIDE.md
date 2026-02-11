# 🚀 Separate Frontend & Backend Deployment Guide

## 📁 **New Structure:**

```
robo edge/
├── frontend/                    # React frontend
│   ├── src/
│   ├── dist/                  # Build output
│   ├── package.json
│   └── vercel.json           # ✅ Frontend deployment config
├── backend/
│   ├── api/                  # Serverless functions
│   ├── src/
│   ├── package.json
│   └── vercel.json           # ✅ Backend deployment config
```

---

## 🎯 **Deployment Strategy:**

### **Option 1: Two Separate Vercel Projects**
Deploy frontend and backend as separate projects:

#### **Frontend Deployment:**
```bash
cd frontend
vercel --prod
# URL: https://your-frontend.vercel.app
```

#### **Backend Deployment:**
```bash
cd backend
vercel --prod
# URL: https://your-backend.vercel.app
```

#### **Update Frontend API Base URL:**
In `frontend/src/services/api.js`:
```javascript
const getApiBaseUrl = () => {
  // For production, use separate backend URL
  if (window.location.hostname !== 'localhost') {
    return 'https://your-backend.vercel.app/api'
  }
  return 'http://localhost:5000'
}
```

---

### **Option 2: Single Project with Monorepo**
Keep both in one project with proper routing:

#### **Root vercel.json:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    },
    {
      "src": "backend/api/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ]
}
```

---

## 🔧 **Environment Variables Setup:**

### **Backend Environment Variables:**
In Vercel Dashboard → Settings → Environment Variables:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/db-name?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters
ADMIN_EMAIL=admin@company.com
ADMIN_PASSWORD=admin123456
NODE_ENV=production
```

---

## 🚀 **Deployment Commands:**

### **Frontend:**
```bash
cd frontend
npm install
npm run build
vercel --prod
```

### **Backend:**
```bash
cd backend/api
npm install
cd ..
vercel --prod
```

---

## 🌐 **API Endpoints After Deployment:**

### **If Separate Projects:**
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend API**: `https://your-backend.vercel.app/api/*`

### **If Single Project:**
- **Frontend + API**: `https://your-app.vercel.app`
- **API Routes**: `https://your-app.vercel.app/api/*`

---

## 🔐 **Login Credentials:**
```
Email: admin@company.com
Password: admin123456
```

---

## 📋 **Testing Checklist:**

### **Frontend:**
- [ ] Website loads correctly
- [ ] All pages accessible
- [ ] API calls work
- [ ] Login functionality works

### **Backend:**
- [ ] All API endpoints respond
- [ ] MongoDB connection works
- [ ] Authentication works
- [ ] CRUD operations work

---

## 🎯 **Recommended Approach:**

**For Development:**
- Use separate projects for easier debugging
- Frontend: `localhost:5173`
- Backend: `localhost:5000`

**For Production:**
- Use single project with monorepo setup
- One domain for both frontend and API
- Simpler deployment and management

---

## 🚨 **Troubleshooting:**

### **Frontend 404 Errors:**
- Check `vercel.json` routes configuration
- Ensure build output is in `dist/` folder
- Verify `base` path in `vite.config.js`

### **Backend API Errors:**
- Check serverless function paths
- Verify environment variables
- Check MongoDB connection string

### **CORS Issues:**
- Update CORS origins in backend
- Check API base URL in frontend
- Verify Vercel routing rules

---

**This separate approach gives you more control and easier debugging!** 🎯
