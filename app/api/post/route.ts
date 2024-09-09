import { ThreadSchema } from "@/components/post-form";
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
    const request: ThreadSchema = await req.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!request.posts) {
      return new NextResponse(
        "Atleast one post is required to create a thread!",
        { status: 400 }
      );
    }

    // Credit: https://github.com/noelrohi/thr - Noel Rohi

    await db.transaction(async (txn) => {
      const parentIds: Array<string> = [];
      for (const post of request.posts) {
        const [{ id }] = await txn
          .insert(posts)
          .values({
            content: post.content,
            userId: user.id,
            createdAt: new Date(),
            parentId:
              parentIds.length > 0 ? parentIds[parentIds.length - 1] : null, // Last parent id
          })
          .returning();

        if (post.media.length > 0) {
          // insert media
          await txn.insert(postMedia).values(
            post.media.map((m) => ({
              postId: id,
              type: m.type === "image" ? "image" : ("video" as any), // TODO: give a proper type
              url: m.url,
              height: m.height,
              width: m.width,
              name: m.name,
            }))
          );
        }

        if (post.gif) {
          // insert gif
          await txn.insert(postMedia).values({
            postId: id,
            type: "gif",
            url: post.gif.url,
            name: post.gif.name,
            height: post.gif.height,
            width: post.gif.width,
          });
        }

        if (post.audio) {
          // insert audio
          await txn.insert(postMedia).values({
            postId: id,
            type: "audio",
            name: post.audio.name,
            url: post.audio.url,
            duration: post.audio.duration,
          });
        }

        if (post.poll) {
          // insert poll

          const [{ id: pollId }] = await txn
            .insert(polls)
            .values({
              postId: id,
              duration: new Date(post.poll.duration),
              multipleVotes: post.poll.multipleAnswers,
              quizMode: post.poll.quizMode,
              anonymousVoting: post.poll.anonymousVoting,
            })
            .returning();

          // insert poll options
          await txn.insert(pollOptions).values(
            post.poll.options.map((option) => ({
              pollId: pollId,
              title: option.title,
              isCorrect: option.isCorrect || null,
            }))
          );
        }

        if (post.mentions && post.mentions.length > 0) {
          // TODO: insert mentions
        }

        if (post.tags && post.tags.length > 0) {
          // TODO: insert tags
        }

        parentIds.push(id);
      }
    });
  } catch (error) {
    console.log("POST_CREATE_ERROR", error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
