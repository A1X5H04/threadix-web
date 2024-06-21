"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import GifPicker from "gif-picker-react";
import "../app/globals.css";

interface GifPickerProps {
  children: React.ReactNode;
}

function GifPickerPopover({ children }: GifPickerProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-fit">
        <GifPicker tenorApiKey="AIzaSyDFPshK0fSveptnAxuqSHrKROQBPSO5nFk" />
      </PopoverContent>
    </Popover>
  );
}

export default GifPickerPopover;
