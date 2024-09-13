import React from "react";
import PostContent from "./content";
import PostMedia from "./media";
import { formatDate } from "@/lib/format";
import { RiMore2Fill } from "@remixicon/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

function PostItemBody({ data }: { data: any }) {
  return (
    <div className="flex gap-x-3 relative h-fit">
      <Avatar className="size-9 border">
        <AvatarImage src={data.user.avatar} />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      <Separator
        className="absolute w-0.5 translate-y-[2.88rem] h-[calc(100%-2.88rem)] left-[18px] bg-muted"
        orientation="vertical"
      />
      <div className="flex flex-col gap-y-1 w-full h-full">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-x-2">
            <h3 className="font-semibold text-sm">{data.user.username}</h3>
            &middot;
            <p className="text-xs font-semibold text-muted-foreground">
              {formatDate(new Date(data.createdAt))}
            </p>
          </div>
        </div>
        <PostContent content={data.content} />
        <PostMedia media={data.media} />
      </div>
    </div>
  );
}

export default PostItemBody;
