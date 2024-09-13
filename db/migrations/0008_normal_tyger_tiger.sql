ALTER TABLE "post" ADD COLUMN "tags" text[];--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "likes_count" bigint;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "replies_count" bigint;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "repost_count" bigint;