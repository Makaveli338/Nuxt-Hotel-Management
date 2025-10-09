import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuthStore } from '../../stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()

  if (auth.isAuthenticated && to.path === '/login') {
    console.log('[GUEST MIDDLEWARE] Redirecting logged-in user to /')
    return navigateTo('/')
  }
})
