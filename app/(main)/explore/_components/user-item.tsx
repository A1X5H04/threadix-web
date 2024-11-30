import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import VerifiedBadge from "@/components/verified-badge";
import { User } from "@/types/api-responses/common";
import React from "react";

function UserItem({ user }: { user: User & { followersCount: number } }) {
  return (
    <div className="relative size-48 border rounded-md grid place-items-center flex-shrink-0">
      <div className="flex flex-col items-center">
        <Avatar className="size-16">
          <AvatarImage src={user.avatar ?? undefined} />
          <AvatarFallback>
            {user.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="inline-flex items-center gap-x-2 mt-2">
          <p className="font-semibold text-sm">{user.name}</p>
          {user.isVerified && <VerifiedBadge userName={user.name} />}
        </div>
        <p className="text-xs text-muted-foreground">@{user.username}</p>
        <Button
          title="Follow user ?"
          className="mt-2 font-semibold"
          variant="outline"
          size="sm"
        >
          {user.followersCount ?? 0} followers
        </Button>
      </div>
    </div>
  );
}

export default UserItem;