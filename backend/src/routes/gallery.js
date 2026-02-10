import express from 'express'
import Gallery from '../models/Gallery.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 })
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Upload gallery item (admin only)
router.post('/upload', protect, async (req, res) => {
  try {
    const { title, type, url, description } = req.body

    if (!title || !type || !url) {
      return res.status(400).json({ message: 'Please provide title, type, and url' })
    }

    if (!['photo', 'video'].includes(type)) {
      return res.status(400).json({ message: 'Type must be photo or video' })
    }

    const item = await Gallery.create({
      title,
      type,
      url,
      description
    })

    res.status(201).json(item)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update gallery item
router.put('/:id', protect, async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }

    res.json(item)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete gallery item
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id)

    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }

    res.json({ message: 'Item deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
