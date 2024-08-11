import * as z from "zod";

export const profileSchema = z.object({
  name: z.string(),
  username: z
    .string()
    .min(4)
    .max(50)
    .regex(/^[a-z_-][a-z0-9_-]*$/, {
      message:
        "Username should only contain lowercase, underscore, dashes and digits",
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
        "Username should only contain lowercase, underscore, dashes and digits",
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
  tenorUrl: z.string().url(),
  description: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  duration: z.number(),
});

export const pollSchema = z.object({
  options: z
    .array(
      z.object({
        title: z.string().max(30).min(1),
        isCorrect: z.boolean(),
      })
    )
    .min(2)
    .max(8),

  duration: z.string(),
  anonymousVoting: z.boolean(),
  multipleAnswers: z.boolean(),
  quizMode: z.boolean(),
});
