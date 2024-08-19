import { z } from "zod";
import { pollSchema, postMediaSchema, postSchema } from "./schemas";

export type PollSchema = z.infer<typeof pollSchema>;
export type PostSchema = z.infer<typeof postSchema>;
export type PostMediaSchema = z.infer<typeof postMediaSchema>;
