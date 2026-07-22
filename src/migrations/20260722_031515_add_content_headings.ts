import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "services_page" ADD COLUMN "how_it_works_heading" varchar DEFAULT 'How It Works';
  ALTER TABLE "services_page" ADD COLUMN "faq_heading" varchar DEFAULT 'Frequently Asked Questions';
  ALTER TABLE "services_page" ADD COLUMN "whats_included_heading" varchar DEFAULT 'What''s Included';
  ALTER TABLE "services_page" ADD COLUMN "related_services_heading" varchar DEFAULT 'Related Services';
  ALTER TABLE "contact_page" ADD COLUMN "contact_details_phone_label" varchar DEFAULT 'Phone';
  ALTER TABLE "contact_page" ADD COLUMN "contact_details_email_label" varchar DEFAULT 'Email';
  ALTER TABLE "contact_page" ADD COLUMN "contact_details_address_label" varchar DEFAULT 'Address';
  ALTER TABLE "contact_page" ADD COLUMN "contact_details_hours_label" varchar DEFAULT 'Hours';
  ALTER TABLE "contact_page" ADD COLUMN "service_area_heading" varchar DEFAULT 'Areas We Service';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" DROP COLUMN "meta_description";
  ALTER TABLE "services_page" DROP COLUMN "how_it_works_heading";
  ALTER TABLE "services_page" DROP COLUMN "faq_heading";
  ALTER TABLE "services_page" DROP COLUMN "whats_included_heading";
  ALTER TABLE "services_page" DROP COLUMN "related_services_heading";
  ALTER TABLE "contact_page" DROP COLUMN "contact_details_phone_label";
  ALTER TABLE "contact_page" DROP COLUMN "contact_details_email_label";
  ALTER TABLE "contact_page" DROP COLUMN "contact_details_address_label";
  ALTER TABLE "contact_page" DROP COLUMN "contact_details_hours_label";
  ALTER TABLE "contact_page" DROP COLUMN "service_area_heading";`)
}
