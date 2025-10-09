import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuthStore } from '../../stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()
  

  const protectedRoutes = ['/dashboard']
  if (!auth.isAuthenticated && protectedRoutes.includes(to.path)) {
    console.log('[AUTH MIDDLEWARE] Redirecting to /login')
    return navigateTo('/login')
  }
})
