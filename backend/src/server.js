import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

// Import API routes
import authRoutes from './api/auth.js'
import noticeRoutes from './api/notices.js'
import galleryRoutes from './api/gallery.js'
import testimonialRoutes from './api/testimonials.js'
import contactRoutes from './api/contact.js'

// Load environment variables
dotenv.config()

const app = express()

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-app.vercel.app']
    : ['http://localhost:5173'],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/notices', noticeRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/testimonials', testimonialRoutes)
app.use('/api/contact', contactRoutes)

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Server is running' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
