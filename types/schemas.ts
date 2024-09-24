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
  width: z.number(),
  height: z.number(),
  type: z.string(),
});

export const postGifSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  description: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const postAudioSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  type: z.string(),
});

export const pollSchema = z
  .object({
    options: z
      .array(
        z.object({
          title: z.string().max(30),
          isCorrect: z.boolean().optional(),
        })
      )
      .min(3, { message: "A poll must have at least 2 options" }) // min(3) because we need at least 2 options + 1 is a blank placeholder
      .max(4),

    duration: z.string(),
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
  content: z.string().min(10, {
    message: "A thread content must have at least 10 characters",
  }),
  location: z.string().optional(),
  media: z.array(postMediaSchema),
  mentions: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  poll: pollSchema.optional(),
  gif: postGifSchema.optional(),
  audio: postAudioSchema.optional(),
});
