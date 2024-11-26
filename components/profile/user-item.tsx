import React from "react";
import { Button } from "../ui/button";
import { formatRelativeDate } from "@/lib/format";
import VerifiedBadge from "../verified-badge";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { User } from "@/types/api-responses/common";
import { useAppStore } from "@/hooks/use-store";

function UserItem({ user }: { user: User }) {
  const { currentUser } = useAppStore();
  return (
    <div className="flex items-center gap-x-4">
      <Avatar className="size-8">
        <AvatarImage src={user.avatar ?? undefined} />
        <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex justify-between w-full py-2">
        <div className="inline-flex flex-col">
          <div className="inline-flex items-center gap-x-2">
            <span className="font-bold text-sm">{user.name}</span>
            {user.isVerified && (
              <VerifiedBadge userName={user.name} iconClassName="size-3" />
            )}
          </div>
          <span className="text-xs text-muted-foreground">{user.username}</span>
        </div>
        {currentUser?.username !== user.username && (
          <Button size="sm" variant="outline">
            Follow Back
          </Button>
        )}
      </div>
    </div>
  );
}

export default UserItem;
