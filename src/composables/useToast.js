import { reactive } from 'vue'

let timer = null

const state = reactive({
  show: false,
  message: '',
  type: 'success', // 'success' | 'error' | 'info'
})

export function useToast() {
  function showToast(message, type = 'success', duration = 2500) {
    state.message = message
    state.type = type
    state.show = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      state.show = false
    }, duration)
  }

  return { toast: state, showToast }
}
