DO $$ BEGIN
 CREATE TYPE "post_reply_permissions" AS ENUM('anyone', 'followers', 'mentions');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "mentions" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "reply_permissions" "post_reply_permissions" NOT NULL;