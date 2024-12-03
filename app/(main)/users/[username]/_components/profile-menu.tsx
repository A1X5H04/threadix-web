"use client";

import { blockUser, muteUser, unMuteUser } from "@/actions/users";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useConfirmDialog from "@/hooks/use-confirm";
import { useAppStore } from "@/hooks/use-store";
import {
  RiInfoI,
  RiLink,
  RiMoreFill,
  RiUserForbidLine,
  RiUserUnfollowFill,
  RiUserUnfollowLine,
} from "@remixicon/react";
import { User } from "lucia";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import toast from "react-hot-toast";

function ProfileMenu({
  user,
}: {
  user: Pick<User, "id" | "name" | "username">;
}) {
  const router = useRouter();
  const { mutedUsers, setMutedUsers } = useAppStore();
  const [openDialogFn, ConfirmDialog] = useConfirmDialog();
  const handleLinkCopy = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/users/${user.username}`)
      .then(() => toast.success("Profile link copied to clipboard"))
      .catch(() => toast.error("Failed to copy profile link"));
  };

  const isMutedUser = useMemo(
    () => mutedUsers.includes(user.id),
    [mutedUsers, user.id]
  );

  const handleMuteUser = () => {
    if (isMutedUser) {
      const loadingToast = toast.loading("Unmuting User...");
      unMuteUser(user.id)
        .then(() => {
          setMutedUsers(mutedUsers.filter((id) => id !== user.id));
          toast.success("User Unmuted!", { id: loadingToast });
        })
        .catch(() =>
          toast.error("Failed to unmute user", { id: loadingToast })
        );
    } else {
      const loadingToast = toast.loading("Muting User...");

      muteUser(user.id)
        .then(() => {
          setMutedUsers([...mutedUsers, user.id]);
          toast.success(
            "You won't be notified about activities from this user anymore.",
            {
              id: loadingToast,
            }
          );
        })
        .catch(() => toast.error("Failed to mute user", { id: loadingToast }));
    }
  };

  const handleBlockUser = () => {
    openDialogFn({
      title: `Block ${user.name || "User"}?`,
      description: `${
        user.name || "User"
      } won't be able to find your profile or posts, nor you will find theirs. they won't be notified that you blocked them.`,
      variant: "destructive",
      confirmText: `Yes, Block ${user.name || "User"}`,
      onConfirm: () => {
        blockUser(user.id)
          .then(() => {
            toast.success("User Blocked!");
            router.refresh();
            typeof window !== "undefined" && window.location.reload();
          })
          .catch(() => toast.error("Failed to block user"));
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <RiMoreFill />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuItem
          onClick={handleLinkCopy}
          className="w-full justify-between"
        >
          Copy Profile Link
          <RiLink className="w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLinkCopy}
          className="justify-between w-full"
        >
          About This User
          <RiInfoI className="w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleMuteUser} className="justify-between">
          {isMutedUser ? "Unmute User" : "Mute User"}
          {isMutedUser ? (
            <RiUserUnfollowFill className="w-4 h-4" />
          ) : (
            <RiUserUnfollowLine className="w-4 h-4" />
          )}{" "}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleBlockUser}
          className="text-red-500 justify-between"
        >
          Block User
          <RiUserForbidLine className="w-4 h-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
      <ConfirmDialog />
    </DropdownMenu>
  );
}

export default ProfileMenu;
