<template>
  <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
    <p class="text-sm font-bold text-text-main mb-3 sm:mb-2">
      Add available time slots for {{ shortDate }}:
    </p>

    <!-- Time Pickers Row -->
    <div class="flex flex-wrap items-end gap-3 sm:gap-4 mb-4 sm:mb-5">
      <div>
        <label class="text-xs font-semibold text-text-main block mb-1"
          >From:</label
        >
        <div class="relative">
          <select
            v-model="fromTime"
            class="appearance-none border border-gray-200 rounded-full px-4 pr-10 py-2 text-sm font-semibold focus:border-primary-teal focus:outline-none bg-white shadow-lg"
          >
            <option v-for="t in timeOptions" :key="'f' + t" :value="t">
              {{ t }}
            </option>
          </select>

          <!-- Custom arrow -->
          <div
            class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <label class="text-xs font-semibold text-text-main block mb-1"
          >To:</label
        >
        <div class="relative">
          <select
            v-model="toTime"
            class="appearance-none border border-gray-200 rounded-full px-4 pr-10 py-2 text-sm font-semibold focus:border-primary-teal focus:outline-none bg-white shadow-lg"
          >
            <option v-for="t in timeOptions" :key="'t' + t" :value="t">
              {{ t }}
            </option>
          </select>

          <!-- Custom arrow -->
          <div
            class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <button
        @click="handleAdd"
        class="btn-add text-white px-5 sm:px-6 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-1.5"
      >
        <span class="text-lg leading-none">+</span> Add slots
      </button>
    </div>

    <!-- Slot Pills -->
    <div class="flex flex-wrap gap-1.5 sm:gap-2 min-h-[36px]">
      <p v-if="slots.length === 0" class="text-sm text-gray-400 italic">
        No slots added yet. Add your available times above.
      </p>
      <SlotPill
        v-for="(slot, idx) in slots"
        :key="slot.id"
        :slot="slot"
        :index="idx"
        @remove="(id) => $emit('removeSlot', id)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { formatShortDate, generateTimeOptions } from "@/utils/dateHelpers";
import SlotPill from "./SlotPill.vue";

const props = defineProps({
  date: { type: Date, required: true },
  slots: { type: Array, default: () => [] },
});

const emit = defineEmits(["addSlot", "removeSlot"]);

const fromTime = ref("07:00");
const toTime = ref("07:30");
const timeOptions = generateTimeOptions();
const shortDate = computed(() => formatShortDate(props.date));

function handleAdd() {
  emit("addSlot", { from: fromTime.value, to: toTime.value });
}
</script>
