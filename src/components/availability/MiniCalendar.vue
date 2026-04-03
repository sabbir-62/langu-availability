<template>
  <div class="rounded-xl p-3 sm:p-4 bg-sidebar" :class="compact ? 'mb-0' : 'mb-3'">
    <h3 class="text-white font-bold text-sm text-center mb-2 sm:mb-3 font-poppins">
      {{ monthName }} {{ year }}
    </h3>

    <div class="grid grid-cols-7 gap-0.5 sm:gap-1 text-center">
      <!-- Day headers -->
      <div v-for="dh in dayHeaders" :key="dh"
           class="text-gray-400 text-[10px] sm:text-xs font-semibold pb-1">
        {{ dh }}
      </div>

      <!-- Day cells -->
      <div v-for="(cell, ci) in cells" :key="ci"
           class="relative flex items-center justify-center"
           :style="{ height: compact ? '26px' : '28px' }">
        <template v-if="cell.day">
          <div v-if="cell.status"
               class="rounded-full flex items-center justify-center text-white font-bold relative cursor-pointer transition-transform hover:scale-110"
               :class="[
                 statusClass(cell.status),
                 compact ? 'w-6 h-6 text-[10px]' : 'w-7 h-7 text-xs',
               ]"
               @click="$emit('jumpTo', cell.fullDate)">
            {{ cell.day }}
            <template v-if="cell.hasBooking">
              <span class="absolute bg-red-500 text-white border-2 border-sidebar rounded-full flex items-center justify-center font-bold"
                    style="width: 13px; height: 13px; font-size: 6px; top: -3px; left: -3px;">S</span>
              <span class="absolute bg-purple-600 text-white border-2 border-sidebar rounded-full flex items-center justify-center font-bold"
                    style="width: 13px; height: 13px; font-size: 6px; top: -3px; right: -3px;">T</span>
            </template>
          </div>
          <span v-else class="text-gray-500 text-[10px] sm:text-xs">{{ cell.day }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DAY_HEADERS } from '@/constants'

defineProps({
  monthName: { type: String, required: true },
  year: { type: Number, required: true },
  cells: { type: Array, required: true },
  compact: { type: Boolean, default: false },
})

defineEmits(['jumpTo'])

const dayHeaders = DAY_HEADERS

function statusClass(status) {
  return {
    full: 'cal-full',
    some: 'cal-some',
    booked: 'cal-booked',
  }[status] || ''
}
</script>
