import { activityFeed, likes, posts, votes } from "@/db/schemas/tables";
import { db } from "@/lib/db";
import { and, eq, gte, inArray, isNotNull, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const lastActivity = await db.query.activityFeed.findFirst({
    orderBy: (activity, { desc }) => desc(activity.createdAt),
    columns: { createdAt: true },
  });

  const lastProcessedAt = lastActivity ? lastActivity.createdAt : new Date();

  // Replies
  const replies = await db
    .select({
      parentId: posts.parentId,
      userIds: sql`ARRAY_AGG(${posts.userId})`,
    })
    .from(posts)
    .where(
      and(gte(posts.createdAt, lastProcessedAt), isNotNull(posts.parentId))
    )
    .groupBy((t) => [t.parentId]);

  if (replies && replies.length > 0) {
    const posts = await db.query.posts.findMany({
      where: (post, { inArray }) =>
        inArray(post.id, replies.map((reply) => reply.parentId || "") || []),
      columns: { id: true, userId: true },
    });

    const replyWithUserIds = replies
      .map((reply) => {
        const post = posts.find((p) => p.id === reply.parentId);
        const filteredUserId = (reply.userIds as string[]).filter(
          (replyUserId) => replyUserId !== post?.userId
        );

        return {
          parentId: reply.parentId,
          userIds: filteredUserId,
          postUserId: post?.userId!,
        };
      })
      .filter((reply) => reply.userIds.length > 0); // Exclude posts where userIds array is empty

    await db.insert(activityFeed).values(
      replyWithUserIds.map((reply) => ({
        userId: reply.postUserId,
        actionUserIds: reply.userIds,
        title: `You got new ${
          reply.userIds.length > 1 ? "replies" : "reply"
        } on your post`,
      }))
    );
  }

  // Likes;
  const likesList = await db
    .select({
      postId: likes.postId,
      userIds: sql`ARRAY_AGG(${posts.userId})`,
    })
    .from(likes)

    .groupBy((t) => [t.postId]);

  if (likesList && likesList.length > 0) {
    const posts = await db.query.posts.findMany({
      where: (post, { inArray }) =>
        inArray(post.id, likesList.map((like) => like.postId || "") || []),
      columns: { id: true, userId: true, content: true },
    });

    const likesWithUserIds = likesList
      .map((like) => {
        const post = posts.find((p) => p.id === like.postId);
        const filteredUserId = (like.userIds as string[]).filter(
          (likeUserId) => likeUserId !== post?.userId
        );

        return {
          postContent: post?.content,
          userIds: filteredUserId,
          userId: post?.userId!,
        };
      })
      .filter((like) => like.userIds.length > 0);

    await db.insert(activityFeed).values(
      likesWithUserIds.map((like) => ({
        userId: like.userId,
        actionUserIds: like.userIds,
        activityType: "like" as "like",
        title:
          like.postContent || "announcement: You got new likes on your post",
      }))
    );
  }

  // Poll
  const poll = await db.query.polls.findMany({
    where: (poll, { gte, and, lt }) =>
      and(
        lt(poll.duration, new Date()),
        and(gte(poll.duration, lastProcessedAt))
      ),
    columns: { id: true },
  });

  if (poll && poll.length > 0) {
    const votelist = await db
      .select({ userId: votes.userId })
      .from(votes)
      .where(
        inArray(
          votes.pollId,
          poll.map((p) => p.id)
        )
      );

    if (votelist && votelist.length > 0) {
      await db.insert(activityFeed).values(
        votelist.map((vote) => ({
          userId: vote.userId,
          actionUserIds: [vote.userId],
          activityType: "poll" as "poll",
          title: "Poll results are out",
        }))
      );
    }
  }
}