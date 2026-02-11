import { MongoClient, ObjectId } from 'mongodb'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// MongoDB Atlas connection
const uri = process.env.MONGODB_URI
const options = {
  retryWrites: true,
  w: 'majority'
}

let cachedDb = null

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }

  try {
    const client = new MongoClient(uri, options)
    await client.connect()
    cachedDb = client.db()
    return cachedDb
  } catch (error) {
    console.error('Database connection error:', error)
    throw error
  }
}

// Authentication middleware
async function authenticate(req) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
  } catch (error) {
    return null
  }
}

// Initialize default admin if not exists
async function initializeDefaultAdmin(db) {
  const usersCollection = db.collection('users')
  const adminExists = await usersCollection.findOne({ email: process.env.ADMIN_EMAIL })

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)
    await usersCollection.insertOne({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      name: 'Super Admin',
      role: 'super_admin',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    console.log('Default admin created:', process.env.ADMIN_EMAIL)
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const db = await connectToDatabase()
    const usersCollection = db.collection('users')

    // Initialize default admin
    await initializeDefaultAdmin(db)

    switch (req.method) {
      case 'POST':
        // Login endpoint
        if (req.url.includes('/login')) {
          const { email, password } = req.body

          if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' })
          }

          // Find user
          const user = await usersCollection.findOne({ email })
          if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
          }

          // Check password
          const isMatch = await bcrypt.compare(password, user.password)
          if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
          }

          // Generate token
          const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
          )

          return res.status(200).json({
            token,
            user: {
              id: user._id,
              email: user.email,
              name: user.name,
              role: user.role
            }
          })
        }

        // Create admin endpoint
        if (req.url.includes('/create-admin')) {
          const user = await authenticate(req)
          if (!user) {
            return res.status(401).json({ message: 'No token provided' })
          }

          // Check if user is admin
          const currentUser = await usersCollection.findOne({ _id: new ObjectId(user.userId) })
          if (!currentUser || currentUser.role !== 'super_admin') {
            return res.status(403).json({ message: 'Only super admins can create other admins' })
          }

          const { email, password, name, role = 'admin' } = req.body

          if (!email || !password || !name) {
            return res.status(400).json({ message: 'Please provide email, password, and name' })
          }

          // Check if admin already exists
          const existingAdmin = await usersCollection.findOne({ email })
          if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email already exists' })
          }

          // Hash password
          const hashedPassword = await bcrypt.hash(password, 12)

          // Create new admin
          const newAdmin = await usersCollection.insertOne({
            email,
            password: hashedPassword,
            name,
            role,
            createdAt: new Date(),
            updatedAt: new Date()
          })

          return res.status(201).json({
            message: 'Admin created successfully',
            admin: {
              id: newAdmin.insertedId,
              email,
              name,
              role
            }
          })
        }

        // Logout endpoint
        if (req.url.includes('/logout')) {
          return res.status(200).json({ message: 'Logged out successfully' })
        }

        return res.status(404).json({ message: 'Endpoint not found' })

      case 'GET':
        // Get current user (me endpoint)
        if (req.url.includes('/me')) {
          const user = await authenticate(req)
          if (!user) {
            return res.status(401).json({ message: 'No token provided' })
          }

          const userData = await usersCollection.findOne({ _id: new ObjectId(user.userId) })
          if (!userData) {
            return res.status(404).json({ message: 'User not found' })
          }

          return res.status(200).json({
            id: userData._id,
            email: userData.email,
            name: userData.name,
            role: userData.role
          })
        }

        // Get all admins (super admin only)
        if (req.url.includes('/admins')) {
          const user = await authenticate(req)
          if (!user) {
            return res.status(401).json({ message: 'No token provided' })
          }

          const currentUser = await usersCollection.findOne({ _id: new ObjectId(user.userId) })
          if (!currentUser || currentUser.role !== 'super_admin') {
            return res.status(403).json({ message: 'Only super admins can view all admins' })
          }

          const admins = await usersCollection.find({ role: { $in: ['admin', 'super_admin'] } })
            .project({ password: 0 }) // Exclude password
            .sort({ createdAt: -1 })
            .toArray()

          return res.status(200).json(admins)
        }

        return res.status(404).json({ message: 'Endpoint not found' })

      default:
        res.setHeader('Allow', 'GET, POST')
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ message: 'Internal Server Error', error: error.message })
  }
}
