import { useState } from 'react'
import { contactApi } from '@/services/apiService'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await contactApi.sendMessage(formData)
      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSuccess(false), 5000)
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background section-padding">
      <div className="container">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4">Contact Us</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Have a question? We'd love to hear from you. Get in touch with us today.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            {success && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Map and Info */}
          <div className="space-y-8">
            {/* Google Map */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <iframe
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '8px' }}
                loading="lazy"
                allowFullScreen=""
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890!2d-74.006!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sYour%20Address!5e0!3m2!1sen!2sus!4v1234567890"
              />
              <p className="mt-4 text-gray-600">123 Business Street, City, State 12345</p>
            </div>

            {/* Contact Info */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-700">Email</p>
                  <a href="mailto:info@company.com" className="text-secondary hover:underline">
                    info@company.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Phone</p>
                  <a href="tel:+15551234567" className="text-secondary hover:underline">
                    (555) 123-4567
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Hours</p>
                  <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sat - Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
