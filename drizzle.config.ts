import type { Config } from "drizzle-kit";

export default {
  driver: "pg",
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
