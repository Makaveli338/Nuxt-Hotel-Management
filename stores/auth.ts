import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    login(userData: any) {
      this.user = userData
      this.isAuthenticated = true
      console.log('[AUTH] User logged in:', this.user)
    },

    logout() {
      console.log('[AUTH] Logging out user:', this.user)
      this.user = null
      this.isAuthenticated = false
      console.log('[AUTH] User logged out. Authenticated:', this.isAuthenticated)
    },

    initialize() {
      console.log('[AUTH] Initializing auth store...')
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        this.user = JSON.parse(savedUser)
        this.isAuthenticated = true
        console.log('[AUTH] Restored session:', this.user)
      } else {
        console.log('[AUTH] No saved session found.')
      }
    },
  },
})
