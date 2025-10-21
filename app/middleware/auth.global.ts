import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuthStore } from '../../stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()

  // 🔒 Check authentication
  const protectedRoutes = [ '/staffdashboard', '/admindashboard']
  if (!auth.isAuthenticated && protectedRoutes.includes(to.path)) {
    console.log('[AUTH MIDDLEWARE] Redirecting to /login')
    return navigateTo('/login')
  }

  // ✅ If authenticated, check role from localStorage
  if (auth.isAuthenticated) {
    let role: string | null = null
    try {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        role = parsedUser.role || 'user' // fallback for older accounts
      }
    } catch (err) {
      console.warn('[AUTH MIDDLEWARE] Failed to parse user from localStorage:', err)
    }

    // 🧭 Role-based route protection
    if (to.path.startsWith('/admindashboard') && role !== 'admin') {
      console.log('[AUTH MIDDLEWARE] Non-admin tried to access admin page')
      return navigateTo('/')
    }

    if (to.path.startsWith('/staffdashboard') && role !== 'staff' && role !== 'admin') {
      console.log('[AUTH MIDDLEWARE] Non-staff tried to access staff page')
      return navigateTo('/')
    }

    // Only admins can access user management
    if (to.path.startsWith('/userManagement') && role !== 'admin') {
  console.log('[AUTH MIDDLEWARE] Non-admin tried to access user management page')
  return navigateTo('/')
}


   // Normal users (role = 'user') can only stay on public routes like '/'
    if (role === 'user' && (to.path !== '/' && !to.path.startsWith('/'))) {
      console.log('[AUTH MIDDLEWARE] User tried to access restricted page')
      return navigateTo('/')
    }
  }
})
