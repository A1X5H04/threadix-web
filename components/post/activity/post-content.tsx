import React from "react";
import {
  RiArrowRightSLine,
  RiChatQuoteFill,
  RiHeart2Fill,
  RiLoader2Line,
  RiRepeat2Fill,
} from "@remixicon/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ListItem from "./list-item";
import { User } from "@/types/api-responses/common";
import useSWR from "swr";
import { GET } from "@/lib/fetcher";

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

type SortedActivities = {
  user: User;
  content?: string;
  type: string;
  createdAt: string;
}[];

function ActivityPostContent({ postId }: { postId: string }) {
  const { data, isLoading } = useSWR(
    `/api/post/${postId}/activity`,
    GET<ResponseType>
  );

  if (isLoading || !data) {
    return (
      <div className="w-full h-56 grid place-items-center">
        <RiLoader2Line className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  const sortedActivities: SortedActivities =
    data &&
    [...data.likes, ...data.reposts, ...data.quotedPosts].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
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
              <ListItem key={i} user={like.user} createdAt={like.createdAt} />
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
                  createdAt={qoutedPost.createdAt}
                  content={qoutedPost.content}
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
  );
}

export default ActivityPostContent;
