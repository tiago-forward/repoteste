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
import { Card, CardContent } from "@/components/ui/card";
import { collaborators } from "@/constants/collaborators";
import { shifts } from "@/constants/shifts";
import { months } from "@/constants/months";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);

export default function EditarEscalas2() {
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedTeam, setSelectedTeam] = useState<string>("Todos");
  const [selectedCollaborator, setSelectedCollaborator] =
    useState<string>("Todos");

  const filtered = collaborators.filter((col) => {
    if (selectedTeam !== "Todos" && col.team !== selectedTeam) return false;
    if (selectedCollaborator !== "Todos" && col.name !== selectedCollaborator)
      return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Editar Escalas</h2>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">Mês:</span>
          <Select
            onValueChange={(val) => setSelectedMonth(Number(val))}
            defaultValue={String(selectedMonth)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Mês" />
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

        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">Dia:</span>
          <Select
            onValueChange={(val) => setSelectedDay(Number(val))}
            defaultValue={String(selectedDay)}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Dia" />
            </SelectTrigger>
            <SelectContent>
              {daysOfMonth.map((day) => (
                <SelectItem key={day} value={String(day)}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">Equipe:</span>
          <Select onValueChange={setSelectedTeam} defaultValue="Todos">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Equipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todas</SelectItem>
              <SelectItem value="Suporte">Suporte</SelectItem>
              <SelectItem value="Atendimento">Atendimento</SelectItem>
              <SelectItem value="Segurança">Segurança</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">Colaborador:</span>
          <Select onValueChange={setSelectedCollaborator} defaultValue="Todos">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Colaborador" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              {collaborators
                .filter(
                  (c) => selectedTeam === "Todos" || c.team === selectedTeam
                )
                .map((c) => (
                  <SelectItem key={c.name} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="py-4 md:py-6">
        <CardContent className="px-4 md:px-6 w-full overflow-x-auto">
          <Table className="min-w-full text-left rounded-md">
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Nome</TableHead>
                <TableHead className="font-bold">Equipe</TableHead>
                <TableHead className="text-center">Turno</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((col) => (
                <TableRow key={col.name}>
                  <TableCell className="truncate max-w-[100px] sm:max-w-28 md:max-w-none">
                    {col.name}
                  </TableCell>
                  <TableCell>{col.team}</TableCell>
                  <TableCell>
                    <Button variant="outline" className="cursor-pointer w-full">
                      {shifts[Math.floor(Math.random() * shifts.length)]}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Botões extras adicionais */}
      {/* <div className="flex gap-2 flex-wrap">
        <Button>+ Adicionar turno</Button>
        <Button variant="outline">Aplicar folga a todos</Button>
        <Button variant="outline">Trocar colaboradores</Button>
      </div> */}
    </div>
  );
}
