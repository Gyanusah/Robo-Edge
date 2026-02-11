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

// Get all notices
router.get('/', async (req, res) => {
  try {
    console.log('📋 Fetching all notices');
    const db = await connectDB();
    const notices = await db.collection('notices').find({}).sort({ createdAt: -1 }).toArray();
    console.log('✅ Found', notices.length, 'notices');
    res.status(200).json(notices);
  } catch (error) {
    console.error('❌ Get notices error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create notice
router.post('/', async (req, res) => {
  try {
    console.log('📝 Creating new notice:', req.body.title);
    const { title, message, mediaItems } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Please provide a title' });
    }

    const db = await connectDB();
    const newNotice = {
      title,
      message: message || '',
      mediaItems: mediaItems || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('notices').insertOne(newNotice);
    console.log('✅ Notice created with ID:', result.insertedId);
    res.status(201).json({ ...newNotice, _id: result.insertedId });
  } catch (error) {
    console.error('❌ Create notice error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update notice
router.put('/:id', async (req, res) => {
  try {
    console.log('📝 Updating notice:', req.params.id);
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Please provide notice ID' });
    }

    const db = await connectDB();
    const result = await db.collection('notices').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      console.log('❌ Notice not found:', id);
      return res.status(404).json({ message: 'Notice not found' });
    }

    console.log('✅ Notice updated successfully');
    res.status(200).json({ message: 'Notice updated successfully' });
  } catch (error) {
    console.error('❌ Update notice error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete notice
router.delete('/:id', async (req, res) => {
  try {
    console.log('🗑️ Deleting notice:', req.params.id);
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Please provide notice ID' });
    }

    const db = await connectDB();
    const result = await db.collection('notices').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      console.log('❌ Notice not found:', id);
      return res.status(404).json({ message: 'Notice not found' });
    }

    console.log('✅ Notice deleted successfully');
    res.status(200).json({ message: 'Notice deleted successfully' });
  } catch (error) {
    console.error('❌ Delete notice error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
