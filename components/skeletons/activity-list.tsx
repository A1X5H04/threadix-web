import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

function ActivityListSkeleton() {
  return (
    <div className="py-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <>
          <div className="flex gap-x-2 w-full">
            <div className="relative">
              <Skeleton className="size-12 rounded-full" />
              <div className="absolute bottom-0 right-0 size-4 bg-background rounded-full p-0.5">
                <Skeleton className="w-full h-full" />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="inline-flex gap-x-2">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-14 h-3" />
              </div>
              <Skeleton className="w-10/12 h-5 mt-2" />
            </div>
          </div>
          <Separator className="my-4" />
        </>
      ))}
      <div className="py-4 border-b">
        <div className="flex gap-x-3 relative h-fit">
          <div className="relative h-fit">
            <Skeleton className="size-12 rounded-full" />
            <div className="absolute bottom-0 right-0 size-4 bg-background rounded-full p-0.5">
              <Skeleton className="w-full h-full" />
            </div>
          </div>

          <div className="flex flex-col gap-y-1 w-full h-full">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-x-2">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-20 h-3" />
              </div>
            </div>
            <Skeleton className="w-3/4 h-4 my-0.5" />

            <Skeleton className="w-2/4 h-4 my-0.5" />
            <Skeleton className="w-full h-4 my-0.5" />
            <Skeleton className="w-1/4 h-4 my-0.5" />
          </div>
        </div>

        <div className="inline-flex items-center gap-x-3 ml-14 mt-2">
          <Skeleton className="w-11 h-7" />
          <Skeleton className="w-11 h-7" />
          <Skeleton className="w-11 h-7" />
          <Skeleton className="w-7 h-7" />
        </div>
      </div>
      <div className="py-2 border-b mb-4">
        <div className="flex gap-x-3 ">
          <div className="relative h-fit">
            <Skeleton className="size-12 rounded-full" />
            <div className="absolute bottom-0 right-0 size-4 bg-background rounded-full p-0.5">
              <Skeleton className="w-full h-full" />
            </div>
          </div>

          <div className="flex flex-col gap-y-1 w-full h-full">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-x-2 mb-2">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-14 h-3" />
              </div>
            </div>
            <Skeleton className="w-3/4 h-4 my-0.5" />
            <Skeleton className="w-1/5 h-4 my-0.5" />

            <Skeleton className="relative flex items-center justify-end w-full h-8 my-1 border bg-transparent px-4">
              <Skeleton className="absolute w-1/3 h-full inset-0 rounded-sm" />
              <Skeleton className="w-8 h-3" />
            </Skeleton>
            <Skeleton className="flex items-center justify-between w-full h-8 my-1 border bg-transparent px-4">
              <Skeleton className="w-24 h-3" />
              <Skeleton className="w-8 h-3" />
            </Skeleton>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="inline-flex items-center gap-x-3 ml-12">
            <Skeleton className="w-12 h-8" />
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-8 h-8" />
          </div>
        </div>
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <>
          <div className="flex gap-x-2 w-full">
            <div className="relative">
              <Skeleton className="size-12 rounded-full" />
              <div className="absolute bottom-0 right-0 size-4 bg-background rounded-full p-0.5">
                <Skeleton className="w-full h-full" />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="inline-flex gap-x-2">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-14 h-3" />
              </div>
              <Skeleton className="w-10/12 h-5 mt-2" />
            </div>
          </div>
          <Separator className="my-4" />
        </>
      ))}
    </div>
  );
}

export default ActivityListSkeleton;
