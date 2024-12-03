import React, { useMemo } from "react";
import { useSWRConfig } from "swr";
import { produce } from "immer";
import toast from "react-hot-toast";
import { RiHeart3Fill, RiHeart3Line } from "@remixicon/react";

import { dislikePost, likePost } from "@/actions/post/like";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/hooks/use-store";
import { useDebounceFn } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { Post } from "@/types/api-responses/post/single";

type Props = {
  postId: string;
  likes: number;
};

function LikeButton({ postId, likes }: Props) {
  const { likedPosts, setLikedPosts } = useAppStore();
  const isLiked = useMemo(
    () => likedPosts.includes(postId),
    [likedPosts, postId]
  );
  const [liked, setLiked] = React.useState(isLiked);
  const { mutate } = useSWRConfig();

  const displayLikes = useMemo(() => {
    if (liked == isLiked) {
      return likes;
    }
    return liked ? likes + 1 : likes == 0 ? likes : likes - 1;
  }, [liked, likes, isLiked]);

  const handleAction: (like: boolean) => Promise<void> = async (
    like: boolean
  ) => {
    // if both are same then no need to do anything
    if (like == isLiked) return;
    if (like) {
      try {
        await likePost(postId);
        toast.success("Post liked");
        mutate<{ posts: Post[] }>(
          "/api/post",
          (data) => {
            return produce(data, (draft) => {
              if (!draft) return;
              const post = draft.posts.find((post) => post?.id === postId);
              if (post) {
                post.likesCount = post.likesCount + 1;
              }
            });
          },
          { revalidate: false, populateCache: true }
        );
        setLikedPosts([...likedPosts, postId]);
      } catch {
        toast.error("Like failed");
        setLiked(!liked);
      }
    } else {
      try {
        await dislikePost(postId);
        toast.success("Post disliked");
        mutate<{ posts: Post[] }>(
          "/api/post",
          (data) => {
            return produce(data, (draft) => {
              if (!draft) return;
              const post = draft.posts.find((post) => post?.id === postId);
              if (post) {
                post.likesCount = post.likesCount - 1;
              }
            });
          },
          { revalidate: false, populateCache: true }
        );
        setLikedPosts(likedPosts.filter((id) => id !== postId));
      } catch {
        toast.error("Dislike failed");
        setLiked(!liked);
      }
    }
  };

  const debouncedAction = useDebounceFn(handleAction, 750);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setLiked((prev) => {
      const newLiked = !prev;
      debouncedAction(newLiked);
      return newLiked;
    });
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
      {liked ? (
        <RiHeart3Fill className="w-5 h-5 text-rose-500" />
      ) : (
        <RiHeart3Line className="w-5 h-5 text-muted-foreground" />
      )}
      {displayLikes > 0 && displayLikes}
    </Button>
  );
}

export default LikeButton;
