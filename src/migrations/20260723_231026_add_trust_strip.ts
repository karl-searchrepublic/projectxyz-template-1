import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "trust_strip_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "trust_strip" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Why Choose Us',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "trust_strip_stats" ADD CONSTRAINT "trust_strip_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trust_strip"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "trust_strip_stats_order_idx" ON "trust_strip_stats" USING btree ("_order");
  CREATE INDEX "trust_strip_stats_parent_id_idx" ON "trust_strip_stats" USING btree ("_parent_id");`)

  // Carry over the actual current heading from Home Page, and the actual
  // stat items from Company Stats, rather than starting empty.
  await db.execute(sql`
    INSERT INTO "trust_strip" ("heading", "created_at", "updated_at")
    SELECT COALESCE((SELECT "trust_strip_heading" FROM "home_page" LIMIT 1), 'Why Choose Us'), now(), now();
  `)

  await db.execute(sql`
    INSERT INTO "trust_strip_stats" ("_order", "_parent_id", "id", "label", "value")
    SELECT "_order", (SELECT "id" FROM "trust_strip" LIMIT 1), "id", "label", "value"
    FROM "company_stats_stats";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "trust_strip_stats" CASCADE;
  DROP TABLE "trust_strip" CASCADE;`)
}
