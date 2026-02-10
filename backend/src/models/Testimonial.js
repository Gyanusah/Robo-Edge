import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true
    },
    company: {
      type: String,
      trim: true
    },
    text: {
      type: String,
      required: [true, 'Please provide testimonial text'],
      trim: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    }
  },
  { timestamps: true }
)

export default mongoose.model('Testimonial', testimonialSchema)
