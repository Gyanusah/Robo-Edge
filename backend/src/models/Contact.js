import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    phone: {
      type: String,
      trim: true
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject'],
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
      trim: true
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

export default mongoose.model('Contact', contactSchema)
