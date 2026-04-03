<template>
  <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
    <p class="text-xs text-yellow-800 font-semibold mb-2">
      You can plan your availability up to 12 weeks in advance. Colour key:
    </p>
    <div class="flex flex-row sm:flex-col gap-3 sm:gap-1.5">
      <div class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></span>
        <span class="text-[10px] sm:text-xs text-green-700 font-bold">Full availability</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0"></span>
        <span class="text-[10px] sm:text-xs text-yellow-700 font-bold">Some availability</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-red-500 flex-shrink-0"></span>
        <span class="text-[10px] sm:text-xs text-red-700 font-bold">Fully booked</span>
      </div>
    </div>
  </div>
</template>
