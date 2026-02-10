// import { useState, useEffect, useRef } from 'react'
// import { galleryApi } from '@/services/apiService'

// export default function GalleryManager() {
//   const [items, setItems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [title, setTitle] = useState('')
//   const [selectedFiles, setSelectedFiles] = useState([])
//   const fileInputRef = useRef(null)

//   useEffect(() => {
//     fetchItems()
//   }, [])

//   const fetchItems = async () => {
//     try {
//       const response = await galleryApi.getItems()
//       setItems(response.data)
//     } catch (error) {
//       console.error('Error fetching gallery:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleFileSelect = (e) => {
//     const files = Array.from(e.target.files)
//     if (files.length === 0) return

//     const newFiles = []

//     files.forEach((file) => {
//       // Check file size (limit to 3MB for images, 5MB for videos)
//       const maxSize = file.type.startsWith('video/') ? 5 * 1024 * 1024 : 3 * 1024 * 1024
//       if (file.size > maxSize) {
//         alert(`${file.name} is too large. Max size: ${maxSize / (1024 * 1024)}MB`)
//         return
//       }

//       const reader = new FileReader()
//       reader.onload = (event) => {
//         const fileData = event.target.result
//         const fileType = file.type.startsWith('video/') ? 'video' : 'photo'
//         newFiles.push({
//           name: file.name,
//           type: fileType,
//           url: fileData
//         })
//         // Add to state when all files are read
//         if (newFiles.length === files.length) {
//           setSelectedFiles((prev) => [...prev, ...newFiles])
//         }
//       }
//       reader.onerror = () => {
//         alert(`Failed to read ${file.name}`)
//       }
//       reader.readAsDataURL(file)
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!title || selectedFiles.length === 0) {
//       alert('Please provide title and select at least one file')
//       return
//     }

//     try {
//       // Upload each selected file
//       for (const file of selectedFiles) {
//         await galleryApi.uploadItem({
//           title: title,
//           type: file.type,
//           url: file.url,
//           description: ''
//         })
//       }
//       setTitle('')
//       setSelectedFiles([])
//       if (fileInputRef.current) fileInputRef.current.value = ''
//       fetchItems()
//       alert('All items uploaded successfully!')
//     } catch (error) {
//       console.error('Error uploading:', error)
//       alert('Failed to upload items')
//     }
//   }

//   const removeSelectedFile = (index) => {
//     setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
//   }

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure?')) return

//     try {
//       await galleryApi.deleteItem(id)
//       fetchItems()
//     } catch (error) {
//       console.error('Error deleting item:', error)
//       alert('Failed to delete item')
//     }
//   }

//   if (loading) return <p>Loading...</p>

//   return (
//     <div className="space-y-8">
//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg">
//         <h2 className="text-xl font-semibold mb-4">Add New Gallery Item</h2>
        
//         <div>
//           <label className="block text-sm font-semibold mb-2">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
//             placeholder="Item title"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-semibold mb-2">Upload Images or Videos</label>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*,video/*"
//             multiple
//             onChange={handleFileSelect}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//           <p className="text-xs text-gray-500 mt-2">💻 Select multiple JPG, PNG, MP4, WebM files (max 3MB images, 5MB videos)</p>
//         </div>

//         {/* Selected Files Preview */}
//         {selectedFiles.length > 0 && (
//           <div className="border-t pt-4">
//             <h3 className="text-sm font-semibold mb-3">Selected Files ({selectedFiles.length})</h3>
//             <div className="space-y-2">
//               {selectedFiles.map((file, index) => (
//                 <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-200">
//                   <div className="flex items-center gap-2 flex-1">
//                     {file.type === 'video' ? (
//                       <span className="text-lg">🎥</span>
//                     ) : (
//                       <span className="text-lg">📷</span>
//                     )}
//                     <div>
//                       <p className="text-sm font-medium">{file.name}</p>
//                       <p className="text-xs text-gray-600 capitalize">{file.type}</p>
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => removeSelectedFile(index)}
//                     className="text-red-600 hover:text-red-700 font-bold text-lg"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <button 
//           type="submit" 
//           className="btn-primary bg-secondary text-white hover:bg-secondary/90 w-full"
//         >
//           Add to Gallery
//         </button>
//       </form>

