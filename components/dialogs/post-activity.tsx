import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogContent,
} from "../ui/dialog";
import { Post } from "@/types/api-responses/post/single";

function PostActivity({
  data,
  children,
}: {
  data: Post;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogHeader>
        <DialogTitle className="sr-only">View Post Activity</DialogTitle>
        <DialogDescription className="sr-only">
          View the activity of this post like the number of likes, comments, and
          shares.
        </DialogDescription>
      </DialogHeader>
      <DialogContent>
        <div className="border border-muted p-2 rounded-md">{data.content}</div>
        <div>
          <div className="flex justify-between items-center mt-2">
            <div>
              <p className="text-muted-foreground text-sm">
                {data.likesCount} Likes
              </p>
              <p className="text-muted-foreground text-sm">
                {data.repliesCount} Comments
              </p>
              <p className="text-muted-foreground text-sm">
                {data.repostCount} Shares
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PostActivity;
