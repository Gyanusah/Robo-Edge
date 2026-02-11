import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { errorHandler, protect } from './middleware/auth.js'
import authRoutes from './routes/auth.js'
import noticesRoutes from './routes/notices.js'
import galleryRoutes from './routes/gallery.js'
import testimonialsRoutes from './routes/testimonials.js'
import contactRoutes from './routes/contact.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}))

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err.message))

// Routes
app.use('/auth', authRoutes)
app.use('/notices', noticesRoutes)
app.use('/gallery', galleryRoutes)
app.use('/testimonials', testimonialsRoutes)
app.use('/contact', contactRoutes)

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Server is running' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
