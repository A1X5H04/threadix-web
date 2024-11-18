CREATE UNIQUE INDEX IF NOT EXISTS "user_post_unique_idx" ON "like" USING btree ("user_id","post_id");--> statement-breakpoint
ALTER TABLE "poll" DROP COLUMN IF EXISTS "anonymous_votes";--> statement-breakpoint
ALTER TABLE "poll" DROP COLUMN IF EXISTS "multiple_votes";