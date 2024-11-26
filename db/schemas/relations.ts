// Man Drizzle is awesome!! But Prisma has it's own beauty... I'm confused now...

import { relations } from "drizzle-orm";
import { users } from "./auth";
import {
  posts,
  likes,
  tags,
  userFollowers,
  postsTags,
  postMedia,
  polls,
  pollOptions,
  votes,
  reposts,
} from "./tables";

// export const userRelation = relations(users, ({ many }) => ({
//   posts: many(posts),
//   tags: many(tags),
// }));

export const postRelation = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),

  parentPost: one(posts, {
    fields: [posts.parentId],
    references: [posts.id],
    relationName: "replies",
  }),

  quotePost: one(posts, {
    fields: [posts.quotePostId],
    references: [posts.id],
    relationName: "quote",
  }),

  replies: many(posts, { relationName: "replies" }),

  poll: one(polls, {
    fields: [posts.id],
    references: [polls.postId],
  }),

  tags: many(tags),
  likes: many(likes),

  media: many(postMedia),
}));

export const repostsRelation = relations(reposts, ({ one }) => ({
  post: one(posts, {
    fields: [reposts.postId],
    references: [posts.id],
  }),

  user: one(users, {
    fields: [reposts.userId],
    references: [users.id],
  }),
}));

export const likesRelation = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
}));

// I am getting confused with this followers relation, better I query it directly, (this sh*t is real illuminating)

export const followerRelation = relations(userFollowers, ({ one }) => ({
  followed_user: one(users, {
    fields: [userFollowers.userId],
    references: [users.id],
  }),
  following_user: one(users, {
    fields: [userFollowers.followerId],
    references: [users.id],
  }),
}));

export const postMediaRelation = relations(postMedia, ({ one }) => ({
  post: one(posts, {
    fields: [postMedia.postId],
    references: [posts.id],
  }),
}));

export const postPollRelations = relations(polls, ({ many }) => ({
  poll_options: many(pollOptions),
}));

export const pollOptionRelation = relations(pollOptions, ({ one, many }) => ({
  poll: one(polls, {
    fields: [pollOptions.pollId],
    references: [polls.id],
  }),

  votes: many(votes),
}));

export const voteRelation = relations(votes, ({ one }) => ({
  user: one(users, {
    fields: [votes.userId],
    references: [users.id],
  }),

  poll_option: one(pollOptions, {
    fields: [votes.optionId],
    references: [pollOptions.id],
  }),
}));

export const tagRelation = relations(tags, ({ many, one }) => ({
  user: one(users, {
    fields: [tags.userId],
    references: [users.id],
  }),
  posts: many(posts),
}));

export const postToTagRelation = relations(postsTags, ({ one }) => ({
  post: one(posts, {
    fields: [postsTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postsTags.tagId],
    references: [tags.id],
  }),
}));
