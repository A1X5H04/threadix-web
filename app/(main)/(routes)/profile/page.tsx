import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiMoreFill } from "@remixicon/react";
import React from "react";

function ProfilePage() {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between">
        <div className="inline-flex flex-col">
          <h4 className="text-xl font-semibold">Name</h4>
          <span className="text-muted-foreground text-sm">username</span>
        </div>
        <div>
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://api.dicebear.com/8.x/lorelei-neutral/svg" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        <p className="text-[15px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A similique
          laboriosam molestias ea dolore vel accusamus aut magni nulla vero?
        </p>
        <div className="flex items-center justify-between gap-x-2">
          <div className="inline-flex items-center gap-x-2">
            <Button variant="link" className="px-0 text-muted-foreground">
              10 Followers
            </Button>
            •
            <Button variant="link" className="px-0 text-muted-foreground">
              https://example.com
            </Button>
          </div>
          <Button variant="ghost" size="icon">
            <RiMoreFill />
          </Button>
        </div>
        <div>
          <Button variant="outline" className="w-full">
            Edit Profile
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Posts</TabsTrigger>
            <TabsTrigger value="password">Replies</TabsTrigger>
            <TabsContent value="account">asdfasd</TabsContent>
            <TabsContent value="password">rreete</TabsContent>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}

export default ProfilePage;
