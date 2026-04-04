<template>
  <div class="p-4 sm:p-6">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4"
    >
      <p class="text-lg font-bold text-text-main">
        Next, copy the availability above to the selected dates below:
      </p>
      <button
        @click="handleCopy"
        class="btn-date text-white px-5 sm:px-6 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 self-end sm:self-auto"
        :class="{ 'opacity-50 cursor-not-allowed': selectedKeys.length === 0 }"
        :disabled="selectedKeys.length === 0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path
            d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
          ></path>
        </svg>

        Copy slots
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto -mx-2 sm:mx-0 scrol-auto">
      <table class="w-[600px] md:w-full" v-for="mon in 3" :key="mon">
        <thead>
          <tr class="">
            <th class="py-2 px-1 text-left"></th>
            <th
              v-for="w in visibleWeeks"
              :key="'wh' + w"
              class="py-2 px-1 text-center text-xs font-bold text-text-muted"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dayIdx in 7" :key="dayIdx" class="scroll-auto w-full">
            <td
              class="py-1.5 px-1 sm:px-2 text-xs sm:text-sm font-bold italic text-text-main min-w-[70px] sm:min-w-[90px]"
            >
              {{ dayNames[dayIdx - 1] }}
            </td>
            <td
              v-for="weekIdx in visibleWeeks"
              :key="'d' + dayIdx + 'w' + weekIdx"
              class="py-1.5 px-1 text-center"
            >
              <div class="tooltip-wrap cursor-pointer w-full">
                <span
                  v-if="getCellDate(dayIdx - 1, weekIdx - 1, mon - 1) "
                  @click="
                    toggleDate(getCellDate(dayIdx - 1, weekIdx - 1, mon - 1))
                  "
                  class="text-xs sm:text-sm border border-1 flex justify-center items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] font-bold shadow-md cusror-pointer transition-all hover:shadow-md hover:scale-105"
                  :class="[
                    getCellDate(dayIdx - 1, weekIdx - 1, mon - 1).getDate() < new Date().getDate() && 'cursor-not-allowed text-gray-400',
                    dateHasSlots(getCellDate(dayIdx - 1, weekIdx - 1, mon - 1))
                      ? hasMineSlotsFn(
                          getCellDate(dayIdx - 1, weekIdx - 1, mon - 1),
                        )
                        ? 'slot-gradient-0 text-white'
                        : ' slot-gradient-1 text-white'
                      : ' text-text-muted',
                    isSelected(getCellDate(dayIdx - 1, weekIdx - 1, mon - 1)) &&
                      'selected text-white bg-gray-700',
                  ]"
                >
                  {{
                    formatCell(getCellDate(dayIdx - 1, weekIdx - 1, mon - 1))
                  }}
                </span>
                <span class="tooltip-text">{{ tooltipFor(getCellDate(dayIdx - 1, weekIdx - 1, mon - 1)) }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { DAY_NAMES, WEEKS_TO_SHOW, WEEKS_TO_SHOW_MOBILE } from "@/constants";
import { getWeekStart, formatCopyDate, dateKey } from "@/utils/dateHelpers";
import { formatTooltipDate } from "../../utils/dateHelpers";

const props = defineProps({
  date: { type: Date, required: true },
  hasSlotsFn: { type: Function, required: true },
  hasSlotCountFn: { type: Function, required: true },
  hasMineSlotsFn: { type: Function, required: true },
  slots: { type: Array, default: () => [] },
});

const emit = defineEmits(["copy", "jumpTo"]);

const dayNames = DAY_NAMES;
const selectedKeys = ref([]);
const isMobile = ref(false);

function checkMobile() {
  isMobile.value = window.innerWidth < 640;
}

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});
onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

const visibleWeeks = computed(() =>
  isMobile.value ? WEEKS_TO_SHOW_MOBILE : WEEKS_TO_SHOW,
);

function getCellDate(dayIdx, weekIdx, monthIdx) {
  const base = getWeekStart(props.date);
  const d = new Date(base);

  // 4 weeks per block (or 12 if you want strict 3 months)
  const offsetWeeks = monthIdx * 4;

  d.setDate(d.getDate() + (offsetWeeks + weekIdx) * 7 + dayIdx);
  return d;
}

function formatCell(d) {
  return formatCopyDate(d);
}

function dateHasSlots(d) {
  return props.hasSlotsFn(d);
}

function dateHasMineSlots(d) {
  return props.hasMineSlotsFn(d);
}

function isSelected(d) {
  return selectedKeys.value.includes(dateKey(d));
}

function toggleDate(d) {
  const key = dateKey(d);
  const idx = selectedKeys.value.indexOf(key);
  if (idx === -1) selectedKeys.value.push(key);
  else selectedKeys.value.splice(idx, 1);
}

function handleCopy() {
  if (selectedKeys.value.length === 0) return;
  emit("copy", [...selectedKeys.value]);
  selectedKeys.value = [];
}

function tooltipFor(d) {
  const count = props.hasSlotCountFn(d)
  const ds = formatTooltipDate(d)
  return count > 0 ? `${ds} — ${count} slot(s)` : `${ds} — No slots`
}
</script>
