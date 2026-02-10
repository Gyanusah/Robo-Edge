import mongoose from 'mongoose'

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true
    },
    type: {
      type: String,
      enum: ['photo', 'video'],
      required: true
    },
    url: {
      type: String,
      required: [true, 'Please provide a URL']
    },
    cloudinaryId: String,
    description: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('Gallery', gallerySchema)
