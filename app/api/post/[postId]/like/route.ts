import { NextResponse } from "next/server";

export async function POST(req: Request, params: { postId: string }) {
  try {
  } catch (error) {
    console.log("POST_LIKE_ERROR", error);
    return new NextResponse("", { status: 500 });
  }
}
