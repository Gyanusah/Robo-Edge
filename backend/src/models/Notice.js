import mongoose from 'mongoose'

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true
    },
    message: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      trim: true
    },
    mediaItems: [
      {
        type: {
          type: String,
          enum: ['photo', 'video'],
          default: 'photo'
        },
        url: {
          type: String
        },
        description: {
          type: String,
          trim: true
        }
      }
    ],
    isActive: {
      type: Boolean,
      default: true
    },
    isExpired: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

export default mongoose.model('Notice', noticeSchema)
