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
}
