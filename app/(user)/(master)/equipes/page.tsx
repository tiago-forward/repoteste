"use client";

import { useMemo, useState } from "react";
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
import { CollaboratorDialog } from "@/components/Dialogs/CollaboratorDialog";
import { UserProps } from "@/types/user";
import { DeleteConfirmationDialog } from "@/components/Dialogs/DeleteConfirmationDialog";

export default function Equipes() {
  const [selectedTeam, setSelectedTeam] = useState("Todos");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] =
    useState<UserProps | null>(null);

  const filtered = useMemo(() => {
    return selectedTeam === "Todos"
      ? collaborators
      : collaborators.filter((col) => col.team === selectedTeam);
  }, [selectedTeam]);

  const handleEditCollaborator = (collaborator: UserProps) => {
    setSelectedCollaborator(collaborator);
    setIsDialogOpen(true);
  };

  const handleAddCollaborator = () => {
    setSelectedCollaborator(null);
    setIsDialogOpen(true);
  };

  const handleSaveCollaborator = (data: UserProps) => {
    console.log("Salvar colaborador:", data);
    setIsDialogOpen(false);
  };

  const handleDeleteCollaborator = (collaborator: UserProps) => {
    console.log("Excluir colaborador:", collaborator.name);
    setSelectedCollaborator(collaborator);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCollaborator) {
      // lógica de exclusão aqui, por exemplo:
      // deleteCollaboratorById(selectedCollaborator.email); // ou ID
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Equipes</h2>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-muted-foreground">Equipe:</span>
        <Select onValueChange={setSelectedTeam} defaultValue="Todos">
          <SelectTrigger className="w-[180px] cursor-pointer">
            <SelectValue placeholder="Selecionar equipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todos</SelectItem>
            <SelectItem value="Suporte">Suporte</SelectItem>
            <SelectItem value="Segurança">Segurança</SelectItem>
            <SelectItem value="Atendimento">Atendimento</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleAddCollaborator} className="cursor-pointer">
          Adicionar Colaborador
        </Button>
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
                <TableRow key={col.name}>
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
                  <TableCell>{col.dayOff}</TableCell>
                  <TableCell>
                    <div className="hidden lg:flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditCollaborator(col)}
                        className="cursor-pointer"
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="cursor-pointer"
                        onClick={() => handleDeleteCollaborator(col)}
                      >
                        Excluir
                      </Button>
                    </div>
                    <div className="lg:hidden">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer"
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEditCollaborator(col)}
                            className="cursor-pointer"
                          >
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 cursor-pointer"
                            onClick={() => handleDeleteCollaborator(col)}
                          >
                            Excluir
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

      <CollaboratorDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        collaborator={selectedCollaborator}
        onSave={handleSaveCollaborator}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        collaboratorName={selectedCollaborator?.name || ""}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
