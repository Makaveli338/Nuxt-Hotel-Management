<template>
  <div
    class="min-h-screen bg-[url('/Landing-page.jpg')] bg-cover bg-center w-full flex items-center justify-center px-4 relative"
  >
    <NuxtLink
      to="/"
      class="absolute top-10 left-10 bg-purple-900 hover:bg-purple-700 text-white py-2 px-3 rounded-3xl h-fit flex gap-2"
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
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
      Back to Home
    </NuxtLink>

    <!--Main Container-->
    <div
      class="relative w-full sm:w-[500px] bg-transparent border-1 rounded-2xl backdrop-blur-[55px] text-white border-pink-200 p-6"
    >

    <div v-if="activeTab === 'login'" class="flex flex-col gap-4">
      <h1 class="text-2xl font-semibold">Login</h1>

      <!--Email-->
      <div>
        <label class="block font-medium">Email:</label>
        <input
          type="email"
          class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>

      <!--Password-->
      <div>
        <label class="block font-medium">Password:</label>
        <input
          type="password"
          class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>


      <!--Dont have an Account?-->
      <div class="flex gap-4">
        <p>Don't have an account?</p>
        <button   @click="activeTab = 'register'" class="text-purple-900 hover:text-purple-950 font-medium cursor-pointer">Register</button>
      </div>
      <button
        class="bg-purple-500 cursor-pointer hover:bg-purple-600 text-white py-2 px-4 rounded-3xl text-center h-fit"
      >
        Login
      </button>
    </div>

    <div v-else class="flex flex-col gap-4">
      <h1 class="text-2xl font-semibold">Register</h1>
      <!--Email-->
      <div>
        <label class="block font-medium">Email:</label>
        <input
          type="email"
          class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>

      <!--Password-->
      <div>
        <label class="block font-medium">Password:</label>
        <input
          type="password"
          class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>

      <!--Username-->
      <div>
        <label class="block font-medium">Username:</label>
        <input
          type="password"
          class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>

      <!--Dont have an Account?-->
      <div class="flex gap-4">
        <p>Have an account?</p>
        <button  @click="activeTab = 'login'"  class="text-purple-900 hover:text-purple-950 font-medium cursor-pointer">Login</button>
      </div>
      <button
        class="bg-purple-500 cursor-pointer hover:bg-purple-600 text-white py-2 px-4 rounded-3xl text-center h-fit"
      >
        Register
      </button>
    </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref("login");


</script>
