import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { RiDoubleQuotesL, RiHeart3Fill, RiRepeat2Fill } from "@remixicon/react";
import React from "react";
import VerifiedBadge from "@/components/verified-badge";
import Link from "next/link";
import { formatRelativeDate } from "@/lib/format";

interface ListItemProps {
  user: {
    name: string;
    avatar: string | null;
    username: string;
    isVerified: boolean;
  };
  content?: string;
  type?: "like" | "repost" | "quote";
  createdAt: string;
}

function ListItem({ user, type, content, createdAt }: ListItemProps) {
  let icon;

  switch (type) {
    case "like":
      icon = (
        <div className="absolute -bottom-1 -right-0.5 bg-rose-500 p-0.5 rounded-full border-2 border-background">
          <RiHeart3Fill className="size-2.5 text-white" />
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
    default:
      icon = null;
      break;
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="relative">
        <Avatar className="size-8">
          <AvatarImage src={user.avatar ?? undefined} />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        {icon}
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full py-2">
          <div className="inline-flex flex-col">
            <div className="inline-flex items-center gap-x-2">
              <span className="font-bold text-sm">{user.name}</span>
              {user.isVerified && (
                <VerifiedBadge userName={user.name} iconClassName="size-3" />
              )}
              <span className="text-xs text-muted-foreground">
                {formatRelativeDate(new Date(createdAt))}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {user.username}
            </span>
          </div>
          <Button size="sm" variant="outline">
            <Link href={`/users/${user.username}`}>View Profile</Link>
          </Button>
        </div>
        {content && <p className="text-sm">{content}</p>}
      </div>
    </div>
  );
}

export default ListItem;
