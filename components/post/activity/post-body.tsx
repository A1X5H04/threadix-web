import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import VerifiedBadge from "@/components/verified-badge";
import { formatRelativeDate } from "@/lib/format";
import Content from "@/components/post/item/content";

import React from "react";
import PostPoll from "../item/poll";
import { Poll } from "@/types/api-responses/common";

interface PostBodyProps {
  user: {
    name: string;
    avatar: string | null;
    username: string;
    isVerified: boolean;
  };
  content: string;
  createdAt: string;
  tabValue: "post" | "poll";
  pollData: Poll | null;
}

function PostBody({
  user,
  content,
  createdAt,
  tabValue,
  pollData,
}: PostBodyProps) {
  return (
    <div className="border border-muted px-2.5 py-3 rounded-md pointer-events-none">
      <div className="flex gap-x-1 items-center mb-2">
        <Avatar className="size-5">
          <AvatarImage src={user.avatar ?? undefined} />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <h4 className="font-bold text-sm mr-1">{user.username}</h4>{" "}
        {user.isVerified && (
          <VerifiedBadge userName={user.name} iconClassName="size-3.5" />
        )}
        •
        <p className="text-xs text-muted-foreground">
          {formatRelativeDate(new Date(createdAt))}
        </p>
      </div>
      {tabValue === "poll" && pollData && (
        <div className="p-1">
          <PostPoll poll={pollData} isCurrentUser={true} />
        </div>
      )}
      {tabValue === "post" && <Content content={content} />}
    </div>
  );
}

export default PostBody;
