"use client";

import React, { useEffect } from "react";
import {
  RiMusicFill,
  RiPauseFill,
  RiPlayFill,
  RiUserVoiceLine,
} from "@remixicon/react";
import { Button } from "./ui/button";

import { VoiceVisualizer, useVoiceVisualizer } from "react-voice-visualizer";
import { useIsClient } from "@/hooks/use-isclient";

function AudioPlayer() {
  const isClient = useIsClient();
  const visualizerControls = useVoiceVisualizer();
  const [blob, setBlob] = React.useState<Blob | null>(null);

  const isVoiceRecorded = true;

  useEffect(() => {
    if (blob) {
      visualizerControls.setPreloadedAudioBlob(blob);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blob]);

  if (!isClient) return null;

  return (
    <div className="w-full p-4 space-y-6 shadow-lg bg-card border-t">
      <div className="w-full flex justify-between items-center text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-x-2">
          {isVoiceRecorded ? (
            <RiUserVoiceLine className="w-3 h-3 text-muted-foreground" />
          ) : (
            <RiMusicFill className="w-3 h-3 text-muted-foreground" />
          )}
          <p>
            {isVoiceRecorded ? "Voice Record" : "Audio File"} &middot; Untitled
            Audio
          </p>
        </span>
        <p>1m 20s</p>
      </div>
      <div className="flex items-center p-4 w-full gap-x-4 border rounded-md bg-card">
        <Button
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
          {}
          {blob ? (
            <VoiceVisualizer
              width="100%"
              height={72}
              controls={visualizerControls}
              isControlPanelShown={false}
              isDefaultUIShown={false}
              audioProcessingTextClassName="text-muted-foreground text-xs font-semibold font-mono"
              barWidth={3}
              gap={1}
            />
          ) : (
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];

                  const blob = new Blob([file], { type: file.type });
                  setBlob(blob);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
