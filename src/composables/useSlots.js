import { reactive, computed } from 'vue'
import { dateKey } from '@/utils/dateHelpers'
import { useToast } from './useToast'
import { DEMO_SLOTS } from '@/constants'

const slotStore = reactive({})
let idCounter = 0

export function useSlots() {
  const { showToast } = useToast()

  /**
   * Get slots for a specific date
   */
  function getSlotsForDate(date) {
    return slotStore[dateKey(date)] ?? []
  }

  /**
   * Check if a date has any slots
   */
  function hasSlots(date) {
    const key = dateKey(date)
    return (slotStore[key]?.length ?? 0) > 0
  }

  /**
   * Add a new slot to a date
   */
  function addSlot(date, from, to) {
    if (from >= to) {
      showToast('End time must be after start time', 'error')
      return false
    }

    const key = dateKey(date)
    if (!slotStore[key]) slotStore[key] = []

    const exists = slotStore[key].some((s) => s.from === from && s.to === to)
    if (exists) {
      showToast('This slot already exists', 'error')
      return false
    }

    slotStore[key].push({ id: ++idCounter, from, to })
    slotStore[key].sort((a, b) => a.from.localeCompare(b.from))
    showToast('Slot added!', 'success')
    return true
  }

  /**
   * Remove a slot by id from a date
   */
  function removeSlot(date, slotId) {
    const key = dateKey(date)
    if (!slotStore[key]) return

    const idx = slotStore[key].findIndex((s) => s.id === slotId)
    if (idx !== -1) slotStore[key].splice(idx, 1)
    if (slotStore[key].length === 0) delete slotStore[key]
  }

  /**
   * Copy slots from source date to multiple target date keys
   */
  function copySlotsToTargets(sourceDate, targetKeys) {
    const srcKey = dateKey(sourceDate)
    const srcSlots = slotStore[srcKey]

    if (!srcSlots || srcSlots.length === 0) {
      showToast('No slots to copy! Add slots first.', 'error')
      return 0
    }

    let count = 0
    targetKeys.forEach((key) => {
      if (key === srcKey) return
      slotStore[key] = srcSlots.map((s) => ({ ...s, id: ++idCounter }))
      count++
    })

    showToast(`Slots copied to ${count} date(s)!`, 'success')
    return count
  }

  /**
   * Seed demo data
   */
  function seedDemoData() {
    DEMO_SLOTS.forEach(({ date, slots }) => {
      slotStore[date] = slots.map((s) => ({ ...s, id: ++idCounter }))
    })
  }

  return {
    slotStore,
    getSlotsForDate,
    hasSlots,
    addSlot,
    removeSlot,
    copySlotsToTargets,
    seedDemoData,
  }
}
