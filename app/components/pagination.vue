<template>
  <nav v-if="total_pages >= 1">
    <div class="w-full flex flex-col sm:flex-row py-4 justify-end border-t border-gray-200 px-4 items-center">
      <!-- Rows per page -->
      <div v-if="!minimal" class="flex items-center gap-1">
        <p class="text-sm font-medium text-gray-500">Rows per page:</p>
        <select
          v-model="selectedPageSize"
          @change="emitNewValues(1, selectedPageSize)"
          class="block w-18 py-0 px-3 text-sm min-w-[70px] border-0 focus:outline-none focus:ring-0 sm:text-sm"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="30">30</option>
          <option :value="40">40</option>
        </select>
      </div>

      <!-- Showing counter -->
      <div v-if="!minimal" class="mx-6 mt-6 mb-1 sm:mb-0 sm:mt-0">
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ calcStartOfCurrent() }}</span>
          to
          <span class="font-medium">{{ calcEndOfCurrent() }}</span>
          of
          <span class="font-medium">{{ total_entries }}</span>
        </p>
      </div>

      <!-- Next & Previous page buttons -->
      <div class="flex items-center space-x-2">
        <button @click="emitNewValues(current_page - 1, selectedPageSize)" :disabled="disableBackBtn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor"
            :class="disableBackBtn ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900'"
            class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <input :value="current_page || 1" disabled
          class="w-10 text-center border-0 ring-0 truncate text-sm text-gray-600 py-0" />

        <button @click="emitNewValues(current_page + 1, selectedPageSize)" :disabled="disableNextBtn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor"
            :class="disableNextBtn ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900'"
            class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  current_page: Number,
  total_pages: Number,
  total_entries: Number,
  page_size: Number,
  minimal: { type: Boolean, default: false },
});

const emit = defineEmits(["payload"]);

const selectedPageSize = ref(props.page_size || 10);

watch(
  () => props.page_size,
  (newVal) => (selectedPageSize.value = newVal || 10),
  { immediate: true }
);

const disableBackBtn = computed(() => !props.current_page || props.current_page <= 1);
const disableNextBtn = computed(
  () => !(props.total_pages > 1 && props.current_page < props.total_pages)
);

const emitNewValues = (page, page_size) => {
  if (page < 1 || page > props.total_pages) return;
  emit("payload", { page, page_size });
};

const currentPageTotal = computed(() => props.current_page * props.page_size);

const calcStartOfCurrent = () => currentPageTotal.value - (props.page_size - 1);
const calcEndOfCurrent = () =>
  currentPageTotal.value <= props.total_entries
    ? currentPageTotal.value
    : props.total_entries;
</script>
