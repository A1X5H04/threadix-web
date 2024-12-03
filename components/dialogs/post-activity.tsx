import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import {
  RiArrowRightSLine,
  RiChatQuoteFill,
  RiHeart2Fill,
  RiRepeat2Fill,
} from "@remixicon/react";
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
import { Poll, PollOption, User } from "@/types/api-responses/common";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ActivityPostContent from "../post/activity/post-content";
import ActivityPollContent from "../post/activity/poll-content";

interface PostActivityProps {
  postId: string;
  user: User;
  postData: {
    content: string;
    createdAt: Date;
  };
  pollData: Poll | null;
}

function PostActivity({ postId, user, postData, pollData }: PostActivityProps) {
  const [tabValue, setTabValue] = React.useState<"post" | "poll">("post");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="px-0 text-muted-foreground">
          View all Activities <RiArrowRightSLine className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-xl max-h-[calc(100vh-6rem)] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2 pr-2">
            <div className="inline-flex items-center gap-x-2">
              <DialogTitle className="text-base">View Activity</DialogTitle>
            </div>
            <Button variant="link" className="px-0">
              Sort By
            </Button>
          </div>
          <PostBody
            user={user}
            content={postData.content}
            createdAt={postData.createdAt.toString()}
            tabValue={tabValue}
            pollData={pollData}
          />

          <DialogDescription className="sr-only">
            View the activity of this post like the number of likes, comments,
            and shares.
          </DialogDescription>
        </DialogHeader>
        <Tabs
          value={tabValue}
          onValueChange={(value) => setTabValue(value as "post" | "poll")}
          defaultValue="post"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="post">Post Activity</TabsTrigger>
            <TabsTrigger
              disabled={pollData === null}
              className="disabled:cursor-not-allowed"
              value="poll"
            >
              Poll Activity
            </TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <ActivityPostContent postId={postId} />
          </TabsContent>
          <TabsContent value="poll">
            <ActivityPollContent
              pollId={pollData?.id || ""}
              postId={postId}
              pollOptions={pollData?.poll_options || []}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default PostActivity;
