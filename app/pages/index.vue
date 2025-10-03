<template>
   <section class="min-h-screen bg-[url('/Landing-page.jpg')] bg-cover bg-center overflow-y-clip flex flex-col">
  <Header />

  <!-- Main container fills remaining space and centers -->
  <section class="flex-1 w-full flex items-center justify-center">
    <div class="max-w-7xl space-y-5 text-center">
      <p class="ballet text-4xl sm:text-6xl text-pink-100 font-semibold">
        Welcome to Beauty & Beyond
      </p>
      <p class="text-2xl sm:text-4xl text-pink-100 font-semibold capitalize">
        Select a dashboard to navigate to at the top right corner
      </p>
    </div>
  </section>
</section>

</template>

<script setup>
import Header from '~/components/Header.vue';
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Ballet&display=swap",
    },
  ],
})

</script>