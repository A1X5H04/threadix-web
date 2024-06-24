import {
  VoiceVisualizer,
  useVoiceVisualizer,
} from "@hasma/react-voice-visualizer";
import { RiUserVoiceLine } from "@remixicon/react";
import React from "react";
import { Button } from "./ui/button";

function PostVoiceRecording() {
  const recorder = useVoiceVisualizer();
  return (
    <div className="px-2 py-1 border-t w-full">
      <div className="w-full flex justify-between items-center text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-x-2">
          <RiUserVoiceLine className="w-3 h-3 text-muted-foreground" />
          <p>Shared a voice record</p>
        </span>
        {/* <Button variant="link" className="px-0 py-0">
          <span className="text-xs">Eternxlx - Slayashi!</span>
        </Button> */}
      </div>
      <div className="mt-4">
        <VoiceVisualizer controls={recorder} isDefaultUIShown={false} />
      </div>
    </div>
  );
}

export default PostVoiceRecording;
