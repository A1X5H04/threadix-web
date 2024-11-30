import React, { useContext } from "react";
import { redirect } from "next/navigation";
import { RiChat1Line, RiShareForwardLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { Post, ReplyPermissions } from "@/types/api-responses/post/single";
import { useAppStore, useModalStore } from "@/hooks/use-store";
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
};

function PostActions({ data, postId, counts }: Props) {
  let replyPermission = false;
  const { onOpen } = useModalStore((state) => state.post);
  const { currentUser, repostedPosts, followingUser } = useAppStore();

  if (!currentUser) redirect("/login");

  switch (data.replyPermissions) {
    case ReplyPermissions.ANYONE:
      replyPermission = true;
      break;
    case ReplyPermissions.FOLLOWERS:
      replyPermission = followingUser.includes(data.user.username);
      break;
    case ReplyPermissions.MENTIONS:
      replyPermission = data.mentions?.includes(currentUser.username) || false;
      break;
    default:
      replyPermission = currentUser.username === data.user.username;
  }

  return (
    <div
      data-prevent-nprogress={true}
      className="flex items-center gap-x-2 mt-2"
      onClick={(e) => e.preventDefault()}
      onMouseDown={(e) => e.preventDefault()}
    >
      <LikeButton postId={postId} likes={counts.likes} />
      {replyPermission && (
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
      )}
      <RepostDropdown
        reposts={counts.reposts}
        hasPermission={replyPermission}
        repostData={{ postId: postId, userId: data.userId }}
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
