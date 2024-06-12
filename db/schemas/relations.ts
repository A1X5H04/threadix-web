import { relations } from "drizzle-orm";
import { users } from "./auth";
import { posts, likes, hashTags, userFollowers, postsHashTags } from "./tables";

export const userRelation = relations(users, ({ many }) => ({
  posts: many(posts),
  hashTags: many(hashTags),
}));

export const postRelation = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),

  likes: many(likes),
  hashTags: many(hashTags),

  parent: one(posts, {
    fields: [posts.parentId],
    references: [posts.id],
    relationName: "parentPost",
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

export const followerRelation = relations(userFollowers, ({ one }) => ({
  following: one(users, {
    fields: [userFollowers.userId],
    references: [users.id],
  }),
  follower: one(users, {
    fields: [userFollowers.followerId],
    references: [users.id],
  }),
}));

export const hashTagRelation = relations(hashTags, ({ many, one }) => ({
  user: one(users, {
    fields: [hashTags.userId],
    references: [users.id],
  }),
  posts: many(posts),
}));

export const postToHashTagRelation = relations(postsHashTags, ({ one }) => ({
  post: one(posts, {
    fields: [postsHashTags.postId],
    references: [posts.id],
  }),
  hashTag: one(hashTags, {
    fields: [postsHashTags.hashTagId],
    references: [hashTags.id],
  }),
}));
