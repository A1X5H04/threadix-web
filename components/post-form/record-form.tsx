import { Input } from "@/components/ui/input";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import { Button } from "@/components/ui/button";
import {
  RiCloseFill,
  RiDownloadLine,
  RiMic2Fill,
  RiPauseFill,
  RiPlayFill,
  RiRecordCircleFill,
  RiRecordCircleLine,
  RiStopFill,
} from "@remixicon/react";

import React from "react";
import { PostAudioSchema } from "@/types";

interface RecordFormProps {
  setAudio: (media: PostAudioSchema) => void;
  onCancel: () => void;
}

function RecordForm({ setAudio, onCancel }: RecordFormProps) {
  const [initialRecordingState, setInitialRecordingState] =
    React.useState(true);
  const [title, setTitle] = React.useState("");
  const recorder = useVoiceVisualizer();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg tracking-tight">
          Say something, literally
        </h1>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <RiCloseFill className="w-5 h-5" />
        </Button>
      </div>
      <div className="w-full p-2 grid place-items-center gap-y-5">
        <Input placeholder="Add a title for your recording" />
        {initialRecordingState ? (
          <div className="bg-muted/25 w-full border h-36 rounded-lg overflow-hidden grid place-items-center ">
            <div className="inline-flex flex-col gap-y-2 items-center animate-pulse">
              <div className="inline-flex items-center gap-x-2">
                <RiRecordCircleFill className="w-4 h-4 text-rose-600" />
                <p className="tracking-wider font-semibold text-sm text-center">
                  Record your voice
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                Start recording your voice by click on the mic below
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-black w-full border h-24 rounded-lg overflow-hidden">
            <VoiceVisualizer
              height={100}
              controls={recorder}
              isControlPanelShown={false}
              isDefaultUIShown={false}
              barWidth={3}
              gap={1}
            />
          </div>
        )}
        {recorder.isRecordingInProgress && (
          <p className="text-lg text-muted-foreground">
            {recorder.formattedRecordingTime}
          </p>
        )}

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
              variant="default"
              onClick={() => {
                recorder.startRecording();
                setInitialRecordingState(false);
              }}
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
            onClick={() => {
              recorder.clearCanvas();
              setInitialRecordingState(true);
            }}
          >
            New Record
          </Button>
          <Button className="w-full">Add To Post</Button>
        </div>
      )}
    </div>
  );
}

export default RecordForm;
