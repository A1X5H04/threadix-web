"use client";

import LoaderScreen from "@/components/loader-screen";
import PostItem from "@/components/post/item";
import { GET } from "@/lib/fetcher";
import { Post } from "@/types/api-responses/post/single";
import { redirect, useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";
import SearchDialog from "../_components/search-dialog";

function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  if (!query) {
    redirect("/explore");
  }

  const { data, isLoading } = useSWR(
    `/api/explore/search?query=${query ?? ""}`,
    GET<{ matchedPosts: Post[] }>
  );

  if (!data || isLoading) return <LoaderScreen />;

  return (
    <div className="mt-3">
      {data?.matchedPosts.length > 0 ? (
        data?.matchedPosts.map((post) => <PostItem key={post.id} data={post} />)
      ) : (
        <div>
          No posts found for <span className="font-semibold">{query}</span>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
