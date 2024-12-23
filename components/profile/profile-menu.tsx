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
import {
  RiAlarmWarningLine,
  RiBookmarkLine,
  RiHeartLine,
  RiLink,
  RiLogoutBoxLine,
  RiMore2Line,
} from "@remixicon/react";
import React from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";

function ProfileMenu({ username }: { username: string }) {
  const router = useRouter();
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
          <RiMore2Line />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={handleLinkCopy}
          className="justify-between gap-x-4 w-full"
        >
          Copy Profile Link
          <RiLink className="w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/me/saved")}
          className="justify-between gap-x-4 w-full"
        >
          Saved Posts
          <RiBookmarkLine className="w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/me/liked")}
          className="justify-between gap-x-4 w-full"
        >
          Liked Posts
          <RiHeartLine className="w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild onClick={handleLinkCopy}>
          <Link
            className="inline-flex justify-between gap-x-4 w-full"
            href="https://github.com/A1X5H04/threadix-web/issues/new"
            target="_blank"
          >
            Report Problem
            <RiAlarmWarningLine className="w-4 h-4" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await signOut();
          }}
          className="text-red-500 justify-between gap-x-4"
        >
          Sign Out
          <RiLogoutBoxLine className="w-4 h-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileMenu;
