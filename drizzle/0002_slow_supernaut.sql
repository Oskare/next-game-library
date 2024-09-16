CREATE TABLE IF NOT EXISTS "item_detail" (
	"id" serial NOT NULL,
	"item_id" serial NOT NULL,
	"detail" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
