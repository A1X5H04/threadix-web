"use client";

import { signOut } from "@/actions/sign-out";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiInfoI, RiLink, RiMoreFill } from "@remixicon/react";
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileMenu;
