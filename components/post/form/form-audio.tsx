import { useIsClient } from "@/hooks/use-isclient";
import React, { useEffect } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import { Button } from "../../ui/button";
import {
  RiPlayFill,
  RiPauseFill,
  RiMusic2Line,
  RiVoiceRecognitionLine,
} from "@remixicon/react";
import { useFormContext } from "react-hook-form";
import { PostAudioSchema } from "@/types";

interface FormAudioProps {
  audio: PostAudioSchema;
  removeAudio: () => void;
}

function FormAudio({ audio, removeAudio }: FormAudioProps) {
  const form = useFormContext();

  const isClient = useIsClient();
  const visualizerControls = useVoiceVisualizer();

  useEffect(() => {
    fetch(audio.url)
      .then((response) => response.blob())
      .then((blob) => {
        visualizerControls.setPreloadedAudioBlob(blob);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio.url]);

  if (!isClient) return null;

  return (
    <div className="mb-2">
      <div className="bg-black w-full border rounded-lg overflow-hidden p-2 relative">
        <div className="flex items-center p-4 w-full gap-x-4">
          <Button
            type="button"
            onClick={visualizerControls.togglePauseResume}
            disabled={!isClient}
            className="w-14 h-14"
          >
            {visualizerControls.isPausedRecordedAudio ? (
              <RiPlayFill className="w-5 h-5" />
            ) : (
              <RiPauseFill className="w-5 h-5" />
            )}
          </Button>
          <div className="flex-1">
            <VoiceVisualizer
              width="100%"
              height={90}
              controls={visualizerControls}
              isControlPanelShown={false}
              isDefaultUIShown={false}
              audioProcessingTextClassName="text-muted-foreground text-xs font-semibold font-mono"
              barWidth={3}
              gap={1}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-x-1">
          {audio.type === "audio" ? (
            <span title="Audio File">
              <RiMusic2Line className="w-3.5 h-3.5" />
            </span>
          ) : (
            <span title="Voice Recording">
              <RiVoiceRecognitionLine className="w-3.5 h-3.5" />
            </span>
          )}
          <p
            className="text-xs font-medium max-w-36 truncate"
            title={audio.name}
          >
            {audio.name}
          </p>
          •
          <p className="text-xs text-muted-foreground">
            {visualizerControls.formattedDuration}
          </p>
        </div>
        <button
          type="button"
          onClick={removeAudio}
          className="text-xs text-muted-foreground font-semibold cursor-pointer hover:text-foreground"
        >
          Remove Audio
        </button>
      </div>
    </div>
  );
}

export default FormAudio;
