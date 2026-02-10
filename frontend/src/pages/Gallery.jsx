// import { useState, useEffect } from 'react'
// import { galleryApi } from '@/services/apiService'

// const ITEMS_PER_PAGE = 4 

// export default function Gallery() {
//   const [allItems, setAllItems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [selectedFilter, setSelectedFilter] = useState('all')
//   const [expandedView, setExpandedView] = useState(false)

//   // NEW STATE for modal
//   const [activeItem, setActiveItem] = useState(null)

//   useEffect(() => {
//     fetchGalleryItems()
//   }, [])

//   const fetchGalleryItems = async () => {
//     try {
//       const response = await galleryApi.getItems()
//       setAllItems(response.data || [])
//     } catch (error) {
//       console.error('Error fetching gallery:', error)

//       setAllItems([
//         {
//           _id: '1',
//           title: 'Mountain View',
//           type: 'photo',
//           url: 'https://images.unsplash.com/photo-1501785888021-af3d28e2da4e?w=800&h=600&fit=crop'
//         },
//         {
//           _id: '2',
//           title: 'City Lights',
//           type: 'photo',
//           url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop'
//         },
//         {
//           _id: '3',
//           title: 'Ocean Waves',
//           type: 'photo',
//           url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop'
//         },
//         {
//           _id: '4',
//           title: 'Forest Walk',
//           type: 'photo',
//           url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop'
//         },
//         {
//           _id: '5',
//           title: 'Nature Video',
//           type: 'video',
//           url: 'https://www.w3schools.com/html/mov_bbb.mp4'
//         },
//         {
//           _id: '6',
//           title: 'Sea Video',
//           type: 'video',
//           url: 'https://www.w3schools.com/html/movie.mp4'
//         }
//       ])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getFilteredItems = () => {
//     if (selectedFilter === 'all') return allItems
//     if (selectedFilter === 'photo') return allItems.filter(item => !item.type || item.type === 'photo')
//     if (selectedFilter === 'video') return allItems.filter(item => item.type === 'video')
//     return allItems
//   }

//   const filteredItems = getFilteredItems()
//   const itemsToDisplay = expandedView ? filteredItems : filteredItems.slice(0, ITEMS_PER_PAGE)
//   const hasMoreItems = filteredItems.length > ITEMS_PER_PAGE

//   if (loading) {
//     return <div className="container section-padding text-center">Loading...</div>
//   }

//   return (
//     <div className="bg-background section-padding">
//       <div className="container">
//         <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-white">Gallery</h1>

//         {/* Filter Buttons */}
//         <div className="flex flex-wrap justify-center gap-4 mb-12">
//           {['all', 'photo', 'video'].map((filterOption) => (
//             <button
//               key={filterOption}
//               onClick={() => {
//                 setSelectedFilter(filterOption)
//                 setExpandedView(false)
//               }}
//               className={`px-6 py-2 rounded-full capitalize transition-colors ${
//                 selectedFilter === filterOption
//                   ? 'bg-secondary text-white'
//                   : 'bg-white text-gray-600 border border-gray-300 hover:border-secondary'
//               }`}
//             >
//               {filterOption}
//             </button>
//           ))}
//         </div>

//         {/* Gallery Grid */}
//         {itemsToDisplay.length > 0 ? (
//           <>
//             <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-4xl mx-auto mb-8">
//               {itemsToDisplay.map((item) => (
//                 <div
//                   key={item._id}
//                   onClick={() => setActiveItem(item)}   // <-- OPEN MODAL HERE
//                   className="relative group cursor-pointer overflow-hidden rounded-xl bg-slate-900 border border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 h-72"
//                 >
//                   {item.type === 'photo' ? (
//                     <img
//                       src={item.url}
//                       alt={item.title}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                     />
//                   ) : (
//                     <video
//                       src={item.url}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                       controls
//                     />
//                   )}

//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-4">
//                     <div className="text-white">
//                       <p className="font-semibold text-sm">{item.title}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <p className="text-center text-gray-600 mt-6 text-sm">
//               Showing {itemsToDisplay.length} of {filteredItems.length} items
//             </p>
//           </>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-gray-600">No items in this category yet.</p>
//           </div>
//         )}

//         {/* Action Buttons */}
//         {hasMoreItems && (
//           <div className="flex justify-center mt-12">
//             {!expandedView ? (
//               <button
//                 onClick={() => setExpandedView(true)}
//                 className="px-8 py-3 bg-secondary text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
//               >
//                 See More
//               </button>
//             ) : (
//               <button
//                 onClick={() => setExpandedView(false)}
//                 className="px-8 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-semibold"
//               >
//                 Show Less
//               </button>
//             )}
//           </div>
//         )}
//       </div>

