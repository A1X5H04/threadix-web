"use client";

import React from "react";
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
  RiDownloadLine,
  RiMic2Fill,
  RiPauseFill,
  RiPauseLine,
  RiPlayFill,
  RiRecordCircleFill,
  RiStopFill,
} from "@remixicon/react";

import { VoiceVisualizer, useVoiceVisualizer } from "react-voice-visualizer";

import { Separator } from "../../ui/separator";
import { Input } from "../../ui/input";

interface RecordDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
function RecordDialog({ open, setOpen }: RecordDialogProps) {
  const recorder = useVoiceVisualizer();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="inline-flex items-center gap-x-2">
            {recorder.isRecordingInProgress && (
              <RiRecordCircleFill className="w-4 h-4 text-red-500 animate-pulse" />
            )}
            {recorder.isRecordingInProgress ? "Recording" : "Record an audio"}
          </DialogTitle>
          <DialogDescription>
            Sing a song, tell a story, or just say hi to your friends
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="w-full p-2 grid place-items-center gap-y-5">
            <Input placeholder="Add a title for your recording" />
            <div className="bg-black w-full border h-24 rounded-lg overflow-hidden">
              <VoiceVisualizer
                height={95}
                controls={recorder}
                isControlPanelShown={false}
                barWidth={3}
                gap={1}
              />
            </div>
            {recorder.isRecordingInProgress && (
              <p className="text-lg text-muted-foreground">
                {recorder.formattedRecordingTime}
              </p>
            )}

            <Separator />

            <div className="inline-flex items-center gap-x-3">
              {recorder.isAvailableRecordedAudio ? (
                <>
                  <Button onClick={recorder.togglePauseResume} size="lg">
                    <RiPlayFill className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={recorder.saveAudioFile}
                    size="lg"
                    variant="outline"
                  >
                    <RiDownloadLine className="w-5 h-5" />
                  </Button>
                </>
              ) : recorder.isRecordingInProgress ? (
                <>
                  <Button
                    onClick={() => recorder.stopRecording()}
                    variant="destructive"
                    size="lg"
                  >
                    <RiStopFill className="w-5 h-5" />
                  </Button>

                  <Button onClick={recorder.togglePauseResume} size="lg">
                    {recorder.isPausedRecording ? (
                      <RiPlayFill className="w-5 h-5" />
                    ) : (
                      <RiPauseFill className="w-5 h-5" />
                    )}
                  </Button>
                </>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => recorder.startRecording()}
                  size="lg"
                >
                  <RiMic2Fill className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
          {recorder.isAvailableRecordedAudio && (
            <div className="inline-flex items-center gap-x-2 w-full">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => recorder.clearCanvas()}
              >
                Discard Recording
              </Button>
              <Button className="w-full">Add Recording</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RecordDialog;
