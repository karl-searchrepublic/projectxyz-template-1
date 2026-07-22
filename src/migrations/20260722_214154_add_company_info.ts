import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "company_info" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone" varchar,
  	"email" varchar,
  	"address" varchar,
  	"hours" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "footer" DROP COLUMN "contact_phone";
  ALTER TABLE "footer" DROP COLUMN "contact_email";
  ALTER TABLE "contact_page" DROP COLUMN "emergency_callout_phone";
  ALTER TABLE "contact_page" DROP COLUMN "contact_details_phone";
  ALTER TABLE "contact_page" DROP COLUMN "contact_details_email";
  ALTER TABLE "contact_page" DROP COLUMN "contact_details_address";
  ALTER TABLE "contact_page" DROP COLUMN "contact_details_hours";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "company_info" CASCADE;
  ALTER TABLE "footer" ADD COLUMN "contact_phone" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_email" varchar;
  ALTER TABLE "contact_page" ADD COLUMN "emergency_callout_phone" varchar;
  ALTER TABLE "contact_page" ADD COLUMN "contact_details_phone" varchar;
  ALTER TABLE "contact_page" ADD COLUMN "contact_details_email" varchar;
  ALTER TABLE "contact_page" ADD COLUMN "contact_details_address" varchar;
  ALTER TABLE "contact_page" ADD COLUMN "contact_details_hours" varchar;`)
}
