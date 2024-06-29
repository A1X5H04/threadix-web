import React from "react";
import {
  RiBarChartHorizontalLine,
  RiImageFill,
  RiFilmFill,
} from "@remixicon/react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

function PostOptions() {
  return (
    <>
      <div className="w-full border rounded-md p-3 space-y-4">
        <div className="text-sm">
          <div className="flex gap-x-2 items-center mb-3">
            <RiFilmFill className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground text-xs">
              Attached Media
            </span>
          </div>
          <div className="flex gap-x-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div className="relative w-24 h-24 bg-gray-200 rounded-md group">
                <div className="absolute inset-0 flex items-center justify-center w-full h-full z-[1] bg-black bg-opacity-75 group-hover:opacity-0 transition-opacity">
                  <RiImageFill className="w-8 h-8 text-muted-foreground" />
                </div>
                <Image
                  src="https://images.unsplash.com/photo-1542397284385-6010376c5337?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  fill
                  alt="Post Image"
                  className="rounded-md object-cover"
                />
              </div>
            ))}
          </div>
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
