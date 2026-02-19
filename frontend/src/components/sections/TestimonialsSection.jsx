
import { useState, useEffect } from 'react'
import { testimonialsApi } from '@/services/apiService'

export default function TestimonialsSection() {
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

      // fallback demo data
      setTestimonials([
        {
          _id: '1',
          name: 'Sarah Williams',
          company: 'Design Co.',
          rating: 5,
          text: 'Amazing service! The team delivered everything on time.'
        },
        {
          _id: '2',
          name: 'John Doe',
          company: 'Tech Solutions',
          rating: 5,
          text: 'Clean UI and fast support. Highly recommended.'
        },
        {
          _id: '3',
          name: 'Emily Clark',
          company: 'Marketing Hub',
          rating: 4,
          text: 'Very professional team. Great experience.'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="testimonials" className="bg-background section-padding">
      <div className="container">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-white">
          What Our Clients Say
        </h2>

        {loading ? (
          <div className="text-center py-12 text-slate-400">
            Loading testimonials...
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t._id}
                className="bg-slate-900/80 p-8 rounded-xl border border-slate-800 shadow-lg hover:shadow-xl transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-slate-400">{t.company}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>

                <p className="text-slate-200 leading-relaxed">
                  “{t.text}”
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400">
            No testimonials available
          </div>
        )}
      </div>
    </section>
  )
}
