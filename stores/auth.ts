import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),

  actions: {
    login(userData: User) {   // ✅ Typed parameter
      this.user = userData
      this.isAuthenticated = true
      localStorage.setItem('user', JSON.stringify(userData))
      console.log('[AUTH] User logged in:', this.user)
    },

    logout() {
      console.log('[AUTH] Logging out user:', this.user)
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('user')
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
