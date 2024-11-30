import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrayElement, cn } from "@/lib/utils";
import { Activity, User } from "@/types/api-responses/common";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  RiAtFill,
  RiBarChartHorizontalFill,
  RiDoubleQuotesL,
  RiHeartFill,
  RiRepeat2Fill,
  RiUserFill,
} from "@remixicon/react";
import React from "react";

interface ActivityAvatarProps {
  actionUsers: Activity["actionUsers"];
  type: "like" | "repost" | "user" | "poll" | "mention" | "quote" | "other";
}

function ActivityAvatar({ type, actionUsers }: ActivityAvatarProps) {
  let icon;

  console.log(actionUsers);

  switch (type) {
    case "like":
      icon = (
        <div className="absolute -bottom-1 -right-0.5 bg-rose-500 p-0.5 rounded-full border-2 border-background">
          <RiHeartFill className="size-2.5 text-white" />
        </div>
      );
      break;
    case "repost":
      icon = (
        <div className="absolute -bottom-1 -right-0.5 bg-teal-500 p-0.5 rounded-full border-2 border-background">
          <RiRepeat2Fill className="size-2.5 text-white" />
        </div>
      );

      break;
    case "quote":
      icon = (
        <div className="absolute -bottom-1 -right-0.5 bg-blue-500 p-0.5 rounded-full border-2 border-background">
          <RiDoubleQuotesL className="size-2.5 text-white" />
        </div>
      );
      break;
    case "user":
      icon = (
        <div className="absolute -bottom-1 -right-0.5 bg-purple-500-500 p-0.5 rounded-full border-2 border-background">
          <RiUserFill className="size-2.5 text-white" />
        </div>
      );
    case "mention":
      icon = (
        <div className="absolute -bottom-1 -right-0.5 bg-yellow-500 p-0.5 rounded-full border-2 border-background">
          <RiAtFill className="size-2.5 text-white" />
        </div>
      );
      break;
    case "poll":
      icon = (
        <div className="absolute -bottom-1 -right-0.5 bg-yellow-500 p-0.5 rounded-full border-2 border-background">
          <RiBarChartHorizontalFill className="size-2.5 text-white" />
        </div>
      );
      break;
    default:
      icon = null;
      break;
  }

  if (actionUsers.length === 1) {
    return (
      <div className="relative">
        <Avatar>
          <AvatarImage
            src={actionUsers[0].avatar ?? undefined}
            alt={actionUsers[0].username}
            className="size-10 rounded-full"
          />
          <AvatarFallback>
            {actionUsers[0].username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {icon}
      </div>
    );
  }

  return (
    <div className="relative -space-x-5">
      {actionUsers.slice(0, 3).map((user, index) => (
        <div key={user.id} className="inline-block">
          <Avatar className={cn("size-7 border", index == 1 && "z-10 size-8")}>
            <AvatarImage
              src={user.avatar ?? undefined}
              alt={user.username}
              className="w-8 h-8 rounded-full"
            />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      ))}
      {icon}
    </div>
  );
}

export default ActivityAvatar;
