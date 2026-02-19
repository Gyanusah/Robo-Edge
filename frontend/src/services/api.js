import axios from 'axios'
import Cookies from 'js-cookie'

// Dynamic API base URL for deployment
const getApiBaseUrl = () => {
  // Check if we're in browser
  if (typeof window !== 'undefined') {
    // For local development, use backend server
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
    }
    // For production (Vercel), use serverless functions
    return '/api'
  }
  // Fallback for SSR or other environments
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 second timeout
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  // Add token for all requests except login
  const isLoginRequest = config.url.includes('/auth/login')

  if (!isLoginRequest) {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Handle token expiration and other errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data)

    // Handle aborted requests specifically
    if (error.code === 'ECONNABORTED') {
      console.error('Request was aborted or timed out')
      return Promise.reject(new Error('Request timeout - please try again'))
    }

    // Only redirect to login on 401 for protected routes (not login itself)
    if (error.response?.status === 401) {
      const isLoginRequest = error.config?.url?.includes('/auth/login')

      if (!isLoginRequest) {
        console.log('Unauthorized - removing token and redirecting to login')
        Cookies.remove('token')
        if (typeof window !== 'undefined') {
          window.location.href = '/admin/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

export default api
