import { Input } from "../ui/input";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import { Button } from "../ui/button";
import { RiPauseFill, RiPlayFill, RiUploadCloud2Line } from "@remixicon/react";
import Dropzone from "react-dropzone";

import React, { useEffect } from "react";
import { useIsClient } from "@/hooks/use-isclient";
import { Label } from "../ui/label";
import { useEdgeStore } from "@/lib/edgestore";
import { PostAudio } from "@/types";

function AudioDialogAudioForm({
  setAudio,
  setModal,
}: {
  setAudio: (media: PostAudio) => void;
  setModal: (modal: boolean) => void;
}) {
  const isClient = useIsClient();
  const visualizerControls = useVoiceVisualizer();
  const { edgestore } = useEdgeStore();

  const [title, setTitle] = React.useState("");
  const [blob, setBlob] = React.useState<Blob | null>(null);

  useEffect(() => {
    if (blob) {
      visualizerControls.setPreloadedAudioBlob(blob);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blob]);

  const uploadAudio = async (blob: Blob, title: string) => {
    const file = new File([blob], title, { type: blob.type });
    const audio = await edgestore.publicFiles.upload({
      file,
      options: { temporary: true },
    });

    const audioElement = new Audio(URL.createObjectURL(blob));

    audioElement.onloadedmetadata = () => {
      setAudio({
        name: title || "Untitled Audio",
        url: audio.url,
        duration: audioElement.duration,
      });
      URL.revokeObjectURL(audioElement.src);
    };

    setModal(false);
  };

  if (!isClient) return null;

  if (blob) {
    return (
      <div className="space-y-4 py-4">
        <Input
          placeholder="Enter a title for your audio"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

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
        <div className="inline-flex items-center gap-x-2 w-full">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => {
              setBlob(null);
              visualizerControls.clearCanvas();
            }}
          >
            Discard Recording
          </Button>
          <Button onClick={() => uploadAudio(blob, title)} className="w-full">
            Add Recording
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Dropzone
      accept={{ "audio/*": [] }}
      multiple={false}
      onDrop={(files) => {
        if (files.length) {
          const file = files[0];

          const blob = new Blob([file], { type: file.type });
          setBlob(blob);
        }
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="w-full h-40 border border-dashed rounded-lg flex flex-col gap-y-2 items-center justify-center cursor-pointer focus:border-foreground"
        >
          <input {...getInputProps()} />
          <RiUploadCloud2Line className="w-8 h-8 text-muted-foreground" />
          <Label>Drop or click to upload audio</Label>
        </div>
      )}
    </Dropzone>
  );
}

export default AudioDialogAudioForm;
