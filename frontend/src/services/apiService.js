import api from './api'
import Cookies from 'js-cookie'

export const contactApi = {
  sendMessage: (data) => api.post('/contact/send', data),
  getMessages: () => api.get('/contact/messages')
}

export const galleryApi = {
  getItems: () => api.get('/gallery'),
  uploadItem: (formData) => {
    console.log('Uploading gallery item...')
    return api.post('/gallery/upload', formData, {
      headers: { 'Content-Type': 'application/json' }
    })
  },
  deleteItem: (id) => api.delete(`/gallery/${id}`),
  updateItem: (id, data) => api.put(`/gallery/${id}`, data)
}

export const testimonialsApi = {
  getTestimonials: () => api.get('/testimonials'),
  createTestimonial: (data) => {
    console.log('Creating testimonial...')
    return api.post('/testimonials', data)
  },
  updateTestimonial: (id, data) => api.put(`/testimonials/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/testimonials/${id}`)
}

export const noticesApi = {
  getNotices: () => api.get('/notices'),
  createNotice: (data) => {
    console.log('Creating notice...')
    return api.post('/notices', data)
  },
  updateNotice: (id, data) => api.put(`/notices/${id}`, data),
  deleteNotice: (id) => api.delete(`/notices/${id}`)
}

export const authApi = {
  login: (credentials) => {
    console.log('Logging in with:', credentials.email)
    return api.post('/auth/login', credentials)
  },
  getMe: () => {
    return api.get('/auth/me')
  },
  logout: () => {
    api.post('/auth/logout')
    Cookies.remove('token')
  }
}
