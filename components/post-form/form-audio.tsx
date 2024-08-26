import { useIsClient } from "@/hooks/use-isclient";
import React, { useEffect } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import { Button } from "../ui/button";
import {
  RiPlayFill,
  RiPauseFill,
  RiMusic2Line,
  RiVoiceRecognitionLine,
} from "@remixicon/react";

interface FormAudioProps {
  name: string;
  type: "audio" | "voice";
  url: string;
}

function FormAudio({ name, url, type }: FormAudioProps) {
  const [blob, setBlob] = React.useState<Blob | null>(null);
  const isClient = useIsClient();
  const visualizerControls = useVoiceVisualizer();

  useEffect(() => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        visualizerControls.setPreloadedAudioBlob(blob);
        setBlob(blob);
      });
    console.log("Blob", blob);
  }, [url]);

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
          {type === "audio" ? (
            <RiMusic2Line className="w-3.5 h-3.5" />
          ) : (
            <RiVoiceRecognitionLine className="w-3.5 h-3.5" />
          )}
          <p className="text-xs font-medium">{name}</p>
          &middot;
          <p className="text-xs text-muted-foreground">
            {visualizerControls.formattedDuration}
          </p>
        </div>
        <span className="text-xs text-muted-foreground hover:font-semibold cursor-pointer">
          Remove Audio
        </span>
      </div>
    </div>
  );
}

export default FormAudio;
