import { like, relations } from "drizzle-orm";
import { PgArray, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  avatar: text("avatar"),
  bio: text("bio"),
  link: text("link"),

  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const postTable = pgTable("post", {
  id: text("id").primaryKey(),
  userId: text("user_id"),
  body: text("body").notNull(),
  image: text("image"),
  likeIds: text("like_ids").array(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const commentTable = pgTable("comment", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  postId: text("post_id")
    .notNull()
    .references(() => postTable.id),
  body: text("body").notNull(),
  likeIds: text("like_ids").array(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const hashTagTable = pgTable("hash_tag", {
  id: text("id").primaryKey(),
  name: text("name").unique().notNull(),
  userId: text("user_id").notNull(),
  postIds: text("post_ids").array(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const postRelation = relations(postTable, ({ one, many }) => ({
  author: one(userTable, {
    fields: [postTable.userId],
    references: [userTable.id],
  }),
  comments: many(commentTable),
  hashTagTable: many(hashTagTable),
}));

export const commentRelation = relations(commentTable, ({ one }) => ({
  author: one(userTable, {
    fields: [commentTable.userId],
    references: [userTable.id],
  }),
  post: one(postTable, {
    fields: [commentTable.postId],
    references: [postTable.id],
  }),
}));
