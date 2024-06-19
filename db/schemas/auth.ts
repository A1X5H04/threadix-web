import { createId } from "@paralleldrive/cuid2";
import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "user",
  {
    id: varchar("id", { length: 128 })
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    email: text("email").unique().notNull(),
    username: varchar("username", { length: 16 }).unique().notNull(),
    password: text("password").notNull(),
    name: varchar("name", { length: 64 }),
    avatar: text("avatar"),
    bio: text("bio"),
    link: varchar("link", { length: 256 }),
    isPublic: boolean("visibility").$default(() => true),

    isVerified: boolean("is_verified").$default(() => false),

    createdAt: timestamp("created_at").$default(() => new Date()),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
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
    type: text("type").notNull(),
    providerId: text("provider_id").notNull(),
    providerUserId: text("provider_user_id").notNull(),
    expiresAt: integer("expires_at"),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    tokenType: text("token_type"),
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

// Schemas Types

export type User = typeof users.$inferSelect;
export type Account = typeof account.$inferSelect;
export type Session = typeof sessions.$inferSelect;
