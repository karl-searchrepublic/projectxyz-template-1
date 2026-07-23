import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "home_page" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "about_page" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "services_page" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "contact_page" ADD COLUMN "meta_description" varchar;`)

  // Carry over the site-wide description as the Home page's description —
  // it was the de facto homepage description before this split, since Home
  // is what every page's metadata fell back to.
  await db.execute(sql`
    UPDATE "home_page"
    SET "meta_description" = (SELECT "meta_description" FROM "header" LIMIT 1);
  `)

  await db.execute(sql`
   ALTER TABLE "header" DROP COLUMN "meta_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "services" DROP COLUMN "meta_description";
  ALTER TABLE "home_page" DROP COLUMN "meta_description";
  ALTER TABLE "about_page" DROP COLUMN "meta_description";
  ALTER TABLE "services_page" DROP COLUMN "meta_description";
  ALTER TABLE "contact_page" DROP COLUMN "meta_description";`)
}
