import React, { useContext } from "react";
import PostContent from "./content";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { formatDate } from "@/lib/format";
import PostPoll from "./poll/index";
import PostMedia from "./media/index";

import { PostContext } from "@/context/post";
import { Post } from "@/types/api-responses/post/single";

import { cn } from "@/lib/utils";
import PostDropdown from "./post-dropdown";

function PostItemBody({
  data,
  showReplyBar,
  isQuoted,
}: {
  data: Post;
  showReplyBar?: boolean;
  isQuoted?: boolean;
}) {
  const { currentUser } = useContext(PostContext);

  return (
    <div
      className={cn(
        `flex gap-x-3 relative h-fit`,
        isQuoted && "pointer-events-none"
      )}
    >
      {!isQuoted && (
        <Avatar className="size-9 border">
          <AvatarImage src={data.user.avatar ?? undefined} />
          <AvatarFallback className="uppercase">
            {data.user.username.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}
      {showReplyBar && (
        <Separator
          className="absolute w-0.5 translate-y-[2.88rem] h-[calc(100%-2.88rem)] left-[18px] bg-muted"
          orientation="vertical"
        />
      )}
      <div className="flex flex-col gap-y-1 w-full h-full">
        <div className="flex items-start justify-between">
          <div className="inline-flex items-center gap-x-2">
            {isQuoted && (
              <Avatar className="size-6 border">
                <AvatarImage src={data.user.avatar ?? undefined} />
                <AvatarFallback className="uppercase text-xs">
                  {data.user.username.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            <h3 className="font-semibold text-sm">{data.user.username}</h3>
            &middot;
            <p className="text-xs font-semibold text-muted-foreground">
              {formatDate(new Date(data.createdAt))}
            </p>
          </div>
          <PostDropdown isCurrentUser={currentUser?.id === data.userId} />
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
  );
}

export default PostItemBody;
