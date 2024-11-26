"use client";

import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import useSWR from "swr";
import { GET } from "@/lib/fetcher";
import { RiLoader2Line } from "@remixicon/react";
import { Post, ReplyPost } from "@/types/api-responses/post/single";
import PostItem from "../post/item";
import ReplyPostItem from "../post/item/replied";

type ProfileTabsData = {
  posts: Post[];
  replies: ReplyPost[];
  reposts: Post[];
};

function ProfileTabsContent({ username }: { username: string }) {
  const { data, isLoading } = useSWR(
    `/api/profile/${username}/posts`,
    GET<ProfileTabsData>
  );

  if (isLoading || !data) {
    return (
      <div className="w-full h-60 grid place-items-center">
        <RiLoader2Line className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <>
      <TabsContent value="posts">
        {data.posts.length > 0 ? (
          data.posts.map((post) => <PostItem key={post.id} data={post} />)
        ) : (
          <div className="w-full h-60 grid place-items-center">
            <h3 className="text-muted-foreground">No posts yet</h3>
          </div>
        )}
      </TabsContent>
      <TabsContent value="replies">
        {data.replies.length > 0 ? (
          data?.replies.map((post) => (
            <ReplyPostItem key={post.id} data={post} />
          ))
        ) : (
          <div className="w-full h-60 grid place-items-center">
            <h3 className="text-muted-foreground">No replies yet</h3>
          </div>
        )}
      </TabsContent>
      <TabsContent value="repost">
        {data.reposts.length > 0 ? (
          data?.reposts.map((post) => <PostItem key={post.id} data={post} />)
        ) : (
          <div className="w-full h-60 grid place-items-center">
            <h3 className="text-muted-foreground">No reposts yet</h3>
          </div>
        )}
      </TabsContent>
    </>
  );
}

export default ProfileTabsContent;
