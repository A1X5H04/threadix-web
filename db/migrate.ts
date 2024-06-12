import { migrate } from "drizzle-orm/neon-http/migrator";
import db from "@/lib/db";

export async function startMigration() {
  console.log("🌧️ Drizzle Migration Script \n\n\n");

  console.log("⏳ Running migrations...\n\n");

  const start = Date.now();

  await migrate(db, { migrationsFolder: "./db/migrations" });

  const end = Date.now();

  console.log(`✅ Migrations completed in ${end - start}ms`);

  process.exit(0);
}

startMigration().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
