"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { shifts } from "@/constants/shifts";
import { UserProps } from "@/types/user";
import { weekDays } from "@/constants/week-days";

interface ShiftsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collaborator: UserProps;
  onSave: (collaborator: any, updatedShifts: Record<string, string>) => void;
  days?: Date[];
}

export function ShiftsDialog({
  open,
  onOpenChange,
  collaborator,
  onSave,
  days = [],
}: ShiftsDialogProps) {
  const [selectedShifts, setSelectedShifts] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    if (collaborator && days.length > 0) {
      const initial: Record<string, string> = {};
      days.forEach((day) => {
        const key = day.toISOString();
        const dayName = weekDays[day.getDay()];
        initial[key] =
          dayName === collaborator.dayOff ? "Folga" : collaborator.shift;
      });
      setSelectedShifts(initial);
    }
  }, [collaborator, days]);

  const handleSelectShift = (dayKey: string, shift: string) => {
    setSelectedShifts((prev) => ({
      ...prev,
      [dayKey]: shift,
    }));
  };

  const handleSubmit = () => {
    onSave(collaborator, selectedShifts);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar turnos de {collaborator?.name}</DialogTitle>
          <DialogDescription>
            Escolha o turno para cada dia da semana atual
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {days.map((day) => {
            const key = day.toISOString();
            return (
              <div key={key} className="flex flex-col space-y-1">
                <Label>
                  {day.toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </Label>
                <div className="flex gap-2 flex-wrap">
                  {shifts.map((shift) => (
                    <Button
                      key={shift}
                      variant={
                        selectedShifts[key] === shift ? "default" : "outline"
                      }
                      onClick={() => handleSelectShift(key, shift)}
                    >
                      {shift}
                    </Button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <Button onClick={handleSubmit} className="w-full mt-4">
          Salvar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
