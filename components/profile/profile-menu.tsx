"use client";

import { signOut } from "@/actions/sign-out";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiLink, RiLogoutBoxLine, RiMoreFill } from "@remixicon/react";
import React from "react";
import toast from "react-hot-toast";

function ProfileMenu({ username }: { username: string }) {
  const handleLinkCopy = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/users/${username}`)
      .then(() => toast.success("Profile link copied to clipboard"))
      .catch(() => toast.error("Failed to copy profile link"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <RiMoreFill />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={handleLinkCopy}
          className="inline-flex gap-x-2 w-full"
        >
          <RiLink className="w-4 h-4" />
          Copy Profile Link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await signOut();
          }}
          className="inline-flex gap-x-2 w-full"
        >
          <RiLogoutBoxLine className="w-4 h-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileMenu;
