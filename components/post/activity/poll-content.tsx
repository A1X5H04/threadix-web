import React from "react";
import {
  RiCircleFill,
  RiHexagonFill,
  RiSquareFill,
  RiTriangleFill,
} from "@remixicon/react";
import { PollOption } from "@/types/api-responses/common";

interface ActivityPollContentProps {
  postId: string;
  pollOptions: PollOption[];
}

function ActivityPollContent({
  postId,
  pollOptions,
}: ActivityPollContentProps) {
  /* eslint-disable react/jsx-key */
  const iconMap = [
    <RiSquareFill />,
    <RiTriangleFill />,
    <RiHexagonFill />,
    <RiCircleFill />,
  ];

  return (
    <div>
      {pollOptions.map((option, index) => {
        return (
          <div className="flex items-center gap-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
              {iconMap[index]}
            </div>
            <p className="text-sm">{option.title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ActivityPollContent;
