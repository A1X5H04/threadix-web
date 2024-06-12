import {
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "user",
  {
    id: text("id").primaryKey(),
    email: text("email").unique().notNull(),
    username: text("username").unique().notNull(),
    password: text("password").notNull(),

    name: text("name"),
    avatar: text("avatar"),
    bio: text("bio"),
    link: text("link"),
    visibility: text("visibility").$default(() => "public"),

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
