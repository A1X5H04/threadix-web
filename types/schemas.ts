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
  description: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  type: z.string(),
  duration: z.number().optional(),
});

export const pollSchema = z
  .object({
    options: z
      .array(
        z.object({
          title: z.string().max(30).min(1),
          isCorrect: z.boolean().optional(),
        })
      )
      .min(2)
      .max(8),

    duration: z.string(),
    anonymousVoting: z.boolean(),
    multipleAnswers: z.boolean(),
    quizMode: z.boolean(),
  })
  .refine((data) => {
    if (data.quizMode) {
      return data.options.some((option) => option.isCorrect);
    } else {
      return true;
    }
  });

export const postSchema = z.object({
  content: z.string(),
  location: z.string().optional(),
  media: z.array(postMediaSchema),
  mentions: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  poll: pollSchema.optional(),
});
