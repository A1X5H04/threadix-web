import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "./ui/button";
import { formatDate } from "@/lib/format";

import { RiMoreFill, RiVerifiedBadgeFill } from "@remixicon/react";
import { Separator } from "@/components/ui/separator";
import PostQuoted from "./post-quote";

import PostContent from "./post-content";
import PostActions from "./post-actions";
import PostPoll from "./post-poll";
import { TooltipProvider } from "./ui/tooltip";

function PostItem({ data, user }: any) {
  return (
    <div className="w-full pr-4 py-4 flex gap-y-2 justify-start">
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
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-start">
            <div className="inline-flex flex-col">
              <p className="text-sm font-medium inline-flex items-center gap-x-1">
                {data.user.username}

                <RiVerifiedBadgeFill className="w-3.5 h-3.5 " />
              </p>
              <p className="text-muted-foreground text-xs">
                {formatDate(new Date(data.createdAt))}&nbsp;·&nbsp;
                <span className="text-gray-300">Pune Maharashtra</span>
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <RiMoreFill className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
        <div className="flex-1 mt-4 mb-5 space-y-4">
          {data.poll.question && <PostContent content={data.content} />}

          {data.poll ? (
            <PostPoll data={data} />
          ) : (
            <PostContent content={data.content} />
          )}

          <PostQuoted data={data} />

          {/* The sea provides a source of food, transportation, and recreation
            for humans. It is a place of beauty and tranquility, with its
            shimmering blue waters and gentle waves. However, the sea can also
            be unpredictable and powerful, capable of causing storms and
            tsunamis. Exploring the depths of the sea has always been a
            fascination for scientists and adventurers alike. */}
        </div>
        <PostActions postId={data.id} />
        <div className="flex items-center mt-4 px-2 gap-x-4 justify-between">
          <div className="inline-flex items-center gap-x-2 text-xs text-muted-foreground">
            <span>25 likes</span>&#183;
            <Button variant="link" size="sm" className="px-0 py-1">
              30 replies
            </Button>
            &#183;
            <Button variant="link" size="sm" className="px-0 py-1">
              0 reposts
            </Button>
          </div>
          <Button variant="link" size="sm" className="px-0 py-1">
            View Activity
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
