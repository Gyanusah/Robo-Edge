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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const db = await connectToDatabase()
    const collection = db.collection('notices')

    switch (req.method) {
      case 'GET':
        const notices = await collection.find({}).sort({ createdAt: -1 }).toArray()
        return res.status(200).json(notices)

      case 'POST':
        const { title, message, mediaItems } = req.body
        
        if (!title) {
          return res.status(400).json({ message: 'Please provide a title' })
        }

        const newNotice = {
          title,
          message: message || '',
          mediaItems: mediaItems || [],
          createdAt: new Date(),
          updatedAt: new Date()
        }

        const result = await collection.insertOne(newNotice)
        return res.status(201).json({ ...newNotice, _id: result.insertedId })

      case 'PUT':
        const { id } = req.query
        const updateData = req.body
        
        if (!id) {
          return res.status(400).json({ message: 'Please provide notice ID' })
        }

        const updateResult = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { ...updateData, updatedAt: new Date() } }
        )

        if (updateResult.matchedCount === 0) {
          return res.status(404).json({ message: 'Notice not found' })
        }

        return res.status(200).json({ message: 'Notice updated successfully' })

      case 'DELETE':
        const { id: deleteId } = req.query
        
        if (!deleteId) {
          return res.status(400).json({ message: 'Please provide notice ID' })
        }

        const deleteResult = await collection.deleteOne({ _id: new ObjectId(deleteId) })

        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ message: 'Notice not found' })
        }

        return res.status(200).json({ message: 'Notice deleted successfully' })

      case 'PATCH':
        const { id: expireId } = req.query
        
        if (!expireId) {
          return res.status(400).json({ message: 'Please provide notice ID' })
        }

        const expireResult = await collection.updateOne(
          { _id: new ObjectId(expireId) },
          { $set: { isExpired: true, updatedAt: new Date() } }
        )

        if (expireResult.matchedCount === 0) {
          return res.status(404).json({ message: 'Notice not found' })
        }

        return res.status(200).json({ message: 'Notice expired successfully' })

      default:
        res.setHeader('Allow', 'GET, POST, PUT, DELETE, PATCH')
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ message: 'Internal Server Error', error: error.message })
  }
}
