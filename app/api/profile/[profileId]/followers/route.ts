import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { profileId: string } }
) {
  const { profileId } = params;

  console.log("Profile Id", profileId);

  try {
    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.username, profileId),
      columns: {
        id: true,
      },
    });

    if (!user) {
      return new NextResponse("User Not Found", { status: 404 });
    }

    const followers = await db.query.userFollowers.findMany({
      where: (follower, { eq }) => eq(follower.followerId, user.id),
    });

    const following = await db.query.userFollowers.findMany({
      where: (follower, { eq }) => eq(follower.userId, user.id),
    });

    return NextResponse.json({ followers, following }, { status: 200 });
  } catch (error) {
    console.log("PROFILE_GET_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
