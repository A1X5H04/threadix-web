import { Input } from "@/components/ui/input";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import { Button } from "@/components/ui/button";
import {
  RiDownloadLine,
  RiMic2Fill,
  RiPauseFill,
  RiPlayFill,
  RiStopFill,
} from "@remixicon/react";

import React from "react";

function AudioDialogVoiceForm({
  setModal,
}: {
  setModal: (modal: boolean) => void;
}) {
  const recorder = useVoiceVisualizer();
  return (
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
  );
}

export default AudioDialogVoiceForm;
