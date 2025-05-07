"use client";

import { useCalendar } from "@/contexts/CalendarContext";
import { useCalendarDetails } from "@/stores/useCalendarDetails";

export function CalendarList() {
  const { calendarWeeks } = useCalendar();
  const { selectedDate, setSelectedDate } = useCalendarDetails();

  // Junta todos os dias em um único array
  const allDays = calendarWeeks.flatMap((week) => week.days);

  // Filtra para pegar só os dias que têm tipo diferente de "default" |
  // Se houver data selecionada, filtre apenas esse dia
  const importantDays = selectedDate
    ? allDays.filter(
        (day) =>
          day.date.toDateString() === selectedDate.toDateString() &&
          day.types?.some((type) => type.type !== "default")
      )
    : allDays.filter((day) =>
        day.types?.some((type) => type.type !== "default")
      );

  return (
    <div className="min-w-1/2">
      <div className="w-full h-full p-4 rounded-lg bg-card border border-border">
        <h3 className="font-medium text-xl mb-6">Detalhes:</h3>

        <ul className="grid md:grid-cols-2">
          {importantDays.map((day) => (
            <li
              key={day.date.toString()}
              className="flex flex-col items-start gap-2 border border-border p-2"
            >
              <div className="space-y-2">
                <span className="font-medium">
                  {day.date.getDate()}/{day.date.getMonth() + 1}/
                  {day.date.getFullYear()}
                </span>
              </div>

              <div>
                {day.types.map((typeInfo, index) => {
                  const colorClass =
                    typeInfo.type === "folga"
                      ? "text-obs-2"
                      : typeInfo.type === "trocado"
                      ? "text-obs-1"
                      : typeInfo.type === "observação"
                      ? "text-obs-3"
                      : "";
                  return (
                    <div key={index}>
                      <p className={`capitalize font-medium ${colorClass}`}>
                        - {typeInfo.type}
                      </p>
                      {typeInfo.description && (
                        <p className="text-justify">{typeInfo.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
