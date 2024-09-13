import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import PostItemBody from "../post-item/body";
import PostFormIndex from "../post-form";

function ReplyDialog({
  data,
  children,
}: {
  data: any;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-xl gap-y-2">
        <PostItemBody data={data} />
        <PostFormIndex parentId="" />
      </DialogContent>
    </Dialog>
  );
}

export default ReplyDialog;
