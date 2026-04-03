<template>
  <Transition name="toast">
    <div v-if="toast.show"
         class="fixed bottom-6 left-1/2 transform -translate-x-1/2 px-5 sm:px-6 py-3 rounded-xl shadow-lg text-white text-xs sm:text-sm font-bold z-50 max-w-[90vw] text-center"
         :class="{
           'bg-green-500': toast.type === 'success',
           'bg-red-500': toast.type === 'error',
           'bg-blue-500': toast.type === 'info',
         }">
      {{ toast.message }}
    </div>
  </Transition>
</template>

<script setup>
import { useToast } from '@/composables/useToast'
const { toast } = useToast()
</script>
