# Notice Media Display - Debugging Guide

## Issue: Video and Photos Not Showing

The notice popup appears but media items (photos and videos) are not displaying.

## Step-by-Step Diagnosis & Fix

### Step 1: Verify Notices Are Created in Admin Panel

1. **Login to Admin Dashboard**
   - Go to `/admin/dashboard`
   - Navigate to **Notices** tab
   
2. **Create a Test Notice**
   - Title: "Test Notice"
   - Message: "This is a test notice"
   - Add at least 1 photo or video
   - Click "Create Notice"

3. **Verify in List**
   - You should see it in "Existing Notices" below
   - Media items should show in the grid

### Step 2: Check Browser Console for Errors

1. **Open Developer Tools**
   - Press `F12` or right-click → Inspect
   - Go to **Console** tab

2. **Look for Console Logs**
   - You should see:
     ```
     Fetched notices: [...]
     Latest notice: {...}
     Media items: [...]
     ```

3. **Check for Errors**
   - Look for red error messages
   - Common errors:
     - "Image error" - URL not working
     - "Video error" - Video URL not working
     - CORS errors - Server not allowing the request

### Step 3: Reseed Database with Sample Data

If no notices are appearing at all:

1. **Run the seed script**
   ```bash
   cd backend
   node seed.js
   ```
   
   This will:
   - Clear database
   - Create admin user
   - Create a sample notice with placeholder images
   - Output: `Sample notice created: Welcome to Our Company`

2. **Restart Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Test**
   - Refresh homepage
   - You should see notice popup with sample images

### Step 4: Check Network Tab

1. **In Developer Tools, go to Network tab**
2. **Refresh the page**
3. **Look for `/notices` request**
   - Click it to see response
   - Check if `mediaItems` array is there
   - Verify URLs are correct

### Step 5: Verify Cloudinary URLs (If Using Custom Images)

If you uploaded images via admin panel:

1. **Check URL format**
   - Should start with: `https://res.cloudinary.com/...`
   - Or your custom CDN URL

2. **Test URL directly**
   - Paste the URL in browser address bar
   - Image should load
   - If not, URL is broken

3. **Check Cloudinary Configuration**
   - In `NoticesManager.jsx`, verify:
     ```javascript
     formData.append('upload_preset', 'company_gallery')
     const response = await fetch(`https://api.cloudinary.com/v1_1/your_cloud_name/...`)
     ```
   - Replace `your_cloud_name` with your actual Cloudinary cloud name

### Step 6: Test with Placeholder URLs

If Cloudinary isn't configured, use placeholder URLs:

1. **Edit Notice via Admin**
   - Click Edit on any notice
   - For media items, replace URL with:
     ```
     https://via.placeholder.com/400x300?text=Test
     ```
   - Click Update

2. **Test on homepage**
   - Should now display the placeholder image

## Common Issues & Solutions

### Issue: "Notice has no media items" displays

**Cause:** `mediaItems` array is empty or undefined

**Solution:**
1. Click Edit on the notice
2. Add media items
3. Click Update

### Issue: Media items appear but no image/video loads

**Cause:** URLs are broken or CORS blocked

**Solution:**
1. Check if URL is accessible in browser directly
2. Verify image format (JPG, PNG, MP4, WebM)
3. Check file size (< 5MB for images, < 50MB for videos)

### Issue: Video shows play button but doesn't play

**Cause:** Video codec not supported

**Solution:**
1. Use H.264 codec for videos
2. Container should be MP4
3. Test URL directly in `<video>` tag

### Issue: Old notice keeps showing after refresh

**Cause:** SessionStorage remembering the notice

**Solution:**
1. Open DevTools → Application → Session Storage
2. Delete key starting with `notice_`
3. Refresh page

## File Structure Reference

```
Backend:
├── src/models/Notice.js          ← Schema with mediaItems
├── src/routes/notices.js         ← API endpoints
└── seed.js                       ← Sample data

Frontend:
├── components/NoticePopup.jsx    ← Displays popup + media
├── components/admin/NoticesManager.jsx  ← Upload media
└── services/apiService.js        ← API calls
```

## Notice Schema Structure

```javascript
{
  _id: ObjectId,
  title: String,           // Required
  message: String,         // Optional
  mediaItems: [            // Optional array
    {
      type: 'photo' | 'video',
      url: 'https://...',  // Full URL to image/video
      description: String
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Expected Behavior

### Before Fix:
```
Notice popup shows:
- Title ✓
- Message ✓
- Media items ✗ (blank)
```

### After Fix:
```
Notice popup shows:
- Title ✓
- Message ✓
- Photos (static display) ✓
- Videos (autoplay) ✓
- Navigation arrows ✓
- Thumbnails grid ✓
```

## Testing Checklist

- [ ] Admin can create notice with title only
- [ ] Admin can add text message
- [ ] Admin can upload photos
- [ ] Admin can upload videos
- [ ] Notice appears in list with media count
- [ ] Homepage shows notice popup
- [ ] Photos display correctly
- [ ] Videos autoplay
- [ ] Multiple media items show navigation
- [ ] Clicking thumbnail switches media
- [ ] Browser console shows no errors

## Debug Tips

1. **Add this to NoticePopup.jsx after fetching:**
   ```javascript
   console.table(notice.mediaItems)  // See all media items
   ```

2. **Check database directly:**
   - Use MongoDB Compass
   - Look at Notice collection
   - Verify mediaItems field

3. **Test API endpoint:**
   - Open browser: `http://localhost:5000/notices`
   - Should see full notice with mediaItems

## Next Steps If Still Not Working

1. Share console error messages
2. Share what notice looks like in MongoDB
3. Verify Cloudinary configuration
4. Check if mediaItems array exists in database

