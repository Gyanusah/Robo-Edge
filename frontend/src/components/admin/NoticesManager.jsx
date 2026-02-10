// import { useState, useEffect, useRef } from 'react'
// import { noticesApi } from '@/services/apiService'

// export default function NoticesManager() {
//   const [notices, setNotices] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [title, setTitle] = useState('')
//   const [message, setMessage] = useState('')
//   const [mediaItems, setMediaItems] = useState([])
//   const [editingId, setEditingId] = useState(null)
//   const fileInputRef = useRef(null)

//   useEffect(() => {
//     fetchNotices()
//   }, [])

//   const fetchNotices = async () => {
//     try {
//       const response = await noticesApi.getNotices()
//       setNotices(response.data)
//     } catch (error) {
//       console.error('Error fetching notices:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleFileSelect = (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     // Determine if it's a video or photo based on MIME type
//     const detectedMediaType = file.type.startsWith('video/') ? 'video' : 'photo'

//     // Check file size - Base64 encoding increases size by ~33%
//     // So actual limit = (limit / 1.33)
//     const maxSize = detectedMediaType === 'video' ? 3 * 1024 * 1024 : 2 * 1024 * 1024
//     if (file.size > maxSize) {
//       alert(`File too large. Max size for ${detectedMediaType}s: ${maxSize / (1024 * 1024)}MB`)
//       return
//     }

//     const reader = new FileReader()
//     reader.onload = (event) => {
//       setMediaItems([
//         ...mediaItems,
//         {
//           type: detectedMediaType,
//           url: event.target.result,
//           description: ''
//         }
//       ])

//       if (fileInputRef.current) fileInputRef.current.value = ''
//     }
//     reader.onerror = () => {
//       alert('Failed to read media file')
//     }
//     reader.readAsDataURL(file)
//   }

//   const removeMediaItem = (index) => {
//     setMediaItems(mediaItems.filter((_, i) => i !== index))
//   }

//   const updateMediaDescription = (index, description) => {
//     const updated = [...mediaItems]
//     updated[index].description = description
//     setMediaItems(updated)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!title) {
//       alert('Please provide a title')
//       return
//     }

//     try {
//       if (editingId) {
//         await noticesApi.updateNotice(editingId, {
//           title,
//           message,
//           mediaItems
//         })
//         setEditingId(null)
//       } else {
//         await noticesApi.createNotice({
//           title,
//           message,
//           mediaItems
//         })
//       }
//       setTitle('')
//       setMessage('')
//       setMediaItems([])
//       fetchNotices()
//       alert('Notice saved successfully!')
//     } catch (error) {
//       console.error('Error saving notice:', error)
//       alert(`Failed to save notice: ${error.response?.data?.message || error.message}`)
//     }
//   }

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure?')) return

//     try {
//       await noticesApi.deleteNotice(id)
//       fetchNotices()
//     } catch (error) {
//       console.error('Error deleting notice:', error)
//       alert('Failed to delete notice')
//     }
//   }

//   const handleExpire = async (id) => {
//     if (!confirm('Are you sure you want to expire this notice? It will not be shown on the homepage.')) return

//     try {
//       await noticesApi.updateNotice(id, { isExpired: true })
//       fetchNotices()
//       alert('Notice marked as expired!')
//     } catch (error) {
//       console.error('Error expiring notice:', error)
//       alert('Failed to expire notice')
//     }
//   }

//   const handleEdit = (notice) => {
//     setEditingId(notice._id)
//     setTitle(notice.title)
//     setMessage(notice.message || '')
//     setMediaItems(notice.mediaItems || [])
//   }

//   if (loading) return <p>Loading...</p>

//   return (
//     <div className="space-y-8">
//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg">
//         <h2 className="text-xl font-semibold mb-4">
//           {editingId ? 'Edit Notice' : 'Create New Notice'}
//         </h2>

//         <div>
//           <label className="block text-sm font-semibold mb-2">Title *</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
//             placeholder="Notice title (required)"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-semibold mb-2">Message (Optional)</label>
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             rows="4"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
//             placeholder="Notice message"
//           />
//         </div>



