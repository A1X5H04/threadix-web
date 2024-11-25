import React from "react";
import { Skeleton } from "../ui/skeleton";

function PostListSkeleton() {
  return (
    <>
      <div className="py-4 border-b">
        <div className="flex gap-x-3 h-fit">
          <Skeleton className="size-9 rounded-full min-w-9" />
          <div className="flex flex-col gap-y-1 w-full h-full">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-x-2 mb-2">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-14 h-3" />
              </div>
            </div>
            <Skeleton className="w-3/4 h-4 my-0.5" />
            <Skeleton className="w-1/5 h-4 my-0.5" />
            <Skeleton className="w-1/3 h-4 my-0.5" />
            <div className="inline-flex gap-x-3 h-60">
              <Skeleton className="w-full my-1" />
              <Skeleton className="w-80 my-1" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="inline-flex items-center gap-x-3 ml-12">
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-12 h-8" />
            <Skeleton className="w-12 h-8" />
            <Skeleton className="w-8 h-8" />
          </div>
        </div>
      </div>
      <div className="py-4 border-b">
        <div className="flex gap-x-3 h-fit">
          <Skeleton className="size-9 rounded-full min-w-9" />
          <div className="flex flex-col gap-y-1 w-full h-full">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-x-2 mb-2">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-14 h-3" />
              </div>
            </div>
            <Skeleton className="w-1/3 h-4 my-0.5" />
            <Skeleton className="w-full my-1 h-fit bg-transparent border">
              <div className="p-4">
                <div className="flex gap-x-3 h-fit">
                  <Skeleton className="size-20" />
                  <div className="flex gap-x-1 items-center">
                    {Array.from({ length: 58 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="min-w-1"
                        style={{
                          height: `${Math.floor(Math.random() * 5) + 1}rem`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between mt-4 w-full">
                  <div className="inline-flex gap-x-1">
                    <Skeleton className="w-3 h-3" />
                    <Skeleton className="w-20 h-3" />
                    <Skeleton className="w-10 h-3" />
                  </div>
                  <Skeleton className="w-14 h-3" />
                </div>
              </div>
            </Skeleton>
            <Skeleton className="w-80 my-1" />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="inline-flex items-center gap-x-3 ml-12">
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-12 h-8" />
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-8 h-8" />
          </div>
        </div>
      </div>
      <div className="py-4 border-b">
        <div className="flex gap-x-3 h-fit">
          <Skeleton className="size-9 rounded-full min-w-9" />
          <div className="flex flex-col gap-y-1 w-full h-full">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-x-2 mb-2">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-14 h-3" />
              </div>
            </div>
            <Skeleton className="w-1/3 h-4 my-0.5" />
            <Skeleton className="w-full my-1 h-fit bg-transparent border">
              <div className="p-4">
                <div className="flex gap-x-3 h-fit">
                  <Skeleton className="size-5 rounded-full min-w-2" />
                  <div className="flex flex-col gap-y-1 w-full h-full">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-x-2 mb-2">
                        <Skeleton className="w-24 h-4" />
                        <Skeleton className="w-14 h-3" />
                      </div>
                    </div>
                    <Skeleton className="w-3/4 h-4 my-0.5" />
                    <Skeleton className="w-1/5 h-4 my-0.5" />
                    <Skeleton className="w-1/3 h-4 my-0.5" />
                  </div>
                </div>
              </div>
            </Skeleton>
            <Skeleton className="w-80 my-1" />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="inline-flex items-center gap-x-3 ml-12">
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-12 h-8" />
            <Skeleton className="w-12 h-8" />
            <Skeleton className="w-8 h-8" />
          </div>
        </div>
      </div>
      <div className="py-4 border-b">
        <div className="flex gap-x-3 relative h-fit">
          <Skeleton className="size-9 rounded-full min-w-9" />

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
      <div className="py-4 border-b">
        <div className="flex gap-x-3 relative h-fit">
          <Skeleton className="size-9 rounded-full" />
          <Skeleton className="absolute w-0.5 translate-y-[2.88rem] h-[calc(100%-2.88rem)] left-[18px]" />
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
        <div className="flex items-center gap-3 mt-2">
          <div className="flex justify-center items-center h-full w-9">
            <Skeleton className="size-6  rounded-full" />
          </div>
          <div className="inline-flex items-center gap-x-3">
            <Skeleton className="w-11 h-7" />
            <Skeleton className="w-11 h-7" />
            <Skeleton className="w-11 h-7" />
            <Skeleton className="w-7 h-7" />
          </div>
        </div>
      </div>
    </>
  );
}

export default PostListSkeleton;
