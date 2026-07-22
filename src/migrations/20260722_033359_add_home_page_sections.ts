import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  ALTER TABLE "home_page" ADD COLUMN "services_preview_heading" varchar DEFAULT 'Our Services';
  ALTER TABLE "home_page" ADD COLUMN "services_preview_subtext" varchar;
  ALTER TABLE "home_page" ADD COLUMN "services_preview_view_all_label" varchar DEFAULT 'View All Services';
  ALTER TABLE "home_page" ADD COLUMN "trust_strip_heading" varchar DEFAULT 'Why Choose Us';
  ALTER TABLE "home_page" ADD COLUMN "final_cta_heading" varchar;
  ALTER TABLE "home_page" ADD COLUMN "final_cta_subtext" varchar;
  ALTER TABLE "home_page" ADD COLUMN "final_cta_button_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "final_cta_button_href" varchar;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
  CREATE INDEX "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
  CREATE INDEX "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
  CREATE INDEX "home_page_rels_services_id_idx" ON "home_page_rels" USING btree ("services_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_page_rels" CASCADE;
  ALTER TABLE "home_page" DROP COLUMN "services_preview_heading";
  ALTER TABLE "home_page" DROP COLUMN "services_preview_subtext";
  ALTER TABLE "home_page" DROP COLUMN "services_preview_view_all_label";
  ALTER TABLE "home_page" DROP COLUMN "trust_strip_heading";
  ALTER TABLE "home_page" DROP COLUMN "final_cta_heading";
  ALTER TABLE "home_page" DROP COLUMN "final_cta_subtext";
  ALTER TABLE "home_page" DROP COLUMN "final_cta_button_label";
  ALTER TABLE "home_page" DROP COLUMN "final_cta_button_href";`)
}
