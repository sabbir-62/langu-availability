<template>
  <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
      <p class="text-sm font-bold text-text-main">
        Next, copy the availability above to the selected dates below:
      </p>
      <button @click="handleCopy"
              class="btn-copy text-white px-5 sm:px-6 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 self-end sm:self-auto"
              :class="{ 'opacity-50 cursor-not-allowed': selectedKeys.length === 0 }"
              :disabled="selectedKeys.length === 0">
        📋 Copy slots
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto -mx-2 sm:mx-0">
      <table class="w-full min-w-[360px]">
        <thead>
          <tr class="border-b border-gray-200">
            <th class="py-2 px-1 text-left"></th>
            <th v-for="w in visibleWeeks" :key="'wh' + w"
                class="py-2 px-1 text-center text-xs font-bold text-text-muted">
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dayIdx in 7" :key="dayIdx"
              class="border-b border-gray-100 last:border-0">
            <td class="py-1.5 px-1 sm:px-2 text-xs sm:text-sm font-bold italic text-text-main min-w-[70px] sm:min-w-[90px]">
              {{ dayNames[dayIdx - 1] }}
            </td>
            <td v-for="weekIdx in visibleWeeks" :key="'d' + dayIdx + 'w' + weekIdx"
                class="py-1.5 px-1 text-center">
              <span v-if="getCellDate(dayIdx - 1, weekIdx - 1)"
                    @click="toggleDate(getCellDate(dayIdx - 1, weekIdx - 1))"
                    class="date-cell text-xs sm:text-sm"
                    :class="{
                      selected: isSelected(getCellDate(dayIdx - 1, weekIdx - 1)),
                      'text-green-600 font-bold': dateHasSlots(getCellDate(dayIdx - 1, weekIdx - 1)),
                      'text-gray-600': !dateHasSlots(getCellDate(dayIdx - 1, weekIdx - 1)),
                    }">
                {{ formatCell(getCellDate(dayIdx - 1, weekIdx - 1)) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { DAY_NAMES, WEEKS_TO_SHOW, WEEKS_TO_SHOW_MOBILE } from '@/constants'
import { getWeekStart, formatCopyDate, dateKey } from '@/utils/dateHelpers'

const props = defineProps({
  date: { type: Date, required: true },
  hasSlotsFn: { type: Function, required: true },
})

const emit = defineEmits(['copy'])

const dayNames = DAY_NAMES
const selectedKeys = ref([])
const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth < 640
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const visibleWeeks = computed(() => isMobile.value ? WEEKS_TO_SHOW_MOBILE : WEEKS_TO_SHOW)

function getCellDate(dayIdx, weekIdx) {
  const weekStart = getWeekStart(props.date)
  const d = new Date(weekStart)
  d.setDate(d.getDate() + weekIdx * 7 + dayIdx)
  return d
}

function formatCell(d) {
  return formatCopyDate(d)
}

function dateHasSlots(d) {
  return props.hasSlotsFn(d)
}

function isSelected(d) {
  return selectedKeys.value.includes(dateKey(d))
}

function toggleDate(d) {
  const key = dateKey(d)
  const idx = selectedKeys.value.indexOf(key)
  if (idx === -1) selectedKeys.value.push(key)
  else selectedKeys.value.splice(idx, 1)
}

function handleCopy() {
  if (selectedKeys.value.length === 0) return
  emit('copy', [...selectedKeys.value])
  selectedKeys.value = []
}
</script>
