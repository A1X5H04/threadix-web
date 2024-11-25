import React from "react";
import { Skeleton } from "../ui/skeleton";

function PostFormSkeleton() {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-3 h-full relative">
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="absolute w-0.5 translate-y-[2.88rem] h-[calc(100%-2.88rem)] left-[16px]" />
        <div className="flex flex-col gap-y-2 w-full h-full">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-24 h-3" />
          <div className="flex gap-x-2 mt-6">
            <Skeleton className="size-6" />
            <Skeleton className="size-6" />
            <Skeleton className="size-6" />
            <Skeleton className="size-6" />
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex justify-center items-center h-full w-9">
          <Skeleton className="size-6 rounded-full" />
        </div>
        <Skeleton className="w-20 h-4" />
      </div>

      <div className="absolute bottom-0 w-full flex justify-between items-center max-w-2xl">
        <Skeleton className="w-52 h-7" />
        <Skeleton className="w-24 h-9" />
      </div>
    </div>
  );
}

export default PostFormSkeleton;
