"use client";

import React from "react";

import Link from "next/link";

import { Post } from "@/types/api-responses/post/single";
import PostActions from "@/components/post/item/action-bar";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";

import PostContent from "@/components/post/item/content";
import PostPoll from "@/components/post/item/poll";
import PostMedia from "@/components/post/item/media";
import { Badge } from "@/components/ui/badge";
import { RiVerifiedBadgeFill } from "@remixicon/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppStore } from "@/hooks/use-store";
import VerifiedBadge from "@/components/verified-badge";

type Props = { data: Post; showReplyBar?: boolean };

function PostItem({ data, showReplyBar }: Props) {
  const { currentUser } = useAppStore();

  //   const isRepliedByCurrentUser =
  //     data.replies.length > 0 && data.replies[0].userId === currentUser?.id;

  //   const isRepliesHasMedia = data.replies.some(
  //     (reply) => (reply.media && reply.media.length > 0) || reply.poll
  //   );

  return (
    <Link href={`/users/${data.user.username}/posts/${data.id}`}>
      <div className="py-1">
        {/* <p className="pl-10 text-xs text-muted-foreground inline-flex items-center gap-2">
        <RiStarFill className="w-3 h-3 text-muted-foreground" />
        First Thread
      </p> */}

        <div className="flex gap-x-3 relative h-fit">
          <Avatar className="size-9 border">
            <AvatarImage src={data.user.avatar ?? undefined} />
            <AvatarFallback className="uppercase">
              {data.user.username.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {showReplyBar && (
            <Separator
              className="absolute w-0.5 translate-y-[2.75rem] h-full left-[18px] bg-muted"
              orientation="vertical"
            />
          )}
          <div className="flex flex-col gap-y-1 w-full h-full">
            <div className="flex items-start justify-between">
              <div className="inline-flex items-center gap-x-2">
                <h3 className="font-semibold text-sm">{data.user.username}</h3>
                {data.user.isVerified && (
                  <VerifiedBadge userName={data.user.username} />
                )}
                •
                <p className="text-xs font-semibold text-muted-foreground">
                  {formatDate(new Date(data.createdAt))}
                </p>
              </div>
            </div>
            <PostContent content={data.content} />
            {data.media.length > 0 && <PostMedia media={data.media} />}
            {data.poll && (
              <PostPoll
                poll={data.poll}
                isCurrentUser={currentUser?.id === data.userId}
              />
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 pl-9 pt-2">
          <PostActions
            data={data}
            counts={{
              likes: data.likesCount,
              replies: data.repliesCount,
              reposts: data.repostCount,
            }}
            postId={data.id}
          />
        </div>
      </div>
    </Link>
  );
}

export default PostItem;
