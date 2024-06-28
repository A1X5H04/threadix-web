import React from "react";
import { RiChatQuoteFill, RiVerifiedBadgeFill } from "@remixicon/react";
import PostContent from "./post-content";
import PostPoll from "./post-poll";
import { formatDate } from "@/lib/format";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function PostQuoted({ data }) {
  return (
    <div className="space-y-4 border-t py-4">
      <div className="w-full flex justify-between items-center text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-x-2">
          <RiChatQuoteFill className="w-3 h-3 text-muted-foreground" />
          <p>Quoted this post</p>
        </span>
        <p>Click to view the quoted post</p>
      </div>
      <div className="w-full p-4 border rounded-md bg-card space-y-2 cursor-pointer">
        <div className="inline-flex items-start gap-x-2 mb-4">
          <Avatar className="w-9 h-9">
            <AvatarImage src="https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Felix" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <div className="inline-flex flex-col">
            <p className="text-sm font-medium inline-flex items-center gap-x-1">
              {data.user.username}

              <RiVerifiedBadgeFill className="w-3.5 h-3.5 " />
            </p>
            <p className="text-muted-foreground text-xs">
              {formatDate(new Date(data.createdAt))}&nbsp;·&nbsp;
              <span className="text-gray-300">Pune Maharashtra</span>
            </p>
          </div>
        </div>

        <blockquote className="flex-1 space-y-4">
          {data.poll.question && <PostContent content={data.content} />}
          {data.poll ? (
            <PostPoll data={data} />
          ) : (
            <PostContent content={data.content} />
          )}
        </blockquote>
      </div>
    </div>
  );
}
