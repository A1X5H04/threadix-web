import { NextResponse } from "next/server";

import { ThreadSchema } from "@/components/post-form";
import { validateRequest } from "@/lib/auth";
import { pollOptions, polls, postMedia, posts } from "@/db/schemas/tables";

import { convertRelativeDataToDate } from "@/lib/utils";
import { db, pool, poolDb } from "@/lib/db";
import { backendClient } from "@/lib/edgestore-server";

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

    const res = await poolDb.transaction(async (txn) => {
      // Console Log 1
      console.log("Transaction Started");
      const parentIds: Array<string> = [];
      for (const post of request.posts) {
        // Inserting posts
        console.log("Inserting posts");
        const [{ id }] = await txn
          .insert(posts)
          .values({
            content: post.content,
            userId: user.id,
            createdAt: new Date(),
            repliesCount: request.posts.length - 1,
            parentId:
              parentIds.length > 0 ? parentIds[parentIds.length - 1] : null, // Last parent id
          })
          .returning();

        if (post.media.length > 0) {
          // insert media
          console.log("Inserting media");

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

          // Confirming the upload of the media
          for (const { url } of post.media) {
            await backendClient.publicFiles.confirmUpload({ url });
          }
        }

        if (post.gif) {
          // insert gif
          console.log("Inserting gif");
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
          console.log("Inserting audio");

          await txn.insert(postMedia).values({
            postId: id,
            type: "audio",
            name: post.audio.name,
            url: post.audio.url,
          });

          await backendClient.publicFiles.confirmUpload({
            url: post.audio.url,
          });
        }

        if (post.poll) {
          // insert poll data
          console.log("Inserting poll data");
          const [{ id: pollId }] = await txn
            .insert(polls)
            .values({
              postId: id,
              duration: convertRelativeDataToDate(post.poll.duration),
              anonymousVotes: post.poll.anonymousVoting,
              multipleVotes: post.poll.multipleAnswers,
              quizMode: post.poll.quizMode,
            })
            .returning();

          // insert poll options
          console.log("Inserting poll options");
          await txn.insert(pollOptions).values(
            post.poll.options.map((option) => ({
              pollId: pollId,
              title: option.title,
              voteCount: 0,
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

      return NextResponse.json({ postIds: parentIds });
    });
    console.log("Transaction Completed");
    return res;
  } catch (error) {
    console.log("POST_CREATE_ERROR", error);

    return new NextResponse("An error occurred", { status: 500 });
  } finally {
    // Closes the connection as the transaction is completed
    console.log("Closing the connection");
    await pool.end();
  }
}

export async function GET(req: Request) {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const allPosts = await db.query.posts.findMany({
      where: (post, { isNull }) => isNull(post.parentId),
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            username: true,
            avatar: true,
            isVerified: true,
            createdAt: true,
          },
        },
        // This are only to show the user if the replies has a poll or media
        replies: {
          columns: {
            userId: true,
          },
          with: {
            poll: {
              columns: {
                id: true,
              },
            },
            media: {
              columns: {
                postId: true,
              },
            },
          },
          orderBy: (reply, { asc }) => asc(reply.createdAt),
          limit: 1,
        },
        media: true,
        poll: {
          with: {
            poll_options: true,
          },
        },
      },
      orderBy: (post, { desc }) => desc(post.createdAt),
    });

    return NextResponse.json({ posts: allPosts });
  } catch (err) {
    console.log("POST_GET_ERROR", err);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
