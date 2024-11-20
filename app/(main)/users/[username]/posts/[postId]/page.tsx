"use client";

import PostActivity from "@/components/dialogs/post-activity";
import PostItem from "@/components/post/item/detailed";
import ReplyPostItem from "./_components/reply-post";
import { GET } from "@/lib/fetcher";
import { DetailPost, Post } from "@/types/api-responses/post/single";
import { RiArrowRightSLine, RiLoader2Line } from "@remixicon/react";
import React from "react";
import useSWR from "swr";

function PostIdPage({ params: { postId } }: { params: { postId: string } }) {
  const { data, isLoading } = useSWR(
    `/api/post/${postId}`,
    GET<{ post: Post; replies: DetailPost[] }>
  );

  if (isLoading) {
    return (
      <div className="w-full h-72 grid place-items-center">
        <RiLoader2Line className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!data) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <PostItem data={data.post} />
      <div className="flex justify-between py-3 px-1.5">
        <h4 className="font-bold">Replies ({data.replies.length || 0})</h4>
        <PostActivity data={data.post}>
          <span className="inline-flex gap-x-2 items-center text-muted-foreground text-sm">
            View all Activities <RiArrowRightSLine className="size-5" />
          </span>
        </PostActivity>
      </div>
      {data.replies.map((reply) => (
        <ReplyPostItem
          key={reply.id}
          data={reply}
          parentPostUserId={data.post.userId}
        />
      ))}
    </div>
  );
}

export default PostIdPage;
