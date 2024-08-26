import { Input } from "@/components/ui/input";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import { Button } from "@/components/ui/button";
import {
  RiCheckLine,
  RiDeleteBin2Line,
  RiDownloadLine,
  RiMic2Fill,
  RiPauseFill,
  RiPlayFill,
  RiRecordCircleFill,
  RiStopFill,
  RiUpload2Line,
} from "@remixicon/react";

import React, { ChangeEventHandler, useEffect } from "react";
import { PostAudioSchema } from "@/types";
import { useIsClient } from "@/hooks/use-isclient";
import { record } from "zod";

function RecordTab({
  setAudio,
  onCancel,
}: {
  setAudio: (media: PostAudioSchema) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = React.useState("");
  const audioInputRef = React.useRef<HTMLInputElement>(null);
  const [blob, setBlob] = React.useState<Blob | null>(null);

  const isClient = useIsClient();
  const recorder = useVoiceVisualizer();

  useEffect(() => {
    if (blob) {
      recorder.setPreloadedAudioBlob(blob);

      if (recorder.isPreloadedBlob) {
        setAudio({
          name: title || "Untitled Audio",
          url: recorder.audioSrc,
          duration: recorder.formattedDuration,
          type: "audio",
        });
      }
    }

    if (recorder.isAvailableRecordedAudio) {
      setAudio({
        name: "Untitled Audio",
        url: recorder.audioSrc,
        duration: recorder.formattedDuration,
        type: "voice",
      });
    }
  }, [blob]);

  console.log(
    "Recorder Events",
    recorder.isAvailableRecordedAudio,
    recorder.audioSrc
  );

  if (!isClient) return null;

  return (
    <div className="mb-4 space-y-2">
      <div className="w-full space-y-2">
        <div className="bg-black w-full border rounded-lg overflow-hidden p-2 relative">
          <div className="flex justify-between items-center text-xs text-muted-foreground p-2">
            {recorder.isRecordingInProgress ? (
              <p className="animate-pulse">Recording...</p>
            ) : (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-transparent w-fit focus:outline-none text-white font-semibold focus:bg-muted px-0.5"
                type="text"
                placeholder="Untitled Audio"
              />
            )}
            <p>
              {recorder.isRecordingInProgress
                ? recorder.formattedRecordingTime
                : recorder.formattedDuration}
            </p>
          </div>
          <div className="flex items-center gap-x-4 px-2">
            {recorder.isAvailableRecordedAudio && (
              <Button
                type="button"
                onClick={recorder.togglePauseResume}
                className="w-14 h-14"
              >
                {recorder.isPausedRecordedAudio ? (
                  <RiPlayFill className="w-5 h-5" />
                ) : (
                  <RiPauseFill className="w-5 h-5" />
                )}
              </Button>
            )}
            <div className="flex-1">
              <VoiceVisualizer
                width="100%"
                isDefaultUIShown={false}
                height={85}
                controls={recorder}
                isControlPanelShown={false}
                audioProcessingTextClassName="text-muted-foreground text-xs font-semibold font-mono"
                barWidth={3}
                gap={1}
              />
            </div>
          </div>
        </div>
        {/* {!recorder.isRecordingInProgress &&
          !recorder.isAvailableRecordedAudio && (
            <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 flex flex-col items-center">
              <h1 className="font-semibold text-sm uppercase font-mono  text-center">
                Upload A File Or <br /> Start Recording
              </h1>
            </div>
          )} */}
      </div>
      <div className="flex items-center justify-between text-xs w-full">
        <div className="inline-flex items-center gap-x-2">
          {recorder.isAvailableRecordedAudio ? (
            <>
              <button
                type="button"
                onClick={recorder.saveAudioFile}
                className="inline-flex items-center gap-x-1 font-semibold py-1 px-2 rounded hover:bg-muted text-muted-foreground"
              >
                <RiDownloadLine className="w-4 h-4" />
                Save
              </button>
              <button
                type="button"
                onClick={recorder.clearCanvas}
                className="inline-flex items-center gap-x-1 font-semibold py-1 px-2 rounded hover:bg-rose-500/15 text-rose-800"
              >
                <RiDeleteBin2Line className="w-4 h-4" />
                Clear
              </button>
            </>
          ) : recorder.isRecordingInProgress ? (
            <>
              <button
                type="button"
                onClick={recorder.stopRecording}
                className="inline-flex items-center gap-x-1 font-semibold py-1 px-2 rounded hover:bg-rose-500/15 text-rose-800"
              >
                <RiStopFill className="w-4 h-4" />
                Stop
              </button>
              <button
                type="button"
                onClick={recorder.togglePauseResume}
                className="inline-flex items-center gap-x-1 font-semibold py-1 px-2 rounded hover:bg-muted text-muted-foreground"
              >
                {recorder.isPausedRecording ? (
                  <>
                    <RiPlayFill className="w-5 h-5" />
                    Resume
                  </>
                ) : (
                  <>
                    <RiPauseFill className="w-5 h-5" />
                    Pause
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <input
                type="file"
                accept="audio/*"
                ref={audioInputRef}
                hidden
                onChange={(e) => {
                  const files = e.target.files;
                  if (files?.length) {
                    const file = files[0];
                    setTitle(file.name);
                    const blob = new Blob([file], { type: file.type });
                    setBlob(blob);
                  }
                }}
              />

              <button
                type="button"
                onClick={() => audioInputRef.current?.click()}
                className="inline-flex items-center gap-x-1 font-semibold py-1 px-2 rounded hover:bg-muted text-muted-foreground"
              >
                <RiUpload2Line className="w-4 h-4" />
                Upload Audio
              </button>
              <button
                type="button"
                onClick={recorder.startRecording}
                className="inline-flex items-center gap-x-1 font-semibold py-1 px-2 rounded hover:bg-muted text-muted-foreground"
              >
                <RiMic2Fill className="w-4 h-4" />
                Start Recording
              </button>
            </>
          )}
        </div>
        <button
          disabled={
            recorder.isRecordingInProgress || recorder.isProcessingRecordedAudio
          }
          onClick={() => {
            setBlob(null);
            recorder.clearCanvas();
            onCancel();
          }}
          className="text-muted-foreground disabled:text-muted hover:text-foreground font-semibold px-2"
          type="button"
        >
          Remove Audio
        </button>
      </div>
    </div>
  );
}

export default RecordTab;

{
  /* <div className="inline-flex items-center gap-x-3">
          {recorder.isAvailableRecordedAudio ? (
            <>
              <Button
                type="button"
                onClick={recorder.togglePauseResume}
                size="lg"
              >
                <RiPlayFill className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                onClick={() => recorder.clearCanvas()}
                size="lg"
                variant="destructive"
              >
                <RiDeleteBin2Line className="w-5 h-5" />
              </Button>
              <Button
                type="button"
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

              <Button
                type="button"
                onClick={recorder.togglePauseResume}
                size="lg"
              >
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
        </div> */
}
