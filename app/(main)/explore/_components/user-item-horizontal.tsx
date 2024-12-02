import { Button } from "@/components/ui/button";
import VerifiedBadge from "@/components/verified-badge";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/api-responses/common";
import { RiArrowRightSLine } from "@remixicon/react";

function UserItemHorizontal({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-x-3">
      <Avatar className="size-8">
        <AvatarImage src={user.avatar ?? undefined} />
        <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex justify-between w-full py-2">
        <div className="inline-flex flex-col">
          <div className="inline-flex items-center gap-x-2">
            <p className="font-bold">{user.name}</p>
            {user.isVerified && (
              <VerifiedBadge userName={user.name} iconClassName="size-3" />
            )}
          </div>
          <span className="text-xs text-muted-foreground">{user.username}</span>
        </div>

        <RiArrowRightSLine className="w-6 h-6 text-muted-foreground" />
      </div>
    </div>
  );
}

export default UserItemHorizontal;
