import { useState, useEffect } from 'react'
import { testimonialsApi } from '@/services/apiService'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return <div className="container section-padding text-center">Loading...</div>
  }

  return (
    <div className="section-padding">
      <div className="container">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12">Testimonials</h1>

        {/* Google Reviews Section */}
        <div className="mb-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Google Reviews</h2>
          <p className="text-gray-600 mb-4">Check out our Google Business profile for more reviews:</p>
          <a
            href="https://www.google.com/maps/place/Your+Business+Name"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            View on Google Maps
          </a>
        </div>

        {/* Testimonials Grid */}
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.message}"</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No testimonials yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
