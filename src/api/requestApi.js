import apiClient from './apiClient'

export const requestApi = {
  listInbox: async () => {
    const response = await apiClient.get('/request/inbox')
    return response.data
  },

  listSent: async () => {
    const response = await apiClient.get('/request/sent')
    return response.data
  },

  listHistory: async () => {
    const response = await apiClient.get('/request/history')
    return response.data
  },

  // Crear solicitud a un area
  createToArea: async (data) => {
    const response = await apiClient.post('/request/area', data)
    return response.data
  },

  // Crear solicitud a un usuario
  createToUser: async (data) => {
    const response = await apiClient.post('/request/user', data)
    return response.data
  },

  // Responder a una solicitud
  reply: async (id, data) => {
    const response = await apiClient.post(`/request/reply/${id}`, data)
    return response.data
  },
}
