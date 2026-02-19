# Frontend Setup Guide

## Overview
React + Vite frontend with Tailwind CSS for responsive, mobile-first company website.

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Header.jsx         # Navigation with mobile menu
│   ├── Footer.jsx         # Footer with links
│   ├── Layout.jsx         # Main layout wrapper
│   ├── NoticePopup.jsx    # Floating notice popup
│   └── admin/             # Admin components
├── pages/
│   ├── Home.jsx           # Landing page
│   ├── About.jsx          # About page
│   ├── Services.jsx       # Services page
│   ├── Gallery.jsx        # Photo/video gallery
│   ├── Testimonials.jsx   # Testimonials + Google Reviews
│   ├── Contact.jsx        # Contact form + map
│   └── admin/
│       ├── Login.jsx      # Admin login
│       └── Dashboard.jsx  # Admin dashboard
├── services/
│   ├── api.js             # Axios instance
│   └── apiService.js      # API functions
├── styles/
│   └── index.css          # Tailwind + custom CSS
├── App.jsx                # Main app component
└── main.jsx               # Entry point
```

## Available Scripts

### Development
```bash
npm run dev
```
Starts Vite dev server with hot reload.

### Production Build
```bash
npm run build
```
Creates optimized build in `dist/` folder.

### Preview Build
```bash
npm run preview
```
Preview production build locally.

## Configuration

### Tailwind CSS
Edit `tailwind.config.js` to customize colors, spacing, and breakpoints.

```js
theme: {
  extend: {
    colors: {
      primary: '#1f2937',
      secondary: '#3b82f6',
      accent: '#10b981'
    }
  }
}
```

### API Base URL
Set in `.env.local`:
```
VITE_API_BASE_URL=http://localhost:5000
```

### Vite Proxy
Backend requests are automatically proxied in `vite.config.js`:
- `/api/...` → `http://localhost:5000/...`

## Components

### Header
Mobile-responsive navigation with hamburger menu.

### Footer
Responsive footer with company info and links.

### NoticePopup
- Fetches latest notice from API
- Uses sessionStorage to show once per session
- Auto-closes or manual close

### Gallery
- Filterable by photo/video
- Hover effects on items
- Responsive grid layout

### Contact Form
- Form validation
- Success/error messages
- Google Maps embedded

## Pages

### Public Pages
All public pages load data from the backend API.

### Admin Pages
Protected routes that require JWT authentication.

**Admin Login Page:**
- Email: admin@company.com
- Password: password123

**Admin Dashboard:**
- Notices Manager (CRUD)
- Gallery Manager (upload, delete)
- Testimonials Manager (CRUD)

## Styling

### Tailwind Classes
Already configured with responsive prefixes:
```html
<div class="text-sm md:text-lg lg:text-xl">
  Responsive text
</div>
```

### Custom Styles
Add to `src/styles/index.css`:
```css
.my-custom-class {
  @apply flex items-center justify-between;
}
```

## API Integration

All API calls use the `api` instance from `services/api.js`:

```js
import { galleryApi } from '@/services/apiService'

const response = await galleryApi.getItems()
```

Endpoints automatically include:
- Base URL from `.env.local`
- JWT token in Authorization header
- CORS headers

## Authentication

Tokens are stored in cookies (via `js-cookie`):
```js
import Cookies from 'js-cookie'

// Set token after login
Cookies.set('token', token)

// Token auto-included in requests
// Remove on logout
Cookies.remove('token')
```

## Responsive Design

### Breakpoints
- `sm`: 640px (tablets)
- `md`: 768px (landscape tablets)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

### Mobile-First Approach
```html
<!-- Mobile first, then enhance -->
<div class="block md:flex">
  <div class="w-full md:w-1/2">Left</div>
  <div class="w-full md:w-1/2">Right</div>
</div>
```

## Troubleshooting

### API Not Responding
- Check backend is running on port 5000
- Verify proxy in `vite.config.js`
- Check VITE_API_BASE_URL in `.env.local`

### Token Expired
- Auto-logout on 401 response
- Redirect to login page
- User can log in again

### CORS Error
- Ensure backend has CORS enabled
- Check frontend URL in backend CORS config

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Dependencies

- **react**: UI library
- **react-dom**: React rendering
- **react-router-dom**: Routing
- **axios**: HTTP client
- **js-cookie**: Cookie management
- **tailwindcss**: Styling
- **vite**: Build tool

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Update `VITE_API_BASE_URL` if needed
3. Run `npm install`
4. Start with `npm run dev`

## Performance Tips

- Use React.lazy for code splitting
- Optimize images with proper sizing
- Minimize bundle size
- Enable gzip compression on server
- Use production build for deployment

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Next Steps

1. Update company info in pages
2. Customize colors in tailwind.config.js
3. Add company logo
4. Update Google Maps embed
5. Configure Cloudinary for gallery
6. Deploy to production
