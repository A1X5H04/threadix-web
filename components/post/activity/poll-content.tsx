import React, { useMemo } from "react";
import {
  RemixiconComponentType,
  RiLoader2Line,
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
} from "@remixicon/react";
import { PollOption, Vote } from "@/types/api-responses/common";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import useSWR from "swr";
import { GET } from "@/lib/fetcher";
import PollListItem from "./poll-list-item";

interface ActivityPollContentProps {
  postId: string;
  pollId: string;
  pollOptions: PollOption[];
}

function ActivityPollContent({
  postId,
  pollId,
  pollOptions,
}: ActivityPollContentProps) {
  const { data, isLoading } = useSWR(
    `/api/post/${postId}/activity/poll/${pollId}`,
    GET<{ votes: Vote[] }>
  );
  const iconOptionMap = useMemo(() => {
    /* eslint-disable react/jsx-key */
    const iconMap = [RiNumber1, RiNumber2, RiNumber3, RiNumber4];

    return pollOptions.reduce((acc, option, index) => {
      acc[option.id] = iconMap[index];
      return acc;
    }, {} as { [key: string]: RemixiconComponentType });
  }, [pollOptions]);

  if (isLoading) {
    return (
      <div className="w-full h-56 grid place-items-center">
        <RiLoader2Line className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="px-2">
      <Accordion type="single" collapsible>
        {pollOptions.map((option, index) => {
          const Icon = iconOptionMap[option.id];

          return (
            <AccordionItem value={String(option.id)}>
              <AccordionTrigger className="relative">
                <div className="inline-flex gap-x-2 items-center text-base">
                  <Icon className="size-4 text-muted-foreground" />
                  <span className="font-bold">{option.title}</span>
                </div>
                <span className="absolute right-5 text-sm text-muted-foreground">
                  {option.voteCount} Votes
                </span>
              </AccordionTrigger>
              <AccordionContent>
                {data?.votes
                  .filter((vote) => vote.optionId === option.id)
                  .map((vote) => (
                    <PollListItem
                      key={vote.optionId}
                      user={vote.user}
                      createdAt={vote.createdAt.toString()}
                    />
                  ))}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <div className="space-y-2 mt-4">
        {data?.votes.map((vote) => (
          <PollListItem
            key={vote.optionId}
            user={vote.user}
            icon={iconOptionMap[vote.optionId]}
            createdAt={vote.createdAt.toString()}
          />
        ))}
      </div>
    </div>
  );
}

export default ActivityPollContent;
