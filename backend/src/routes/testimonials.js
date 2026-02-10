import express from 'express'
import Testimonial from '../models/Testimonial.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Get all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 })
    res.json(testimonials)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create testimonial (admin only)
router.post('/', protect, async (req, res) => {
  try {
    const { name, company, text, rating } = req.body

    if (!name || !text) {
      return res.status(400).json({ message: 'Please provide name and text' })
    }

    const testimonial = await Testimonial.create({
      name,
      company,
      text,
      rating: rating || 5
    })

    res.status(201).json(testimonial)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update testimonial
router.put('/:id', protect, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' })
    }

    res.json(testimonial)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete testimonial
router.delete('/:id', protect, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id)

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' })
    }

    res.json({ message: 'Testimonial deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
