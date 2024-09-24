import React, { useContext } from "react";
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
import { RegisteredVotes } from "@/types";
import { PostContext } from "@/context/post";

type Props = {
  data: typeof postData;
};

function PostItem({ data }: Props) {
  const { currentUserId, likedPosts } = useContext(PostContext);

  const isRepliedByCurrentUser =
    data.replies.length > 0 && data.replies[0]?.userId === currentUserId;
  return (
    // <Link href={`/@${data.user.username}/post/${data.id}`}>
    <div className="py-4 border-b">
      {/* <p className="p-2 text-xs text-muted-foreground inline-flex items-center gap-2">
        <RiStarFill className="w-3 h-3 text-muted-foreground" />
        First Thread
      </p> */}
      <PostItemBody
        data={data}
        isRepliedByCurrentUser={isRepliedByCurrentUser}
      />
      <div className="flex items-center gap-3">
        <div className="flex justify-center items-center h-full w-9">
          {isRepliedByCurrentUser && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="size-6 bg-muted grid place-items-center rounded-full border border-muted-foreground/10">
                    <RiBarChartHorizontalLine className="w-3 h-3 text-muted-foreground" />
                  </div>
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
          isLiked={likedPosts.includes(data.id)}
          counts={{
            likes: data.likesCount,
            replies: data.repliesCount,
            reposts: data.repostCount,
          }}
          postId={data.id}
        />
      </div>
    </div>
    // </Link>
  );
}

export default PostItem;
