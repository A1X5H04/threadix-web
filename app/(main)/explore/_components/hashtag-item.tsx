import { Button } from "@/components/ui/button";
import VerifiedBadge from "@/components/verified-badge";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tag, User } from "@/types/api-responses/common";
import Link from "next/link";
import { RiEye2Fill, RiEyeFill } from "@remixicon/react";

function HashTagItem({ tag }: { tag: Tag }) {
  return (
    <div className="flex items-center gap-x-4">
      <div className="flex items-center justify-between w-full py-2">
        <div className="inline-flex flex-col">
          <p className="font-bold text-sm">{tag.name}</p>
          <div className="inline-flex items-center gap-x-1">
            <Avatar className="size-4 mr-1">
              <AvatarImage src={tag.user.avatar ?? undefined} />
              <AvatarFallback>
                {tag.user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {tag.user.username}
            </span>
            {tag.postsCount && (
              <>
                &middot;
                <span className="text-xs text-muted-foreground">
                  {tag.postsCount} Posts
                </span>
              </>
            )}
          </div>
        </div>
        <Link href={`/explore/tags/${tag.id}`}>
          <Button
            variant="secondary"
            size="sm"
            className="gap-x-2 font-semibold"
          >
            View posts
            <RiEyeFill className="w-4 h-4 text-muted-foreground" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HashTagItem;
