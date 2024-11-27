import { Button } from "@/components/ui/button";
import VerifiedBadge from "@/components/verified-badge";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/api-responses/common";

function UserItemHorizontal({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-x-4">
      <Avatar className="size-12">
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
          <span className="text-sm text-muted-foreground">{user.username}</span>
        </div>

        <Button>View Profile</Button>
      </div>
    </div>
  );
}

export default UserItemHorizontal;
