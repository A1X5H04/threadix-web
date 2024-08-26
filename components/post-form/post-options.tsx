import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import FormMedia from "./form-media";
import PollForm from "./poll-form";
import {
  RiBarChartHorizontalLine,
  RiCloseLine,
  RiDiscLine,
  RiFileGifLine,
  RiImageAddLine,
  RiImageFill,
  RiUpload2Line,
  RiVoiceprintLine,
} from "@remixicon/react";
import { PollSchema, PostGifSchema, PostMediaSchema } from "@/types";
import { ThreadSchema } from ".";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import FormAudio from "./form-audio";

interface PostOptionsProps {
  index: number;
  setGifPostIndex: React.Dispatch<React.SetStateAction<number>>;
  setAudioPostIndex: React.Dispatch<React.SetStateAction<number>>;
}

function PostOptions({
  index,
  setGifPostIndex,
  setAudioPostIndex,
}: PostOptionsProps) {
  const mediaInputRef = React.useRef<HTMLInputElement>(null);
  const audioInputRef = React.useRef<HTMLInputElement>(null);
  const { getValues, setValue } = useFormContext<ThreadSchema>();

  const watchedPoll = useWatch({
    name: `posts.${index}.poll`,
  }) as PollSchema;

  const watchedMedia = useWatch({
    name: `posts.${index}.media`,
  }) as PostMediaSchema[];

  const watchedGif = useWatch({
    name: `posts.${index}.gif`,
  }) as PostGifSchema;

  const watchedAudio = useWatch({
    name: `posts.${index}.audio`,
  }) as PostMediaSchema;

  const isDisableOption: boolean = Boolean(
    watchedPoll || watchedMedia.length > 0 || watchedGif
  );
  const onMediaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      if (watchedMedia.length > 0) {
        const media = watchedMedia;

        if (files.length + media.length <= 10) {
          const newMedia: PostMediaSchema[] = files.map((file) => {
            return {
              name: file.name,
              type: file.type.startsWith("image") ? "image" : "video",
              url: URL.createObjectURL(file),
            };
          });
          setValue(`posts.${index}.media`, [...media, ...newMedia]);
        }
      } else {
        if (files.length <= 10) {
          const media = files.map((file) => {
            return {
              name: file.name,
              type: file.type.startsWith("image") ? "image" : "video",
              url: URL.createObjectURL(file),
            };
          });

          console.log("Media", media);
          setValue(`posts.${index}.media`, media);
        }
      }
    }
  };

  const onAudioChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Hello World");
  };

  console.log("watchedAudio", watchedAudio);

  return (
    <>
      <input
        type="file"
        accept="audio/*"
        ref={audioInputRef}
        hidden
        onChange={onAudioChange}
      />
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        ref={mediaInputRef}
        max={10}
        hidden
        onChange={onMediaChange}
      />
      {watchedGif && (
        <div key={watchedGif.name} className={`relative w-full min-w-20`}>
          <span>
            <button
              onClick={() => setValue(`posts.${index}.gif`, undefined)}
              className="absolute top-2 right-2 p-1 bg-muted hover:bg-muted text-muted-foreground transition-colors rounded"
            >
              <RiCloseLine className="w-4 h-4 text-muted-foreground" />
            </button>
          </span>
          <img
            src={watchedGif.url}
            alt={watchedGif.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      )}
      <FormAudio
        name="Royalty.mp3"
        type="audio"
        url="https://cdn.pixabay.com/download/audio/2020/11/15/audio_2485b032d8.mp3?filename=helix-1577.mp3"
      />
      {watchedMedia.length > 0 && (
        <FormMedia
          itemIndex={index}
          setMedia={(value) => setValue(`posts.${index}.media`, value)}
        />
      )}
      {watchedPoll && <PollForm watchedPoll={watchedPoll} itemIndex={index} />}
      <div className="flex items-center gap-x-2">
        {(watchedMedia.length < 10 || !isDisableOption) && (
          <button
            type="button"
            className="p-1.5 hover:bg-muted rounded inline-flex items-center gap-x-2"
            onClick={() => mediaInputRef.current?.click()}
          >
            {getValues(`posts.${index}.media`).length > 0 ? (
              <>
                <RiImageAddLine className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Add More</span>
              </>
            ) : (
              <RiImageFill className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        )}

        {!isDisableOption && (
          <>
            <button
              onClick={() => setGifPostIndex(index)}
              type="button"
              className="p-1.5 hover:bg-muted rounded"
            >
              <RiFileGifLine className="w-4 h-4 text-muted-foreground" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className="p-1.5 hover:bg-muted rounded">
                  <RiDiscLine className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => audioInputRef.current?.click()}
                  className="text-xs"
                >
                  Upload Audio
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setAudioPostIndex(index)}
                  className="text-xs"
                >
                  Record an Audio
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              type="button"
              onClick={() =>
                setValue(`posts.${index}.poll`, {
                  options: [{ title: "" }, { title: "" }],
                  duration: "5d",
                  anonymousVoting: false,
                  multipleAnswers: false,
                  quizMode: true,
                })
              }
              className="p-1.5 hover:bg-muted rounded"
            >
              <RiBarChartHorizontalLine className="w-4 h-4 text-muted-foreground" />
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default PostOptions;
