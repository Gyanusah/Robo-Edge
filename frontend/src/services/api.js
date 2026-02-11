import axios from 'axios'
import Cookies from 'js-cookie'

// Use backend server for now (will change to serverless after deployment)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests (only for protected routes)
api.interceptors.request.use((config) => {
  // Only add token for protected routes (admin endpoints)
  const protectedRoutes = ['/auth/', '/gallery/upload', '/notices/upload', '/contact/submit']
  const isProtectedRoute = protectedRoutes.some(route => config.url.includes(route))

  // Exclude only GET requests for public endpoints
  const isPublicGetRequest = config.method === 'get' && (
    config.url.includes('/notices') ||
    config.url.includes('/testimonials') ||
    config.url.includes('/gallery')
  )

  // Add token for:
  // 1. All requests to protected routes
  // 2. All non-GET requests to notices/testimonials/gallery (PUT, POST, DELETE)
  const shouldAddToken = isProtectedRoute || (
    (config.method !== 'get' && (
      config.url.includes('/notices') ||
      config.url.includes('/testimonials') ||
      config.url.includes('/gallery')
    ))
  )

  if (shouldAddToken) {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data)
    // Only redirect to login on actual auth failure for protected routes
    if (error.response?.status === 401) {
      const isProtectedRequest = error.config?.url?.includes('/auth/') ||
        (error.config?.method !== 'get' && (
          error.config?.url?.includes('/notices') ||
          error.config?.url?.includes('/testimonials') ||
          error.config?.url?.includes('/gallery')
        ))

      if (isProtectedRequest) {
        console.log('Unauthorized - removing token and redirecting to login')
        Cookies.remove('token')
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
