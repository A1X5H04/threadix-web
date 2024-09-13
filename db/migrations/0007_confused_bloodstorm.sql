ALTER TABLE "poll_option" ADD COLUMN "vote_count" bigint NOT NULL;--> statement-breakpoint
ALTER TABLE "poll" ADD COLUMN "anonymous_votes" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "post_media" DROP COLUMN IF EXISTS "duration";--> statement-breakpoint
ALTER TABLE "post_media" DROP COLUMN IF EXISTS "description";