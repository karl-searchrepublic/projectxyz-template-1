import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'What Our Customers Say',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "service_area" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Where We Service',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `)

  // Carry over any customized heading text from home_page before the columns
  // there get dropped in the next migration — not just the schema, the data.
  await db.execute(sql`
    INSERT INTO "testimonials" ("heading", "updated_at", "created_at")
    SELECT "testimonials_heading", now(), now()
    FROM "home_page"
    WHERE "testimonials_heading" IS NOT NULL
    LIMIT 1;

    INSERT INTO "service_area" ("heading", "updated_at", "created_at")
    SELECT "service_area_heading", now(), now()
    FROM "home_page"
    WHERE "service_area_heading" IS NOT NULL
    LIMIT 1;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "testimonials" CASCADE;
  DROP TABLE "service_area" CASCADE;`)
}
