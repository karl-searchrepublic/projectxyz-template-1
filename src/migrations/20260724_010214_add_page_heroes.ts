import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_page" ALTER COLUMN "page_intro_headline" DROP NOT NULL;
  ALTER TABLE "services_page" ALTER COLUMN "page_intro_headline" DROP NOT NULL;
  ALTER TABLE "services" ADD COLUMN "primary_cta_label" varchar DEFAULT 'Get a Quote';
  ALTER TABLE "services" ADD COLUMN "primary_cta_href" varchar DEFAULT '/contact';
  ALTER TABLE "about_page" ADD COLUMN "hero_headline" varchar;
  ALTER TABLE "about_page" ADD COLUMN "hero_subtext" varchar;
  ALTER TABLE "about_page" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "about_page" ADD COLUMN "hero_primary_cta_label" varchar DEFAULT 'Get a Quote';
  ALTER TABLE "about_page" ADD COLUMN "hero_primary_cta_href" varchar DEFAULT '/contact';
  ALTER TABLE "services_page" ADD COLUMN "hero_headline" varchar;
  ALTER TABLE "services_page" ADD COLUMN "hero_subtext" varchar;
  ALTER TABLE "services_page" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "services_page" ADD COLUMN "hero_primary_cta_label" varchar DEFAULT 'Get a Quote';
  ALTER TABLE "services_page" ADD COLUMN "hero_primary_cta_href" varchar DEFAULT '/contact';
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "about_page_hero_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX "services_page_hero_hero_image_idx" ON "services_page" USING btree ("hero_image_id");`)

  // Carry over the existing intro copy into the new hero fields — these
  // replace pageIntro as the page's hero section.
  await db.execute(sql`
    UPDATE "about_page"
    SET "hero_headline" = "page_intro_headline", "hero_subtext" = "page_intro_subtext";
  `)

  await db.execute(sql`
    UPDATE "services_page"
    SET "hero_headline" = "page_intro_headline", "hero_subtext" = "page_intro_subtext";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_page" DROP CONSTRAINT "about_page_hero_image_id_media_id_fk";
  
  ALTER TABLE "services_page" DROP CONSTRAINT "services_page_hero_image_id_media_id_fk";
  
  DROP INDEX "about_page_hero_hero_image_idx";
  DROP INDEX "services_page_hero_hero_image_idx";
  ALTER TABLE "about_page" ALTER COLUMN "page_intro_headline" SET NOT NULL;
  ALTER TABLE "services_page" ALTER COLUMN "page_intro_headline" SET NOT NULL;
  ALTER TABLE "services" DROP COLUMN "primary_cta_label";
  ALTER TABLE "services" DROP COLUMN "primary_cta_href";
  ALTER TABLE "about_page" DROP COLUMN "hero_headline";
  ALTER TABLE "about_page" DROP COLUMN "hero_subtext";
  ALTER TABLE "about_page" DROP COLUMN "hero_image_id";
  ALTER TABLE "about_page" DROP COLUMN "hero_primary_cta_label";
  ALTER TABLE "about_page" DROP COLUMN "hero_primary_cta_href";
  ALTER TABLE "services_page" DROP COLUMN "hero_headline";
  ALTER TABLE "services_page" DROP COLUMN "hero_subtext";
  ALTER TABLE "services_page" DROP COLUMN "hero_image_id";
  ALTER TABLE "services_page" DROP COLUMN "hero_primary_cta_label";
  ALTER TABLE "services_page" DROP COLUMN "hero_primary_cta_href";`)
}
