"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import {
  addDays,
  addMonths,
  endOfDay,
  endOfMonth,
  getDaysInMonth,
  startOfMonth,
  subDays,
  subMonths,
  format,
} from "date-fns";
import { calendarData } from "@/constants/calendar-data";
import { ptBR } from "date-fns/locale";

interface DayInfo {
  date: Date;
  disabled: boolean;
  type: "default" | "folga" | "trocado" | "observação";
  description?: string;
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
  const year = format(currentDate, "yyyy", { locale: ptBR });

  function handlePreviousMonth() {
    setCurrentDate(subMonths(currentDate, 1));
  }

  function handleNextMonth() {
    setCurrentDate(addMonths(currentDate, 1));
  }

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: getDaysInMonth(currentDate),
    }).map((_, i) => addDays(startOfMonth(currentDate), i));

    const firstWeekDay = currentDate.getDay();
    const previousMonthFillArray = Array.from({ length: firstWeekDay }).map(
      (_, i) => subDays(startOfMonth(currentDate), i + 1)
    );

    const lastWeekDay = endOfDay(currentDate).getDay();
    const nextMonthFillArray = Array.from({ length: 6 - lastWeekDay }).map(
      (_, i) => addDays(endOfMonth(currentDate), i + 1)
    );

    const allDays = [
      ...previousMonthFillArray.reverse(),
      ...daysInMonthArray,
      ...nextMonthFillArray,
    ];

    const calendarDays: DayInfo[] = allDays.map((date) => {
      const monthKey = format(currentDate, "yyyy-MM");
      const dayKey = format(date, "yyyy-MM-dd");
      const dayInfo = calendarData[monthKey]?.[dayKey];

      return {
        date,
        disabled: date.getMonth() !== currentDate.getMonth(),
        types: dayInfo?.types || [],
      };
    });

    const weeks = calendarDays.reduce<CalendarWeek[]>((acc, _, i, original) => {
      if (i % 7 === 0) {
        acc.push({
          week: Math.floor(i / 7) + 1,
          days: original.slice(i, i + 7),
        });
      }
      return acc;
    }, []);

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
