import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'

const router = express.Router()

// MongoDB connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/company-website'
let client = null;

async function connectDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db();
}

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const gallery = await db.collection('gallery').find({}).sort({ createdAt: -1 }).toArray();
    res.status(200).json(gallery);
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create gallery item
router.post('/', async (req, res) => {
  try {
    const { title, description, imageUrl, type } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Please provide a title' });
    }

    const db = await connectDB();
    const newGalleryItem = {
      title,
      description: description || '',
      imageUrl: imageUrl || '',
      type: type || 'photo',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('gallery').insertOne(newGalleryItem);
    res.status(201).json({ ...newGalleryItem, _id: result.insertedId });
  } catch (error) {
    console.error('Create gallery item error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update gallery item
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (!id) {
      return res.status(400).json({ message: 'Please provide gallery item ID' });
    }

    const db = await connectDB();
    const result = await db.collection('gallery').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.status(200).json({ message: 'Gallery item updated successfully' });
  } catch (error) {
    console.error('Update gallery item error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete gallery item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'Please provide gallery item ID' });
    }

    const db = await connectDB();
    const result = await db.collection('gallery').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.status(200).json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
