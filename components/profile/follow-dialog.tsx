"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSWR from "swr";
import { GET } from "@/lib/fetcher";
import { User } from "@/types/api-responses/common";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserItem from "./user-item";

interface FollowDialogProps {
  username: string;
}

type ResponseData = {
  followers: User[];
  following: User[];
};

function FollowDialog({ username }: FollowDialogProps) {
  const { data, isLoading } = useSWR(
    `/api/profile/${username}/followers`,
    GET<ResponseData>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="px-0 text-muted-foreground">
          <div className="flex items-center -space-x-1 mr-2">
            {data?.followers.slice(0, 3).map((follower) => (
              <Avatar className="size-4 border">
                <AvatarImage src={follower.avatar ?? undefined} />
                <AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          {data?.followers.length} Follower
          {data?.followers && data.followers.length > 1 && "s"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader>
          <DialogTitle>Your Circle</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Tabs defaultValue="followers">
            <TabsList className="w-full grid grid-cols-2 mb-5">
              <TabsTrigger value="followers">Followers</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent
              value="followers"
              className="max-h-60 px-2 my-2 overflow-y-scroll no-scrollbar space-y-1"
            >
              {data?.followers && data.followers.length > 0 ? (
                data.followers.map((follower) => (
                  <UserItem key={follower.id} user={follower} />
                ))
              ) : (
                <div className="w-full h-60 grid place-items-center">
                  <h3 className="text-muted-foreground">No followers yet</h3>
                </div>
              )}
            </TabsContent>
            <TabsContent
              value="following"
              className="max-h-60 px-2 my-2 overflow-y-scroll no-scrollbar space-y-1"
            >
              {data?.following && data.following.length > 0 ? (
                data.following.map((follower) => (
                  <UserItem key={follower.id} user={follower} />
                ))
              ) : (
                <div className="w-full h-60 grid place-items-center">
                  <h3 className="text-muted-foreground">
                    Follow anyone to see it here
                  </h3>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FollowDialog;
