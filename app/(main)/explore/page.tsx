"use client";

import React from "react";

import { RiFireFill, RiHashtag, RiUserStarFill } from "@remixicon/react";
import useSWR from "swr";
import { GET } from "@/lib/fetcher";
import { Post } from "@/types/api-responses/post/single";
import PostItem from "@/components/post/item";
import { Tag, User } from "@/types/api-responses/common";
import UserItem from "./_components/user-item";
import UserItemHorizontal from "./_components/user-item-horizontal";

import UserCarousel from "./_components/user-carousel";
import { Separator } from "@/components/ui/separator";
import HashtagItem from "./_components/hashtag-item";

import { shuffleArray } from "@/lib/utils";
import toast from "react-hot-toast";
import SearchDialog from "./_components/search-dialog";
import ExplorePageSkeleton from "@/components/skeletons/explore-page";

type ExtendedUser = User & { followersCount: number };

type ResponseType = {
  popularPosts: Post[];
  recommendedUsers: User[];
  popularUsers: ExtendedUser[];
  trendingTags: Tag[];
};

function ExploreIndexPage() {
  const { data, isLoading } = useSWR("/api/explore", GET<ResponseType>, {
    onError: () => toast.error("Failed to fetch explore feed.."),
  });

  const sections = [
    {
      key: "posts",
      content: data && data.popularPosts.length > 0 && (
        <div className="space-y-2">
          <div className="mt-4 flex justify-between text-muted-foreground text-sm">
            <div className="inline-flex items-center gap-x-2">
              <RiFireFill className="size-4" /> Trending Posts
            </div>
          </div>
          {data?.popularPosts.map((post) => (
            <PostItem key={post.id} data={post} />
          ))}
        </div>
      ),
    },
    {
      key: "users",
      content: data &&
        data.popularUsers.length > 0 &&
        data?.recommendedUsers.length > 0 && (
          <>
            <div className="mb-4 flex justify-between text-muted-foreground text-sm">
              <div className="inline-flex items-center gap-x-2">
                <RiUserStarFill className="size-4" /> Recommended / Popular
                Users
              </div>
            </div>
            <div className="mb-4">
              {data?.recommendedUsers.map((user) => (
                <UserItemHorizontal key={user.id} user={user} />
              ))}
            </div>
            <UserCarousel>
              {data?.popularUsers.map((user, index) => (
                <UserItem key={index} user={user} />
              ))}
            </UserCarousel>
            <Separator className="my-4" />
          </>
        ),
    },
    {
      key: "hashtags",
      content: data && data?.trendingTags.length > 0 && (
        <>
          <div className="flex justify-between text-muted-foreground text-sm">
            <div className="inline-flex items-center gap-x-2">
              <RiHashtag className="size-4" /> Trending Hashtags
            </div>
          </div>
          {data?.trendingTags.map((tag, index) => (
            <>
              <HashtagItem key={tag.createdAt} tag={tag} />
              {index !== data.trendingTags.length - 1 && (
                <Separator className="my-1" />
              )}
            </>
          ))}
          <Separator className="my-4" />
        </>
      ),
    },
  ];

  if (isLoading) {
    return <ExplorePageSkeleton />;
  }

  return (
    <div className="mt-5">
      {shuffleArray(sections).map((section) => (
        <React.Fragment key={section.key}>{section.content}</React.Fragment>
      ))}
    </div>
  );
}

export default ExploreIndexPage;
