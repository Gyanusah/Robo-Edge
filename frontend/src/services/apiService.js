import api from './api'
import Cookies from 'js-cookie'

export const contactApi = {
  sendMessage: (data) => api.post('/api/contact/send', data),
  getMessages: () => api.get('/api/contact/messages')
}

export const galleryApi = {
  getItems: () => api.get('/api/gallery'),
  uploadItem: (formData) => {
    console.log('Uploading gallery item...')
    return api.post('/api/gallery/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 30000 // 30 second timeout for file uploads
    })
  },
  updateItem: (id, data) => api.put(`/api/gallery/${id}`, data),
  deleteItem: (id) => api.delete(`/api/gallery/${id}`)
}

export const testimonialsApi = {
  getTestimonials: () => api.get('/api/testimonials'),
  createTestimonial: (data) => {
    console.log('Creating testimonial...')
    return api.post('/api/testimonials', data)
  },
  updateTestimonial: (id, data) => api.put(`/api/testimonials/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/api/testimonials/${id}`)
}

export const noticesApi = {
  getNotices: () => api.get('/api/notices'),
  createNotice: (data) => {
    console.log('Creating notice...', data)
    return api.post('/api/notices', data, { timeout: 30000 }) // 30 second timeout for notice creation
  },
  updateNotice: (id, data) => api.put(`/api/notices/${id}`, data),
  deleteNotice: (id) => api.delete(`/api/notices/${id}`)
}

export const authApi = {
  login: (credentials) => {
    console.log('Logging in with:', credentials.email)
    return api.post('/api/auth/login', credentials)
  },
  // getMe: () => {
  //   return api.get('/api/auth/me')
  // },
  logout: () => {
    api.post('/api/auth/logout')
    Cookies.remove('token')
  },
  // Admin management endpoints
  createAdmin: (adminData) => {
    console.log('Creating new admin:', adminData.email)
    return api.post('/api/auth/create-admin', adminData)
  },
  getAllAdmins: () => {
    return api.get('/api/auth/admins')
  }
}
