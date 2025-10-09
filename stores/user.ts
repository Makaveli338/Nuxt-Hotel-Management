// stores/user.ts
import { defineStore } from 'pinia'

interface User {
  id: number
  username: string
  email: string
  role?: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null
  }),

  actions: {
    setUser(userData: User) {
      this.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
    },
    clearUser() {
      this.user = null
      localStorage.removeItem('user')
    },
   loadUser() {
  if (import.meta.client) {
    const saved = localStorage.getItem('user');
    if (saved) this.user = JSON.parse(saved);
  }
}
  }
})
