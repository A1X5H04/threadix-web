"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { useToast } from "../ui/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { User } from "@/db/schemas/auth";
import useSWRMutation from "swr/mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { gifSchema, postMediaSchema, voiceNoteSchema } from "@/types/schemas";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { FormOptions } from "./form-options";

import MediaDialog from "./dialogs/media-dialog";
import PollDialog, { pollSchema } from "./dialogs/poll-dialog";
import RecordDialog from "./dialogs/audio-dialog";
import GifPickerPopover from "./dialogs/gif-picker";
import PostLocationDialog from "./dialogs/location-dialog";

import RichTextArea from "../rich-textarea";
import PostFormOptions from "./post-form-options";

// import PostTextArea from "./post-textarea";

// .min(50, "Post content should be at least 50 characters")
export const postSchema = z.object({
  content: z.string(),
  location: z.string().optional(),
  media: z.array(postMediaSchema).optional(),
  gif: gifSchema.optional(),
  audio: voiceNoteSchema.optional(),
  tags: z.array(z.string()).optional(),
  poll: pollSchema.optional(),
});

async function sayHello(
  url: string,
  { arg }: { arg: z.infer<typeof postSchema> }
) {
  console.log("Post Values", arg);
}

function PostForm({ user }: { user: User | null }) {
  const { trigger } = useSWRMutation("/api/post", sayHello);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof postSchema>>({
    defaultValues: {
      content: "",
      location: "",
      media: [],
      gif: undefined,
      audio: undefined,
      tags: [],
      poll: undefined,
    },
    resolver: zodResolver(postSchema),
  });

  if (!user) return null;

  const onFormSubmit = (values: z.infer<typeof postSchema>) => {
    // trigger(values, {
    //   onSuccess: () => {
    //     toast({
    //       title: "Post Created",
    //       description: "Your post has been created successfully!",
    //     });
    //     form.reset();
    //   },
    //   onError: (err) => {
    //     console.error(err);
    //   },
    // });
    // axios
    //   .post("/api/post", values)
    //   .then((res: any) => {
    //     console.log("Response Data", res.data);
    //     toast({
    //       title: "Post Created",
    //       description: "Your post has been created successfully!",
    //     });
    //     form.reset();
    //   })
    //   .catch((err) => console.error(err));
    console.log("Post Values", values);
  };

  const setPostMedia = (
    media: z.infer<typeof postMediaSchema> | z.infer<typeof postMediaSchema>[]
  ) => {
    if (form.getValues("media")) {
      form.setValue("media", [media, ...form.getValues("media")]);
    } else {
      form.setValue("media", Array.isArray(media) ? media : [media]);
    }
  };

  console.log("Rerendered Form");

  // <PostQuoted
  //   data={{
  //     id: "1",
  //     content: "Enternalzz just posted a new banger!",
  //     parentId: "1",
  //     poll: {
  //       question: "Slayashi! What's your favorite color?",
  //       options: [
  //         { title: "Red" },
  //         { title: "Blue" },
  //         { title: "Green" },
  //         { title: "Yellow" },
  //       ],
  //       duration: "1h",
  //       anonymousVoting: false,
  //       multipleAnswers: false,
  //       quizMode: true,
  //     },
  //     user: {
  //       id: "1",
  //       name: "John Doe",
  //       username: "johndoe",
  //       email: "asdf",
  //     },
  //     createdAt: "2021-10-05T00:00:00Z",
  //     updatedAt: "2021-10-05T00:00:00Z",
  //   }} />;
  return (
    <div>
      <div className="w-full h-fit p-4 rounded-xl border text-card-foreground shadow animate-in z-20">
        <div className="flex justify-between items-center gap-x-2">
          <div className="inline-flex items-center gap-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.avatar ?? ""} />
              <AvatarFallback>{user.name?.at(0)?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="inline-flex flex-col">
              <span className="text-sm font-semibold">{user.name}</span>
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            type="submit"
            className="font-semibold"
          >
            Anyone
          </Button>
        </div>
        <div className="w-full space-y-2 pl-8">
          <Form {...form}>
            <form id="post-form" onSubmit={form.handleSubmit(onFormSubmit)}>
              <div className="flex gap-x-2 relative">
                <div className="flex-1">
                  <FormField
                    name="content"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RichTextArea
                            {...field}
                            placeholder="What's on your mind?"
                            className="w-full bg-transparent px-2 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                            rows={2}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
          <PostFormOptions formControl={form.control} />

          <div className="inline-flex items-center justify-between w-full pt-4">
            <div>
              <MediaDialog setMedia={setPostMedia} />
              {!Boolean(form.getValues("audio")) && (
                <RecordDialog
                  setAudio={(audio: z.infer<typeof voiceNoteSchema>) =>
                    form.setValue("audio", audio)
                  }
                />
              )}
              <GifPickerPopover setMedia={setPostMedia} />
              <PostLocationDialog />
              <PollDialog setPoll={(poll) => form.setValue("poll", poll)} />
            </div>
            {/* <button className="text-sm text-muted font-semibold">
            Reply to this post
            </button> */}

            <Button form="post-form" type="submit" className="font-semibold">
              Post
            </Button>
          </div>
        </div>

        {/* <span className="text-xs text-muted italic pl-8 cursor-help">
        *Actual post will be displayed differently on the feed
      </span> */}
      </div>
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[2]" /> */}
    </div>
  );
}

export default PostForm;

// AIzaSyDFPshK0fSveptnAxuqSHrKROQBPSO5nFk
