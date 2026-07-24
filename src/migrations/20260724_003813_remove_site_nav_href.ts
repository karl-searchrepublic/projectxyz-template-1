import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_nav_nav_links" ALTER COLUMN "page" SET NOT NULL;
  ALTER TABLE "site_nav_nav_links" DROP COLUMN "href";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_nav_nav_links" ALTER COLUMN "page" DROP NOT NULL;
  ALTER TABLE "site_nav_nav_links" ADD COLUMN "href" varchar;`)
}
