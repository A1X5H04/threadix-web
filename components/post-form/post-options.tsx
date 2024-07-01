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
    <>
      <div className="w-full p-3 space-y-4">
        <div className="w-full text-sm flex gap-x-2 overflow-y-scroll">
          {Array.from({ length: 5 }).map((_, idx) => (
            <FormMedia key={idx} />
          ))}
        </div>
        <Separator />
        <div className="cursor-pointer">
          <div className="flex gap-x-2 items-center mb-3">
            <RiBarChartHorizontalLine className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground text-xs">
              Created a poll
            </span>
          </div>
          <div className="inline-flex flex-col pl-4 text-sm">
            <p className="font-medium">What is your favorite color?</p>
            <div className="inline-flex flex-wrap gap-x-2 my-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <Badge variant={idx == 2 ? "default" : "secondary"}>
                  Red {idx + 1}
                </Badge>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              Multiple &middot; Anonymous &middot; Ends in 24h
            </span>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground italic tracking-tight mt-3">
        *actual post will be displayed differently
      </p>
    </>
  );
}

export default PostOptions;
