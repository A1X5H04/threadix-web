import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const dbClient = postgres(process.env.DATABASE_URL!, { max: 1 });

const db = drizzle(dbClient);

export default db;
