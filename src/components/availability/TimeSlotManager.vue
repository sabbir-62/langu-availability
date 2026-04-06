<template>
  <div class="rounded-xl mt-4 md:mt-8">
    <p class="text-xs md:text-lg font-bold text-text-main mb-4 sm:mb-1">
      Add available time slots for {{ shortDate }}:
    </p>

    <!-- Time Pickers Row -->
    <div class="flex justify-between sm:justify-start gap-1 sm:gap-8 items-end ">
      <div class="flex gap-1 md:gap-8 ">
        <div>
          <label
            class="text-xs md:text-base font-normal text-text-main block mb-1"
            >From:</label
          >
          <div
            class="relative flex justify-center align-center h-9 md:h-10 w-28 md:w-32 border bg-white font-bold rounded-full shadow-lg overflow-hidden"
          >
            <select
              v-model="fromTime"
              class="appearance-none px-4 pr-8 py-2 text-xs md:text-sm font-bold focus:border-primary-teal focus:outline-none"
            >
              <option v-for="t in timeOptions" :key="'f' + t" :value="t">
                {{ t }}
              </option>
            </select>

            <!-- Custom arrow -->
            <div
              class="pointer-events-none absolute inset-y-0 right-5 md:right-6 flex items-center text-gray-500"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label
            class="text-xs md:text-base font-normal text-text-main block mb-1"
            >To:</label
          >
          <div
            class="relative flex justify-center align-center h-9 md:h-10 w-28 md:w-32 border bg-white font-bold rounded-full shadow-lg overflow-hidden"
          >
            <select
              v-model="toTime"
              class="appearance-none px-4 pr-8 py-2 text-xs md:text-sm font-bold focus:border-primary-teal focus:outline-none"
            >
              <option v-for="t in timeOptions" :key="'t' + t" :value="t">
                {{ t }}
              </option>
            </select>

            <!-- Custom arrow -->
            <div
              class="pointer-events-none absolute inset-y-0 right-5 md:right-6 flex items-center text-gray-500"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <button
        @click="handleAdd"
        class="btn-date text-white px-5 md:px-8 h-9 md:h-10 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-1.5"
      >
        <img
          src="../../assets//images/addButton.png"
          alt="Calendar Icon"
          class="w-[12px] h-[12px] md:w-[14px] md:h-[14px]"
        />
        Add slots
      </button>
    </div>

    <!-- Slot Pills -->
    <div class="mt-4 md:mt-6">
      <p
        v-if="slots.length === 0"
        class="text-xs md:text-sm text-gray-400 italic"
      >
        No slots added yet. Add your available times above.
      </p>
      <div
        class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3"
      >
        <SlotPill
          v-for="(slot, idx) in slots"
          :key="slot.id"
          :slot="slot"
          :index="idx"
          @remove="(id) => $emit('removeSlot', id)"
        />
      </div>
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
const isMine = ref(false);
const timeOptions = generateTimeOptions();
const shortDate = computed(() => formatShortDate(props.date));

function handleAdd() {
  emit("addSlot", { from: fromTime.value, to: toTime.value, isMine: true });
}
</script>
