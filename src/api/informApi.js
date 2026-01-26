import apiClient from './apiClient'

export const informApi = {
  listGeneral: async (page = 0, size = 50) => {
    const response = await apiClient.get('/inform/general/list', {
      params: { page, size },
    })
    return response.data
  },

  listByUser: async (page = 0, size = 50) => {
    const response = await apiClient.get('/inform/user/list', {
      params: { page, size },
    })
    return response.data
  },

  listByAreaState: async (state) => {
    const response = await apiClient.get('/inform/area', {
      params: { state },
    })
    return response.data
  },

  listByUserState: async (state) => {
    const response = await apiClient.get('/inform/user', {
      params: { state },
    })
    return response.data
  },

  getById: async (id) => {
    const response = await apiClient.get(`/inform/${id}`)
    return response.data
  },

  getByTitle: async (title) => {
    const response = await apiClient.get(`/inform/${encodeURIComponent(title)}`)
    return response.data
  },

  createDraft: async () => {
    const response = await apiClient.post('/inform/new')
    return response.data
  },

  completeInform: async (id, data) => {
    const response = await apiClient.put(`/inform/created/${id}`, data)
    return response.data
  },

  deleteInform: async (id) => {
    const response = await apiClient.delete(`/inform/delete/${id}`)
    return response.data
  },
}
