<template>
  <div class="lg:hidden mb-4 -mx-3 px-3 overflow-x-auto scroll-smooth mt-5"
       style="-webkit-overflow-scrolling: touch; scrollbar-width: none;">
    <div class="flex gap-3" :style="{ width: calendars.length * 280 + 'px' }">
      <div v-for="cal in calendars" :key="cal.key" class="w-[268px] flex-shrink-0">
        <MiniCalendar
          :month-name="cal.monthName"
          :year="cal.year"
          :cells="cal.cells"
          :slot-status-class-fn="slotStatusClassFn"
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
  slotStatusClassFn: { type: Function, required: true },
})

defineEmits(['jumpTo'])

const calendars = computed(() => {
  return Array.from({ length: 4 }, (_, m) => {
    const d = new Date(props.date.getFullYear(), props.date.getMonth() + m, 1)

    return {
      key: `${d.getFullYear()}-${d.getMonth()}`,
      monthName: MONTH_NAMES[d.getMonth()],
      year: d.getFullYear(),
      cells: buildCalendarCells(
        d.getFullYear(),
        d.getMonth(),
        props.slotStore
      ),
    }
  })
})
</script>

<style scoped>
div::-webkit-scrollbar {
  display: none;
}
</style>
