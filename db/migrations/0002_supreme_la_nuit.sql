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
CREATE TABLE IF NOT EXISTS "vote" (
	"user_id" text NOT NULL,
	"poll_id" varchar(12) NOT NULL,
	"content" text NOT NULL,
	"is_correct" boolean,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "vote_user_id_poll_id_pk" PRIMARY KEY("user_id","poll_id")
);
--> statement-breakpoint
ALTER TABLE "like" ALTER COLUMN "post_id" SET DATA TYPE varchar(32);--> statement-breakpoint
ALTER TABLE "post_media" ADD COLUMN "mime_type" varchar(16) NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_poll_idx" ON "poll" ("post_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "votes_poll_idx" ON "vote" ("poll_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "poll" ADD CONSTRAINT "poll_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "vote" ADD CONSTRAINT "vote_poll_id_poll_id_fk" FOREIGN KEY ("poll_id") REFERENCES "poll"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "like" ADD CONSTRAINT "like_post_id_unique" UNIQUE("post_id");