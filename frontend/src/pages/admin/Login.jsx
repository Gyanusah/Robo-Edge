import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { authApi } from '@/services/apiService'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('🔐 Starting login request...')
      const response = await authApi.login({ email, password })
      console.log('📋 Full login response:', response)
      console.log('📋 Response data:', response.data)
      console.log('📋 Response status:', response.status)
      
      if (response.data && response.data.accessToken) {
        console.log('✅ Token found, setting cookie...')
        Cookies.set('token', response.data.accessToken)
        console.log('🍪 Cookie set, navigating to dashboard...')
        
        // Try React Router navigate first
        try {
          navigate('/admin/dashboard')
          console.log('✅ React Router navigate called')
        } catch (navError) {
          console.error('❌ Navigate error:', navError)
        }
        
        // Fallback: manual redirect
        setTimeout(() => {
          console.log('🔄 Using manual redirect fallback...')
          window.location.href = '/admin/dashboard'
        }, 100)
      } else {
        console.log('❌ No token in response data')
        setError('No token received from server')
      }
    } catch (err) {
      console.error('❌ Login error:', err)
      console.error('❌ Error response:', err.response)
      setError(err.response?.data?.message || err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-primary/80 p-8 rounded-lg shadow-lg max-w-md w-full border border-primary/50">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Admin Login</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-900/50 text-red-200 rounded-lg border border-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-primary/50 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-secondary placeholder-gray-500"
              placeholder="admin@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-primary/50 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-secondary placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-semibold"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Demo: admin@company.com / password123
        </p>
      </div>
    </div>
  )
}
