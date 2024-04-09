import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { userTable, sessionTable } from "./db/schema";
import db from "./lib/db";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const auth = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    name: "lucia_session",
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof auth;
  }
}
