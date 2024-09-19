import React from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

import {
  RiChat1Line,
  RiChatQuoteLine,
  RiHeart3Fill,
  RiHeart3Line,
  RiRepeatLine,
  RiShareForwardBoxLine,
} from "@remixicon/react";
import { Button } from "./ui/button";
import useSWR from "swr";
import axios from "axios";

function PostActions({ postId }: { postId: string }) {
  const isLike = false;

  return (
    <div className="flex items-center gap-x-2 mt-2">
      <Button
        className="text-sm gap-x-2 text-muted-foreground font-light"
        variant="ghost"
        size="sm"
      >
        {isLike ? (
          <RiHeart3Fill className="w-5 h-5 text-rose-500" />
        ) : (
          <RiHeart3Line className="w-5 h-5 text-muted-foreground" />
        )}
        0
      </Button>
      <Button variant="ghost" size="icon">
        <RiChat1Line className="w-5 h-5 text-muted-foreground" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <RiRepeatLine className="w-5 h-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <RiChatQuoteLine className="w-4 h-4 mr-2" /> Quote
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RiRepeatLine className="w-4 h-4 mr-2" />
            Repost
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="ghost" size="icon">
        <RiShareForwardBoxLine className="w-5 h-5 text-muted-foreground" />
      </Button>
    </div>
  );
}

export default PostActions;
