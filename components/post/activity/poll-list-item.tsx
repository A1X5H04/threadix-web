import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  RemixiconComponentType,
  RiDoubleQuotesL,
  RiHeart3Fill,
  RiQuoteText,
  RiRepeat2Fill,
} from "@remixicon/react";
import React from "react";
import VerifiedBadge from "@/components/verified-badge";
import Link from "next/link";
import { formatRelativeDate } from "@/lib/format";
import { useAppStore } from "@/hooks/use-store";
import FollowButton from "@/components/profile/follow-button";
import Content from "../item/content";

interface PollListItemProps {
  user: {
    name: string;
    avatar: string | null;
    username: string;
    isVerified: boolean;
  };
  icon?: RemixiconComponentType;
  createdAt: string;
}

function PollListItem({ user, icon: Icon, createdAt }: PollListItemProps) {
  const { currentUser } = useAppStore();

  return (
    <div className="flex items-center gap-x-4">
      <div className="relative">
        <Avatar className="size-8">
          <AvatarImage src={user.avatar ?? undefined} />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        {Icon && (
          <div className="absolute -bottom-1 -right-0.5 bg-white p-0.5 rounded-full border-2 border-background">
            <Icon className="size-2.5 text-black" />
          </div>
        )}
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full pt-2 pb-1">
          <div className="inline-flex flex-col">
            <div className="inline-flex items-center gap-x-2">
              <Link
                className="font-bold text-sm hover:underline"
                href={`/users/${user.username}`}
              >
                {user.name}
              </Link>
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
          {currentUser?.username !== user.username && (
            <FollowButton
              username={user.username}
              size="sm"
              variant="outline"
            />
          )}
        </div>

        {/* {content && (
          <div className="inline-flex items-center gap-x-2 text-foreground/80">
            <RiQuoteText className="size-4" />
            <Content content={content} className="text-[14px]" />
          </div>
        )} */}
      </div>
    </div>
  );
}

export default PollListItem;
