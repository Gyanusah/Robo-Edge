import express from 'express'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/jwt.js'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user._id)

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/logout', protect, (req, res) => {
  res.json({ message: 'Logged out successfully' })
})

router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
