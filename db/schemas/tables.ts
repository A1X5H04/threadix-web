import {
  index,
  pgTable,
  text,
  timestamp,
  varchar,
  serial,
  pgEnum,
  primaryKey,
  boolean,
  bigint,
} from "drizzle-orm/pg-core";
import { init } from "@paralleldrive/cuid2";
import { users } from "./auth";

const createId = init({
  random: Math.random,
  length: 32,
});

export const postVisibilityStatus = pgEnum("post_visibility_status", [
  "public",
  "followers",
  "private",
]);

export const postMediaType = pgEnum("post_media_type", [
  "gif",
  "audio",
  "image",
  "video",
]);

// export const activityType = pgEnum("activity_type", [
//   "post",
//   "like",
//   "repost",
//   "follow",
//   "reply",
//   "tag",
//   "mention",
//   "quote",
// ])

export const posts = pgTable(
  "post",
  {
    id: varchar("id", { length: 32 })
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    parentId: varchar("parent_id", { length: 32 }),

    quotePostId: varchar("quote_post_id", { length: 32 }),

    location: text("location"),

    content: text("content").notNull(),

    visibilityStatus: postVisibilityStatus("visibility_status")
      .notNull()
      .$default(() => "public"),

    createdAt: timestamp("created_at").$default(() => new Date()),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (table) => ({
    userIdx: index("user_post_idx").on(table.userId),
  })
);

export const postMedia = pgTable(
  "post_media",
  {
    postId: varchar("post_id", { length: 32 })
      .references(() => posts.id, { onDelete: "cascade" })
      .notNull(),
    name: text("name"),
    url: text("url").notNull(),
    width: bigint("width", {
      mode: "number",
    }),
    height: bigint("height", {
      mode: "number",
    }),
    duration: bigint("duration", {
      mode: "number",
    }), // in seconds
    description: text("description"),
    type: postMediaType("media_type").notNull(),
    isVoiceNote: boolean("is_voice_note").$default(() => false),
    createdAt: timestamp("created_at")
      .notNull()
      .$default(() => new Date()),
  },
  (table) => ({
    postMediaIdx: index("post_media_idx").on(table.postId),
    compositeKey: primaryKey({ columns: [table.postId, table.url] }),
  })
);

export const reposts = pgTable(
  "repost",
  {
    id: serial("id").primaryKey().notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    postId: varchar("post_id", { length: 32 })
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at")
      .notNull()
      .$default(() => new Date()),
  },
  (table) => ({
    repostPostIdx: index("repost_post_id").on(table.postId),
  })
);

export const likes = pgTable(
  "like",
  {
    userId: text("user_id")
      .notNull()
      .unique()
      .references(() => users.id, { onDelete: "cascade" }),
    postId: varchar("post_id", { length: 32 }).notNull().unique(),
    createdAt: timestamp("created_at")
      .notNull()
      .$default(() => new Date()),
  },
  (table) => ({
    postIdx: index("postId").on(table.postId),
    userPostCompositeKey: primaryKey({ columns: [table.userId, table.postId] }),
  })
);

export const tags = pgTable(
  "tag",
  {
    id: text("id").primaryKey(),
    name: varchar("name", { length: 128 }).unique().notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at")
      .notNull()
      .$default(() => new Date()),
  },
  (table) => ({
    tagNameIdx: index("tag_name_idx").on(table.name),
  })
);

export const polls = pgTable(
  "poll",
  {
    id: varchar("id", { length: 12 })
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    postId: varchar("post_id", { length: 32 })
      .notNull()
      .unique()
      .references(() => posts.id, { onDelete: "cascade" }),
    duration: timestamp("duration").notNull(),
    multipleVotes: boolean("multiple_votes").notNull(),
    quizMode: boolean("quiz_mode").notNull(),
    createdAt: timestamp("created_at")
      .notNull()
      .$default(() => new Date()),
  },
  (table) => ({
    postPollIdx: index("post_poll_idx").on(table.postId),
  })
);

export const pollOptions = pgTable(
  "poll_option",
  {
    id: serial("id").primaryKey().notNull(),
    pollId: varchar("poll_id", { length: 12 })
      .notNull()
      .references(() => polls.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    isCorrect: boolean("is_correct"),
    createdAt: timestamp("created_at")
      .notNull()
      .$default(() => new Date()),
  },
  (table) => ({
    pollOptionIdx: index("poll_option_idx").on(table.pollId),
  })
);

export const votes = pgTable(
  "vote",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    optionId: bigint("option_id", {
      mode: "number",
    })
      .notNull()
      .references(() => pollOptions.id),
    createdAt: timestamp("created_at")
      .notNull()
      .$default(() => new Date()),
  },
  (table) => ({
    votesPollIdx: index("votes_poll_idx").on(table.optionId),
    userPollCompositeKey: primaryKey({
      columns: [table.userId, table.optionId],
    }),
  })
);

export const postsTags = pgTable(
  "post_tag",
  {
    id: serial("id").primaryKey().notNull(),
    postId: varchar("post_id", { length: 32 })
      .notNull()
      .references(() => posts.id),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id),
    createdAt: timestamp("created_at")
      .notNull()
      .$default(() => new Date()),
  },
  (table) => ({
    postTagIdx: index("post_tag_idx").on(table.postId, table.tagId),
  })
);

export const userFollowers = pgTable(
  "user_followers",
  {
    id: serial("id").primaryKey().notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    followerId: text("follower_id")
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at")
      .notNull()
      .$default(() => new Date()),
  },
  (table) => ({
    userFollowerIdx: index("user_follower").on(table.userId, table.followerId),
  })
);

// export const userActivity = pgTable(
//   "user_activity",
//   {
//     id: serial("id").primaryKey().notNull(),
//     userId: text("user_id")
//       .notNull()
//       .references(() => users.id, { onDelete: "cascade" }),
//     activity: text("activity").notNull(),
//     activityType: varchar(""),
//     isUnread: boolean("is_unread")
//       .notNull()
//       .$default(() => true),
//     createdAt: timestamp("created_at").$default(() => new Date()),
//   },
//   (table) => ({
//     userActivityIdx: index("user_activity_idx").on(table.userId),
//   })
// );
