<template>
  <!-- bg-[url('/Landing-page.jpg')]-->
  <section
    class="h-full bg-linear-to-bl from-pink-100 to-pink-300 !w-full flex flex-col gap-20"
  >
    <Header />

    <!-- Hero Section -->
    <section
      id="hero"
      class="bg-pink-300 rounded-2xl shadow-md p-6 flex flex-col sm:flex-row gap-6 sm:gap-0 items-center jutify-between w-[90%] sm:max-w-[70%] mx-auto"
    >
      <div class="w-full sm:w-1/2 flex flex-col gap-4">
        <p class="unifrakturmaguntia-regular text-5xl font-semibold">
          Welcome to Beauty & Beyond
        </p>
        <p class="unifrakturmaguntia-regular text-2xl font-medium">
          At Beauty and Beyond, we specialize in elevating your beauty routine
          with professional nail care, rejuvenating manicures, relaxing
          pedicures, and revitalizing facials. Our team is dedicated to
          providing you with a luxurious experience that leaves you feeling
          pampered and refreshed.
        </p>
        <a
          href="#services"
          class="bg-pink-900 hover:bg-pink-700 text-white py-2 px-3 rounded-3xl flex gap-2 hover:gap-4 w-fit"
        >
          <p>Check out our services</p>
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
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </a>
      </div>

      <div
        class="rounded-2xl bg-[url('/Nails1.jpg')] w-[400px] h-[500px] bg-cover bg-center mx-auto sm:ml-auto"
      ></div>
    </section>

    <!-- Services Section -->
    <section
      id="services"
      class="w-[90%] sm:max-w-[70%] mx-auto py-10 text-center bg-pink-300 rounded-2xl px-6 "
    >
      <h3 class="text-4xl font-bold text-gray-800 mb-6">Our Services</h3>

      <!-- Nail Care -->
      <div>
        <h4 class="text-3xl font-semibold unifrakturmaguntia-regular text-start mb-6"> Nail Care</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <!--Tips & Builder gel-->
          <div
            class="p-6 bg-pink-600/30 shadow rounded-xl flex flex-col gap-3"
          >
            <div
              class="rounded-2xl bg-[url('/tips-builder-gel.jpeg')] w-full h-[250px] bg-cover bg-center"
            ></div>
            <h5 class="text-lg font-semibold text-gray-800">
              Tips and Builder Gel
            </h5>
            <p>
              Strengthen and extend your nails with a flawless, glossy finish
              that lasts for weeks.
            </p>
          </div>

          <!--Gumgel-->
          <div
            class="p-6 bg-pink-600/30 shadow rounded-xl flex flex-col gap-3"
          >
            <div
              class="rounded-2xl bg-[url('/gumgel.jpeg')] w-full h-[250px] bg-cover bg-[left_70%_top_50%]"
            ></div>
            <h5 class="text-lg font-semibold text-gray-800">Gumgel</h5>
            <p>
              Enjoy a flexible, natural-looking enhancement that combines
              strength with a lightweight feel.
            </p>
          </div>

          <div
            class="p-6 bg-pink-600/30 shadow rounded-xl flex flex-col gap-3"
          >
            <div
              class="rounded-2xl bg-[url('/gel-nails.jpeg')] w-full h-[250px] bg-cover bg-center"
            ></div>
            <h5 class="text-lg font-semibold text-gray-800">Gel Nails</h5>
            <p>
              Get smooth, vibrant nails with a durable gel polish that resists
              chips and keeps its shine.
            </p>
          </div>

          <div
            class="p-6 bg-pink-600/30 shadow rounded-xl flex flex-col gap-3"
          >
            <div
              class="rounded-2xl bg-[url('/nails.jpeg')] w-full h-[250px] bg-cover bg-center"
            ></div>
            <h5 class="text-lg font-semibold text-gray-800">Classic Nails</h5>
            <p>
              Simple, elegant, and timeless — a perfect polish for any occasion.
            </p>
          </div>
        </div>
      </div>

      <!-- Hand & Foot Care -->
      <div class="mt-6">
        <h4 class="text-3xl font-semibold unifrakturmaguntia-regular text-start mb-6">
           Hand & Foot Care
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          <div
            class="p-6 bg-pink-600/30 shadow rounded-xl flex flex-col gap-3"
          >
            <div
              class="rounded-2xl bg-[url('/manicure.jpg')] w-full h-[250px] bg-cover bg-[left_50%_top_70%]"
            ></div>
            <h5 class="text-lg font-semibold text-gray-800">Manicure</h5>
            <p>
              Nourish and beautify your hands with gentle exfoliation, trimming,
              and perfect polish.
            </p>
          </div>

          <div
            class="p-6 bg-pink-600/30 shadow rounded-xl flex flex-col gap-3"
          >
            <div
              class="rounded-2xl bg-[url('/pedicure.jpg')] w-full h-[250px] bg-cover bg-center"
            ></div>
            <h5 class="text-lg font-semibold text-gray-800">Pedicure</h5>
            <p>
              Relax and refresh your feet with a soothing soak, exfoliation, and
              polish that pampers every step.
            </p>
          </div>
        </div>
      </div>

      <!-- Facial & Beauty Care -->
      <div class="mt-6">
        <h4 class="text-3xl font-semibold unifrakturmaguntia-regular text-start mb-6">
           Facial & Beauty Care
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            class="p-6 bg-pink-600/30 shadow rounded-xl flex flex-col gap-3"
          >
            <div
              class="rounded-2xl bg-[url('/facials.jpg')] w-full h-[250px] bg-cover bg-center"
            ></div>
            <h5 class="text-lg font-semibold text-gray-800">Facials</h5>
            <p>
              Deeply cleanse, hydrate, and rejuvenate your skin for a radiant,
              healthy glow.
            </p>
          </div>

          <div
            class="p-6 bg-pink-600/30 shadow rounded-xl flex flex-col gap-3"
          >
            <div
              class="rounded-2xl bg-[url('/makeup.jpg')] w-full h-[250px] bg-cover bg-center"
            ></div>
            <h5 class="text-lg font-semibold text-gray-800">Make Up</h5>
            <p>
              From soft glam to bold beauty, our professional makeup enhances
              your natural charm.
            </p>
          </div>

          <div
            class="p-6 bg-pink-600/30 shadow rounded-xl flex flex-col gap-3"
          >
            <div
              class="rounded-2xl bg-[url('/piercing.jpg')] w-full h-[250px] bg-cover  bg-[left_50%_top_80%]"
            ></div>
            <h5 class="text-lg font-semibold text-gray-800">Piercings</h5>
            <p>
              Safe, stylish, and precise — express your personality with our
              hygienic piercing services.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Wrapper for location and contact sections -->  
    <div class="space-y-4">  

       <!--Connect with us Section-->
    <section
      id="contact"
      class="bg-pink-300 w-[90%] sm:max-w-[70%] flex flex-col gap-4 mx-auto rounded-2xl py-4 px-10"
    >
      <h1 class="text-2xl text-pink-700 font-medium text-center">
        Connect with us
      </h1>

      <div class="grid grid-cols-4 sm:grid-cols-12 gap-4">
        <!--Phone-->
        <div
          class="flex flex-col gap-3 w-full col-span-4 justify-center items-center text-center"
        >
        <div class=" bg-pink-100 rounded-full p-3">
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
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>
          </div>

          <h1 class="text-lg font-medium">Call us on:</h1>

          <div class="flex gap-2 w-full justify-center">
            <a href="tel:+254712345678" class="hover:text-pink-500  cursor-pointer relative inline-block no-underline w-fit after:content-[''] after:absolute after:w-full after:scale-x-0 after:rounded after:h-[0.05em] after:bottom-0 after:left-0 after:bg-current after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left">
              +254 746 184 187
            </a>            
          </div>
        </div>

        <!--Email-->
        <div
          class="flex flex-col gap-3 w-full col-span-4 justify-center items-center text-center"
        >
        <div class=" bg-pink-100 rounded-full p-3">
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
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
          </div>

          <h1 class="text-lg font-medium">E-mail us on:</h1>

          <div class="flex gap-2 w-full justify-center">
            <a
              href="mailto:glamourbeauty@gmail.com"
              class="hover:text-pink-500  cursor-pointer relative inline-block no-underline w-fit after:content-[''] after:absolute after:w-full after:scale-x-0 after:rounded after:h-[0.05em] after:bottom-0 after:left-0 after:bg-current after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              abigaelnzanzai@gmail.com
            </a>
          </div>
        </div>

        <!--Socials-->
        <div
          class="flex flex-col gap-3 w-full col-span-4 justify-center items-center text-center"
        >
        <div class=" bg-pink-100 rounded-full p-3">
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
          </div>

          <h1 class="text-lg font-medium">Our Socials:</h1>

          <div class="flex space-x-4">
            <a
              href="https://www.instagram.com/_abigaeel_/ "
              class="text-gray-400 hover:text-white hover:cursor-pointer hover:underline transition transform hover:translate-y-1"
            >
              <span class="sr-only">Instagram</span>
              <!-- Instagram-style logo SVG -->
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Instagram"
                role="img"
              >
                <defs>
                  <linearGradient id="igGrad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stop-color="#f58529" />
                    <stop offset="0.25" stop-color="#feda77" />
                    <stop offset="0.5" stop-color="#dd2a7b" />
                    <stop offset="0.75" stop-color="#8134af" />
                    <stop offset="1" stop-color="#515bd4" />
                  </linearGradient>
                </defs>

                <rect
                  x="32"
                  y="32"
                  width="448"
                  height="448"
                  rx="120"
                  ry="120"
                  fill="url(#igGrad)"
                />
                <rect
                  x="96"
                  y="96"
                  width="320"
                  height="320"
                  rx="80"
                  ry="80"
                  fill="none"
                  stroke="rgba(255,255,255,0.95)"
                  stroke-width="28"
                />
                <circle cx="256" cy="256" r="72" fill="white" />
                <circle cx="256" cy="256" r="38" fill="url(#igGrad)" />
                <circle cx="366" cy="146" r="22" fill="white" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@beyond_nail_art_kamulu"
              class="text-gray-400 hover:text-white hover:cursor-pointer hover:underline transition transform hover:translate-y-1"
            >
              <span class="sr-only">Tiktok</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="TikTok"
                role="img"
              >
                <defs>
                  <linearGradient id="tiktokGrad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stop-color="#25F4EE" />
                    <stop offset="0.5" stop-color="#FE2C55" />
                    <stop offset="1" stop-color="#000000" />
                  </linearGradient>
                </defs>

                <rect
                  x="32"
                  y="32"
                  width="448"
                  height="448"
                  rx="120"
                  ry="120"
                  fill="url(#tiktokGrad)"
                />

                <path
                  d="M329.9 128.2c14.6 10.8 32.4 17.2 51.8 17.2v52.4c-18.9-.1-36.6-5.4-51.8-14.7v110.7c0 62.8-50.9 113.8-113.8 113.8-23.5 0-45.4-7.1-63.5-19.3a113.7 113.7 0 0 1 63.5-208.2v55.1a58.7 58.7 0 1 0 41.2 56.2V128.2h72.6Z"
                  fill="white"
                />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61556635842999"
              class="text-gray-400 hover:text-white hover:cursor-pointer hover:underline transition transform hover:translate-y-1"
            >
              <span class="sr-only">Facebook</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Facebook"
                role="img"
              >
                <defs>
                  <linearGradient id="facebookGrad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stop-color="#1877F2" />
                    <stop offset="1" stop-color="#4B91F1" />
                  </linearGradient>
                </defs>

                <rect
                  x="32"
                  y="32"
                  width="448"
                  height="448"
                  rx="120"
                  ry="120"
                  fill="url(#facebookGrad)"
                />

                <path
                  d="M334.5 160h-44c-13.7 0-22.5 9.1-22.5 24v40h66l-8.5 64h-57.5v160h-68V288h-48v-64h48v-48c0-52.6 30.2-80 76.7-80h57.8v64z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

     <!--Location-->
    <section
      id="location"
      class="bg-pink-300 w-[90%] sm:max-w-[70%] flex flex-col gap-4 mx-auto rounded-2xl py-4 px-10"
    >
      <div class="space-y-3 text-center">
        <h1 class="text-2xl text-pink-700 font-medium text-center">
          Our Location
        </h1>

        <a
          href="https://www.google.com/maps/place/1%C2%B06'57.2%22S+37%C2%B003'54.0%22E/@-1.2825403,37.0624226,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-1.2825403!4d37.0649975?hl=en&entry=ttu&g_ep=EgoyMDI1MTAwNi4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          class="text-pink-600 cursor-pointer relative inline-block no-underline w-fit after:content-[''] after:absolute after:w-full after:scale-x-0 after:rounded after:h-[0.05em] after:bottom-0 after:left-0 after:bg-current after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left"
        >
          Kamulu next to Co-operative Bank
        </a>
      </div>

      <!--Map-->
      <div class="sm:h-[472px] h-96 w-full rounded-[32px] z-0" id="map"></div>
    </section>   
    </div>

    <!--Footer-->
    <footer class="bg-pink-300 text-gray-200 rounded-t-xl py-10">
      <div class="w-[90%] sm:max-w-[70%] mx-auto px-6 text-center">
        <!--Copyright and socials-->
        <div class="flex justify-center sm:px-6">
          <!-- Copyright -->
          <div>
            <p class="text-sm text-pink-600">
              &copy; {{ new Date().getFullYear() }} Beauty and Beyond. All
              rights reserved.
            </p>
            <p class="text-sm text-pink-600">Website built by
              
              <a
              href="mailto:glamourbeauty@gmail.com"
              class="hover:text-pink-500  cursor-pointer relative inline-block no-underline w-fit after:content-[''] after:absolute after:w-full after:scale-x-0 after:rounded after:h-[0.05em] after:bottom-0 after:left-0 after:bg-current after:origin-bottom-right after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              johnkimotho@gmail.com
            </a>

            </p>
          </div>
        </div>
      </div>
    </footer>
  </section>
</template>

<script setup lang="ts">
import Header from "~/components/Header.vue";
import { onMounted } from "vue";
const { $L } = useNuxtApp();

//  Go to login page
function goToLogin() {
  navigateTo("/login", { replace: true });
}

// Map configuration
onMounted(async () => {
  const { $L } = useNuxtApp();
  if (!$L) return console.error("Leaflet is not available yet!");

  const L = $L as typeof import("leaflet");

  const lat = -1.282379;
  const lng = 37.064968;

  const map = L.map("map").setView([lat, lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, lng]).addTo(map).bindPopup("📍 Our Location");
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
