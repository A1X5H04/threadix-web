import { z } from "zod";
import { pollSchema, voiceNoteSchema } from "./schemas";

export type PostAudio = z.infer<typeof voiceNoteSchema>;
export type PollSchema = z.infer<typeof pollSchema>;
