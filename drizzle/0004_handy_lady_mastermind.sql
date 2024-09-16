DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('Backlog', 'In Progress', 'Finished');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "item" ADD COLUMN "status" "status" DEFAULT 'Backlog' NOT NULL;