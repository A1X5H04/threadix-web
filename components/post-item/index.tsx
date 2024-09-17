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
import { RiBarChartHorizontalLine, RiImage2Line } from "@remixicon/react";

type Props = {
  data: typeof postData;
};

function PostItem({ data }: Props) {
  return (
    <div className="py-4 border-b">
      {/* <p className="p-2 text-xs text-muted-foreground inline-flex items-center gap-2">
        <RiStarFill className="w-3 h-3 text-muted-foreground" />
        First Thread
      </p> */}
      <PostItemBody
        data={data}
        isReplied={
          data.replies.length > 0 && data.replies[0]?.userId === data.user.id
        }
      />
      <div className="flex items-center gap-3">
        <div className="flex justify-center items-center h-full w-9">
          {data.replies.length > 0 &&
            data.replies[0]?.userId === data.user.id && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="size-5">
                      <AvatarImage src={data.user.avatar} />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent className="inline-flex items-center gap-x-2">
                    {data.replies[0].poll && (
                      <>
                        <RiBarChartHorizontalLine className="w-3 h-3 text-muted-foreground" />
                        <p>
                          Replied this post with a&nbsp;
                          <span className="font-bold">poll</span>
                        </p>
                      </>
                    )}
                    {data.replies[0].media.length > 0 && (
                      <>
                        <RiImage2Line className="w-3 h-3 text-muted-foreground" />
                        <p>
                          Replied this post with a&nbsp;
                          <span className="font-bold">media</span>
                        </p>
                      </>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
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
