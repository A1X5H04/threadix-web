import React, { useMemo, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { dislikePost, likePost } from "@/actions/post/like";
import { RiHeart3Fill, RiHeart3Line } from "@remixicon/react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useSWRConfig } from "swr";
import { produce } from "immer";
import { Post } from "@/types/api-responses/post/single";
import { useAppStore } from "@/hooks/use-store";

type Props = {
  postId: string;
  likes: number;
};

function LikeButton({ postId, likes }: Props) {
  const { likedPosts, setLikedPosts } = useAppStore();
  const { mutate } = useSWRConfig();

  const isLiked = useMemo(
    () => likedPosts.includes(postId),
    [likedPosts, postId]
  );

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLiked) {
      mutate(
        "/api/post",
        (data) => {
          return produce(data, (draft: { posts: Post[] }) => {
            const post = draft.posts.find((post) => post?.id === postId);
            if (post) {
              post.likesCount = post.likesCount - 1;
            }
          });
        },
        { revalidate: false, populateCache: true }
      );
      setLikedPosts(likedPosts.filter((id) => id !== postId));
      try {
        await dislikePost(postId);
        toast.success("Post disliked");
      } catch {
        toast.error("Failed to dislike the post");
        mutate("/api/post");
      }
    } else {
      mutate(
        "/api/post",
        (data) => {
          return produce(data, (draft: { posts: Post[] }) => {
            const post = draft.posts.find((post) => post?.id === postId);
            if (post) {
              post.likesCount = post.likesCount + 1;
            }
          });
        },
        { revalidate: false, populateCache: true }
      );
      setLikedPosts([...likedPosts, postId]);
      try {
        await likePost(postId);
        toast.success("Post liked");
      } catch {
        toast.error("Failed to like the post");
        mutate("/api/post");
      }
    }
  };

  return (
    <Button
      onClick={handleLike}
      className={cn(
        "text-sm gap-x-2 text-muted-foreground font-light"
        // isLike ? "bg-rose-800/25" : "bg-muted"
      )}
      variant="ghost"
      size="sm"
    >
      {isLiked ? (
        <RiHeart3Fill className="w-5 h-5 text-rose-500" />
      ) : (
        <RiHeart3Line className="w-5 h-5 text-muted-foreground" />
      )}
      {likes > 0 && likes}
    </Button>
  );
}

export default LikeButton;
