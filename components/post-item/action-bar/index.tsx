import React, { useContext } from "react";
import { redirect } from "next/navigation";
import { RiChat1Line, RiShareForwardLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { PostContext } from "@/context/post";
import { Post } from "@/types/api-response";
import { useModalStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";

import LikeButton from "./like-button";
import RepostDropdown from "./repost-dropdown";

type Props = {
  data: Post;
  postId: string;
  counts: {
    likes: number;
    replies: number;
    reposts: number;
  };
  isLiked: boolean;
};

function PostActions({ data, postId, counts, isLiked }: Props) {
  const { onOpen } = useModalStore((state) => state.post);
  const { currentUser, repostedPosts } = useContext(PostContext);

  if (!currentUser) redirect("/login");

  return (
    <div
      className="flex items-center gap-x-2"
      onClick={(e) => e.preventDefault()}
      onMouseDown={(e) => e.preventDefault()}
    >
      <LikeButton postId={postId} likes={counts.likes} isLiked={isLiked} />
      <Button
        isWrappedInLink
        onClick={() => onOpen(data, "reply")}
        className="text-sm gap-x-2 text-muted-foreground font-light px-2"
        variant="ghost"
        size={counts.replies > 0 ? "sm" : "icon"}
      >
        <RiChat1Line className="w-5 h-5 text-muted-foreground" />
        {counts.replies > 0 && counts.replies}
      </Button>
      <RepostDropdown
        postId={postId}
        openQuoteModal={() => onOpen(data, "quote")}
        initialIsReposted={repostedPosts?.includes(postId) ?? false}
      />
      <Button variant="ghost" size="icon">
        <RiShareForwardLine className="w-5 h-5 text-muted-foreground" />
      </Button>
    </div>
  );
}

export default PostActions;
