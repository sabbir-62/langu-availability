<template>
  <div class="lg:hidden mb-4 -mx-3 px-3 overflow-x-auto scroll-smooth"
       style="-webkit-overflow-scrolling: touch; scrollbar-width: none;">
    <div class="flex gap-3" :style="{ width: calendars.length * 280 + 'px' }">
      <div v-for="cal in calendars" :key="cal.key" class="w-[268px] flex-shrink-0">
        <MiniCalendar
          :month-name="cal.monthName"
          :year="cal.year"
          :cells="cal.cells"
          :compact="true"
          @jump-to="(d) => $emit('jumpTo', d)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { MONTH_NAMES } from '@/constants'
import { buildCalendarCells } from '@/utils/dateHelpers'
import MiniCalendar from './MiniCalendar.vue'

const props = defineProps({
  date: { type: Date, required: true },
  slotStore: { type: Object, required: true },
})

defineEmits(['jumpTo'])

const calendars = computed(() => {
  const result = []
  for (let m = 0; m < 4; m++) {
    const d = new Date(props.date.getFullYear(), props.date.getMonth() + m, 1)
    const year = d.getFullYear()
    const month = d.getMonth()
    result.push({
      key: `${year}-${month}`,
      monthName: MONTH_NAMES[month],
      year,
      cells: buildCalendarCells(year, month, props.slotStore),
    })
  }
  return result
})
</script>

<style scoped>
div::-webkit-scrollbar {
  display: none;
}
</style>
