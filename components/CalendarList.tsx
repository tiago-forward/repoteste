"use client";

import { useCalendar } from "@/contexts/CalendarContext";

export function CalendarList() {
  const { calendarWeeks } = useCalendar();

  // Junta todos os dias em um único array
  const allDays = calendarWeeks.flatMap((week) => week.days);

  // Filtra para pegar só os dias que têm tipo diferente de "default"
  const importantDays = allDays.filter((day) =>
    day.types?.some((type) => type.type !== "default")
  );

  return (
    <div className="min-w-1/2">
      <div className="w-full h-full p-4 rounded-lg bg-card border border-border">
        <h3 className="font-medium text-xl mb-6">Detalhes:</h3>

        <ul className="space-y-2">
          {importantDays.map((day) => (
            <li key={day.date.toString()} className="flex items-start gap-2">
              <div className="space-y-2">
                {day.types.map((typeInfo, index) => {
                  if (typeInfo.type !== "folga") {
                    return (
                      <div key={index} className="space-y-2">
                        <span
                          className={`
                      rounded-full w-6 h-6 flex items-center justify-center text-secondary font-medium
                      ${typeInfo.type === "folga" ? "bg-obs-2" : ""}
                      ${typeInfo.type === "trocado" ? "bg-obs-1" : ""}
                      ${typeInfo.type === "observação" ? "bg-obs-3" : ""}
                    `}
                        >
                          {day.date.getDate()}
                        </span>
                      </div>
                    );
                  }
                })}
              </div>

              <div className="space-y-2">
                {day.types.map((typeInfo, index) => {
                  if (typeInfo.type !== "folga") {
                    return (
                      <div key={index}>
                        <p className="capitalize font-medium">
                          {typeInfo.type}
                        </p>
                        {typeInfo.description && (
                          <p className="text-justify">{typeInfo.description}</p>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
