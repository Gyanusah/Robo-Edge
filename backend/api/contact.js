import { MongoClient } from 'mongodb'

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const db = await connectToDatabase()
    const collection = db.collection('contacts')

    switch (req.method) {
      case 'GET':
        const contacts = await collection.find({}).sort({ createdAt: -1 }).toArray()
        return res.status(200).json(contacts)

      case 'POST':
        const { name, email, subject, message } = req.body
        
        if (!name || !email || !message) {
          return res.status(400).json({ message: 'Please provide name, email, and message' })
        }

        const newContact = {
          name,
          email,
          subject,
          message,
          createdAt: new Date(),
          updatedAt: new Date()
        }

        const result = await collection.insertOne(newContact)
        return res.status(201).json({ 
          ...newContact, 
          _id: result.insertedId,
          message: 'Contact form submitted successfully' 
        })

      default:
        res.setHeader('Allow', 'GET, POST')
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ message: 'Internal Server Error', error: error.message })
  }
}
