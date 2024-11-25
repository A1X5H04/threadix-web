import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { pollId } }: { params: { pollId: string } }
) {
  if (!pollId) {
    return new NextResponse("Bad Request", {
      status: 400,
    });
  }

  const votes = await db.query.votes.findMany({
    where: (vote, { eq }) => eq(vote.pollId, pollId),
    with: {
      user: {
        columns: {
          name: true,
          avatar: true,
          username: true,
        },
      },
    },
  });

  return NextResponse.json({
    votes,
  });
}
