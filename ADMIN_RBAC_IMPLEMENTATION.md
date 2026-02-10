# Admin Role-Based Access Control Implementation

## Overview
This document outlines the role-based access control (RBAC) implementation for the admin section of the company website. The system ensures that the Admin menu is hidden from regular users while still allowing authenticated admins to access the admin dashboard directly via URL.

## Implementation Details

### 1. **Frontend Components**

#### ProtectedRoute Component (`frontend/src/components/ProtectedRoute.jsx`)
- Created a new route protection component that wraps admin routes
- **Functionality:**
  - Checks if user has a valid token
  - Verifies user role (admin or superadmin) via `/auth/me` API endpoint
  - Displays loading state while checking authentication
  - Redirects unauthorized users to `/admin/login`
  - Only allows access if user has admin role

#### Header Component (`frontend/src/components/Header.jsx`)
- **Updated to:**
  - Check user authentication status on component mount
  - Only display "Admin Dashboard" link for authenticated admin users
  - Hide admin link from regular users and guests
  - Changed "Admin" link to "Admin Dashboard" for clarity
  - Applied to both desktop and mobile navigation menus

#### App.jsx Routing
- Wrapped the admin dashboard route with `<ProtectedRoute>` component
- Keeps `/admin/login` publicly accessible for authentication
- Protects `/admin/dashboard` with role-based access control

### 2. **API Service Updates**

#### apiService.js (`frontend/src/services/apiService.js`)
- **Added new endpoint:**
  - `authApi.getMe()`: Fetches current user's profile and role information
  - Automatically includes auth token via axios interceptors
  - Returns user object with `role` field

#### Existing API Interceptor (`frontend/src/services/api.js`)
- Already configured to:
  - Automatically add Bearer token to all authenticated requests
  - Handle 401 (Unauthorized) responses by clearing token and redirecting to login
  - No changes required

### 3. **Backend Middleware**

#### Authentication Middleware (`backend/src/middleware/auth.js`)
- **Added new middleware:**
  - `adminOnly`: Middleware function that:
    - Checks if user is authenticated
    - Verifies user has 'admin' or 'superadmin' role
    - Returns 403 (Forbidden) if user lacks admin role
    - Allows request to proceed if user is authorized

#### User Model (`backend/src/models/User.js`)
- Already includes `role` field with enum values: ['admin', 'superadmin']
- Default role: 'admin'
- No changes required

#### Auth Routes (`backend/src/routes/auth.js`)
- `/auth/login` - Returns user object with role on successful login
- `/auth/me` - Returns authenticated user's profile (already implemented)
- Can be extended with `adminOnly` middleware for protected routes

## User Access Flow

### For Regular Users/Guests:
1. Access website home page → "Admin Dashboard" link NOT visible in navbar
2. Cannot manually navigate to `/admin/dashboard` → Redirected to `/admin/login`
3. Can only access login page if they manually type `/admin/login`

### For Authenticated Admin Users:
1. Login via `/admin/login` with admin credentials
2. Receive JWT token + user object with role
3. Token stored in cookies
4. "Admin Dashboard" link now VISIBLE in navbar
5. Can access `/admin/dashboard` directly
6. Can navigate via navbar or direct URL
7. Session persists across page refreshes (via token in cookies)

## Security Features

✅ **Hidden Admin Links** - Regular users never see admin navigation options
✅ **Token-Based Authentication** - JWT tokens verify user identity
✅ **Role-Based Authorization** - Only 'admin' or 'superadmin' roles can access admin pages
✅ **Frontend Route Protection** - ProtectedRoute component prevents unauthorized access
✅ **Backend Validation** - Server-side middleware enforces authorization
✅ **Automatic Redirect** - Unauthorized access attempts redirect to login
✅ **Session Management** - Tokens stored securely in HTTP-only cookies (via js-cookie)
✅ **Error Handling** - Clear error messages for failed authentications

## Configuration

### Default Admin Credentials (for testing):
- Email: `admin@company.com`
- Password: `password123`
(These are configured in the backend/seed.js or user database)

## Testing the Implementation

### Test Case 1: Regular User Navigation
1. Access website without logging in
2. Verify "Admin Dashboard" link is NOT in navbar
3. Manually type `www.mywebsite.com/admin/dashboard` in browser
4. Should redirect to `/admin/login`

### Test Case 2: Admin User Navigation
1. Login with admin credentials
2. Verify "Admin Dashboard" link NOW appears in navbar
3. Click the admin link → Should open admin dashboard
4. Refresh page → Should stay on admin dashboard (token persists)
5. Logout → Redirected to login, navbar link disappears

### Test Case 3: Session Persistence
1. Login as admin
2. Close browser window completely
3. Open website again
4. Navigate directly to `/admin/dashboard`
5. Should open normally if token cookie still valid
6. If token expired → Redirected to login

### Test Case 4: Token Expiration
1. Login as admin
2. Wait for token to expire (or manually remove token)
3. Try to access `/admin/dashboard`
4. Should redirect to `/admin/login`

## Files Modified

1. ✅ `frontend/src/components/ProtectedRoute.jsx` - NEW (Route protection)
2. ✅ `frontend/src/App.jsx` - Updated (Added ProtectedRoute wrapper)
3. ✅ `frontend/src/components/Header.jsx` - Updated (Conditional admin link)
4. ✅ `frontend/src/services/apiService.js` - Updated (Added getMe endpoint)
5. ✅ `backend/src/middleware/auth.js` - Updated (Added adminOnly middleware)

## Future Enhancements

1. **Multiple Admin Roles** - Extend 'admin' to have different permission levels
2. **Admin Audit Logging** - Log all admin actions for security
3. **Token Refresh** - Implement refresh token strategy for longer sessions
4. **Permission System** - Fine-grained permissions per admin action (create, edit, delete)
5. **Session Timeout** - Auto-logout after inactivity period
6. **Two-Factor Authentication** - Additional security for admin accounts

## Troubleshooting

### "Admin Dashboard" link not showing for logged-in users:
- Check if token is properly stored in cookies
- Verify user role in database is 'admin' or 'superadmin'
- Check browser console for API errors
- Ensure `/auth/me` endpoint is working

### Getting redirected to login when accessing admin page:
- Token might have expired
- User role might not be 'admin' or 'superadmin'
- Check backend middleware logs for detailed error messages

### CORS errors when fetching user data:
- Verify API is running on correct port (default: 5000)
- Check CORS configuration in backend

