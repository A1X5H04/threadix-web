import React from "react";
import { Dialog, DialogTitle, DialogContent } from "../ui/dialog";

import RecordForm from "../post/form/record-form";
import { PostAudioSchema } from "@/types";

interface VoiceRecordDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  handleAudio: (audio: PostAudioSchema) => void;
}

function VoiceRecordDialog({
  isOpen,
  setIsOpen,
  handleAudio,
}: VoiceRecordDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-2xl">
        <DialogTitle>Say something, literally anything</DialogTitle>
        <RecordForm setAudio={handleAudio} onCancel={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export default VoiceRecordDialog;
