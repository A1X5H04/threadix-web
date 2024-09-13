import React from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  RiChat1Line,
  RiChatQuoteLine,
  RiHeart3Fill,
  RiHeart3Line,
  RiRepeatLine,
  RiShareForwardBoxLine,
  RiShareForwardFill,
  RiShareForwardLine,
} from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { postData } from "@/data";
import ReplyDialog from "../dialogs/reply";

type Props = {
  data: (typeof postData)[number];
  postId: string;
  counts: {
    likes: number;
    replies: number;
    reposts: number;
  };
};

function PostActions({ data, postId, counts }: Props) {
  const isLike = true;

  return (
    <div className="flex items-center gap-x-2">
      <Button
        className="text-base gap-x-2 text-muted-foreground font-light"
        variant="ghost"
        size="sm"
      >
        {isLike ? (
          <RiHeart3Fill className="w-5 h-5 text-rose-500" />
        ) : (
          <RiHeart3Line className="w-5 h-5 text-muted-foreground" />
        )}
        {counts.likes}
      </Button>
      <ReplyDialog data={data}>
        <Button
          className="text-base gap-x-2 text-muted-foreground font-light px-2"
          variant="ghost"
          size={counts.replies > 0 ? "sm" : "icon"}
        >
          <RiChat1Line className="w-5 h-5 text-muted-foreground" />
          {counts.replies > 0 && counts.replies}
        </Button>
      </ReplyDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <RiRepeatLine className="w-5 h-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
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
        <RiShareForwardLine className="w-5 h-5 text-muted-foreground" />
      </Button>
    </div>
  );
}

export default PostActions;
