import apiClient from './apiClient'

export const areaApi = {
  list: async (page = 0, size = 50) => {
    const response = await apiClient.get('/area/list', {
      params: { page, size },
    })
    return response.data
  },

  getById: async (id) => {
    const response = await apiClient.get(`/area/id/${id}`)
    return response.data
  },

  getByName: async (name) => {
    const response = await apiClient.get(`/area/name/${encodeURIComponent(name)}`)
    return response.data
  },

  create: async (data) => {
    const response = await apiClient.post('/area/new', data)
    return response.data
  },

  update: async (id, data) => {
    const response = await apiClient.put(`/area/update/${id}`, data)
    return response.data
  },
}
