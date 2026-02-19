import React from 'react'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-transparent/30 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold text-white">Course Application</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-light leading-none absolute top-4 right-4"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
