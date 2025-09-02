import { defineStore } from 'pinia'
import { ref } from 'vue'
import authService from '@/services/authService'

export const useAuthStore = defineStore('auth', function useAuthStore() {
  const user = ref({})
  const token = ref(localStorage.getItem('authToken'))
  const isAuthenticated = ref(!!token.value)
  const isInitialized = ref(false)

  function setToken(newToken) {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('authToken', newToken)
     isAuthenticated.value = true
    } else {
      localStorage.removeItem('authToken')
      isAuthenticated.value = false
    }
  }

  function setUser(userData) {
    user.value = userData
  }

  async function signIn(email, password) {
    try {
      const response = await authService.signIn(email, password);

      setToken(response.auth_token);
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  function signOut() {
    setToken(null)
    setUser(null)
    isInitialized.value = false
  }

  async function checkAuth() {
    if (!token.value) {
      return false
    }

    try {
      const userData = await authService.getCurrentUser()
      setUser(userData)
      return true
    } catch {
      signOut();
      return false
    }
  }

  async function init() {
    if (isInitialized.value) {
      return
    }

    if (token.value) {
      await checkAuth()
    }

    isInitialized.value = true
  }

  return {
    user,
    token,
    isAuthenticated,
    isInitialized,
    signIn,
    signOut,
    checkAuth,
    init
  }
})
