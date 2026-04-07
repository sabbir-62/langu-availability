import { reactive } from "vue";
import { useToast } from "./useToast";
import { dateKey } from "../utils/dateHelpers";
import { DEMO_SLOTS } from "../constants";

type Slot = {
  id: number;
  from: string;
  to: string;
  isBooked: boolean;
};

const slotStore = reactive<Record<string, Slot[]>>({});
let idCounter = 0;

export function useSlots() {
  const { showToast } = useToast();

  // Get slots for a specific date
  function getSlotsForDate(date: Date) {
    return slotStore[dateKey(date)] ?? [];
  }

  // Check if a specific date has slots
  function hasSlots(date: Date) {
    const key = dateKey(date);
    return (slotStore[key]?.length ?? 0) > 0;
  }

  // Get the number of slots for a specific date
  function getSlotCount(date: Date) {
    const key = typeof date === "string" ? date : dateKey(date);
    return slotStore[key]?.length ?? 0;
  }

  // Get the status of the slots for a specific date
  const getBookedSlots = (date: Date) => {
    const key = dateKey(date);
    const slots = slotStore[key];

    if (!Array.isArray(slots) || slots.length === 0) return "empty";

    const total = slots.length;
    const booked = slots.filter((s) => s.isBooked).length;

    if (booked === total) return "all-booked";
    else return "not-all-booked";
  };

  // Get the status of the slots for a specific date
  const getSlotStatus = (date: Date) => {
    const key = dateKey(date);
    const slots = slotStore[key];

    if (!Array.isArray(slots) || slots.length === 0) return "empty";

    const total = slots.length;
    const booked = slots.filter((s) => s.isBooked).length;

    if (booked === 0) return "all-available";
    if (booked === total) return "all-booked";
    return "partial";
  };

  // Get the status of the slots for a specific date
  const slotStatusClass = (date: Date) => {
    const status = getSlotStatus(date);

    switch (status) {
      case "all-available":
        return "slot-gradient-0 text-white";
      case "partial":
        return "slot-gradient-1 text-white";
      case "all-booked":
        return "slot-gradient-2 text-white";
      default:
        return "text-text-muted";
    }
  };

  // Check if a specific date is in the past
  function isPastDate(date: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selected = new Date(date);
    selected.setHours(0, 0, 0, 0);

    return selected < today;
  }

  // Add a new slot
  function addSlot(date: Date, from: string, to: string) {
    if (isPastDate(date)) {
      showToast("You cannot add slots in past dates", "error");
      return false;
    }

    if (from >= to) {
      showToast("End time must be after start time", "error");
      return false;
    }

    const key = dateKey(date);
    if (!slotStore[key]) slotStore[key] = [];

    const toMinutes = (time: string) => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    };

    const toTime = (mins: number) => {
      const h = String(Math.floor(mins / 60)).padStart(2, "0");
      const m = String(mins % 60).padStart(2, "0");
      return `${h}:${m}`;
    };

    let start = toMinutes(from);
    const end = toMinutes(to);

    let addedCount = 0;

    while (start < end) {
      const next = start + 30;

      // prevent overflow(last slot)
      if (next > end) break;

      const slotFrom = toTime(start);
      const slotTo = toTime(next);

      // check overlap per small slot
      const isOverlapping = slotStore[key].some((slot: Slot) => {
        return slotFrom < slot.to && slotTo > slot.from;
      });

      if (!isOverlapping) {
        slotStore[key].push({
          id: ++idCounter,
          from: slotFrom,
          to: slotTo,
          isBooked: false,
        });
        addedCount++;
      }

      start = next;
    }

    // sort after adding
    slotStore[key].sort((a, b) => a.from.localeCompare(b.from));

    if (addedCount === 0) {
      showToast("All slots overlap with existing ones", "error");
      return false;
    }

    showToast(`${addedCount} slot(s) added!`, "success");
    return true;
  }

  // Remove a slot
  function removeSlot(date: Date, slotId: number) {
    const key = dateKey(date);
    if (!slotStore[key]) return;

    const idx = slotStore[key].findIndex((s: any) => s.id === slotId);
    if (idx !== -1) slotStore[key].splice(idx, 1);
    if (slotStore[key].length === 0) delete slotStore[key];
  }

  // Copy slots to multiple dates
  function copySlotsToTargets(sourceDate: Date, targetKeys: string[]) {
    const srcKey = dateKey(sourceDate);
    const srcSlots = slotStore[srcKey];

    if (!srcSlots || srcSlots.length === 0) {
      showToast("No slots to copy! Add slots first.", "error");
      return 0;
    }

    // filter only available slots
    const availableSlots = srcSlots.filter((s) => !s.isBooked);

    if (availableSlots.length === 0) {
      showToast("No available slots to copy!", "error");
      return 0;
    }

    let count = 0;
    targetKeys.forEach((key) => {
      if (key === srcKey) return;
      slotStore[key] = availableSlots.map((s: any) => ({
        ...s,
        id: ++idCounter,
        isBooked: false,
      }));
      count++;
    });

    showToast(`Slots copied to ${count} date(s)!`, "success");
    return count;
  }

  // Seed demo data
  function seedDemoData() {
    DEMO_SLOTS.forEach(({ date, slots }) => {
      slotStore[date] = slots.map((s) => ({
        ...s,
        id: ++idCounter,
      }));
    });
  }

  return {
    slotStore,
    getSlotsForDate,
    hasSlots,
    getSlotCount,
    getBookedSlots,
    slotStatusClass,
    addSlot,
    removeSlot,
    copySlotsToTargets,
    seedDemoData,
  };
}
