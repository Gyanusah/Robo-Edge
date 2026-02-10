import { useState } from 'react'
import { contactApi } from '@/services/apiService'

export default function ContactSection() {
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [contactMessage, setContactMessage] = useState('')

  const handleContactChange = (e) => {
    const { name, value } = e.target
    setContactFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    try {
      await contactApi.sendMessage(contactFormData)
      setContactMessage('Message sent successfully!')
      setContactFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setContactMessage(''), 3000)
    } catch (error) {
      setContactMessage('Error sending message')
      console.error('Error:', error)
    }
  }

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container max-w-2xl">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-white">
          Get in Touch
        </h2>
        <p className="text-center text-slate-300 mb-12">
          Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>

        <form
          onSubmit={handleContactSubmit}
          className="bg-slate-900/70 backdrop-blur-md p-8 rounded-xl border border-slate-800 shadow-lg"
        >
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={contactFormData.name}
              onChange={handleContactChange}
              required
              className="w-full px-4 py-3 border border-slate-700 rounded-lg bg-slate-950 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={contactFormData.email}
              onChange={handleContactChange}
              required
              className="w-full px-4 py-3 border border-slate-700 rounded-lg bg-slate-950 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={contactFormData.subject}
              onChange={handleContactChange}
              required
              className="w-full px-4 py-3 border border-slate-700 rounded-lg bg-slate-950 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">Message</label>
            <textarea
              name="message"
              value={contactFormData.message}
              onChange={handleContactChange}
              required
              rows={5}
              className="w-full px-4 py-3 border border-slate-700 rounded-lg bg-slate-950 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            ></textarea>
          </div>

          {contactMessage && (
            <div
              className={`p-4 rounded-lg mb-6 ${
                contactMessage.includes('success')
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {contactMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-brand text-white font-semibold py-3 rounded-lg hover:bg-brandDark transition-colors shadow-sm"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}
