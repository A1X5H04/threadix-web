DO $$ BEGIN
 CREATE TYPE "post_media_type" AS ENUM('gif', 'audio', 'image', 'video', 'voice');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "post_visibility_status" ADD VALUE 'anyone';--> statement-breakpoint
ALTER TYPE "post_visibility_status" ADD VALUE 'mentions';--> statement-breakpoint
DROP TABLE "post_audio";--> statement-breakpoint
DROP TABLE "post_gif";--> statement-breakpoint
ALTER TABLE "post_media" ALTER COLUMN "width" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "post_media" ALTER COLUMN "height" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "post_media" ADD COLUMN "duration" varchar(6);--> statement-breakpoint
ALTER TABLE "post_media" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "post_media" ADD COLUMN "media_type" "post_media_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "mentions" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "poll" DROP COLUMN IF EXISTS "question";--> statement-breakpoint
ALTER TABLE "poll" DROP COLUMN IF EXISTS "anonymous_voting";--> statement-breakpoint
ALTER TABLE "post" DROP COLUMN IF EXISTS "visibility_status";