"use client";

import { Input } from "@/components/ui/input";
import {
  RiArrowRightSLine,
  RiFireFill,
  RiHashtag,
  RiSearch2Line,
  RiUserStarFill,
} from "@remixicon/react";
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

type ExtendedUser = User & { followersCount: number };

type ResponseType = {
  popularPosts: Post[];
  recommendedUsers: User[];
  popularUsers: ExtendedUser[];
  trendingTags: Tag[];
};

function SearchPage() {
  const { data } = useSWR("/api/explore", GET<ResponseType>);

  if (!data) {
    return null;
  }

  return (
    <div className="py-5">
      <div className="relative">
        <Input
          placeholder="Search Anything"
          className="h-10 indent-8 text-sm"
        />
        <div className="absolute inset-y-0 left-4 flex items-center">
          <RiSearch2Line className="text-muted-foreground size-5" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="mt-4 flex justify-between text-muted-foreground text-sm">
          <div className="inline-flex items-center gap-x-2">
            <RiFireFill className="size-4" /> Trending Posts
          </div>
          <RiArrowRightSLine />
        </div>
        {data?.popularPosts.map((post) => (
          <PostItem key={post.id} data={post} />
        ))}
      </div>
      <Separator className="my-4" />
      <div className="mb-4 flex justify-between text-muted-foreground text-sm">
        <div className="inline-flex items-center gap-x-2">
          <RiUserStarFill className="size-4" /> Recommended / Popular Users
        </div>
        <RiArrowRightSLine />
      </div>
      <div className="mb-4">
        {data?.recommendedUsers.map((user) => (
          <UserItemHorizontal key={user.id} user={user} />
        ))}
      </div>
      <Separator className="mb-4" />
      <UserCarousel>
        {data?.popularUsers.map((user, index) => (
          <UserItem key={index} user={user} />
        ))}
      </UserCarousel>
      <Separator className="my-4" />
      <div className="flex justify-between text-muted-foreground text-sm">
        <div className="inline-flex items-center gap-x-2">
          <RiHashtag className="size-4" /> Trending Hastags
        </div>
        <RiArrowRightSLine />
      </div>
      {data.trendingTags.map((tag, index) => (
        <>
          <HashtagItem key={tag.createdAt} tag={tag} />
          {index !== data.trendingTags.length - 1 && (
            <Separator className="my-1" />
          )}
        </>
      ))}
    </div>
  );
}

export default SearchPage;
