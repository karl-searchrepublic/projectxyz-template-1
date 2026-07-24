import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_nav_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_nav" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "site_nav_nav_links" ADD CONSTRAINT "site_nav_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_nav"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_nav_nav_links_order_idx" ON "site_nav_nav_links" USING btree ("_order");
  CREATE INDEX "site_nav_nav_links_parent_id_idx" ON "site_nav_nav_links" USING btree ("_parent_id");`)

  await db.execute(sql`
    INSERT INTO "site_nav" ("created_at", "updated_at")
    VALUES (now(), now());
  `)

  // Header and Footer previously carried duplicate copies of the same nav
  // links — Header's copy becomes the single shared source of truth.
  await db.execute(sql`
    INSERT INTO "site_nav_nav_links" ("_order", "_parent_id", "id", "label", "href")
    SELECT "_order", (SELECT "id" FROM "site_nav" LIMIT 1), "id", "label", "href"
    FROM "header_nav_links";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_nav_nav_links" CASCADE;
  DROP TABLE "site_nav" CASCADE;`)
}
