import React, { useMemo, useTransition } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useAppStore } from "@/hooks/use-store";
import { followUser } from "@/actions/users";
import toast from "react-hot-toast";

interface FollowButtonProps extends ButtonProps {
  username: string;
}

function FollowButton({ username, ...rest }: FollowButtonProps) {
  const { followingUser, setFollowingUser } = useAppStore();
  const [pending, startTransition] = useTransition();

  const isFollowing = useMemo(
    () => followingUser.includes(username),
    [username, followingUser]
  );

  const handleClick = () => {
    if (isFollowing) return;

    startTransition(() => {
      followUser(username)
        .then(() => {
          toast.success(`Now following ${username}`);
          setFollowingUser([...followingUser, username]);
        })
        .catch(() => toast.error(`Failed to follow ${username}`));
    });
  };

  return (
    <Button
      disabled={isFollowing}
      isLoading={pending}
      onClick={handleClick}
      {...rest}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}

export default FollowButton;
