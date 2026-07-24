import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_page" ALTER COLUMN "hero_headline" SET NOT NULL;
  ALTER TABLE "services_page" ALTER COLUMN "hero_headline" SET NOT NULL;
  ALTER TABLE "about_page" DROP COLUMN "page_intro_headline";
  ALTER TABLE "about_page" DROP COLUMN "page_intro_subtext";
  ALTER TABLE "services_page" DROP COLUMN "page_intro_headline";
  ALTER TABLE "services_page" DROP COLUMN "page_intro_subtext";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_page" ALTER COLUMN "hero_headline" DROP NOT NULL;
  ALTER TABLE "services_page" ALTER COLUMN "hero_headline" DROP NOT NULL;
  ALTER TABLE "about_page" ADD COLUMN "page_intro_headline" varchar;
  ALTER TABLE "about_page" ADD COLUMN "page_intro_subtext" varchar;
  ALTER TABLE "services_page" ADD COLUMN "page_intro_headline" varchar;
  ALTER TABLE "services_page" ADD COLUMN "page_intro_subtext" varchar;`)
}
