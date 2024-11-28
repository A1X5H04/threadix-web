import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { formatRelativeDate } from "@/lib/format";
import VerifiedBadge from "../verified-badge";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { User } from "@/types/api-responses/common";
import { useAppStore } from "@/hooks/use-store";
import { followUser, unfollowUser } from "@/actions/users";
import { useRouter } from "next-nprogress-bar";
import toast from "react-hot-toast";
import Link from "next/link";
import FollowButton from "./follow-button";

function UserItem({
  type,
  user,
}: {
  type: "follower" | "following";
  user: User;
}) {
  const router = useRouter();
  const { currentUser } = useAppStore();
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-x-4">
      <Avatar className="size-8">
        <AvatarImage src={user.avatar ?? undefined} />
        <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex justify-between w-full py-2">
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
          </div>
          <span className="text-xs text-muted-foreground">{user.username}</span>
        </div>
        {currentUser?.username !== user.username && (
          <FollowButton username={user.username} size="sm" variant="outline" />
        )}
      </div>
    </div>
  );
}

export default UserItem;
