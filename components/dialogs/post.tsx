"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import PostFormIndex from "@/components/post/form";
import { User } from "lucia";
import { useModalStore } from "@/hooks/use-store";
import PostItemBody from "../post-item/body";

function PostDialog({ user }: { user: User }) {
  const { isOpen, onClose, post, intent } = useModalStore(
    (state) => state.post
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="sr-only">Create a new post</DialogTitle>

      <DialogContent className="w-full max-w-2xl ">
        <div className="relative pb-12">
          <div className=" max-h-[calc(100vh-15rem)] overflow-y-auto pb-2.5 no-scrollbar space-y-2">
            {intent === "reply" && post && (
              <PostItemBody data={post} showReplyBar />
            )}
            <PostFormIndex
              withQuote={
                intent === "quote" &&
                post && <PostItemBody data={post} isQuoted />
              }
              closeModal={() => onClose()}
              user={user}
              postId={post?.id}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PostDialog;

{
  /*  */
}
{
  /* <AlertDialog open={alertOpen} onOpenChange={(open) => setAlertOpen(open)}>
<AlertDialogContent>
  <AlertDialogHeader>
    <AlertDialogTitle>Discard Post?</AlertDialogTitle>
    <AlertDialogDescription>
      Are you sure you want to discard this post and all of its content?
    </AlertDialogDescription>
  </AlertDialogHeader>

  <AlertDialogFooter>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
    <AlertDialogAction
      onClick={() => setIsOpen(false)}
      className="bg-destructive hover:bg-destructive/80 text-destructive-foreground"
    >
      Discard
    </AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>
</AlertDialog> */
}
