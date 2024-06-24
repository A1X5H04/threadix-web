DO $$ BEGIN
 CREATE TYPE "media_type" AS ENUM('image', 'audio', 'video', 'voice');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "post_visibility_status" AS ENUM('public', 'followers', 'private');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"provider_id" text NOT NULL,
	"provider_user_id" text NOT NULL,
	"expires_at" integer,
	"access_token" text,
	"refresh_token" text,
	"token_type" text,
	"scope" text,
	CONSTRAINT "account_provider_id_provider_user_id_pk" PRIMARY KEY("provider_id","provider_user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"username" varchar(16) NOT NULL,
	"password" text NOT NULL,
	"name" varchar(64),
	"avatar" text,
	"bio" text,
	"link" varchar(256),
	"visibility" boolean,
	"is_verified" boolean,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "like" (
	"user_id" text NOT NULL,
	"post_id" varchar(32) NOT NULL,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "like_user_id_post_id_pk" PRIMARY KEY("user_id","post_id"),
	CONSTRAINT "like_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "like_post_id_unique" UNIQUE("post_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "poll_option" (
	"id" serial PRIMARY KEY NOT NULL,
	"poll_id" varchar(12) NOT NULL,
	"title" text NOT NULL,
	"is_correct" boolean,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "poll" (
	"id" varchar(12) PRIMARY KEY NOT NULL,
	"post_id" varchar(32) NOT NULL,
	"question" text,
	"duration" timestamp NOT NULL,
	"multiple_votes" boolean NOT NULL,
	"anonymous_voting" boolean NOT NULL,
	"quiz_mode" boolean NOT NULL,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "poll_post_id_unique" UNIQUE("post_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "post_media" (
	"post_id" varchar(32) NOT NULL,
	"media_path" text NOT NULL,
	"media_type" "media_type",
	"created_at" timestamp NOT NULL,
	CONSTRAINT "post_media_post_id_media_path_pk" PRIMARY KEY("post_id","media_path")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "post" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"parent_id" varchar(32),
	"quote_post_id" varchar(32),
	"location" text,
	"content" text NOT NULL,
	"visibility_status" "post_visibility_status" NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "post_tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" varchar(32) NOT NULL,
	"tag_id" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "repost" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"post_id" varchar(32) NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "tag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_followers" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"follower_id" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vote" (
	"user_id" text NOT NULL,
	"option_id" bigint NOT NULL,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "vote_user_id_option_id_pk" PRIMARY KEY("user_id","option_id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "username" ON "user" ("username");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "postId" ON "like" ("post_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "poll_option_idx" ON "poll_option" ("poll_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_poll_idx" ON "poll" ("post_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_media_idx" ON "post_media" ("post_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_post_idx" ON "post" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_tag_idx" ON "post_tag" ("post_id","tag_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "repost_post_id" ON "repost" ("post_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tag_name_idx" ON "tag" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_follower" ON "user_followers" ("user_id","follower_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "votes_poll_idx" ON "vote" ("option_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "like" ADD CONSTRAINT "like_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "poll_option" ADD CONSTRAINT "poll_option_poll_id_poll_id_fk" FOREIGN KEY ("poll_id") REFERENCES "poll"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "poll" ADD CONSTRAINT "poll_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_media" ADD CONSTRAINT "post_media_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post" ADD CONSTRAINT "post_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_tag" ADD CONSTRAINT "post_tag_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_tag" ADD CONSTRAINT "post_tag_tag_id_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repost" ADD CONSTRAINT "repost_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repost" ADD CONSTRAINT "repost_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tag" ADD CONSTRAINT "tag_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_followers" ADD CONSTRAINT "user_followers_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_followers" ADD CONSTRAINT "user_followers_follower_id_user_id_fk" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vote" ADD CONSTRAINT "vote_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vote" ADD CONSTRAINT "vote_option_id_poll_option_id_fk" FOREIGN KEY ("option_id") REFERENCES "poll_option"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
