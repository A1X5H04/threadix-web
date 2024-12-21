import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import VerifiedBadge from "@/components/verified-badge";
import FollowButton from "@/components/profile/follow-button";
import { RiArrowRightSLine } from "@remixicon/react";
import PostListSkeleton from "@/components/skeletons/post-list";
import { Separator } from "@/components/ui/separator";

function ExplorePageSkeleton() {
  return (
    <div>
      <div className="inline-flex items-center gap-x-2">
        <Skeleton className="size-4 rounded-full" />
        <Skeleton className="w-24 h-4" />
      </div>
      <div className="mt-4 mb-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-x-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex justify-between w-full py-2">
              <div className="inline-flex flex-col gap-y-2">
                <div className="inline-flex items-center gap-x-2">
                  <Skeleton className="w-20 h-4" />
                </div>
                <Skeleton className="w-16 h-3" />
              </div>
              <RiArrowRightSLine className="text-muted" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-x-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="relative size-48 border rounded-md grid place-items-center flex-shrink-0"
          >
            <div className="flex flex-col items-center gap-y-2">
              <Skeleton className="size-16 rounded-full" />
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-24 h-3" />
              <Skeleton className="w-16 h-9 border" />
            </div>
          </div>
        ))}
      </div>
      <Separator className="my-7" />
      <div className="inline-flex items-center gap-x-2">
        <Skeleton className="size-4 rounded-full" />
        <Skeleton className="w-24 h-4" />
      </div>
      <PostListSkeleton />
    </div>
  );
}

export default ExplorePageSkeleton;
