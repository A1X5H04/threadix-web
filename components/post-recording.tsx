"use client";

import React from "react";
import { RiPlayFill, RiUserVoiceLine } from "@remixicon/react";
import { Button } from "./ui/button";

import { VoiceVisualizer, useVoiceVisualizer } from "react-voice-visualizer";

function PostRecording() {
  const visualizerControls = useVoiceVisualizer();

  return (
    <div className="w-full p-3 border rounded-md space-y-2">
      <div className="w-full flex justify-between items-center text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-x-2">
          <RiUserVoiceLine className="w-3 h-3 text-muted-foreground" />
          <p>Shared a voice record</p>
        </span>
        <p>Voice Record Name &#183; 2m 30s</p>
      </div>

      <div className="flex items-center px-3 py-1.5 w-full gap-x-4">
        <Button className="w-12 h-12">
          <RiPlayFill
            className="w-5 h-5"
            onClick={visualizerControls.togglePauseResume}
          />
        </Button>
        <div className="flex-1">
          <VoiceVisualizer
            width="100%"
            height={72}
            controls={visualizerControls}
            isControlPanelShown={false}
            isDefaultUIShown={false}
          />
        </div>
      </div>
    </div>
  );
}

export default PostRecording;
