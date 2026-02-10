import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from './src/models/User.js'
import Notice from './src/models/Notice.js'
import Gallery from './src/models/Gallery.js'
import Testimonial from './src/models/Testimonial.js'

dotenv.config()

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected')

    // Clear all existing data
    await User.deleteMany({})
    await Notice.deleteMany({})
    await Gallery.deleteMany({})
    await Testimonial.deleteMany({})
    console.log('Cleared existing data')

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

    // Create sample gallery items
    const galleryItems = [
      {
        title: 'Mountain View',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1501785888021-af3d28e2da4e?w=800&h=600&fit=crop',
        description: 'Beautiful mountain landscape'
      },
      {
        title: 'City Lights',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
        description: 'Urban cityscape at night'
      },
      {
        title: 'Ocean Waves',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
        description: 'Peaceful ocean waves'
      },
      {
        title: 'Forest Walk',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        description: 'Dense forest pathway'
      },
      {
        title: 'Nature Video',
        type: 'video',
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        description: 'Nature documentary sample'
      },
      {
        title: 'Sea Video',
        type: 'video',
        url: 'https://www.w3schools.com/html/movie.mp4',
        description: 'Ocean waves video'
      }
    ]

    await Gallery.insertMany(galleryItems)
    console.log('Gallery items created:', galleryItems.length)

    // Create sample testimonials
    const testimonials = [
      {
        name: 'Sarah Williams',
        company: 'Design Co.',
        text: 'Amazing service! The team delivered everything on time and the quality was outstanding.',
        rating: 5
      },
      {
        name: 'John Doe',
        company: 'Tech Solutions',
        text: 'Great experience! The UI was clean, and the support was fast. Highly recommended.',
        rating: 5
      },
      {
        name: 'Emily Clark',
        company: 'Marketing Hub',
        text: 'Very professional team. They understood our requirements and executed perfectly.',
        rating: 4
      },
      {
        name: 'Michael Brown',
        company: 'Startup Labs',
        text: 'Outstanding work! The final product exceeded our expectations.',
        rating: 5
      },
      {
        name: 'Jessica Lee',
        company: 'Brand Studio',
        text: 'Great communication and fast delivery. Will work with them again.',
        rating: 4
      }
    ]

    await Testimonial.insertMany(testimonials)
    console.log('Testimonials created:', testimonials.length)

    // Create a sample notice with media items for testing
    const sampleNotice = await Notice.create({
      title: 'Welcome to Our Company',
      message: 'This is a test notice with photos and videos.',
      mediaItems: [
        {
          type: 'photo',
          url: 'https://picsum.photos/seed/notice1/400/300.jpg',
          description: 'Company Office'
        },
        {
          type: 'photo',
          url: 'https://picsum.photos/seed/notice2/400/300.jpg',
          description: 'Team Meeting'
        }
      ],
      isActive: true
    })

    console.log('Sample notice created:', sampleNotice.title)

    await mongoose.connection.close()
    console.log('Database seeding completed successfully!')
  } catch (error) {
    console.error('Seeding error:', error.message)
    process.exit(1)
  }
}

seedDatabase()
