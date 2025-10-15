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
              v-model="service_time"
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
              v-model="service_name"
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
              v-model="price"
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
          <p class="text-3xl font-semibold">
            Welcome, {{ auth.user?.username || "Guest" }}
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-10">
          <!--Calender-->
          <div>
            <smallCalender
              :selectedDate="selectedDate"
              @date-selected="selectedDate = $event"
            />
          </div>

          <!--Weekly Details-->
          <div class="flex flex-col gap-3">
            <h1 class="text-xl font-semibold">This weeks data:</h1>
            <div class="space-y-3">
              <p class="font-semibold text-gray-700">Total Earned</p>
              <p class="text-black text-xl font-medium">
                KES {{ totals.week.totalEarned }}
              </p>
            </div>

            <div class="space-y-3">
              <p class="font-semibold text-gray-700">Total Commision Earned</p>
              <p class="text-black text-xl font-medium">
                KES {{ totals.week.totalCommission }}
              </p>
            </div>
          </div>

          <!-- Daily Details -->
          <div class="flex flex-col gap-3">
            <h1 class="text-xl font-semibold">
              {{
                selectedDate
                  ? `Selected Day's data (${selectedDate.toLocaleDateString(
                      "en-GB",
                      { day: "2-digit", month: "short", year: "numeric" }
                    )}):`
                  : "Today's data:"
              }}
            </h1>

            <div class="space-y-3">
              <p class="font-semibold text-gray-700">Total Earned</p>
              <p class="text-black text-xl font-medium">
                KES {{ displayedTotals.totalEarned || 0 }}
              </p>
            </div>

            <div class="space-y-3">
              <p class="font-semibold text-gray-700">Total Commission Earned</p>
              <p class="text-black text-xl font-medium">
                KES {{ displayedTotals.totalCommission || 0 }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--Work done details Table-->
    <div class="space-y-4">
      <h1 class="text-xl font-semibold text-pink-600">Work Record:</h1>
      <div
        class="bg-white border border-pink-400 rounded-xl md:overflow-hidden overflow-x-scroll"
      >
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
              <th
                scope="col"
                class="px-6 py-3 text-left font-medium text-gray-500 capitalize tracking-wider whitespace-nowrap"
              >
                Commision Earned
              </th>
            </tr>
          </thead>

          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Dynamic rows -->
            <tr v-for="(service, index) in paginatedServices" :key="index">
              <td class="px-6 py-4 whitespace-nowrap text-sm w-1/4">
                <p>{{ service.date }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm w-1/4">
                <p>{{ service.time }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm w-1/4">
                <p>{{ service.service }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm w-1/4">
                <p>{{ service.price }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm w-1/4">
                <p>{{ service.commisionearned }}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Pagination -->
     <PaginationNavigation
  :current_page="currentServicePage"
  :page_size="itemsPerPage"
  :total_entries="servicesData.length"
  :total_pages="Math.ceil(servicesData.length / itemsPerPage)"
  @payload="onServicePageChange"
/>

      </div>
    </div>
  </section>
</template>

<script setup>
import Header from "~/components/Header.vue";
import smallCalender from "~/components/smallCalender.vue";
import { ref, reactive, watch, computed, onMounted } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useUserStore } from "../../stores/user";
import PaginationNavigation from "~/components/pagination.vue";


const auth = useAuthStore();
const userStore = useUserStore();

const service_time = ref("");
const service_name = ref("");
const price = ref("");
const servicesData = ref([]);
const loading = ref(true);
const error = ref("");
const selectedDate = ref(null);
const currentServicePage = ref(1);
const itemsPerPage = ref(5);


const onServicePageChange = ({ page, page_size }) => {
  currentServicePage.value = page;
  itemsPerPage.value = page_size;
};

const paginatedServices = computed(() => {
  const start = (currentServicePage.value - 1) * itemsPerPage.value;
  return servicesData.value.slice(start, start + itemsPerPage.value);
});


// ✅ Initialize totals with structure
const totals = ref({
  today: {},
  week: {},
  selectedDay: null,
});

// ✅ Show today’s totals by default, selected day when user clicks
const displayedTotals = computed(() => {
  if (selectedDate.value && totals.value.selectedDay) {
    return totals.value.selectedDay;
  }
  return totals.value.today;
});

onMounted(async () => {
  userStore.loadUser();
  if (!userStore.user?.id) return;
  await fetchServicesForDate();
});

//  Watch for calendar date selection
watch(selectedDate, async (newDate) => {
  if (!newDate) return;
  await fetchServicesForDate(newDate);
});

watch(selectedDate, (newVal) => {
  console.log(" Selected date changed to:", newVal);
});

//  Fetch data (today or specific date)
async function fetchServicesForDate(date = null) {
  if (!userStore.user?.id) return;

  try {
    const params = { userId: userStore.user.id };
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      params.date = `${year}-${month}-${day}`;
      date;
    }

    const res = await $fetch("/api/services", { params });

    if (date) {
      totals.value.selectedDay = res.totals?.today || res.totals;
      console.log(
        "📤 Fetching services for date:",
        date ? date.toISOString().slice(0, 10) : "TODAY"
      );
    } else {
      totals.value.today = res.totals?.today || res.totals;
      totals.value.week = res.totals?.week || {};
      console.log("✅ Totals assigned:", totals.value);
    }

    servicesData.value = res.services.map((s) => ({
      date: new Date(s.service_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: s.service_time,
      service: s.service_name,
      price: `KES ${s.price}`,
      user: s.username,
      commisionearned: `KES ${s.commission}`,
    }));
  } catch (err) {
    console.error("Failed to fetch services:", err);
  }
}

// ✅ Create a new service
const handleSubmit = async () => {
  if (!userStore.user) {
    alert("Please log in first.");
    return;
  }

  try {
    const payload = {
      user_id: userStore.user.id,
      service_name: service_name.value,
      price: price.value,
      service_time: service_time.value,
    };

    const response = await $fetch("/api/services", {
      method: "POST",
      body: payload,
    });

    console.log("✅ Service saved:", response);
    alert("Service entry saved successfully!");

    // Clear form
    service_time.value = "";
    service_name.value = "";
    price.value = "";

    // Refresh data for current day
    await fetchServicesForDate(selectedDate.value || null);
  } catch (err) {
    console.error("❌ Failed to save service:", err);
    alert("Error saving service.");
  }
};

// ✅ Logout
function handleLogout() {
  auth.logout();
  console.log("[DASHBOARD] User logged out");
  navigateTo("/login", { replace: true });
}
</script>
