CREATE TABLE IF NOT EXISTS "product_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"modification_id" uuid NOT NULL,
	"url" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_links" ADD CONSTRAINT "product_links_modification_id_modifications_id_fk" FOREIGN KEY ("modification_id") REFERENCES "public"."modifications"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "modifications" DROP COLUMN IF EXISTS "useful_links";