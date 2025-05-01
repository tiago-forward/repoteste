"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { collaborators } from "@/constants/collaborators";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

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
        <Select onValueChange={setSelectedTeam}>
          <SelectTrigger className="w-[180px] cursor-pointer">
            <SelectValue placeholder="Selecionar equipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos" className="cursor-pointer">
              Todos
            </SelectItem>
            <SelectItem value="Suporte" className="cursor-pointer">
              Suporte
            </SelectItem>
            <SelectItem value="Segurança" className="cursor-pointer">
              Segurança
            </SelectItem>
            <SelectItem value="Atendimento" className="cursor-pointer">
              Atendimento
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="py-4 md:py-6">
        <CardContent className="px-4 md:px-6 w-full overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Cargo</TableHead>
                <TableHead className="hidden md:table-cell">Equipe</TableHead>
                <TableHead>Turno padrão</TableHead>
                <TableHead className="truncate max-w-[54px] sm:max-w-28 md:max-w-none">
                  Folga fixa
                </TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((col, i) => (
                <TableRow key={i}>
                  <TableCell className="truncate max-w-[85px] sm:max-w-28 md:max-w-none">
                    {col.name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {col.position}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {col.team}
                  </TableCell>
                  <TableCell>{col.shift}</TableCell>
                  <TableCell className="truncate max-w-[54px] sm:max-w-28 md:max-w-none">
                    {col.dayOff}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <div className="hidden lg:flex space-x-2">
                      <Button size="sm" variant="outline">
                        Editar
                      </Button>
                      <Button size="sm" variant="destructive">
                        Desativar
                      </Button>
                    </div>

                    <div className="lg:hidden">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => console.log("Editar", col.name)}
                          >
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => console.log("Desativar", col.name)}
                            className="text-red-600"
                          >
                            Desativar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
