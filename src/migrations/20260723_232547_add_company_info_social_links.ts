import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "company_info" ADD COLUMN "social_links_facebook" varchar;
  ALTER TABLE "company_info" ADD COLUMN "social_links_instagram" varchar;
  ALTER TABLE "company_info" ADD COLUMN "social_links_x" varchar;
  ALTER TABLE "company_info" ADD COLUMN "social_links_linkedin" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "company_info" DROP COLUMN "social_links_facebook";
  ALTER TABLE "company_info" DROP COLUMN "social_links_instagram";
  ALTER TABLE "company_info" DROP COLUMN "social_links_x";
  ALTER TABLE "company_info" DROP COLUMN "social_links_linkedin";`)
}
