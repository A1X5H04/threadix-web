import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as auth from "@/db/schemas/auth";
import * as tables from "@/db/schemas/tables";
import * as relations from "@/db/schemas/relations";

const dbClient = neon(
  process.env.DATABASE_URL ||
    "postgresql://neondb_owner:itz4PS1xfDon@ep-fancy-shadow-a1zbk90d.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
);
const db = drizzle(dbClient, { schema: { ...auth, ...tables, ...relations } });

export default db;
