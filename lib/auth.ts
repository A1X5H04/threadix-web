import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { users, sessions } from "../db/schemas/auth";
import { db } from "./db";
import { cache } from "react";
import { cookies } from "next/headers";
import { GitHub, Google } from "arctic";

interface DatabaseUserAttributes {
  id: string;
  avatar: string;
  name: string;
  username: string;
  bio: string;
  link: string;
  isVerified: boolean;
}

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!
);

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  "http://localhost:3000/api/auth/google/callback"
);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    name: "lucia_session",
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => attributes,
});

export const validateRequest = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const blankSessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        blankSessionCookie.name,
        blankSessionCookie.value,
        blankSessionCookie.attributes
      );
    }
  } catch (error) {
    console.error("Error Creating or Validating Session");
  }

  return result;
});
