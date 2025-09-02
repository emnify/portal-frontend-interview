import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api-staging.dev.emnify.io/api/v2',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  function requestInterceptor(config) {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function requestErrorHandler(error) {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  function responseInterceptor(response) {
    return response
  },
  function responseErrorHandler(error) {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
    }
    return Promise.reject(error)
  }
)

export default apiClient
