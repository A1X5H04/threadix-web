import { NextResponse } from "next/server";

import { ThreadSchema } from "@/components/post/form";
import { validateRequest } from "@/lib/auth";
import {
  pollOptions,
  polls,
  postMedia,
  posts,
  postsTags,
  tags,
} from "@/db/schemas/tables";

import { convertRelativeDataToDate, shuffleArray } from "@/lib/utils";
import { db, pool, poolDb } from "@/lib/db";
import { backendClient } from "@/lib/edgestore-server";
import { increment } from "@/lib/queries";
import { eq } from "drizzle-orm";
import { repost } from "@/actions/post/repost";

export async function POST(req: Request) {
  try {
    const { user } = await validateRequest();
    const request: ThreadSchema & {
      postId?: string;
      postType?: "reply" | "quote";
    } = await req.json();

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
      if (request.postId && request.postType === "reply") {
        await txn
          .update(posts)
          .set({
            repliesCount: increment(posts.repliesCount, request.posts.length),
          })
          .where(eq(posts.id, request.postId));
        parentIds.push(request.postId);
      }

      for (const post of request.posts) {
        // Inserting posts
        console.log("Inserting posts");
        const [{ id }] = await txn
          .insert(posts)
          .values({
            content: post.content,
            userId: user.id,
            createdAt: new Date(),
            quotePostId:
              request.postId && request.postType === "quote"
                ? request.postId
                : null,
            replyPermissions: request.reply ?? "anyone",
            mentions: post.mentions ? post.mentions : [],
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
              quizMode: post.poll.quizMode,
            })
            .returning();

          console.log(
            "Poll Duration and Relative Data",
            post.poll.duration,
            convertRelativeDataToDate(post.poll.duration)
          );

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
          // TODO: check if mentioned users exist
          // TODO: send notifications to mentioned users
        }

        if (post.tags && post.tags.length > 0) {
          // TODO: create tags if not exist and assign them to the post
          const existingTags = await txn.query.tags.findMany({
            where: (tag, { inArray }) =>
              inArray(tag.name, post.tags ? post.tags : []),
          });

          const newTags = post.tags.filter(
            (tag) => !existingTags.map((t) => t.name).includes(tag)
          );

          if (newTags.length > 0) {
            await txn.insert(tags).values(
              newTags.map((tag) => ({
                name: tag,
                userId: user.id,
              }))
            );
          }

          // Assigning tags to the post
          const tagsToAssign = await txn.query.tags.findMany({
            where: (tag, { inArray }) =>
              inArray(tag.name, post.tags ? post.tags : []),
          });

          await txn.insert(postsTags).values(
            tagsToAssign.map((tag) => ({
              postId: id,
              tagId: tag.id,
            }))
          );
        }

        parentIds.push(id);
      }

      return NextResponse.json({ id: parentIds[0] });
    });
    console.log("Transaction Completed");
    return res;
  } catch (error) {
    console.log("POST_CREATE_ERROR", error);
    return new NextResponse("An error occurred", { status: 500 });
  } finally {
    // // Closes the connection as the transaction is completed
    // console.log("Closing the connection");
    // await pool.end();
  }
}

export async function GET(req: Request): Promise<NextResponse<{ posts: {} }>> {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const postsList = await db.query.posts.findMany({
      where: (post, { isNull, and, ne }) =>
        and(isNull(post.parentId), ne(post.userId, session.userId)),
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            username: true,
            avatar: true,
            isVerified: true,
          },
        },
        // This are only to show the user if the replies has a poll or media
        replies: {
          where: (reply, { eq }) => eq(reply.userId, posts.userId),
          columns: {
            id: true,
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
        quotePost: {
          columns: {
            id: true,
            content: true,
            userId: true,
            createdAt: true,
            mentions: true,
          },
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
            media: true,
            poll: {
              with: {
                poll_options: {
                  orderBy: (option, { asc }) => asc(option.id),
                },
              },
            },
            quotePost: {
              columns: {
                id: true,
                content: true,
              },
              with: {
                user: {
                  columns: {
                    id: true,
                    username: true,
                  },
                },
              },
            },
          },
        },
        media: true,
        poll: {
          with: {
            poll_options: true,
          },
        },
      },
    });

    const repostsList = await db.query.reposts.findMany({
      where: (repost, { ne }) => ne(repost.userId, session.userId),
      with: {
        post: {
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
            media: true,
            poll: {
              with: {
                poll_options: true,
              },
            },
            quotePost: {
              columns: {
                id: true,
                content: true,
                userId: true,
                createdAt: true,
                mentions: true,
              },
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
                media: true,
                poll: {
                  with: {
                    poll_options: true,
                  },
                },
                quotePost: {
                  columns: {
                    id: true,
                    content: true,
                  },
                  with: {
                    user: {
                      columns: {
                        id: true,
                        username: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        user: {
          columns: {
            id: true,
            username: true,
          },
        },
      },
    });

    const formattedPosts = postsList.map((post) => ({
      ...post,
      isReposted: false,
      createdAt: post.createdAt,
    }));

    const formattedReposts = repostsList.map((repost) => ({
      ...repost.post,
      isReposted: true,
      repostedBy: {
        id: repost.user.id,
        username: repost.user.username,
      },
      repostedAt: repost.createdAt,
    }));

    const combinedArray = [...formattedPosts, ...formattedReposts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ posts: combinedArray });
  } catch (err) {
    console.log("POST_GET_ERROR", err);
    return new NextResponse("An error occurred", { status: 500 });
  }
}

// type Post = {
//   id: string;
//   content: string;
//   parentId: string;
//   poll: {
//     question: string;
//     options: { title: string }[];
//     duration: string;
//     anonymousVoting: boolean;
//     multipleAnswers: boolean;
//     quizMode: boolean;
//   };
//   user: {
//     id: string;
//     name: string;
//     username: string;
//     email: string;
//   };
// };
