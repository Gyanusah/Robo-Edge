# Notice Manager - Enhanced with Photos and Videos

## Overview
The Notice Manager has been updated to support adding **text, photos, and videos** in a single notice. You can now create rich, multimedia notices for your website.

## Features

### What You Can Now Do:
✅ Add a **title** (required)  
✅ Add optional **message/text**  
✅ Add **multiple photos** (JPG, PNG, WebP)  
✅ Add **multiple videos** (MP4, WebM)  
✅ Add **descriptions** for each media item  
✅ **Edit** and **update** existing notices with media  
✅ **Delete** photos/videos individually while editing  

## How to Use

### Creating a New Notice

1. **Go to Admin Dashboard** → Click on **Notices** tab
2. **Enter Title** (required field)
   - Example: "Holiday Announcement" or "New Product Launch"
3. **Enter Message** (optional)
   - Add context or description for the notice
4. **Add Photos or Videos** (optional)
   - Click on the file input field
   - Select images (JPG, PNG, WebP) or videos (MP4, WebM)
   - File will be uploaded to Cloudinary automatically
5. **Add Descriptions** (optional)
   - For each media item, add a brief description
6. **Review Media Items**
   - See thumbnails of all photos/videos you've added
   - Check the count: "Media Items (3)" means 3 files
7. **Click "Create Notice"**
   - Your notice is published instantly

### Editing an Existing Notice

1. Find the notice you want to edit in the **"Existing Notices"** list
2. Click the **Edit** button
3. Modify:
   - Title
   - Message
   - Media items (remove by clicking the ✕ button)
   - Add new media items
4. Click **"Update Notice"**

### Deleting a Notice

1. Find the notice in the **"Existing Notices"** list
2. Click the **Delete** button
3. Confirm the deletion

### Removing Media Items While Editing

1. Click **Edit** on a notice
2. In the "Media Items" section, click the **✕ button** on any item
3. The media is removed (but the original file stays on Cloudinary)
4. Click **"Update Notice"** to save changes

## Notice Display on Website

### On the Homepage:
- Notices appear as **cards or popups** showing:
  - **Title**
  - **Message** (if provided)
  - **Gallery** of photos/videos in a grid layout
  - **Type badge** (PHOTO/VIDEO) on hover
  - **Descriptions** below each media item

### Media Preview:
- **Photos**: Display as thumbnail images in a grid
- **Videos**: Display as playable video with controls
- **Responsive**: Adjust to mobile (2 columns) and desktop (4 columns)

## Technical Details

### Database Structure (Notice Model)
```javascript
{
  title: String (required),
  message: String (optional),
  mediaItems: [
    {
      type: 'photo' or 'video',
      url: 'https://cloudinary.com/...',
      description: String (optional)
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### Supported File Types

| Type | Formats | Max Size |
|------|---------|----------|
| **Photos** | JPG, PNG, WebP, GIF | Recommended: < 5MB |
| **Videos** | MP4, WebM, OGG | Recommended: < 50MB |

## Important: Cloudinary Setup

To use photo and video uploads, you need to configure **Cloudinary**:

1. **Sign up** at [Cloudinary.com](https://cloudinary.com)
2. **Get your Cloud Name** from dashboard
3. **Create upload preset** (Settings → Upload → Presets)
   - Name it: `company_gallery`
   - Set "Signing Mode" to "Unsigned" for admin uploads
4. **Update the code** in `NoticesManager.jsx`:
   ```javascript
   // Replace these in the code:
   formData.append('upload_preset', 'company_gallery') // Your preset name
   const response = await fetch(`https://api.cloudinary.com/v1_1/your_cloud_name/...`)
                                                              ↑
                                            Replace with YOUR cloud name
   ```

## Example Notice Structure

### Notice: "Holiday Closure"
```
Title: Holiday Closure - Office Closed
Message: Our office will be closed from Dec 25-26 for the holidays. 
         Emergency contact available.

Media Items:
  1. photo: /holiday-banner.jpg (description: "Holiday greeting banner")
  2. photo: /office-sign.jpg (description: "Closed sign on office door")
  3. video: /holiday-message.mp4 (description: "Message from management")
```

### How It Displays:
- Bold headline: "Holiday Closure - Office Closed"
- Text: "Our office will be closed..."
- Grid showing 3 items (2 photos + 1 video)
- User can play video or zoom in on photos

## Troubleshooting

### "Failed to upload file to Cloudinary"
- **Solution**: Check that Cloudinary is configured correctly
- Verify Cloud Name and Upload Preset are correct
- Ensure upload preset is set to "Unsigned"

### Media items not showing
- **Solution**: Check browser console for errors
- Verify media URLs are accessible
- Clear browser cache

### Edit button doesn't load media
- **Solution**: This is normal; media loads from the database
- Wait a moment for the form to populate
- Refresh the page if stuck

### Can't delete media from notice
- **Solution**: Click the **✕ button** next to the media preview
- Must click **"Update Notice"** to save the deletion

## Tips for Best Results

1. **Optimize Images**: Use compressed images (500px width is enough)
2. **Video Format**: Use MP4 for best browser compatibility
3. **Descriptions**: Add helpful descriptions so visitors know what they're looking at
4. **Title Clarity**: Make titles clear and action-oriented
5. **Mobile Testing**: Check how notices look on mobile devices

## Updates Made

### Backend Files Modified:
- ✅ `backend/src/models/Notice.js` - Added mediaItems field
- ✅ `backend/src/routes/notices.js` - Updated to handle media

### Frontend Files Modified:
- ✅ `frontend/src/components/admin/NoticesManager.jsx` - Complete redesign
- ✅ `frontend/src/services/apiService.js` - Already supports media

## Next Steps

1. **Configure Cloudinary** with your credentials
2. **Test** creating a notice with photos and videos
3. **Update the Notice Display Component** on the homepage to show media (if not already done)
4. **Test on Mobile** to ensure responsive layout

