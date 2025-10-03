<template>
  <Header />
  <section class="p-6 flex flex-col gap-6">
    <!--Top section-->
    <section class="flex flex-col sm:flex-row justify-between gap-6">
      <!--Input form container-->
      <div
        class="flex flex-col gap-4 border border-pink-400 p-4 rounded-lg shadow-md w-full sm:w-1/3 bg-white"
      >
        <h1 class="text-xl font-semibold text-pink-600">Work done:</h1>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Time -->
          <div>
            <label class="block font-medium text-gray-700">Time</label>
            <input
              type="time"
              class="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <!-- Service Performed -->
          <div>
            <label class="block font-medium text-gray-700"
              >Service Performed</label
            >
            <input
              type="text"
              class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>

          <!-- Price -->
          <div>
            <label class="block font-medium text-gray-700"
              >Price Charged (KES)</label
            >
            <input
              type="number"
              class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600"
          >
            Save Entry
          </button>
        </form>
      </div>
      <!--Staff overview-->
      <div
        class="space-y-4 w-full sm:w-2/3 border border-pink-400 rounded-xl shadow-md p-4 text-pink-600"
      >
        <div>
          <p class="text-3xl font-semibold">Welcome, Jane Doe</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-10">
          <!--Calender-->
          <div class="col-span-1">
            <smallCalender />
          </div>

          <!--Details-->
          <div class="col-span-1 flex flex-col gap-3">
            <h1 class="text-xl font-semibold">This weeks data:</h1>
            <div class="space-y-3">
              <p class="font-semibold text-gray-700">Total Earned</p>
              <p class="text-black text-xl font-medium">KES 10,000</p>
            </div>

            <div class="space-y-3">
              <p class="font-semibold text-gray-700">Total Commision Earned</p>
              <p class="text-black text-xl font-medium">KES 10,000</p>
            </div>
          </div>
        </div>
      </div>
    </section>

      <!--Work done details Table-->
      <div class="space-y-4">
          <h1 class="text-xl font-semibold text-pink-600">Work Record:</h1>
       <div class="bg-white border border-pink-400 rounded-xl md:overflow-hidden overflow-x-scroll">   
        <table class="min-w-full divide-y divide-pink-400">
          <thead class="bg-gray-50">
            <tr>              
              <th
                scope="col"
                class="px-6 py-3 text-left font-medium text-gray-500 capitalize tracking-wider"
              >
                Date 
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left font-medium text-gray-500 capitalize tracking-wider"
              >
                Time
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left font-medium text-gray-500 capitalize tracking-wider"
              >
                Service
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left font-medium text-gray-500 capitalize tracking-wider"
              >
                Price Charged
              </th>              
            </tr>
          </thead>
  
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Dynamic rows -->
            <tr v-for="item in servicesData" :key="item.id">             
              <td class="px-6 py-4 whitespace-nowrap text-sm w-1/4">
                <p>{{ item.date }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm w-1/4">
                <p>{{ item.time }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm w-1/4">
                <p>{{ item.service }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm w-1/4">
                <p>{{ item.price }}</p>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
      </div>

  </section>
</template>

<script setup>
import Header from "~/components/Header.vue";
import smallCalender from "~/components/smallCalender.vue";

import { ref, reactive } from "vue";

const form = ref({
  time: "",
  service: "",
  price: null,
});

const servicesData = reactive([
  {
    date: "12/11/2024",
    time: '12:00 AM',
    service: 'manicure',
    price: 'KES 1000'
  },
   {
    date: "12/11/2024",
    time: '12:00 AM',
    service: 'manicure',
    price: 'KES 1000'
  },
   {
    date: "12/11/2024",
    time: '12:00 AM',
    service: 'manicure',
    price: 'KES 1000'
  },
   {
    date: "12/11/2024",
    time: '12:00 AM',
    service: 'manicure',
    price: 'KES 1000'
  },
   {
    date: "12/11/2024",
    time: '12:00 AM',
    service: 'manicure',
    price: 'KES 1000'
  },
])

const handleSubmit = () => {
  console.log("Submitted:", form.value);
  // Here you’d send it to backend (API call)
};
</script>
