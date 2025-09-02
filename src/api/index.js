import apiClient from './client.js'

export const api = {
  get: function get(url, config = {}) { return apiClient.get(url, config) },
  post: function post(url, data, config = {}) { return apiClient.post(url, data, config) },
  put: function put(url, data, config = {}) { return apiClient.put(url, data, config) },
  patch: function patch(url, data, config = {}) { return apiClient.patch(url, data, config) },
  delete: function deleteMethod(url, config = {}) { return apiClient.delete(url, config) },
}

export default api