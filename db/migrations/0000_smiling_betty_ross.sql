CREATE TABLE IF NOT EXISTS "account" (
	"user_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"provider_user_id" text NOT NULL,
	"expires_at" integer,
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
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"name" text,
	"avatar" text,
	"bio" text,
	"link" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "username" ON "user" ("username");--> statement-breakpoint
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
