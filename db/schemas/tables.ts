import {
  index,
  pgTable,
  text,
  timestamp,
  varchar,
  serial,
} from "drizzle-orm/pg-core";
import { init } from "@paralleldrive/cuid2";

const createId = init({
  random: Math.random,
  length: 64,
});

export const posts = pgTable(
  "post",
  {
    id: varchar("id", { length: 64 })
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    userId: text("user_id").notNull(),
    parentId: varchar("parent_id", { length: 64 }),

    content: text("content").notNull(),
    media: text("media"),

    createdAt: timestamp("created_at").$default(() => new Date()),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (table) => ({
    userIdx: index("userId").on(table.userId),
  })
);

export const likes = pgTable(
  "like",
  {
    id: serial("id").primaryKey().notNull(),
    userId: text("user_id").notNull(),
    postId: varchar("post_id", { length: 64 }).notNull(),
    createdAt: timestamp("created_at").notNull(),
  },
  (table) => ({
    postIdx: index("postId").on(table.postId),
  })
);

export const tags = pgTable("tag", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 128 }).unique().notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").notNull(),
});

export const postsTags = pgTable("post_tag", {
  id: serial("id").primaryKey().notNull(),
  postId: varchar("post_id", { length: 64 }).notNull(),
  tagId: text("tag_id").notNull(),
  createdAt: timestamp("created_at").notNull(),
});

export const userFollowers = pgTable(
  "user_followers",
  {
    id: serial("id").primaryKey().notNull(),
    userId: text("user_id").notNull(),
    followerId: text("follower_id").notNull(),
    createdAt: timestamp("created_at").notNull(),
  },
  (table) => ({
    userFollowerIdx: index("user_follower").on(table.userId, table.followerId),
  })
);
