"use client";

import { addMonths, startOfMonth, subMonths } from "date-fns";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function CalendarHeader() {
  const [currentDate, setCurrentDate] = useState(() =>
    startOfMonth(new Date())
  );


  return (
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
  );
}
