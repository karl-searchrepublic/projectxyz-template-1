import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "theme" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"primary_color" varchar DEFAULT '#171717' NOT NULL,
  	"background_color" varchar DEFAULT '#ffffff' NOT NULL,
  	"foreground_color" varchar DEFAULT '#1a1a1a' NOT NULL,
  	"accent_color" varchar DEFAULT '#f5f5f5' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "theme" CASCADE;`)
}
