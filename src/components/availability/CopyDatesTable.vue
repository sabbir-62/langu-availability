<template>
  <div class="mt-6 md:mt-11">
    <!-- Header -->
    <div class="flex justify-between gap-3">
      <p class="text-xs md:text-lg font-bold text-text-main">
        Next, copy the availability above to the selected dates below:
      </p>
      <button
        @click="handleCopy"
        class="btn-date text-white w-48 h-9 md:h-10 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 self-end sm:self-auto"
        :class="{ 'opacity-50 cursor-not-allowed': selectedKeys.length === 0 }"
        :disabled="selectedKeys.length === 0"
      >
        <img
          src="../../assets/images/copy.png"
          alt="Calendar Icon"
          class="w-[12px] h-[12px] md:w-[14px] md:h-[14px]"
        />
        Copy slots
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto pb-2 sm:mx-0 pt-5">
      <table class="w-[650px] sm:w-full" v-for="mon in 3" :key="mon">
        <tbody>
          <tr v-for="dayIdx in 7" :key="dayIdx" class="">
            <td
              class="text-xs sm:text-sm font-bold italic text-text-main w-20 md:w-28 whitespace-nowrap sticky left-0 z-10 bg-[#F8FAFF]"
            >
              {{ dayNames[dayIdx - 1] }}
            </td>
            <td
              v-for="weekIdx in visibleWeeks"
              :key="'d' + dayIdx + 'w' + weekIdx"
              class="py-2"
            >
              <div class="tooltip-wrap cursor-pointe">
                <span
                  v-if="getCellDate(dayIdx - 1, weekIdx - 1, mon - 1)"
                  @click="
                    toggleDate(getCellDate(dayIdx - 1, weekIdx - 1, mon - 1))
                  "
                  class="text-xs sm:text-sm border border-gray-300 h-8 w-32 sm:w-48 flex justify-center items-center gap-5 sm:gap-2 rounded-full text-[10px] font-bold shadow-md cusror-pointer transition-all hover:shadow-md hover:scale-105"
                  :class="[
                    getCellDate(dayIdx - 1, weekIdx - 1, mon - 1).getDate() <
                      new Date().getDate() &&
                      'cursor-not-allowed text-gray-400',
                    slotStatusClassFn(
                      getCellDate(dayIdx - 1, weekIdx - 1, mon - 1),
                    ),
                    isSelected(getCellDate(dayIdx - 1, weekIdx - 1, mon - 1)) &&
                      'selected text-white bg-gray-700',
                  ]"
                >
                  {{
                    formatCell(getCellDate(dayIdx - 1, weekIdx - 1, mon - 1))
                  }}
                </span>
                <span class="tooltip-text">{{
                  tooltipFor(getCellDate(dayIdx - 1, weekIdx - 1, mon - 1))
                }}</span>
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
  slotStatusClassFn: { type: Function, required: true },
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
  const count = props.hasSlotCountFn(d);
  const ds = formatTooltipDate(d);
  return count > 0 ? `${ds} — ${count} slot(s)` : `${ds} — No slots`;
}
</script>
