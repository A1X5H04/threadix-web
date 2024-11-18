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

interface FollowDialogProps {
  children: React.ReactNode;
}

function FollowDialog({ children }: FollowDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="px-0 text-muted-foreground">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-2xl">
        <DialogHeader>
          <DialogTitle>Your Circle</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Tabs defaultValue="followers">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="followers">Followers</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent
              value="followers"
              className="max-h-60 px-2 my-2 overflow-y-scroll no-scrollbar"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-x-2 px-2 py-3 border-b"
                >
                  <div className="inline-flex items-center gap-x-2.5">
                    <img
                      src="https://api.dicebear.com/8.x/avataaars-neutral/svg?seed=Midnight"
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm">User Name</p>
                      <p className="text-xs text-muted-foreground">Username</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Follow
                  </Button>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FollowDialog;