//         {/* Media Upload Section */}
//         <div className="border-t pt-4 space-y-4">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Photos or Videos</label>
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*,video/*"
//               onChange={handleFileSelect}
//               className="w-full px-4 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
//             />
//             <p className="text-xs text-gray-500 mt-2">💻 Select JPG, PNG, MP4, WebM from your computer (max 3MB)</p>
//           </div>
//         </div>

//         {/* Media Items Preview */}
//         {mediaItems.length > 0 && (
//           <div className="border-t pt-4">
//             <h3 className="text-sm font-semibold mb-3">Media Items ({mediaItems.length})</h3>
//             <div className="space-y-3">
//               {mediaItems.map((media, index) => (
//                 <div key={index} className="bg-white p-4 rounded-lg border">
//                   <div className="flex gap-4">
//                     {/* Media Preview */}
//                     <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
//                       {media.type === 'video' ? (
//                         <video
//                           src={media.url}
//                           className="w-full h-full object-cover"
//                           controls
//                           onError={(e) => {
//                             e.target.poster = 'https://via.placeholder.com/80x80?text=Video+Not+Found'
//                           }}
//                         />
//                       ) : (
//                         <img
//                           src={media.url}
//                           alt="preview"
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.src = 'https://via.placeholder.com/80x80?text=Image+Not+Found'
//                             e.target.onerror = null
//                           }}
//                         />
//                       )}
//                     </div>

//                     {/* Media Info */}
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-2">
//                         <span className="text-xs font-semibold bg-secondary text-white px-2 py-1 rounded">
//                           {media.type.toUpperCase()}
//                         </span>
//                       </div>
//                       <input
//                         type="text"
//                         placeholder="Add description (optional)"
//                         value={media.description}
//                         onChange={(e) => updateMediaDescription(index, e.target.value)}
//                         className="w-full px-3 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
//                       />
//                     </div>

//                     {/* Remove Button */}
//                     <button
//                       type="button"
//                       onClick={() => removeMediaItem(index)}
//                       className="text-red-600 hover:text-red-700 font-semibold"
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex gap-2 pt-4">
//           <button
//             type="submit"
//             className="btn-primary"
//           >
//             {editingId ? 'Update Notice' : 'Create Notice'}
//           </button>
//           {editingId && (
//             <button
//               type="button"
//               onClick={() => {
//                 setEditingId(null)
//                 setTitle('')
//                 setMessage('')
//                 setMediaItems([])
//               }}
//               className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* Notices List */}
//       <div>
//         <h3 className="text-xl font-semibold mb-4">Existing Notices ({notices.length})</h3>
//         {notices.length > 0 ? (
//           <div className="space-y-4">
//             {notices.map((notice) => (
//               <div key={notice._id} className="bg-white p-6 rounded-lg border shadow-sm">
//                 <h4 className="text-lg font-semibold mb-2">{notice.title}</h4>
//                 {notice.message && (
//                   <p className="text-gray-600 mb-4">{notice.message}</p>
//                 )}

