CREATE TABLE IF NOT EXISTS "post_gif" (
	"post_id" varchar(32) NOT NULL,
	"tenor_url" text NOT NULL,
	"url" text NOT NULL,
	"description" text,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "voice_note" (
	"post_id" varchar(32) NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"duration" bigint,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "post_media" RENAME COLUMN "media_path" TO "url";--> statement-breakpoint
ALTER TABLE "post_media" RENAME COLUMN "media_type" TO "type";--> statement-breakpoint
ALTER TABLE "post_media" DROP CONSTRAINT "post_media_post_id_media_path_pk";--> statement-breakpoint
ALTER TABLE "post_media" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "post_media" ADD CONSTRAINT "post_media_post_id_url_pk" PRIMARY KEY("post_id","url");--> statement-breakpoint
ALTER TABLE "post_media" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "post_media" ADD COLUMN "width" bigint NOT NULL;--> statement-breakpoint
ALTER TABLE "post_media" ADD COLUMN "height" bigint NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_gif" ADD CONSTRAINT "post_gif_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "voice_note" ADD CONSTRAINT "voice_note_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
