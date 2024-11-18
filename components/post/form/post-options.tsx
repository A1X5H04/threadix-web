import React, { useTransition } from "react";
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
  RiLoader2Fill,
} from "@remixicon/react";
import {
  PollSchema,
  PostAudioSchema,
  PostGifSchema,
  PostMediaSchema,
} from "@/types";
import { ThreadSchema } from ".";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FormAudio from "./form-audio";
import { useToast } from "@/components/ui/use-toast";
import { useEdgeStore } from "@/lib/edgestore";
import Image from "next/image";

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
  const { toast } = useToast();
  const mediaInputRef = React.useRef<HTMLInputElement>(null);
  const [mediaPending, mediaTranstion] = useTransition();
  const audioInputRef = React.useRef<HTMLInputElement>(null);
  const [audioPending, audioTranstion] = useTransition();
  const { getValues, setValue } = useFormContext<ThreadSchema>();

  const { edgestore } = useEdgeStore();

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
  }) as PostAudioSchema;

  const isShowOption: boolean = Boolean(
    watchedPoll || watchedMedia.length > 0 || watchedGif || watchedAudio
  );

  const onMediaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      if (watchedMedia.length > 0) {
        if (files.length + watchedMedia.length > 10) {
          return toast({
            title: "Maximum Media Reached",
            description: "You can only add 10 media files",
            variant: "destructive",
          });
        }
        // Yeah, this is a bit messy function, but it works lol
        mediaTranstion(async () => {
          try {
            const newMedia = await Promise.all(
              files.map(async (file) => {
                return new Promise<PostMediaSchema>((resolve) => {
                  if (file.type.startsWith("video")) {
                    const video = document.createElement("video");
                    video.src = URL.createObjectURL(file);
                    video.onloadedmetadata = async () => {
                      const res = await edgestore.publicFiles.upload({
                        file,
                        options: { temporary: true },
                      });
                      resolve({
                        name: file.name,
                        type: "video",
                        url: res.url,
                        width: video.videoWidth,
                        height: video.videoHeight,
                      });
                    };
                    URL.revokeObjectURL(video.src);
                  } else {
                    const img = document.createElement("img");
                    img.src = URL.createObjectURL(file);
                    img.onload = async () => {
                      const res = await edgestore.publicFiles.upload({
                        file,
                        options: { temporary: true },
                      });
                      resolve({
                        name: file.name,
                        type: "image",
                        url: res.url,
                        width: img.width,
                        height: img.height,
                      });
                    };
                    URL.revokeObjectURL(img.src);
                  }
                });
              })
            );

            setValue(`posts.${index}.media`, [...watchedMedia, ...newMedia]);
          } catch (error) {
            toast({
              title: "Error: Upload Failed",
              description: "An error occurred while uploading the media",
              variant: "destructive",
            });
          }
        });
      } else {
        if (files.length <= 10) {
          mediaTranstion(async () => {
            try {
              const media = await Promise.all(
                files.map(async (file) => {
                  return new Promise<PostMediaSchema>((resolve) => {
                    if (file.type.startsWith("video")) {
                      const video = document.createElement("video");
                      video.src = URL.createObjectURL(file);
                      video.onloadedmetadata = async () => {
                        const res = await edgestore.publicFiles.upload({
                          file,
                          options: { temporary: true },
                        });
                        resolve({
                          name: file.name,
                          type: "video",
                          url: res.url,
                          width: video.videoWidth,
                          height: video.videoHeight,
                        });
                      };
                    } else {
                      const img = document.createElement("img");
                      img.src = URL.createObjectURL(file);
                      img.onload = async () => {
                        const res = await edgestore.publicFiles.upload({
                          file,
                          options: { temporary: true },
                        });
                        resolve({
                          name: file.name,
                          type: "image",
                          url: res.url,
                          width: img.width,
                          height: img.height,
                        });
                      };
                    }
                  });
                })
              );

              setValue(`posts.${index}.media`, media);
            } catch (error) {
              toast({
                title: "Error: Upload Failed",
                description: "An error occurred while uploading the media",
                variant: "destructive",
              });
            }
          });
        }
      }
    }
  };

  const onAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (file.type.startsWith("audio") === false) {
        return toast({
          title: "Invalid File Type",
          description: "Please select an audio file",
          variant: "destructive",
        });
      }

      audioTranstion(
        async () =>
          await edgestore.publicFiles
            .upload({
              file,
              options: { temporary: true },
            })
            .then((res) => {
              const audio: PostAudioSchema = {
                name: file.name.split(".")[0],
                type: "audio",
                url: res.url,
              };
              setValue(`posts.${index}.audio`, audio);
            })
            .catch((err) => {
              console.log("Add Audio: Upload Error", err);
              toast({
                title: "Error: Upload Failed",
                description: "An error occurred while upisLoading the audio",
                variant: "destructive",
              });
            })
      );
    }
  };

  return (
    <>
      {watchedGif && (
        <div
          key={watchedGif.name}
          className="relative w-fit bg-background flex justify-center items-center overflow-hidden rounded-md border border-muted"
        >
          <span>
            <button
              onClick={() => setValue(`posts.${index}.gif`, undefined)}
              className="absolute top-2 right-2 p-1 bg-muted hover:bg-muted text-muted-foreground transition-colors rounded"
            >
              <RiCloseLine className="w-4 h-4 text-muted-foreground" />
            </button>
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            width={watchedGif.width}
            height={watchedGif.height}
            src={watchedGif.url}
            alt={watchedGif.name}
            className="object-contain max-h-80"
          />
        </div>
      )}
      {watchedAudio && watchedAudio.url && (
        <FormAudio
          audio={watchedAudio}
          removeAudio={() => setValue(`posts.${index}.audio`, undefined)}
        />
      )}
      {watchedMedia.length > 0 && (
        <FormMedia
          media={watchedMedia}
          setMedia={(value) => setValue(`posts.${index}.media`, value)}
        />
      )}
      {watchedPoll && <PollForm watchedPoll={watchedPoll} itemIndex={index} />}
      <div className="flex items-center gap-x-2 pt-4">
        <input
          type="file"
          accept="image/*,video/*"
          max={10}
          multiple
          ref={mediaInputRef}
          hidden
          onChange={onMediaChange}
        />
        {(!isShowOption ||
          (watchedMedia.length < 10 && watchedMedia.length != 0)) && (
          <button
            type="button"
            disabled={mediaPending || mediaInputRef.current === null}
            className="p-1.5 hover:bg-muted rounded inline-flex items-center gap-x-2 disabled:opacity-50"
            onClick={() => mediaInputRef.current?.click()}
          >
            {mediaPending ? (
              <RiLoader2Fill className="w-4 h-4 text-muted-foreground animate-spin" />
            ) : getValues(`posts.${index}.media`).length > 0 ? (
              <>
                <RiImageAddLine className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Add More</span>
              </>
            ) : (
              <RiImageFill className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        )}

        {!isShowOption && (
          <>
            <button
              onClick={() => setGifPostIndex(index)}
              type="button"
              className="p-1.5 hover:bg-muted rounded"
            >
              <RiFileGifLine className="w-4 h-4 text-muted-foreground" />
            </button>

            <DropdownMenu>
              <input
                type="file"
                accept="audio/*"
                ref={audioInputRef}
                hidden
                onChange={(e) => {
                  console.log("On Audio Change");
                  onAudioChange(e);
                }}
              />
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  disabled={audioPending}
                  className="p-1.5 hover:bg-muted rounded disabled:opacity-50"
                >
                  {audioPending ? (
                    <RiLoader2Fill className="w-4 h-4 text-muted-foreground animate-spin" />
                  ) : (
                    <RiDiscLine className="w-4 h-4 text-muted-foreground" />
                  )}
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
                  options: [{ title: "Yes" }, { title: "No" }],
                  duration: "30m",

                  quizMode: false,
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
