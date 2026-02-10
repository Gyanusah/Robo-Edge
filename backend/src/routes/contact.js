import express from 'express'
import Contact from '../models/Contact.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Create contact message
router.post('/send', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please provide all required fields' })
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message
    })

    res.status(201).json({
      message: 'Message sent successfully',
      contact
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get all messages (admin only)
router.get('/messages', protect, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Mark as read
router.put('/:id/read', protect, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    )

    res.json(contact)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete message
router.delete('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)

    if (!contact) {
      return res.status(404).json({ message: 'Message not found' })
    }

    res.json({ message: 'Message deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
