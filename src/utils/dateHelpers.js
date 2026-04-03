import { MONTH_NAMES } from '@/constants'

/**
 * Generate a YYYY-MM-DD key from a Date object
 */
export function dateKey(d) {
  const dd = new Date(d)
  const y = dd.getFullYear()
  const m = String(dd.getMonth() + 1).padStart(2, '0')
  const day = String(dd.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * Format: "Thursday, 18 March 2025"
 */
export function formatDisplayDate(d) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return `${days[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`
}

/**
 * Format: "March 18"
 */
export function formatShortDate(d) {
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`
}

/**
 * Format: "18 March"
 */
export function formatCopyDate(d) {
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`
}

/**
 * Get the Monday of the week for a given date
 */
export function getWeekStart(d) {
  const dd = new Date(d)
  const day = dd.getDay()
  const diff = dd.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(dd.getFullYear(), dd.getMonth(), diff)
}

/**
 * Generate 30-minute interval time options from 00:00 to 23:30
 */
export function generateTimeOptions() {
  const opts = []
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      opts.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    }
  }
  return opts
}

/**
 * Build calendar cell data for a given month
 */
export function buildCalendarCells(year, month, slotStore) {
  const firstDay = new Date(year, month, 1).getDay()
  const offset = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []

  for (let i = 0; i < offset; i++) {
    cells.push({ day: null })
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const fullDate = new Date(year, month, d)
    const key = dateKey(fullDate)
    const count = slotStore[key]?.length ?? 0

    let status = null
    if (count >= 1 && count <= 2) status = 'some'
    else if (count >= 3 && count <= 5) status = 'full'
    else if (count > 5) status = 'booked'

    cells.push({
      day: d,
      fullDate,
      status,
      hasBooking: count > 3,
    })
  }

  return cells
}
