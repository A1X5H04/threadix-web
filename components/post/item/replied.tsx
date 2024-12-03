"use client";

import React, { useContext } from "react";

import Link from "next/link";

import { Post, ReplyPost } from "@/types/api-responses/post/single";
import PostActions from "./action-bar";
import PostItemBody from "./body";
import { formatDate } from "@/lib/format";
import PostContent from "./content";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import PostPoll from "./poll";
import PostMedia from "./media/index";

import PostDropdown from "./post-dropdown";
import VerifiedBadge from "../../verified-badge";
import { useAppStore } from "@/hooks/use-store";
import { Separator } from "@/components/ui/separator";

type ReplyPostItemProps = {
  data: ReplyPost;
};

function ReplyPostItem({ data }: ReplyPostItemProps) {
  const { currentUser } = useAppStore();

  return (
    <div className="p-4 border-b space-y-2">
      <Link
        href={`/users/${data.parentPost.user.username}/posts/${data.parentPost.id}`}
      >
        <div className="flex gap-x-3 relative h-fit mb-2">
          <Avatar className="size-9 border">
            <AvatarImage src={data.parentPost.user.avatar ?? undefined} />
            <AvatarFallback className="uppercase">
              {data.parentPost.user.username.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <Separator
            className="absolute w-0.5 translate-y-[2.88rem] h-[calc(100%-2.88rem)] left-[18px] bg-muted"
            orientation="vertical"
          />
          <div className="flex flex-col gap-y-1 w-full h-full">
            <div className="flex items-start justify-between">
              <div className="inline-flex items-center gap-x-2">
                <h3 className="font-semibold text-sm">
                  {data.parentPost.user.username}
                </h3>
                •
                <p className="text-xs font-semibold text-muted-foreground">
                  {formatDate(new Date(data.parentPost.createdAt))}
                </p>
              </div>

              <PostDropdown
                userData={{
                  id: data.user.id,

                  username: data.user.username,
                }}
                replyPermissions={data.replyPermissions}
                postId={data.id}
                isCurrentUser={currentUser?.id === data.parentPost.userId}
              />
            </div>
            <PostContent content={data.parentPost.content} />
            {data.parentPost.media.length > 0 && (
              <PostMedia media={data.parentPost.media} />
            )}
            {data.parentPost.poll && (
              <PostPoll
                poll={data.parentPost.poll}
                isCurrentUser={currentUser?.id === data.parentPost.userId}
              />
            )}
            {data.parentPost.quotePost && (
              <div className="p-4 border border-muted my-2 rounded-md relative">
                <Link
                  href={`/users/${data.parentPost.quotePost.user.username}/posts/${data.parentPost.quotePost.id}`}
                  className="absolute inset-0 w-full h-full"
                />
                <PostItemBody data={data.parentPost.quotePost} isQuoted />
              </div>
            )}
            <PostActions
              data={data.parentPost}
              counts={{
                likes: data.parentPost.likesCount,
                replies: data.parentPost.repliesCount,
                reposts: data.parentPost.repostCount,
              }}
              postId={data.parentPost.id}
            />
          </div>
        </div>
      </Link>
      <Link href={`/users/${data.user.username}/posts/${data.id}`}>
        <PostItemBody data={data} showReplyBar={false} showMenu />
        <div className="ml-12 mt-1">
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
      </Link>
    </div>
  );
}

export default ReplyPostItem;
