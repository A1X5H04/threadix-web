import { accounts, users } from "@/db/schemas/auth";
import { google, lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  const codeVerifierCookie =
    cookies().get("google_oauth_code_verifier")?.value ?? null;
  const stateCookie = cookies().get("google_oauth_state")?.value ?? null;

  if (!state || !code || !codeVerifierCookie || state !== stateCookie) {
    return new NextResponse("Invalid Parameters", {
      status: 500,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      codeVerifierCookie
    );

    const userResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );

    const user: GoogleUser = await userResponse.json();

    const existingAccount = await db.query.accounts.findFirst({
      where: (account, { eq, and }) =>
        and(
          eq(account.provider, "google"),
          eq(account.providerUserId, user.sub)
        ),
    });

    if (existingAccount) {
      const session = await lucia.createSession(existingAccount.userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return new NextResponse("Redirecting to dashboard", {
        status: 302,
        headers: {
          Location: "/dashboard",
        },
      });
    }

    const userId = generateIdFromEntropySize(10); // 16 characters long

    await db.transaction(async (txn) => {
      await txn.insert(users).values({
        id: userId,
        name: user.name ?? user.given_name + " " + user.family_name,
        email: user.email,
        username: user.email.split("@")[0],
        avatar: user.picture ?? null,
      });

      await txn.insert(accounts).values({
        userId,
        type: "oidc",
        provider: "google",
        providerUserId: user.sub,
        accessToken: tokens.accessToken,

        scope: "openid, email, profile",
      });
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new NextResponse("Redirecting to dashboard", {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture?: string;
  email: string;
  email_verified: boolean;
}
