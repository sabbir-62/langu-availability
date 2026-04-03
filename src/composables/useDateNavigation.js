import { ref } from 'vue'

export function useDateNavigation(initialDate = new Date(2025, 2, 18)) {
  const selectedDate = ref(new Date(initialDate))

  function prevDay() {
    const d = new Date(selectedDate.value)
    d.setDate(d.getDate() - 1)
    selectedDate.value = d
  }

  function nextDay() {
    const d = new Date(selectedDate.value)
    d.setDate(d.getDate() + 1)
    selectedDate.value = d
  }

  function jumpToDate(date) {
    selectedDate.value = new Date(date)
  }

  return { selectedDate, prevDay, nextDay, jumpToDate }
}
