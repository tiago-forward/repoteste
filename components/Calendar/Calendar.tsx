"use client";

import { Calendar } from "@/components/Calendar";
import { getWeekDays } from "@/utils/get-week-days";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCalendar } from "@/contexts/CalendarContext";
import { useCalendarDetails } from "@/stores/useCalendarDetails";

export function CalendarBox() {
  const shortWeekDays = getWeekDays({ short: true });
  const { selectedDate, setSelectedDate } = useCalendarDetails();

  const { month, year, handlePreviousMonth, handleNextMonth, calendarWeeks } =
    useCalendar();

  return (
    <div className="">
      <Calendar.Root>
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-xl capitalize">
            {month} <span className="text-muted-foreground">{year}</span>
          </h2>

          <div className="flex gap-2">
            <button
              className="cursor-pointer bg-popover opacity-50 hover:opacity-100"
              title="Mês anterior"
              onClick={handlePreviousMonth}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="cursor-pointer bg-popover opacity-50 hover:opacity-100"
              title="Próximo mês"
              onClick={handleNextMonth}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        <Calendar.Table>
          <thead>
            <tr>
              {shortWeekDays.map((weekDay) => (
                <th key={weekDay}>{weekDay}.</th>
              ))}
            </tr>
          </thead>
          <tbody className="before:content-['.'] before:block before:text-transparent">
            {calendarWeeks.map(({ week, days }) => {
              return (
                <tr key={week}>
                  {days.map(({ date, disabled, types }) => {
                    return (
                      <Calendar.Td
                        key={date.toString()}
                        disabled={disabled}
                        selected={
                          selectedDate?.toDateString() === date.toDateString()
                        }
                        onClick={() => {
                          if (disabled) return;

                          if (
                            selectedDate?.toDateString() === date.toDateString()
                          ) {
                            setSelectedDate(null); // desmarca seleção
                          } else {
                            setSelectedDate(date); // marca nova seleção
                          }
                        }}
                      >
                        <Calendar.Button
                          disabled={disabled}
                          dayType={types[0]?.type}
                        >
                          {date.getDate()}
                        </Calendar.Button>
                        {/* 
                        {selectedDate?.toDateString() ===
                          date.toDateString() && (
                          <div className="w-38 px-2 py-2 pr-6 bg-accent absolute top-full left-0 z-50 rounded">
                            {types.map((typeInfo, index) => {
                              const { type } = typeInfo;

                              return (
                                <div
                                  key={index}
                                  className="flex gap-2 items-center"
                                >
                                  {type === "observação" && (
                                    <>
                                      <div className="w-2.5 h-2.5 rounded-full bg-obs-3"></div>
                                      <p>Observação</p>
                                    </>
                                  )}
                                  {type === "folga" && (
                                    <>
                                      <div className="w-2.5 h-2.5 rounded-full bg-obs-2"></div>
                                      <p>Folga</p>
                                    </>
                                  )}
                                  {type === "trocado" && (
                                    <>
                                      <div className="w-2.5 h-2.5 rounded-full bg-obs-1"></div>
                                      <p>Dia trocado</p>
                                    </>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )} */}

                        {/* Pontinhos coloridos */}
                        {types.map((typeInfo, index) => {
                          const { type } = typeInfo;

                          return (
                            <div key={index}>
                              {type === "observação" && (
                                <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full absolute bg-obs-3 bottom-0.5 left-7 md:bottom-1 md:left-8 z-10"></div>
                              )}
                              {type === "folga" && (
                                <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full absolute bg-obs-2 bottom-0.5 left-0.5 md:bottom-1 md:left-1 z-10"></div>
                              )}
                              {type === "trocado" && (
                                <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full absolute bg-obs-1 bottom-0.5 left-4 md:bottom-1 md:left-4 z-10"></div>
                              )}
                            </div>
                          );
                        })}
                      </Calendar.Td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Calendar.Table>
      </Calendar.Root>
    </div>
  );
}
