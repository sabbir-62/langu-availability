<template>
  <div
    class="rounded-xl p-3 sm:p-4 bg-sidebar"
    :class="compact ? 'mb-0' : 'mb-3'"
  >
    <h3
      class="text-white font-bold text-sm text-center mb-2 sm:mb-3 font-poppins"
    >
      {{ monthName }} {{ year }}
    </h3>

    <div class="grid grid-cols-7 gap-0.5 sm:gap-1 text-center">
      <div
        v-for="dh in dayHeaders"
        :key="dh"
        class="text-gray-400 text-[10px] sm:text-xs font-semibold pb-1"
      >
        {{ dh }}
      </div>
      <div
        v-for="(cell, ci) in cells"
        :key="ci"
        class="relative flex items-center justify-center"
        :style="{ height: compact ? '26px' : '28px' }"
      >
        <template v-if="cell.day">
          <div
            v-if="isFutureOrToday(cell.fullDate)"
            class="rounded-full flex items-center justify-center text-white font-bold relative cursor-pointer transition-transform hover:scale-125"
            :class="[
              slotStatusClassFn ? slotStatusClassFn(cell.fullDate) : '',
              compact ? 'w-6 h-6 text-[10px]' : 'w-7 h-7 text-xs',
            ]"
            @click="$emit('jumpTo', cell.fullDate)"
          >
            {{ cell.day }}
          </div>
          <span
            v-else-if="isFutureOrToday(cell.fullDate)"
            class="text-[10px] sm:text-xs cursor-pointer text-white"
            @click="$emit('jumpTo', cell.fullDate)"
          >
            {{ cell.day }}
          </span>
          <span
            v-else
            class="text-[10px] sm:text-xs cursor-not-allowed text-gray-400"
          >
            {{ cell.day }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DAY_HEADERS } from "@/constants";

defineProps({
  monthName: String,
  year: Number,
  cells: Array,
  slotStatusClassFn: Function,
  compact: Boolean,
});

defineEmits(["jumpTo"]);

const dayHeaders = DAY_HEADERS;

function isFutureOrToday(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  return d >= today;
}
</script>
