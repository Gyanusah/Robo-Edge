# Vercel Deployment Steps

## 🚀 Quick Deployment Guide

### 1. Login to Vercel
```bash
vercel login
```
- This will open your browser to authenticate with Vercel
- Follow the prompts to complete login

### 2. Set Up MongoDB Atlas
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster or use existing one
3. Get your connection string from "Connect" → "Connect your application"
4. Copy the MongoDB URI (it should look like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/your-database-name?retryWrites=true&w=majority
   ```

### 3. Deploy to Vercel
```bash
cd "c:/Users/Asus/OneDrive/Desktop/robo edge"
vercel --prod
```

### 4. Add Environment Variables in Vercel Dashboard
1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add these variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/your-database-name?retryWrites=true&w=majority
   NODE_ENV=production
   ```

### 5. Verify Deployment
Once deployed, your app will be available at:
- Frontend: `https://your-project-name.vercel.app`
- API: `https://your-project-name.vercel.app/api/notices`

## 📁 Project Structure for Vercel

```
robo edge/
├── api/                    # Serverless functions
│   ├── notices.js
│   ├── testimonials.js
│   ├── gallery.js
│   └── contact.js
├── frontend/                # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── vercel.json             # Vercel configuration
└── api/package.json          # Serverless dependencies
```

## 🔧 What's Been Prepared

### ✅ Serverless Functions
- All API endpoints converted to Vercel serverless functions
- MongoDB Atlas integration
- CORS enabled for all origins
- Public access (no authentication required)

### ✅ Frontend Ready
- API calls updated for serverless endpoints
- Environment variables configured
- Build optimized for production

### ✅ Configuration Files
- `vercel.json` - Routes and build configuration
- `api/package.json` - Serverless dependencies
- Environment variables documented

## 🌐 Live API Endpoints

After deployment, these endpoints will be live:

```
GET    https://your-domain.vercel.app/api/notices
POST   https://your-domain.vercel.app/api/notices
PUT    https://your-domain.vercel.app/api/notices?id=<id>
DELETE https://your-domain.vercel.app/api/notices?id=<id>

GET    https://your-domain.vercel.app/api/testimonials
POST   https://your-domain.vercel.app/api/testimonials
PUT    https://your-domain.vercel.app/api/testimonials?id=<id>
DELETE https://your-domain.vercel.app/api/testimonials?id=<id>

GET    https://your-domain.vercel.app/api/gallery
POST   https://your-domain.vercel.app/api/gallery
PUT    https://your-domain.vercel.app/api/gallery?id=<id>
DELETE https://your-domain.vercel.app/api/gallery?id=<id>

GET    https://your-domain.vercel.app/api/contact
POST   https://your-domain.vercel.app/api/contact
```

## 🎯 Next Steps

1. **Complete Vercel login** using the CLI command above
2. **Deploy** with `vercel --prod`
3. **Add environment variables** in Vercel dashboard
4. **Test** your live application

## 📞 Troubleshooting

### If deployment fails:
- Check MongoDB Atlas connection string
- Verify environment variables
- Check Vercel function logs

### If API calls fail:
- Ensure frontend uses `/api/` prefix
- Check CORS configuration
- Verify MongoDB Atlas network access

Your application is now fully prepared for serverless deployment! 🚀
