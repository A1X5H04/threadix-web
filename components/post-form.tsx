"use client";

import React, { use } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  RiAtLine,
  RiBarChartHorizontalLine,
  RiEmotionLine,
  RiImage2Line,
  RiVideoLine,
} from "@remixicon/react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useToast } from "./ui/use-toast";

function PostForm() {
  const { toast } = useToast();

  return (
    <div className="flex items-start gap-x-2 w-full h-full p-4 rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex flex-col items-center gap-y-1 ">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://api.dicebear.com/8.x/lorelei-neutral/svg" />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Separator orientation="vertical" className="h-full mx-4" />
        </div>
      </div>
      <div className="w-full space-y-2">
        <div className="flex gap-x-2">
          <div className="flex-1">
            <ReactTextareaAutosize
              maxRows={5}
              className="flex w-full bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:placeholder:text-muted focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              placeholder="What's on your mind?"
            />
          </div>
          <Button
            className="font-semibold"
            onClick={() => {
              toast({
                title: "Post Created",
                description: "Your post has been created successfully",
              });
            }}
          >
            Post
          </Button>
        </div>
        <div className="inline-flex items-center justify-between w-full">
          <div>
            <Button variant="ghost" size="icon">
              <RiEmotionLine className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon">
              <RiImage2Line className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon">
              <RiVideoLine className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon">
              <RiBarChartHorizontalLine className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon">
              <RiAtLine className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
          <span className="text-xs text-muted-foreground">Anyone</span>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
