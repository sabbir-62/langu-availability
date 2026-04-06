<template>
  <div class="flex items-center justify-between  border border-gray-200 rounded-full px-2 md:px-6 bg-white shadow-sm h-9 md:h-10">
    <button @click="$emit('prev')"
            class="text-[10px] sm:text-sm text-[#757575] hover:text-gray-700 font-normal transition-colors whitespace-nowrap">
      &lt;&lt; Previous day
    </button>

    <div class="btn-date rounded-[16px] text-white font-bold text-xs md:text-lg shadow-md flex justify-center items-center h-[40px] w-[173px] md:h-[51px] md:w-[398px]"
         style="text-shadow: 0 1px 2px rgba(0,0,0,0.2);">
         <CalendarDaysIcon class="w-4 h-4 md:w-6 md:h-6 mr-1 md:mr-2" />
         <span>{{ displayDate }}</span>
    </div>

    <button @click="$emit('next')"
            class="text-[10px] sm:text-sm text-[#757575] hover:text-gray-700 font-normal transition-colors whitespace-nowrap">
      Next day &gt;&gt;
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatDisplayDate } from '@/utils/dateHelpers'
import { CalendarDaysIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  date: { type: Date, required: true },
})

defineEmits(['prev', 'next'])

const displayDate = computed(() => formatDisplayDate(props.date))
</script>
