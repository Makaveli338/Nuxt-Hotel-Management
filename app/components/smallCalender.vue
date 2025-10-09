<template>
  <div class="p-4 border rounded-lg shadow-md w-[300px]">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <button
        @click="prevMonth"
        class="px-3 py-1 hover:bg-gray-200 rounded-full"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="#667085"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="font-semibold text-gray-700">
        {{ currentDate.toLocaleString("default", { month: "long" }) }}
        {{ currentDate.getFullYear() }}
      </div>
      <button
        @click="nextMonth"
        class="px-3 py-1 hover:bg-gray-200 rounded-full"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 15L12.5 10L7.5 5"
            stroke="#667085"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <!-- Weekdays -->
    <div class="grid grid-cols-7 text-center text-sm text-gray-600 mb-2">
      <div v-for="day in weekdays" :key="day">{{ day }}</div>
    </div>

    <!-- Days -->
    <div class="grid grid-cols-7 text-center gap-1">
      <div v-for="n in firstDayOfWeek" :key="'empty-' + n"></div>

      <button
        v-for="day in daysInMonth"
        :key="day"
        @click="selectDate(day)"
        class="w-8 h-8 flex items-center justify-center rounded-full transition-colors text-sm"
        :class="dayClass(day)"
      >
        {{ day }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useUserStore } from "../../stores/user";


const today = new Date();
const currentDate = ref(new Date(today.getFullYear(), today.getMonth(), 1));
const selectedDate = ref(null);
const userStore = useUserStore()
const workedDates = ref([]);
const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const emit = defineEmits(["date-selected"]);


// Watch userStore to fetch worked dates once user is available
watch(
  () => userStore.user,
  async (newUser) => {
    if (newUser?.id) {
      try {
        const res = await $fetch('/api/dates', {
          params: { userId: newUser.id }
        });
        // Assume API returns array of "YYYY-MM-DD" strings
        workedDates.value = res;
        console.log("Worked dates:", workedDates.value);
      } catch (err) {
        console.error("Failed to fetch worked dates:", err);
      }
    }
  },
  { immediate: true } 
);

// Fetching the worked days
onMounted(async () => {
  const userStore = useUserStore()

  if (!userStore.user?.id) {
    return
  }

  try {
    const res = await $fetch('/api/dates', {
      params: { userId: userStore.user.id }
    })
    workedDates.value = res // array of "yyyy-mm-dd"
    console.log("Worked dates:", workedDates.value)
  } catch (err) {
    console.error("Failed to fetch worked dates:", err)
  }
})


const firstDayOfWeek = computed(() => {
  let firstDay = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    1
  );
  return (firstDay.getDay() + 6) % 7; // Monday-based
});

const daysInMonth = computed(() => {
  return new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    0
  ).getDate();
});

function prevMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
}

function nextMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
}

// Date selection
function selectDate(day) {
  const selected = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day
  );

  selectedDate.value = selected;
  console.log("Selected date:", selected.toISOString().slice(0, 10));

  // ✅ Emit the selected date to the parent component
  emit("date-selected", selected);
}

// Class for each day 
function dayClass(day) {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth() + 1; // JS months 0-based
  const dayStr = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

  const isToday =
    day === today.getDate() &&
    currentDate.value.getMonth() === today.getMonth() &&
    year === today.getFullYear();

  const isSelected =
    selectedDate.value &&
    day === selectedDate.value.getDate() &&
    currentDate.value.getMonth() === selectedDate.value.getMonth() &&
    year === selectedDate.value.getFullYear();

  // Priority: Today > Selected > Worked > Default
  if (isToday) return "bg-pink-500 text-white";
  if (isSelected) return "border border-pink-500 text-pink-500";
  if (workedDates.value.includes(dayStr)) return "text-pink-700 font-semibold"; // worked day

  return "text-gray-700 hover:bg-gray-200";
}


</script>
