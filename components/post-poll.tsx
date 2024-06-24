import React from "react";
import { RiBarChartHorizontalLine } from "@remixicon/react";

import { Button } from "./ui/button";
import PostContent from "./post-content";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";

function PostPoll({ data }) {
  const { poll } = data;
  return (
    <TooltipProvider>
      <div className="px-2 border-t w-full">
        <div className="w-full flex justify-between items-center text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-x-2">
            <RiBarChartHorizontalLine className="w-3 h-3 text-muted-foreground" />
            <p>
              Created a {data.poll.quizMode ? "quiz" : "poll"}&nbsp;
              {data.poll.question && "for above post ↑"}
            </p>
          </span>
          <Button variant="link" className="px-0 py-0">
            <span className="text-xs">View Activity</span>
          </Button>
        </div>
        <div className="mt-4">
          {data.poll.question ? (
            <h2 className="text-xl font-semibold mb-4 border-l-4 pl-4">
              {data.poll.question}
            </h2>
          ) : (
            <PostContent content="Post content will be taken as question" />
          )}

          <div className="mt-6 space-y-2">
            {data.poll.options.map((option) => (
              <PostOption
                key={option.id}
                optionText={option.title}
                percentage={Math.floor(Math.random() * 100)}
              />
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="inline-flex items-center text-xs text-muted-foreground gap-x-2">
              <Tooltip>
                <TooltipTrigger>
                  <span>202 votes</span>
                </TooltipTrigger>
                <TooltipContent>
                  Click view activity above to see more details.
                </TooltipContent>
              </Tooltip>
              &#183;
              <Tooltip>
                <TooltipTrigger>
                  <span>Multiple</span>
                </TooltipTrigger>
                <TooltipContent>
                  Allow voters to select multiple options.
                </TooltipContent>
              </Tooltip>
              &#183;
              <Tooltip>
                <TooltipTrigger>
                  <span>Anonymous</span>
                </TooltipTrigger>
                <TooltipContent>
                  Allow voters to vote anonymously.
                </TooltipContent>
              </Tooltip>
            </p>
            <p className="text-xs text-muted-foreground">Ends in 23:59:59</p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default PostPoll;

function PostOption({
  optionText = "Option 1",
  percentage = 20,
}: {
  optionText?: string;
  percentage?: number;
}) {
  // Assuming optionText and percentage are props for this component
  return (
    <button className="relative py-2 px-4 border w-full rounded-md text-muted-foreground flex items-center justify-between gap-x-2 overflow-hidden hover:border-muted-foreground">
      <div
        style={{
          width: `${percentage}%`,
        }}
        className="absolute bg-primary h-full top-0 left-0" // Adjusted class for visibility
      />
      {/* Normal text view */}
      <span
        className="z-10 relative text-sm text-black font-semibold"
        style={{ zIndex: 2 }}
      >
        {optionText}
      </span>
      {/* Inverted text view (only visible when it overlaps with the progress bar) */}
      <span
        className="absolute left-0 pl-2 transition-all"
        style={{
          color: percentage > 10 ? "inherit" : "white", // Change '10' based on when you want the color to switch
          zIndex: 1,
          width: `${percentage}%`,
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      ></span>
      <span
        className="text-xs text-muted-foreground z-10 relative"
        style={{ zIndex: 2 }}
      >
        {percentage}%
      </span>
    </button>
  );
}
