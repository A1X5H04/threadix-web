import { z } from "zod";
import { pollSchema, postMediaSchema, postSchema } from "./schemas";

export enum PostMediaType {
    GIF = "gif",
    VIDEO = "video",
    AUDIO = "audio",
    IMAGE = "image",
  }

export type PollSchema = z.infer<typeof pollSchema>;
export type PostSchema = z.infer<typeof postSchema>;
export type PostMediaSchema = z.infer<typeof postMediaSchema>;
