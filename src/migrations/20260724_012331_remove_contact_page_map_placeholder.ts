import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact_page" DROP COLUMN "map_placeholder_embed_url";
  ALTER TABLE "contact_page" DROP COLUMN "map_placeholder_placeholder_label";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact_page" ADD COLUMN "map_placeholder_embed_url" varchar;
  ALTER TABLE "contact_page" ADD COLUMN "map_placeholder_placeholder_label" varchar DEFAULT 'Map coming soon';`)
}
