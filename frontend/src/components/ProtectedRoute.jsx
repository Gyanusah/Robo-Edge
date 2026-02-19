import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { decodeJWT } from '../utils/jwtUtils'

export default function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      console.log('🛡️ ProtectedRoute: Checking authorization...')
      const token = Cookies.get('token')
      console.log('🍪 Token found:', !!token)

      if (!token) {
        console.log('❌ No token - unauthorized')
        setIsAuthorized(false)
        setLoading(false)
        return
      }

      try {
        // Verify token locally using custom JWT decoder
        console.log('🔍 Decoding token...')
        const decoded = decodeJWT(token)
        console.log('👤 Decoded token:', decoded)
        
        if (decoded && (decoded.role === 'admin' || decoded.role === 'superadmin' || decoded.role === 'super_admin')) {
          console.log('✅ User authorized - role:', decoded.role)
          setIsAuthorized(true)
        } else {
          console.log('❌ User not authorized - role:', decoded?.role)
          setIsAuthorized(false)
        }
      } catch (error) {
        console.error('❌ Token decode failed:', error)
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
