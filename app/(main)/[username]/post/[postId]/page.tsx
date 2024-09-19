"use client";

import PostItem from "@/components/post-item";
import { GET } from "@/lib/fetcher";
import React from "react";
import useSWR from "swr";

function PostIdPage({ params: { postId } }: { params: { postId: string } }) {
  const { data, isLoading } = useSWR(`/api/post/${postId}`, GET);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <PostItem data={data} isLiked />
    </div>
  );
}

export default PostIdPage;
