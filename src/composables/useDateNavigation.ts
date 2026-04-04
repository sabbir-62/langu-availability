import { ref } from 'vue'

export function useDateNavigation(initialDate = new Date()) {
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

  function jumpToDate(date: Date) {
    selectedDate.value = new Date(date)
  }

  return { selectedDate, prevDay, nextDay, jumpToDate }
}
