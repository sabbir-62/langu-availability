<template>
  <div
    :class="!slot.isBooked ? 'slot-gradient-0' : 'slot-gradient-2'"
    class="flex justify-center items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 h-7 sm:h-8 sm:py-1.5 rounded-full text-white text-[10px] sm:text-xs font-semibold shadow-sm transition-all hover:shadow-md hover:scale-105"
  >
    {{ slot.from }} - {{ slot.to }}
    <button
      v-if="!slot.isBooked"
      @click="$emit('remove', slot.id)"
      class="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white bg-opacity-30 hover:bg-opacity-50 flex items-center justify-center text-white transition-all leading-none flex-shrink-0"
      style="font-size: 9px"
    >
      ×
    </button>
  </div>
</template>

<script setup>
defineProps({
  slot: { type: Object, required: true },
});
defineEmits(["remove"]);
</script>
