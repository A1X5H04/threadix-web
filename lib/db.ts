import ws from "ws";
import { drizzle } from "drizzle-orm/neon-http";
import { neon, Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle as poolDrizzle } from "drizzle-orm/neon-serverless";

import * as auth from "@/db/schemas/auth";
import * as tables from "@/db/schemas/tables";
import * as relations from "@/db/schemas/relations";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const poolDb = poolDrizzle(pool, { schema: { ...tables } });

const dbClient = neon(
  process.env.DATABASE_URL! ||
    "postgresql://neondb_owner:0QPch8jrDgHT@ep-long-term-a13w3t08.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
);

const db = drizzle(dbClient, { schema: { ...auth, ...tables, ...relations } });

export { db, pool, poolDb };
