import express from 'express'
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

// Get all contact messages
router.get('/messages', async (req, res) => {
  try {
    console.log('📧 Fetching all contact messages');
    const db = await connectDB();
    const messages = await db.collection('contacts').find({}).sort({ createdAt: -1 }).toArray();
    console.log('✅ Found', messages.length, 'contact messages');
    res.status(200).json(messages);
  } catch (error) {
    console.error('❌ Get contact messages error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Send contact message
router.post('/send', async (req, res) => {
  try {
    console.log('📧 Sending contact message:', req.body.name);
    const { name, email, message, phone } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide name, email, and message' });
    }

    const db = await connectDB();
    const newMessage = {
      name,
      email,
      message,
      phone: phone || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('contacts').insertOne(newMessage);
    console.log('✅ Contact message sent with ID:', result.insertedId);
    res.status(201).json({ ...newMessage, _id: result.insertedId });
  } catch (error) {
    console.error('❌ Send contact message error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
