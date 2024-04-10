import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { init } from "@paralleldrive/cuid2";

const createId = init({
  random: Math.random,
  length: 8,
});

export const users = pgTable(
  "user",
  {
    id: uuid("id").primaryKey(),
    email: text("email").unique().notNull(),
    username: text("username").unique().notNull(),
    password: text("password").notNull(),

    name: text("name"),
    avatar: text("avatar"),
    bio: text("bio"),
    link: text("link"),

    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  },
  (table) => ({
    usernameIdx: index("username").on(table.username),
  })
);

export const account = pgTable(
  "account",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    providerId: text("provider_id").notNull(),
    providerUserId: text("provider_user_id").notNull(),
    expiresAt: integer("expires_at"),
    scope: text("scope"),
  },
  (table) => ({
    compoundKey: primaryKey({
      columns: [table.providerId, table.providerUserId],
    }),
  })
);

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const posts = pgTable(
  "post",
  {
    id: varchar("id", { length: 8 })
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    userId: text("user_id"),
    parentId: varchar("parent_id", { length: 8 }),

    body: text("body").notNull(),
    image: text("image"),

    createdAt: timestamp("created_at").notNull(),
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
    postId: varchar("post_id", { length: 8 }).notNull(),

    createdAt: timestamp("created_at").notNull(),
  },
  (table) => ({
    postIdx: index("postId").on(table.postId),
  })
);

export const hashTags = pgTable("hash_tag", {
  id: text("id").primaryKey(),
  name: text("name").unique().notNull(),
  userId: text("user_id").notNull(),
  postIds: text("post_ids"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const followers = pgTable(
  "follower",
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

// Post Relations

export const postRelations = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),

  likes: many(likes),
  replies: many(posts, {
    relationName: "replies",
  }),
  parent: one(posts, {
    fields: [posts.parentId],
    references: [posts.id],
    relationName: "replies",
  }),
}));

// User Relation

export const userRelation = relations(users, ({ many }) => ({
  posts: many(posts),
  likes: many(likes),
  followers: many(followers),
  likedPosts: many(likes),
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

export const followerRelation = relations(followers, ({ one }) => ({
  user: one(users, {
    fields: [followers.userId],
    references: [users.id],
  }),
}));
