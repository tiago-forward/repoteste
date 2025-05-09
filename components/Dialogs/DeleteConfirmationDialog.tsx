"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  collaboratorName: string;
}

export function DeleteConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  collaboratorName,
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar exclusão</DialogTitle>
          <DialogDescription>
            Deseja realmente excluir <strong>{collaboratorName}</strong>? Essa
            ação não poderá ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
          >
            Não
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="cursor-pointer"
          >
            Sim
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
