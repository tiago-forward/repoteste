"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const collaborators = [
  {
    name: "Tiago",
    position: "Front",
    team: "Suporte",
    shift: "14:00 - 22:00",
    dayOff: "Terça",
  },
  {
    name: "Luiz",
    position: "Back",
    team: "Suporte",
    shift: "14:00 - 22:00",
    dayOff: "Quinta",
  },
  {
    name: "Heitor",
    position: "Jogos",
    team: "Suporte",
    shift: "22:00 - 06:00",
    dayOff: "Quarta",
  },
  {
    name: "Kevyn",
    position: "Back",
    team: "Suporte",
    shift: "22:00 - 06:00",
    dayOff: "Segunda",
  },
  {
    name: "David",
    position: "Front",
    team: "Suporte",
    shift: "06:00 - 14:00",
    dayOff: "Segunda",
  },
  {
    name: "Lavique",
    position: "Back",
    team: "Suporte",
    shift: "06:00 - 14:00",
    dayOff: "Sexta",
  },
  {
    name: "Well",
    position: "Supervisor I",
    team: "Segurança",
    shift: "14:00 - 22:00",
    dayOff: "Sexta",
  },
  {
    name: "Demi Lovato",
    position: "Supervisor I",
    team: "Atendimento",
    shift: "14:00 - 22:00",
    dayOff: "Sexta",
  },
];

export default function Equipes() {
  const [selectedTeam, setSelectedTeam] = useState("Todos");

  const filtered =
    selectedTeam === "Todos"
      ? collaborators
      : collaborators.filter((col) => col.team === selectedTeam);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Equipes</h2>

      <div className="flex items-center gap-4">
        <span className="text-muted-foreground">Filtrar por equipe:</span>
        <Select value={selectedTeam} onValueChange={setSelectedTeam}>
          <SelectContent>
            <SelectItem value="Todos">Todos</SelectItem>
            <SelectItem value="Suporte">Suporte</SelectItem>
            <SelectItem value="Segurança">Segurança</SelectItem>
            <SelectItem value="Atendimento">Atendimento</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Equipe</TableHead>
                <TableHead>Turno padrão</TableHead>
                <TableHead>Folga fixa</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((col, i) => (
                <TableRow key={i}>
                  <TableCell>{col.name}</TableCell>
                  <TableCell>{col.position}</TableCell>
                  <TableCell>{col.team}</TableCell>
                  <TableCell>{col.shift}</TableCell>
                  <TableCell>{col.dayOff}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer"
                    >
                      Editar
                    </Button>
                    {/* <Button
                      size="sm"
                      variant="secondary"
                      className="cursor-pointer"
                    >
                      Alterar Turno
                    </Button> */}
                    <Button
                      size="sm"
                      variant="destructive"
                      className="cursor-pointer"
                    >
                      Desativar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
