import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page" DROP COLUMN "testimonials_heading";
  ALTER TABLE "home_page" DROP COLUMN "service_area_heading";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page" ADD COLUMN "testimonials_heading" varchar DEFAULT 'What Our Customers Say';
  ALTER TABLE "home_page" ADD COLUMN "service_area_heading" varchar DEFAULT 'Where We Service';`)
}
