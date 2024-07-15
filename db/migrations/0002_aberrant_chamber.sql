ALTER TABLE "voice_note" RENAME TO "post_audio";--> statement-breakpoint
ALTER TABLE "post_audio" DROP CONSTRAINT "voice_note_post_id_post_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_audio" ADD CONSTRAINT "post_audio_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "post_media" DROP COLUMN IF EXISTS "type";