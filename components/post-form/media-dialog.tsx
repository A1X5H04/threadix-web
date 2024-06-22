import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { MultiImageDropzone } from "../image-uploader";

interface MediaDialogProps {
  children: React.ReactNode;
}

function MediaDialog({ children }: MediaDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Media</DialogTitle>
          <DialogDescription>
            Make your post stand out with media
          </DialogDescription>
          <div className="my-4">
            <MultiImageDropzone />
          </div>
          <DialogFooter>
            <Button>Upload</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default MediaDialog;
