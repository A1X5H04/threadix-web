import * as z from "zod";

export const profileSchema = z.object({
  name: z.string(),
  username: z
    .string()
    .min(4)
    .max(50)
    .regex(/^[a-z_-][a-z0-9_-]*$/, {
      message:
        "Username should only contain lowercase, undercase, dashes and digits",
    }),
  bio: z.string().max(160),
  link: z.string().url().optional(),
  avatar: z.string().url().optional(),
});

export const registerSchema = z.object({
  name: z.string(),
  username: z
    .string()
    .min(4)
    .max(50)
    .regex(/^[a-z_-][a-z0-9_-]*$/, {
      message:
        "Username should only contain lowercase, undercase, dashes and digits",
    }),
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export const postMediaSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  type: z.enum(["image", "video", "gif", "voice", "audio"]),
  width: z.number().optional(),
  height: z.number().optional(),
});
