import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { authApi } from '@/services/apiService'

export default function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token')

      if (!token) {
        setIsAuthorized(false)
        setLoading(false)
        return
      }

      try {
        // Verify token and get user role
        const response = await authApi.getMe()
        if (response.data && (response.data.role === 'admin' || response.data.role === 'superadmin')) {
          setIsAuthorized(true)
        } else {
          setIsAuthorized(false)
        }
      } catch (error) {
        console.error('Auth verification failed:', error)
        setIsAuthorized(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-lg">Loading...</p>
      </div>
    )
  }

  if (!isAuthorized) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
