import { relations } from "drizzle-orm";
import { users } from "./auth";
import { posts, likes, tags, userFollowers, postsTags } from "./tables";

export const userRelation = relations(users, ({ many }) => ({
  posts: many(posts),
  tags: many(tags),
}));

export const postRelation = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),

  likes: many(likes),
  hashTags: many(tags),

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

export const tagRelation = relations(tags, ({ many, one }) => ({
  user: one(users, {
    fields: [tags.userId],
    references: [users.id],
  }),
  posts: many(posts),
}));

export const postToHashTagRelation = relations(postsTags, ({ one }) => ({
  post: one(posts, {
    fields: [postsTags.postId],
    references: [posts.id],
  }),
  hashTag: one(tags, {
    fields: [postsTags.tagId],
    references: [tags.id],
  }),
}));
