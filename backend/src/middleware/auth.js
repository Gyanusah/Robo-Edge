import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    console.log('Auth header:', authHeader)

    const token = authHeader?.split(' ')[1]

    if (!token) {
      console.log('No token provided')
      return res.status(401).json({ message: 'No token provided' })
    }

    console.log('Verifying token...')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log('Token decoded, user id:', decoded.id)

    const user = await User.findById(decoded.id)

    if (!user) {
      console.log('User not found:', decoded.id)
      return res.status(401).json({ message: 'User not found' })
    }

    console.log('User authenticated:', user.email)
    req.user = user
    next()
  } catch (error) {
    console.error('Auth error:', error.message)
    res.status(401).json({ message: 'Invalid token', error: error.message })
  }
}

export const adminOnly = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' })
    }

    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      console.log('Access denied for user with role:', req.user.role)
      return res.status(403).json({ message: 'Access denied: Admin role required' })
    }

    console.log('Admin access granted for:', req.user.email)
    next()
  } catch (error) {
    console.error('Admin check error:', error.message)
    res.status(500).json({ message: 'Authorization check failed' })
  }
}

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Server error'

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}
