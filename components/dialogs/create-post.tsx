"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { RiAddLine } from "@remixicon/react";
import PostFormIndex from "@/components/post-form";
import { User } from "lucia";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

function CreatePostDialog({ user }: { user: User }) {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isFormDirty, setIsFormDirty] = React.useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (isFormDirty) {
          setAlertOpen(true);
        } else {
          setIsOpen(open);
        }
      }}
    >
      <DialogTitle className="sr-only">Create a new post</DialogTitle>
      <button onClick={() => setIsOpen(true)}>
        <li className="py-2 px-3 rounded-md bg-foreground text-background transition-colors cursor-pointer">
          <RiAddLine className="w-6 h-6" />
          <span className="sr-only">Create</span>
        </li>
      </button>
      <DialogContent className="w-full max-w-2xl">
        <PostFormIndex
          closeModal={() => setIsOpen(false)}
          setIsFormDirty={setIsFormDirty}
          user={user}
        />
      </DialogContent>
      <AlertDialog open={alertOpen} onOpenChange={(open) => setAlertOpen(open)}>
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
      </AlertDialog>
    </Dialog>
  );
}

export default CreatePostDialog;
