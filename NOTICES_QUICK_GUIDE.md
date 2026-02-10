# Adding Media to Notices - Quick Guide

## Why File Upload Doesn't Work

File upload (Cloudinary) requires configuration that hasn't been set up. The **URL method** is simpler and works immediately!

## ✅ How to Add Media (URL Method)

### Step 1: Get a Media URL
Choose one of these free sources:

**Photos:**
- **Unsplash** (https://unsplash.com) - High quality photos
- **Pexels** (https://pexels.com) - Free stock photos
- **Pixabay** (https://pixabay.com) - Free images
- **Placeholder** (https://via.placeholder.com/400x300) - Instant placeholder images

**Videos:**
- **Pexels Videos** (https://www.pexels.com/videos/) - Free videos
- **Pixabay Videos** (https://pixabay.com/videos/) - Free stock videos
- **Sample Videos** (https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4)

### Step 2: Copy the Image/Video URL

1. Find an image or video you like
2. **Right-click** on it → **Copy Link**
3. Or look for a download/share button

### Step 3: Add to Notice

1. **Go to Admin Dashboard** → **Notices Tab**
2. **Select Media Type:** Photo or Video
3. **Paste URL:** Into "Enter image or video URL..." field
4. **(Optional) Add Description:** Explain what the media is
5. **Click "Add Media"** button

### Step 4: Verify and Publish

1. **See the preview** in the "Media Items" section
2. **Add more media** by repeating steps above
3. **Click "Create Notice"** or **"Update Notice"**

## 🧪 Quick Test

Try this right now:

1. Go to Admin → Notices
2. Enter title: "Test Notice"
3. Select: **Photo**
4. Paste: `https://via.placeholder.com/400x300?text=Test+Image`
5. Click: **Add Media**
6. Click: **Create Notice**
7. Refresh homepage → **You should see the image!**

## 📝 Example Notices

### Notice 1: Company Update
```
Title: New Office Announcement
Message: We're excited to open our new office!
Photo URL: https://via.placeholder.com/400x300?text=New+Office
Description: Our beautiful new office space
```

### Notice 2: Event Photos
```
Title: Team Lunch Celebration
Message: Great time with the team!
Photo URL 1: https://via.placeholder.com/400x300?text=Photo+1
Photo URL 2: https://via.placeholder.com/400x300?text=Photo+2
Photo URL 3: https://via.placeholder.com/400x300?text=Photo+3
```

### Notice 3: Product Video
```
Title: New Product Launch
Message: Check out our newest product!
Video URL: https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4
Description: Product demo video
```

## 💡 Pro Tips

1. **Test URLs First**: Paste URL in browser address bar to verify it works
2. **Use HTTPS**: Make sure URL starts with `https://` not `http://`
3. **Keep File Sizes Small**: Images < 5MB, Videos < 50MB
4. **Add Descriptions**: Help visitors understand the content
5. **Multiple Media**: You can add many photos/videos to one notice

## 🔍 Troubleshooting

### "Image doesn't show on homepage"
- Check if URL works in browser
- Verify it's JPG, PNG, WebP, or GIF
- Try a different image from Unsplash or Pexels

### "Video plays but no audio"
- Videos are muted by default (for autoplay)
- Click the speaker icon to unmute if needed
- Use MP4 format for best compatibility

### "Can't add media"
- Verify URL starts with `https://`
- Select correct media type (photo/video)
- Check internet connection

## 🚀 Advanced: Set Up File Upload (Optional)

If you want to upload files directly:

1. **Sign up at Cloudinary** (https://cloudinary.com)
2. **Get Cloud Name** from dashboard
3. **Create Upload Preset** in Settings → Upload
4. **Update code** in `NoticesManager.jsx`:
   ```
   Replace: your_cloud_name
   With: YOUR_ACTUAL_CLOUD_NAME
   ```
5. Then file upload button will work

## Free Image & Video Sources

| Site | Type | Quality | Speed |
|------|------|---------|-------|
| Unsplash | Photos | High | Fast |
| Pexels | Photos & Videos | High | Fast |
| Pixabay | Photos & Videos | Medium | Fast |
| Placeholder | Instant | N/A | Instant |

## Questions?

Check the console (F12) for detailed error messages if something doesn't work!

