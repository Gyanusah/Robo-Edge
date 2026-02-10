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
    const collection = db.collection('gallery')

    switch (req.method) {
      case 'GET':
        const items = await collection.find({}).sort({ createdAt: -1 }).toArray()
        return res.status(200).json(items)

      case 'POST':
        const { title, type, url, description } = req.body
        
        if (!title || !type || !url) {
          return res.status(400).json({ message: 'Please provide title, type, and url' })
        }

        if (!['photo', 'video'].includes(type)) {
          return res.status(400).json({ message: 'Type must be photo or video' })
        }

        const newItem = {
          title,
          type,
          url,
          description,
          createdAt: new Date(),
          updatedAt: new Date()
        }

        const result = await collection.insertOne(newItem)
        return res.status(201).json({ ...newItem, _id: result.insertedId })

      case 'PUT':
        const { id } = req.query
        const updateData = req.body
        
        if (!id) {
          return res.status(400).json({ message: 'Please provide gallery item ID' })
        }

        const updateResult = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { ...updateData, updatedAt: new Date() } }
        )

        if (updateResult.matchedCount === 0) {
          return res.status(404).json({ message: 'Item not found' })
        }

        return res.status(200).json({ message: 'Gallery item updated successfully' })

      case 'DELETE':
        const { id: deleteId } = req.query
        
        if (!deleteId) {
          return res.status(400).json({ message: 'Please provide gallery item ID' })
        }

        const deleteResult = await collection.deleteOne({ _id: new ObjectId(deleteId) })

        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ message: 'Item not found' })
        }

        return res.status(200).json({ message: 'Gallery item deleted successfully' })

      default:
        res.setHeader('Allow', 'GET, POST, PUT, DELETE')
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ message: 'Internal Server Error', error: error.message })
  }
}
