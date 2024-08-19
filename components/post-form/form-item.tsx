import { PostSchema } from "@/types";
import React, { memo } from "react";
import {
  Control,
  useFormContext,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import RichTextArea from "../rich-textarea";
import {
  RiBarChartHorizontalLine,
  RiFileGifLine,
  RiImageAddLine,
  RiImageFill,
  RiVoiceprintLine,
} from "@remixicon/react";
import PollForm from "./poll-form";
import FormMedia from "./form-media";

interface PostFormItemProps {
  field: PostSchema;
  index: number;
  setShowGifPicker: React.Dispatch<React.SetStateAction<number>>;
}

function PostFormItem({ field, index, setShowGifPicker }: PostFormItemProps) {
  console.log("PostFormItem render", index);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { getValues, setValue, control } = useFormContext<{
    posts: PostSchema[];
  }>();

  enum MEDIA_ENUM {
    "gif",
    "video",
    "image",
    "audio",
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const media = files.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));
      console.log("Media", media);
      setValue(`posts.${index}.media`, media);
    }
  };

  return (
    <div className="">
      <FormField
        name={`posts.${index}.content`}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RichTextArea
                {...field}
                placeholder={index === 0 ? "Start a thread..." : "Say more..."}
                className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                rows={1}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {getValues(`posts.${index}.media`).length > 0 && (
        <FormMedia
          itemIndex={index}
          setMedia={(value) => setValue(`posts.${index}.media`, value)}
        />
      )}
      {getValues(`posts.${index}.poll`) && <PollForm itemIndex={index} />}
      <div className="flex items-center gap-x-2">
        <button
          type="button"
          className="p-1.5 hover:bg-muted rounded inline-flex items-center gap-x-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            ref={fileInputRef}
            max={10}
            hidden
            onChange={onFileChange}
          />

          {getValues(`posts.${index}.media`).length > 0 ? (
            <>
              <RiImageAddLine className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Add More</span>
            </>
          ) : (
            <RiImageFill className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        
        <button
          onClick={() => setShowGifPicker(index)}
          type="button"
          className="p-1.5 hover:bg-muted rounded"
        >
          <RiFileGifLine className="w-4 h-4 text-muted-foreground" />
        </button>
        <button type="button" className="p-1.5 hover:bg-muted rounded">
          <RiVoiceprintLine className="w-4 h-4 text-muted-foreground" />
        </button>
        {!getValues(`posts.${index}.poll`) && (
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
        )}
      </div>
    </div>
  );
}

export default memo(PostFormItem);
