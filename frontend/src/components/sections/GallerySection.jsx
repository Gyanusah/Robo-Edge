import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { galleryApi } from '@/services/apiService'

export default function GallerySection() {
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(true)

  // 🔥 Modal state
  const [activeItem, setActiveItem] = useState(null)

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const fetchGalleryItems = async () => {
    try {
      const response = await galleryApi.getItems()
      setGalleryItems(response.data)
    } catch (error) {
      console.error('Error fetching gallery:', error)
      setGalleryItems([
        {
          _id: '1',
          title: 'Project 1',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1501785888021-af3d28e2da4e?w=800'
        },
        {
          _id: '2',
          title: 'Project 2',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800'
        },
        {
          _id: '3',
          title: 'Project 3',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800'
        },
        {
          _id: '4',
          title: 'Project 4',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="container">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-white">
          Gallery
        </h2>

        {loading ? (
          <div className="text-center py-12 text-white">Loading gallery...</div>
        ) : (
          <>
            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto mb-10">
              {galleryItems.slice(0, 4).map((item) => (
                <div
                  key={item._id}
                  onClick={() => setActiveItem(item)}
                  className="relative cursor-pointer group overflow-hidden rounded-xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 h-48"
                >
                  {item.type === 'photo' ? (
                    <img
                      src={item.url.startsWith('http') ? item.url : `http://localhost:5000${item.url}`}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
                    />
                  ) : (
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                    <p className="text-white text-sm font-semibold">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/gallery"
                className="inline-block bg-white text-slate-900 font-semibold px-8 py-3 rounded-xl hover:bg-slate-100 transition shadow-lg"
              >
                View More Photos
              </Link>
            </div>
          </>
        )}
      </div>

      {/* ================= FULLSCREEN MODAL ================= */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute -top-10 right-0 text-white text-3xl hover:text-gray-300"
            >
              &times;
            </button>

            {activeItem.type === 'photo' ? (
              <img
                src={activeItem.url.startsWith('http') ? activeItem.url : `http://localhost:5000${activeItem.url}`}
                alt={activeItem.title}
                className="w-full max-h-[85vh] object-contain rounded-xl"
              />
            ) : (
              <video
                src={activeItem.url}
                controls
                autoPlay
                className="w-full max-h-[85vh] rounded-xl"
              />
            )}

            <p className="text-center text-gray-300 mt-4">
              {activeItem.title}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
