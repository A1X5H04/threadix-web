"use client";

import { GET } from "@/lib/fetcher";
import { Post } from "@/types/api-responses/post/single";
import useSWR from "swr";
import PostItem from "@/components/post/item";
import PostListSkeleton from "@/components/skeletons/post-list";
import { RiHeartFill, RiHistoryLine } from "@remixicon/react";
import React from "react";

function LikedPostPage() {
  const { data, isLoading } = useSWR("/api/me/liked", GET<Post[]>);

  if (!data || isLoading) return <PostListSkeleton />;

  if (data.length === 0) {
    return (
      <div className="grid place-items-center w-full h-96">
        <div className="grid place-items-center">
          <RiHeartFill className="w-20 h-20 text-muted mb-2" />
          <h4 className="font-semibold text-lg">No Liked Posts</h4>
          <p className="text-sm text-muted-foreground">
            When you like a post, it will show up here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {data.map((post) => (
        <PostItem key={post.id} data={post} />
      ))}
    </div>
  );
}

export default LikedPostPage;
