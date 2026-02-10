import { MongoClient, ObjectId } from 'mongodb'

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

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const db = await connectToDatabase()
    const collection = db.collection('testimonials')

    switch (req.method) {
      case 'GET':
        const testimonials = await collection.find({}).sort({ createdAt: -1 }).toArray()
        return res.status(200).json(testimonials)

      case 'POST':
        const { name, company, text, rating } = req.body
        
        if (!name || !text) {
          return res.status(400).json({ message: 'Please provide name and text' })
        }

        const newTestimonial = {
          name,
          company,
          text,
          rating: rating || 5,
          createdAt: new Date(),
          updatedAt: new Date()
        }

        const result = await collection.insertOne(newTestimonial)
        return res.status(201).json({ ...newTestimonial, _id: result.insertedId })

      case 'PUT':
        const { id } = req.query
        const updateData = req.body
        
        if (!id) {
          return res.status(400).json({ message: 'Please provide testimonial ID' })
        }

        const updateResult = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { ...updateData, updatedAt: new Date() } }
        )

        if (updateResult.matchedCount === 0) {
          return res.status(404).json({ message: 'Testimonial not found' })
        }

        return res.status(200).json({ message: 'Testimonial updated successfully' })

      case 'DELETE':
        const { id: deleteId } = req.query
        
        if (!deleteId) {
          return res.status(400).json({ message: 'Please provide testimonial ID' })
        }

        const deleteResult = await collection.deleteOne({ _id: new ObjectId(deleteId) })

        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ message: 'Testimonial not found' })
        }

        return res.status(200).json({ message: 'Testimonial deleted successfully' })

      default:
        res.setHeader('Allow', 'GET, POST, PUT, DELETE')
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ message: 'Internal Server Error', error: error.message })
  }
}
