import { z } from "zod";
import { voiceNoteSchema } from "./schemas";

export type PostAudio = z.infer<typeof voiceNoteSchema>;
