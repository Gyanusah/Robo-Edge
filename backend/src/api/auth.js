import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { MongoClient, ObjectId } from 'mongodb'

const router = express.Router()

// MongoDB connection - use local MongoDB for development
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/company-website'
let client = null;

async function connectDB() {
  if (!client) {
    try {
      client = new MongoClient(uri);
      await client.connect();
      console.log('✅ MongoDB connected successfully');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    }
  }
  return client.db();
}

// Initialize default admin
async function initializeAdmin(db) {
  try {
    const usersCollection = db.collection('users');
    const adminExists = await usersCollection.findOne({ email: 'admin@company.com' });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123456', 12);
      await usersCollection.insertOne({
        email: 'admin@company.com',
        password: hashedPassword,
        name: 'Super Admin',
        role: 'super_admin',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('✅ Default admin created: admin@company.com');
    }
  } catch (error) {
    console.error('❌ Error initializing admin:', error);
  }
}

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    console.log('🔐 Login attempt for:', req.body.email);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const db = await connectDB();
    await initializeAdmin(db);

    const user = await db.collection('users').findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Password mismatch for:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET || 'default_secret_key_change_in_production',
      { expiresIn: '7d' }
    );

    console.log('✅ Login successful for:', email);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key_change_in_production');

    const db = await connectDB();
    const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    });
  } catch (error) {
    console.error('❌ Get me error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;
