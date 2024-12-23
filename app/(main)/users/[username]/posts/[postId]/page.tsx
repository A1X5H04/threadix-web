"use client";

import PostActivity from "@/components/dialogs/post-activity";
import PostItem from "@/components/post/item/detailed";
import ReplyPostItem from "@/components/post/item/replied";
import Reply from "./_components/reply-post";
import { GET } from "@/lib/fetcher";
import { DetailPost, Post, ReplyPost } from "@/types/api-responses/post/single";
import {
  RiArrowRightSLine,
  RiBox2Line,
  RiHistoryLine,
  RiLoader2Line,
} from "@remixicon/react";
import React from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import PostDetailsSkeleton from "@/components/skeletons/post-details";

function PostIdPage({ params: { postId } }: { params: { postId: string } }) {
  const { data, isLoading } = useSWR(
    `/api/post/${postId}`,
    GET<{ post: ReplyPost; replies: DetailPost[] }>,
  );

  if (isLoading) {
    return <PostDetailsSkeleton />;
  }

  if (!data) {
    return (
      <div className="grid place-items-center w-full h-96">
        <div className="grid place-items-center">
          <RiBox2Line className="w-20 h-20  text-muted-foreground/50 dark:text-muted mb-2" />
          <h4 className="font-semibold text-lg">No Post Found</h4>
          <p className="text-sm text-muted-foreground">
            The post you are looking is moved or deleted.
          </p>
        </div>
      </div>
    );
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
