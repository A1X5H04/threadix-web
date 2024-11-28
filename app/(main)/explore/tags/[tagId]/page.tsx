"use client";

import PostItem from "@/components/post/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GET } from "@/lib/fetcher";
import { formatDate } from "@/lib/format";
import { Tag } from "@/types/api-responses/common";
import { Post } from "@/types/api-responses/post/single";
import { Separator } from "@radix-ui/react-separator";
import { RiHashtag } from "@remixicon/react";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

type ResponseData = {
  tag: Tag;
  posts: Post[];
};

function TagIdPage({ params }: { params: { tagId: string } }) {
  const { data, isLoading } = useSWR(
    `/api/explore/tags/${params.tagId}`,
    GET<ResponseData>
  );

  if (!data || isLoading) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between px-3">
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">{data?.tag.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {formatDate(new Date(data?.tag.createdAt))}
            </p>
          </div>

          <p className="inline-flex items-center gap-x-2 text-sm text-muted-foreground">
            <Avatar className="size-4">
              <AvatarImage src={data?.tag.user.avatar ?? undefined} />
              <AvatarFallback>{data?.tag.user.username[0]}</AvatarFallback>
            </Avatar>
            <Link
              className="font-semibold hover:underline"
              href={`/users/${data.tag.user.username}`}
            >
              {data?.tag.user.username}
            </Link>
            •<span>{data?.posts.length} posts</span>
          </p>
        </div>
        <div className="size-24 bg-muted rounded-lg grid place-items-center">
          <RiHashtag className="size-16 text-muted-foreground" />
        </div>
      </div>
      <Separator className="mt-4" />
      <div className="mt-4">
        {data?.posts.map((post) => (
          <PostItem key={post.id} data={post} />
        ))}
      </div>
    </div>
  );
}

export default TagIdPage;
