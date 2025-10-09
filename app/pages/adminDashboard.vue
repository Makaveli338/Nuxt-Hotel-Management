<template>
  <Header />
  <section class="p-6 flex flex-col gap-6">
    <!--Overview-->
    <div class="border border-pink-400 rounded-xl shadow-md p-4 text-pink-600">
      <p class="text-3xl font-semibold mb-4">Overview</p>
      <!-- Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- Total Revenue -->
        <div
          class="flex items-center gap-4 p-6 border border-pink-300 rounded-xl shadow-md bg-white"
        >
          <div class="p-3 bg-pink-100 rounded-full">
            <!-- Money Icon -->
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
                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
              />
            </svg>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Total Revenue</p>
            <p class="text-2xl font-semibold text-pink-600"> KES {{ totals.today.totalEarned?.toLocaleString() || 0 }}</p>
          </div>
        </div>

        <!-- Total Clients Served -->
        <div
          class="flex items-center gap-4 p-6 border border-pink-300 rounded-xl shadow-md bg-white"
        >
          <div class="p-3 bg-pink-100 rounded-full">
            <!-- Users Icon -->
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
          <div>
            <p class="text-gray-500 text-sm">Clients Served</p>
            <p class="text-2xl font-semibold text-pink-600">{{ totalServices }}</p>
          </div>
        </div>

        <!-- Top Performing Staff -->
        <div
          class="flex items-center gap-4 p-6 border border-pink-300 rounded-xl shadow-md bg-white"
        >
          <div class="p-3 bg-pink-100 rounded-full">
            <!-- Star Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-pink-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.08 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.516-4.674z"
              />
            </svg>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Top Staff</p>
            <p class="text-2xl font-semibold text-pink-600">  {{ topStaff.name }} ({{ topStaff.services }} services)</p>
          </div>
        </div>

        <!-- Total Commission -->
        <div
          class="flex items-center gap-4 p-6 border border-pink-300 rounded-xl shadow-md bg-white"
        >
          <div class="p-3 bg-pink-100 rounded-full">
            <!-- Commission Icon -->
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
                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
              />
            </svg>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Total Commission</p>
            <p class="text-2xl font-semibold text-pink-600">  KES {{ totals.today.totalCommission?.toLocaleString() || 0 }}</p>
          </div>
        </div>
      </div>
    </div>

    <!--Line graph-->
    <div
      class="border border-pink-400 rounded-xl shadow-md p-6 flex flex-col gap-4"
    >
      <div class="flex justify-between">
        <h1 class="text-xl font-semibold text-pink-600">Revenue Overview</h1>

        <!-- Toggle Button -->
        <div
          class="relative flex items-center mb-4 border border-pink-600 rounded overflow-hidden"
        >
          <!-- Animated slider background -->
          <div
            class="absolute top-0 left-0 h-full w-1/2 bg-pink-600 transition-transform duration-300"
            :style="{
              transform:
                currentView === 'monthly'
                  ? 'translateX(0%)'
                  : 'translateX(100%)',
            }"
          ></div>

          <!-- Monthly Button -->
          <button
            class="flex-1 px-4 py-2 text-center font-medium relative z-10 transition-colors duration-300"
            :class="currentView === 'monthly' ? 'text-white' : 'text-pink-600'"
            @click="currentView = 'monthly'"
          >
            Monthly
          </button>

          <!-- Weekly Button -->
          <button
            class="flex-1 px-4 py-2 text-center font-medium relative z-10 transition-colors duration-300"
            :class="currentView === 'weekly' ? 'text-white' : 'text-pink-600'"
            @click="currentView = 'weekly'"
          >
            Weekly
          </button>
        </div>
      </div>

      <div ref="chartContainer"></div>
    </div>

    <!--Bottom data tables-->
    <div class="w-full gap-6 flex sm:flex-row flex-col">
      <!--Staff work records table-->
      <div class="space-y-4 w-full sm:w-[50%]">
        <h1 class="text-xl font-semibold text-pink-600">
          Work Records as per staff:
        </h1>
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
                  Staff Name
                </th>
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
                  class="px-6 py-3 text-left font-medium text-gray-500 capitalize tracking-wider whitespace-nowrap"
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
              <tr v-for="(service, index) in servicesData" :key="index">
                <td class="px-6 py-4 whitespace-nowrap text-sm w-1/4">
                  <p>{{ service.user }}</p>
                </td>
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
        </div>
      </div>

      <!--Staff Perfomance summary-->
      <div class="space-y-4 w-full sm:w-[50%]">
        <h1 class="text-xl font-semibold text-pink-600">
          Staff Perfomance Summary:
        </h1>
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
                  Staff Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left font-medium text-gray-500 capitalize tracking-wider"
                >
                  Total Revenue Earned
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left font-medium text-gray-500 capitalize tracking-wider"
                >
                  Total Commision Earned
                </th>
              </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200">
              <!-- Dynamic rows -->
              <tr v-for="(row, index) in summaryData" :key="index">
                <td class="px-6 py-4 whitespace-nowrap text-sm w-1/4">
                  <p>{{ row.name }}</p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm w-1/4">
                  <p>{{ row.revenue }}</p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm w-1/4">
                  <p>{{ row.commision }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Header from "~/components/Header.vue";
import { ref, watch, onMounted, computed } from "vue";
import Highcharts from "highcharts";
import { useUserStore } from "../../stores/user";

const userStore = useUserStore();
const servicesData = ref([])
const chartContainer = ref(null);
const chartInstance = ref(null);
const currentView = ref("monthly");
const totalServices = ref(0)
const topStaff = ref({ name: 'N/A', services: 0 })

// Load user first
userStore.loadUser();

const totals = ref({
  today: { totalEarned: 0, totalCommission: 0 },
  week: { totalEarned: 0, totalCommission: 0 },
});

const summaryData = ref([]);
const stats_by_month = ref([]);
const stats_by_week = ref([]);


// Function to load the summary data
onMounted(async () => {
  try {
    const res = await $fetch("/api/admin/summary");

    summaryData.value = res.staffSummary.map((s) => ({
      name: s.name,
      revenue: `KES ${s.revenue}`,
      commision: `KES ${s.commission}`,
    }));

    stats_by_month.value = res.statsByMonth.map((m) => ({
      month: m.month,
      revenue: Number(m.revenue),
    }));

    stats_by_week.value = res.statsByWeek.map((w) => ({
      week: `Week ${w.week}`,
      revenue: Number(w.revenue),
    }));

    console.log("✅ Summary loaded:", summaryData.value);
    console.log("📊 Monthly stats:", stats_by_month.value);
    console.log("📈 Weekly stats:", stats_by_week.value);
  } catch (err) {
    console.error("Failed to load summary:", err);
  }
});

// Function to create/update chart
const renderChart = () => {
  const data =
    currentView.value === "monthly"
      ? stats_by_month.value
      : stats_by_week.value;

  const categories =
    currentView.value === "monthly"
      ? data.map((stat) => stat.month || "")
      : data.map((stat) => stat.week || "");

  const options = {
    chart: {
      type: "line",
      height: 300,
    },
    title: {
      text:
        currentView.value === "monthly"
          ? "Monthly Revenue Overview"
          : "Weekly Revenue Overview",
    },
    xAxis: {
      categories,
      title: {
        text: currentView.value === "monthly" ? "Month" : "Week",
      },
      gridLineColor: "#e6e6e6",
      gridLineDashStyle: "dash",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Revenue",
      },
      labels: {
        format: "KES {value}",
      },
      gridLineColor: "#e6e6e6",
      gridLineDashStyle: "dash",
      max:
        data.reduce(
          (acc, { revenue }) => Math.max(acc, parseFloat(revenue) || 0),
          0
        ) + 100,
    },
    tooltip: {
      valuePrefix: "KES ",
      shared: true,
    },
    plotOptions: {
      series: {
        marker: {
          enabled: true,
        },
        lineWidth: 2,
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Revenue",
        data: data.map((stat) => parseFloat(stat.revenue) || 0),
        color: "#db2777", // pink-600
      },
    ],
  };

  if (chartInstance.value) {
    chartInstance.value.update(options, true);
  } else if (chartContainer.value) {
    chartInstance.value = Highcharts.chart(chartContainer.value, options);
  }
};

