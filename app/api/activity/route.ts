import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request) {}

export async function POST(req: Request) {
  const TOKEN = process.env.CRON_JOB_TOKEN;

  // Get authorization token from the request headers
  const token = req.headers.get("Authorization");

  // Check if the token is not present
  if (!token || token !== `Bearer ${TOKEN}`) {
    return new NextResponse("Unauthorized Access", { status: 401 });
  }

  // Get last added activity timestamp from the request body
  const lastActivity = await db.query.userActivity.findFirst({
    orderBy: (activity, { desc }) => desc(activity.createdAt),
    columns: { createdAt: true },
  });

  revalidatePath("/api/activity");

  return NextResponse.json({
    status: "success",
    lastCreatedAt: lastActivity || null,
  });
}
