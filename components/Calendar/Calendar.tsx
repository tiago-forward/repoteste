"use client";

import { Calendar } from "@/components/Calendar";
import { getWeekDays } from "@/utils/get-week-days";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCalendar } from "@/contexts/CalendarContext";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export function CalendarBox() {
  const shortWeekDays = getWeekDays({ short: true });

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
                      <Calendar.Td key={date.toString()} disabled={disabled}>
                        <HoverCard>
                          <HoverCardTrigger>
                            {" "}
                            <Calendar.Button
                              disabled={disabled}
                              dayType={types[0]?.type}
                            >
                              {date.getDate()}
                            </Calendar.Button>
                          </HoverCardTrigger>
                          <HoverCardContent
                            align="start"
                            sideOffset={26}
                            className="w-full px-2 py-2 pr-6 bg-accent"
                          >
                            {types.map((typeInfo, index) => {
                              const { type } = typeInfo;

                              return (
                                <div key={index} className="flex gap-2">
                                  {type === "observação" && (
                                    <div className="flex items-center gap-2">
                                      <div className="w-2.5 h-2.5 rounded-full bg-obs-3"></div>
                                      <p>Observação</p>
                                    </div>
                                  )}
                                  {type === "folga" && (
                                    <div className="flex items-center gap-2">
                                      <div className="w-2.5 h-2.5 rounded-full bg-obs-2"></div>
                                      <p>Folta</p>
                                    </div>
                                  )}
                                  {type === "trocado" && (
                                    <div className="flex items-center gap-2">
                                      <div className="w-2.5 h-2.5 rounded-full bg-obs-1"></div>
                                      <p className="flex gap-2 items-center">
                                        Dia trocado
                                      </p>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </HoverCardContent>
                        </HoverCard>
                        {types.map((typeInfo, index) => {
                          const { type } = typeInfo;

                          return (
                            <div key={index}>
                              {type === "observação" && (
                                <div className="w-2.5 h-2.5 rounded-full absolute bg-obs-3 bottom-1 left-8 z-10"></div>
                              )}
                              {type === "folga" && (
                                <div className="w-2.5 h-2.5  rounded-full absolute bg-obs-2 bottom-1 left-1 z-10"></div>
                              )}
                              {type === "trocado" && (
                                <div className="w-2.5 h-2.5 rounded-full absolute bg-obs-1 bottom-1 left-4 z-10"></div>
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
