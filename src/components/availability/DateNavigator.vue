<template>
  <div class="flex items-center justify-between mb-4 sm:mb-6 gap-2 border border-gray-200 rounded-full px-2 md:px-8 bg-white shadow-md">
    <button @click="$emit('prev')"
            class="text-xs sm:text-sm text-gray-500 hover:text-gray-700 font-semibold transition-colors whitespace-nowrap">
      &lt;&lt; Previous day
    </button>

    <div class="btn-date px-4 sm:px-8 py-2 rounded-[16px] text-white font-bold text-xs sm:text-md shadow-md flex justify-center items-center h-[40px] md:h-[51px] md:w-[320px]"
         style="text-shadow: 0 1px 2px rgba(0,0,0,0.2);">
      {{ displayDate }}
    </div>

    <button @click="$emit('next')"
            class="text-xs sm:text-sm text-gray-500 hover:text-gray-700 font-semibold transition-colors whitespace-nowrap">
      Next day &gt;&gt;
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatDisplayDate } from '@/utils/dateHelpers'

const props = defineProps({
  date: { type: Date, required: true },
})

defineEmits(['prev', 'next'])

const displayDate = computed(() => formatDisplayDate(props.date))
</script>
