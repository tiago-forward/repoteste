"use client";

import { create } from "zustand";

interface CalendarDetailsStore {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

export const useCalendarDetails = create<CalendarDetailsStore>((set) => ({
  selectedDate: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
