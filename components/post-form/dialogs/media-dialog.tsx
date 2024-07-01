"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { MultiMediaDropDown, type FileState } from "../../media-uploader";
import { useEdgeStore } from "@/lib/edgestore";

interface MediaDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function MediaDialog({ open, setOpen }: MediaDialogProps) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Media</DialogTitle>
          <DialogDescription>
            Make your post stand out with media
          </DialogDescription>
          <div className="pt-2 pb-6">
            <MultiMediaDropDown
              value={fileStates}
              dropzoneOptions={{
                maxFiles: 6,
              }}
              onChange={(files) => {
                setFileStates(files);
              }}
              onFilesAdded={(addedFiles) => {
                console.log("Added Files", addedFiles);
                console.log("Files State", fileStates);
              }}
            />
          </div>
          <DialogFooter>
            <Button onClick={() => {}} className="w-full">
              Upload
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default MediaDialog;

// onFilesAdded={async (addedFiles) => {
//   setFileStates([...fileStates, ...addedFiles]);
//   await Promise.all(
//     addedFiles.map(async (addedFileState) => {
//       try {
//         const res = await edgestore.publicFiles.upload({
//           file: addedFileState.file,
//           onProgressChange: async (progress) => {
//             updateFileProgress(addedFileState.key, progress);
//             if (progress === 100) {
//               // wait 1 second to set it to complete
//               // so that the user can see the progress bar at 100%
//               await new Promise((resolve) => setTimeout(resolve, 1000));
//               updateFileProgress(addedFileState.key, 'COMPLETE');
//             }
//           },
//         });
//         console.log(res);
//       } catch (err) {
//         updateFileProgress(addedFileState.key, 'ERROR');
//       }
//     }),
//   );
// }}
