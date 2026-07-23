import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "company_info" ADD COLUMN "google_rating" numeric;
  ALTER TABLE "company_info" ADD COLUMN "google_review_count" numeric;
  ALTER TABLE "company_info" ADD COLUMN "google_reviews_url" varchar;
  ALTER TABLE "company_info" ADD COLUMN "show_review_link" boolean DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "company_info" DROP COLUMN "google_rating";
  ALTER TABLE "company_info" DROP COLUMN "google_review_count";
  ALTER TABLE "company_info" DROP COLUMN "google_reviews_url";
  ALTER TABLE "company_info" DROP COLUMN "show_review_link";`)
}
