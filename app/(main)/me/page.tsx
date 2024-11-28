import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { EditDialog } from "./_components/edit-dialog";
import FollowDialog from "@/components/profile/follow-dialog";
import { cn } from "@/lib/utils";
import ProfileMenu from "@/components/profile/profile-menu";
import { RiLockFill } from "@remixicon/react";
import ProfileHeader from "@/components/profile/header";
import ProfileTabsContent from "@/components/profile/tabs-content";
import UserProfileSkeleton from "@/components/skeletons/user-profile";
import Link from "next/link";

async function ProfilePage() {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");

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
                &•
                <Link
                  href={user.link}
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground hover:underline text-sm"
                >
                  {user.link}
                </Link>
              </>
            )}
          </div>
          <ProfileMenu username={user.username} />
        </div>
        <EditDialog user={user} />
      </div>
      <div className="mt-6">
        <Tabs defaultValue="posts">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="replies">Replies</TabsTrigger>
            <TabsTrigger value="repost">Reposts</TabsTrigger>
          </TabsList>
          {user.isPublic ? (
            <ProfileTabsContent username={user.username} />
          ) : (
            <div className="grid place-items-center w-full h-60">
              <div className="grid place-items-center">
                <RiLockFill className="w-16 h-16 text-muted mb-2" />
                <h4 className="font-semibold text-lg">
                  {user.name} has a private account.
                </h4>
                <p className="text-sm text-muted-foreground">
                  Only followers can see their posts.
                </p>
              </div>
            </div>
          )}
        </Tabs>
      </div>
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
