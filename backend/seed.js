import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from './src/models/User.js'
import Notice from './src/models/Notice.js'

dotenv.config()

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected')

    // Clear existing users and notices
    await User.deleteMany({})
    await Notice.deleteMany({})
    console.log('Cleared existing users and notices')

    // Create default admin user
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('password123', salt)

    const adminUser = await User.create({
      email: 'admin@company.com',
      password: hashedPassword,
      role: 'admin'
    })

    console.log('Admin user created:', adminUser.email)
    console.log('Credentials: admin@company.com / password123')

    // Create a sample notice with media items for testing
    const sampleNotice = await Notice.create({
      title: 'Welcome to Our Company',
      message: 'This is a test notice with photos and videos.',
      mediaItems: [
        {
          type: 'photo',
          url: 'https://via.placeholder.com/400x300?text=Photo+1',
          description: 'Sample Photo 1'
        },
        {
          type: 'photo',
          url: 'https://via.placeholder.com/400x300?text=Photo+2',
          description: 'Sample Photo 2'
        }
      ],
      isActive: true
    })

    console.log('Sample notice created:', sampleNotice.title)

    await mongoose.connection.close()
    console.log('Database seeding completed')
  } catch (error) {
    console.error('Seeding error:', error.message)
    process.exit(1)
  }
}

seedDatabase()
