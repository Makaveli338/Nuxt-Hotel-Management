<template>
  <section
    class="w-full bg-card/80 backdrop-blur-md sticky top-0 z-50 p-6 flex justify-between items-center lg:w-[100%] mx-auto md:w-auto"
  >
    <p class="ballet text-2xl sm:text-4xl text-pink-900 font-semibold">
      BeautyBeyond
    </p>

    <!--Navigation Links -->
    <div class="flex items-center gap-4">
      <div class="relative">
        <button
  @click="isopen = !isopen"
  class="relative w-8 h-8 flex items-center justify-center focus:outline-none cursor-pointer"
>
  <!-- Top line -->
  <span
    class="absolute block h-[2px] w-6 bg-gray-800 rounded transition-all duration-300 ease-in-out"
    :class="isopen ? 'rotate-45 translate-y-0' : '-translate-y-[6px]'"
  ></span>

  <!-- Middle line -->
  <span
    class="absolute block h-[2px] w-6 bg-gray-800 rounded transition-all duration-300 ease-in-out"
    :class="isopen ? 'opacity-0' : 'opacity-100'"
  ></span>

  <!-- Bottom line -->
  <span
    class="absolute block h-[2px] w-6 bg-gray-800 rounded transition-all duration-300 ease-in-out"
    :class="isopen ? '-rotate-45 translate-y-0' : 'translate-y-[6px]'"
  ></span>
</button>


        <!-- Dropdown Menu -->
        <div
          v-if="isopen"
          class="absolute right-0 top-12 w-[200px] bg-white shadow-lg rounded-lg p-4 flex flex-col gap-4 text-center z-50"
        >
          <NuxtLink
             v-if="!isStaffOrAdmin"
            @click="isopen = false"
            to="/"
            class="text-pink-600 cursor-pointer hover:text-pink-900"
          >
            Home
          </NuxtLink>

          <!-- Dashboard: only visible if logged in -->
          <NuxtLink
            v-if="isStaffOrAdmin"
            :to="dashboardRoute"
            class="text-pink-600 cursor-pointer hover:text-pink-900"
          >
            Dashboard
          </NuxtLink>

          <!-- Inventory: only visible if logged in -->
          <NuxtLink
            v-if="isStaffOrAdmin"
            to="/inventory"
            class="text-pink-600 cursor-pointer hover:text-pink-900"
          >
            Inventory
          </NuxtLink>

          <!-- usermanagement: only visible if logged in -->
          <NuxtLink
            v-if="isAdmin"
            to="/usermanagement"
            class="text-pink-600 cursor-pointer hover:text-pink-900"
          >
            User Management
          </NuxtLink>

          <a
             v-if="!isStaffOrAdmin"
            @click="isopen = false"
            href="#services"
            class="text-pink-600 cursor-pointer hover:text-pink-900"
          >
            Our Services
          </a>

          <a
             v-if="!isStaffOrAdmin"
            @click="isopen = false"
            href="#contact"
            class="text-pink-600 cursor-pointer hover:text-pink-900"
            >Contact Us</a
          >
          <a
             v-if="!isStaffOrAdmin"
            @click="isopen = false"
            href="#location"
            class="text-pink-600 cursor-pointer hover:text-pink-900"
            >Location</a
          >
        </div>
      </div>

      <!-- Buttons -->
      <div
        v-if="auth && auth.isAuthenticated"
        class="flex flex-col gap-2 justify-center items-center relative"
      >
        <button
          @click="handleLogout"
          class="bg-pink-900 hover:bg-pink-700 text-white py-2 px-3 rounded-full"
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
import { ref, computed, onMounted } from "vue";
import { navigateTo } from "#app";
import { useAuthStore } from "../../stores/auth";

const isopen = ref(false);
const auth = useAuthStore();

// ✅ Restore session when component mounts
onMounted(() => {
  auth.initialize();
});

// ✅ Role-based checks
const isAuthenticated = computed(() => auth.isAuthenticated);
const isAdmin = computed(() => auth.user?.role === "admin");
const isStaff = computed(() => auth.user?.role === "staff");
const isStaffOrAdmin = computed(() => isAdmin.value || isStaff.value);

// ✅ Dashboard route (admin vs staff)
const dashboardRoute = computed(() => {
  if (!isAuthenticated.value) return "/login";
  return isAdmin.value ? "/adminDashboard" : "/staffDashboard";
});

// ✅ Logout handler
function handleLogout() {
  auth.logout();
  navigateTo("/", { replace: true });
}

// ✅ Include Ballet font
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Ballet&display=swap",
    },
  ],
});
</script>

