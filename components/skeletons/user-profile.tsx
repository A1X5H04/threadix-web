import React from "react";
import { Skeleton } from "../ui/skeleton";

function UserProfileSkeleton() {
  return (
    <div className="w-full p-5">
      <div className="flex items-center justify-between">
        <div className="inline-flex flex-col">
          <div className="inline-flex gap-x-2 items-center">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-6 h-6" />
          </div>
          <Skeleton className="w-20 h-4 mt-2" />
        </div>
        <div>
          <Skeleton className="w-16 h-16 rounded-full" />
        </div>
      </div>
      <div className="mt-3.5 space-y-3">
        <div className="space-y-2">
          <Skeleton className="w-1/2 h-3" />
          <Skeleton className="w-1/4 h-3" />
          <Skeleton className="w-1/3 h-3" />
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <div className="inline-flex items-center gap-x-2">
            <Skeleton className="w-6 h-4  " />
            <Skeleton className="w-16 h-4" />
          </div>
          <Skeleton className="w-8 h-8" />
        </div>
      </div>
      <Skeleton className="w-full h-9 mt-6" />
      <div className="mt-4">
        <Skeleton className=" grid grid-cols-3 gap-x-2 w-full p-2 px-4">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
        </Skeleton>
      </div>
    </div>
  );
}

export default UserProfileSkeleton;
