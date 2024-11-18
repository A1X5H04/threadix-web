"use client";

import React, { useContext } from "react";

import Link from "next/link";

import { PostContext } from "@/context/post";
import { Post } from "@/types/api-response";
import PostActions from "../action-bar";
import PostItemBody from "../body";
import { formatDate } from "@/lib/format";
import PostContent from "../content";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import PostPoll from "../poll";
import PostMedia from "../media/index";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RiMore2Line, RiMoreLine } from "@remixicon/react";

type Props = {
  data: Post;
};

function PostItem({ data }: Props) {
  const { currentUser, likedPosts } = useContext(PostContext);

  return (
    <div className="p-4 border-b space-y-2">
      {/* <p className="pl-10 text-xs text-muted-foreground inline-flex items-center gap-2">
        <RiStarFill className="w-3 h-3 text-muted-foreground" />
        First Thread
      </p> */}
      <div className="flex items-start justify-between">
        <div className="flex gap-x-3 relative h-fit">
          <Avatar className="size-9 border">
            <AvatarImage src={data.user.avatar ?? undefined} />
            <AvatarFallback className="uppercase">
              {data.user.username.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="inline-flex items-center gap-x-2">
            <h3 className="font-semibold text-sm">{data.user.username}</h3>
            &middot;
            <p className="text-xs font-semibold text-muted-foreground">
              {formatDate(new Date(data.createdAt))}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <RiMoreLine className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-y-1 w-full h-full">
        <PostContent content={data.content} />
        {data.media.length > 0 && <PostMedia media={data.media} />}
        {data.poll && (
          <PostPoll
            poll={data.poll}
            isCurrentUser={currentUser?.id === data.userId}
          />
        )}
      </div>

      {data.quotePost && (
        <div className="ml-12 p-4 border border-muted my-2 rounded-md relative">
          <Link
            href={`/users/${data.quotePost.user.username}/posts/${data.quotePost.id}`}
            className="absolute inset-0 w-full h-full"
          />
          <PostItemBody data={data.quotePost} isQuoted />
        </div>
      )}
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
  );
}

export default PostItem;