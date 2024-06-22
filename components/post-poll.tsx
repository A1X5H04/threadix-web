import React from "react";

import { Button } from "./ui/button";

function PostPoll() {
  return (
    <div className="p-2">
      <div className="pt-3 mt-2">
        <h3 className="text-lg font-semibold">What do you like the most ?</h3>

        <div className="mt-6 space-y-2">
          <PostOption optionText="New Option" percentage={20} />
          <PostOption optionText="Old Option" percentage={45} />
          <PostOption optionText="What?" percentage={23} />
          <PostOption optionText="Wasdf" percentage={15} />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="inline-flex items-center gap-x-1">
          <p className="text-xs text-muted-foreground">202 votes</p>·
          <Button variant="link" className="px-0">
            <span className="text-xs">View Activity</span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Ends in 23:59:59</p>
      </div>
    </div>
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
    <button className="relative p-2 border w-full rounded-md text-muted-foreground flex items-center justify-between gap-x-2 overflow-hidden hover:border-gray-500">
      <div
        style={{
          width: `${percentage}%`,
        }}
        className="absolute bg-primary h-full top-0 left-0" // Adjusted class for visibility
      />
      {/* Normal text view */}
      <span className="z-10 relative text-sm" style={{ zIndex: 2 }}>
        {optionText}
      </span>
      {/* Inverted text view (only visible when it overlaps with the progress bar) */}
      <span
        className="absolute left-0 pl-2 transition-all"
        style={{
          color: percentage > 10 ? "white" : "inherit", // Change '10' based on when you want the color to switch
          zIndex: 1,
          width: `${percentage}%`,
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {optionText}
      </span>
      <span
        className="text-xs text-muted-foreground z-10 relative"
        style={{ zIndex: 2 }}
      >
        {percentage}%
      </span>
    </button>
  );
}
