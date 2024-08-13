"use client";

import React, { useState } from "react";
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
import { pollSchema } from "@/types/schemas";
import RecordDialog from "./dialogs/audio-dialog";
import GifPickerPopover from "./dialogs/gif-picker";
import PostLocationDialog from "./dialogs/location-dialog";

import RichTextArea from "../rich-textarea";
import PostFormOptions from "./post-form-options";
import PollForm from "./poll-form";
import {
  RiBarChartHorizontalLine,
  RiFilmLine,
  RiHashtag,
} from "@remixicon/react";

// import PostTextArea from "./post-textarea";

// .min(50, "Post content should be at least 50 characters")
export const postSchema = z.object({
  content: z.string(),
  location: z.string().optional(),
  media: z.array(postMediaSchema).optional(),
  mentions: z.array(z.string()).optional(),
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
  const [pollForm, setPollForm] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof postSchema>>({
    defaultValues: {
      content: "",
      location: "",
      media: [],
      mentions: [],
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
            <Avatar className="w-9 h-9">
              <AvatarImage src={user.avatar ?? ""} />
              <AvatarFallback>{user.name?.at(0)?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="inline-flex flex-col">
              <span className="text-sm font-semibold">{user.name}</span>
              <span className="text-xs text-muted cursor-pointer hover:text-muted-foreground transition-colors">
                Add location
              </span>
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
          <div className="flex flex-col gap-y-2 relative">
            <Form {...form}>
              <form id="post-form" onSubmit={form.handleSubmit(onFormSubmit)}>
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
                            rows={1}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
            <div className="flex max-h-52 w-full overflow-x-auto gap-x-4 border-muted">
              {form.getValues("media")?.map((media, index) => (
                <div
                  key={media.url}
                  className="relative rounded-md overflow-hidden"
                >
                  <img
                    src={media.url}
                    alt={media.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            {pollForm && (
              <PollForm
                poll={form.getValues("poll")}
                setPoll={(value) => form.setValue("poll", value)}
                setPollForm={setPollForm}
              />
            )}
            <div>
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                ref={fileInputRef}
                max={10}
                hidden
                onChange={(e) => {
                  if (e.target.files) {
                    const files = Array.from(e.target.files);
                    const media = files.map((file) => ({
                      name: file.name,
                      type: file.type,
                      url: URL.createObjectURL(file),
                    }));
                    console.log("Media", media);
                    form.setValue("media", media);
                  }
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
              >
                <RiFilmLine className="w-4 h-4 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon">
                <RiHashtag className="w-4 h-4 text-muted-foreground" />
              </Button>
              {!pollForm && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPollForm(true)}
                >
                  <RiBarChartHorizontalLine className="w-4 h-4 text-muted-foreground" />
                </Button>
              )}
            </div>
          </div>
          {/* <PostFormOptions formControl={form.control} /> */}

          <div className="inline-flex items-center justify-between w-full">
            <button className="text-sm text-muted font-semibold">
              Reply to this post
            </button>

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
