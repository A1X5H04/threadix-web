"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import GifPicker from "gif-picker-react";
import "@/app/globals.css";
import { useIsClient } from "@/hooks/use-isclient";
import { Button } from "@/components/ui/button";
import { RiFileGifLine } from "@remixicon/react";
import { postMediaSchema } from "@/types/schemas";
import * as z from "zod";

function GifPickerPopover({
  setMedia,
}: {
  setMedia: (medias: z.infer<typeof postMediaSchema>) => void;
}) {
  const isClient = useIsClient();

  if (!isClient) return null;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <RiFileGifLine className="w-4 h-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-fit">
        <GifPicker
          onGifClick={(gif) => {
            console.log("Gif", gif);
          }}
          tenorApiKey="AIzaSyDFPshK0fSveptnAxuqSHrKROQBPSO5nFk"
        />
      </PopoverContent>
    </Popover>
  );
}

export default GifPickerPopover;
