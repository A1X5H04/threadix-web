import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { users, sessions } from "./db/schema";
import db from "./lib/db";

interface DatabaseUserAttributes {
  avatar: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  link: string;
}

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const auth = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    name: "lucia_session",
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => attributes,
});

declare module "lucia" {
  interface Register {
    Lucia: typeof auth;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
