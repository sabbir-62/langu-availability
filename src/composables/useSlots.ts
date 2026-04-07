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

  function getSlotsForDate(date: Date) {
    return slotStore[dateKey(date)] ?? [];
  }

  function hasSlots(date: Date) {
    const key = dateKey(date);
    return (slotStore[key]?.length ?? 0) > 0;
  }

  function getSlotCount(date: Date) {
    const key = typeof date === "string" ? date : dateKey(date);
    return slotStore[key]?.length ?? 0;
  }

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

  function isPastDate(date: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selected = new Date(date);
    selected.setHours(0, 0, 0, 0);

    return selected < today;
  }

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

    const isOverlapping = slotStore[key].some((s) => {
      return from < s.to && to > s.from;
    });

    if (isOverlapping) {
      showToast("This time overlaps with an existing slot", "error");
      return false;
    }

    slotStore[key].push({
      id: ++idCounter,
      from,
      to,
      isBooked: false,
    });

    slotStore[key].sort((a, b) => a.from.localeCompare(b.from));

    showToast("Slot added!", "success");
    return true;
  }

  function removeSlot(date: Date, slotId: number) {
    const key = dateKey(date);
    if (!slotStore[key]) return;

    const idx = slotStore[key].findIndex((s: any) => s.id === slotId);
    if (idx !== -1) slotStore[key].splice(idx, 1);
    if (slotStore[key].length === 0) delete slotStore[key];
  }

  function copySlotsToTargets(sourceDate: Date, targetKeys: string[]) {
    const srcKey = dateKey(sourceDate);
    const srcSlots = slotStore[srcKey];

    if (!srcSlots || srcSlots.length === 0) {
      showToast("No slots to copy! Add slots first.", "error");
      return 0;
    }

    let count = 0;
    targetKeys.forEach((key) => {
      if (key === srcKey) return;
      slotStore[key] = srcSlots.map((s: any) => ({ ...s, id: ++idCounter }));
      count++;
    });

    showToast(`Slots copied to ${count} date(s)!`, "success");
    return count;
  }

  function seedDemoData() {
    DEMO_SLOTS.forEach(({ date, slots }) => {
      slotStore[date] = slots.map((s) => ({
        ...s,
        id: ++idCounter,
        isMine: false,
      }));
    });
  }

  return {
    slotStore,
    getSlotsForDate,
    hasSlots,
    getSlotCount,
    slotStatusClass,
    addSlot,
    removeSlot,
    copySlotsToTargets,
    seedDemoData,
  };
}
