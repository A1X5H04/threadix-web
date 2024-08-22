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
import PostOptions from "./post-options";
import { ThreadSchema } from ".";

interface PostFormItemProps {
  field: PostSchema;
  index: number;
  setGifPostIndex: React.Dispatch<React.SetStateAction<number>>;
  setAudioPostIndex: React.Dispatch<React.SetStateAction<number>>;
}

function PostFormItem({
  field,
  index,
  setGifPostIndex,
  setAudioPostIndex,
}: PostFormItemProps) {
  console.log("PostFormItem render", index);

  const { control } = useFormContext<ThreadSchema>();

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
      <PostOptions
        index={index}
        setGifPostIndex={setGifPostIndex}
        setAudioPostIndex={setAudioPostIndex}
      />
    </div>
  );
}

export default memo(PostFormItem);