// Render chart on mount
onMounted(() => {
  renderChart();
  window.addEventListener("resize", () => chartInstance.value?.reflow());
});

// Watch for changes in currentView or data
watch(
  [currentView, stats_by_month, stats_by_week],
  () => {
    renderChart();
     window.removeEventListener("resize", () => chartInstance.value?.reflow());
  },
  { deep: true }
);


//  Watch to fetch totals and services
watch(
  () => userStore.user,
  async (newUser) => {

      if (!newUser || !newUser.role) {
      console.warn("User not loaded yet, skipping service fetch.", newUser);
      return;
    }

    console.log("✅ User loaded:", newUser);   

    try {
      const res = await $fetch("/api/services", {
        params: { role: newUser.role }, // no userId for admin
      });

      // ✅ Update services table
      servicesData.value = res.services
        .filter((s) => s && s.service_date)
        .map((s) => ({
          date: s.service_date
            ? new Date(s.service_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "N/A",
          time: s.service_time || "N/A",
          service: s.service_name || "N/A",
          price: s.price ? `KES ${s.price}` : "KES 0",
          user: s.username || "Unknown",
          commisionearned: s.commission ? `KES ${s.commission}` : "KES 0",
        }));

      // ✅ Update totals
      totals.value.today = res.totals.today;
      totals.value.week = res.totals.week;

      // ✅ Add total service count and top staff
      totalServices.value = res.totalServices || 0;
      topStaff.value = res.topStaff || { name: "N/A", services: 0 };

      // 🧠 Debug logs
      console.log("✅ Admin totals:", totals.value);
      console.log("✅ Total services:", totalServices.value);
      console.log("✅ Top staff:", topStaff.value);
    } catch (err) {
      console.error("❌ Failed to fetch services:", err);
    }
  },
  { immediate: true } // runs immediately if user already loaded
);




</script>
