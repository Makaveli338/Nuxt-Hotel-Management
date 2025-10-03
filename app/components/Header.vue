<template>
    <section class="p-6 flex justify-between">
        <p class="ballet text-2xl sm:text-6xl text-pink-900 font-semibold">BeautyBeyond</p>

        <div class="hidden lg:flex gap-4 items-center -ml-50">
            <NuxtLink to="/" class=" text-pink-600 cursor-pointer hover:text-pink-900">Home</NuxtLink>
            <button class=" text-pink-600 cursor-pointer hover:text-pink-900">Dashboard</button>
            <p class=" text-pink-600 cursor-pointer hover:text-pink-900">Contact Us</p>
            <p class=" text-pink-600 cursor-pointer hover:text-pink-900">Contact Us</p>
        </div>

        <div class="relative">
            <button @click="open = !open" class="bg-pink-900 hover:bg-pink-700 text-white py-2 px-3 rounded-3xl h-fit">
                View
            </button>

            <!--Dropdown menu-->
            <div v-if="open" class=" absolute w-50 right-0 top-13 bg-white  divide-y divide-pink-200 border border-pink-200 rounded-xl flex flex-col z-100 shadow-md">
                <NuxtLink to="/staffDashboard" class="p-4">
                    Staff Dashboard
                </NuxtLink>
                 <NuxtLink to="/adminDashboard" class="p-4" >
                    Admin Dashboard
                </NuxtLink>
                  <NuxtLink to="/inventory" class="p-4" >
                    Inventory
                </NuxtLink>
                 <NuxtLink to="/login" class="p-4" >
                    Login
                </NuxtLink>
            </div>
        </div>
    </section>
</template>


<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const open = ref(false);

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Ballet&display=swap",
    },
  ],
})
</script>