import { useState, useEffect, useRef } from 'react'
import { galleryApi } from '@/services/apiService'

export default function GalleryManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const fetchGalleryItems = async () => {
    try {
      const response = await galleryApi.getItems()
      setItems(response.data)
    } catch (error) {
      console.error('Error fetching gallery items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    // Filter for valid image/video files
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/')
      const maxSize = file.type.startsWith('video/') ? 10 * 1024 * 1024 : 5 * 1024 * 1024 // 10MB for videos, 5MB for images
      return isValidType && file.size <= maxSize
    })

    if (validFiles.length !== files.length) {
      alert('Some files were invalid or too large. Max size: 5MB for images, 10MB for videos.')
    }

    // Convert files to base64 for preview and store original file objects
    const filePromises = validFiles.map((file, index) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          resolve({
            file, // Store the original file object
            url: event.target.result,
            type: file.type.startsWith('video/') ? 'video' : 'image',
            index // Store the index for later access
          })
        }
        reader.readAsDataURL(file)
      })
    })

    Promise.all(filePromises).then(fileData => {
      setSelectedFiles([...selectedFiles, ...fileData])
    })

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeSelectedFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('Please enter a title')
      return
    }

    if (selectedFiles.length === 0) {
      alert('Please select at least one file')
      return
    }

    try {
      // Upload each file separately
      for (const fileData of selectedFiles) {
        // Create FormData with actual file
        const formData = new FormData()
        formData.append('title', title.trim())
        formData.append('type', fileData.type)
        
        // Use the stored file object directly
        if (fileData.file) {
          formData.append('file', fileData.file)
        } else {
          // Fallback to base64 method if file not available
          console.warn('File not found, falling back to base64 method')
          formData.append('imageUrl', fileData.url)
        }

        await galleryApi.uploadItem(formData)
      }

      console.log('Gallery items uploaded successfully')
      
      // Reset form
      setTitle('')
      setSelectedFiles([])
      
      // Refresh gallery
      fetchGalleryItems()
    } catch (error) {
      console.error('Error uploading gallery items:', error)
      
      if (error.response?.status === 404) {
        alert('Upload endpoint not found. Please check server configuration.')
      } else if (error.response?.status === 413) {
        alert('File too large. Please choose a smaller file.')
      } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        alert('Upload timed out. Please check your internet connection and try again.')
      } else {
        alert('Failed to upload gallery items. Please try again.')
      }
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) {
      return
    }

    try {
      await galleryApi.deleteItem(id)
      console.log('Gallery item deleted successfully')
      fetchGalleryItems()
    } catch (error) {
      console.error('Error deleting gallery item:', error)
      alert('Failed to delete gallery item. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">Loading gallery...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <div className="bg-gray-900 rounded-lg shadow p-6 border border-gray-800">
        <h3 className="text-xl font-semibold mb-4 text-white">
          Upload Gallery Items
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter gallery item title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Files (Images/Videos)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
            />
            <p className="text-xs text-gray-400 mt-1">
              Max: 5MB per image, 10MB per video. Multiple files allowed.
            </p>
          </div>

          {/* File Preview */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Selected Files
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedFiles.map((fileData, index) => (
                  <div key={index} className="relative group">
                    {fileData.type === 'video' ? (
                      <video
                        src={fileData.url}
                        className="w-full h-32 object-cover rounded-lg"
                        controls
                      />
                    ) : (
                      <img
                        src={fileData.url}
                        alt={`Selected file ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => removeSelectedFile(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Upload Items
            </button>
            <button
              type="button"
              onClick={() => {
                setTitle('')
                setSelectedFiles([])
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Gallery Items */}
      <div className="bg-gray-900 rounded-lg shadow border border-gray-800">
        <h3 className="text-xl font-semibold p-6 border-b border-gray-800 text-white">
          Gallery Items ({items.length})
        </h3>
        
        {items.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            No gallery items yet. Upload your first items above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {items.map((item) => (
              <div key={item._id} className="relative group bg-gray-800 rounded-lg overflow-hidden">
                {item.type === 'video' ? (
                  <video
                    src={item.imageUrl}
                    className="w-full h-48 object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                {/* Item info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                  <h4 className="text-white font-semibold truncate">
                    {item.title}
                  </h4>
                  <p className="text-gray-300 text-xs">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
