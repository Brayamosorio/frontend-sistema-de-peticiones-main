import apiClient from './apiClient'

export const authApi = {
  login: async (username, password) => {
    const response = await apiClient.post('/auth/login', { username, password })
    return response.data
  },

  register: async (data) => {
    const response = await apiClient.post('/auth/sign', data)
    return response.data
  },

  updateUser: async (id, data) => {
    const response = await apiClient.post(`/auth/update/user/${id}`, data)
    return response.data
  },
}
