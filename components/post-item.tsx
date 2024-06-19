import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "./ui/button";
import { formatDate } from "@/lib/format";

import {
  RiChat1Line,
  RiChatQuoteLine,
  RiHeart3Line,
  RiMoreFill,
  RiRepeatLine,
  RiShareForwardBoxLine,
} from "@remixicon/react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import useSWR from "swr";

function PostItem({ data }: any) {
  const { mutate } = useSWR(`/api/post/`);

  const handleLike = async () => {};

  return (
    <div className="w-full p-2 flex gap-y-2 justify-start">
      <div className="flex flex-col items-center">
        <Avatar className="w-9 h-9">
          <AvatarImage src="https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Felix" />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Separator orientation="vertical" className="mx-5 my-2 h-full" />
        </div>
        <div className="flex items-center -space-x-2 p-1.5 mt-3">
          <Avatar className="w-5 h-5">
            <AvatarImage src="https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Felix" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <Avatar className="w-5 h-5">
            <AvatarImage src="https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Felix" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <Avatar className="w-5 h-5 bg-muted">
            <AvatarImage src={undefined} />
            <AvatarFallback className="text-xs">+2</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-start">
            <div className="inline-flex flex-col">
              <span className="text-sm font-medium">{data.user.name}</span>
              <span className="text-muted-foreground text-xs">
                {formatDate(new Date(data.createdAt))}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <RiMoreFill className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
        <div className="flex-1">
          <p className="text-[15px]">
            {data.content || "This is a post"}
            <span className="font-semibold cursor-pointer hover:underline">
              @jane_doe
            </span>
            {/* The sea provides a source of food, transportation, and
            recreation for humans. It is a place of beauty and tranquility, with
            its shimmering blue waters and gentle waves. However, the sea can
            also be unpredictable and powerful, capable of causing storms and
            tsunamis. Exploring the depths of the sea has always been a
            fascination for scientists and adventurers alike. */}
          </p>
          <div className="relative w-full h-72 my-2">
            <Image
              className="rounded-lg object-cover"
              src="https://images.unsplash.com/photo-1542397284385-6010376c5337?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              fill
              alt="Post Image"
            />
          </div>
          <div className="flex items-center gap-x-2 mt-2">
            <Button variant="ghost" size="icon">
              <RiHeart3Line className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon">
              <RiChat1Line className="w-5 h-5 text-muted-foreground" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <RiRepeatLine className="w-5 h-5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <RiChatQuoteLine className="w-4 h-4 mr-2" /> Quote
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RiRepeatLine className="w-4 h-4 mr-2" />
                  Repost
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon">
              <RiShareForwardBoxLine className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
        <div className="inline-flex items-center gap-x-2">
          <Button variant="link" size="sm" className="px-0 py-1">
            25 likes
          </Button>
          ·
          <Button variant="link" size="sm" className="px-0 py-1">
            30 replies
          </Button>
          ·
          <Button variant="link" size="sm" className="px-0 py-1">
            0 reposts
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PostItem;

{
  /* <div className="flex">
      <div className="flex items-center justify-between w-full">
        <div>
          <div className="inline-flex items-center gap-x-2">
            <Avatar className="w-9 h-9">
              <AvatarImage src="https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Felix" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <div className="inline-flex flex-col">
              <span className="text-sm font-medium">Name</span>
              <span className="text-muted-foreground text-xs">
                Today at 12:00 PM
              </span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <RiMoreFill className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>
      <div>
        This is my post Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Autem optio sequi veritatis deserunt nisi voluptates maiores id
        voluptas nam dolorum, aperiam aspernatur pariatur inventore at libero
        modi nemo sapiente dolor ipsum. Et mollitia tempore commodi error
        repudiandae haum repellat accusantium?
      </div>
      <div className="flex items-center gap-x-2">
        <Button variant="ghost" size="icon">
          <RiHeart3Line className="w-5 h-5 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon">
          <RiChat1Line className="w-5 h-5 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon">
          <RiShareFill className="w-5 h-5 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon">
          <RiBookmarkLine className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>
      <Button variant="link" className="text-sm">
        30 replies
      </Button>
    </div> */
}

{
  /* <div className="p-3 ">
      <div className="flex items-start gap-x-2">
        <Avatar>
          <AvatarImage
            src="https://api.dicebear.com/8.x/lorelei/svg?seed=Loki"
            className="bg-muted"
          />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>

        <div className="w-full flex items-center justify-between">
          <div className="inline-flex flex-col">
            <span className="text-sm font-medium">Name</span>
            <span className="text-muted-foreground text-xs">
              Today at 12:00 PM
            </span>
          </div>
          <Button variant="ghost" size="icon">
            <RiMoreFill className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex gap-x-2 h-full">
          <Separator orientation="vertical" className="mx-5 my-2 h-full" />
          <div>
            <div>
              badsdsf dfasdfasdfsd <br /> asdfasd dfgsd fsdg dsg gfs gdf <br />{" "}
              fasdfasdff
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex items-center -space-x-2 px-1">
          <Avatar className="w-5 h-5">
            <AvatarImage
              src="https://api.dicebear.com/8.x/lorelei/svg?seed=Loki"
              className="bg-muted"
            />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <Avatar className="w-5 h-5">
            <AvatarImage
              src="https://api.dicebear.com/8.x/lorelei/svg?seed=Loki"
              className="bg-muted"
            />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
        </div>

        <Button variant="link">Two replies</Button>
      </div>
    </div> */
}
