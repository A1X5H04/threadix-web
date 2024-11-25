import React from "react";
import { User } from "lucia";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import VerifiedBadge from "../verified-badge";

function ProfileHeader({ user }: { user: User }) {
  return (
    <div className="flex items-center justify-between">
      <div className="inline-flex flex-col">
        <div className="inline-flex gap-x-2 items-center">
          <h4 className="text-xl font-bold">{user.name}</h4>
          {user.isVerified && (
            <VerifiedBadge userName={user.name} iconClassName="size-6" />
          )}
        </div>

        <span className="text-muted-foreground text-sm">@{user.username}</span>
      </div>
      <div>
        <Avatar className="w-16 h-16">
          <AvatarImage src={user.avatar} />
          <AvatarFallback className="uppercase">
            {user.name.at(0)}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default ProfileHeader;
