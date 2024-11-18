import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { dislikePost, likePost } from "@/actions/post/like";
import { RiHeart3Fill, RiHeart3Line } from "@remixicon/react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

type Props = {
  postId: string;
  likes: number;
  isLiked: boolean;
};

function LikeButton({ postId, likes, isLiked }: Props) {
  const [pending, transition] = useTransition();
  // Using local state because mutating a section of cached data is too inefficient :(
  const [isLike, setIsLike] = React.useState(isLiked);
  const [likesCounts, setLikesCounts] = React.useState(likes);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLike) {
      setLikesCounts((prev) => prev - 1);
      setIsLike(false);
      transition(() =>
        dislikePost(postId)
          .then(() => {
            toast.success("Post disliked");
          })
          .catch(() => {
            toast.error("Failed to dislike the post");
            setLikesCounts(likes);
            setIsLike(true);
          })
      );
    } else {
      setLikesCounts((prev) => prev + 1);
      setIsLike(true);

      transition(() =>
        likePost(postId)
          .then(() => {
            toast.success("Post liked");
          })
          .catch(() => {
            toast.error("Failed to like the post");
            setLikesCounts(likes);
            setIsLike(false);
          })
      );
    }
  };

  return (
    <Button
      disabled={pending}
      onClick={handleLike}
      className={cn(
        "text-sm gap-x-2 text-muted-foreground font-light"
        // isLike ? "bg-rose-800/25" : "bg-muted"
      )}
      variant="ghost"
      size="sm"
    >
      {isLike ? (
        <RiHeart3Fill className="w-5 h-5 text-rose-500" />
      ) : (
        <RiHeart3Line className="w-5 h-5 text-muted-foreground" />
      )}
      {likesCounts > 0 && likesCounts}
    </Button>
  );
}

export default LikeButton;
