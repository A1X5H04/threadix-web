"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import {
  RiDiscLine,
  RiDownloadLine,
  RiMic2Fill,
  RiMic2Line,
  RiMusic2Line,
  RiPauseFill,
  RiPlayFill,
  RiRecordCircleFill,
  RiStopFill,
} from "@remixicon/react";
import * as z from "zod";
import { postMediaSchema, voiceNoteSchema } from "@/types/schemas";

import { useVoiceVisualizer } from "react-voice-visualizer";

import { Separator } from "../../ui/separator";
import { Input } from "../../ui/input";
import { useEdgeStore } from "@/lib/edgestore";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import AudioDialogVoiceForm from "../record-form";
import AudioDialogAudioForm from "../audio-form";

type Audio = z.infer<typeof voiceNoteSchema>;

function RecordDialog({ setAudio }: { setAudio: (media: Audio) => void }) {
  const [open, setIsOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <RiDiscLine className="w-4 h-4 text-muted-foreground" />
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="inline-flex items-center gap-x-2">
            Upload Audio
          </DialogTitle>
          <DialogDescription>
            Upload an audio file or record a voice note
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="audio">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="record">Record</TabsTrigger>
          </TabsList>
          <TabsContent value="audio">
            <AudioDialogAudioForm setModal={setIsOpen} setAudio={setAudio} />
          </TabsContent>
          <TabsContent value="record">
            <AudioDialogVoiceForm setModal={setIsOpen} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default RecordDialog;
