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

// Get all testimonials
router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const testimonials = await db.collection('testimonials').find({}).sort({ createdAt: -1 }).toArray();
    res.status(200).json(testimonials);
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create testimonial
router.post('/', async (req, res) => {
  try {
    const { name, message, rating, position } = req.body;
    
    if (!name || !message) {
      return res.status(400).json({ message: 'Please provide name and message' });
    }

    const db = await connectDB();
    const newTestimonial = {
      name,
      message,
      rating: rating || 5,
      position: position || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('testimonials').insertOne(newTestimonial);
    res.status(201).json({ ...newTestimonial, _id: result.insertedId });
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update testimonial
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (!id) {
      return res.status(400).json({ message: 'Please provide testimonial ID' });
    }

    const db = await connectDB();
    const result = await db.collection('testimonials').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json({ message: 'Testimonial updated successfully' });
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete testimonial
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'Please provide testimonial ID' });
    }

    const db = await connectDB();
    const result = await db.collection('testimonials').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
