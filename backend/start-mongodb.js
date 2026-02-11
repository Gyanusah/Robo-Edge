// Simple script to check MongoDB connection
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/company-website';

async function testConnection() {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔗 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ MongoDB connected successfully!');
    
    // Test database operations
    const db = client.db();
    const collections = await db.listCollections().toArray();
    console.log('📁 Available collections:', collections.map(c => c.name));
    
    // Close connection
    await client.close();
    console.log('✅ MongoDB connection closed');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    console.log('\n💡 Solutions:');
    console.log('1. Make sure MongoDB is installed: npm install -g mongodb-community');
    console.log('2. Start MongoDB service: mongod');
    console.log('3. Check if MongoDB is running on port 27017');
    console.log('4. Try: netstat -an | findstr :27017');
  }
}

testConnection();
