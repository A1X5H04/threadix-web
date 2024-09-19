import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import PostItemBody from "../post-item/body";
import PostFormIndex from "../post-form";
import { postData } from "@/data";

function ReplyDialog({
  data,
  children,
}: {
  data: typeof postData;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-2xl gap-y-2">
        <div className="pointer-events-none">
          <PostItemBody data={data} isReplied={true} />
        </div>
        <PostFormIndex parentId={data.parentId ?? undefined} />
      </DialogContent>
    </Dialog>
  );
}

export default ReplyDialog;
