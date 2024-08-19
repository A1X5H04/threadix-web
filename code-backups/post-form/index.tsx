"use client";

import React, { useState } from "react";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { postMediaSchema, postSchema } from "@/types/schemas";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { FormOptions } from "./form-options";

import MediaDialog from "./dialogs/media-dialog";
import { pollSchema } from "@/types/schemas";
import RecordDialog from "./dialogs/audio-dialog";
import GifPickerPopover from "./dialogs/gif-picker";
import PostLocationDialog from "./dialogs/location-dialog";

import RichTextArea from "../rich-textarea";
import PollForm from "../../components/post-form/poll-form";
import {
  RiBarChartHorizontalLine,
  RiFileGifLine,
  RiFilmLine,
  RiHashtag,
  RiImage2Line,
  RiImageLine,
} from "@remixicon/react";
import { Separator } from "../ui/separator";
import Media from "../../components/post-form/form-media";
import { PostMediaSchema } from "@/types";

// .min(50, "Post content should be at least 50 characters")

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

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

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
    <div className="flex items-start gap-2 w-full h-fit p-5 rounded-xl border text-card-foreground shadow animate-in z-20 bg-card">
      <div className="h-full flex-1">
        <Avatar className="w-10 h-10">
          <AvatarImage src={user.avatar ?? ""} />
          <AvatarFallback>{user.name?.at(0)?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <Separator orientation="vertical" />
      </div>
      <div className="w-full space-y-2">
        <div className="inline-flex flex-col w-full max-h-96 overflow-hidden overflow-y-scroll">
          <span className="font-semibold mb-0.5">{user.username}</span>
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
                          placeholder="Start a thread..."
                          className="w-full bg-transparent pb-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none"
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
          <Media
            formControl={form.control}
            setMedia={(value) => form.setValue("media", value)}
          />
          <PollForm
            poll={form.getValues("poll")}
            setPoll={(value) => form.setValue("poll", value)}
          />

          <div className="inline-flex items-center gap-x-4">
            <button onClick={() => fileInputRef.current?.click()}>
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
                    const media = files.map((file: File) => ({
                      name: file.name,
                      type: file.type.split("/")[0],
                      url: URL.createObjectURL(file),
                    }));
                    console.log("Media", media);
                    form.setValue("media", media);
                  }
                }}
              />
              <RiFilmLine className="w-4 h-4 text-muted-foreground" />
            </button>
            <button>
              <RiFileGifLine className="w-4 h-4 text-muted-foreground" />
            </button>
            <button>
              <RiBarChartHorizontalLine className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PostForm;

// AIzaSyDFPshK0fSveptnAxuqSHrKROQBPSO5nFk

{
  /* <div className="flex justify-between items-center gap-x-2">
        <div className="inline-flex items-center gap-x-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.avatar ?? ""} />
            <AvatarFallback>{user.name?.at(0)?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <p className="inline-flex flex-col">
            <span className="text-sm font-semibold">{user.name}</span>
            <textarea
              className="text-xs text-muted-foreground"
              placeholder="What's on your mind?"
            />
          </p>
        </div>
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
              <div key={media.url} className="relative overflow-hidden">
                <img
                  src={media.url}
                  alt={media.name}
                  className="w-auto h-full object-cover rounded-md"
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
        <div className="inline-flex items-center justify-between w-full">
          <button className="text-sm text-muted">Start a thread</button>

          <Button form="post-form" type="submit" className="font-semibold">
            Post
          </Button>
        </div>
      </div> */
}
