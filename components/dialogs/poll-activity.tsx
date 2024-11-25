import React from "react";
import {
  RiArrowRightSLine,
  RiCircleFill,
  RiHexagonFill,
  RiListIndefinite,
  RiSquareFill,
  RiTriangleFill,
} from "@remixicon/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { PollOption } from "@/types/api-responses/common";

interface PollActivityProps {
  options: PollOption[];
}

/* eslint-disable react/jsx-key */
const iconMap = [
  <RiSquareFill />,
  <RiTriangleFill />,
  <RiHexagonFill />,
  <RiCircleFill />,
];

function PollActivity({ options }: PollActivityProps) {
  return (
    <TooltipProvider>
      <Dialog>
        <DialogTrigger>
          <button className="inline-flex items-center">
            View Activity <RiArrowRightSLine className="w-4 h-4" />
          </button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-xl max-h-[calc(100vh-6rem)] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between mb-2 pr-2">
              <div className="inline-flex items-center gap-x-2">
                <DialogTitle className="text-base">Poll Activity</DialogTitle>
              </div>

              <Button variant="link" className="px-0">
                Sort By
              </Button>
            </div>
            <DialogDescription className="sr-only">
              View the activity of the post&apos;s poll, including votes and
              results.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 grid-cols-2">
            {options.map((option, index) => (
              <div
                key={option.id}
                className="flex justify-between p-2 gap-x-2 border rounded-md"
              >
                <span className="font-semibold">{option.title}</span>
                {option.voteCount} votes
                {iconMap[index]}
              </div>
            ))}
          </div>
          <div className="px-2">
            <Accordion type="single" collapsible>
              <AccordionItem value="likes">
                <AccordionTrigger className="relative">
                  <div className="inline-flex gap-x-2 items-center text-base">
                    <RiListIndefinite className="size-5 text-accent-foreground" />
                    <span className="font-bold">Yes</span>
                  </div>
                  <span className="absolute right-5 text-base text-muted-foreground">
                    0 Votes
                  </span>
                </AccordionTrigger>
                <AccordionContent>asdf</AccordionContent>
              </AccordionItem>
              <AccordionItem value="fd">
                <AccordionTrigger className="relative">
                  <div className="inline-flex gap-x-2 items-center text-base">
                    <RiListIndefinite className="size-5 text-accent-foreground" />
                    <span className="font-bold">No</span>
                  </div>
                  <span className="absolute right-5 text-base text-muted-foreground">
                    0 Votes
                  </span>
                </AccordionTrigger>
                <AccordionContent>asdf</AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex items-center gap-x-4">
              <div className="relative">
                <Avatar className="size-8">
                  <AvatarImage />
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute -bottom-1 -right-0.5 bg-white p-0.5 rounded-full border-2 border-background">
                      <RiSquareFill className="size-2.5 text-black" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="">
                    <p>
                      Nicky Minaj voted for <b>Yes</b>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="w-full">
                <div className="flex justify-between w-full py-2">
                  <div className="inline-flex flex-col">
                    <div className="inline-flex items-center gap-x-2">
                      <span className="font-bold text-sm">Nicky Minaj </span>

                      <span className="text-xs text-muted-foreground">
                        2 hours ago
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      nickjbasile
                    </span>
                  </div>
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}

export default PollActivity;
