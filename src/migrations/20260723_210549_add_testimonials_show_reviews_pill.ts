import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "testimonials" ADD COLUMN "show_google_reviews_pill" boolean DEFAULT true;`)

  // Ensure a testimonials row exists before referencing it below (it should
  // already, via the earlier heading-migration's data copy, but don't assume).
  await db.execute(sql`
    INSERT INTO "testimonials" ("heading", "created_at", "updated_at")
    SELECT 'What Our Customers Say', now(), now()
    WHERE NOT EXISTS (SELECT 1 FROM "testimonials");
  `)

  // Carry over the actual current toggle value from Company Info, not just
  // the default — someone may have deliberately turned this off already.
  await db.execute(sql`
    UPDATE "testimonials"
    SET "show_google_reviews_pill" = COALESCE((SELECT "show_google_reviews_pill" FROM "company_info" LIMIT 1), true);
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "testimonials" DROP COLUMN "show_google_reviews_pill";`)
}
