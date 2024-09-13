import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import PostActions from "./action-bar";
import { postData } from "@/data";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PostItemBody from "./body";

type Props = {
  data: (typeof postData)[number];
};

function PostItem({ data }: Props) {
  return (
    <div className="py-4 border-b">
      {/* <p className="p-2 text-xs text-muted-foreground inline-flex items-center gap-2">
        <RiStarFill className="w-3 h-3 text-muted-foreground" />
        First Thread
      </p> */}
      <PostItemBody data={data} />
      <div className="flex items-center gap-3">
        <div className="flex justify-center items-center h-full w-9">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar className="size-5">
                  <AvatarImage src="https://i.pinimg.com/236x/f1/97/0a/f1970a8b5bdf920a2e1977a28e2e8c77.jpg" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>Replied to thier own post</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
      <div className="pl-10"></div>
    </div>
  );
}

export default PostItem;
