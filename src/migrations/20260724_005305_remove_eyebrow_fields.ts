import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" DROP COLUMN "eyebrow";
  ALTER TABLE "about_page" DROP COLUMN "page_intro_eyebrow";
  ALTER TABLE "services_page" DROP COLUMN "page_intro_eyebrow";
  ALTER TABLE "contact_page" DROP COLUMN "page_intro_eyebrow";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "about_page" ADD COLUMN "page_intro_eyebrow" varchar;
  ALTER TABLE "services_page" ADD COLUMN "page_intro_eyebrow" varchar;
  ALTER TABLE "contact_page" ADD COLUMN "page_intro_eyebrow" varchar;`)
}
