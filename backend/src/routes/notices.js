import express from 'express'
import Notice from '../models/Notice.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Get all notices
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 })
    res.json(notices)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create notice (admin only)
router.post('/', protect, async (req, res) => {
  try {
    const { title, message, mediaItems } = req.body

    if (!title) {
      return res.status(400).json({ message: 'Please provide a title' })
    }

    const notice = await Notice.create({
      title,
      message: message || '',
      mediaItems: mediaItems || []
    })
    res.status(201).json(notice)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update notice
router.put('/:id', protect, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' })
    }

    res.json(notice)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete notice
router.delete('/:id', protect, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id)

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' })
    }

    res.json({ message: 'Notice deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Expire notice (mark as expired so it doesn't show on homepage)
router.patch('/:id/expire', protect, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      { isExpired: true },
      { new: true, runValidators: true }
    )

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' })
    }

    res.json(notice)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
