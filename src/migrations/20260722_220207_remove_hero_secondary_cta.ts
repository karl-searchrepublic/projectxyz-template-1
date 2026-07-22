import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page" DROP COLUMN "hero_secondary_cta_label";
  ALTER TABLE "home_page" DROP COLUMN "hero_secondary_cta_href";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page" ADD COLUMN "hero_secondary_cta_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "hero_secondary_cta_href" varchar;`)
}
