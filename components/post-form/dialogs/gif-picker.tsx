"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import GifPicker from "gif-picker-react";
import "@/app/globals.css";
import { useIsClient } from "@/hooks/use-isclient";

interface GifPickerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function GifPickerPopover({ open, setOpen }: GifPickerProps) {
  const isClient = useIsClient();

  if (!isClient) return null;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverContent className="p-0 w-fit">
        <GifPicker
          onGifClick={(gif) => {
            console.log(gif);
          }}
          tenorApiKey="AIzaSyDFPshK0fSveptnAxuqSHrKROQBPSO5nFk"
        />
      </PopoverContent>
    </Popover>
  );
}

export default GifPickerPopover;
