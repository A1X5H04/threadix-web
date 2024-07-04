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
import { postMediaSchema } from "@/types/schemas";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { FormOptions } from "./form-options";

import MediaDialog from "./dialogs/media-dialog";
import PollDialog, { pollSchema } from "./dialogs/poll-dialog";
import RecordDialog from "./dialogs/record-dialog";
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

  console.log("Rerendered Form");

  return (
    <div className="w-full h-fit p-4 rounded-xl border text-card-foreground shadow">
      <div className="flex justify-between items-center gap-x-2">
        <div className="inline-flex items-center gap-x-2">
          <Avatar className="w-9 h-9">
            <AvatarImage src={user.avatar ?? ""} />
            <AvatarFallback>{user.name?.at(0)?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <p className="inline-flex flex-col">
            <span className="text-sm font-semibold">{user.name}</span>
            {/* <span className="text-xs text-muted-foreground">
              Rich text supported
            </span> */}
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
            <MediaDialog />
            <RecordDialog />
            <GifPickerPopover />
            <PostLocationDialog />
            <PollDialog setPoll={(poll) => form.setValue("poll", poll)} />
          </div>
          <Button form="post-form" type="submit" className="font-semibold">
            Post
          </Button>
        </div>
      </div>

      <span className="text-xs text-muted italic pl-8 cursor-help">
        *Actual post will be displayed differently on the feed
      </span>
    </div>
  );
}

export default PostForm;

// AIzaSyDFPshK0fSveptnAxuqSHrKROQBPSO5nFk
