import apiClient from './apiClient'

export const auditApi = {
  listOperations: async () => {
    const response = await apiClient.get('/audit/operation/list')
    return response.data
  },

  getOperationById: async (id) => {
    const response = await apiClient.get(`/audit/operation/${id}`)
    return response.data
  },

  getOperationsByType: async (operation) => {
    const response = await apiClient.get(`/audit/operation/type/${encodeURIComponent(operation)}`)
    return response.data
  },

  getOperationsByDate: async (date) => {
    const response = await apiClient.get(`/audit/operation/date/${date}`)
    return response.data
  },

  listStates: async () => {
    const response = await apiClient.get('/audit/states/list')
    return response.data
  },

  getStateById: async (id) => {
    const response = await apiClient.get(`/audit/states/${id}`)
    return response.data
  },

  getStatesByInformId: async (informId) => {
    const response = await apiClient.get(`/audit/states/inform/${informId}`)
    return response.data
  },

  getStatesByRequestId: async (requestId) => {
    const response = await apiClient.get(`/audit/states/request/${requestId}`)
    return response.data
  },

  getStatesByInformState: async (state) => {
    const response = await apiClient.get(`/audit/inform/state/${state}`)
    return response.data
  },

  getStatesByRequestState: async (state) => {
    const response = await apiClient.get(`/audit/request/state/${state}`)
    return response.data
  },
}
