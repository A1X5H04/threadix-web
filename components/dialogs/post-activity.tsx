import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { RiChatQuoteFill, RiHeart2Fill, RiRepeat2Fill } from "@remixicon/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "../ui/button";
import PostBody from "../post/activity/post-body";
import ListItem from "../post/activity/list-item";
import useSWR from "swr";
import { GET } from "@/lib/fetcher";
import { User } from "@/types/api-responses/common";

interface PostActivityProps {
  postId: string;
  user: User;
  postData: {
    content: string;
    createdAt: Date;
  };

  children: React.ReactNode;
}

type ResponseType = {
  likes: {
    user: User;
    createdAt: string;
    type: string;
  }[];
  reposts: {
    user: User;
    createdAt: string;
    type: string;
  }[];
  quotedPosts: {
    user: User;
    content: string;
    type: string;
    createdAt: string;
  }[];
};

function PostActivity({ postId, user, postData, children }: PostActivityProps) {
  const { data, isLoading } = useSWR(
    `/api/post/${postId}/activity`,
    GET<ResponseType>
  );

  if (!data) {
    return null;
  }

  const sortedActivities: {
    user: User;
    content?: string;
    type: string;
    createdAt: string;
  }[] = [...data.likes, ...data.reposts, ...data.quotedPosts].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-xl max-h-[calc(100vh-6rem)] overflow-y-scroll">
        {isLoading && <div>Loading Post Activity...</div>}
        <DialogHeader>
          <div className="flex items-center justify-between mb-2 pr-2">
            <div className="inline-flex items-center gap-x-2">
              <DialogTitle className="text-base">Post Activity</DialogTitle>
            </div>

            <Button variant="link" className="px-0">
              Sort By
            </Button>
          </div>
          <PostBody
            user={user}
            content={postData.content}
            createdAt={postData.createdAt.toString()}
          />

          <DialogDescription className="sr-only">
            View the activity of this post like the number of likes, comments,
            and shares.
          </DialogDescription>
        </DialogHeader>

        <div className="px-2">
          <Accordion type="single" collapsible>
            <AccordionItem value="likes">
              <AccordionTrigger className="relative">
                <div className="inline-flex gap-x-2 items-center text-base">
                  <RiHeart2Fill className="size-5 text-accent-foreground" />
                  <span className="font-bold">Likes</span>
                </div>
                <span className="absolute right-5 text-base text-muted-foreground">
                  {data?.likes.length ?? 0}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                {data?.likes.map((like, i) => (
                  <ListItem
                    key={i}
                    user={like.user}
                    type="like"
                    createdAt={like.createdAt}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
            {data?.reposts.length > 0 && (
              <AccordionItem value="reposts">
                <AccordionTrigger className="relative">
                  <div className="inline-flex gap-x-2 items-center text-base">
                    <RiRepeat2Fill className="size-5 text-accent-foreground" />
                    <span className="font-bold">Reposts</span>
                  </div>
                  <span className="absolute right-5 text-base text-muted-foreground">
                    {data?.reposts.length}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {data?.reposts.map((repost, i) => (
                    <ListItem
                      key={i}
                      user={repost.user}
                      type="repost"
                      createdAt={repost.createdAt}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            )}
            {data?.quotedPosts.length > 0 && (
              <AccordionItem value="quoted">
                <AccordionTrigger className="relative">
                  <div className="inline-flex gap-x-2 items-center text-base">
                    <RiChatQuoteFill className="size-5 text-accent-foreground" />
                    <span className="font-bold">Quoted</span>
                  </div>
                  <span className="absolute right-5 text-base text-muted-foreground">
                    {data?.quotedPosts.length}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {data.quotedPosts.map((qoutedPost, i) => (
                    <ListItem
                      key={i}
                      user={qoutedPost.user}
                      type="quote"
                      createdAt={qoutedPost.createdAt}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
          <div className="space-y-2 mt-4">
            {sortedActivities.map((activity, i) => (
              <ListItem
                key={i}
                user={activity.user}
                type={activity.type as "like" | "repost" | "quote"}
                createdAt={activity.createdAt}
                content={activity.content}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PostActivity;
