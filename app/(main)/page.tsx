"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import { RiLoader2Line, RiSignalWifiErrorFill } from "@remixicon/react";

import PostItem from "@/components/post-item";
import { GET } from "@/lib/fetcher";
import { Post } from "@/types/api-responses/post/single";
import { useAppStore } from "@/hooks/use-store";

function HomePage() {
  const { fetchData } = useAppStore();
  const { data, error, isLoading } = useSWR(
    "/api/post",
    GET<{ posts: Post[] }>,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    fetchData();
    console.log("Fetching data");
  }, [fetchData]);

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
    <>
      {data?.posts.map((post) => (
        <PostItem key={post.id} data={post} />
      ))}
    </>
  );
}

export default HomePage;
