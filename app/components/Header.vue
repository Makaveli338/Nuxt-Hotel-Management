<template>
  <section
    class="p-6 flex justify-between items-center lg:w-[95%] mx-auto w-full md:w-auto"
  >
    <p class="ballet text-2xl sm:text-6xl text-pink-900 font-semibold">
      BeautyBeyond
    </p>
   
    <!--Navigation Links -->
    <div class="flex items-center gap-4">
      <div class="relative ">
      <button
        @click="isopen = !isopen"
        class="bg-pink-900 hover:bg-pink-700 text-white py-2 px-3 rounded-3xl"
      >
        Navigation
      </button>

      <!-- Dropdown Menu -->
      <div
        v-if="isopen"
        class="absolute right-0 top-12 w-[200px] bg-white shadow-lg rounded-lg p-4 flex flex-col gap-4 text-center z-50"
      >
        <NuxtLink
          v-if="!auth.isAuthenticated"
          @click="isopen = false"
          to="/"
          class="text-pink-600 cursor-pointer hover:text-pink-900"
        >
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

        <a
          v-if="!auth.isAuthenticated"
           @click="isopen = false"
          href="#services"
          class="text-pink-600 cursor-pointer hover:text-pink-900"
        >
          Our Services
        </a>

        <a
          v-if="!auth.isAuthenticated"
           @click="isopen = false"
          href="#contact"
          class="text-pink-600 cursor-pointer hover:text-pink-900"
          >Contact Us</a
        >
        <a
          v-if="!auth.isAuthenticated"
           @click="isopen = false"
          href="#location"
          class="text-pink-600 cursor-pointer hover:text-pink-900"
          >Location</a
        >
      </div>
    </div>

    <!-- Buttons -->
    <div v-if="auth && auth.isAuthenticated" class="flex flex-col gap-2 justify-center items-center relative">
      <button
        @click="handleLogout"
        class="bg-pink-900 hover:bg-pink-700 text-white py-2 px-3 rounded-full "
      >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
      </button>
      <p class="absolute top-10 whitespace-nowrap">Log Out</p>
    </div>

    </div>
    
  </section>
</template>

<script setup>
import { computed } from "vue";
import { navigateTo } from "#app";
import { useAuthStore } from "../../stores/auth";

const isopen = ref(false);
const auth = useAuthStore();

//  Compute dashboard route dynamically based on role
const dashboardRoute = computed(() => {
  if (!auth.isAuthenticated) return "/login";
  if (auth.user?.role === "admin") return "/adminDashboard";
  return "/staffDashboard";
});

//  Logout functionality
function handleLogout() {
  auth.logout();
  navigateTo("/", { replace: true });
}

//  Optional: Restore session on mount
onMounted(() => {
  auth.initialize();
});

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Ballet&display=swap",
    },
  ],
});
</script>
