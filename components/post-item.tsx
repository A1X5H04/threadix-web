import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "./ui/button";

import {
  RiBookmarkLine,
  RiChat1Line,
  RiHeart3Line,
  RiMoreFill,
  RiShareFill,
} from "@remixicon/react";
import { Separator } from "./ui/separator";

function PostItem() {
  return (
    <div className="w-full p-1 flex gap-y-2 justify-start">
      <div className="flex flex-col items-center">
        <Avatar className="w-9 h-9">
          <AvatarImage src="https://api.dicebear.com/8.x/lorelei-neutral/svg" />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Separator orientation="vertical" className="mx-5 my-2 h-full" />
        </div>
        <div className="flex items-center -space-x-2 p-1.5 mt-3">
          <Avatar className="w-5 h-5">
            <AvatarImage src="https://api.dicebear.com/8.x/lorelei-neutral/svg" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <Avatar className="w-5 h-5">
            <AvatarImage src="https://api.dicebear.com/8.x/lorelei-neutral/svg" />
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
              <span className="text-sm font-medium">Name</span>
              <span className="text-muted-foreground text-xs">
                Today at 12:00 PM
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <RiMoreFill className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
        <div className="flex-1">
          <p className="text-[15px]">
            badsdsf dfasdfasdfsd <br /> asdfasd dfgsd fsdg dsg gfs gdf <br />{" "}
            fasdfasdff
          </p>
          <div className="flex items-center gap-x-2 mt-2">
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
        </div>
        <div className="inline-flex items-center gap-x-2">
          <Button variant="link" size="sm" className="px-0 py-1">
            30 replies
          </Button>
          <Button variant="link" size="sm" className="px-0 py-1">
            25 likes
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
              <AvatarImage src="https://api.dicebear.com/8.x/lorelei-neutral/svg" />
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
