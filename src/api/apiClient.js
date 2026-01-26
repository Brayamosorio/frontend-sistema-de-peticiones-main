import axios from 'axios'
import API_BASE_URL from './config'
import { getAuth, clearAuth } from '../store/authStore'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar token JWT en cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const auth = getAuth()
    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor para manejar errores de autenticacion
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const auth = getAuth()
      const token = auth?.token
      if (token && token !== 'mock-token') {
        clearAuth()
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
