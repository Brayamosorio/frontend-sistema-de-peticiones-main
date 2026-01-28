import apiClient from './apiClient'

export const sendInformApi = {
  sendToArea: async (informId, destinations) => {
    const response = await apiClient.post(`/send/inform/${informId}/area`, {
      destinations,
    })
    return response.data
  },

  sendToUser: async (informId, destinations) => {
    const response = await apiClient.post(`/send/inform/${informId}/user`, {
      destinations,
    })
    return response.data
  },

  listPending: async () => {
    const response = await apiClient.get('/send/inform/pending')
    return response.data
  },

  approvePending: async (destinationId, observation) => {
    const response = await apiClient.post(`/send/inform/${destinationId}/approve`, {
      observation: observation || '',
    })
    return response.data
  },

  rejectPending: async (destinationId, observation) => {
    const response = await apiClient.post(`/send/inform/${destinationId}/reject`, {
      observation: observation || '',
    })
    return response.data
  },
}
