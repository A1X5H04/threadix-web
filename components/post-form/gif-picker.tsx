"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import GifPicker from "gif-picker-react";
import "../../app/globals.css";
import { useIsClient } from "@/hooks/use-isclient";

interface GifPickerProps {
  children: React.ReactNode;
}

function GifPickerPopover({ children }: GifPickerProps) {
  const isClient = useIsClient();

  if (!isClient) return null;
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
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
