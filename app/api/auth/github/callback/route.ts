// app/login/github/callback/route.ts
import { github, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import db from "@/lib/db";
import { accounts, users } from "@/db/schemas/auth";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  if (url.searchParams.get("error")) {
    switch (url.searchParams.get("error")) {
      case "access_denied":
        return new Response("Access Denied", {
          status: 403,
        });
      default:
        return new Response("Error", {
          status: 500,
        });
    }
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const user: GitHubUser = await userResponse.json();

    console.log("Github User:", user); // Remove this line after implementing the rest of the code.

    // Replace this with your own DB client.
    const existingAccount = await db.query.accounts.findFirst({
      where: (account, { eq, and }) =>
        and(
          eq(account.provider, "github"),
          eq(account.providerUserId, user.id)
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
      return new Response("Redirecting to dashboard", {
        status: 302,
        headers: {
          Location: "/workspace",
        },
      });
    }

    const userId = generateIdFromEntropySize(10); // 16 characters long

    // Replace this with your own DB client.
    await db.transaction(async (txn) => {
      await txn.insert(users).values({
        id: userId,
        email: user.email,
        username: user.login,
        avatar: user.avatar_url,
        isVerified: true,
      });

      await txn.insert(accounts).values({
        userId,
        type: "oauth",
        provider: "github",
        providerUserId: user.id,
        accessToken: tokens.accessToken,
        scope: "user",
      });
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new Response("Redirecting to dashboard", {
      status: 302,
      headers: {
        Location: "/workspace",
      },
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      console.log("From Github Callback OAuthError", e);
      return new Response("Github Auth", {
        status: 400,
      });
    }
    console.log("From Github Callback ServerError ", e);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

interface GitHubUser {
  id: string;
  login: string;
  email: string;
  avatar_url: string;
}
