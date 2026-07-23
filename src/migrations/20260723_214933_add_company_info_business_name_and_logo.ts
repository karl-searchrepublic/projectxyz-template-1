import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "company_info" ADD COLUMN "business_name" varchar;
  ALTER TABLE "company_info" ADD COLUMN "logo_id" integer;
  ALTER TABLE "company_info" ADD CONSTRAINT "company_info_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "company_info_logo_idx" ON "company_info" USING btree ("logo_id");`)

  // Ensure a company_info row exists before referencing it below (it should
  // already, but don't assume).
  await db.execute(sql`
    INSERT INTO "company_info" ("created_at", "updated_at")
    SELECT now(), now()
    WHERE NOT EXISTS (SELECT 1 FROM "company_info");
  `)

  // Carry over the actual current site name and logo from Header, not just leave them blank.
  await db.execute(sql`
    UPDATE "company_info"
    SET "business_name" = COALESCE((SELECT "site_name" FROM "header" LIMIT 1), 'Business Name'),
        "logo_id" = (SELECT "logo_id" FROM "header" LIMIT 1);
  `)

  await db.execute(sql`
   ALTER TABLE "company_info" ALTER COLUMN "business_name" SET NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "company_info" DROP CONSTRAINT "company_info_logo_id_media_id_fk";
  DROP INDEX "company_info_logo_idx";
  ALTER TABLE "company_info" DROP COLUMN "business_name";
  ALTER TABLE "company_info" DROP COLUMN "logo_id";`)
}
