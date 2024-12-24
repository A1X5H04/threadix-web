import { users } from "@/db/schemas/auth";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { profileId: string } },
) {
  const { profileId } = params;

  const { user: currentUser } = await validateRequest();

  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const user = await db.query.users.findFirst({
      where: (user, { eq, or }) =>
        or(eq(user.username, profileId), eq(user.id, profileId)),
      columns: {
        id: true,
        avatar: true,
        name: true,
        username: true,
        link: true,
        bio: true,
        isPublic: true,
        isVerified: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return new NextResponse("User Not Found", { status: 404 });
    }

    const isBlocked = await db.query.blockedUsers.findFirst({
      columns: { id: true },
      where: (blockedUser, { and, eq }) =>
        and(
          eq(blockedUser.blockedUserId, user.id),
          eq(blockedUser.userId, currentUser.id),
        ),
    });

    const hasBlockedYou = await db.query.blockedUsers.findFirst({
      columns: { id: true },
      where: (blockedUser, { and, eq }) =>
        and(
          eq(blockedUser.blockedUserId, currentUser.id),
          eq(blockedUser.userId, user.id),
        ),
    });

    return NextResponse.json(
      { ...user, isBlocked: !!isBlocked, hasBlockedYou: !!hasBlockedYou },
      { status: 200 },
    );
  } catch (error) {
    console.log("PROFILE_GET_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { profileId: string } },
) {
  const { profileId } = params;

  const body = await req.json();

  if (!body) {
    return new Response("Parameters are required", { status: 400 });
  }

  try {
    const user = await db
      .update(users)
      .set({
        avatar: body.avatar,
        name: body.name,
        username: body.username,
        link: body.link,
        bio: body.bio,
        isPublic: body.isPublic,
      })
      .where(eq(users.username, profileId))
      .returning({ id: users.id });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("PROFILE_UPDATE_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
