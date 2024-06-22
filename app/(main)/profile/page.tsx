import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { validateRequest } from "@/lib/auth";
import { RiLockFill, RiMoreFill } from "@remixicon/react";
import { redirect } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";
import { EditDialog } from "./_components/edit-dialog";
import FollowDialog from "./_components/follow-dialog";

async function ProfilePage() {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");

  return (
    <div className="px-5">
      <div className="flex items-center justify-between">
        <div className="inline-flex flex-col">
          <h4 className="text-xl font-bold">{user.name}</h4>
          {/* <RiLockFill className="w-4 h-4 text-muted-foreground" /> */}
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
          className={twMerge(
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
        <div>
          <EditDialog />
        </div>
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
    </div>
  );
}

export default ProfilePage;
