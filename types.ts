import * as z from "zod";

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
