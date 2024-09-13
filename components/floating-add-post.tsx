import { RiAddFill } from "@remixicon/react";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import PostFormIndex from "./post-form";

function FloatingAddPost() {
  return (
    <div className="absolute bottom-10 right-1/2 translate-x-1/2">
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center gap-x-2 p-2 bg-background border-2 rounded-lg border-muted text-sm">
            <RiAddFill className="w-6 h-6" />
            Create A Thread
          </button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-2xl">
          <PostFormIndex />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FloatingAddPost;
