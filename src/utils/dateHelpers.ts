import { MONTH_NAMES } from "../constants"



export function dateKey(d: Date) {
  const dd = new Date(d)
  const y = dd.getFullYear()
  const m = String(dd.getMonth() + 1).padStart(2, '0')
  const day = String(dd.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}


export function formatDisplayDate(d: Date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return `${days[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`
}

export function formatTooltipDate(d: Date) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

export function formatShortDate(d: Date) {
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`
}

export function formatCopyDate(d: Date) {
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`
}

export function getWeekStart(d: Date) {
  const dd = new Date(d)
  const day = dd.getDay()
  const diff = dd.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(dd.getFullYear(), dd.getMonth(), diff)
}

export function generateTimeOptions() {
  const opts = []
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      opts.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    }
  }
  return opts
}

export function buildCalendarCells(year: number, month: number, slotStore: Record<string, unknown[]>) {
  const firstDay = new Date(year, month, 1).getDay()
  const offset = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []

  for (let i = 0; i < offset; i++) {
    cells.push({ day: null })
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const fullDate = new Date(year, month, d)

    cells.push({
      day: d,
      fullDate,
    })
  }

  return cells
}
