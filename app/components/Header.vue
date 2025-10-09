<template>
  <section class="p-6 flex justify-between items-center">
    <p class="ballet text-2xl sm:text-6xl text-pink-900 font-semibold">BeautyBeyond</p>

    <!-- Navigation Links -->
    <div class="hidden lg:flex gap-4 items-center">
      <NuxtLink to="/" class="text-pink-600 cursor-pointer hover:text-pink-900">
        Home
      </NuxtLink>

      <!-- Dashboard: only visible if logged in -->
      <NuxtLink
        v-if="auth.isAuthenticated"
        :to="dashboardRoute"
        class="text-pink-600 cursor-pointer hover:text-pink-900"
      >
        Dashboard
      </NuxtLink>

      <!-- Inventory: only visible if logged in -->
      <NuxtLink
        v-if="auth.isAuthenticated"
        to="/inventory"
        class="text-pink-600 cursor-pointer hover:text-pink-900"
      >
        Inventory
      </NuxtLink>

      <p class="text-pink-600 cursor-pointer hover:text-pink-900">Contact Us</p>
    </div>

    <!-- Buttons -->
    <div class="flex gap-2">
      <button
        v-if="!auth.isAuthenticated"
        @click="goToLogin"
        class="bg-pink-900 hover:bg-pink-700 text-white py-2 px-3 rounded-3xl"
      >
        Login
      </button>

      <button
        v-else
        @click="handleLogout"
        class="bg-pink-900 hover:bg-pink-700 text-white py-2 px-3 rounded-3xl"
      >
        Logout
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { navigateTo } from '#app'
import { useAuthStore } from '../../stores/auth'

const auth = useAuthStore()

//  Compute dashboard route dynamically based on role
const dashboardRoute = computed(() => {
  if (!auth.isAuthenticated) return '/login'
  if (auth.user?.role === 'admin') return '/adminDashboard'
  return '/staffDashboard'
})

//  Go to login page
function goToLogin() {
  navigateTo('/login', { replace: true })
}

//  Logout functionality
function handleLogout() {
  auth.logout()
  navigateTo('/', { replace: true })
}

//  Optional: Restore session on mount
onMounted(() => {
  auth.initialize()
})

useHead({ link: [ { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Ballet&display=swap", }, ], })
</script>

