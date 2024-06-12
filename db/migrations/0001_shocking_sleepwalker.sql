CREATE TABLE IF NOT EXISTS "hash_tag" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "hash_tag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "like" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"post_id" varchar(8) NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "post" (
	"id" varchar(8) PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"parent_id" varchar(8),
	"content" text NOT NULL,
	"media" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "post_hash_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" varchar(8) NOT NULL,
	"hash_tag_id" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_followers" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"follower_id" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "access_token" text;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "refresh_token" text;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "token_type" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "visibility" text;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "postId" ON "like" ("post_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userId" ON "post" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_follower" ON "user_followers" ("user_id","follower_id");