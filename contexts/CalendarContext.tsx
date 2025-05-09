"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  getDaysInMonth,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";

import { calendarData, DayEntry } from "@/constants/calendar-data";

interface DayInfo {
  date: Date;
  disabled: boolean;
  types: DayEntry[];
}

interface CalendarWeek {
  week: number;
  days: DayInfo[];
}

interface CalendarContextType {
  currentDate: Date;
  month: string;
  year: string;
  calendarWeeks: CalendarWeek[];
  handlePreviousMonth: () => void;
  handleNextMonth: () => void;
}

const CalendarContext = createContext({} as CalendarContextType);

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [currentDate, setCurrentDate] = useState(() =>
    startOfMonth(new Date())
  );

  const month = format(currentDate, "MMMM", { locale: ptBR });
  const year = format(currentDate, "yyyy");

  function handlePreviousMonth() {
    setCurrentDate((prev) => subMonths(prev, 1));
  }

  function handleNextMonth() {
    setCurrentDate((prev) => addMonths(prev, 1));
  }

  const calendarWeeks = useMemo(() => {
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const totalDays = getDaysInMonth(currentDate);

    const daysInMonth = Array.from({ length: totalDays }, (_, i) =>
      addDays(firstDayOfMonth, i)
    );

    const startPadding = firstDayOfMonth.getDay();
    const endPadding = 6 - lastDayOfMonth.getDay();

    const daysBefore = Array.from({ length: startPadding }, (_, i) =>
      subDays(firstDayOfMonth, startPadding - i)
    );

    const daysAfter = Array.from({ length: endPadding }, (_, i) =>
      addDays(lastDayOfMonth, i + 1)
    );

    const allDays = [...daysBefore, ...daysInMonth, ...daysAfter];

    const calendarDays = allDays.map((date) => {
      const monthKey = format(currentDate, "yyyy-MM");
      const dayKey = format(date, "yyyy-MM-dd");
      const dayInfo = calendarData[monthKey]?.[dayKey];

      return {
        date,
        disabled: date.getMonth() !== currentDate.getMonth(),
        types: dayInfo?.types ?? [],
      };
    });

    const weeks: CalendarWeek[] = [];

    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push({
        week: weeks.length + 1,
        days: calendarDays.slice(i, i + 7),
      });
    }

    return weeks;
  }, [currentDate]);

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        month,
        year,
        calendarWeeks,
        handlePreviousMonth,
        handleNextMonth,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export const useCalendar = () => useContext(CalendarContext);
