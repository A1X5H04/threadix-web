import { z } from "zod";
import {
  pollSchema,
  postAudioSchema,
  postGifSchema,
  postMediaSchema,
  postSchema,
} from "./schemas";
import { InferSelectModel } from "drizzle-orm";
import { posts } from "@/db/schemas/tables";

// export enum PostMediaType {
//   VIDEO = "video",
//   IMAGE = "image",
// }

export type PollSchema = z.infer<typeof pollSchema>;
export type PostSchema = z.infer<typeof postSchema>;
export type PostMediaSchema = z.infer<typeof postMediaSchema>;
export type PostGifSchema = z.infer<typeof postGifSchema>;
export type PostAudioSchema = z.infer<typeof postAudioSchema>;

export type RegisteredVotes =
  | {
      pollId: string;
      optionId: number;
    }[]
  | undefined;

export type PostResponse = {};
