"use client";
import React from "react";
import axios from "axios";
import useSWR from "swr";

import PostItem from "./post-item";
import { RiLoader2Line, RiSignalWifiErrorFill } from "@remixicon/react";

type Post = {
  id: string;
  content: string;
  parentId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

function PostList({ user }: { user: any }) {
  const { data, error, isLoading } = useSWR(
    "/api/post",
    (url) => axios.get(url).then((res) => res.data),
    {
      revalidateOnFocus: false,
    }
  );

  if (isLoading)
    return (
      <div className="w-full h-72 grid place-items-center">
        <RiLoader2Line className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );

  if (error) {
    return (
      <div className="w-full h-72 grid place-items-center">
        <div className="inline-flex flex-col gap-y-6 items-center justify-center">
          <RiSignalWifiErrorFill className="w-12 h-12 text-gray-500" />
          <span className="text-center">
            <h3 className="text-2xl font-bold">Failed to fetch posts</h3>
            <p className="text-sm mt-2 text-muted-foreground">
              Refreshing the page might help
            </p>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 my-3">
      {data?.map((post: Post) => (
        <PostItem key={post.id} data={post} user={user} />
      ))}
    </div>
  );
}

export default PostList;