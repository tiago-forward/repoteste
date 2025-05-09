"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { shifts } from "@/constants/shifts";
import { UserProps } from "@/types/user";

const weekDays = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

interface CollaboratorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collaborator: UserProps | null;
  onSave: (data: UserProps) => void;
}

export function CollaboratorDialog({
  open,
  onOpenChange,
  collaborator,
  onSave,
}: CollaboratorDialogProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [position, setPosition] = useState<string>("Front");
  const [team, setTeam] = useState<string>("Suporte");
  const [dayOff, setDayOff] = useState<string>("Domingo");
  const [selectedShifts, setSelectedShift] = useState<string>("");

  const initialState: UserProps = {
    name: "",
    email: "",
    password: "",
    position: "Front",
    team: "Suporte",
    shift: "",
    dayOff: "Domingo",
  };

  useEffect(() => {
    if (collaborator) {
      setName(collaborator.name || "");
      setEmail(collaborator.email || "");
      setPassword(collaborator.password || "");
      setPosition(collaborator.position || "");
      setTeam(collaborator.team || "");
      setSelectedShift(collaborator.shift || "");
      setDayOff(collaborator.dayOff || "");
    } else {
      setName(initialState.name);
      setEmail(initialState.email);
      setPassword(initialState.password);
      setPosition(initialState.position);
      setTeam(initialState.team);
      setSelectedShift(initialState.shift);
      setDayOff(initialState.dayOff);
    }
  }, [collaborator]);

  const handleToggleShift = (shift: string) => {
    setSelectedShift((prev) => (prev === shift ? "" : shift));
  };

  const handleSubmit = () => {
    if (
      !name ||
      !email ||
      !password ||
      !position ||
      !team ||
      !selectedShifts ||
      !dayOff
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    onSave({
      name,
      email,
      password,
      position,
      team,
      shift: selectedShifts,
      dayOff,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {collaborator ? "Editar Colaborador" : "Novo Colaborador"}
          </DialogTitle>
          <DialogDescription>Preencha os campos abaixo</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Cargo</Label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Selecione o cargo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Front">Front</SelectItem>
                <SelectItem value="Back">Back</SelectItem>
                <SelectItem value="Jogos">Jogos</SelectItem>
                <SelectItem value="Tester">Tester</SelectItem>
                <SelectItem value="Supervisor I">Supervisor I</SelectItem>
                <SelectItem value="Supervisor II">Supervisor II</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Equipe</Label>
            <Select value={team} onValueChange={setTeam}>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Selecione a equipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Suporte">Suporte</SelectItem>
                <SelectItem value="Atendimento">Atendimento</SelectItem>
                <SelectItem value="Segurança">Segurança</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Turnos</Label>
            <div className="flex flex-wrap gap-2">
              {shifts.map((shift) => (
                <Button
                  key={shift}
                  variant={
                    selectedShifts.includes(shift) ? "default" : "outline"
                  }
                  onClick={() => handleToggleShift(shift)}
                  className="cursor-pointer"
                >
                  {shift}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Folga fixa</Label>
            <Select value={dayOff} onValueChange={setDayOff}>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Selecione a folga" />
              </SelectTrigger>
              <SelectContent>
                {weekDays.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSubmit} className="w-full mt-4 cursor-pointer">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
