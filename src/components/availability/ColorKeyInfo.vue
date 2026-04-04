<template>
  <div class="bg-sidebar rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
    <p class="text-sm text-white font-semibold mb-2">
      You can plan your availability up to 12 weeks in advance. Colour key:
    </p>
    <div class="flex flex-row sm:flex-col gap-3 sm:gap-1.5">
      <div class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-[#709E24] flex-shrink-0"></span>
        <span class="text-[10px] sm:text-xs text-[#709E24] font-bold">Full availability</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-[#3C87F8] flex-shrink-0"></span>
        <span class="text-[10px] sm:text-xs text-[#3C87F8] font-bold">Some availability</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-[#FBB03B] flex-shrink-0"></span>
        <span class="text-[10px] sm:text-xs text-[#FBB03B] font-bold">Fully booked</span>
      </div>
    </div>
  </div>
</template>
