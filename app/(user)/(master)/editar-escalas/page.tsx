"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { collaborators } from "@/constants/collaborators";
import { shifts } from "@/constants/shifts";
import { months } from "@/constants/months";

// Função utilitária para dividir mês em semanas
const getWeeks = (year: number, month: number): Date[][] => {
  const date = new Date(year, month - 1, 1);
  const weeks: Date[][] = [];
  let week: Date[] = [];

  while (date.getMonth() === month - 1) {
    week.push(new Date(date));
    if (
      date.getDay() === 6 ||
      date.getDate() ===
        new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    ) {
      weeks.push(week);
      week = [];
    }
    date.setDate(date.getDate() + 1);
  }

  return weeks;
};

export default function EditarEscalas() {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear] = useState(today.getFullYear());
  const [selectedTeam, setSelectedTeam] = useState("Todos");

  const [visibleByWeek, setVisibleByWeek] = useState<Record<number, number>>(
    {}
  );

  const weeks = getWeeks(selectedYear, selectedMonth);

  const filtered = collaborators.filter((col) => {
    if (selectedTeam !== "Todos" && col.team !== selectedTeam) return false;
    return true;
  });

  const handleLoadMore = (weekIdx: number) => {
    setVisibleByWeek((prev) => ({
      ...prev,
      [weekIdx]: (prev[weekIdx] || 6) + 6,
    }));
  };

  const resetVisibleByWeek = () => {
    const reset: Record<number, number> = {};
    weeks.forEach((_, idx) => {
      reset[idx] = 6;
    });
    setVisibleByWeek(reset);
  };

  // Resetar quando muda mês ou equipe
  const handleChangeMonth = (val: string) => {
    setSelectedMonth(Number(val));
    resetVisibleByWeek();
  };

  const handleChangeTeam = (val: string) => {
    setSelectedTeam(val);
    resetVisibleByWeek();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Editar Escalas</h2>

      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Mês:</span>
          <Select
            onValueChange={handleChangeMonth}
            defaultValue={String(selectedMonth)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, idx) => (
                <SelectItem key={month} value={String(idx + 1)}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Equipe:</span>
          <Select onValueChange={handleChangeTeam} defaultValue="Todos">
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todas</SelectItem>
              <SelectItem value="Suporte">Suporte</SelectItem>
              <SelectItem value="Atendimento">Atendimento</SelectItem>
              <SelectItem value="Segurança">Segurança</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-6">
        {weeks.map((week, weekIdx) => {
          const visibleCount = visibleByWeek[weekIdx] || 6;
          const visibleCollaborators = filtered.slice(0, visibleCount);
          const hasMore = visibleCollaborators.length < filtered.length;

          return (
            <Card key={weekIdx} className="py-4 md:py-6">
              <CardContent className="px-4 md:px-6 w-full overflow-x-auto">
                <Table className="min-w-[800px]">
                  <TableHeader>
                    {/* Linha com dia da semana */}
                    <TableRow>
                      <TableHead className="font-bold">Nome</TableHead>
                      {week.map((day) => (
                        <TableHead
                          key={`dow-${day.toISOString()}`}
                          className="text-center text-xs font-bold w-28"
                        >
                          {day
                            .toLocaleDateString("pt-BR", { weekday: "short" })
                            .toUpperCase()}
                        </TableHead>
                      ))}
                    </TableRow>

                    {/* Linha com dia do mês */}
                    <TableRow>
                      <TableHead />
                      {week.map((day) => (
                        <TableHead
                          key={`day-${day.toISOString()}`}
                          className="text-center text-muted-foreground"
                        >
                          {day.getDate().toString().padStart(2, "0")}/
                          {String(selectedMonth).padStart(2, "0")}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visibleCollaborators.map((col) => (
                      <TableRow key={col.name}>
                        <TableCell className="font-medium">
                          {col.name}
                        </TableCell>
                        {week.map((day) => (
                          <TableCell key={day.toISOString() + col.name}>
                            <Button
                              variant="outline"
                              className="w-full cursor-pointer"
                            >
                              {
                                shifts[
                                  Math.floor(Math.random() * shifts.length)
                                ]
                              }
                            </Button>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {hasMore && (
                  <div className="pt-2 text-center">
                    <Button
                      onClick={() => handleLoadMore(weekIdx)}
                      variant="outline"
                      className="cursor-pointer w-full"
                    >
                      Ver mais
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
