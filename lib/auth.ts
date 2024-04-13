import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { users, sessions } from "../db/schema";
import db from "./db";
import { cache } from "react";
import { cookies } from "next/headers";

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  avatar: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  link: string;
}

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

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
    if (result.session) {
      const blankSessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        blankSessionCookie.name,
        blankSessionCookie.value,
        blankSessionCookie.attributes
      );
    }
  } catch (error) {
    console.error("Error Creating or Validating Session: ", error);
  }

  return result;
});
