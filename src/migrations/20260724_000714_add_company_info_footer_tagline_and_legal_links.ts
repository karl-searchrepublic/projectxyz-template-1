import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "company_info" ADD COLUMN "footer_tagline" varchar;
  ALTER TABLE "company_info" ADD COLUMN "legal_links_privacy_policy_url" varchar;
  ALTER TABLE "company_info" ADD COLUMN "legal_links_terms_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "company_info" DROP COLUMN "footer_tagline";
  ALTER TABLE "company_info" DROP COLUMN "legal_links_privacy_policy_url";
  ALTER TABLE "company_info" DROP COLUMN "legal_links_terms_url";`)
}
