import React from "react";
import {
  RiBarChartHorizontalLine,
  RiImageFill,
  RiFilmFill,
} from "@remixicon/react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import FormMedia from "./form-media";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

function PostOptions() {
  return (
    <div className="w-full p-3 space-y-4">
      <div className="w-full text-sm flex gap-x-2 overflow-x-auto snap-mandatory snap-x">
        {Array.from({ length: 2 }).map((_, idx) => (
          <FormMedia key={idx} />
        ))}
      </div>
      <Separator />
      <div className="cursor-pointer hover:opacity-75 transition-opacity  ">
        <div className="flex gap-x-2 items-center justify-between mb-3">
          <p className="inline-flex items-center gap-x-2">
            <RiBarChartHorizontalLine className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground text-xs">
              Created a poll
            </span>
          </p>
          <span className="text-xs text-muted-foreground">Ends in 24H</span>
        </div>
        <div className="inline-flex flex-col pl-4">
          <p className="font-semibold">What is your favorite color?</p>
          <div className="inline-flex flex-wrap gap-2 my-5">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Badge key={idx} variant={idx == 2 ? "default" : "secondary"}>
                {idx == 2 && "✓"} A very long text for an option ? {idx + 1}
              </Badge>
            ))}
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            <span className="text-muted">Multiple</span> &middot; Anonymous
            &middot; Quiz Mode
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostOptions;
