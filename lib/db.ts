import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as auth from "@/db/schemas/auth";
import * as tables from "@/db/schemas/tables";
import * as relations from "@/db/schemas/relations";

const dbClient = neon(process.env.DATABASE_URL!);

const db = drizzle(dbClient, { schema: { ...auth, ...tables, ...relations } });

export default db;