//       {/* ===================== */}
//       {/* FULLSCREEN MODAL */}
//       {/* ===================== */}
//       {activeItem && (
//         <div
//           className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
//           onClick={() => setActiveItem(null)}
//         >
//           <div
//             className="relative max-w-4xl w-full mx-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close Button */}
//             <button
//               className="absolute top-4 right-4 text-white text-2xl"
//               onClick={() => setActiveItem(null)}
//             >
//               &times;
//             </button>

//             {activeItem.type === 'photo' ? (
//               <img
//                 src={activeItem.url}
//                 alt={activeItem.title}
//                 className="w-full h-auto max-h-[80vh] object-contain"
//               />
//             ) : (
//               <video
//                 src={activeItem.url}
//                 className="w-full h-auto max-h-[80vh]"
//                 controls
//                 autoPlay
//               />
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


import { useState, useEffect } from 'react'
import { galleryApi } from '@/services/apiService'

const ITEMS_PER_PAGE = 4

export default function Gallery() {
  const [allItems, setAllItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [expandedView, setExpandedView] = useState(false)
  const [activeItem, setActiveItem] = useState(null)

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const fetchGalleryItems = async () => {
    try {
      const response = await galleryApi.getItems()
      setAllItems(response.data || [])
    } catch (error) {
      console.error('Error fetching gallery:', error)

      setAllItems([
        {
          _id: '1',
          title: 'Mountain View',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1501785888021-af3d28e2da4e?w=800&h=600&fit=crop'
        },
        {
          _id: '2',
          title: 'City Lights',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop'
        },
        {
          _id: '3',
          title: 'Ocean Waves',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop'
        },
        {
          _id: '4',
          title: 'Forest Walk',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop'
        },
        {
          _id: '5',
          title: 'Nature Video',
          type: 'video',
          url: 'https://www.w3schools.com/html/mov_bbb.mp4'
        },
        {
          _id: '6',
          title: 'Sea Video',
          type: 'video',
          url: 'https://www.w3schools.com/html/movie.mp4'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const getFilteredItems = () => {
    if (selectedFilter === 'all') return allItems
    if (selectedFilter === 'photo') return allItems.filter(item => !item.type || item.type === 'photo')
    if (selectedFilter === 'video') return allItems.filter(item => item.type === 'video')
    return allItems
  }

  const filteredItems = getFilteredItems()
  const itemsToDisplay = expandedView ? filteredItems : filteredItems.slice(0, ITEMS_PER_PAGE)
  const hasMoreItems = filteredItems.length > ITEMS_PER_PAGE

  if (loading) {
    return <div className="container section-padding text-center">Loading...</div>
  }

  return (
    <div className="bg-background section-padding">
      <div className="container">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-gray-200">
          Gallery
        </h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'photo', 'video'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => {
                setSelectedFilter(filterOption)
                setExpandedView(false)
              }}
              className={`px-6 py-2 rounded-full capitalize text-sm font-semibold transition-colors ${
                selectedFilter === filterOption
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-blue-600'
              }`}
            >
              {filterOption}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {itemsToDisplay.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto mb-8">
              {itemsToDisplay.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setActiveItem(item)}
                  className="relative group cursor-pointer overflow-hidden rounded-xl bg-slate-900 border border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 h-72"
                >
                  {item.type === 'photo' ? (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'
                        e.target.onerror = null
                      }}
                    />
                  ) : (
                    <video
                      src={item.url}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      controls
                      onError={(e) => {
                        e.target.poster = 'https://via.placeholder.com/400x300?text=Video+Not+Found'
                      }}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-400 mt-6 text-sm">
              Showing {itemsToDisplay.length} of {filteredItems.length} items
            </p>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No items in this category yet.</p>
          </div>
        )}

        {/* Action Buttons */}
        {hasMoreItems && (
          <div className="flex justify-center mt-12">
            {!expandedView ? (
              <button
                onClick={() => setExpandedView(true)}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                See More
              </button>
            ) : (
              <button
                onClick={() => setExpandedView(false)}
                className="px-8 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-semibold"
              >
                Show Less
              </button>
            )}
          </div>
        )}
      </div>

      {/* FULLSCREEN MODAL */}
      {activeItem && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-5xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setActiveItem(null)}
            >
              &times;
            </button>

            {activeItem.type === 'photo' ? (
              <img
                src={activeItem.url}
                alt={activeItem.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found'
                  e.target.onerror = null
                }}
              />
            ) : (
              <video
                src={activeItem.url}
                className="w-full h-auto max-h-[80vh] rounded-xl"
                controls
                autoPlay
                onError={(e) => {
                  e.target.poster = 'https://via.placeholder.com/800x600?text=Video+Not+Found'
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
