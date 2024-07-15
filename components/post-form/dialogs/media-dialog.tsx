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
import { RiFilmLine } from "@remixicon/react";
import { useEdgeStore } from "@/lib/edgestore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

interface MediaDialogProps {
  setMedia: (medias: any[]) => void;
}

function MediaDialog({ setMedia }: MediaDialogProps) {
  const [open, setIsOpen] = useState(false);
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
    <Dialog open={open} onOpenChange={setIsOpen}>
      <AlertDialog>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <RiFilmLine className="w-4 h-4 text-muted-foreground" />
        </Button>

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
              <AlertDialogTrigger asChild>
                <Button className="w-full">Upload</Button>
              </AlertDialogTrigger>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Upload Media(s)</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to upload these media files? Once uploaded,
              you CANNOT delete them from the post or edit them!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction>Yes, Upload Media</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
