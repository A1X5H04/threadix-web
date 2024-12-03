// useConfirm.tsx
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React, { useState, useCallback, MouseEventHandler } from "react";

interface ConfirmOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  variant?: "default" | "destructive";
}

const useConfirmDialog = (): [
  openDialog: (option: ConfirmOptions) => void,
  ConfirmDialog: React.FC
] => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});

  const openConfirm = useCallback((options: ConfirmOptions) => {
    setOptions(options);
    setIsOpen(true);
  }, []);

  const closeConfirm = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (e) {
        e.stopPropagation();
      }
      setIsOpen(false);
    },
    []
  );

  const handleConfirm = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (options.onConfirm) {
        options.onConfirm();
      }
      closeConfirm(e);
    },
    [options, closeConfirm]
  );

  const ConfirmDialog = () => (
    <AlertDialog open={isOpen} onOpenChange={() => closeConfirm()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{options.title || "Confirm"}</AlertDialogTitle>
          <AlertDialogDescription>
            {options.description || "Are you sure?"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={(e) => closeConfirm(e)}>
            {options.cancelText || "Cancel"}
          </Button>
          <Button
            variant={options.variant || "default"}
            onClick={handleConfirm}
          >
            {options.confirmText || "Confirm"}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [openConfirm, ConfirmDialog];
};

export default useConfirmDialog;
