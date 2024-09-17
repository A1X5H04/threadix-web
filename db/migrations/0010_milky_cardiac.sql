ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN IF EXISTS "expires_at";--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN IF EXISTS "refresh_token";--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN IF EXISTS "token_type";