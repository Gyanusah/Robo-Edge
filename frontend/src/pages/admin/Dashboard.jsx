import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import AdminNotices from '@/components/admin/NoticesManager'
import AdminGallery from '@/components/admin/GalleryManager'
import AdminTestimonials from '@/components/admin/TestimonialsManager'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('notices')
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      navigate('/admin/login')
    }
  }, [navigate])

  const handleLogout = () => {
    Cookies.remove('token')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Admin Header */}
      <header className="bg-primary shadow">
        <div className="container h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Admin Content */}
      <div className="container py-8">
        {/* Tab Navigation */}
        <div className="bg-gray-900 rounded-lg shadow mb-8 overflow-hidden border border-primary/50">
          <div className="flex flex-wrap border-b border-primary/50">
            {['notices', 'gallery', 'testimonials'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-secondary border-b-2 border-secondary'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'notices' && <AdminNotices />}
            {activeTab === 'gallery' && <AdminGallery />}
            {activeTab === 'testimonials' && <AdminTestimonials />}
          </div>
        </div>
      </div>
    </div>
  )
}
