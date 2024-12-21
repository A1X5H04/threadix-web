import React, { useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import {
  RiBookmark2Line,
  RiBookmarkLine,
  RiDeleteBin2Line,

  RiLinkM,
  RiMoreFill,
  RiUserForbidLine, RiUserLine,
  RiUserUnfollowFill,
  RiUserUnfollowLine,
} from "@remixicon/react";
import toast from "react-hot-toast";
import useConfirmDialog from "@/hooks/use-confirm";
import {
  blockUser,
  changeReplyPermissions,
  deletePost,
  muteUser,
  unMuteUser,
} from "@/actions/users";
import { ReplyPermissions } from "@/types/api-responses/post/single";
import { useAppStore } from "@/hooks/use-store";

import { savePost, unSavePost } from "@/actions/post/save";
import { User } from "lucia";
import { useRouter } from 'next-nprogress-bar';

interface PostDropdownProps {
  userData: Pick<User, "id" | "username">;
  postId: string;
  replyPermissions: ReplyPermissions;
  isCurrentUser: boolean;
}

function PostDropdown({
  userData,
  replyPermissions,
  postId,
  isCurrentUser,
}: PostDropdownProps) {
  const router = useRouter();
  const { savedPosts, mutedUsers, setMutedUsers, setSavedPosts } =
    useAppStore();
  const [replyPermission, setReplyPermission] =
    useState<ReplyPermissions>(replyPermissions);
  const [openDialogFn, ConfirmDialog] = useConfirmDialog();

  const isPostSaved = useMemo(
    () => savedPosts.includes(postId),
    [savedPosts, postId]
  );

  const isMutedUser = useMemo(
    () => mutedUsers.includes(userData.id),
    [mutedUsers, userData.id]
  );

  const handleViewProfile = () => {
    router.push(`/users/${userData.username}`);
  }
  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/users/${userData.username}/posts/${postId}`
    );
    toast.success("Link Copied!");
  };

  const handleReplyPermissionsChange = (value: ReplyPermissions) => {
    const loadingToast = toast.loading("Updating Permissions...");
    changeReplyPermissions(postId, value)
      .then(() =>
        toast.success(`Reply permission updated to "${value}"`, {
          id: loadingToast,
        })
      )
      .catch(() =>
        toast.error("Failed to update permission", { id: loadingToast })
      );
  };

  const handleDeletePost = () => {
    openDialogFn({
      title: "Delete Post?",
      description: "This action cannot be undone. Are you sure?",
      variant: "destructive",
      confirmText: "Yes, Delete Post",
      onConfirm: () => {
        const loadingToast = toast.loading("Deleting Post...");
        deletePost(postId)
          .then(() => toast.success("Post Deleted!", { id: loadingToast }))
          .catch(() =>
            toast.error("Failed to delete post", { id: loadingToast })
          );
      },
    });
  };

  const handleMuteUser = () => {
    if (isMutedUser) {
      const loadingToast = toast.loading("Unmuting User...");
      unMuteUser(userData.id)
        .then(() => {
          setMutedUsers(mutedUsers.filter((id) => id !== userData.id));
          toast.success("User Unmuted!", { id: loadingToast });
        })
        .catch(() =>
          toast.error("Failed to unmute user", { id: loadingToast })
        );
    } else {
      const loadingToast = toast.loading("Muting User...");

      muteUser(userData.id)
        .then(() => {
          setMutedUsers([...mutedUsers, userData.id]);
          toast.success(
            "You won't be notified about activities from this user anymore.",
            {
              id: loadingToast,
            }
          );
        })
        .catch(() => toast.error("Failed to mute user", { id: loadingToast }));
    }
  };

  const handleBlockUser = () => {
    openDialogFn({
      title: `Block ${userData.username || "User"}?`,
      description: `${
        userData.username || "User"
      } won't be able to find your profile or posts, nor you will find theirs. they won't be notified that you blocked them.`,
      variant: "destructive",
      confirmText: `Yes, Block ${userData.username || "User"}`,
      onConfirm: () => {
        blockUser(userData.id)
          .then(() => {
            toast.success("User Blocked!");
            router.refresh();
            typeof window !== "undefined" && window.location.reload();
          })
          .catch(() => toast.error("Failed to block user"));
      },
    });
  };

  const handleSavePost = () => {
    if (isPostSaved) {
      const loadingToast = toast.loading("Removing from saved posts...");
      unSavePost(postId)
        .then(() => {
          setSavedPosts(savedPosts.filter((id) => id !== postId));
          toast.success("Removed from saved posts", { id: loadingToast });
        })
        .catch(() =>
          toast.error("Failed to remove from saved posts", { id: loadingToast })
        );
    } else {
      const loadingToast = toast.loading("Saving Post...");
      savePost(postId)
        .then(() => {
          setSavedPosts([...savedPosts, postId]);
          toast.success("Post Saved!", { id: loadingToast });
        })
        .catch(() => toast.error("Failed to save post", { id: loadingToast }));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={(e) => e.stopPropagation()}
          variant="ghost"
          size="icon"
          className="-mb-4 size-7 rounded-sm"
        >
          <RiMoreFill className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        className="min-w-48"
        align="end"
      >
        <DropdownMenuItem onClick={handleViewProfile} className="justify-between">
          View Profile
          <RiUserLine className="w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSavePost} className="justify-between">
          {isPostSaved ? "Unsave Post" : "Save Post"}

          {isPostSaved ? (
            <RiBookmark2Line className="w-4 h-4" />
          ) : (
            <RiBookmarkLine className="w-4 h-4" />
          )}
        </DropdownMenuItem>

        {isCurrentUser && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Who can reply & quote</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={replyPermission}
                    onValueChange={(value) => {
                      setReplyPermission(value as ReplyPermissions);
                      handleReplyPermissionsChange(value as ReplyPermissions);
                    }}
                  >
                    <DropdownMenuRadioItem value="anyone">
                      Anyone
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="followers">
                      Followers
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="mentions">
                      Mentions
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuItem
              onClick={handleDeletePost}
              className="justify-between text-red-500"
            >
              Delete Post
              <RiDeleteBin2Line className="w-4 h-4" />
            </DropdownMenuItem>
          </>
        )}
        {!isCurrentUser && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleMuteUser}
              className="justify-between"
            >
              {isMutedUser ? "Unmute User" : "Mute User"}
              {isMutedUser ? (
                <RiUserUnfollowFill className="w-4 h-4" />
              ) : (
                <RiUserUnfollowLine className="w-4 h-4" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleBlockUser}
              className="text-red-500 justify-between"
            >
              Block User
              <RiUserForbidLine className="w-4 h-4" />
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleCopyLink} className="justify-between">
          Copy Link
          <RiLinkM className="w-4 h-4" />
        </DropdownMenuItem>

        {/* <DropdownMenuItem onClick={handleSavePost} className="justify-between">
          Edit Post
          <RiPencilLine className="w-4 h-4" />
        </DropdownMenuItem> */}
      </DropdownMenuContent>
      <ConfirmDialog />
    </DropdownMenu>
  );
}

export default PostDropdown;
