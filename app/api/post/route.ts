import {
  likes,
  pollOptions,
  polls,
  postMedia,
  posts,
} from "@/db/schemas/tables";
import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const [allPosts] = await db.query.posts.findMany({
      with: {
        user: {
          columns: {
            name: true,
            avatar: true,
            isVerified: true,
          },
        },
        likes: {
          columns: {
            userId: true,
            createdAt: true,
          },
          orderBy: [desc(likes.createdAt)],
        },
        parent: true,
        media: true,
      },
      orderBy: [desc(posts.createdAt)],
    });

    return NextResponse.json(allPosts);
  } catch (err) {
    console.log("POST_GET_ERROR", err);
    return new NextResponse("An error occurred", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user } = await validateRequest();
    const { content, parentId, media, poll, location } = await req.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!content) {
      return new NextResponse("Content is a required field!", { status: 400 });
    }

    if (media || poll) {
      await db.transaction(async (tx) => {
        const [postObj] = await tx
          .insert(posts)
          .values({
            userId: user.id,
            content,
            parentId,
          })
          .returning({ id: posts.id });

        if (media) {
          await tx.insert(postMedia).values(
            media.map((media: any) => ({
              postId: postObj.id,
              mediaPath: media.path,
              mimeType: media.mimeType,
            }))
          );
        }

        if (poll) {
          const [pollObj] = await tx
            .insert(polls)
            .values({
              postId: postObj.id,
              anonymousVoting: poll.anonymousVoting,
              duration: poll.duration,
              multipleVotes: poll.multipleVotes,
              quizMode: poll.quizMode,
              question: poll.question,
            })
            .returning({ id: polls.id });

          await tx.insert(pollOptions).values(
            poll.options.map((option: any) => ({
              pollId: pollObj.id,
              title: option.title,
              isCorrect: option.isCorrect,
            }))
          );
        }
      });

      return NextResponse.json({ id: posts.id });
    }

    const [post] = await db
      .insert(posts)
      .values({
        userId: user.id,
        content,
        parentId,
      })
      .returning({ id: posts.id });

    return NextResponse.json(post);
  } catch (error) {
    console.log("POST_CREATE_ERROR", error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
