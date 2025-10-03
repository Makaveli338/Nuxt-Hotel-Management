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
import { ref, computed } from "vue";

const today = new Date();
const currentDate = ref(new Date(today.getFullYear(), today.getMonth(), 1));
const selectedDate = ref(null);

const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

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

function selectDate(day) {
  selectedDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day
  );
  console.log("Selected date:", selectedDate.value.toISOString().slice(0, 10));
}

function dayClass(day) {
  let year = currentDate.value.getFullYear();
  let month = currentDate.value.getMonth();

  const isToday =
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const isSelected =
    selectedDate.value &&
    day === selectedDate.value.getDate() &&
    month === selectedDate.value.getMonth() &&
    year === selectedDate.value.getFullYear();

  if (isSelected) return "border border-pink-500 text-pink-500";
  if (isToday) return "bg-pink-500 text-white";
  return "text-gray-700 hover:bg-gray-200";
}
</script>