//       {/* Items List */}
//       <div>
//         <h3 className="text-xl font-semibold mb-4">Gallery Items</h3>
//         {items.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {items.map((item) => (
//               <div key={item._id} className="bg-gray-50 rounded-lg overflow-hidden border">
//                 {item.type === 'video' ? (
//                   <video
//                     src={item.url}
//                     className="w-full h-48 object-cover"
//                     controls
//                   />
//                 ) : (
//                   <img
//                     src={item.url}
//                     alt={item.title}
//                     className="w-full h-48 object-cover"
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found'
//                       e.target.onerror = null
//                     }}
//                   />
//                 )}
//                 <div className="p-4">
//                   <p className="font-semibold mb-2">{item.title}</p>
//                   <p className="text-xs text-gray-500 mb-3 capitalize">{item.type || 'photo'}</p>
//                   <button
//                     onClick={() => handleDelete(item._id)}
//                     className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-600">No items yet</p>
//         )}
//       </div>
//     </div>
//   )
// }


import { useState, useEffect, useRef } from 'react'
import { galleryApi } from '@/services/apiService'

export default function GalleryManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await galleryApi.getItems()
      setItems(response.data)
    } catch (error) {
      console.error('Error fetching gallery:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return

    const newFiles = []

    files.forEach((file) => {
      const maxSize = file.type.startsWith('video/')
        ? 5 * 1024 * 1024
        : 3 * 1024 * 1024

      if (file.size > maxSize) {
        alert(`${file.name} is too large`)
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        newFiles.push({
          name: file.name,
          type: file.type.startsWith('video/') ? 'video' : 'photo',
          url: event.target.result
        })

        if (newFiles.length === files.length) {
          setSelectedFiles((prev) => [...prev, ...newFiles])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || selectedFiles.length === 0) {
      alert('Please add title and files')
      return
    }

    try {
      for (const file of selectedFiles) {
        await galleryApi.uploadItem({
          title,
          type: file.type,
          url: file.url
        })
      }

      setTitle('')
      setSelectedFiles([])
      fileInputRef.current.value = ''
      fetchItems()
      alert('Gallery updated')
    } catch (error) {
      alert('Upload failed')
    }
  }

  const removeSelectedFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return
    await galleryApi.deleteItem(id)
    fetchItems()
  }

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading gallery...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-12">

      {/* ===== Add Form ===== */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md border p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          Add Gallery Item
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
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
            placeholder="Enter title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Images / Videos
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
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
            JPG, PNG (3MB max) · MP4, WebM (5MB max)
          </p>
        </div>

        {selectedFiles.length > 0 && (
          <div className="border rounded-xl p-4 bg-gray-50">
            <h3 className="text-sm font-semibold mb-3">
              Selected Files ({selectedFiles.length})
            </h3>

            <div className="space-y-3">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {file.type === 'video' ? '🎥' : '🖼️'}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{file.type}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeSelectedFile(index)}
                    className="text-red-500 hover:text-red-600 text-lg"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
        >
          Upload to Gallery
        </button>
      </form>

      {/* ===== Gallery List ===== */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Gallery Items
        </h3>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-sm border overflow-hidden"
              >
                {item.type === 'video' ? (
                  <video
                    src={item.url}
                    className="w-full h-48 object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-4 space-y-2">
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500 capitalize">{item.type}</p>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="w-full mt-3 rounded-lg bg-red-500 py-2 text-white text-sm hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No gallery items yet.</p>
        )}
      </div>
    </div>
  )
}
