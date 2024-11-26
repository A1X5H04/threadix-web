import { users } from "@/db/schemas/auth";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { profileId: string } }
) {
  const { profileId } = params;

  try {
    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.username, profileId),
      columns: {
        avatar: true,
        name: true,
        username: true,
        link: true,
        bio: true,
        isPublic: true,
        isVerified: true,
      },
    });

    if (!user) {
      return new NextResponse("User Not Found", { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("PROFILE_GET_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request, params: { profileId: string }) {
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
      })
      .where(eq(users.id, profileId))
      .returning({ id: users.id });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("PROFILE_UPDATE_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
