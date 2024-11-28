"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { redirect } from "next/navigation";
import React, { useEffect, useTransition } from "react";
import FollowDialog from "@/components/profile/follow-dialog";
import { cn } from "@/lib/utils";
import ProfileMenu from "@/components/profile/profile-menu";

import { useAppStore } from "@/hooks/use-store";
import useSWR from "swr";
import { GET } from "@/lib/fetcher";
import ProfileHeader from "@/components/profile/header";
import { User } from "lucia";
import { followUser, getFollowingUsers, unfollowUser } from "@/actions/users";
import toast from "react-hot-toast";

import useConfirmDialog from "@/hooks/use-confirm";
import ProfileTabsContent from "@/components/profile/tabs-content";
import UserProfileSkeleton from "@/components/skeletons/user-profile";

function ProfilePage({
  params: { username },
}: {
  params: { username: string };
}) {
  const { currentUser, followingUser, setFollowingUser } = useAppStore();

  const [pending, startTransition] = useTransition();
  const [openDialog, ConfirmDialog] = useConfirmDialog();

  const isFollowing = followingUser.includes(username);

  if (currentUser?.username === username) redirect("/me");

  const { data: user, isLoading } = useSWR(
    `/api/profile/${username}`,
    GET<User>
  );

  if (!user || isLoading) return <UserProfileSkeleton />;

  const handleFollowUnfollow = () => {
    if (isFollowing) {
      openDialog({
        cancelText: "Cancel",
        confirmText: `Yes, Unfollow`,
        description: `Are you sure you want to unfollow ${user.name}?`,
        title: "Unfollow User",
        variant: "destructive",
        onConfirm: () => {
          startTransition(() => {
            unfollowUser(user.username)
              .then(() => {
                setFollowingUser(
                  followingUser.filter((u) => u !== user.username)
                );
                toast.success(`Unfollowed ${user.name}`);
              })
              .catch(() => {
                toast.error("Failed to unfollow user");
              });
          });
        },
      });
    } else {
      startTransition(() => {
        followUser(user.username)
          .then(() => {
            setFollowingUser([...followingUser, user.username]);
            toast.success(`Followed ${user.name}`);
          })
          .catch(() => {
            toast.error("Failed to follow user");
          });
      });
    }
  };

  return (
    <div className="w-full p-5">
      <ProfileHeader user={user} />
      <div className="mt-3.5 space-y-3">
        <p
          className={cn(
            "text-[15px]",
            !user.bio && "text-sm italic text-muted-foreground"
          )}
        >
          {user.bio || `${user.name} has not set a bio yet.`}
        </p>
        <div className="flex items-center justify-between gap-x-2">
          <div className="inline-flex items-center gap-x-2">
            <FollowDialog username={user.username} />
            {user.link && (
              <>
                -
                <Button variant="link" className="px-0 text-muted-foreground">
                  {user.link}
                </Button>
              </>
            )}
          </div>
          <ProfileMenu username={user.username} />
        </div>

        <Button
          variant={isFollowing ? "outline" : "default"}
          onClick={handleFollowUnfollow}
          isLoading={pending}
          className="w-full"
        >
          {isFollowing ? `Unfollow ${user.name}` : `Follow ${user.name}`}
        </Button>
      </div>
      <div className="mt-6">
        <Tabs defaultValue="posts">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="replies">Replies</TabsTrigger>
            <TabsTrigger value="repost">Reposts</TabsTrigger>
          </TabsList>
          <ProfileTabsContent username={user.username} />

          {/* <div className="grid place-items-center w-full h-60">
              <div className="grid place-items-center">
                <RiLockFill className="w-16 h-16 text-muted mb-2" />
                <h4 className="font-semibold text-lg">
                  {user.name} has a private account.
                </h4>
                <p className="text-sm text-muted-foreground">
                  Only followers can see their posts.
                </p>
              </div>
            </div> */}
        </Tabs>
      </div>
      <ConfirmDialog />
    </div>
  );
}

export default ProfilePage;

{
  /* <div className="px-5">
      <div className="flex items-center justify-between">
        <div className="inline-flex flex-col">
          <h4 className="text-xl font-bold">{user.name}</h4>
          <RiLockFill className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground text-sm">{user.username}</span>
        </div>
        <div>
          <Avatar className="w-16 h-16">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="uppercase">
              {user.name.at(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="mt-3.5 space-y-3">
        <p
          className={cn(
            "text-[15px]",
            !user.bio && "text-sm italic text-muted-foreground"
          )}
        >
          {user.bio || `${user.name} has not set a bio yet.`}
        </p>
        <div className="flex items-center justify-between gap-x-2">
          <div className="inline-flex items-center gap-x-2">
            <FollowDialog>
              <Button variant="link" className="px-0">
                No Followers
              </Button>
            </FollowDialog>
            -
            {user.link && (
              <Button variant="link" className="px-0 text-muted-foreground">
                {user.link}
              </Button>
            )}
          </div>
          <Button variant="ghost" size="icon">
            <RiMoreFill />
          </Button>
        </div>
        <div><EditDialog /></div>
      </div>
      <div className="mt-6">
        <Tabs defaultValue="posts">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="replies">Replies</TabsTrigger>
            <TabsTrigger value="repost">Reposts</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">Posts</TabsContent>
          <TabsContent value="replies">Replies</TabsContent>
          <TabsContent value="repost">Repost</TabsContent>
        </Tabs>
      </div>
    </div> */
}
