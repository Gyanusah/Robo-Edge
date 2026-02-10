# How to Add Photos and Videos to Notices

## Method 1: Using URL (Recommended - No Setup Required)

### Steps:
1. Go to Admin Dashboard → Notices tab
2. In "Add Photos or Videos" section:
   - Select media type: **Photo** or **Video**
   - Paste the **full URL** of your image or video
   - (Optional) Add a description
   - Click **"Add Media"** button
3. You'll see the media preview in the list below
4. Click **"Create Notice"** or **"Update Notice"**

### Example URLs:
```
Photo:
https://via.placeholder.com/400x300?text=My+Photo
https://images.unsplash.com/photo-xxx

Video:
https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4
```

## Where to Get Media URLs

### Free Image Sources:
- **Unsplash**: https://unsplash.com (right-click → Copy link)
- **Pexels**: https://pexels.com
- **Pixabay**: https://pixabay.com
- **Placeholder**: https://via.placeholder.com/400x300

### Free Video Sources:
- **Pexels Videos**: https://www.pexels.com/videos/
- **Pixabay Videos**: https://pixabay.com/videos/
- **Sample Videos**: https://commondatastorage.googleapis.com/gtv-videos-library/sample/

### Your Own Server:
If you have files on your website, use the full URL:
```
https://yourwebsite.com/images/photo.jpg
https://yourwebsite.com/videos/video.mp4
```

## Method 2: Using Cloudinary (Advanced - Requires Setup)

### Setup Steps:
1. Sign up at **https://cloudinary.com** (free account available)
2. Go to **Dashboard** and note your **Cloud Name**
3. Go to **Settings → Upload**
4. Create an upload preset named `company_gallery`
5. Set "Signing Mode" to **Unsigned**
6. Update in `NoticesManager.jsx`:
   ```javascript
   // Line ~50: Replace 'your_cloud_name'
   https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload
   ```
7. Now you can use the "Upload directly" option

## Supported File Types

### Photos:
- JPG / JPEG
- PNG
- WebP
- GIF

### Videos:
- MP4 (Recommended)
- WebM
- OGG

## Testing with Sample Data

### Quick Test:
1. Create a notice with title "Test Notice"
2. Use this placeholder URL:
   ```
   https://via.placeholder.com/400x300?text=Test+Image
   ```
3. Add and create notice
4. Check homepage - should see the image

## Troubleshooting

### "Image not showing on homepage"
- **Check URL**: Paste URL in browser address bar
- **Check Format**: Must be JPG, PNG, WebP, or GIF
- **Check CORS**: Server must allow image access from your website

### "Video not playing"
- **Check Format**: Must be MP4 (best compatibility)
- **Check Codec**: H.264 codec for video, AAC for audio
- **Check Size**: Keep under 50MB for faster loading

### "Can't add media"
- **Check URL**: Make sure it's a valid web URL
- **Check Internet**: Verify you're online
- **Check Type**: Select correct media type (photo/video)

## Best Practices

1. **Optimize Images**: Keep under 5MB
2. **Use HTTPS URLs**: Some browsers block HTTP images
3. **Add Descriptions**: Helps users understand the content
4. **Test URLs**: Always test before publishing
5. **Use Descriptive Titles**: Makes notices more professional

## Pro Tips

- **Batch URLs**: You can add multiple media items by repeating the process
- **Edit Later**: Click Edit on any notice to add/remove media
- **Remove Media**: Click the ✕ button on any media item while editing
- **Reorder**: Delete and re-add in desired order

## Example Complete Notice

### Title:**
"Holiday Celebration Photos"

### Message:
"Check out our team celebrating the holidays!"

### Media Items:
1. Photo: https://via.placeholder.com/400x300?text=Photo+1
   Description: "Team celebration"
2. Photo: https://via.placeholder.com/400x300?text=Photo+2
   Description: "Festive decorations"
3. Video: https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4
   Description: "Holiday video message"

## Need Help?

If media still isn't showing:
1. Check browser console (F12) for errors
2. Test the URL directly in browser
3. Verify notice was saved (check in "Existing Notices" list)
4. Refresh homepage (clear cache if needed)

