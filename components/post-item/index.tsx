"use client";

import React, { useContext } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RiBarChartHorizontalLine, RiImage2Line } from "@remixicon/react";
import Link from "next/link";

import { PostContext } from "@/context/post";
import { Post } from "@/types/api-response";
import PostActions from "./action-bar";

import PostItemBody from "./body";

type Props = {
  data: Post;
};

function PostItem({ data }: Props) {
  const { currentUser, likedPosts } = useContext(PostContext);

  const isRepliedByCurrentUser =
    data.replies.length > 0 && data.replies[0].userId === currentUser?.id;

  const isRepliesHasMedia = data.replies.some(
    (reply) => (reply.media && reply.media.length > 0) || reply.poll
  );

  return (
    <Link href={`/users/${data.user.username}/posts/${data.id}`}>
      <div className="py-4 border-b">
        {/* <p className="pl-10 text-xs text-muted-foreground inline-flex items-center gap-2">
        <RiStarFill className="w-3 h-3 text-muted-foreground" />
        First Thread
      </p> */}
        <PostItemBody
          data={data}
          showReplyBar={isRepliedByCurrentUser && isRepliesHasMedia}
        />
        {data.quotePost && (
          <div className="ml-12 p-4 border border-muted my-2 rounded-md relative">
            <Link
              href={`/users/${data.quotePost.user.username}/posts/${data.quotePost.id}`}
              className="absolute inset-0 w-full h-full"
            />
            <PostItemBody data={data.quotePost} isQuoted />
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center h-full w-9">
            {isRepliedByCurrentUser && isRepliesHasMedia && (
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
                    {data.replies[0].media &&
                      data.replies[0].media.length > 0 && (
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
            isLiked={likedPosts?.includes(data.id) ?? false}
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
