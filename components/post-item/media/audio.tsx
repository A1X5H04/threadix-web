import { Button } from "@/components/ui/button";
import { useIsClient } from "@/hooks/use-isclient";
import { PostMediaSchema } from "@/types";
import {
  RiMusic2Line,
  RiPauseFill,
  RiPlayFill,
  RiVoiceRecognitionLine,
} from "@remixicon/react";
import React, { useEffect } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";

function PostMediaAudio({ media }: { media: PostMediaSchema }) {
  const isClient = useIsClient();
  const visualizerControls = useVoiceVisualizer();

  useEffect(() => {
    fetch(media.url)
      .then((response) => response.blob())
      .then((blob) => {
        visualizerControls.setPreloadedAudioBlob(blob);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media.url]);

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
          {media.type === "audio" ? (
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
            title={media.name}
          >
            {media.name}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          {visualizerControls.formattedDuration}
        </p>
      </div>
    </div>
  );
}

export default PostMediaAudio;
