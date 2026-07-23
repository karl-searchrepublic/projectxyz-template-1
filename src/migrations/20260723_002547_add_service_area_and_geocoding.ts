import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "company_info" ADD COLUMN "service_radius_km" numeric DEFAULT 15;
  ALTER TABLE "company_info" ADD COLUMN "service_area_label" varchar;
  ALTER TABLE "company_info" ADD COLUMN "latitude" numeric;
  ALTER TABLE "company_info" ADD COLUMN "longitude" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "company_info" DROP COLUMN "service_radius_km";
  ALTER TABLE "company_info" DROP COLUMN "service_area_label";
  ALTER TABLE "company_info" DROP COLUMN "latitude";
  ALTER TABLE "company_info" DROP COLUMN "longitude";`)
}
