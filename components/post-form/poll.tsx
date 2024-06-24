import { RiBarChartHorizontalLine, RiInfoI } from "@remixicon/react";
import React from "react";

function PollDisplay() {
  const MockData = {
    question: "This is a question",
    options: [
      { title: "Red" },
      { title: "Blue" },
      { title: "Green" },
      { title: "Yellow" },
    ],
  };
  return (
    <div className="flex items-center p-3 border w-full rounded-md space-y-4">
      <RiBarChartHorizontalLine className="w-4 h-4" />

      {MockData.question ? (
        MockData.question
      ) : (
        <div className="flex items-center gap-x-2">
          <p>Post content will be taken as question</p>
        </div>
      )}
    </div>
  );
}

export default PollDisplay;
