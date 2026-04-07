<template>
  <div class="hidden lg:block w-64 flex-shrink-0">
    <ColorKeyInfo />
    <div class="overflow-y-auto">
      <MiniCalendar
        v-for="cal in calendars"
        :key="cal.key"
        :month-name="cal.monthName"
        :year="cal.year"
        :cells="cal.cells"
        :slot-status-class-fn="slotStatusClassFn"
        @jump-to="(d) => $emit('jumpTo', d)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { MONTH_NAMES } from '@/constants'
import { buildCalendarCells } from '@/utils/dateHelpers'
import ColorKeyInfo from './ColorKeyInfo.vue'
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
