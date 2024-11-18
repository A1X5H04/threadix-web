DROP INDEX IF EXISTS "repost_post_id";--> statement-breakpoint
ALTER TABLE "like" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "repost_post_id" ON "repost" USING btree ("user_id");--> statement-breakpoint
ALTER TABLE "post" DROP COLUMN IF EXISTS "location";