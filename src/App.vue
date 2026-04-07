<template>
  <div class="min-h-screen flex flex-col bg-[#F8FAFF]">
    <AppHeader />

    <main class="max-w-7xl mx-auto w-full px-3 mt-6 md:mt-12 flex-1">
      <!-- Title -->
      <div class="flex items-center gap-3">
        <h1 class="text-2xl sm:text-3xl font-semibold font-poppins text-[#2D2D2D]">
          Availability
        </h1>
         <img
          src="./assets/images/calendar.png"
          alt="Calendar Icon"
          class="w-[30px] h-[30px] md:w-[36px] md:h-[36px]"
        />
      </div>

      <!-- Mobile: Calendar on top -->
      <CalendarSidebarMobile
        :date="selectedDate"
        :slot-store="slotStore"
        :slot-status-class-fn="slotStatusClass"
        @jump-to="jumpToDate"
      />

      <div class="flex gap-6">
        <!-- Left Panel -->
        <div class="flex-1 min-w-0 ms-2 mt-5">
          <DateNavigator :date="selectedDate" @prev="prevDay" @next="nextDay" />

          <TimeSlotManager
            :date="selectedDate"
            :slots="currentSlots"
            :get-booked-slots-fn="getBookedSlots"
            @add-slot="handleAddSlot"
            @remove-slot="handleRemoveSlot"
          />

          <CopyDatesTable
            :date="selectedDate"
            :has-slots-fn="hasSlots"
            :has-slot-count-fn="getSlotCount"
            :slot-status-class-fn="slotStatusClass"
            @copy="handleCopySlots"
          />
        </div>

        <!-- Desktop: Sidebar on right -->
        <CalendarSidebarDesktop
          :date="selectedDate"
          :slot-store="slotStore"
          :slot-status-class-fn="slotStatusClass"
          @jump-to="jumpToDate"
        />
      </div>
    </main>

    <AppFooter />
    <ToastNotification />
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useDateNavigation } from "@/composables/useDateNavigation";
import { useSlots } from "@/composables/useSlots";

import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import DateNavigator from "@/components/availability/DateNavigator.vue";
import TimeSlotManager from "@/components/availability/TimeSlotManager.vue";
import CopyDatesTable from "@/components/availability/CopyDatesTable.vue";
import CalendarSidebarDesktop from "@/components/availability/CalendarSidebarDesktop.vue";
import CalendarSidebarMobile from "@/components/availability/CalendarSidebarMobile.vue";
import ToastNotification from "@/components/ui/ToastNotification.vue";

const { selectedDate, prevDay, nextDay, jumpToDate } = useDateNavigation();
const {
  slotStore,
  getSlotsForDate,
  hasSlots,
  getSlotCount,
  slotStatusClass,
  getBookedSlots,
  addSlot,
  removeSlot,
  copySlotsToTargets,
  seedDemoData,
} = useSlots();

const currentSlots = computed(() => getSlotsForDate(selectedDate.value));

function handleAddSlot({ from, to }) {
  addSlot(selectedDate.value, from, to);
}

function handleRemoveSlot(slotId) {
  removeSlot(selectedDate.value, slotId);
}

function handleCopySlots(targetKeys) {
  copySlotsToTargets(selectedDate.value, targetKeys);
}

onMounted(() => {
  seedDemoData();
});
</script>