//                 {/* Media Display */}
//                 {notice.mediaItems && notice.mediaItems.length > 0 && (
//                   <div className="mb-4">
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                       {notice.mediaItems.map((media, index) => (
//                         <div key={index} className="relative group">
//                           <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
//                             {media.type === 'video' ? (
//                               <video
//                                 src={media.url}
//                                 className="w-full h-full object-cover"
//                                 controls
//                                 onError={(e) => {
//                                   e.target.poster = 'https://via.placeholder.com/200x200?text=Video+Not+Found'
//                                 }}
//                               />
//                             ) : (
//                               <img
//                                 src={media.url}
//                                 alt={media.description || 'media'}
//                                 className="w-full h-full object-cover"
//                                 onError={(e) => {
//                                   e.target.src = 'https://via.placeholder.com/200x200?text=Image+Not+Found'
//                                   e.target.onerror = null
//                                 }}
//                               />
//                             )}
//                           </div>
//                           <div className="absolute top-1 right-1 bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
//                             {media.type.toUpperCase()}
//                           </div>
//                           {media.description && (
//                             <p className="text-xs text-gray-600 mt-1">{media.description}</p>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => handleEdit(notice)}
//                     className="px-4 py-2 bg-secondary text-white rounded hover:bg-blue-700 transition-colors"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleExpire(notice._id)}
//                     className={`px-4 py-2 rounded transition-colors ${
//                       notice.isExpired
//                         ? 'bg-gray-400 text-white cursor-not-allowed'
//                         : 'bg-yellow-600 text-white hover:bg-yellow-700'
//                     }`}
//                     disabled={notice.isExpired}
//                   >
//                     {notice.isExpired ? 'Expired' : 'Expire'}
//                   </button>
//                   <button
//                     onClick={() => handleDelete(notice._id)}
//                     className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
//                   >
//                     Delete
//                   </button>
//                 </div>

//                 <p className="text-xs text-gray-400 mt-3">
//                   Created: {new Date(notice.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-600 bg-gray-50 p-6 rounded-lg">No notices yet</p>
//         )}
//       </div>
//     </div>
//   )
// }


import { useState, useEffect, useRef } from 'react'
import { noticesApi } from '@/services/apiService'

export default function NoticesManager() {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [mediaItems, setMediaItems] = useState([])
  const [editingId, setEditingId] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    try {
      const response = await noticesApi.getNotices()
      setNotices(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const type = file.type.startsWith('video/') ? 'video' : 'photo'
    const maxSize = type === 'video' ? 3 * 1024 * 1024 : 2 * 1024 * 1024
    if (file.size > maxSize) {
      alert('File too large')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setMediaItems((prev) => [
        ...prev,
        { type, url: e.target.result, description: '' }
      ])
      fileInputRef.current.value = ''
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title) return alert('Title required')

    try {
      editingId
        ? await noticesApi.updateNotice(editingId, { title, message, mediaItems })
        : await noticesApi.createNotice({ title, message, mediaItems })

      setTitle('')
      setMessage('')
      setMediaItems([])
      setEditingId(null)
      fetchNotices()
    } catch {
      alert('Save failed')
    }
  }

  const handleEdit = (n) => {
    setEditingId(n._id)
    setTitle(n.title)
    setMessage(n.message || '')
    setMediaItems(n.mediaItems || [])
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this notice?')) return
    await noticesApi.deleteNotice(id)
    fetchNotices()
  }

  const handleExpire = async (id) => {
    await noticesApi.updateNotice(id, { isExpired: true })
    fetchNotices()
  }

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading notices...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-12">

      {/* ===== FORM ===== */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md border p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          {editingId ? 'Edit Notice' : 'Create Notice'}
        </h2>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Title *
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full
  rounded-xl
  border border-gray-200
  bg-gray-50
  px-4 py-3
  text-gray-900
  placeholder-gray-400
  shadow-sm
  focus:border-blue-500
  focus:bg-white
  focus:ring-4 focus:ring-blue-500/10
  focus:outline-none
  transition"
            placeholder="Notice title"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Message
          </label>
          <textarea
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full
  rounded-xl
  border border-gray-200
  bg-gray-50
  px-4 py-3
  text-gray-900
  placeholder-gray-400
  shadow-sm
  focus:border-blue-500
  focus:bg-white
  focus:ring-4 focus:ring-blue-500/10
  focus:outline-none
  transition"
            placeholder="Optional message"
          />
        </div>

        {/* Upload */}
        <div className="border rounded-xl p-4 bg-gray-50">
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Upload Image / Video
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="w-full
  rounded-xl
  border border-gray-200
  bg-gray-50
  px-4 py-3
  text-gray-900
  placeholder-gray-400
  shadow-sm
  focus:border-blue-500
  focus:bg-white
  focus:ring-4 focus:ring-blue-500/10
  focus:outline-none
  transition"
          />
          <p className="text-xs text-gray-500 mt-2">
            JPG / PNG (2MB) · MP4 / WebM (3MB)
          </p>
        </div>

        {/* Media Preview */}
        {mediaItems.length > 0 && (
          <div className="space-y-3">
            {mediaItems.map((m, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200">
                  {m.type === 'video' ? (
                    <video src={m.url} className="w-full h-full object-cover" />
                  ) : (
                    <img src={m.url} className="w-full h-full object-cover" />
                  )}
                </div>

                <input
                  value={m.description}
                  onChange={(e) => {
                    const copy = [...mediaItems]
                    copy[i].description = e.target.value
                    setMediaItems(copy)
                  }}
                  placeholder="Description"
                  className="flex-1 rounded-lg border px-3 py-2 text-sm"
                />

                <button
                  type="button"
                  onClick={() =>
                    setMediaItems(mediaItems.filter((_, x) => x !== i))
                  }
                  className="text-red-500 text-lg hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            {editingId ? 'Update Notice' : 'Create Notice'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null)
                setTitle('')
                setMessage('')
                setMediaItems([])
              }}
              className="rounded-lg bg-gray-300 px-6 py-3 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ===== LIST ===== */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Existing Notices ({notices.length})
        </h3>

        <div className="space-y-6">
          {notices.map((n) => (
            <div
              key={n._id}
              className="bg-white rounded-2xl shadow-sm border p-6"
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-1">
                {n.title}
              </h4>

              {n.message && (
                <p className="text-gray-600 mb-4">{n.message}</p>
              )}

              {n.mediaItems?.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                  {n.mediaItems.map((m, i) => (
                    <div key={i} className="rounded-xl overflow-hidden bg-gray-200">
                      {m.type === 'video' ? (
                        <video src={m.url} controls className="w-full h-full object-cover" />
                      ) : (
                        <img src={m.url} className="w-full h-full object-cover" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleEdit(n)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>

                <button
                  disabled={n.isExpired}
                  onClick={() => handleExpire(n._id)}
                  className={`px-4 py-2 rounded-lg text-white ${
                    n.isExpired
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-yellow-600 hover:bg-yellow-700'
                  }`}
                >
                  {n.isExpired ? 'Expired' : 'Expire'}
                </button>

                <button
                  onClick={() => handleDelete(n._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-3">
                Created on {new Date(n.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
