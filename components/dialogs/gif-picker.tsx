import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from "../ui/dialog";
import GifPicker, { TenorImage } from "gif-picker-react";

interface GifPickerDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onGifClick: (gif: TenorImage) => void;
}

function GifPickerDialog({
  isOpen,
  setIsOpen,
  onGifClick,
}: GifPickerDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-2xl">
        <DialogTitle>Pick up your favourite meme</DialogTitle>
        <GifPicker
          width="100%"
          height="calc(100vh - 350px)"
          onGifClick={onGifClick}
          tenorApiKey={process.env.NEXT_PUBLIC_TENOR_API_KEY!}
        />
      </DialogContent>
    </Dialog>
  );
}

export default GifPickerDialog;
