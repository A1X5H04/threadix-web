import type { Config } from "drizzle-kit";

export default {
  driver: "pg",
  schema: "./db/schemas/*",
  out: "./db/migrations",
  dbCredentials: {
    connectionString:
      "postgresql://neondb_owner:itz4PS1xfDon@ep-fancy-shadow-a1zbk90d.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  },
} satisfies Config;
