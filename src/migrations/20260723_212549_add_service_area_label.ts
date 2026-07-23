import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "service_area" ADD COLUMN "label" varchar;`)

  // Ensure a service_area row exists before referencing it below (it should
  // already, via the earlier suburbs-migration's data copy, but don't assume).
  await db.execute(sql`
    INSERT INTO "service_area" ("heading", "created_at", "updated_at")
    SELECT 'Where We Service', now(), now()
    WHERE NOT EXISTS (SELECT 1 FROM "service_area");
  `)

  // Carry over the actual current label from Company Info, not just leave it blank.
  await db.execute(sql`
    UPDATE "service_area"
    SET "label" = (SELECT "service_area_label" FROM "company_info" LIMIT 1);
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "service_area" DROP COLUMN "label";`)
}
