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
