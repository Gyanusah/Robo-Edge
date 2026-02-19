import { useEffect, useState } from 'react'
import { noticesApi } from '@/services/apiService'

export default function NoticePopup() {
  const [notices, setNotices] = useState([])
  const [visibleNotices, setVisibleNotices] = useState({})
  const [currentMediaIndex, setCurrentMediaIndex] = useState({})
  const [failedImages, setFailedImages] = useState(new Set())

  useEffect(() => {
    fetchAllNotices()
  }, [])

  const fetchAllNotices = async (retryCount = 0) => {
    try {
      const response = await noticesApi.getNotices()
      const noticesList = response.data.notices || response.data || []
      // Filter out expired notices (if isExpired field exists, otherwise include all)
      const activeNotices = noticesList.filter((notice) => !notice.isExpired || notice.isExpired === undefined)
      if (activeNotices.length > 0) {
        setNotices(activeNotices)
        // Initialize all notices as visible and media index as 0
        const visible = {}
        const mediaIndex = {}
        activeNotices.forEach((notice) => {
          visible[notice._id] = true
          mediaIndex[notice._id] = 0
        })
        setVisibleNotices(visible)
        setCurrentMediaIndex(mediaIndex)
      }
    } catch (error) {
      console.error('Error fetching notices:', error)
      
      // Retry logic for network errors
      if (retryCount < 2 && (error.code === 'ECONNABORTED' || error.message.includes('timeout'))) {
        console.log(`Retrying fetch... attempt ${retryCount + 1}`)
        setTimeout(() => fetchAllNotices(retryCount + 1), 1000 * (retryCount + 1))
        return
      }
    }
  }

  const closeNotice = (noticeId) => {
    setVisibleNotices((prev) => ({
      ...prev,
      [noticeId]: false
    }))
  }

  const nextMedia = (noticeId, totalMedia) => {
    setCurrentMediaIndex((prev) => ({
      ...prev,
      [noticeId]: (prev[noticeId] + 1) % totalMedia
    }))
  }

  const prevMedia = (noticeId, totalMedia) => {
    setCurrentMediaIndex((prev) => ({
      ...prev,
      [noticeId]: prev[noticeId] === 0 ? totalMedia - 1 : prev[noticeId] - 1
    }))
  }

  const handleImageError = (url, fallbackUrl) => {
    if (!failedImages.has(url)) {
      setFailedImages(prev => new Set(prev).add(url))
      return fallbackUrl
    }
    return fallbackUrl
  }

  if (notices.length === 0) return null

  return (
    <>
      {notices.map((notice, index) => {
        if (!visibleNotices[notice._id]) return null

        const mediaIdx = currentMediaIndex[notice._id] || 0
        const hasMedia = notice.mediaItems && notice.mediaItems.length > 0
        const currentMedia = hasMedia ? notice.mediaItems[mediaIdx] : null

        return (
          <div
            key={notice._id}
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
            style={{ zIndex: 50 + index }}
          >
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header with Close Button */}
              <div className="sticky top-0 bg-primary text-white p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">{notice.title}</h2>
                <button
                  onClick={() => closeNotice(notice._id)}
                  className="text-white hover:bg-primary/80 w-8 h-8 flex items-center justify-center rounded transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Message */}
                {notice.message && (
                  <p className="text-gray-600 text-base leading-relaxed">{notice.message}</p>
                )}

                {/* Media Section */}
                {hasMedia ? (
                  <div className="space-y-4">
                    {/* Current Media Display */}
                    <div className="relative bg-gray-100 rounded-lg overflow-hidden min-h-80 flex items-center justify-center">
                      {currentMedia ? (
                        <>
                          {currentMedia.type === 'video' ? (
                            <video
                              src={currentMedia.url}
                              controls
                              className="w-full h-80 object-contain bg-black"
                              autoPlay
                              muted
                              loop
                              onError={(e) => {
                                e.target.poster = 'https://via.placeholder.com/400x300?text=Video+Not+Found'
                                console.error('Video error:', e)
                              }}
                              onLoadedData={() => console.log('Video loaded successfully')}
                            />
                          ) : currentMedia.type === 'photo' ? (
                            <img
                              src={currentMedia.url}
                              alt={currentMedia.description || 'Notice media'}
                              className="w-full h-80 object-contain"
                              onError={(e) => {
                                const fallbackUrl = handleImageError(currentMedia.url, 'https://picsum.photos/seed/fallback/400/300.jpg')
                                e.target.src = fallbackUrl
                                e.target.onerror = null
                                console.error('Image error:', currentMedia.url)
                              }}
                              onLoad={() => console.log('Image loaded successfully')}
                            />
                          ) : (
                            <div className="text-center text-gray-500">
                              <p>Unknown media type: {currentMedia.type}</p>
                            </div>
                          )}

                          {/* Media Type Badge */}
                          <div className="absolute top-3 right-3 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {currentMedia.type?.toUpperCase() || 'MEDIA'}
                          </div>
                        </>
                      ) : (
                        <div className="text-center text-gray-500">
                          <p>No media available - currentMedia is null</p>
                        </div>
                      )}

                      {/* Navigation Arrows (show only if multiple media) */}
                      {notice.mediaItems && notice.mediaItems.length > 1 && (
                        <>
                          <button
                            onClick={() => prevMedia(notice._id, notice.mediaItems.length)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                          >
                            ◀
                          </button>
                          <button
                            onClick={() => nextMedia(notice._id, notice.mediaItems.length)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                          >
                            ▶
                          </button>
                        </>
                      )}
                    </div>

                    {/* Media Description */}
                    {currentMedia && currentMedia.description && (
                      <p className="text-sm text-gray-600 px-2">{currentMedia.description}</p>
                    )}

                    {/* Media Counter and Thumbnails */}
                    {notice.mediaItems && notice.mediaItems.length > 1 && (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-500 text-center">
                          {mediaIdx + 1} of {notice.mediaItems.length}
                        </p>

                        {/* Thumbnail Grid */}
                        <div className="grid grid-cols-4 gap-2">
                          {notice.mediaItems.map((media, mediaIndex) => (
                            <button
                              key={mediaIndex}
                              onClick={() =>
                                setCurrentMediaIndex((prev) => ({
                                  ...prev,
                                  [notice._id]: mediaIndex
                                }))
                              }
                              className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                                mediaIndex === mediaIdx
                                  ? 'border-secondary scale-105'
                                  : 'border-gray-300 hover:border-secondary'
                              }`}
                            >
                              {media.type === 'video' ? (
                                <div className="relative">
                                  <video
                                    src={media.url}
                                    className="w-full aspect-square object-cover"
                                    onError={(e) => {
                                      e.target.poster = 'https://via.placeholder.com/200x200?text=Video+Not+Found'
                                    }}
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                    <span className="text-white text-2xl">▶</span>
                                  </div>
                                </div>
                              ) : (
                                <img
                                  src={media.url}
                                  alt={`Thumbnail ${mediaIndex + 1}`}
                                  className="w-full aspect-square object-cover"
                                  onError={(e) => {
                                    const fallbackUrl = handleImageError(media.url, 'https://picsum.photos/seed/thumb/200/200.jpg')
                                    e.target.src = fallbackUrl
                                    e.target.onerror = null
                                  }}
                                />
                              )}
                              {/* Type indicator */}
                              <div className="absolute top-1 right-1 bg-secondary text-white text-xs px-1 py-0.5 rounded">
                                {media.type === 'video' ? '🎥' : '📷'}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-100 p-6 rounded-lg text-center text-gray-600">
                    <p>No media items to display</p>
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={() => closeNotice(notice._id)}
                  className="w-full btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
