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
      setNotices(response.data.notices || response.data || [])
    } catch (error) {
      console.error('Error fetching notices:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Determine if it's a video or photo based on MIME type
    const detectedMediaType = file.type.startsWith('video/') ? 'video' : 'photo'

    // Check file size - Base64 encoding increases size by ~33%
    const maxSize = detectedMediaType === 'video' ? 3 * 1024 * 1024 : 2 * 1024 * 1024
    if (file.size > maxSize) {
      alert(`File too large. Max size for ${detectedMediaType}s: ${maxSize / (1024 * 1024)}MB`)
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setMediaItems([
        ...mediaItems,
        {
          type: detectedMediaType,
          url: event.target.result,
          description: ''
        }
      ])

      if (fileInputRef.current) fileInputRef.current.value = ''
    }
    reader.onerror = () => {
      alert('Failed to read media file')
    }
    reader.readAsDataURL(file)
  }

  const removeMediaItem = (index) => {
    setMediaItems(mediaItems.filter((_, i) => i !== index))
  }

  const updateMediaDescription = (index, description) => {
    const updatedMedia = [...mediaItems]
    updatedMedia[index].description = description
    setMediaItems(updatedMedia)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !message.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const noticeData = {
        title: title.trim(),
        message: message.trim(),
        mediaItems: mediaItems.map(item => ({
          type: item.type,
          url: item.url,
          description: item.description
        }))
      }

      if (editingId) {
        const response = await noticesApi.updateNotice(editingId, noticeData)
        console.log('Notice updated successfully', response)
      } else {
        const response = await noticesApi.createNotice(noticeData)
        console.log('Notice created successfully', response)
      }

      // Reset form
      setTitle('')
      setMessage('')
      setMediaItems([])
      setEditingId(null)
      
      // Refresh notices list
      fetchNotices()
    } catch (error) {
      console.error('Error saving notice:', error)
      
      if (error.response?.status === 404) {
        alert('Notice not found. It may have been deleted.')
      } else if (error.response?.status === 403) {
        alert('You are not authorized to modify this notice.')
      } else if (error.response?.status === 422) {
        alert('Please check all required fields and try again.')
      } else {
        alert('Failed to save notice. Please try again.')
      }
    }
  }

  const handleEdit = (notice) => {
    setTitle(notice.title)
    setMessage(notice.message)
    setMediaItems(notice.mediaItems || [])
    setEditingId(notice._id)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this notice?')) {
      return
    }

    try {
      const response = await noticesApi.deleteNotice(id)
      console.log('Notice deleted successfully', response)
      fetchNotices()
    } catch (error) {
      console.error('Error deleting notice:', error)
      
      if (error.response?.status === 404) {
        alert('Notice not found. It may have already been deleted.')
      } else if (error.response?.status === 403) {
        alert('You are not authorized to delete this notice.')
      } else {
        alert('Failed to delete notice. Please try again.')
      }
    }
  }

  const handleCancel = () => {
    setTitle('')
    setMessage('')
    setMediaItems([])
    setEditingId(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">Loading notices...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Add/Edit Notice Form */}
      <div className="bg-gray-900 rounded-lg shadow p-6 border border-gray-800">
        <h3 className="text-xl font-semibold mb-4 text-white">
          {editingId ? 'Edit Notice' : 'Add New Notice'}
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
              placeholder="Enter notice title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter notice message (optional)"
            />
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Media Files (Photos/Videos)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
            />
            <p className="text-xs text-gray-400 mt-1">
              Max: 2MB for photos, 3MB for videos
            </p>
          </div>

          {/* Media Preview */}
          {mediaItems.length > 0 && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Media Preview
              </label>
              {mediaItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-800 rounded-md">
                  {item.type === 'video' ? (
                    <video
                      src={item.url}
                      className="w-24 h-24 object-cover rounded"
                      controls
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={`Media ${index + 1}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateMediaDescription(index, e.target.value)}
                      className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                      placeholder="Add description..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMediaItem(index)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              {editingId ? 'Update Notice' : 'Create Notice'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Notices List */}
      <div className="bg-gray-900 rounded-lg shadow border border-gray-800">
        <h3 className="text-xl font-semibold p-6 border-b border-gray-800 text-white">
          Published Notices
        </h3>
        
        {notices.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            No notices published yet. Create your first notice above.
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {notices.map((notice) => (
              <div key={notice._id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {notice.title}
                    </h4>
                    {notice.message && (
                      <p className="text-gray-300 mb-3">
                        {notice.message}
                      </p>
                    )}
                    
                    {/* Media Display */}
                    {notice.mediaItems && notice.mediaItems.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
                        {notice.mediaItems.map((item, index) => (
                          <div key={index} className="relative group">
                            {item.type === 'video' ? (
                              <video
                                src={item.url}
                                className="w-full h-48 object-cover rounded-lg"
                                controls
                              />
                            ) : (
                              <img
                                src={item.url}
                                alt={item.description || `Media ${index + 1}`}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                            )}
                            {item.description && (
                              <p className="text-sm text-gray-400 mt-2">
                                {item.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-400">
                      Created: {new Date(notice.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(notice)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(notice._id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
