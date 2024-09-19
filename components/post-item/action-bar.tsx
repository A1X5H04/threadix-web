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
  RiShareForwardLine,
} from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { postData } from "@/data";
import ReplyDialog from "../dialogs/reply";
import { dislikePost, likePost } from "@/actions/post/like";
import LikeButton from "./like-button";

type Props = {
  data: typeof postData;
  postId: string;
  counts: {
    likes: number;
    replies: number;
    reposts: number;
  };
  isLiked: boolean;
};

function PostActions({ data, postId, counts, isLiked }: Props) {
  return (
    <div className="flex items-center gap-x-2">
      <LikeButton postId={postId} likes={counts.likes} isLiked={isLiked} />
      <ReplyDialog data={data}>
        <Button
          className="text-sm gap-x-2 text-muted-foreground font-light px-2"
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
