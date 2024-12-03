"use client";

import PostActivity from "@/components/dialogs/post-activity";
import PostItem from "@/components/post/item/detailed";
import ReplyPostItem from "@/components/post/item/replied";
import Reply from "./_components/reply-post";
import { GET } from "@/lib/fetcher";
import { DetailPost, Post, ReplyPost } from "@/types/api-responses/post/single";
import { RiArrowRightSLine, RiLoader2Line } from "@remixicon/react";
import React from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";

function PostIdPage({ params: { postId } }: { params: { postId: string } }) {
  const { data, isLoading } = useSWR(
    `/api/post/${postId}`,
    GET<{ post: ReplyPost; replies: DetailPost[] }>
  );

  if (isLoading) {
    return (
      <div className="w-full h-56 grid place-items-center">
        <RiLoader2Line className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!data) {
    return <div>Post Not Found</div>;
  }

  return (
    <div>
      {data.post.parentPost ? (
        <ReplyPostItem data={data.post} />
      ) : (
        <PostItem data={data.post} />
      )}
      <div className="flex justify-between py-3 px-1.5">
        <h4 className="font-bold">Replies ({data.replies.length || 0})</h4>
        <PostActivity
          postId={data.post.id}
          user={data.post.user}
          postData={{
            content: data.post.content,
            createdAt: data.post.createdAt,
          }}
          pollData={data.post.poll}
        />
      </div>
      {data.replies.map((reply) => (
        <Reply
          key={reply.id}
          data={reply}
          parentPostUserId={data.post.userId}
        />
      ))}
    </div>
  );
}

export default PostIdPage;
