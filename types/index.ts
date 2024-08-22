import { z } from "zod";
import {
  pollSchema,
  postAudioSchema,
  postGifSchema,
  postMediaSchema,
  postSchema,
} from "./schemas";

// export enum PostMediaType {
//   VIDEO = "video",
//   IMAGE = "image",
// }

export type PollSchema = z.infer<typeof pollSchema>;
export type PostSchema = z.infer<typeof postSchema>;
export type PostMediaSchema = z.infer<typeof postMediaSchema>;
export type PostGifSchema = z.infer<typeof postGifSchema>;
export type PostAudioSchema = z.infer<typeof postAudioSchema>;
