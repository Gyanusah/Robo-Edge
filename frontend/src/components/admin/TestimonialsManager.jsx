import { useState, useEffect } from 'react'
import { testimonialsApi } from '@/services/apiService'

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    text: '',
    rating: 5
  })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialsApi.getTestimonials()
      setTestimonials(response.data.testimonials || response.data || [])
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.text.trim() || !formData.email.trim()) {
      alert('Please fill in name, email, and testimonial text')
      return
    }

    try {
      if (editingId) {
        await testimonialsApi.updateTestimonial(editingId, {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.text, // Map text to message
        rating: formData.rating
      })
        console.log('Testimonial updated successfully')
      } else {
        await testimonialsApi.createTestimonial({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.text, // Map text to message
        rating: formData.rating
      })
        console.log('Testimonial created successfully')
      }

      // Reset form
      setFormData({
        name: '',
        email: '', // Add email field to reset
        company: '',
        text: '',
        rating: 5
      })
      setEditingId(null)
      
      // Refresh testimonials list
      fetchTestimonials()
    } catch (error) {
      console.error('Error saving testimonial:', error)
      alert('Failed to save testimonial. Please try again.')
    }
  }

  const handleEdit = (testimonial) => {
    setFormData({
      name: testimonial.name,
      company: testimonial.company || '',
      text: testimonial.text,
      rating: testimonial.rating || 5
    })
    setEditingId(testimonial._id)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return
    }

    try {
      await testimonialsApi.deleteTestimonial(id)
      console.log('Testimonial deleted successfully')
      fetchTestimonials()
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      alert('Failed to delete testimonial. Please try again.')
    }
  }

  const handleCancel = () => {
    setFormData({
      name: '',
      company: '',
      text: '',
      rating: 5
    })
    setEditingId(null)
  }

  const renderStars = (rating, interactive = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && handleRatingChange(star)}
            disabled={!interactive}
            className={`text-2xl transition-colors ${
              star <= rating
                ? 'text-yellow-400'
                : 'text-gray-600'
            } ${interactive ? 'hover:text-yellow-300' : ''}`}
          >
            ★
          </button>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">Loading testimonials...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Add/Edit Testimonial Form */}
      <div className="bg-gray-900 rounded-lg shadow p-6 border border-gray-800">
        <h3 className="text-xl font-semibold mb-4 text-white">
          {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter customer name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter customer email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter company name (optional)"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Rating *
            </label>
            {renderStars(formData.rating, true)}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Testimonial *
            </label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter customer testimonial"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              {editingId ? 'Update Testimonial' : 'Create Testimonial'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Testimonials List */}
      <div className="bg-gray-900 rounded-lg shadow border border-gray-800">
        <h3 className="text-xl font-semibold p-6 border-b border-gray-800 text-white">
          Customer Testimonials ({testimonials.length})
        </h3>
        
        {testimonials.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            No testimonials yet. Add your first customer testimonial above.
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      {renderStars(testimonial.rating)}
                    </div>
                    {testimonial.company && (
                      <p className="text-gray-400 text-sm mb-2">
                        {testimonial.company}
                      </p>
                    )}
                    <p className="text-gray-300 italic">
                      "{testimonial.text}"
                    </p>
                    <p className="text-sm text-gray-400 mt-3">
                      Added: {new Date(testimonial.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial._id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
