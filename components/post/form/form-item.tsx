import { PostSchema } from "@/types";
import React, { memo, ReactNode } from "react";
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

import PostOptions from "./post-options";
import { ThreadSchema } from ".";

import { Textarea } from "../../ui/textarea";
import RichTextArea from "../../rich-textarea";

interface PostFormItemProps {
  field: PostSchema;
  index: number;
  quotePost: ReactNode;
  setGifPostIndex: React.Dispatch<React.SetStateAction<number>>;
  setAudioPostIndex: React.Dispatch<React.SetStateAction<number>>;
}

function PostFormItem({
  field,
  index,
  quotePost,
  setGifPostIndex,
  setAudioPostIndex,
}: PostFormItemProps) {
  const { control } = useFormContext<ThreadSchema>();

  return (
    <FormField
      name={`posts.${index}.content`}
      control={control}
      render={({ field }) => (
        <FormItem className="space-y-0">
          <FormControl>
            <RichTextArea
              {...field}
              placeholder={index === 0 ? "Start a thread..." : "Say more..."}
              className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              rows={1}
            />
          </FormControl>
          {quotePost && index === 0 && (
            <div className="px-3 py-3 border border-muted rounded-md">
              {quotePost}
            </div>
          )}
          <PostOptions
            index={index}
            setGifPostIndex={setGifPostIndex}
            setAudioPostIndex={setAudioPostIndex}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default memo(PostFormItem);
